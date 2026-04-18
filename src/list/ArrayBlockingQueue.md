## 引言

线程池的底层核心，其实是个阻塞队列。

Java 线程池（ThreadPoolExecutor）的核心工作原理就是生产者-消费者模式：线程提交任务（生产者）→ 队列缓存 → 工作线程拉取执行（消费者）。而 `ArrayBlockingQueue` 是线程池最常用的有界队列实现。

`ArrayBlockingQueue` 的设计堪称经典：底层基于循环数组，用一把 `ReentrantLock` 配合 `notEmpty` 和 `notFull` 两个 `Condition` 变量，实现了高效的生产者-消费者协作。本文将从源码级别深入剖析：

1. 循环数组如何实现零浪费的队列存储（与环形缓冲的关系）
2. 双 Condition 设计如何避免无效唤醒（与单一锁的对比）
3. put/take 方法的阻塞与唤醒机制
4. 公平锁 vs 非公平锁的性能差异（2-5x 吞吐量差距）
2. 生产者与消费者解耦的场景：生产者把数据放到队列中，消费者从队列中取数据进行消费。两者进行解耦，不用感知对方的存在。
3. 应对突发流量的场景：业务高峰期突然来了很多请求，可以放到队列中缓存起来，消费者以正常的频率从队列中拉取并消费数据，起到削峰的作用。

`BlockingQueue` 是个接口，定义了几组放数据和取数据的方法，来满足不同的场景。

| 操作 | 抛出异常 | 返回特定值 | 阻塞 | 阻塞一段时间 |
| --- | --- | --- | --- | --- |
| 放数据 | add() | offer() | put() | offer(e, time, unit) |
| 取数据（同时删除） | remove() | poll() | take() | poll(time, unit) |
| 查看数据（不删除） | element() | peek() | 不支持 | 不支持 |

`BlockingQueue` 有 5 个常见的实现类，应用场景不同：

- **ArrayBlockingQueue**：基于数组实现的阻塞队列，创建时需指定容量大小，是有界队列。
- **LinkedBlockingQueue**：基于链表实现的阻塞队列，默认是无界队列，创建时可以指定容量大小。
- **SynchronousQueue**：一种没有缓冲的阻塞队列，生产出的数据需要立刻被消费。
- **PriorityBlockingQueue**：实现了优先级的阻塞队列，基于堆（PriorityQueue）实现，是无界队列。
- **DelayQueue**：实现了延迟功能的阻塞队列，基于 PriorityQueue 实现，是无界队列。

今天重点讲一下 `ArrayBlockingQueue` 的底层实现原理。

## ArrayBlockingQueue 架构总览

`ArrayBlockingQueue` 的类继承关系和核心组件可以用下面的类图概括：

```mermaid
classDiagram
    class BlockingQueue {
        <<interface>>
        +add(E e)
        +offer(E e)
        +put(E e)
        +take() E
        +poll() E
        +remove() E
    }
    class Queue {
        <<interface>>
    }
    class AbstractQueue {
        #AbstractQueue()
        +add(E e)
        +removeAll()
    }
    class ArrayBlockingQueue {
        -final Object[] items
        -int takeIndex
        -int putIndex
        -int count
        -final ReentrantLock lock
        -final Condition notEmpty
        -final Condition notFull
        +ArrayBlockingQueue(int capacity)
        +ArrayBlockingQueue(int capacity, boolean fair)
        +offer(E e) boolean
        +put(E e) void
        +take() E
        +poll() E
        +enqueue(E x) void
        +dequeue() E
    }
    class ReentrantLock {
        +lock()
        +lockInterruptibly()
        +unlock()
        +newCondition() Condition
    }
    class Condition {
        +await()
        +signal()
        +awaitNanos(long) long
    }

    Queue <|-- BlockingQueue
    Queue <|-- AbstractQueue
    AbstractQueue <|-- ArrayBlockingQueue
    BlockingQueue <|.. ArrayBlockingQueue
    ArrayBlockingQueue *-- ReentrantLock : 使用
    ArrayBlockingQueue *-- Condition : notEmpty
    ArrayBlockingQueue *-- Condition : notFull
    ReentrantLock --> Condition : 创建
```

