欢迎学习《解读Java源码专栏》，在这个系列中，我将手把手带着大家剖析Java核心组件的源码，内容包含集合、线程、线程池、并发、队列等，深入了解其背后的设计思想和实现细节，轻松应对工作面试。
这是解读Java源码系列的第11篇，将跟大家一起学习Java中的阻塞队列 —— `SynchronousQueue`。

## 引言
前面文章我们讲解了 `ArrayBlockingQueue` 和 `LinkedBlockingQueue` 源码，这篇文章开始讲解 `SynchronousQueue` 源码。从名字上就能看到 `ArrayBlockingQueue` 是基于数组实现的，而 `LinkedBlockingQueue` 是基于链表实现，而 `SynchronousQueue` 是基于什么数据结构实现的？看不出来，好像实现了同步的队列。

无论是 `ArrayBlockingQueue` 还是 `LinkedBlockingQueue` 都是起到缓冲队列的作用，当消费者的消费速度跟不上时，任务就在队列中堆积，需要等待消费者慢慢消费。

如果我们想要自己的任务快速执行，不要积压在队列中，该怎么办？

今天的主角 `SynchronousQueue` 就派上用场了。

`SynchronousQueue` 被称为**同步队列**，它**不存储任何元素**。当生产者往队列中放元素的时候，必须等待消费者把这个元素取走，否则一直阻塞。消费者取元素的时候，也必须等待生产者往队列中放元素。换句话说，`SynchronousQueue` 是一个**零容量**的阻塞队列，每次 `put` 必须等待一个 `take`，反之亦然。

由于 `SynchronousQueue` 实现了 `BlockingQueue` 接口，而 `BlockingQueue` 接口中定义了几组放数据和取数据的方法，来满足不同的场景。

| 操作 | 抛出异常 | 返回特定值 | 一直阻塞 | 阻塞指定时间 |
| --- | --- | --- | --- | --- |
| 放数据 | add() | offer() | put() | offer(e, time, unit) |
| 取数据（同时删除） | remove() | poll() | take() | poll(time, unit) |
| 查看数据（不删除） | element() | peek() | 不支持 | 不支持 |

Java 线程池中的带缓存的线程池就是基于 `SynchronousQueue` 实现的：

```java
// 创建带缓存的线程池
ExecutorService executorService = Executors.newCachedThreadPool();
```

对应的源码实现：

```java
// 底层使用 SynchronousQueue 队列处理任务
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
            60L, TimeUnit.SECONDS,
            new SynchronousQueue<Runnable>());
}
```

这里选择 `SynchronousQueue` 的原因：带缓存的线程池需要任务被**立即执行**，不能堆积在队列中。`SynchronousQueue` 的零容量特性正好满足这个需求 —— 生产者提交任务时，如果没有空闲线程（消费者）来领取，就会创建新线程来执行。

`SynchronousQueue` 的核心工作原理可以用下面的流程图概括：

```mermaid
flowchart TD
    Start["初始化: fair=false 时 transferer=TransferStack(栈)\nfair=true 时 transferer=TransferQueue(队列)"] --> Transfer["transfer(e, timed, nanos)\nput/take/poll/offer 全部委托给此方法\ne!=null: 放数据模式(DATA)\ne==null: 取数据模式(REQUEST)"]
    Transfer --> CheckMode{"当前操作模式 与\n栈顶/队尾节点模式相同?"}
    CheckMode -->|相同(都是放或都是取)| PushWait["包装成节点(SNode/QNode)\n压入栈顶 或 追加到队尾\n自旋等待 → 挂起线程\n等待互补操作到来"]
    CheckMode -->|不同(互补操作)| Match["找到互补模式的节点\n(放数据 ↔ 取数据)\n将 e 传递给对方节点\nCAS 设置 match = 对方节点"]
    Match --> Wakeup["LockSupport.unpark(对方线程)\n唤醒对方"]
    Wakeup --> Return["对方线程被唤醒, 从 awaitFulfill 返回\n获取传递过来的数据\n双方各自返回"]
    PushWait --> Timeout{"超时或中断?"}
    Timeout -->|是| Cancel["tryCancel()\n取消节点, 清理栈/队列\n返回 null"]
    Timeout -->|否| Match
    Return --> Done["返回传递的元素 e"]
    Cancel --> DoneNull["返回 null"]
```

## 类结构
先看一下 `SynchronousQueue` 类里面有哪些属性：

