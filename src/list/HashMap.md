## 引言

为什么 HashMap 是 Java 中最常用、最重要的数据结构？

核心原因就一个：**性能**。常见的基础数据结构中，数组查询快但插入删除慢，链表插入快但查询慢。HashMap 综合了数组和链表的优点，将查询与插入的效率都控制在近似 O(1) 的复杂度内。

但 HashMap 的设计远不止于此。容量为什么是 2 的幂？哈希扰动函数 `spread()` 如何防止哈希冲突？链表转红黑树的阈值为什么选 8？本文将从源码级别逐一揭示这些设计背后的原理。

学完本文，你将掌握：

1. HashMap 的底层实现原理（数组 + 链表 + 红黑树）
2. put 方法的完整执行流程与哈希扰动算法
3. 扩容机制与 2 倍扩容的根本原因
4. HashMap 为什么线程不安全？并发下会产生什么事故？
5. HashMap 的容量为什么必须是 2 的幂？
6. HashMap 在 Java 8 版本中做了哪些变更？

## 简介
HashMap 的底层数据结构由数组、链表和红黑树组成，核心是基于数组实现的。为了解决哈希冲突，采用拉链法，于是引入了链表结构。为了解决链表过长导致的查询性能下降，Java 8 引入了红黑树结构。

HashMap 类中有两个关键的阈值常量：

- `TREEIFY_THRESHOLD = 8`：当链表长度达到 8 时，链表会转换为红黑树
- `UNTREEIFY_THRESHOLD = 6`：当红黑树节点数减少到 6 时，红黑树会退化为链表
- `MIN_TREEIFY_CAPACITY = 64`：只有数组容量达到 64 时才会触发树化，否则优先扩容数组而不是树化

这三个常量配合使用，目的是避免频繁的树化和退化操作。如果链表只是短暂变长，不会触发树化；如果红黑树只是短暂变小，不会立即退化。

> **💡 核心提示**：为什么树化阈值是 8、退化阈值是 6？这背后有统计学依据。HashMap 中节点的分布服从泊松分布（Poisson Distribution）。在理想的 hash 散列下，链表长度达到 8 的概率约为 0.00000006（千万分之六），几乎不可能自然发生。如果达到了 8，说明 hash 冲突严重，此时用红黑树代替链表可以将 O(n) 退化为 O(log n)。退化为 6 是为了留出缓冲区间（8→6），避免在临界值附近频繁树化/退化，这就是所谓的"迟滞效应"（Hysteresis）。

### HashMap 类架构图

```mermaid
classDiagram
    class AbstractMap {
        <<abstract>>
        +containsKey(Object) boolean
        +containsValue(Object) boolean
        +isEmpty() boolean
        +size() int
        +clear() void
    }

    class Map {
        <<interface>>
        +put(K, V) V
        +get(Object) V
        +remove(Object) V
        +containsKey(Object) boolean
        +containsValue(Object) boolean
        +entrySet() Set~Entry~
        +keySet() Set~K~
        +values() Collection~V~
    }

    class HashMap {
        -transient Node[] table
        -transient int size
        -transient int threshold
        -transient int modCount
        -final float loadFactor
        +put(K, V) V
        +get(Object) V
        +remove(Object) V
        +resize() Node[]
        -hash(Object) int
        -putVal(int, K, V, boolean, boolean) V
        -getNode(int, Object) Node
        -treeifyBin(Node[], int) void
        -tableSizeFor(int) int
    }

    class LinkedHashMap {
        -transient Entry head
        -transient Entry tail
        -final boolean accessOrder
    }

    class Node {
        +final int hash
        +final K key
        +V value
        +Node next
        +getKey() K
        +getValue() V
        +setValue(V) V
    }

    class TreeNode {
        +TreeNode parent
        +TreeNode left
        +TreeNode right
        +TreeNode prev
        +boolean red
        +putTreeVal(HashMap, Node[], int, K, V) TreeNode
        +getTreeNode(int, Object) TreeNode
        +removeTreeNode(HashMap, Node[], boolean) void
        +split(HashMap, Node[], int, int) void
    }

    class Cloneable {
        <<interface>>
    }

    class Serializable {
        <<interface>>
    }

    Map <|.. AbstractMap
    AbstractMap <|-- HashMap
    HashMap <|-- LinkedHashMap
    HashMap o-- Node : contains
    Node <|-- TreeNode
    HashMap ..> Cloneable : implements
    HashMap ..> Serializable : implements
```

HashMap 的核心工作原理可以用下面的流程图概括：