`ArrayBlockingQueue` 的核心工作原理可以用下面的流程图概括：

```mermaid
flowchart TD
    Start["初始化: items=new Object[capacity]\ntakeIndex=0, putIndex=0, count=0\nlock=ReentrantLock, notEmpty, notFull"] --> Offer["offer(e): 判空 → 加锁"]
    Offer --> CheckFull{"count == items.length?"}
    CheckFull -->|是| RetFalse["返回false"]
    CheckFull -->|否| Enqueue["enqueue(e):\nitems[putIndex] = x\nputIndex = (putIndex + 1) % capacity\ncount++\nnotEmpty.signal() 唤醒取数据线程"]
    Enqueue --> Unlock["释放锁, 返回true"]
    Put["put(e): 判空 → 加可中断锁"] --> CheckFullPut{"count == items.length?"}
    CheckFullPut -->|是| WaitFull["notFull.await()\n阻塞等待消费者腾出空间"]
    WaitFull --> CheckFullPut
    CheckFullPut -->|否| EnqueuePut["enqueue(e)"]
    EnqueuePut --> UnlockPut["释放锁"]
    Poll["poll(): 加锁"] --> CheckEmpty{"count == 0?"}
    CheckEmpty -->|是| RetNull["返回null"]
    CheckEmpty -->|否| Dequeue["dequeue():\nx = items[takeIndex]\nitems[takeIndex] = null\n  (置null, 帮助GC回收)\ntakeIndex = (takeIndex + 1) % capacity\ncount--\nnotFull.signal() 唤醒放数据线程"]
    Dequeue --> UnlockPoll["释放锁, 返回x"]
    Take["take(): 加可中断锁"] --> CheckEmptyTake{"count == 0?"}
    CheckEmptyTake -->|是| WaitEmpty["notEmpty.await()\n阻塞等待生产者放入元素"]
    WaitEmpty --> CheckEmptyTake
    CheckEmptyTake -->|否| DequeueTake["dequeue()"]
    DequeueTake --> UnlockTake["释放锁"]
```

## 为什么用循环数组

> 💡 **核心提示**：循环数组是 `ArrayBlockingQueue` 的核心设计，它解决了普通数组队列出队后空间浪费的问题。理解这一点，才能真正读懂 `putIndex` 和 `takeIndex` 的作用。

### 普通数组的问题

假设用一个普通 `Object[4]` 数组实现队列，`takeIndex` 指向队头，`putIndex` 指向队尾：

```
初始: [_, _, _, _]   takeIndex=0, putIndex=0

放入 A: [A, _, _, _]  takeIndex=0, putIndex=1
放入 B: [A, B, _, _]  takeIndex=0, putIndex=2
取出 A: [A, B, _, _]  takeIndex=1, putIndex=2  (A被取走但位置浪费了)
放入 C: [A, B, C, _]  takeIndex=1, putIndex=3
取出 B: [A, B, C, _]  takeIndex=2, putIndex=3  (B也被取走但位置浪费了)
```

问题越来越明显：**已经出队的元素占用的空间无法再利用**，`putIndex` 只能往后走，即使前面有空位也无法写入。最终即使队列中只有 1 个元素，也会因为 `putIndex` 到达数组末尾而误判为"队列已满"。

解决方案有两个：
1. **每次出队后将后面所有元素向前移动**：成本 O(n)，`remove(Object)` 就是这样做的。
2. **用循环数组**：索引到达末尾后回到 0，空间复用，成本 O(1)。

### 循环数组如何实现

`ArrayBlockingQueue` 采用的是第二种方案，核心逻辑就是取模（或等价的条件判断）：

