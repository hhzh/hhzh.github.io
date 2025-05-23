工作面试中经常遇到ThreadLocal，但是很多同学并不了解ThreadLocal实现原理，到底为什么会发生内存泄漏也是一知半解？今天一灯带你深入剖析ThreadLocal源码，总结ThreadLocal使用规范，解析ThreadLocal高频面试题。
## 1. ThreadLocal是什么
**ThreadLocal**是线程本地变量，就是线程的私有变量，不同线程之间相互隔离，无法共享，相当于每个线程拷贝了一份变量的副本。
**目的**就是在多线程环境中，无需加锁，也能保证数据的安全性。
## 2. ThreadLocal的使用示例
```java
/**
 * @author 一灯架构
 * @apiNote ThreadLocal示例
 **/
public class ThreadLocalDemo {
    // 1. 创建ThreadLocal
    static ThreadLocal<String> threadLocal = new ThreadLocal<>();

    public static void main(String[] args) {
        // 2. 给ThreadLocal赋值
        threadLocal.set("关注公众号:一灯架构");
        // 3. 从ThreadLocal中取值
        String result = threadLocal.get();
        System.out.println(result); // 输出 关注公众号:一灯架构
        
        // 4. 删除ThreadLocal中的数据
        threadLocal.remove();
        System.out.println(threadLocal.get()); // 输出null
    }

}
```
`ThreadLocal`的用法非常简单，创建`ThreadLocal`的时候指定泛型类型，然后就是赋值、取值、删除值的操作。
不同线程之间，`ThreadLocal`数据是隔离的，测试一下：
```java
/**
 * @author 一灯架构
 * @apiNote ThreadLocal示例
 **/
public class ThreadLocalDemo {
    // 1. 创建ThreadLocal
    static ThreadLocal<Integer> threadLocal = new ThreadLocal<>();

    public static void main(String[] args) {
        IntStream.range(0, 5).forEach(i -> {
          	// 创建5个线程，分别给threadLocal赋值、取值
            new Thread(() -> {
                // 2. 给ThreadLocal赋值
                threadLocal.set(i);
                // 3. 从ThreadLocal中取值
                System.out.println(Thread.currentThread().getName()
                        + "," + threadLocal.get());
            }).start();
        });
    }

}
```
输出结果：
```java
Thread-2,2
Thread-4,4
Thread-1,1
Thread-0,0
Thread-3,3
```
可以看出不同线程之间的ThreadLocal数据相互隔离，互不影响，这样的实现效果有哪些应用场景呢？
## 3. ThreadLocal应用场景
`ThreadLocal`的应用场景主要分为两类：

1.  避免对象在方法之间层层传递，打破层次间约束。
比如用户信息，在很多地方都需要用到，层层往下传递，比较麻烦。这时候就可以把用户信息放到ThreadLocal中，需要的地方可以直接使用。 
2.  拷贝对象副本，减少初始化操作，并保证数据安全。
比如数据库连接、Spring事务管理、SimpleDataFormat格式化日期，都是使用的ThreadLocal，即避免每个线程都初始化一个对象，又保证了多线程下的数据安全。 

