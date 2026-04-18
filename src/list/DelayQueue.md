欢迎学习《解读Java源码专栏》，在这个系列中，我将手把手带着大家剖析Java核心组件的源码，内容包含集合、线程、线程池、并发、队列等，深入了解其背后的设计思想和实现细节，轻松应对工作面试。
这是解读Java源码系列的第13篇，将跟大家一起学习Java中的阻塞队列 —— DelayQueue。

## 引言
`DelayQueue` 是一种延迟阻塞队列，比如希望任务在 5 秒后执行，就可以使用 `DelayQueue` 实现。常见的使用场景有：

- 订单 10 分钟内未支付，自动取消。
- 缓存过期后，自动删除。
- 消息的延迟发送等。

但是 `DelayQueue` 怎么使用？底层原理是什么？如果有多个任务是怎么排队的？多个线程取数据时怎么协调等待？
看完这篇文章，可以轻松解答这些问题。

由于 `DelayQueue` 实现了 `BlockingQueue` 接口，而 `BlockingQueue` 接口中定义了几组放数据和取数据的方法，来满足不同的场景。

| 操作 | 抛出异常 | 返回特定值 | 一直阻塞 | 阻塞指定时间 |
| --- | --- | --- | --- | --- |
| 放数据 | add() | offer() | put() | offer(e, time, unit) |
| 取数据（同时删除） | remove() | poll() | take() | poll(time, unit) |
| 查看数据（不删除） | element() | peek() | 不支持 | 不支持 |

**这四组方法的区别是：**

1. 当队列满的时候，再次添加数据：`add()` 会抛出异常，`offer()` 会返回 `false`，`put()` 会一直阻塞，`offer(e, time, unit)` 会阻塞指定时间后返回 `false`。
2. 当队列为空（或元素未到期）的时候，再次取数据：`remove()` 会抛出异常，`poll()` 会返回 `null`，`take()` 会一直阻塞，`poll(time, unit)` 会阻塞指定时间后返回 `null`。

`DelayQueue` 的核心工作原理可以用下面的流程图概括：

```mermaid
flowchart TD
    Start["初始化: lock, PriorityQueue, leader=null, available=条件变量"] --> Offer["offer(e): 加锁 → q.offer(e)\n如果新元素成为堆顶(peek==e):\n  leader=null, available.signal()\n解锁"]
    Offer --> Take["take(): 加可中断锁 → 循环"]
    Take --> CheckHead{"q.peek() 队头元素?"}
    CheckHead -->|null| WaitEmpty["available.await()\n队列为空, 等待生产者唤醒"]
    CheckHead -->|存在| CheckExpire{"first.getDelay() <= 0?\n(元素是否已到期)"}
    CheckExpire -->|是| Return["q.poll() 返回并删除队头元素\nfinally: 如果 leader==null 且 q.peek()!=null,\n唤醒下一个等待者"]
    CheckExpire -->|否| CheckLeader{"leader != null?"}
    CheckLeader -->|是| WaitOther["available.await()\n有其他线程在等待到期, 跟随等待"]
    CheckLeader -->|否| SetLeader["leader = thisThread\navailable.awaitNanos(delay)\n等到期后自动唤醒, 重新检查"]
    WaitEmpty --> CheckHead
    WaitOther --> CheckHead
    SetLeader --> CheckHead
    Poll["poll(): 加锁 → q.peek()\n如果 first==null 或 未到期: 返回null\n否则: q.poll() 返回"]
    Return --> Poll
```

## 类结构
先看一下 `DelayQueue` 类里面有哪些属性：

```java
public class DelayQueue<E extends Delayed>
        extends AbstractQueue<E>
        implements BlockingQueue<E> {

    /**
     * 排它锁，用于保证线程安全
     */
    private final transient ReentrantLock lock = new ReentrantLock();

    /**
     * 底层基于 PriorityQueue 实现（二叉堆，按到期时间排序）
     */
    private final PriorityQueue<E> q = new PriorityQueue<E>();

    /**
     * leader 线程：当前正在等待队头元素到期的线程（leader-follower 模式）
     */
    private Thread leader = null;

    /**
     * 条件队列：当队列中没有到期元素时，线程在此等待
     */
    private final Condition available = lock.newCondition();

}
```