```java
public class SynchronousQueue<E>
        extends AbstractQueue<E>
        implements BlockingQueue<E>, java.io.Serializable {

    /**
     * 转接器（栈和队列的父类）
     */
    abstract static class Transferer<E> {

        /**
         * 转移（put 和 take 都用这一个方法）
         *
         * @param e     元素（取数据时为 null）
         * @param timed 是否超时
         * @param nanos 纳秒
         */
        abstract E transfer(E e, boolean timed, long nanos);

    }

    /**
     * 基于栈的实现（非公平策略）
     */
    static final class TransferStack<E> extends Transferer<E> {
    }

    /**
     * 基于队列的实现（公平策略）
     */
    static final class TransferQueue<E> extends Transferer<E> {
    }

}
```

`SynchronousQueue` 底层是基于 `Transferer` 抽象类实现的，放数据和取数据的逻辑都耦合在 `transfer()` 方法中。`Transferer` 抽象类有两个实现类：

- **`TransferStack`**：基于栈结构实现，对应**非公平策略**（LIFO）
- **`TransferQueue`**：基于队列结构实现，对应**公平策略**（FIFO）

## 初始化
`SynchronousQueue` 常用的初始化方法有两个：

1. 无参构造方法（默认非公平锁）
2. 指定是否使用公平锁的有参构造方法

```java
/**
 * 无参构造方法（默认非公平策略）
 */
BlockingQueue<Integer> queue1 = new SynchronousQueue<>();

/**
 * 有参构造方法，指定是否使用公平锁
 */
BlockingQueue<Integer> queue2 = new SynchronousQueue<>(true);
```

再看一下对应的源码实现：

```java
/**
 * 无参构造方法
 */
public SynchronousQueue() {
    this(false);
}

/**
 * 有参构造方法，指定是否使用公平锁
 */
public SynchronousQueue(boolean fair) {
    transferer = fair ? new TransferQueue<E>() : new TransferStack<E>();
}
```

可以看出 `SynchronousQueue` 的无参构造方法默认使用非公平策略，有参构造方法可以指定使用公平策略。**注意：`SynchronousQueue` 没有容量参数**，因为它是零容量队列，不需要指定容量。

**操作策略：**

1. **公平策略**：基于 `TransferQueue` 实现，先进先出，按照线程等待的顺序来分配操作权。
2. **非公平策略**：基于 `TransferStack` 实现，后进先出，后到达的线程可能先匹配成功。

## 栈实现

### 栈的类结构

```java
/**
 * 栈实现
 */
static final class TransferStack<E> extends Transferer<E> {

    /**
     * 头节点（也是栈顶节点）
     */
    volatile SNode head;

    /**
     * 栈节点类
     */
    static final class SNode {

        /**
         * 当前操作线程
         */
        volatile Thread waiter;

        /**
         * 节点值（取数据的时候，该字段为 null）
         */
        Object item;

        /**
         * 节点模式（也叫操作类型）
         */
        int mode;

        /**
         * 后继节点
         */
        volatile SNode next;

        /**
         * 匹配到的节点
         */
        volatile SNode match;

    }
}
```

节点模式有以下三种：

| 类型值 | 类型描述 | 作用 |
| --- | --- | --- |
| 0 | REQUEST | 表示取数据 |
| 1 | DATA | 表示放数据 |
| 2 | FULFILLING | 表示正在执行匹配（比如取数据的线程正在匹配放数据的线程） |