```mermaid
flowchart TD
    Start["初始化: table=null, size=0, threshold=0"] --> Put["put(key, value)"]
    Put --> Hash["hash(key): h = key.hashCode()\n返回 h ^ (h >>> 16)"]
    Hash --> CheckTable{"table 为空?"}
    CheckTable -->|是| Resize["resize(): 初始化数组\n容量=16 或 tableSizeFor(指定容量)"]
    CheckTable -->|否| CalcIndex["计算下标: i = (n - 1) & hash"]
    Resize --> CalcIndex
    CalcIndex --> CheckSlot{"tab[i] 是否为空?"}
    CheckSlot -->|是| Insert["直接插入新节点"]
    CheckSlot -->|否| CheckKey{"key 是否已存在?"}
    CheckKey -->|是| UpdateValue["覆盖旧值, 返回旧值"]
    CheckKey -->|否| CheckType{"节点类型?"}
    CheckType -->|红黑树| TreeInsert["putTreeVal: 红黑树插入"]
    CheckType -->|链表| ListInsert["遍历链表, 尾插法追加"]
    ListInsert --> CheckLen{"链表长度 >= 8?"}
    CheckLen -->|是| CheckCap{"数组容量 >= 64?"}
    CheckCap -->|是| Treeify["treeifyBin: 链表转红黑树"]
    CheckCap -->|否| ArrayResize["resize(): 扩容数组"]
    CheckLen -->|否| CheckExpand
    Treeify --> CheckExpand{"size > threshold?"}
    ArrayResize --> CheckExpand
    Insert --> CheckExpand
    CheckExpand -->|是| Resize2["resize(): 容量翻倍\n链表拆分为低位/高位两条链表"]
    CheckExpand -->|否| Done["modCount++, size++, 返回null"]
    Resize2 --> Done
    Get["get(key)"] --> GetHash["hash(key) 计算哈希值"]
    GetHash --> GetIndex["计算下标: (n-1) & hash"]
    GetIndex --> GetCheck{"找到 key?"}
    GetCheck -->|是| ReturnVal["返回 value"]
    GetCheck -->|否| ReturnNull["返回 null"]
```

## 类属性
再看一下 HashMap 类中有哪些关键属性：

```java
public class HashMap<K, V> extends AbstractMap<K, V>
        implements Map<K, V>, Cloneable, Serializable {

    /**
     * 默认容量大小，1 << 4 = 16
     */
    static final int DEFAULT_INITIAL_CAPACITY = 1 << 4;

    /**
     * 负载系数，容量超过 threshold = capacity * loadFactor 时触发扩容
     * 默认 16 * 0.75 = 12 个元素时扩容
     */
    static final float DEFAULT_LOAD_FACTOR = 0.75f;

    /**
     * 容量最大值，2 的 30 次方
     */
    static final int MAXIMUM_CAPACITY = 1 << 30;

    /**
     * 链表转红黑树的阈值：链表长度 > 8 时树化
     */
    static final int TREEIFY_THRESHOLD = 8;

    /**
     * 红黑树退化为链表的阈值：节点数 < 6 时退化
     */
    static final int UNTREEIFY_THRESHOLD = 6;

    /**
     * 树化的最小数组容量：只有 table 容量 >= 64 才会树化
     */
    static final int MIN_TREEIFY_CAPACITY = 64;

    /**
     * 存储元素的数组，容量始终为 2 的幂
     */
    transient Node<K, V>[] table;

    /**
     * 实际存储的键值对数量
     */
    transient int size;

    /**
     * 扩容阈值，当 size > threshold 时触发扩容
     */
    transient int threshold;

    /**
     * 结构修改次数，用于 fail-fast 机制
     */
    transient int modCount;
}
```

其中 `Node` 是链表的节点：

```java
static class Node<K, V> implements Map.Entry<K, V> {
    final int hash;    // 哈希值（缓存，避免重复计算）
    final K key;       // 键
    V value;           // 值
    Node<K, V> next;   // 后继节点

    Node(int hash, K key, V value, Node<K, V> next) {
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = next;
    }
}
```

以及红黑树的节点 `TreeNode`（继承自 `LinkedHashMap.Entry`，本质是 `Node` 的子类）：

```java
static final class TreeNode<K, V> extends LinkedHashMap.Entry<K, V> {
    TreeNode<K, V> parent;  // 父节点
    TreeNode<K, V> left;    // 左子节点
    TreeNode<K, V> right;   // 右子节点
    TreeNode<K, V> prev;    // 前驱节点（继承自 LinkedHashMap.Entry）
    boolean red;            // 节点颜色

    TreeNode(int hash, K key, V val, Node<K, V> next) {
        super(hash, key, val, next);
    }
}
```

## 初始化
HashMap 常见的初始化方法有两个：

1. 无参初始化
2. 有参初始化，指定容量大小

```java
/**
 * 无参初始化
 */
Map<Integer, Integer> map = new HashMap<>();
/**
 * 有参初始化，指定容量大小
 */
Map<Integer, Integer> map = new HashMap<>(10);
```

再看一下构造方法的底层实现：

```java
/**
 * 无参初始化
 */
public HashMap() {
    this.loadFactor = DEFAULT_LOAD_FACTOR;
}

/**
 * 有参初始化，指定容量大小
 */
public HashMap(int initialCapacity) {
    this(initialCapacity, DEFAULT_LOAD_FACTOR);
}

/**
 * 有参初始化，指定容量大小和负载系数
 */
public HashMap(int initialCapacity, float loadFactor) {
    // 校验参数
    if (initialCapacity < 0) {
        throw new IllegalArgumentException("Illegal initial capacity: " +
                initialCapacity);
    }
    if (initialCapacity > MAXIMUM_CAPACITY) {
        initialCapacity = MAXIMUM_CAPACITY;
    }
    if (loadFactor <= 0 || Float.isNaN(loadFactor)) {
        throw new IllegalArgumentException("Illegal load factor: " +
                loadFactor);
    }
    this.loadFactor = loadFactor;
    // 计算出合适的容量大小（2的幂）
    this.threshold = tableSizeFor(initialCapacity);
}
```

可以看出，无参构造方法只初始化了负载系数。指定容量大小的有参构造方法也只是初始化了负载系数和 `threshold`（扩容阈值），**两个方法都没有初始化数组大小**。