![DelayQueue类图](https://javabaguwen.com/img/DelayQueue1.png)

`DelayQueue` 实现了 `BlockingQueue` 接口，是一个阻塞队列。元素需要实现 `Delayed` 接口。内部使用 `ReentrantLock` 保证线程安全，使用 `Condition` 作为条件队列，当队列中没有到期元素时，取数据的线程需要在条件队列中等待。

```java
public interface Delayed extends Comparable<Delayed> {

    /**
     * 返回剩余过期时间（与关联的时间单位有关）
     */
    long getDelay(TimeUnit unit);
}
```

`DelayQueue` 的四个核心字段各自有不同的作用：

- **`lock`**：`ReentrantLock` 排它锁，保证所有操作的线程安全
- **`q`**：`PriorityQueue`（二叉堆），按元素的到期时间排序，到期时间最早的在堆顶
- **`leader`**：当前正在等待队头元素到期的线程。这是 **leader-follower 模式**的设计，目的是避免多个线程同时等待同一个到期时间。如果已经有线程在等待（`leader != null`），其他线程只需无限等待即可（到期后 leader 会唤醒它们）；如果没有线程在等待（`leader == null`），则当前线程成为 leader，设置定时等待到元素到期
- **`available`**：条件变量，用于线程间协调。生产者在添加元素后调用 `signal()` 唤醒等待的消费者；消费者在队列为空或元素未到期时调用 `await()` 进入等待

## 初始化
`DelayQueue` 常用的初始化方法有两个：无参构造方法和指定元素集合的有参构造方法。

```java
/**
 * 无参构造方法
 */
public DelayQueue() {
}

/**
 * 指定元素集合
 */
public DelayQueue(Collection<? extends E> c) {
    this.addAll(c);
}
```

无参构造方法是空的，底层 `PriorityQueue` 在属性声明时已经初始化。有参构造方法会调用 `addAll`，将集合中的元素逐个添加到 `PriorityQueue` 中，添加时会自动按到期时间排序。

## 使用示例
先定义一个延迟任务，需要实现 `Delayed` 接口，并重写 `getDelay()` 和 `compareTo()` 方法。

```java
/**
 * 自定义延迟任务
 **/
public class DelayedTask implements Delayed {

    /**
     * 任务到期时间（绝对时间戳）
     */
    private long expirationTime;

    /**
     * 任务
     */
    private Runnable task;

    public void execute() {
        task.run();
    }

    public DelayedTask(long delay, Runnable task) {
        // 到期时间 = 当前时间 + 延迟时间
        this.expirationTime = System.currentTimeMillis() + delay;
        this.task = task;
    }

    /**
     * 返回剩余延迟时间
     */
    @Override
    public long getDelay(@NotNull TimeUnit unit) {
        return unit.convert(expirationTime - System.currentTimeMillis(), TimeUnit.MILLISECONDS);
    }

    /**
     * 任务按照到期时间排序
     */
    @Override
    public int compareTo(@NotNull Delayed o) {
        return Long.compare(this.expirationTime, ((DelayedTask) o).expirationTime);
    }
}
```

测试运行延迟任务：

```java
/**
 * DelayQueue 测试类
 **/
@Slf4j
public class DelayQueueTest {

    public static void main(String[] args) throws InterruptedException {
        // 初始化延迟队列
        DelayQueue<DelayedTask> delayQueue = new DelayQueue<>();

        // 添加3个任务，延迟时间分别是3秒、1秒、5秒
        delayQueue.add(new DelayedTask(3000, () -> log.info("任务2开始运行")));
        delayQueue.add(new DelayedTask(1000, () -> log.info("任务1开始运行")));
        delayQueue.add(new DelayedTask(5000, () -> log.info("任务3开始运行")));

        // 运行任务
        log.info("开始运行任务");
        while (!delayQueue.isEmpty()) {
            // 阻塞获取最先到期的任务
            DelayedTask task = delayQueue.take();
            task.execute();
        }
    }
}
```

输出结果：
```
10:30:10.000 [main] INFO com.yideng.DelayQueueTest - 开始运行任务
10:30:11.000 [main] INFO com.yideng.DelayQueueTest - 任务1开始运行
10:30:13.000 [main] INFO com.yideng.DelayQueueTest - 任务2开始运行
10:30:15.000 [main] INFO com.yideng.DelayQueueTest - 任务3开始运行
```

可以看出，运行任务的时候，会按照任务的到期时间进行排序，先到期的任务先运行。如果没有到期的任务，调用 `take()` 方法的时候会一直阻塞。

然后再看一下源码实现，先看放数据的几组方法。

## 放数据源码

放数据的方法有四个：

| 操作 | 抛出异常 | 返回特定值 | 阻塞 | 阻塞一段时间 |
| --- | --- | --- | --- | --- |
| 放数据 | add() | offer() | put() | offer(e, time, unit) |

### offer 方法源码

先看一下 `offer()` 方法源码，其他放数据方法逻辑也是大同小异。
`offer()` 方法在队列满的时候会直接返回 `false`，表示插入失败。

```java
/**
 * offer 方法入口
 *
 * @param e 元素
 * @return 是否插入成功
 */
public boolean offer(E e) {
    // 1. 获取锁
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        // 2. 直接调用 PriorityQueue 的 offer 方法
        q.offer(e);
        // 3. 如果新元素成为了堆顶（说明之前堆为空或新元素到期更早）
        //    需要重置 leader 并唤醒在 take() 中阻塞的线程
        if (q.peek() == e) {
            leader = null;
            available.signal();
        }
        return true;
    } finally {
        // 4. 释放锁
        lock.unlock();
    }
}
```

`DelayQueue` 的 `offer()` 方法底层是基于 `PriorityQueue` 的 `offer()` 方法实现的，`PriorityQueue` 内部实现了二叉堆的自动扩容和排序。

关键在于第 3 步的判断：`q.peek() == e` 表示新加入的元素成为了堆顶（到期时间最早）。这说明之前可能没有到期元素，或者有到期的但比新元素晚。此时需要把 `leader` 置为 `null`（之前可能在等待其他元素到期），并调用 `available.signal()` 唤醒在 `take()` 中阻塞的消费者线程，让它重新检查队头元素。

再看另外三个添加元素方法源码：

### add 方法源码

`add()` 方法底层基于 `offer()` 实现，逻辑相同。

```java
/**
 * add 方法入口
 *
 * @param e 元素
 * @return 是否添加成功
 */
public boolean add(E e) {
    return offer(e);
}
```

### put 方法源码

`put()` 方法底层也是基于 `offer()` 实现，逻辑相同。

```java
/**
 * put 方法入口
 *
 * @param e 元素
 */
public void put(E e) {
    offer(e);
}
```

### offer(e, time, unit) 源码

`offer(e, time, unit)` 方法底层也是基于 `offer()` 实现，逻辑相同，并没有实现阻塞指定时间的功能。这是因为 `DelayQueue` 是**无界队列**（底层 `PriorityQueue` 会自动扩容），永远不会满，所以所有添加方法都不会阻塞。

```java
/**
 * offer 方法入口
 *
 * @param e       元素
 * @param timeout 超时时间
 * @param unit    时间单位
 * @return 是否添加成功
 */
public boolean offer(E e, long timeout, TimeUnit unit) {
    return offer(e);
}
```

## 取数据源码

取数据（取出并删除）的方法有四个：

| 操作 | 抛出异常 | 返回特定值 | 阻塞 | 阻塞一段时间 |
| --- | --- | --- | --- | --- |
| 取数据（同时删除） | remove() | poll() | take() | poll(time, unit) |

### poll 方法源码

看一下 `poll()` 方法源码，其他取数据方法逻辑大同小异，都是从堆顶（二叉堆的头部）弹出元素。
`poll()` 方法在取元素的时候，如果队列为空或者元素未到期，直接返回 `null`。

```java
/**
 * poll 方法入口
 */
public E poll() {
    // 1. 获取锁
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        // 2. 获取堆顶元素
        E first = q.peek();
        // 3. 如果堆顶为空，或者还没有到期，则返回 null
        if (first == null || first.getDelay(NANOSECONDS) > 0) {
            return null;
        } else {
            // 4. 否则弹出并返回堆顶元素
            return q.poll();
        }
    } finally {
        // 5. 释放锁
        lock.unlock();
    }
}
```

### remove 方法源码

再看一下 `remove()` 方法源码。`remove()` 先调用 `poll()` 尝试取元素，如果取到（元素已到期）直接返回；如果没取到（队列为空或元素未到期），`poll()` 返回 `null`，`remove()` 会抛出 `NoSuchElementException` 异常。

```java
/**
 * remove 方法入口
 */
public E remove() {
    // 1. 直接调用 poll 方法
    E x = poll();
    // 2. 如果取到数据，直接返回，否则抛出异常
    if (x != null) {
        return x;
    } else {
        throw new NoSuchElementException();
    }
}
```

### take 方法源码

再看一下 `take()` 方法源码，如果没有到期元素，`take()` 方法会一直阻塞，直到被唤醒。

```java
/**
 * take 方法入口
 */
public E take() throws InterruptedException {
    // 1. 加锁，加可中断的锁
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
        for (;;) {
            // 2. 获取堆顶元素
            E first = q.peek();
            // 3. 如果堆顶为空，则无限等待（等待生产者添加元素）
            if (first == null) {
                available.await();
            } else {
                // 4. 如果堆顶不为空，获取到期剩余时间
                long delay = first.getDelay(NANOSECONDS);
                // 5. 如果剩余时间 <= 0，表示已到期，弹出并返回
                if (delay <= 0) {
                    return q.poll();
                }
                first = null; // 帮助 GC 回收
                // 6. 如果未到期，判断是否有 leader 线程在等待
                if (leader != null) {
                    // 已有 leader 在等待该元素到期，当前线程只需跟随等待
                    available.await();
                } else {
                    // 没有 leader，当前线程成为 leader，定时等待
                    Thread thisThread = Thread.currentThread();
                    leader = thisThread;
                    try {
                        available.awaitNanos(delay);
                    } finally {
                        if (leader == thisThread)
                            leader = null;
                    }
                }
            }
        }
    } finally {
        // 返回元素后，如果 leader 为空且队列中还有元素，唤醒下一个等待者
        if (leader == null && q.peek() != null) {
            available.signal();
        }
        // 7. 释放锁
        lock.unlock();
    }
}
```

`take()` 方法是 `DelayQueue` 中最核心的方法，包含了 **leader-follower 模式**的完整实现。逻辑分为三种情况：

1. **队列为空**（`first == null`）：调用 `available.await()` 无限等待，等待生产者添加元素后唤醒
2. **元素已到期**（`delay <= 0`）：直接 `q.poll()` 弹出并返回
3. **元素未到期**：进一步判断是否有 `leader` 线程在等待
   - 如果 `leader != null`：说明已经有其他线程在等待这个元素到期，当前线程只需调用 `available.await()` 跟随等待即可（leader 到期后会唤醒它）
   - 如果 `leader == null`：说明没有线程在等待，当前线程成为 `leader`，调用 `available.awaitNanos(delay)` 定时等待到元素到期。等待结束后自动唤醒，回到循环开头重新检查

`finally` 块中的 `available.signal()` 也很关键：当 leader 线程拿到到期元素返回后，如果队列中还有其他未到期的元素，需要唤醒下一个线程来成为新的 leader，继续等待下一个元素到期。

### poll(time, unit) 源码

再看一下 `poll(time, unit)` 方法源码。当队列为空或元素未到期时，`poll(time, unit)` 方法会阻塞指定时间，然后返回 `null`。

```java
/**
 * poll 方法入口
 *
 * @param timeout 超时时间
 * @param unit    时间单位
 * @return 元素
 */
public E poll(long timeout, TimeUnit unit) throws InterruptedException {
    long nanos = unit.toNanos(timeout);
    // 1. 加锁，加可中断的锁
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
        for (; ; ) {
            // 2. 获取堆顶元素
            E first = q.peek();
            // 3. 如果堆顶为空，判断是否超时
            if (first == null) {
                if (nanos <= 0) {
                    return null;
                } else {
                    nanos = available.awaitNanos(nanos);
                }
            } else {
                // 4. 如果堆顶不为空，获取到期剩余时间
                long delay = first.getDelay(NANOSECONDS);
                // 5. 如果剩余时间 <= 0，表示已到期，弹出并返回
                if (delay <= 0) {
                    return q.poll();
                }
                if (nanos <= 0) {
                    return null;
                }
                first = null; // 帮助 GC 回收
                // 6. 如果未到期，判断等待时间是否足够
                if (nanos < delay || leader != null) {
                    // 剩余等待时间小于元素到期时间，或已有 leader，跟随等待
                    nanos = available.awaitNanos(nanos);
                } else {
                    // 否则成为 leader，等待到元素到期
                    Thread thisThread = Thread.currentThread();
                    leader = thisThread;
                    try {
                        long timeLeft = available.awaitNanos(delay);
                        nanos -= delay - timeLeft;
                    } finally {
                        if (leader == thisThread)
                            leader = null;
                    }
                }
            }
        }
    } finally {
        if (leader == null && q.peek() != null)
            available.signal();
        // 7. 释放锁
        lock.unlock();
    }
}
```

`poll(time, unit)` 与 `take()` 方法逻辑类似，区别在于 `take()` 在队列为空时会一直阻塞，而 `poll(time, unit)` 只会阻塞指定的超时时间。

## 查看数据源码

再看一下查看数据的源码，只查看，不删除。

| 操作 | 抛出异常 | 返回特定值 | 阻塞 | 阻塞一段时间 |
| --- | --- | --- | --- | --- |
| 查看数据（不删除） | element() | peek() | 不支持 | 不支持 |

### peek 方法源码

先看一下 `peek()` 方法源码，如果队列为空，直接返回 `null`，底层基于 `PriorityQueue` 的 `peek()` 方法实现。

```java
/**
 * peek 方法入口
 */
public E peek() {
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        return q.peek();
    } finally {
        lock.unlock();
    }
}
```

### element 方法源码

再看一下 `element()` 方法源码，如果队列为空，则抛出异常，底层直接调用 `peek()` 方法。

```java
/**
 * element 方法入口
 */
public E element() {
    // 1. 调用 peek 方法查询数据
    E x = peek();
    // 2. 如果查到数据，直接返回
    if (x != null) {
        return x;
    } else {
        // 3. 如果没找到，则抛出异常
        throw new NoSuchElementException();
    }
}
```

## 总结

这篇文章讲解了 `DelayQueue` 阻塞队列的核心源码，了解到 `DelayQueue` 队列具有以下特点：

1. `DelayQueue` 实现了 `BlockingQueue` 接口，提供了四组放数据和取数据的方法，满足不同的使用场景。
2. `DelayQueue` 底层采用组合方式，复用 `PriorityQueue` 的按延迟时间排序功能（二叉堆），实现了延迟队列。
3. `DelayQueue` 是线程安全的，内部使用 `ReentrantLock` 加锁。
4. 采用了 **leader-follower 模式**优化等待：只有一个线程等待元素到期，其他线程跟随等待，避免多个线程同时等待同一个到期时间。

### 关键操作时间复杂度对比

| 操作 | 方法 | 时间复杂度 | 说明 |
| --- | --- | --- | --- |
| 添加 | offer/add/put | O(log n) | PriorityQueue 的 siftUp 操作 |
| 取到期元素 | poll/take | O(log n) | PriorityQueue 的 siftDown 操作 |
| 查看堆顶 | peek/element | O(1) | 直接返回堆顶元素 |
| 删除任意元素 | remove(Object) | O(n) | 需线性遍历查找 + PriorityQueue 的 remove |

### 使用建议

1. **元素必须实现 Delayed 接口**：`getDelay()` 返回剩余时间，`compareTo()` 按到期时间排序。注意使用**绝对时间戳**（`System.currentTimeMillis() + delay`）而不是相对延迟，避免多线程竞争时出现时钟偏差。
2. **DelayQueue 是无界队列**：底层 `PriorityQueue` 会自动扩容，永远不会满。所以 `put()`、`offer(e, time, unit)` 等方法的阻塞语义在 `DelayQueue` 中不生效，添加操作永远立即返回。如果需要有界限制，需要自行在业务层控制。
3. **take() 是阻塞消费的核心**：在多线程消费场景下，leader-follower 模式保证只有一个线程在等待元素到期，避免了无效的 CPU 轮询。如果业务需要在元素到期前取消任务，需要使用 `remove(Object)` 方法从队列中移除，时间复杂度为 O(n)。
4. **注意时钟精度和系统时间变化**：`getDelay()` 底层依赖 `System.currentTimeMillis()`，如果系统时钟被手动调整（如 NTP 同步），可能导致到期时间不准确。如果需要更精确的延迟，可以考虑使用 `System.nanoTime()`。