```java
// 入队时 putIndex 向后移动，到达末尾回到 0
if (++putIndex == items.length) {
    putIndex = 0;
}

// 出队时 takeIndex 向后移动，到达末尾回到 0
if (++takeIndex == items.length) {
    takeIndex = 0;
}
```

用 `if (++i == length) i = 0;` 代替 `%` 取模运算是因为 **条件判断比取模运算更快**，这在源码中被大量使用。

### 如何判断队列满/空

循环数组有一个经典问题：**如何区分队列满和空**？因为满和空时 `takeIndex == putIndex`。

`ArrayBlockingQueue` 的解法很简洁：用一个额外的 `count` 字段记录当前元素个数：

- `count == 0`：队列为空
- `count == items.length`：队列已满
- `0 < count < items.length`：正常状态

> 💡 **核心提示**：为什么不牺牲一个数组位置来区分满空（像某些教材中那样）？因为 `ArrayBlockingQueue` 要求"指定容量就是实际可用容量"，这对业务开发者来说更直观，不需要 `capacity - 1` 这种反直觉的换算。

## ArrayBlockingQueue 类结构

先看一下 `ArrayBlockingQueue` 类里面有哪些属性：

```java
public class ArrayBlockingQueue<E>
        extends AbstractQueue<E>
        implements BlockingQueue<E>, java.io.Serializable {

    /**
     * 用来存放元素的数组
     */
    final Object[] items;

    /**
     * 下次取数据的数组下标位置
     */
    int takeIndex;

    /**
     * 下次放数据的数组下标位置
     */
    int putIndex;

    /**
     * 元素个数
     */
    int count;

    /**
     * 独占锁，用来保证存取数据的线程安全
     */
    final ReentrantLock lock;

    /**
     * 取数据的条件队列：当数组非空时唤醒消费者
     */
    private final Condition notEmpty;

    /**
     * 放数据的条件队列：当数组不满时唤醒生产者
     */
    private final Condition notFull;

}
```

可以看出 `ArrayBlockingQueue` 底层是基于数组实现的，使用 `Object[]` 数组 `items` 存储元素。为了实现循环队列特性（一端插入，另一端删除），定义了两个指针：`takeIndex` 表示下次取数据的位置，`putIndex` 表示下次放数据的位置。

另外 `ArrayBlockingQueue` 使用 `ReentrantLock` 保证线程安全，并且定义了两个**条件变量**：

- **`notEmpty`**：当队列中有元素时（非空），生产者调用 `notEmpty.signal()` 唤醒等待的消费者线程
- **`notFull`**：当队列中有空位时（不满），消费者调用 `notFull.signal()` 唤醒等待的生产者线程

> 💡 **核心提示**：为什么用两个 `Condition` 而不是一个？如果只有一个条件变量，`signal()` 会唤醒所有等待线程（包括生产者和消费者），导致"惊群效应"——被唤醒的生产者发现队列仍然是满的，只能继续等待，白白浪费 CPU。分开 `notEmpty` 和 `notFull` 可以实现精准唤醒，生产者只唤醒消费者，消费者只唤醒生产者。

生产者-消费者通过这两个条件变量实现协调：队列满时生产者等待在 `notFull` 上，队列空时消费者等待在 `notEmpty` 上。

## 初始化

`ArrayBlockingQueue` 常用的初始化方法有两个：

1. 指定容量大小（默认非公平锁）
2. 指定容量大小和是否是公平锁

```java
/**
 * 指定容量大小的构造方法（默认非公平锁）
 */
BlockingQueue<Integer> queue1 = new ArrayBlockingQueue<>(10);

/**
 * 指定容量大小和公平锁的构造方法
 */
BlockingQueue<Integer> queue2 = new ArrayBlockingQueue<>(10, true);
```

再看一下对应的源码实现：