使用ThreadLocal保证SimpleDataFormat格式化日期的线程安全，代码类似下面这样：
```java
/**
 * @author 一灯架构
 * @apiNote ThreadLocal示例
 **/
public class ThreadLocalDemo {
    // 1. 创建ThreadLocal
    static ThreadLocal<SimpleDateFormat> threadLocal =
            ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));


    public static void main(String[] args) {
        IntStream.range(0, 5).forEach(i -> {
            // 创建5个线程，分别从threadLocal取出SimpleDateFormat，然后格式化日期
            new Thread(() -> {
                try {
                    System.out.println(threadLocal.get().parse("2024-11-11 00:00:00"));
                } catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            }).start();
        });
    }

}
```
## 4. ThreadLocal实现原理
ThreadLocal底层使用`ThreadLocalMap`存储数据，而`ThreadLocalMap`内部是一个数组，数组里面存储的是Entry对象，Entry对象里面使用key-value存储数据，key是ThreadLocal实例对象本身，value是ThreadLocal的泛型对象值。
![image.png](https://javabaguwen.com/img/ThreadLocal1.png)
### 4.1 ThreadLocalMap源码
```java
static class ThreadLocalMap {
    // Entry对象，WeakReference是弱引用，当没有引用指向时，会被GC回收
    static class Entry extends WeakReference<ThreadLocal<?>> {
        // ThreadLocal泛型对象值
        Object value;
        // 构造方法，传参是key-value
        // key是ThreadLocal对象实例，value是ThreadLocal泛型对象值
        Entry(ThreadLocal<?> k, Object v) {
            super(k);
            value = v;
        }
    }
  
    // Entry数组，用来存储ThreadLocal数据
    private Entry[] table;
    // 数组的默认容量大小
    private static final int INITIAL_CAPACITY = 16;
    // 扩容的阈值，默认是数组大小的三分之二
    private int threshold;

    private void setThreshold(int len) {
        threshold = len * 2 / 3;
    }
}
```
### 4.2 set方法源码
```java
// 给ThreadLocal设值
public void set(T value) {
    // 获取当前线程对象
    Thread t = Thread.currentThread();
    // 获取此线程对象中的ThreadLocalMap对象
    ThreadLocalMap map = getMap(t);
    // 如果ThreadLocal已经设过值，直接设值，否则初始化
    if (map != null)
        // 设值的key就是当前ThreadLocal对象实例，value是ThreadLocal泛型对象值
        map.set(this, value);
    else
        // 初始化ThreadLocalMap
        createMap(t, value);
}
```
**再看一下实际的set方法源码：**
```java
// key就是当前ThreadLocal对象实例，value是ThreadLocal泛型对象值
private void set(ThreadLocal<?> key, Object value) {
    // 获取ThreadLocalMap中的Entry数组
    Entry[] tab = table;
    int len = tab.length;
    // 计算key在数组中的下标，也就是ThreadLocal的hashCode和数组大小-1取余
    int i = key.threadLocalHashCode & (len - 1);

    // 查找流程：从下标i开始，判断下标位置是否有值，
    // 如果有值判断是否等于当前ThreadLocal对象实例，等于就覆盖，否则继续向后遍历数组，直到找到空位置
    for (Entry e = tab[i];
         e != null;
        // nextIndex 就是让在不超过数组长度的基础上，把数组的索引位置 + 1
         e = tab[i = nextIndex(i, len)]) {
        ThreadLocal<?> k = e.get();
        // 如果等于当前ThreadLocal对象实例，直接覆盖
        if (k == key) {
            e.value = value;
            return;
        }
        // 当前key是null，说明ThreadLocal对象实例已经被GC回收了，直接覆盖
        if (k == null) {
            replaceStaleEntry(key, value, i);
            return;
        }
    }
    // 找到空位置，创建Entry对象
    tab[i] = new Entry(key, value);
    int sz = ++size;
    // 当数组大小大于等于扩容阈值(数组大小的三分之二)时，进行扩容
    if (!cleanSomeSlots(i, sz) && sz >= threshold)
        rehash();
}
```
**set方法具体流程如下：**
![image.png](https://javabaguwen.com/img/ThreadLocal2.png)
从源码和流程图中得知，ThreadLocal是通过**线性探测法**解决哈希冲突的，**线性探测法**具体赋值流程如下：

1. 通过key的hashcode找到数组下标
2. 如果数组下标位置是空或者等于当前ThreadLocal对象，直接覆盖值结束
3. 如果不是空，就继续向下遍历，遍历到数组结尾后，再从头开始遍历，直到找到数组为空的位置，在此位置赋值结束

**线性探测法**这种特殊的赋值流程，导致取值的时候，也要走一遍类似的流程。
### 4.3 get方法源码
```java
// 从ThreadLocal从取值
public T get() {
    // 获取当前线程对象
    Thread t = Thread.currentThread();
    // 获取此线程对象中的ThreadLocalMap对象
    ThreadLocalMap map = getMap(t);
    if (map != null) {
        // 通过ThreadLocal实例对象作为key，在Entry数组中查找数据
        ThreadLocalMap.Entry e = map.getEntry(this);
        // 如果不为空，表示找到了，直接返回
        if (e != null) {
            T result = (T)e.value;
            return result;
        }
    }
    // 如果ThreadLocalMap是null，就执行初始化ThreadLocalMap操作
    return setInitialValue();
}
```
**再看一下具体的遍历Entry数组的逻辑：**
```java
// 具体的遍历Entry数组的方法
private Entry getEntry(ThreadLocal<?> key) {
    // 通过hashcode计算数组下标位置
    int i = key.threadLocalHashCode & (table.length - 1);
    Entry e = table[i];
    // 如果下标位置对象不为空，并且等于当前ThreadLocal实例对象，直接返回
    if (e != null && e.get() == key)
        return e;
    else
        // 如果不是，需要继续向下遍历Entry数组
        return getEntryAfterMiss(key, i, e);
}
```
**再看一下线性探测法特殊的取值方法：**
```java
// 如果不是，需要继续向下遍历Entry数组
private Entry getEntryAfterMiss(ThreadLocal<?> key, int i, Entry e) {
    Entry[] tab = table;
    int len = tab.length;
    // 循环遍历数组，直到找到ThreadLocal对象，或者遍历到数组为空的位置
    while (e != null) {
        ThreadLocal<?> k = e.get();
        // 如果等于当前ThreadLocal实例对象，表示找到了，直接返回
        if (k == key)
            return e;
        // key是null，表示ThreadLocal实例对象已经被GC回收，就帮忙清除value
        if (k == null)
            expungeStaleEntry(i);
        else
          	// 索引位置+1，表示继续向下遍历
            i = nextIndex(i, len);
        e = tab[i];
    }
    return null;
}

// 索引位置+1，表示继续向下遍历，遍历到数组结尾，再从头开始遍历
private static int nextIndex(int i, int len) {
    return ((i + 1 < len) ? i + 1 : 0);
}
```
**ThreadLocal的get方法流程如下：**
![image.png](https://javabaguwen.com/img/ThreadLocal3.png)
### 4.4 remove方法源码
remove方法流程跟set、get方法类似，都是遍历数组，找到ThreadLocal实例对象后，删除key、value，再删除Entry对象结束。
```java
public void remove() {
    // 获取当前线程的ThreadLocalMap对象
    ThreadLocalMap m = getMap(Thread.currentThread());
    if (m != null)
        m.remove(this);
}

// 具体的删除方法
private void remove(ThreadLocal<?> key) {
    ThreadLocal.ThreadLocalMap.Entry[] tab = table;
    int len = tab.length;
    // 计算数组下标
    int i = key.threadLocalHashCode & (len - 1);
    // 遍历数组，直到找到空位置，
    // 或者值等于当前ThreadLocal对象，才结束
    for (ThreadLocal.ThreadLocalMap.Entry e = tab[i];
         e != null;
         e = tab[i = nextIndex(i, len)]) {
        // 找到后，删除key、value，再删除Entry对象
        if (e.get() == key) {
            e.clear();
            expungeStaleEntry(i);
            return;
        }
    }
}
```
## 5. ThreadLocal使用注意事项
使用ThreadLocal结束，一定要调用remove方法，清理掉threadLocal数据。具体流程类似下面这样：
```java
/**
 * @author 一灯架构
 * @apiNote ThreadLocal示例
 **/
public class ThreadLocalDemo {
    // 1. 创建ThreadLocal
    static ThreadLocal<User> threadLocal = new ThreadLocal<>();

    public void method() {
        try {
            User user = getUser();
            // 2. 给threadLocal赋值
            threadLocal.set(user);
            // 3. 执行其他业务逻辑
            doSomething();
        } finally {
            // 4. 清理threadLocal数据
            threadLocal.remove();
        }
    }
}
```
如果忘了调用remove方法，可能会导致两个严重的问题：

1.  导致内存溢出
如果线程的生命周期很长，一直往ThreadLocal中放数据，却没有删除，最终产生OOM 
2.  导致数据错乱
如果使用了线程池，一个线程执行完任务后并不会被销毁，会继续执行下一个任务，导致下个任务访问到了上个任务的数据。 
## 6. 常见面试题剖析
看完了ThreadLocal源码，再回答几道面试题，检验一下学习成果怎么样。
### 6.1 ThreadLocal是怎么保证数据安全性的？
ThreadLocal底层使用的ThreadLocalMap存储数据，而ThreadLocalMap是线程Thread的私有变量，不同线程之间数据隔离，所以即使ThreadLocal的set、get、remove方法没有加锁，也能保证线程安全。
### 6.2 ThreadLocal底层为什么使用数组？而不是一个对象？
因为在一个线程中可以创建多个ThreadLocal实例对象，所以要用数组存储，而不是用一个对象。
### 6.3 ThreadLocal是怎么解决哈希冲突的？
ThreadLocal使用的**线性探测法**法解决哈希冲突，**线性探测法**法具体赋值流程如下：

1. 通过key的hashcode找到数组下标
2. 如果数组下标位置是空或者等于当前ThreadLocal对象，直接覆盖值结束
3. 如果不是空，就继续向下遍历，遍历到数组结尾后，再从头开始遍历，直到找到数组为空的位置，在此位置赋值结束
### 6.4 ThreadLocal为什么要用线性探测法解决哈希冲突？
我们都知道HashMap采用的是链地址法（也叫拉链法）解决哈希冲突，为什么ThreadLocal要用线性探测法解决哈希冲突？而不用链地址法呢？
我的猜想是可能是创作者偷懒、嫌麻烦，或者是ThreadLocal使用量较少，出现哈希冲突概率较低，不想那么麻烦。
使用链地址法需要引入链表和红黑树两种数据结构，实现更复杂。而线性探测法没有引入任何额外的数据结构，直接不断遍历数组。
结果就是，如果一个线程中使用很多个ThreadLocal，发生哈希冲突后，ThreadLocal的get、set性能急剧下降。

**线性探测法相比链地址法优缺点都很明显：**
**优点：** 实现简单，无需引入额外的数据结构。
**缺点：** 发生哈希冲突后，ThreadLocal的get、set性能急剧下降。
### 6.5 ThreadLocalMap的key为什么要设计成弱引用？
先说一下弱引用的特点：
> 弱引用的对象拥有更短暂的生命周期，在垃圾回收器线程扫描它所管辖的内存区域的过程中，一旦发现了只具有弱引用的对象，不管当前内存空间足够与否，都会回收它的内存。 不过，由于垃圾回收器是一个优先级很低的线程，因此不一定会很快发现那些只具有弱引用的对象。

ThreadLocalMap的key设计成弱引用后，会不会我们正在使用，就被GC回收了？
这个是不会的，因为我们一直在强引用着ThreadLocal实例对象。
```java
/**
 * @author 一灯架构
 * @apiNote ThreadLocal示例
 **/
public class ThreadLocalDemo {
    // 1. 创建ThreadLocal
    static ThreadLocal<String> threadLocal = new ThreadLocal<>();

    public static void main(String[] args) {
        // 2. 给ThreadLocal赋值
        threadLocal.set("关注公众号:一灯架构");
        // 3. 从ThreadLocal中取值
        String result = threadLocal.get();
        // 手动触发GC
        System.gc();
        System.out.println(result); // 输出 关注公众号:一灯架构

    }

}
```
由上面代码中得知，如果我们一直在使用threadLocal，触发GC后，并不会threadLocal实例对象。
**ThreadLocalMap的key设计成弱引用的目的就是：**
防止我们在使用完ThreadLocal后，忘了调用remove方法删除数据，导致数组中ThreadLocal数据一直不被回收。
```java
/**
 * @author 一灯架构
 * @apiNote ThreadLocal示例
 **/
public class ThreadLocalDemo {
    // 1. 创建ThreadLocal
    static ThreadLocal<String> threadLocal = new ThreadLocal<>();

    public static void main(String[] args) {
        // 2. 给ThreadLocal赋值
        threadLocal.set("关注公众号:一灯架构");
        // 3. 使用完threadLocal，设置成null，模仿生命周期结束
        threadLocal = null;
        // 触发GC，这时候ThreadLocalMap的key就会被回收，但是value还没有被回收。
        // 只有等到下次执行get、set方法遍历数组，遍历到这个位置，才会删除这个无效的value
        System.gc();
    }

}
```
### 6.6 ThreadLocal为什么会出现内存泄漏？
ThreadLocal出现内存泄漏的原因，就是我们使用完ThreadLocal没有执行remove方法删除数据。
具体是哪些数据过多导致的内存泄漏呢？
一个是数组的**Entry对象**，Entry对象中key、value分别是ThreadLocal实例对象和泛型对象值。
因为我们在使用ThreadLocal的时候，总爱把ThreadLocal设置成类的静态变量，直到线程生命周期结束，ThreadLocal对象数据才会被回收。

另一个是数组中**Entry对象的value值**，也就是泛型对象值。虽然ThreadLocalMap的key被设置成弱引用，会被GC回收，但是value并没有被回收。需要等到下次执行get、set方法遍历数组，遍历到这个位置，才会删除这个无效的value。这也是造成内存泄漏的原因之一。
### 6.7 怎么实现父子线程共享ThreadLocal数据？
只需要InheritableThreadLocal即可，当初始化子线程的时候，会从父线程拷贝ThreadLocal数据。
```java
/**
 * @author 一灯架构
 * @apiNote ThreadLocal示例
 **/
public class ThreadLocalDemo {
    // 1. 创建可被子线程继承数据的ThreadLocal
    static ThreadLocal<String> threadLocal = new InheritableThreadLocal<>();

    public static void main(String[] args) {
        // 2. 给ThreadLocal赋值
        threadLocal.set("关注公众号:一灯架构");

        // 3. 启动一个子线程，看是否能获取到主线程数据
        new Thread(() -> {
            System.out.println(threadLocal.get()); // 输出 关注公众号:一灯架构
        }).start();

    }

}
```