`tableSizeFor` 方法会将传入的容量值转换为大于等于它的最小的 2 的幂。例如 `tableSizeFor(10)` 返回 16，`tableSizeFor(20)` 返回 32。这个方法实现非常精妙：

```java
/**
 * 返回大于等于 cap 的最小的 2 的幂
 */
static final int tableSizeFor(int cap) {
    int n = cap - 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```

> **💡 核心提示**：`tableSizeFor` 方法为什么先 `cap - 1`？如果不减 1，当 cap 本身就是 2 的幂时（比如 16），结果会变成 32，导致浪费一半空间。减 1 保证了 "恰好等于 2 的幂" 时不会翻倍。而右移 + 或运算的组合，能将最高位 1 右侧的所有位都填充为 1，最后 +1 就是下一个 2 的幂。

如果再有面试官问你，HashMap 初始化的时候数组大小是多少？答案是 **0**（或者说未初始化），因为 HashMap 采用了**懒加载**策略，数组在第一次 `put` 时才会通过 `resize()` 方法初始化。

## 深入 hash 算法

在深入 put 方法之前，先看一下 HashMap 的 `hash()` 方法：

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

这个方法做了两件事：

1. 如果 key 为 null，返回 0（HashMap 允许 null 作为 key）
2. 否则，取 key 的 `hashCode()`，然后将其**无符号右移 16 位**，再与原值做**异或运算**

为什么要这样做？HashMap 计算数组下标用的是 `(n - 1) & hash`，其中 n 是数组容量（2 的幂）。当 n 较小时（比如 16），`n - 1` 只有低 4 位是 1，高位都是 0，这意味着 `&` 运算只会用到 hash 的低位。**如果不同 key 的 hashCode 只有高位不同、低位相同，就会产生哈希冲突**。通过右移 16 位再异或，把高位的信息混入低位，让高位也参与下标计算，从而**减少哈希冲突**。

> **💡 核心提示**：为什么选择右移 16 位？因为 int 是 32 位，右移 16 位恰好将高 16 位与低 16 位对齐，异或后高低位的信息混合在一起。这是一个在性能和散列质量之间的权衡：更多次的混合（比如多次右移+异或）可以提高散列质量，但会降低性能；16 位一次的混合在实践中已足够好。

## put 源码

put 方法的流程如下：

1. 计算 key 的 hash 值
2. 如果数组为空，调用 `resize()` 初始化
3. 根据 `(n - 1) & hash` 计算数组下标
4. 如果下标位置为空，直接插入
5. 如果下标位置不为空，判断 key 是否已存在，存在则覆盖
6. 如果是红黑树节点，执行红黑树插入
7. 如果是链表节点，遍历链表尾插，长度达到 8 时树化
8. 如果 `size > threshold`，调用 `resize()` 扩容

### put 方法详细流程图

```mermaid
flowchart TD
    A["put(key, value)"] --> B["hash(key) 计算扰动后的哈希值"]
    B --> C{"table 是否为空?"}
    C -->|是| D["resize() 初始化数组"]
    C -->|否| E["i = (n-1) & hash 计算下标"]
    D --> E
    E --> F{"tab[i] == null?"}
    F -->|是| G["tab[i] = newNode() 直接插入"]
    F -->|否| H{"p.hash == hash && key匹配?"}
    H -->|是| I["e = p 记录待覆盖节点"]
    H -->|否| J{"p instanceof TreeNode?"}
    J -->|是| K["putTreeVal() 红黑树插入"]
    J -->|否| L["遍历链表尾插"]
    L --> M{"binCount >= 7?"}
    M -->|是| N{"table.length >= 64?"}
    N -->|是| O["treeifyBin() 链表转红黑树"]
    N -->|否| P["resize() 扩容数组"]
    M -->|否| Q
    O --> Q{"++size > threshold?"}
    P --> Q
    G --> Q
    K --> Q
    I --> R["覆盖旧值, 返回旧值"]
    Q -->|是| S["resize() 扩容"]
    Q -->|否| T["modCount++, size++, 返回null"]
    S --> T
    R --> U["返回旧值"]
```

### put 源码详解

再看一下 put 方法的具体源码实现：

