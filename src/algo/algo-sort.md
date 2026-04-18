
---

## 引言

面试官问你："说说快速排序的原理。"你答："选个基准值，分左右，递归排。"面试官笑了笑："那为什么 JDK 7 之后 Arrays.sort 用的是 Dual-Pivot QuickSort？你的快排在最坏情况下为什么退化成 O(n²)？"——**90% 的候选人只背了伪代码，却从未真正理解过排序算法的演进逻辑。**

读完本文你将掌握：
- **10 大排序算法的底层原理**：从冒泡到基数排序，理解每种算法的设计哲学
- **时间/空间复杂度的精准分析**：不只是背数字，而是理解"为什么"
- **生产环境选型指南**：什么场景用什么排序，JDK 是怎么做的

> **📌 面试场景**：排序是算法面试的基石，LeetCode 中直接或间接考察排序的题目超过 200+。理解排序的演进关系，比单独记忆每个算法高效 10 倍。

```mermaid
flowchart TD
    A[排序算法] --> B[比较类排序]
    A --> C[非比较类排序]
    
    B --> D[O(n²) 简单排序]
    B --> E[O(n log n) 高效排序]
    
    D --> D1[冒泡排序]
    D --> D2[选择排序]
    D --> D3[插入排序]
    
    E --> E1[希尔排序]
    E --> E2[归并排序]
    E --> E3[快速排序]
    E --> E4[堆排序]
    
    C --> C1[计数排序]
    C --> C2[桶排序]
    C --> C3[基数排序]
    
    D1 -.改进.-> D3
    D3 -.增量分组.-> E1
    D2 -.堆结构优化.-> E4
    D -.分区机制.-> E3
```

## 算法实现与可视化

### 1. 冒泡排序（Bubble Sort）
**动态效果**：最大值像气泡逐渐上浮到末尾

> **💡 核心提示**：`swapped` 标志是关键优化——当数组已有序时提前退出，最佳时间复杂度降至 O(n)。但冒泡的交换操作会导致大量 CPU 缓存失效，实际性能远低于理论值。
```java
public static void bubbleSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
                swapped = true;
            }
        }
        /* 可视化示例（第i轮结果）：
        原始数组：[5,3,8,6,2]
        第1轮后：[3,5,6,2,8] → ██████
        第2轮后：[3,5,2,6,8] → █████
        */
        if (!swapped) break;
    }
}
```

#### 2. 选择排序（Selection Sort）
**动态效果**：黄色区块标记当前最小值位置
```java
public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j; // 标记最小值位置
            }
        }
        swap(arr, i, minIndex);
        /* 可视化示例：
        数组状态：[5,3,8,6,2]
        第1轮：找到2交换到首位 → [2|3,8,6,5]
        第2轮：找到3保持不动 → [2,3|8,6,5]
        */
    }
}
```

### 3. 插入排序（Insertion Sort）
**动态效果**：绿色区块表示已排序部分

> **💡 核心提示**：JDK 中 Arrays.sort() 对基本类型数组在元素少于 47 个时使用插入排序——因为在小数据规模下，简单算法的常数因子更小，比快速排序更快。
```java
public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
        /* 可视化示例：
        当前处理元素：▇
        步骤演示：[2,5,7,▇4,9] → [2,5,▇4,7,9] → [2,▇4,5,7,9]
        */
    }
}
```

### 4. 希尔排序（Shell Sort）
**动态效果**：按不同间隔分组排序
```java
public static void shellSort(int[] arr) {
    for (int gap = arr.length/2; gap > 0; gap /= 2) {
        for (int i = gap; i < arr.length; i++) {
            int temp = arr[i];
            int j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
        /* 可视化示例（gap=2）：
        分组排序：5 3 8 6 2 9 → 
        █组1：5,8,2 → 排序后2,5,8
        █组2：3,6,9 → 排序后3,6,9
        合并结果：2,3,5,6,8,9
        */
    }
}
```

### 5. 归并排序（Merge Sort）
```java
public static void mergeSort(int[] arr) {
    if (arr.length < 2) return;
    int mid = arr.length / 2;
    int[] left = Arrays.copyOfRange(arr, 0, mid);
    int[] right = Arrays.copyOfRange(arr, mid, arr.length);
    mergeSort(left);
    mergeSort(right);
    merge(arr, left, right);
}

private static void merge(int[] arr, int[] left, int[] right) {
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        arr[k++] = left[i] < right[j] ? left[i++] : right[j++];
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
    /* 合并过程可视化：
    左数组：[2,5,8] █████
    右数组：[3,6,9] █████
    合并结果：[2,3,5,6,8,9] ████████
    */
}
```