```java
/**
 * 指定容量大小的构造方法（默认非公平锁）
 */
public ArrayBlockingQueue(int capacity) {
    this(capacity, false);
}

/**
 * 指定容量大小、公平锁的构造方法
 *
 * @param capacity 数组容量
 * @param fair     是否是公平锁
 */
public ArrayBlockingQueue(int capacity, boolean fair) {
    if (capacity <= 0) {
        throw new IllegalArgumentException();
    }
    this.items = new Object[capacity];
    lock = new ReentrantLock(fair);
    notEmpty = lock.newCondition();
    notFull = lock.newCondition();
}
```

`ArrayBlockingQueue` 在初始化时就一次性创建好指定容量的数组，并在构造方法中初始化锁和两个条件变量。公平锁的选择取决于业务场景：公平锁按照线程请求锁的顺序分配，避免线程饥饿，但吞吐量较低；非公平锁吞吐量更高，但某些线程可能长期等待。

> 💡 **核心提示**：公平锁 vs 非公平锁的实际影响远超想象。在低竞争场景下两者几乎没有区别；但在高并发+多生产者的场景下，非公平锁的吞吐量可能是公平锁的 **2-5 倍**。原因是公平锁需要维护等待队列并逐个唤醒，引入了额外的 CAS 操作和内存屏障。绝大多数场景使用默认的非公平锁即可，只有在需要严格保证"先到先得"（如计费、审计场景）时才切换到公平锁。

## 放数据源码

放数据的方法有四个：

| 操作 | 抛出异常 | 返回特定值 | 阻塞 | 阻塞一段时间 |
| --- | --- | --- | --- | --- |
| 放数据 | add() | offer() | put() | offer(e, time, unit) |

### offer 方法源码

先看一下 `offer()` 方法源码：

```java
/**
 * offer 方法入口
 *
 * @param e 元素
 * @return 是否插入成功
 */
public boolean offer(E e) {
    // 1. 判空，传参不允许为 null
    checkNotNull(e);
    // 2. 加锁
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        // 3. 判断数组是否已满，如果满了就直接返回 false
        if (count == items.length) {
            return false;
        } else {
            // 4. 否则执行入队
            enqueue(e);
            return true;
        }
    } finally {
        // 5. 释放锁
        lock.unlock();
    }
}

/**
 * 入队
 *
 * @param x 元素
 */
private void enqueue(E x) {
    // 1. 获取数组
    final Object[] items = this.items;
    // 2. 放入 putIndex 位置
    items[putIndex] = x;
    // 3. putIndex 向后移动一位，到达数组末尾时回到 0（循环队列）
    if (++putIndex == items.length) {
        putIndex = 0;
    }
    // 4. 元素计数加一
    count++;
    // 5. 唤醒因为队列为空而在 notEmpty 上等待的消费者线程
    notEmpty.signal();
}
```

`offer()` 的逻辑：判空 -> 加锁 -> 检查队列是否已满（`count == items.length`） -> 满了返回 `false`，否则调用 `enqueue` 入队 -> 释放锁。

`enqueue` 方法中有一个关键设计：`putIndex` 到达数组末尾后会回到 0，这就是**循环队列**的实现方式。数组空间可以被循环利用，不会像普通数组那样因为头部出队而浪费空间。

### add 方法源码

`add()` 方法在队列满的时候会抛出异常，底层基于 `offer()` 实现：

```java
/**
 * add 方法入口
 *
 * @param e 元素
 * @return 是否添加成功
 */
public boolean add(E e) {
    if (offer(e)) {
        return true;
    } else {
        throw new IllegalStateException("Queue full");
    }
}
```

### put 方法源码

`put()` 方法在队列满的时候会一直阻塞，直到有其他线程取走数据、空出位置，才能添加成功。