```java
/**
 * put 方法入口
 */
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}

/**
 * 计算 hash 值（高位和低位都参与计算）
 */
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}

/**
 * 实际的put方法逻辑
 * @param hash key对应的hash值
 * @param key 键
 * @param value 值
 * @param onlyIfAbsent 如果为true，则只有当key不存在时才会put，否则会覆盖
 * @param evict 如果为false，表处于创建模式
 * @return 返回旧值
 */
final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    Node<K, V>[] tab;
    Node<K, V> p;
    int n, i;
    // 1. 如果数组为空，则执行初始化（resize 同时负责初始化和扩容）
    if ((tab = table) == null || (n = tab.length) == 0) {
        n = (tab = resize()).length;
    }
    // 2. 如果 key 对应下标位置元素不存在，直接插入即可
    if ((p = tab[i = (n - 1) & hash]) == null) {
        tab[i] = newNode(hash, key, value, null);
    } else {
        Node<K, V> e;
        K k;
        // 3. 如果头节点 key 匹配，直接结束，后续判断是否需要覆盖
        if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k)))) {
            e = p;
        } else if (p instanceof TreeNode) {
            // 4. 判断下标位置的元素类型，如果是红黑树，则执行红黑树的插入逻辑
            e = ((TreeNode<K, V>) p).putTreeVal(this, tab, hash, key, value);
        } else {
            // 5. 否则执行链表的插入逻辑
            for (int binCount = 0; ; ++binCount) {
                // 6. 遍历链表，直到找到空位置为止
                if ((e = p.next) == null) {
                    // 7. 创建一个新的链表节点，并追加到末尾（尾插法）
                    p.next = newNode(hash, key, value, null);
                    // 8. 如果链表长度达到 8，则转换为红黑树
                    if (binCount >= TREEIFY_THRESHOLD - 1) {
                        treeifyBin(tab, hash);
                    }
                    break;
                }
                // 9. 如果在链表中找到相同的 key，则结束
                if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k)))) {
                    break;
                }
                p = e;
            }
        }
        // 10. 判断是否需要覆盖旧值
        if (e != null) {
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null) {
                e.value = value;
            }
            afterNodeAccess(e);
            return oldValue;
        }
    }
    ++modCount;
    // 11. 判断是否需要扩容
    if (++size > threshold) {
        resize();
    }
    afterNodeInsertion(evict);
    return null;
}
```

其中 `treeifyBin` 方法负责将链表转换为红黑树，但只有在数组容量达到 `MIN_TREEIFY_CAPACITY`（64）时才会真正树化，否则只是扩容数组：

```java
final void treeifyBin(Node<K, V>[] tab, int hash) {
    int n, index;
    Node<K, V> e;
    // 如果数组容量 < 64，优先扩容而不是树化
    if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY) {
        resize();
    } else if ((e = tab[index = (n - 1) & hash]) != null) {
        // 否则，将链表转换为红黑树
        TreeNode<K, V> hd = null, tl = null;
        // 遍历链表，将所有 Node 替换为 TreeNode
        do {
            TreeNode<K, V> p = new TreeNode<>(e.hash, e.key, e.value, null);
            if (tl == null) {
                hd = p;
            } else {
                p.prev = tl;
                tl.next = p;
            }
            tl = p;
        } while ((e = e.next) != null);
        // 将 TreeNode 双向链表构造成红黑树
        if ((tab[index] = hd) != null) {
            hd.treeify(tab);
        }
    }
}
```

> **💡 核心提示**：Java 8 采用**尾插法**而非 Java 7 的头插法，这是为了解决多线程扩容时链表成环的问题。虽然 HashMap 本身不是线程安全的，但尾插法至少避免了在并发场景下出现死循环。真正的并发场景仍然应该使用 `ConcurrentHashMap`。

## 扩容源码

再看一下扩容逻辑的具体实现：

### resize 详细流程图

```mermaid
flowchart TD
    A["resize() 入口"] --> B["oldCap = table.length\noldThr = threshold"]
    B --> C{"oldCap > 0?"}
    C -->|是| D{"oldCap >= MAXIMUM_CAPACITY?"}
    D -->|是| E["threshold = MAX_VALUE\n返回旧数组"]
    D -->|否| F["newCap = oldCap << 1\nnewThr = oldThr << 1"]
    C -->|否| G{"oldThr > 0?"}
    G -->|是| H["newCap = oldThr\n有参构造首次扩容"]
    G -->|否| I["newCap = 16, newThr = 12\n无参构造首次扩容"]
    F --> J{"newThr == 0?"}
    H --> J
    I --> J
    J -->|是| K["newThr = newCap * loadFactor"]
    J -->|否| L["threshold = newThr"]
    K --> L
    L --> M["newTab = new Node[newCap]"]
    M --> N{"oldTab != null?"}
    N -->|否| O["返回 newTab"]
    N -->|是| P["遍历旧数组 0 ~ oldCap"]
    P --> Q{"节点数量?"}
    Q -->|单节点| R["newTab[e.hash & (newCap-1)] = e"]
    Q -->|红黑树| S["split() 拆分红黑树"]
    Q -->|链表| T["hash & oldCap == 0?\n拆分低位/高位链表"]
    T -->|是| U["插入低位 newTab[j]"]
    T -->|否| V["插入高位 newTab[j + oldCap]"]
    R --> W["继续遍历"]
    S --> W
    U --> W
    V --> W
    W --> P
    P --> O
```

### 扩容源码详解

