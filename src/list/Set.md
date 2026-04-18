大家期待的《解读Java源码专栏》不能停止更新，在这个系列中，我将手把手带着大家剖析Java核心组件的源码，内容包含集合、线程、线程池、并发、队列等，深入了解其背后的设计思想和实现细节，轻松应对工作面试。
这是解读Java源码系列的第七篇，将跟大家一起学习 Java 中的 Set 集合。

## 引言
当我们需要对元素去重的时候，会使用 Set 集合。可选的 Set 集合有三个，分别是 `HashSet`、`LinkedHashSet`、`TreeSet`。这三个常用的 Set 集合有什么区别？底层实现原理是什么？这篇文章一起来深度剖析。

**共同点**

这三个类都实现了 `Set` 接口，所以使用方式相同：用 `add()` 添加元素、`remove()` 删除元素、`contains()` 判断元素是否存在、`iterator()` 迭代遍历元素。它们都可以去除重复元素。

**特性**

1. `HashSet` 是最基础的 Set 集合，可以去除重复元素，元素存储是无序的。
2. `LinkedHashSet` 在 Set 基本功能基础上，增加了按照元素插入顺序或访问顺序迭代的能力。
3. `TreeSet` 可以保证元素按照大小顺序排列，支持范围查询。

**底层实现**

1. `HashSet` 基于 `HashMap` 实现，采用组合方式（内部持有 HashMap），并非继承。
2. `LinkedHashSet` 继承自 `HashSet`，但内部持有的是 `LinkedHashMap`。听起来有点绕，看完源码就明白了。
3. `TreeSet` 基于 `TreeMap` 实现，同样采用组合方式，与上面两个 Set 没有直接关系。