```java
/**
 * put 方法入口
 *
 * @param e 元素
 */
public void put(E e) throws InterruptedException {
    // 1. 判空，传参不允许为 null
    checkNotNull(e);
    // 2. 加可中断的锁，防止线程无法被唤醒
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
        // 3. 如果队列已满，就一直阻塞在 notFull 条件上
        while (count == items.length) {
            notFull.await();
        }
        // 4. 队列未满，执行入队
        enqueue(e);
    } finally {
        // 5. 释放锁
        lock.unlock();
    }
}
```

> 💡 **核心提示**：为什么 `put()` 和 `take()` 中使用 `while` 循环而不是 `if` 判断？这是并发编程中的经典防御性编程。原因有三：
> 1. **虚假唤醒（Spurious Wakeup）**：JVM 规范允许线程在没有被 `signal()` 的情况下被唤醒，`while` 可以在唤醒后重新检查条件。
> 2. **多消费者竞争**：`signal()` 只唤醒一个线程，但被唤醒的线程在重新获取锁的过程中，另一个线程可能已经把资源消费了，条件不再满足。
> 3. **Condition 语义**：`await()` 返回不代表条件一定成立，只代表"你被唤醒了"，必须自己验证。

注意这里使用 `while` 循环而不是 `if` 判断，是因为存在**虚假唤醒**的可能——线程可能在没有被 `signal()` 的情况下被唤醒。用 `while` 可以在唤醒后重新检查条件是否真的满足。

### offer(e, time, unit) 源码

`offer(e, time, unit)` 方法在队列满的时候会阻塞指定时间，超时后返回 `false`。

```java
/**
 * offer 方法入口
 *
 * @param e       元素
 * @param timeout 超时时间
 * @param unit    时间单位
 * @return 是否添加成功
 */
public boolean offer(E e, long timeout, TimeUnit unit) throws InterruptedException {
    // 1. 判空，传参不允许为 null
    checkNotNull(e);
    // 2. 把超时时间转换为纳秒
    long nanos = unit.toNanos(timeout);
    // 3. 加可中断的锁
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
        // 4. 循环判断队列是否已满
        while (count == items.length) {
            if (nanos <= 0) {
                // 5. 如果超时时间已过，返回 false
                return false;
            }
            // 6. 在 notFull 条件上等待指定纳秒数
            nanos = notFull.awaitNanos(nanos);
        }
        // 7. 队列未满，执行入队
        enqueue(e);
        return true;
    } finally {
        // 8. 释放锁
        lock.unlock();
    }
}
```

## 取数据源码

取数据（取出并删除）的方法有四个：

| 操作 | 抛出异常 | 返回特定值 | 阻塞 | 阻塞一段时间 |
| --- | --- | --- | --- | --- |
| 取数据（同时删除） | remove() | poll() | take() | poll(time, unit) |

### poll 方法源码

看一下 `poll()` 方法源码：

```java
/**
 * poll 方法入口
 */
public E poll() {
    // 1. 加锁
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        // 2. 如果队列为空，返回 null，否则从队头取出元素
        return (count == 0) ? null : dequeue();
    } finally {
        // 3. 释放锁
        lock.unlock();
    }
}

/**
 * 出队
 */
private E dequeue() {
    // 1. 获取队头元素
    final Object[] items = this.items;
    E x = (E) items[takeIndex];
    // 2. 取出元素后，将该位置置 null（帮助 GC 回收）
    items[takeIndex] = null;
    // 3. takeIndex 向后移动一位，到达数组末尾时回到 0（循环队列）
    if (++takeIndex == items.length) {
        takeIndex = 0;
    }
    // 4. 元素计数减一
    count--;
    // 5. 唤醒因为队列已满而在 notFull 条件上等待的生产者线程
    notFull.signal();
    return x;
}
```

`dequeue` 方法中，取出元素后把 `items[takeIndex]` 置为 `null`，这是一个**GC 友好**的设计。因为循环数组会不断复用，如果不置为 `null`，已经被取走的元素的引用仍然存在，可能导致对象无法被 GC 回收（类似内存泄漏）。

`takeIndex` 同样在到达数组末尾后回到 0，实现循环队列的循环利用。