```java
/**
 * 扩容（同时负责首次初始化）
 */
final Node<K, V>[] resize() {
    Node<K, V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;
    // 计算扩容后容量大小
    // 1. 如果原来容量大于0，说明不是第一次扩容，直接扩容为原来的2倍
    if (oldCap > 0) {
        if (oldCap >= MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return oldTab;
        } else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                oldCap >= DEFAULT_INITIAL_CAPACITY) {
            newThr = oldThr << 1;
        }
    } else if (oldThr > 0) {
        // 2. 把原来的阈值当成新的容量大小（有参构造首次put时走这个分支）
        newCap = oldThr;
    } else {
        // 3. 如果是第一次初始化（无参构造），则容量和阈值都用默认值
        newCap = DEFAULT_INITIAL_CAPACITY;
        newThr = (int) (DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }
    // 4. 如果新的阈值未设置，则重新计算扩容后阈值
    if (newThr == 0) {
        float ft = (float) newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float) MAXIMUM_CAPACITY ?
                (int) ft : Integer.MAX_VALUE);
    }
    threshold = newThr;

    // 5. 创建一个新数组，容量使用上面计算的大小
    Node<K, V>[] newTab = (Node<K, V>[]) new Node[newCap];
    table = newTab;
    // 6. 遍历原来的数组，将元素插入到新数组
    if (oldTab != null) {
        for (int j = 0; j < oldCap; ++j) {
            Node<K, V> e;
            if ((e = oldTab[j]) != null) {
                oldTab[j] = null;  // 帮助 GC 回收
                // 7. 如果下标位置只有一个元素，则直接插入新数组即可
                if (e.next == null) {
                    newTab[e.hash & (newCap - 1)] = e;
                } else if (e instanceof TreeNode) {
                    // 8. 如果下标位置元素类型是红黑树，则执行红黑树的拆分逻辑
                    ((TreeNode<K, V>) e).split(this, newTab, j, oldCap);
                } else {
                    // 9. 否则执行链表的拆分逻辑，使用 do-while 循环
                    // loHead、loTail表示低位链表的头尾节点
                    // hiHead、hiTail表示高位链表的头尾节点
                    Node<K, V> loHead = null, loTail = null;
                    Node<K, V> hiHead = null, hiTail = null;
                    Node<K, V> next;
                    do {
                        next = e.next;
                        // 10. 判断当前元素 hash & oldCap 是否为0
                        //     为0 → 位置不变，插入低位链表
                        //     不为0 → 位置 = 原下标 + oldCap，插入高位链表
                        if ((e.hash & oldCap) == 0) {
                            if (loTail == null) {
                                loHead = e;
                            } else {
                                loTail.next = e;
                            }
                            loTail = e;
                        } else {
                            if (hiTail == null) {
                                hiHead = e;
                            } else {
                                hiTail.next = e;
                            }
                            hiTail = e;
                        }
                    } while ((e = next) != null);
                    // 11. 将低位链表插入到新数组中（位置不变）
                    if (loTail != null) {
                        loTail.next = null;
                        newTab[j] = loHead;
                    }
                    // 12. 将高位链表插入到新数组中（位置 = j + oldCap）
                    if (hiTail != null) {
                        hiTail.next = null;
                        newTab[j + oldCap] = hiHead;
                    }
                }
            }
        }
    }
    return newTab;
}
```

重点关注第 9 步的链表拆分逻辑。这个方法非常巧妙：不是逐个计算元素在新数组中的下标，而是将原链表**拆成两个链表，整体迁移**。

假设原数组容量是 16，某个下标位置的链表元素分别是 `1 -> 17 -> 33 -> 49`，这些元素的共同特点是对 16 求余等于 1。

扩容后新数组容量是 32，这些元素会拆分成两条链表：
- 下标 1 的链表：`1 -> 33`（`hash & 16 = 0`，位置不变）
- 下标 17 的链表：`17 -> 49`（`hash & 16 = 16`，新位置 = 1 + 16 = 17）

为什么 `hash & oldCap` 能判断元素是否需要移动？因为容量是 2 的幂，扩容后多了一位。如果元素的 hash 值在这一位上是 0，下标不变；如果是 1，新下标 = 原下标 + oldCap。这样就不需要重新计算每个元素的下标，**大幅提升了扩容效率**。

> **💡 核心提示**：负载因子为什么默认是 0.75？这是空间利用率和时间效率之间的最佳折中。根据泊松分布，负载因子为 0.75 时，链表长度达到 8 的概率极低（约千万分之六）。如果负载因子设为 1.0，虽然空间利用率高了，但哈希冲突会显著增加；如果设为 0.5，虽然冲突减少了，但空间浪费了一半。0.75 是经过大量实验验证的最优值。

## 哈希冲突解决：从链表到红黑树

当多个 key 的 hash 值计算出相同的数组下标时，就会发生哈希冲突。HashMap 采用**拉链法**解决冲突，将冲突的 key 串成链表挂在同一个桶位。但在极端情况下（恶意构造 hashCode 或大量冲突），链表会很长，查询退化为 O(n)。

Java 8 引入红黑树来解决这个问题。下面是链表到红黑树的转换流程图：

```mermaid
flowchart TD
    A["发生哈希冲突"] --> B["计算桶位 i = (n-1) & hash"]
    B --> C{"tab[i] 是否已有节点?"}
    C -->|否| D["直接插入, 无冲突"]
    C -->|是| E{"key 是否匹配?"}
    E -->|是| F["覆盖旧值"]
    E -->|否| G{"当前节点类型?"}
    G -->|TreeNode| H["红黑树插入 putTreeVal"]
    G -->|Node| I["链表尾插"]
    I --> J{"链表长度 >= 8?"}
    J -->|否| K["继续等待"]
    J -->|是| L{"数组容量 >= 64?"}
    L -->|否| M["resize() 扩容, 不树化"]
    L -->|是| N["treeifyBin() 链表转红黑树"]
    N --> O["每个 Node 转为 TreeNode"]
    O --> P["treeify() 构建红黑树"]
    P --> Q["红黑树就绪, 查询 O(log n)"]
    M --> R{"扩容后该桶位链表长度 < 6?"}
    R -->|是| S["untreeify() 红黑树退化链表"]
    R -->|否| Q
```