![TransferStack栈结构](https://javabaguwen.com/img/SynchronousQueue1.png)

### 栈的 transfer 方法实现

`transfer()` 方法中，把放数据和取数据的逻辑耦合在一块了，逻辑有点绕，不过核心逻辑就四点，把握住就能豁然开朗。其实就是从栈顶压入，从栈顶弹出。

**详细流程如下：**

1. 首先判断当前线程的操作类型与栈顶节点的操作类型是否一致（比如都是放数据，或者都是取数据）。
2. 如果一致，把当前操作包装成 `SNode` 节点，压入栈顶，并挂起当前线程。
3. 如果不一致，表示相互匹配（比如当前操作是放数据，而栈顶节点是取数据，或者相反）。然后把当前操作包装成 `SNode` 节点（`FULFILLING` 模式）压入栈顶，并使用 `tryMatch()` 方法匹配两个节点。匹配成功后，弹出这两个节点，并唤醒栈顶节点的线程，同时把数据传递给栈顶节点的线程，最后返回。
4. 栈顶节点线程被唤醒，继续执行，然后返回传递过来的数据。

```java
/**
 * 转移（put 和 take 都用这一个方法）
 *
 * @param e     元素（取数据的时候为 null）
 * @param timed 是否超时
 * @param nanos 纳秒
 */
E transfer(E e, boolean timed, long nanos) {
    SNode s = null;
    // 1. e 为 null 表示要取数据，否则是放数据
    int mode = (e == null) ? REQUEST : DATA;
    for (; ; ) {
        SNode h = head;
        // 2. 如果本次操作跟栈顶节点模式相同（都是取数据，或者都是放数据），就把本次操作包装成 SNode，压入栈顶
        if (h == null || h.mode == mode) {
            if (timed && nanos <= 0) {
                if (h != null && h.isCancelled()) {
                    casHead(h, h.next);
                } else {
                    return null;
                }
            // 3. 把本次操作包装成 SNode，压入栈顶，并挂起当前线程
            } else if (casHead(h, s = snode(s, e, h, mode))) {
                // 4. 挂起当前线程（等待互补操作）
                SNode m = awaitFulfill(s, timed, nanos);
                if (m == s) {
                    clean(s);
                    return null;
                }
                // 5. 当前线程被唤醒后，如果栈顶有了新节点，就删除当前节点
                if ((h = head) != null && h.next == s) {
                    casHead(h, s.next);
                }
                return (E) ((mode == REQUEST) ? m.item : s.item);
            }
        // 6. 如果栈顶节点类型跟本次操作不同，并且模式不是 FULFILLING 类型
        } else if (!isFulfilling(h.mode)) {
            if (h.isCancelled()) {
                casHead(h, h.next);
            }
            // 7. 把本次操作包装成 SNode（类型是 FULFILLING），压入栈顶
            else if (casHead(h, s = snode(s, e, h, FULFILLING | mode))) {
                // 8. 使用循环，直到匹配到对应的节点
                for (; ; ) {
                    // 9. 遍历下个节点
                    SNode m = s.next;
                    // 10. 如果节点是 null，表示遍历到末尾，清空栈顶，结束。
                    if (m == null) {
                        casHead(s, null);
                        s = null;
                        break;
                    }
                    SNode mn = m.next;
                    // 11. 如果栈顶的后继节点跟栈顶节点匹配成功，就删除这两个节点，结束。
                    if (m.tryMatch(s)) {
                        casHead(s, mn);
                        return (E) ((mode == REQUEST) ? m.item : s.item);
                    } else {
                        // 12. 如果没有匹配成功，就删除栈顶的后继节点，继续匹配
                        s.casNext(m, mn);
                    }
                }
            }
        } else {
            // 13. 如果栈顶节点类型跟本次操作不同，并且是 FULFILLING 类型，
            // 就再执行一遍上面第 8 步 for 循环中的逻辑（很少概率出现）
            SNode m = h.next;
            if (m == null) {
                casHead(h, null);
            } else {
                SNode mn = m.next;
                if (m.tryMatch(h)) {
                    casHead(h, mn);
                } else {
                    h.casNext(m, mn);
                }
            }
        }
    }
}
```

不用关心细枝末节，把握住代码核心逻辑即可。

再看一下第 4 步挂起线程的代码逻辑：

核心逻辑就两条：
- 计算自旋次数，先自旋等待（避免立即挂起线程的开销）
- 自旋结束后仍未匹配到节点，则挂起当前线程；被唤醒后直接返回传递过来的 match 节点

```java
/**
 * 等待执行
 *
 * @param s     节点
 * @param timed 是否超时
 * @param nanos 超时时间
 */
SNode awaitFulfill(SNode s, boolean timed, long nanos) {
    // 1. 计算超时时间
    final long deadline = timed ? System.nanoTime() + nanos : 0L;
    Thread w = Thread.currentThread();
    // 2. 计算自旋次数
    int spins = (shouldSpin(s) ?
            (timed ? maxTimedSpins : maxUntimedSpins) : 0);
    for (; ; ) {
        if (w.isInterrupted())
            s.tryCancel();
        // 3. 如果已经匹配到其他节点，直接返回
        SNode m = s.match;
        if (m != null)
            return m;
        if (timed) {
            // 4. 超时时间递减
            nanos = deadline - System.nanoTime();
            if (nanos <= 0L) {
                s.tryCancel();
                continue;
            }
        }
        // 5. 自旋次数减一
        if (spins > 0)
            spins = shouldSpin(s) ? (spins - 1) : 0;
        else if (s.waiter == null)
            s.waiter = w;
            // 6. 开始挂起当前线程
        else if (!timed)
            LockSupport.park(this);
        else if (nanos > spinForTimeoutThreshold)
            LockSupport.parkNanos(this, nanos);
    }
}
```

再看一下匹配节点的 `tryMatch()` 方法逻辑：
作用就是唤醒栈顶节点，并把当前节点传递给栈顶节点。

```java
/**
 * 匹配节点
 *
 * @param s 当前节点
 */
boolean tryMatch(SNode s) {
    if (match == null &&
            UNSAFE.compareAndSwapObject(this, matchOffset, null, s)) {
        Thread w = waiter;
        if (w != null) {
            waiter = null;
            // 1. 唤醒栈顶节点的线程
            LockSupport.unpark(w);
        }
        return true;
    }
    // 2. 确认当前节点已传递给栈顶节点
    return match == s;
}
```

## 队列实现

### 队列的类结构

```java
/**
 * 队列实现
 */
static final class TransferQueue<E> extends Transferer<E> {

    /**
     * 头节点
     */
    transient volatile QNode head;

    /**
     * 尾节点
     */
    transient volatile QNode tail;

    /**
     * 队列节点类
     */
    static final class QNode {

        /**
         * 当前操作线程
         */
        volatile Thread waiter;

        /**
         * 节点值
         */
        volatile Object item;

        /**
         * 后继节点
         */
        volatile QNode next;

        /**
         * 当前节点是否为数据节点（true=放数据，false=取数据）
         */
        final boolean isData;
    }
}
```

可以看出 `TransferQueue` 是使用带有头尾节点的单链表实现的。

还有一点需要提一下，`TransferQueue` 默认构造方法会初始化头尾节点，默认是空节点（哨兵节点）：

```java
/**
 * TransferQueue 默认的构造方法
 */
TransferQueue() {
    QNode h = new QNode(null, false);
    head = h;
    tail = h;
}
```

![TransferQueue队列结构](https://javabaguwen.com/img/SynchronousQueue2.png)

### 队列的 transfer 方法实现

队列使用的公平策略，体现在每次操作的时候，都是从队尾压入，从队头弹出。

详细流程如下：

1. 首先判断当前线程的操作类型与队尾节点的操作类型是否一致（比如都是放数据，或者都是取数据）。
2. 如果一致，把当前操作包装成 `QNode` 节点，追加到队尾，并挂起当前线程。
3. 如果不一致，表示相互匹配（比如当前操作是放数据，而队尾节点是取数据，或者相反）。然后在队头节点开始遍历，找到与当前操作类型相匹配的节点，把当前操作的节点值传递给这个节点，并弹出这个节点，唤醒这个节点的线程，最后返回。
4. 队头节点线程被唤醒，继续执行，然后返回传递过来的数据。

```java
/**
 * 转移（put 和 take 都用这一个方法）
 *
 * @param e     元素（取数据的时候为 null）
 * @param timed 是否超时
 * @param nanos 超时时间
 */
E transfer(E e, boolean timed, long nanos) {
    QNode s = null;
    // 1. e 不为 null 表示要放数据，否则是取数据
    boolean isData = (e != null);
    for (; ; ) {
        QNode t = tail;
        QNode h = head;
        if (t == null || h == null) {
            continue;
        }

        // 2. 如果本次操作跟队尾节点模式相同（都是取数据，或者都是放数据），就把本次操作包装成 QNode，追加到队尾
        if (h == t || t.isData == isData) {
            QNode tn = t.next;
            if (t != tail) {
                continue;
            }
            if (tn != null) {
                advanceTail(t, tn);
                continue;
            }
            if (timed && nanos <= 0) {
                return null;
            }
            // 3. 把本次操作包装成 QNode，追加到队尾
            if (s == null) {
                s = new QNode(e, isData);
            }
            if (!t.casNext(null, s)) {
                continue;
            }
            advanceTail(t, s);
            // 4. 挂起当前线程
            Object x = awaitFulfill(s, e, timed, nanos);
            // 5. 当前线程被唤醒后，返回传递过来的节点值
            if (x == s) {
                clean(t, s);
                return null;
            }
            if (!s.isOffList()) {
                advanceHead(t, s);
                if (x != null) {
                    s.item = s;
                }
                s.waiter = null;
            }
            return (x != null) ? (E) x : e;
        } else {
            // 6. 如果本次操作跟队尾节点模式不同，就从队头节点开始遍历，找到模式相匹配的节点
            QNode m = h.next;
            if (t != tail || m == null || h != head) {
                continue;
            }

            Object x = m.item;
            // 7. 把当前节点值 e 传递给匹配到的节点 m
            if (isData == (x != null) || x == m ||
                    !m.casItem(x, e)) {
                advanceHead(h, m);
                continue;
            }
            // 8. 弹出队头节点，并唤醒节点 m 的线程
            advanceHead(h, m);
            LockSupport.unpark(m.waiter);
            return (x != null) ? (E) x : e;
        }
    }
}
```

## 放数据源码

放数据的方法有四个：

| 操作 | 抛出异常 | 返回特定值 | 阻塞 | 阻塞一段时间 |
| --- | --- | --- | --- | --- |
| 放数据 | add() | offer() | put() | offer(e, time, unit) |

### offer 方法源码

先看一下 `offer()` 方法源码，其他放数据方法逻辑也是大同小异，底层都是调用的 `transfer()` 方法实现。

如果没有匹配到取数据的线程，`offer()` 方法会直接返回 `false`，表示插入失败。

```java
/**
 * offer 方法入口
 *
 * @param e 元素
 * @return 是否插入成功
 */
public boolean offer(E e) {
    // 1. 判空，传参不允许为 null
    if (e == null) {
        throw new NullPointerException();
    }
    // 2. 调用底层 transfer 方法（timed=true, nanos=0 表示不等待）
    return transferer.transfer(e, true, 0) != null;
}
```

`transferer.transfer(e, true, 0)` 中 `timed=true` 且 `nanos=0`，表示不等待，如果当前没有消费者在等待取数据，立即返回 `null`（插入失败）。

### add 方法源码

如果没有匹配到合适的节点，`add()` 方法会抛出异常，底层基于 `offer()` 实现：

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

如果没有匹配到取数据的线程，`put()` 方法会一直阻塞，直到有消费者来取走数据。

```java
/**
 * put 方法入口
 *
 * @param e 元素
 */
public void put(E e) throws InterruptedException {
    // 1. 判空，传参不允许为 null
    if (e == null) {
        throw new NullPointerException();
    }
    // 2. 调用底层 transfer 方法（timed=false 表示无限等待）
    if (transferer.transfer(e, false, 0) == null) {
        Thread.interrupted();
        throw new InterruptedException();
    }
}
```

### offer(e, time, unit) 源码

如果没有匹配到取数据的线程，`offer(e, time, unit)` 方法会阻塞指定时间，超时后返回 `false`。

```java
/**
 * offer 方法入口
 *
 * @param e       元素
 * @param timeout 超时时间
 * @param unit    时间单位
 * @return 是否添加成功
 */
public boolean offer(E e, long timeout, TimeUnit unit)
        throws InterruptedException {
    // 1. 判空，传参不允许为 null
    if (e == null) {
        throw new NullPointerException();
    }
    // 2. 调用底层 transfer 方法（timed=true 表示有限等待）
    if (transferer.transfer(e, true, unit.toNanos(timeout)) != null) {
        return true;
    }
    if (!Thread.interrupted()) {
        return false;
    }
    throw new InterruptedException();
}
```

## 取数据源码

取数据（取出并删除）的方法有四个：

| 操作 | 抛出异常 | 返回特定值 | 阻塞 | 阻塞一段时间 |
| --- | --- | --- | --- | --- |
| 取数据（同时删除） | remove() | poll() | take() | poll(time, unit) |

### poll 方法源码

看一下 `poll()` 方法源码，其他取数据方法逻辑大同小异，底层都是调用的 `transfer()` 方法实现。

`poll()` 方法在没有匹配到生产者的时候，直接返回 `null`，表示取元素失败。

```java
/**
 * poll 方法入口
 */
public E poll() {
    // 调用底层 transfer 方法（e=null 表示取数据）
    return transferer.transfer(null, true, 0);
}
```

### remove 方法源码

在没有匹配到生产者的时候，`remove()` 会抛出异常：

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

除了 `remove()` 取队头元素外，`SynchronousQueue` 也提供了删除指定元素的方法 `remove(Object o)`：

```java
/**
 * 删除指定元素
 */
public boolean remove(Object o) {
    if (o == null) return false;
    return transferer.remove(o);
}
```

`remove(Object o)` 需要遍历栈或队列找到匹配的节点并取消它，使用场景较少。

### take 方法源码

在没有匹配到生产者的时候，`take()` 方法会一直阻塞，直到被唤醒。

```java
/**
 * take 方法入口
 */
public E take() throws InterruptedException {
    // 调用底层 transfer 方法（e=null, timed=false 表示无限等待）
    E e = transferer.transfer(null, false, 0);
    if (e != null) {
        return e;
    }
    Thread.interrupted();
    throw new InterruptedException();
}
```

### poll(time, unit) 源码

在没有匹配到生产者的时候，`poll(time, unit)` 方法会阻塞指定时间，超时后返回 `null`。

```java
/**
 * poll 方法入口
 *
 * @param timeout 超时时间
 * @param unit    时间单位
 * @return 元素
 */
public E poll(long timeout, TimeUnit unit) throws InterruptedException {
    // 调用底层 transfer 方法（e=null, timed=true 表示有限等待）
    E e = transferer.transfer(null, true, unit.toNanos(timeout));
    if (e != null || !Thread.interrupted()) {
        return e;
    }
    throw new InterruptedException();
}
```

## 查看数据源码

查看数据，并不删除。

| 操作 | 抛出异常 | 返回特定值 | 阻塞 | 阻塞一段时间 |
| --- | --- | --- | --- | --- |
| 查看数据（不删除） | element() | peek() | 不支持 | 不支持 |

### peek 方法源码

`peek()` 方法直接返回 `null`，因为 `SynchronousQueue` **不存储任何元素**，不存在"查看但不删除"的语义。

```java
/**
 * peek 方法入口
 */
public E peek() {
    return null;
}
```

同理，`isEmpty()` 方法始终返回 `true`，`size()` 方法始终返回 `0`，`iterator()` 返回空迭代器。

### element 方法源码

`element()` 方法底层调用的也是 `peek()` 方法，因为 `peek()` 始终返回 `null`，所以 `element()` 始终抛出异常。

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

这篇文章讲解了 `SynchronousQueue` 阻塞队列的核心源码，了解到 `SynchronousQueue` 具有以下特点：

1. `SynchronousQueue` 实现了 `BlockingQueue` 接口，提供了四组放数据和取数据的方法，满足不同场景需求。
2. 底层有两种实现方式：**基于栈**（`TransferStack`）实现非公平策略，以及**基于队列**（`TransferQueue`）实现公平策略。
3. 初始化时可以指定使用公平策略还是非公平策略。
4. **`SynchronousQueue` 不存储元素**，所有查询方法（`peek`、`isEmpty`、`size`）都返回空状态。不适合作为缓存队列使用，适用于生产者与消费者速度相匹配的场景，可减少任务执行的等待时间。

### 关键操作时间复杂度对比

| 操作 | 方法 | 时间复杂度 | 说明 |
| --- | --- | --- | --- |
| 入队 | offer | O(1) | 如果有匹配的消费者，立即完成 |
| 入队（阻塞） | put | O(1) | 无消费者时阻塞等待，匹配后 O(1) |
| 出队 | poll | O(1) | 如果有匹配的生产者，立即完成 |
| 出队（阻塞） | take | O(1) | 无生产者时阻塞等待，匹配后 O(1) |
| 查看 | peek | O(1) | 始终返回 null（不存储元素） |
| 查询大小 | size/isEmpty | O(1) | 始终返回 0 / true |

### 使用建议

1. **理解零容量特性**：`SynchronousQueue` 不存储任何元素，`put()` 必须等待 `take()`，`take()` 必须等待 `put()`。如果业务需要缓存功能，应该使用 `ArrayBlockingQueue` 或 `LinkedBlockingQueue`。
2. **线程池场景首选**：`Executors.newCachedThreadPool()` 使用 `SynchronousQueue` 作为任务队列，确保任务被立即执行。这是 `SynchronousQueue` 最经典的使用场景。适用于任务量大但执行时间短、需要快速响应的场景。
3. **公平 vs 非公平的选择**：默认非公平策略（基于栈）吞吐量更高，适合大多数场景。如果需要保证线程等待的先后顺序（防止线程饥饿），使用公平策略（基于队列）。
4. **注意阻塞风险**：如果只有生产者没有消费者（或反之），`put()` / `take()` 会永久阻塞。使用时要确保生产者和消费者同时存在，或者使用 `offer()` / `poll()` 等可超时方法，避免线程泄漏。