### remove 方法源码

`remove()` 方法在队列为空时会抛出异常：

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

除了从队头删除元素外，`ArrayBlockingQueue` 还提供了删除指定元素的方法 `remove(Object o)`：

```java
/**
 * 删除指定元素
 */
public boolean remove(Object o) {
    if (o == null) return false;
    final Object[] items = this.items;
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        // 从 takeIndex 开始线性遍历查找
        for (int i = takeIndex, k = count; k > 0; i = inc(i), k--) {
            if (o.equals(items[i])) {
                removeAt(i);
                return true;
            }
        }
        return false;
    } finally {
        lock.unlock();
    }
}
```

`remove(Object o)` 需要从 `takeIndex` 开始线性遍历查找目标元素（O(n)），找到后调用 `removeAt(i)` 删除。`removeAt` 的逻辑比较复杂：如果被删除的元素在队头或队尾，直接 dequeue 或调整 putIndex 即可；如果在中间位置，需要将后面的元素逐个向前移动一位。

### take 方法源码

`take()` 方法在队列为空时会一直阻塞，直到被唤醒：

```java
/**
 * take 方法入口
 */
public E take() throws InterruptedException {
    // 1. 加可中断的锁
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
        // 2. 如果队列为空，就一直阻塞在 notEmpty 条件上
        while (count == 0) {
            notEmpty.await();
        }
        // 3. 队列不为空，执行出队
        return dequeue();
    } finally {
        // 4. 释放锁
        lock.unlock();
    }
}
```

### poll(time, unit) 源码

`poll(time, unit)` 方法在队列为空时会阻塞指定时间，超时后返回 `null`。

```java
/**
 * poll 方法入口
 *
 * @param timeout 超时时间
 * @param unit    时间单位
 * @return 元素
 */
public E poll(long timeout, TimeUnit unit) throws InterruptedException {
    // 1. 把超时时间转换成纳秒
    long nanos = unit.toNanos(timeout);
    // 2. 加可中断的锁
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
        // 3. 循环判断队列是否为空
        while (count == 0) {
            if (nanos <= 0) {
                // 4. 如果超时时间已过，返回 null
                return null;
            }
            // 5. 在 notEmpty 条件上等待指定纳秒数
            nanos = notEmpty.awaitNanos(nanos);
        }
        // 6. 队列不为空，执行出队
        return dequeue();
    } finally {
        // 7. 释放锁
        lock.unlock();
    }
}
```

`poll(time, unit)` 与 `take()` 方法逻辑类似，区别在于 `take()` 在队列为空时会一直阻塞，而 `poll(time, unit)` 只会阻塞指定的超时时间。

## 查看数据源码

查看数据，并不删除。

| 操作 | 抛出异常 | 返回特定值 | 阻塞 | 阻塞一段时间 |
| --- | --- | --- | --- | --- |
| 查看数据（不删除） | element() | peek() | 不支持 | 不支持 |

### peek 方法源码

`peek()` 方法在队列为空时返回 `null`：

```java
/**
 * peek 方法入口
 */
public E peek() {
    // 1. 加锁
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        // 2. 返回队头元素，如果队列为空则返回 null
        return itemAt(takeIndex);
    } finally {
        // 3. 释放锁
        lock.unlock();
    }
}

/**
 * 返回指定位置的元素
 */
final E itemAt(int i) {
    return (E) items[i];
}
```

### element 方法源码

`element()` 方法在队列为空时抛出异常：

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

## ArrayBlockingQueue vs LinkedBlockingQueue vs ConcurrentLinkedQueue

这三者是最常被拿来对比的队列，但它们的定位完全不同：