> **💡 核心提示**：红黑树的树化过程不是直接将链表中的节点逐个 insert 到空树中，而是先将所有节点转为 TreeNode 并用 prev/next 连成双向链表，再通过 `treeify()` 方法自底向上构建红黑树。这种方式比逐个插入更高效，且构建后会自动平衡。退化过程同理，`untreeify()` 会遍历树节点，逐个转回普通 Node 并重新连成单向链表。

## get 源码

再看一下 get 方法源码实现：

```java
/**
 * get 方法入口
 */
public V get(Object key) {
    Node<K, V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

/**
 * 查询节点方法
 */
final Node<K, V> getNode(int hash, Object key) {
    Node<K, V>[] tab;
    Node<K, V> first, e;
    int n;
    K k;
    // 1. 获取下标位置节点元素，命名为 first
    if ((tab = table) != null && (n = tab.length) > 0 &&
            (first = tab[(n - 1) & hash]) != null) {
        // 2. 比较 first 节点哈希值与 key 值
        if (first.hash == hash &&
                ((k = first.key) == key || (key != null && key.equals(k)))) {
            return first;
        }
        if ((e = first.next) != null) {
            // 3. 如果 first 节点类型是红黑树，就执行红黑树的查找逻辑
            if (first instanceof TreeNode) {
                return ((TreeNode<K, V>) first).getTreeNode(hash, key);
            }
            // 4. 否则，就执行链表的查找逻辑
            do {
                if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k)))) {
                    return e;
                }
            } while ((e = e.next) != null);
        }
    }
    // 5. 都没找到就返回 null
    return null;
}
```

get 方法的逻辑与 put 类似：先计算下标 → 检查头节点 → 根据节点类型选择查找方式。头尾节点的比较都优先用 `==` 判断引用是否相同，再用 `equals` 判断值是否相等，这是一种**短路优化**。

## remove 源码

再看一下 remove 方法源码：

```java
/**
 * 删除方法入口
 */
public V remove(Object key) {
    Node<K, V> e;
    return (e = removeNode(hash(key), key, null, false, true)) == null ?
            null : e.value;
}

/**
 * 删除节点方法
 */
final Node<K, V> removeNode(int hash, Object key, Object value,
                            boolean matchValue, boolean movable) {
    Node<K, V>[] tab;
    Node<K, V> p;
    int n, index;
    // 1. 判断数组是否为空，下标位置节点是否为空
    if ((tab = table) != null && (n = tab.length) > 0 &&
            (p = tab[index = (n - 1) & hash]) != null) {
        Node<K, V> node = null, e;
        K k;
        V v;
        // 2. 判断下标节点 key 是否与传入的 key 相等
        if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k)))) {
            node = p;
        } else if ((e = p.next) != null) {
            // 3. 如果节点类型是红黑树，就执行红黑树的查找逻辑
            if (p instanceof TreeNode) {
                node = ((TreeNode<K, V>) p).getTreeNode(hash, key);
            } else {
                // 4. 如果节点类型是链表，就执行链表的查找逻辑
                do {
                    if (e.hash == hash &&
                            ((k = e.key) == key ||
                                    (key != null && key.equals(k)))) {
                        node = e;
                        break;
                    }
                    p = e;
                } while ((e = e.next) != null);
            }
        }
        // 5. 当找到节点时，执行删除
        if (node != null && (!matchValue || (v = node.value) == value ||
                (value != null && value.equals(v)))) {
            if (node instanceof TreeNode) {
                ((TreeNode<K, V>) node).removeTreeNode(this, tab, movable);
            } else if (node == p) {
                // 删除的是头节点
                tab[index] = node.next;
            } else {
                // 删除的是中间或尾节点
                p.next = node.next;
            }
            ++modCount;
            --size;
            afterNodeRemoval(node);
            return node;
        }
    }
    return null;
}
```

关于 `ConcurrentModificationException`：HashMap 的迭代器是 **fail-fast** 的。在创建迭代器时会记录当前的 `modCount` 值，每次调用 `next()` 时都会检查 `modCount` 是否与预期值一致。如果不一致（说明在迭代过程中代码修改了 HashMap 的结构），就会抛出 `ConcurrentModificationException`。这是 Java 集合框架的一种快速失败机制，目的是尽早发现并发修改问题，而不是等到数据错乱后才暴露。

## 时间复杂度分析

### 各操作时间复杂度详细对比

| 操作 | 方法 | 平均时间复杂度 | 最坏时间复杂度 | 空间复杂度 | 说明 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 插入 | `put` | O(1) | O(log n) | O(1) | 无冲突时直接定位桶位 O(1)，冲突严重时树化后 O(log n) |
| 查询 | `get` | O(1) | O(log n) | O(1) | 同上 |
| 删除 | `remove` | O(1) | O(log n) | O(1) | 同上 |
| 扩容 | `resize` | O(n) | O(n) | O(n) | 需要遍历所有元素并迁移到新数组，n 为元素总数 |
| 树化 | `treeifyBin` | O(n) | O(n) | O(n) | 遍历链表构造 TreeNode 并构建红黑树 |
| 退化 | `untreeify` | O(n) | O(n) | O(1) | 遍历红黑树转回链表，n 为桶位节点数 |
| 遍历 | `forEach`/`entrySet` | O(n) | O(n) | O(1) | 遍历整个 table 数组 + 所有链表/树节点 |
| containsKey | `containsKey` | O(1) | O(log n) | O(1) | 等价于 `get` 再判断是否为 null |
| containsValue | `containsValue` | O(n) | O(n) | O(1) | 需要遍历所有桶位的所有节点 |
| size | `size` | O(1) | O(1) | O(1) | 直接返回 `size` 字段 |