![Set集合类图](https://javabaguwen.com/img/Set1.png)

三个 Set 集合的核心工作原理可以用下面的流程图概括：

```mermaid
flowchart TD
    Start["HashSet: map = new HashMap()"] --> Add["add(e): map.put(e, PRESENT)"]
    Add --> PutResult{"put 返回 null?"}
    PutResult -->|是| AddSuccess["元素不存在, 添加成功, 返回true"]
    PutResult -->|否| AddFail["元素已存在, 覆盖旧值, 返回false"]
    AddSuccess --> Remove["remove(o): map.remove(o) == PRESENT"]
    AddFail --> Remove
    Remove --> Contains["contains(o): map.containsKey(o)"]
    Contains --> Iterate["iterator(): map.keySet().iterator()"]
    Iterate --> LHSStart["LinkedHashSet: 继承 HashSet"]
    LHSStart --> LHSPattern["构造时调用 HashSet 的私有构造\nsuper(16, .75f, true)\n触发 map = new LinkedHashMap()"]
    LHSPattern --> LHSBehavior["复用 HashSet 的 add/remove/contains\n实际底层是 LinkedHashMap 实现\n支持按插入/访问顺序迭代"]
    LHSBehavior --> TSStart["TreeSet: m = new TreeMap()"]
    TSStart --> TSAdd["add(e): m.put(e, PRESENT)\nTreeMap 基于红黑树\n元素按 Comparator 排序"]
    TSAdd --> TSQuery["额外支持范围查询方法:\nfirst/last/higher/lower\nceiling/floor/pollFirst/pollLast\nheadSet/tailSet/subSet"]
```

## HashSet 源码实现

### 类属性

```java
public class HashSet<E>
        extends AbstractSet<E>
        implements Set<E>, Cloneable, java.io.Serializable {

    /**
     * 使用 HashMap 存储数据，key 是元素，value 是占位对象
     */
    private transient HashMap<E, Object> map;

    /**
     * 所有 key 对应的 value 值，统一使用同一个空对象
     */
    private static final Object PRESENT = new Object();

}
```

`HashSet` 内部采用 `HashMap` 存储元素，利用 `HashMap` 的 key 不能重复的特性实现元素去重。value 统一使用一个静态空对象 `PRESENT` 占位，不存储任何实际数据。所有 key 共用同一个 value 对象，避免了为每个元素创建额外的 value 实例，节省内存。

### 初始化

`HashSet` 常用的构造方法有两个：无参构造和有参构造（指定初始容量和负载系数）。

```java
/**
 * 无参构造方法
 */
HashSet<Integer> hashSet1 = new HashSet<>();

/**
 * 有参构造方法，指定初始容量和负载系数
 */
HashSet<Integer> hashSet2 = new HashSet<>(16, 0.75f);
```

构造方法的源码实现：

```java
/**
 * 无参构造方法
 */
public HashSet() {
    map = new HashMap<>();
}

/**
 * 有参构造方法，指定初始容量和负载系数
 */
public HashSet(int initialCapacity, float loadFactor) {
    map = new HashMap<>(initialCapacity, loadFactor);
}
```

`HashSet` 的构造方法全部委托给 `HashMap` 的对应构造方法实现。

### 常用方法源码

```java
/**
 * 添加元素
 */
public boolean add(E e) {
    return map.put(e, PRESENT) == null;
}

/**
 * 删除元素
 */
public boolean remove(Object o) {
    return map.remove(o) == PRESENT;
}

/**
 * 判断是否包含元素
 */
public boolean contains(Object o) {
    return map.containsKey(o);
}

/**
 * 迭代器
 */
public Iterator<E> iterator() {
    return map.keySet().iterator();
}
```

`HashSet` 的方法全部委托给 `HashMap` 实现：
- `add(e)` → `map.put(e, PRESENT)`：返回 `null` 表示 key 不存在，添加成功（返回 `true`）；返回旧值表示 key 已存在，添加失败（返回 `false`）
- `remove(o)` → `map.remove(o)`：判断返回值是否等于 `PRESENT` 来确定是否删除成功
- `contains(o)` → `map.containsKey(o)`：直接判断 key 是否存在
- `iterator()` → `map.keySet().iterator()`：返回 key 集合的迭代器

## LinkedHashSet 源码实现

### 类属性

`LinkedHashSet` 继承自 `HashSet`，没有任何私有属性。

```java
public class LinkedHashSet<E>
        extends HashSet<E>
        implements Set<E>, Cloneable, java.io.Serializable {
}
```

### 初始化

`LinkedHashSet` 常用的构造方法有三个：

```java
/**
 * 无参构造方法
 */
Set<Integer> linkedHashSet1 = new LinkedHashSet<>();

/**
 * 有参构造方法，指定初始容量
 */
Set<Integer> linkedHashSet2 = new LinkedHashSet<>(16);

/**
 * 有参构造方法，指定初始容量和负载系数
 */
Set<Integer> linkedHashSet3 = new LinkedHashSet<>(16, 0.75f);
```

构造方法的源码实现：

```java
/**
 * 无参构造方法
 */
public LinkedHashSet() {
    super(16, .75f, true);
}

/**
 * 有参构造方法，指定初始容量
 */
public LinkedHashSet(int initialCapacity) {
    super(initialCapacity, .75f, true);
}

/**
 * 有参构造方法，指定初始容量和负载系数
 */
public LinkedHashSet(int initialCapacity, float loadFactor) {
    super(initialCapacity, loadFactor, true);
}
```

`LinkedHashSet` 的构造方法全部调用父类 `HashSet` 的三参数构造方法，第三个参数 `true` 是一个占位标识符（`dummy`），目的是让这个构造方法区别于 `HashSet` 的其他构造方法，从而在内部创建 `LinkedHashMap` 而不是 `HashMap`。

这个三参数构造方法定义在 `HashSet` 中，是**包级私有**的（没有 `public` 修饰），专门给 `LinkedHashSet` 使用：

```java
/**
 * HashSet 的包级私有构造方法，专门给 LinkedHashSet 使用
 *
 * @param initialCapacity 初始容量
 * @param loadFactor      负载系数
 * @param dummy           占位标识符，用于区分调用哪个构造方法
 */
HashSet(int initialCapacity, float loadFactor, boolean dummy) {
    map = new LinkedHashMap<>(initialCapacity, loadFactor);
}
```

`LinkedHashSet` 的其他方法（`add`、`remove`、`contains`、`iterator`）全部继承自 `HashSet`，无需重写。它的有序迭代特性完全由底层的 `LinkedHashMap` 实现保证。

## TreeSet 源码实现

### 类属性

```java
public class TreeSet<E> extends AbstractSet<E>
        implements NavigableSet<E>, Cloneable, java.io.Serializable {

    /**
     * 使用 NavigableMap 存储数据，实际类型是 TreeMap
     */
    private transient NavigableMap<E, Object> m;

    /**
     * value 的默认值，与 HashSet 类似
     */
    private static final Object PRESENT = new Object();

}
```

`TreeSet` 内部使用 `NavigableMap` 存储数据，`NavigableMap` 是 `TreeMap` 的父接口，实际运行时会被 `TreeMap` 实例替换。value 同样使用默认空对象 `PRESENT`，与 `HashSet` 的设计一致。

### 初始化

`TreeSet` 有两个构造方法：无参构造（默认升序）和有参构造（指定排序方式）。

```java
/**
 * 无参构造方法，默认升序
 */
TreeSet<Integer> treeSet1 = new TreeSet<>();

/**
 * 有参构造方法，传入排序方式，这里传入倒序
 */
TreeSet<Integer> treeSet2 = new TreeSet<>(Collections.reverseOrder());
```

构造方法的源码实现：

```java
/**
 * 私有构造方法，接收一个 NavigableMap 实例
 */
TreeSet(NavigableMap<E, Object> m) {
    this.m = m;
}

/**
 * 无参构造方法
 */
public TreeSet() {
    this(new TreeMap<E, Object>());
}

/**
 * 有参构造方法，传入排序方式
 */
public TreeSet(Comparator<? super E> comparator) {
    this(new TreeMap<>(comparator));
}
```

`TreeSet` 的构造方法内部创建 `TreeMap` 实例并赋值给 `m`，基于 `TreeMap` 的红黑树实现元素排序。

### 常用方法源码

```java
/**
 * 添加元素
 */
public boolean add(E e) {
    return m.put(e, PRESENT) == null;
}

/**
 * 删除元素
 */
public boolean remove(Object o) {
    return m.remove(o) == PRESENT;
}

/**
 * 判断是否包含元素
 */
public boolean contains(Object o) {
    return m.containsKey(o);
}

/**
 * 迭代器
 */
public Iterator<E> iterator() {
    return m.navigableKeySet().iterator();
}
```

`TreeSet` 的方法全部委托给 `TreeMap` 实现。与 `HashSet` 不同的是，`TreeSet` 的迭代器使用的是 `navigableKeySet().iterator()`，而 `HashSet` 使用的是 `keySet().iterator()`。

`TreeSet` 的元素排序功能由 `TreeMap` 的红黑树实现。由于元素按大小排列，`TreeSet` 相比其他 Set 集合额外提供了很多按元素大小范围查询的方法：

**其他方法列表：**

| 作用 | 方法签名 |
| --- | --- |
| 获取第一个（最小）元素 | `E first()` |
| 获取最后一个（最大）元素 | `E last()` |
| 获取大于指定元素的最小元素 | `E higher(E e)` |
| 获取小于指定元素的最大元素 | `E lower(E e)` |
| 获取大于等于指定元素的最小元素 | `E ceiling(E e)` |
| 获取小于等于指定元素的最大元素 | `E floor(E e)` |
| 获取并删除第一个元素 | `E pollFirst()` |
| 获取并删除最后一个元素 | `E pollLast()` |
| 获取小于 toElement 的子集合 | `NavigableSet<E> headSet(E toElement, boolean inclusive)` |
| 获取大于 fromElement 的子集合 | `NavigableSet<E> tailSet(E fromElement, boolean inclusive)` |
| 获取指定范围的子集合（精确控制包含关系） | `NavigableSet<E> subSet(E from, boolean fromInc, E to, boolean toInc)` |
| 获取指定范围的子集合（左闭右开） | `SortedSet<E> subSet(E fromElement, E toElement)` |
| 获取小于 toElement 的子集合（不包含） | `SortedSet<E> headSet(E toElement)` |
| 获取大于 fromElement 的子集合（不包含） | `SortedSet<E> tailSet(E fromElement)` |

## 总结

`HashSet`、`LinkedHashSet`、`TreeSet` 三个常用的 Set 集合的共同点是都实现了 `Set` 接口，使用方式相同，都可以去除重复元素。

不同点如下：

**`HashSet` 的关键特性：**

1. 是最基础的 Set 集合，可以去除重复元素，元素无序。
2. 基于 `HashMap` 实现，采用组合方式（内部持有 HashMap）。
3. 利用 `HashMap` 的 key 不重复特性，value 是一个静态空对象 `PRESENT`。

**`LinkedHashSet` 的关键特性：**

1. 继承自 `HashSet`，但内部持有的是 `LinkedHashMap`（通过 `HashSet` 的包级私有构造方法实现）。
2. 在 Set 基本功能基础上，支持按元素插入顺序或访问顺序迭代。
3. 代价是额外维护一个双向链表，增加一倍的引用存储空间。

**`TreeSet` 的关键特性：**

1. 基于 `TreeMap` 实现，采用组合方式，与其他两个 Set 没有直接关系。
2. 可以保证元素按大小顺序排列（默认升序，可自定义 `Comparator`）。
3. 代价是查询、插入、删除操作的时间复杂度从 O(1) 退化到 O(log n)。

### 三种 Set 集合对比

| 特性 | HashSet | LinkedHashSet | TreeSet |
| --- | --- | --- | --- |
| 底层实现 | HashMap | LinkedHashMap | TreeMap |
| 元素顺序 | 无序 | 插入/访问顺序 | 大小排序 |
| 是否允许 null | 是（1个） | 是（1个） | 否（自然排序不允许） |
| add 时间复杂度 | O(1) | O(1) | O(log n) |
| contains 时间复杂度 | O(1) | O(1) | O(log n) |
| 遍历时间复杂度 | O(n) | O(n) | O(n) |
| 额外内存开销 | 无 | 每个节点多 2 个引用 | 红黑树节点额外引用 |

### 使用建议

1. **去重首选 HashSet**：如果只需要元素去重功能，不需要有序遍历，优先使用 `HashSet`，性能最好。
2. **需要有序迭代用 LinkedHashSet**：如果遍历时需要保持元素的插入顺序，使用 `LinkedHashSet`。代价是每个元素多出两个引用的内存开销。
3. **需要排序或范围查询用 TreeSet**：如果元素需要按大小排序、或者需要查询大于/小于某个元素的值，使用 `TreeSet`。注意 `TreeSet` 中的元素必须实现 `Comparable` 接口或提供 `Comparator`。
4. **TreeSet 不支持 null 元素**：使用自然排序（无参构造）时，`TreeSet` 不允许添加 `null` 元素，因为 `compareTo` 方法无法处理 `null`。如果自定义 `Comparator` 且允许 `null`，则可以添加。