### 6. 快速排序（Quick Sort）

> **💡 核心提示**：标准快速排序选择末尾元素作为 pivot，在已排序数据上退化到 O(n²)。JDK 7+ 采用 Dual-Pivot QuickSort（双基准快排），由 Vladimir Yaroslavskiy 提出，使用两个 pivot 将数组分成三段，减少递归深度，实测比单 pivot 快 5%-15%。
```java
public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high]; 
    int i = low;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            swap(arr, i++, j);
        }
    }
    swap(arr, i, high);
    return i;
    /* 分区可视化：
    基准值：9
    分区过程：5 3 8 6 2 9 → [5,3,8,6,2] 9 → 最终位置：5
    */
}
```

### 7. 堆排序（Heap Sort）
```java
public static void heapSort(int[] arr) {
    // 建堆
    for (int i = arr.length/2 - 1; i >= 0; i--)
        heapify(arr, arr.length, i);
    // 提取元素
    for (int i = arr.length-1; i > 0; i--) {
        swap(arr, 0, i);
        heapify(arr, i, 0);
    }
}

private static void heapify(int[] arr, int n, int i) {
    int largest = i;
    int l = 2*i + 1;
    int r = 2*i + 2;
    
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    
    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, n, largest);
    }
    /* 堆调整可视化：
    初始堆：9 6 8 3 5 2
    提取最大元素9后重新堆化：
    █6
    ├─█8
    │ ├─█5
    │ └─█2
    └─█3
    */
}
```

### 8. 计数排序（Counting Sort）
```java
public static void countingSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    int[] count = new int[max + 1];
    
    for (int num : arr) count[num]++;
    
    int index = 0;
    for (int i = 0; i <= max; i++) {
        while (count[i]-- > 0) {
            arr[index++] = i;
        }
    }
    /* 计数过程示例：
    原始数组：2,5,3,0,2,3,0,3
    计数数组：[2,0,2,3,0,1]
    最终结果：0,0,2,2,3,3,3,5
    */
}
```

### 9. 桶排序（Bucket Sort）
```java
public static void bucketSort(int[] arr) {
    int bucketSize = 5;
    List<List<Integer>> buckets = new ArrayList<>();
    for (int i = 0; i < bucketSize; i++) {
        buckets.add(new ArrayList<>());
    }
    
    int max = Arrays.stream(arr).max().getAsInt();
    for (int num : arr) {
        int index = num * bucketSize / (max + 1);
        buckets.get(index).add(num);
    }
    
    int index = 0;
    for (List<Integer> bucket : buckets) {
        Collections.sort(bucket);
        for (int num : bucket) {
            arr[index++] = num;
        }
    }
    /* 分桶示例（bucketSize=5，max=9）：
    数值3 → 3*5/(9+1)=1.5 → 放入第1号桶
    分桶结果：[0-1], [2-3], [4-5], [6-7], [8-9]
    */
}
```

### 10. 基数排序（Radix Sort）
```java
public static void radixSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    for (int exp = 1; max/exp > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
}

private static void countingSortByDigit(int[] arr, int exp) {
    int[] output = new int[arr.length];
    int[] count = new int[10];
    
    for (int num : arr) {
        int digit = (num / exp) % 10;
        count[digit]++;
    }
    
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    for (int i = arr.length - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[--count[digit]] = arr[i];
    }
    
    System.arraycopy(output, 0, arr, 0, arr.length);
    /* 按位排序可视化：
    当前处理位：个位
    原始数组：[329,457,657,839,436,720,355]
    按个位分组：720 355 436 457 657 329 839
    */
}
```

## 算法分类与演进

### 2.1 存储方式分类
| 类型       | 特点                           | 典型算法           |
|------------|--------------------------------|--------------------|
| 内部排序   | 数据完全加载到内存             | 快速排序、堆排序   |
| 外部排序   | 海量数据需分批加载到内存处理   | 多路归并排序       |

### 2.2 实现方式分类
| 类型         | 决策方式               | 代表算法           |
|--------------|-----------------------|--------------------|
| 比较类排序   | 通过元素比较确定顺序   | 快速排序、堆排序   |
| 非比较类排序 | 利用元素值特征计算位置 | 计数排序、基数排序 |

---

### 2.3 算法三维差异矩阵
从三个关键维度对比算法本质差异：