> **💡 核心提示**：HashMap 的最坏情况 O(log n) 依赖于红黑树机制。如果 key 的 `hashCode()` 实现很差导致大量冲突，在 Java 7 中最坏情况是 O(n)，Java 8 引入红黑树后才将最坏情况优化到 O(log n)。因此，**自定义对象作为 key 时，务必正确实现 `hashCode()` 和 `equals()` 方法**，这是保证 HashMap 性能的关键前提。

## HashMap 核心参数与特性对比表

### 不同 Map 实现对比

| 特性 | HashMap | LinkedHashMap | TreeMap | ConcurrentHashMap | Hashtable |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 底层结构 | 数组+链表+红黑树 | 数组+链表+红黑树+双向链表 | 红黑树 | 数组+链表+红黑树 | 数组+链表 |
| 有序性 | 无序 | 插入顺序/访问顺序 | 按 key 排序 | 无序 | 无序 |
| 线程安全 | 否 | 否 | 否 | 是（CAS+synchronized） | 是（synchronized） |
| 允许 null key | 是（仅1个） | 是（仅1个） | 否 | 是（仅1个） | 否 |
| 允许 null value | 是（多个） | 是（多个） | 否 | 是（多个） | 否 |
| 迭代器 | fail-fast | fail-fast | fail-fast | weakly consistent | Enumerator |
| 查询复杂度 | O(1) | O(1) | O(log n) | O(1) | O(1) |
| Java 版本 | 1.2 | 1.4 | 1.2 | 1.5 | 1.0 |

### 核心常量对比

| 常量名 | 值 | 作用 |
| :--- | :--- | :--- |
| `DEFAULT_INITIAL_CAPACITY` | 16 | 默认初始容量 |
| `MAXIMUM_CAPACITY` | 2^30 | 最大容量限制 |
| `DEFAULT_LOAD_FACTOR` | 0.75 | 默认负载因子 |
| `TREEIFY_THRESHOLD` | 8 | 链表转红黑树阈值 |
| `UNTREEIFY_THRESHOLD` | 6 | 红黑树退化链表阈值 |
| `MIN_TREEIFY_CAPACITY` | 64 | 树化所需最小数组容量 |

## 生产环境避坑指南

### 1. 预估容量，避免频繁扩容

HashMap 每次扩容都会重新分配数组并迁移所有元素，这是一个 O(n) 的操作。如果生产环境中数据量已知，应该在构造时就指定合适的容量。

```java
// 推荐：预估 1000 个元素
// 公式：capacity = expectedSize / loadFactor + 1
int capacity = (int) Math.ceil(1000 / 0.75) + 1; // = 1334 → tableSizeFor 后为 2048
Map<String, Object> map = new HashMap<>(capacity);
```

### 2. 正确重写 hashCode 和 equals

自定义对象作为 key 时，**必须同时重写 `hashCode()` 和 `equals()`**，否则会出现 key 能 put 但 get 不到的诡异问题。

```java
// 错误示例：只重写 equals，不重写 hashCode
class User {
    String name;
    @Override
    public boolean equals(Object o) {
        if (o instanceof User) return name.equals(((User) o).name);
        return false;
    }
    // 缺少 hashCode，使用 Object 的默认实现（基于内存地址）
}

// 结果：两个 "name" 相同的 User 对象，hashCode 不同，会被当成两个 key
```

> **💡 核心提示**：Java 规范明确规定：如果两个对象 `equals()` 返回 true，则它们的 `hashCode()` 必须相同。违反这个约定，HashMap 的行为将是未定义的。

### 3. 遍历中删除使用 Iterator

```java
// 错误示例：遍历时直接调用 map.remove()
for (String key : map.keySet()) {
    if (key.startsWith("temp")) {
        map.remove(key); // ConcurrentModificationException!
    }
}

// 正确示例：使用 Iterator.remove()
Iterator<String> it = map.keySet().iterator();
while (it.hasNext()) {
    if (it.next().startsWith("temp")) {
        it.remove();
    }
}

// 或者使用 removeIf（Java 8+）
map.keySet().removeIf(key -> key.startsWith("temp"));
```

### 4. 大 key 对象导致内存泄漏

HashMap 的 key 会长期持有对象的引用。如果 key 是重量级对象，且 map 作为 static 字段长期存在，会导致内存泄漏。建议使用 `WeakHashMap` 或者适时清理。

```java
// 使用 WeakHashMap，key 在 GC 时会被自动回收
Map<BigObject, Value> map = new WeakHashMap<>();
```

### 5. 高并发场景使用 ConcurrentHashMap

HashMap 不是线程安全的。多线程并发 `put` 可能导致：
- 数据覆盖（丢失更新）
- size 不准确
- JDK 7 中并发扩容可能形成链表环（Java 8 已修复此问题，但并发数据不一致仍存在）

```java
// 高并发推荐方案
Map<String, Object> map = new ConcurrentHashMap<>();

// 如果需要统计访问顺序，可以使用
ConcurrentHashMap<String, Object> map = new ConcurrentHashMap<>(16, 0.75f, 1);
```

### 6. 注意 Integer/Long 缓存陷阱