| 对比维度 | ArrayBlockingQueue | LinkedBlockingQueue | ConcurrentLinkedQueue |
| --- | --- | --- | --- |
| **底层结构** | 循环数组 | 单向链表（两把锁） | 单向链表（无锁） |
| **有界/无界** | 有界（必须指定容量） | 默认无界（可指定） | 无界 |
| **线程安全** | ReentrantLock（独占锁） | 两把 ReentrantLock（putLock + takeLock） | CAS 无锁算法 |
| **锁粒度** | 一把锁（读写互斥） | 两把锁（读写可并行） | 无锁（CAS 自旋） |
| **内存占用** | 一次性分配固定数组 | 每个元素额外创建一个 Node 对象 | 每个元素额外创建一个 Node 对象 |
| **读写吞吐量** | 中等 | 较高（读写分离锁） | 最高（无锁） |
| **阻塞支持** | 支持 | 支持 | **不支持**（非阻塞） |
| **扩容能力** | 不可扩容 | 不可扩容（但默认无界） | 动态增长 |
| **适用场景** | 需要严格有界+阻塞控制 | 高吞吐生产者-消费者 | 高并发、无需阻塞、可接受无界 |

> 💡 **核心提示**：选队列的核心判断路径：
> 1. 需要**阻塞**功能（put/take）？ -> 选 `ArrayBlockingQueue` 或 `LinkedBlockingQueue`
> 2. 需要**严格有界**（防止 OOM）？ -> 选 `ArrayBlockingQueue`
> 3. 追求**极致吞吐量**且不需要阻塞？ -> 选 `ConcurrentLinkedQueue`
> 4. 生产消费速率差异大？ -> 选 `LinkedBlockingQueue`（读写分离锁，吞吐量更高）

## 生产环境避坑指南

以下是 `ArrayBlockingQueue` 在生产环境中最容易踩的坑：

| 坑点 | 表现 | 原因 | 解决方案 |
| --- | --- | --- | --- |
| **容量设置过小** | 生产者频繁阻塞，TP99 飙升 | `put()` 在队列满时阻塞，消费者处理不过来时所有生产者排队等待 | 根据生产/消费速率差估算合理容量，或用 `offer(e, time, unit)` 设置超时 |
| **容量设置过大** | 内存占用高，GC 压力大，OOM 风险 | 一次性分配 `Object[capacity]` 数组，且堆积大量未消费对象 | 监控队列深度，设置告警阈值，优先保证消费者处理能力 |
| **误用公平锁** | 高并发下吞吐量骤降 50% 以上 | 公平锁需要维护 FIFO 等待队列，额外的 CAS 和内存屏障开销 | 默认使用非公平锁，仅在需要严格"先到先得"（如计费场景）时用公平锁 |
| **用 if 代替 while** | 数据丢失或重复消费（自定义实现时） | `if` 无法应对虚假唤醒和多线程竞争导致的状态变化 | 条件等待必须用 `while` 循环（参考 JDK 源码写法） |
| **remove(Object) 频繁调用** | 性能急剧下降，锁持有时间过长 | O(n) 线性遍历+可能的数组元素前移，持锁期间阻塞其他所有操作 | 避免在阻塞队列上按值删除，需要时用业务层标记删除 |
| **忘记处理 InterruptedException** | 线程无法正常退出，应用关闭卡住 | `put()/take()` 阻塞中收到中断信号后抛出异常，catch 后吞掉异常导致线程继续运行 | 捕获后恢复中断状态 `Thread.currentThread().interrupt()` 并退出循环 |
| **单 ReentrantLock 成为瓶颈** | 多生产者+多消费者场景下吞吐量不如预期 | 读写共用一把锁，生产者和消费者无法并行操作 | 高吞吐场景切换到 `LinkedBlockingQueue`（两把锁）或 `ConcurrentLinkedQueue`（无锁） |
| **null 元素导致 NPE** | 运行时 `NullPointerException` | `ArrayBlockingQueue` 不允许 null 元素，`checkNotNull` 会直接抛异常 | 确保上游数据源不产生 null，或用 Optional 包装 |

## 总结