| 分类维度        | 代表算法                | 核心差异点                          |
|-----------------|-------------------------|-----------------------------------|
| **比较方式**    |                         |                                   |
| - 比较排序      | 快速/堆排序             | 依赖元素比较决策                  |
| - 非比较排序    | 计数/基数排序           | 利用数值特征定位                  |
| **稳定性**      |                         |                                   |
| - 稳定排序      | 归并/插入排序           | 相等元素相对位置不变              |
| - 非稳定排序    | 堆/希尔排序             | 可能改变相等元素顺序              |
| **空间复杂度**  |                         |                                   |
| - 原地排序      | 冒泡/堆排序             | O(1) 额外空间                    |
| - 非原地排序    | 归并/计数排序           | 需要线性额外空间                  |

---

### 2.4 算法演进关系图谱
揭示算法间的继承与改进关系：

```mermaid
graph LR
    A[基础算法] --> B[插入排序]
    A --> C[选择排序]
    A --> D[交换排序]
    
    B --> E[希尔排序]:::improved
    C --> F[堆排序]:::improved
    D --> G[快速排序]:::improved
    
    H[分治思想] --> I[归并排序]
    H --> G
    
    classDef improved fill:#f9f,stroke:#333;
```

关键演进路径：
1. **插入排序 → 希尔排序**：通过增量分组提升效率
2. **选择排序 → 堆排序**：利用堆结构优化极值查找
3. **交换排序 → 快速排序**：引入分区机制提高性能
4. **分治策略**：同时影响归并排序与快速排序

---

## 算法性能全对比

### 3.1 完整性能对比表

| 算法 | 最佳时间 | 平均时间 | 最坏时间 | 空间复杂度 | 稳定性 | 原地排序 |
|------|----------|----------|----------|------------|--------|----------|
| **冒泡排序** | O(n) | O(n²) | O(n²) | O(1) | 稳定 | 是 |
| **选择排序** | O(n²) | O(n²) | O(n²) | O(1) | 不稳定 | 是 |
| **插入排序** | O(n) | O(n²) | O(n²) | O(1) | 稳定 | 是 |
| **希尔排序** | O(n log n) | O(n log n) | O(n log²n) | O(1) | 不稳定 | 是 |
| **归并排序** | O(n log n) | O(n log n) | O(n log n) | O(n) | 稳定 | 否 |
| **快速排序** | O(n log n) | O(n log n) | O(n²) | O(log n) | 不稳定 | 是 |
| **堆排序** | O(n log n) | O(n log n) | O(n log n) | O(1) | 不稳定 | 是 |
| **计数排序** | O(n+k) | O(n+k) | O(n+k) | O(k) | 稳定 | 否 |
| **桶排序** | O(n+k) | O(n+k) | O(n²) | O(n+k) | 稳定 | 否 |
| **基数排序** | O(nk) | O(nk) | O(nk) | O(n+k) | 稳定 | 否 |

> **💡 核心提示**：比较类排序的理论下限是 O(n log n)，这是由决策树模型决定的——n 个元素有 n! 种排列，决策树高度至少为 log₂(n!) ≈ n log n。要突破这个下限，必须使用非比较类排序（计数、桶、基数）。

### 3.2 优缺点对比

| 算法 | 核心优势 | 主要缺陷 | 适用场景 |
|------|----------|----------|----------|
| **冒泡排序** | 实现简单、稳定排序 | 效率最低的 O(n²) 算法 | 教学演示/小数据集 |
| **快速排序** | 平均 O(n log n) 的最快实践 | 最坏 O(n²)、递归栈溢出风险 | 通用数据排序 |
| **归并排序** | 稳定、最坏仍保持 O(n log n) | 需要 O(n) 额外空间 | 大数据量/外部排序 |
| **堆排序** | 原地排序、适合内存受限环境 | 访问模式不利于缓存利用 | 实时系统/嵌入式开发 |
| **计数排序** | 线性时间复杂度 O(n+k) | 仅适用于整数且范围较小 | 人口统计/成绩排序 |
| **基数排序** | 多维度排序能力 | 依赖稳定子排序算法 | 电话号码/日期排序 |
| **桶排序** | 高效处理均匀分布数据 | 性能受桶数量影响显著 | 均匀分布浮点数 |
| **希尔排序** | 突破 O(n²) 的插入改进版 | 增量序列选择影响性能 | 中等规模数据集 |
| **选择排序** | 交换次数最少 O(n) | 比较次数仍为 O(n²) | 减少写操作场景 |
| **插入排序** | 近乎有序数据效率趋近 O(n) | 逆序数据退化为 O(n²) | 小数据/部分有序数据 |