```java
// Integer 缓存范围：-128 ~ 127
Map<Integer, String> map = new HashMap<>();
map.put(128, "a");
map.put(128, "b"); // key 是同一个 Integer 对象（自动装箱）

// 但如果用 new Integer(128)，会创建不同对象
// 不过 HashMap 通过 equals 判断 key 是否相同，所以仍然正确
// 但作为 key 时，务必确保 hashCode 和 equals 的一致性
```

### 7. 监控 HashMap 大小

在生产环境中，如果 HashMap 用作缓存但没有设置上限，可能无限增长导致 OOM。

```java
// 使用 LRU 缓存方案替代
Map<String, Object> cache = new LinkedHashMap<>(16, 0.75f, true) {
    @Override
    protected boolean removeEldestEntry(Map.Entry<String, Object> eldest) {
        return size() > 10000; // 超过 10000 时淘汰最久未访问的元素
    }
};
```

## 总结

现在学完了 HashMap 底层源码实现，可以轻松回答开头的问题了。

### 1. HashMap 的底层实现原理

答案：HashMap 的底层数据结构由数组、链表和红黑树组成，核心是基于数组实现的。为了解决哈希冲突，采用拉链法引入链表结构。为了解决链表过长导致的查询性能下降，Java 8 引入了红黑树结构。

### 2. HashMap 的 put 方法执行流程

答案：计算 hash → 数组为空则 `resize()` 初始化 → 计算下标 `(n-1) & hash` → 下标为空则直接插入 → 下标不为空则判断 key 是否已存在 → 红黑树节点执行树插入 → 链表节点执行尾插 → 链表长度达 8 时树化 → `size > threshold` 时扩容。

### 3. HashMap 的扩容流程

答案：容量翻倍（2 倍扩容） → 创建新数组 → 遍历旧数组，单节点直接迁移 → 链表通过 `hash & oldCap` 拆分为低位和高位两条链表 → 红黑树执行 split 方法拆分。

### 4. HashMap 为什么是线程不安全的？

答案：因为 put、remove 等方法没有加同步锁，多线程并发操作时可能导致数据不一致、覆盖等问题。

想要实现线程安全，有三种方案：
- 第一种：使用 `Hashtable`，每个方法都用 `synchronized` 加锁，线程安全但性能差。
  ```java
  Map<Integer, Integer> map = new Hashtable<>();
  ```
- 第二种：使用 `Collections.synchronizedMap()` 包装 HashMap，原理类似，也是用 `synchronized` 加锁。
  ```java
  Map<Integer, Integer> map = Collections.synchronizedMap(new HashMap<>());
  ```
- 第三种：使用 `ConcurrentHashMap`，采用 CAS + synchronized 细粒度锁，性能最好，也是推荐方案。
  ```java
  Map<Integer, Integer> map = new ConcurrentHashMap<>();
  ```

### 5. HashMap 的容量为什么设置成 2 的倍数？并且是 2 倍扩容？

答案：有三个原因：

- **加快哈希运算效率**：如果容量不是 2 的幂，计算下标时只能通过对容量求余，即 `hash % n`（n 是容量）。如果容量是 2 的幂，可以通过位运算计算下标 `(n - 1) & hash`，效率更高。
- **散列更均匀**：配合 `hash()` 方法中的高位异或，2 的幂容量能让键值分布更均匀，减少哈希冲突。
- **扩容效率更高**：扩容时链表通过 `hash & oldCap` 拆分为两条链表，整体迁移，不需要重新计算每个元素的下标。

### 6. HashMap 在 Java 8 版本中做了哪些变更？

答案：Java 8 对 HashMap 做了较大的重构，主要变更有：

- 引入了红黑树结构，链表长度超过 8 时转换为红黑树，查询时间复杂度从 O(n) 优化到 O(log n)
- 优化了链表的扩容机制，原来需要重新计算每个节点下标，现在通过 `hash & oldCap` 拆分为两条链表，整体迁移
- 扩容时机变化，原来添加元素前扩容，现在添加元素后扩容
- 链表插入方式变化，Java 7 之前采用头插法（多线程下可能形成环导致死循环），Java 8 开始采用尾插法

## 行动清单

1. **检查生产环境 HashMap 初始化方式**：审计代码中所有 `new HashMap<>()` 的调用，对于已知大小的场景改为指定初始容量，公式为 `(int) Math.ceil(expectedSize / 0.75) + 1`。
2. **审查自定义 key 对象**：搜索所有自定义类作为 HashMap key 的场景，确认每个类都正确重写了 `hashCode()` 和 `equals()` 方法，且两者保持一致。
3. **排查并发场景误用**：全局搜索 `HashMap` 在多线程上下文中的使用，替换为 `ConcurrentHashMap`，特别注意 static 字段的 HashMap。
4. **监控 HashMap 内存占用**：为使用 HashMap 作为缓存的场景添加大小限制或使用 LRU 策略，防止无限增长导致 OOM；建议配置 JVM 参数 `-XX:+HeapDumpOnOutOfMemoryError` 以便排查。
5. **遍历中安全删除**：审计所有遍历 HashMap 的代码，将 `for-each + map.remove()` 模式替换为 `Iterator.remove()` 或 `removeIf()`，避免触发 `ConcurrentModificationException`。
6. **扩展阅读**：推荐阅读 JDK 源码中的 `HashMap` 完整实现，以及 Joshua Bloch 的《Effective Java》第 3 版第 11 条（"始终在覆盖 equals 时覆盖 hashCode"）。