这篇文章讲解了 `ArrayBlockingQueue` 阻塞队列的核心源码，了解到 `ArrayBlockingQueue` 具有以下特点：

1. `ArrayBlockingQueue` 实现了 `BlockingQueue` 接口，提供了四组放数据和取数据的方法，满足不同场景需求。
2. 底层基于数组实现，采用**循环队列**设计，`takeIndex` 和 `putIndex` 到达数组末尾后回到 0，实现空间复用。
3. 初始化时必须指定容量大小，是**有界的阻塞队列**，需要预估好队列长度，保证生产者和消费者的速率相匹配。
4. 使用 `ReentrantLock` + 两个 `Condition`（`notEmpty` 和 `notFull`）实现线程安全和生产者-消费者协调机制。
5. 取数据后将出队位置**置为 null**，避免循环数组中残留无用引用导致 GC 无法回收对象。

### 关键操作时间复杂度对比

| 操作 | 方法 | 时间复杂度 | 说明 |
| --- | --- | --- | --- |
| 入队 | offer/put/add | O(1) | 直接写入 putIndex 位置 |
| 出队 | poll/take/remove() | O(1) | 直接读取 takeIndex 位置 |
| 查看队头 | peek/element | O(1) | 直接读取 takeIndex 位置 |
| 删除指定元素 | remove(Object) | O(n) | 需从 takeIndex 开始线性遍历查找 |
| 剩余容量 | remainingCapacity | O(1) | 返回 items.length - count |

### 使用建议

1. **有界队列需合理设置容量**：`ArrayBlockingQueue` 是有界队列，创建时必须指定容量。容量过小会导致生产者频繁阻塞，容量过大会占用过多内存。应根据生产者和消费者的速率差异来设置合理的大小。
2. **公平锁 vs 非公平锁**：默认使用非公平锁（`fair=false`），吞吐量更高。只有在需要严格保证线程公平性（防止饥饿）的场景下才使用公平锁。
3. **选择正确的阻塞方法**：如果生产者可以丢弃数据，使用 `offer()` 或 `offer(e, time, unit)`；如果生产者必须等待，使用 `put()`。消费者同理：可以超时返回的用 `poll(time, unit)`，必须等待的用 `take()`。
4. **删除任意元素成本高**：`remove(Object)` 需要 O(n) 线性遍历查找，在循环数组中还可能涉及元素前移。如果需要频繁按值删除元素，应考虑其他数据结构。

### 行动清单

学完本文后，建议完成以下行动来巩固理解：

1. **动手实验**：编写一个生产者-消费者 demo，分别用 `put()` 和 `offer(e, time, unit)` 观察队列满时的不同行为，理解阻塞 vs 超时的差异。
2. **源码追踪**：在 IDEA 中打断点跟踪 `put()` -> `notFull.await()` -> `signal()` 的完整链路，观察 Condition 的内部状态变化。
3. **压力测试**：用 JMH 对比 `ArrayBlockingQueue` 和 `LinkedBlockingQueue` 在不同线程数（1 生产者/1 消费者 vs 4 生产者/4 消费者）下的吞吐量差异，验证"两把锁 vs 一把锁"的性能差距。
4. **公平锁对比实验**：分别用 `fair=true` 和 `fair=false` 初始化队列，在高并发场景下观察吞吐量和线程等待时间的差异，理解公平锁的实际代价。
5. **异常处理审查**：检查你项目中所有使用 `BlockingQueue` 的代码，确认是否正确处理了 `InterruptedException`（恢复中断状态而非吞掉异常）。
6. **容量合理性评估**：梳理项目中所有 `ArrayBlockingQueue` 的容量设置，确认是否基于实际压测数据而非"拍脑袋"设置，并添加队列深度监控告警。
7. **选型决策**：回顾项目中的队列使用场景，对照本文的对比表格，评估当前选型是否最优。特别是检查是否有误用 `ArrayBlockingQueue` 的场景（如无阻塞需求却用了阻塞队列）。