---

## 算法选择决策模型

根据实际场景需求进行多条件筛选：

1. **数据规模**
    - 小数据 (n≤100)：优先选择插入排序
    - 大数据 (n>1e5)：采用快速排序或归并排序

2. **数据特征**
    - 基本有序：插入排序最优
    - 大量重复元素：三向切分快排
    - 取值范围有限：计数/桶排序

3. **系统约束**
    - 内存紧张：堆排序/希尔排序
    - 稳定性要求：归并排序/插入排序

4. **数据类型**
    - 整数：可考虑基数排序
    - 对象：采用归并排序变种 (TimSort)

---

## JDK 排序实现内幕

### 5.1 Arrays.sort() 的双面性

```mermaid
flowchart TD
    A[Arrays.sort 调用] --> B{基本类型数组?}
    B -->|是| C[Dual-Pivot QuickSort]
    B -->|否| D{数据量 < 47?}
    D -->|是| E[Insertion Sort]
    D -->|否| F{数据量 < 286?}
    F -->|是| G[Dual-Pivot QuickSort]
    F -->|否| H{是否高度结构化?}
    H -->|是| I[TimSort]
    H -->|是| J[Merge Sort]
    
    C --> K[数组 <= 47 时回退到 Insertion Sort]
    E --> L[直接插入排序]
    G --> K
    I --> M[基于归并 + 二分插入排序]
    J --> M
```

> **💡 核心提示**：`Collections.sort()` 底层调用 `Arrays.sort(Object[])`，对象数组必须使用稳定排序以保证 `equals` 相等元素的原始顺序。这就是为什么对象数组不采用快速排序——快速排序是不稳定的。

### 5.2 为什么你的快排会退化？

快速排序在最坏情况下退化为 O(n²) 的典型场景：

1. **已排序数组**：选择末尾元素作为 pivot，每次分区只减少一个元素
2. **逆序数组**：选择末尾元素作为 pivot，分区极度不均衡
3. **全相同元素**：Lomuto 分区方案会进行大量无效交换

**解决方案**：JDK 7+ 采用 Dual-Pivot QuickSort，三向切分快排（Dijkstra 提出）对大量重复元素有 O(n) 的性能。

---

## 生产环境避坑指南

> **⚠️ 避坑 1**：不要在生产环境中对大数组使用 `Arrays.sort()` 的基本类型版本——虽然 Dual-Pivot QuickSort 很快，但特定构造的数据（如"杀手序列"）可以触发 O(n²) 退化。安全性要求高的场景应考虑 `Integer[]` 包装类使用 TimSort。

> **⚠️ 避坑 2**：归并排序需要 O(n) 额外空间，在内存受限的嵌入式环境中可能导致 OOM。此时应优先选择堆排序。

> **⚠️ 避坑 3**：计数排序和基数排序仅适用于非负整数。如果数据包含负数，需要先做偏移处理或将计数数组大小扩大到覆盖整个值域。

> **⚠️ 避坑 4**：希尔排序的性能高度依赖增量序列。Knuth 序列 (h = 3h + 1) 是最常用的选择，但 Sedgewick 序列在大数据量下表现更好。

---

## 核心要点与行动清单

### 典型算法内在联系

1. **分治思想双雄**
    - 快速排序：侧重**分区效率**，通过高效划分降低问题规模
    - 归并排序：强调**合并质量**，保证合并过程稳定有序

2. **选择排序家族**
    - 基础选择排序：线性查找极值
    - 堆排序：利用堆结构加速极值查找

3. **插入排序演进**
    - 传统插入排序：逐个元素定位
    - 希尔排序：通过增量分组实现跳跃式移动

4. **非比较排序共性**
    - 计数排序：基数排序的特例（单一位数排序）
    - 桶排序：广义版本的计数排序

### 行动清单

1. **面试准备**：手写插入排序和快速排序——这是面试最常考的两种排序，插入排序 6 行代码，快速排序 10 行左右
2. **理解原理**：用 Mermaid 画出快速排序的一次分区过程，确认你真的理解 pivot 定位机制
3. **生产检查**：确认你的排序代码没有在全相同元素的场景下使用单 pivot 快速排序
4. **扩展阅读**：推荐阅读《算法（第4版）》第 2 章，以及 JDK `DualPivotQuicksort` 源码