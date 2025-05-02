## 接雨水问题

**题目描述**

给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算下雨之后能接多少雨水。

**示例**
```
输入：[0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：可以接 6 个单位的雨水
```

---

### 解法1：动态规划

**思路**
1. 预处理每个位置左右两侧的最大高度
2. 每个位置能接的雨水量由两侧较小高度决定
3. 累加所有位置的接水量

**关键步骤**
- 从左到右计算左侧最大值
- 从右到左计算右侧最大值
- 计算每个位置的贡献值

```java
public int trap(int[] height) {
    if (height == null || height.length == 0) return 0;
    
    int n = height.length;
    int[] leftMax = new int[n];
    int[] rightMax = new int[n];
    int res = 0;
    
    leftMax[0] = height[0];
    for (int i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i-1], height[i]);
    }
    
    rightMax[n-1] = height[n-1];
    for (int i = n-2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i+1], height[i]);
    }
    
    for (int i = 0; i < n; i++) {
        res += Math.min(leftMax[i], rightMax[i]) - height[i];
    }
    
    return res;
}
```

**复杂度分析**
- 时间复杂度：O(n)
- 空间复杂度：O(n)

---

### 解法2：单调栈

**思路**
1. 维护高度递减的栈
2. 遇到较高柱子时计算凹槽面积
3. 通过栈顶元素确定边界

**特点**
- 按层计算雨水
- 适合处理局部凹槽

```java
public int trap(int[] height) {
    Stack<Integer> stack = new Stack<>();
    int res = 0;
    
    for (int i = 0; i < height.length; i++) {
        while (!stack.isEmpty() && height[i] > height[stack.peek()]) {
            int top = stack.pop();
            if (stack.isEmpty()) break;
            
            int distance = i - stack.peek() - 1;
            int boundedHeight = Math.min(height[i], height[stack.peek()]) - height[top];
            res += distance * boundedHeight;
        }
        stack.push(i);
    }
    
    return res;
}
```

**复杂度分析**
- 时间复杂度：O(n)
- 空间复杂度：O(n)

---

### 解法3：双指针

**思路**
1. 左右指针向中间移动
2. 维护左右最大值
3. 根据较小边计算水量

**优化点**
- 空间复杂度O(1)
- 单次遍历

```java
public int trap(int[] height) {
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0;
    int res = 0;
    
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                res += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                res += rightMax - height[right];
            }
            right--;
        }
    }
    
    return res;
}
```

**复杂度分析**
- 时间复杂度：O(n)
- 空间复杂度：O(1)

---

### 测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 标准测试用例
    int[] height1 = {0,1,0,2,1,0,1,3,2,1,2,1};
    System.out.println(solution.trap(height1)); // 6
    
    // 边界测试
    int[] height2 = {4,2,0,3,2,5};
    System.out.println(solution.trap(height2)); // 9
    
    // 无雨水情况
    int[] height3 = {1,2,3,4,5};
    System.out.println(solution.trap(height3)); // 0
}
```

**不同解法的选择建议**
1. 面试推荐：双指针法（最优空间复杂度）
2. 理解原理：动态规划（直观清晰）
3. 特殊情况：单调栈（处理复杂凹槽）

**常见误区提醒**
1. 注意边界条件（空数组或单元素）
2. 计算高度差时考虑当前柱子高度
3. 双指针移动时先处理较小的一边


## 省份数量问题

**题目描述**

给定一个 n x n 的矩阵 isConnected，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，0 表示不相连。省份是一组直接或间接相连的城市集合，求矩阵中省份的数量。

**示例**
```
输入：[[1,1,0],[1,1,0],[0,0,1]]
输出：2
解释：城市0和1相连，城市2独立
```

---

### 解法1：深度优先搜索(DFS)

**思路**
1. 使用访问数组标记已访问城市
2. 对每个未访问城市进行DFS
3. 通过矩阵递归访问相连城市

```java
class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int count = 0;
        
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(isConnected, visited, i);
                count++;
            }
        }
        return count;
    }
    
    private void dfs(int[][] matrix, boolean[] visited, int i) {
        for (int j = 0; j < matrix.length; j++) {
            if (matrix[i][j] == 1 && !visited[j]) {
                visited[j] = true;
                dfs(matrix, visited, j);
            }
        }
    }
}
```

**复杂度分析**
- 时间复杂度：O(n²)
- 空间复杂度：O(n)

---

### 解法2：广度优先搜索(BFS)

**思路**
1. 使用队列实现BFS遍历
2. 每次出队时访问所有相连城市
3. 统计连通分量数量

```java
class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int count = 0;
        Queue<Integer> queue = new LinkedList<>();
        
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                queue.offer(i);
                while (!queue.isEmpty()) {
                    int city = queue.poll();
                    visited[city] = true;
                    for (int j = 0; j < n; j++) {
                        if (isConnected[city][j] == 1 && !visited[j]) {
                            queue.offer(j);
                        }
                    }
                }
                count++;
            }
        }
        return count;
    }
}
```

**复杂度分析**
- 时间复杂度：O(n²)
- 空间复杂度：O(n)

---

### 解法3：并查集(Union-Find)

**思路**
1. 初始化每个城市为独立集合
2. 合并相连城市
3. 统计根节点数量

```java
class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isConnected[i][j] == 1) {
                    union(parent, i, j);
                }
            }
        }
        
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (parent[i] == i) count++;
        }
        return count;
    }
    
    private void union(int[] parent, int i, int j) {
        parent[find(parent, i)] = find(parent, j);
    }
    
    private int find(int[] parent, int i) {
        if (parent[i] != i) {
            parent[i] = find(parent, parent[i]);
        }
        return parent[i];
    }
}
```

**复杂度分析**
- 时间复杂度：O(n² α(n))，α为阿克曼反函数
- 空间复杂度：O(n)

---

### 测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 标准测试
    int[][] test1 = {{1,1,0},{1,1,0},{0,0,1}};
    System.out.println(solution.findCircleNum(test1)); // 2
    
    // 全连通
    int[][] test2 = {{1,1,1},{1,1,1},{1,1,1}};
    System.out.println(solution.findCircleNum(test2)); // 1
    
    // 全不连通
    int[][] test3 = {{1,0,0},{0,1,0},{0,0,1}};
    System.out.println(solution.findCircleNum(test3)); // 3
}
```

**不同解法的选择建议**
1. 面试推荐：并查集（最优时间复杂度）
2. 理解原理：DFS/BFS（直观易实现）
3. 特殊场景：矩阵过大时BFS可能更优

**常见误区提醒**
1. 注意矩阵对称性（isConnected[i][j] == isConnected[j][i]）
2. 访问标记数组必不可少
3. 并查集需要路径压缩优化


## 有序矩阵查找问题

**题目描述**

给定一个 n x m 的有序矩阵 mat，其中：
- 每行从左到右升序排列
- 每列从上到下升序排列
- 所有元素互不相同

设计一个算法查找元素 x 的位置，返回其行号和列号（从0开始）。要求时间复杂度 O(n+m)，空间复杂度 O(1)。

**示例**
```
输入：
mat = [
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
], 
n = 3, m = 3, x = 5
输出：[1, 1]
```

---

### 解法1：行列双指针法

**思路**
1. 从矩阵右上角开始查找
2. 如果当前元素大于x，向左移动
3. 如果当前元素小于x，向下移动
4. 直到找到目标或越界

```java
public int[] findElement(int[][] mat, int n, int m, int x) {
    int row = 0, col = m - 1; // 从右上角开始
    
    while (row < n && col >= 0) {
        if (mat[row][col] == x) {
            return new int[]{row, col};
        } else if (mat[row][col] > x) {
            col--; // 向左移动
        } else {
            row++; // 向下移动
        }
    }
    return new int[]{-1, -1}; // 未找到
}
```

**复杂度分析**
- 时间复杂度：O(n+m)，最多移动n+m次
- 空间复杂度：O(1)

---

### 解法2：逐行二分查找

**思路**
1. 遍历每一行
2. 对每行进行二分查找
3. 找到即返回位置

```java
public int[] findElement(int[][] mat, int n, int m, int x) {
    for (int i = 0; i < n; i++) {
        int left = 0, right = m - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (mat[i][mid] == x) {
                return new int[]{i, mid};
            } else if (mat[i][mid] < x) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return new int[]{-1, -1};
}
```

**复杂度分析**
- 时间复杂度：O(n log m)
- 空间复杂度：O(1)

---

### 解法3：分治法（针对更大矩阵）

**思路**
1. 将矩阵分为四个象限
2. 根据x与中间值的比较决定搜索范围
3. 递归搜索可能区域

```java
public int[] findElement(int[][] mat, int n, int m, int x) {
    return search(mat, 0, n-1, 0, m-1, x);
}

private int[] search(int[][] mat, int rowStart, int rowEnd, int colStart, int colEnd, int x) {
    if (rowStart > rowEnd || colStart > colEnd) return new int[]{-1, -1};
    
    int rowMid = rowStart + (rowEnd - rowStart)/2;
    int colMid = colStart + (colEnd - colStart)/2;
    
    if (mat[rowMid][colMid] == x) {
        return new int[]{rowMid, colMid};
    } else if (mat[rowMid][colMid] > x) {
        int[] res = search(mat, rowStart, rowMid-1, colStart, colEnd, x);
        if (res[0] == -1) {
            return search(mat, rowMid, rowEnd, colStart, colMid-1, x);
        }
        return res;
    } else {
        int[] res = search(mat, rowMid+1, rowEnd, colStart, colEnd, x);
        if (res[0] == -1) {
            return search(mat, rowStart, rowMid, colMid+1, colEnd, x);
        }
        return res;
    }
}
```

**复杂度分析**
- 时间复杂度：O(log(nm))
- 空间复杂度：O(log(n+m))（递归栈）

---

### 测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 标准测试
    int[][] mat1 = {
        {1, 4, 7},
        {2, 5, 8},
        {3, 6, 9}
    };
    System.out.println(Arrays.toString(solution.findElement(mat1, 3, 3, 5))); // [1, 1]
    
    // 边界测试
    int[][] mat2 = {
        {1, 3, 5},
        {7, 9, 11}
    };
    System.out.println(Arrays.toString(solution.findElement(mat2, 2, 3, 11))); // [1, 2]
    
    // 未找到测试
    System.out.println(Arrays.toString(solution.findElement(mat1, 3, 3, 10))); // [-1, -1]
}
```

**不同解法的选择建议**
1. 面试推荐：双指针法（最优时间复杂度）
2. 实际应用：根据矩阵大小选择（小矩阵用二分，大矩阵用分治）
3. 理解原理：分治法（展示算法设计思想）

**常见误区提醒**
1. 注意矩阵行列边界条件
2. 二分查找时确保区间正确
3. 双指针移动方向不能错（必须从右上或左下开始）


## 菜单层级打印解决方案

**题目描述**

给定一个菜单列表，每个菜单项包含id、菜单文本(menu_text)和父id(pid)，要求按照层级关系打印菜单，子菜单需要添加相应层级的"+"缩进。

**示例输入**
```
1, A, 0
2, B, 0
3, C, 1
4, D, 2
5, E, 4
6, F, 5
7, G, 3
8, H, 2
9, J, 1
```

**预期输出**
```
A
+C
++G
+J
B
+D
++E
+++F
+H
```

---

### 解法分析

#### 核心思路
1. **构建菜单树结构**：使用HashMap建立父菜单ID到子菜单列表的映射
2. **递归打印**：从根节点(pid=0)开始，递归打印每个菜单及其子菜单
3. **层级缩进**：通过递归深度控制"+"的数量，实现层级缩进效果

#### 关键步骤
1. 数据预处理：将菜单项按父ID分组存储
2. 递归打印：深度优先遍历菜单树
3. 缩进处理：每深入一层增加一个"+"前缀

#### 复杂度分析
- 时间复杂度：O(n)，每个菜单项被处理一次
- 空间复杂度：O(n)，存储菜单树结构

---

### 优化后的实现代码

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MenuPrinter {
    
    static class Menu {
        int id;
        String text;
        int parentId;

        public Menu(int id, String text, int parentId) {
            this.id = id;
            this.text = text;
            this.parentId = parentId;
        }
    }

    public static void printMenuHierarchy(List<Menu> menus) {
        // 1. 构建菜单树：父ID -> 子菜单列表
        Map<Integer, List<Menu>> menuTree = buildMenuTree(menus);
        
        // 2. 从根节点开始打印（parentId=0）
        printSubMenus(menuTree, 0, "");
    }

    private static Map<Integer, List<Menu>> buildMenuTree(List<Menu> menus) {
        Map<Integer, List<Menu>> tree = new HashMap<>();
        
        // 初始化所有父节点的子菜单列表
        menus.forEach(menu -> {
            tree.putIfAbsent(menu.parentId, new ArrayList<>());
            tree.get(menu.parentId).add(menu);
        });
        
        return tree;
    }

    private static void printSubMenus(Map<Integer, List<Menu>> menuTree, 
                                     int parentId, String indent) {
        // 获取当前父节点的所有子菜单
        List<Menu> subMenus = menuTree.get(parentId);
        if (subMenus == null) return;

        // 打印当前层级的菜单
        for (Menu menu : subMenus) {
            System.out.println(indent + menu.text);
            // 递归打印子菜单，缩进增加
            printSubMenus(menuTree, menu.id, indent + "+");
        }
    }

    public static void main(String[] args) {
        List<Menu> menus = new ArrayList<>();
        menus.add(new Menu(1, "A", 0));
        menus.add(new Menu(2, "B", 0));
        menus.add(new Menu(3, "C", 1));
        menus.add(new Menu(4, "D", 2));
        menus.add(new Menu(5, "E", 4));
        menus.add(new Menu(6, "F", 5));
        menus.add(new Menu(7, "G", 3));
        menus.add(new Menu(8, "H", 2));
        menus.add(new Menu(9, "J", 1));

        printMenuHierarchy(menus);
    }
}
```

---

### 代码改进说明

1. **命名优化**：
    - 将`menu_text`改为更符合Java规范的`text`
    - 将`pid`改为更明确的`parentId`
    - 方法名改为更具表达性的`printMenuHierarchy`和`printSubMenus`

2. **结构优化**：
    - 分离菜单树构建逻辑到独立方法`buildMenuTree`
    - 使用`putIfAbsent`简化Map操作

3. **可读性提升**：
    - 添加清晰的代码注释
    - 使用Java 8的forEach语法
    - 保持一致的代码风格

---

### 测试用例

```java
// 测试空菜单
List<Menu> emptyMenus = new ArrayList<>();
printMenuHierarchy(emptyMenus);  // 应无输出

// 测试单层菜单
List<Menu> singleLevel = new ArrayList<>();
singleLevel.add(new Menu(1, "Root1", 0));
singleLevel.add(new Menu(2, "Root2", 0));
printMenuHierarchy(singleLevel);
// 预期输出:
// Root1
// Root2

// 测试深层级菜单
List<Menu> deepHierarchy = new ArrayList<>();
deepHierarchy.add(new Menu(1, "A", 0));
deepHierarchy.add(new Menu(2, "B", 1));
deepHierarchy.add(new Menu(3, "C", 2));
deepHierarchy.add(new Menu(4, "D", 3));
printMenuHierarchy(deepHierarchy);
// 预期输出:
// A
// +B
// ++C
// +++D
```

---

### 扩展思考

1. **性能优化**：对于超大型菜单，可以考虑迭代替代递归来避免栈溢出
2. **排序需求**：如果需要按特定顺序打印菜单，可以在构建树时对子菜单列表排序
3. **图形化输出**：可以扩展为生成树形结构的ASCII艺术或HTML格式

这个解决方案清晰、高效地解决了菜单层级打印问题，代码结构良好，易于维护和扩展。


## 用双栈实现队列

**题目描述**

使用两个栈实现一个队列，支持队列的push和pop操作，要求：
- 存储n个元素的空间复杂度为O(n)
- 插入与删除的时间复杂度都是O(1)
- 保证pop操作时队列内已有元素

**实现思路**

### 解法1：双栈倒换法（基础版）

```java
import java.util.Stack;

public class QueueWithTwoStacks {
    Stack<Integer> inStack = new Stack<>();
    Stack<Integer> outStack = new Stack<>();

    // 时间复杂度：O(1)
    public void push(int node) {
        inStack.push(node);
    }

    // 平均时间复杂度：O(1)（摊还分析）
    public int pop() {
        if (outStack.isEmpty()) {
            while (!inStack.isEmpty()) {
                outStack.push(inStack.pop());
            }
        }
        return outStack.pop();
    }
}
```

**复杂度分析**
- 空间复杂度：O(n)（使用两个栈存储元素）
- 时间复杂度：
   - push操作：O(1)
   - pop操作：平均O(1)（最坏情况O(n)，但每个元素最多被移动两次）

**优化说明**
1. 将栈重命名为更具语义化的inStack和outStack
2. 采用惰性转移策略，只有在outStack为空时才进行元素转移
3. 通过摊还分析，pop操作的平均时间复杂度为O(1)

### 解法2：改进版（减少元素移动）

```java
import java.util.Stack;

public class OptimizedQueue {
    Stack<Integer> inputStack = new Stack<>();
    Stack<Integer> outputStack = new Stack<>();

    public void push(int node) {
        inputStack.push(node);
    }

    public int pop() {
        // 只有在输出栈为空时才进行转移
        if (outputStack.isEmpty()) {
            transferElements();
        }
        return outputStack.pop();
    }

    private void transferElements() {
        while (!inputStack.isEmpty()) {
            outputStack.push(inputStack.pop());
        }
    }
}
```

**改进点**
1. 将元素转移逻辑抽取为独立方法
2. 更清晰的逻辑分离，提高代码可读性
3. 保持相同的性能特征但更易于维护

### 测试用例

```java
public static void main(String[] args) {
    QueueWithTwoStacks queue = new QueueWithTwoStacks();
    
    // 测试基本功能
    queue.push(1);
    queue.push(2);
    queue.push(3);
    System.out.println(queue.pop()); // 1
    System.out.println(queue.pop()); // 2
    
    // 测试交替push/pop
    queue.push(4);
    System.out.println(queue.pop()); // 3
    queue.push(5);
    System.out.println(queue.pop()); // 4
    System.out.println(queue.pop()); // 5
    
    // 测试边界条件
    try {
        queue.pop(); // 应该抛出异常或返回特定值
    } catch (Exception e) {
        System.out.println("队列为空");
    }
}
```

### 不同实现的选择建议

1. **面试推荐**：基础版（易于解释实现原理）
2. **实际应用**：改进版（代码更清晰，易于维护）
3. **性能关键**：可以考虑进一步优化transfer逻辑

### 常见问题解答

**Q: 为什么pop操作的时间复杂度是O(1)？**
A: 虽然最坏情况下需要O(n)时间转移元素，但每个元素最多被转移两次（从inStack到outStack一次，然后被pop一次），因此平均时间复杂度为O(1)。

**Q: 如何保证线程安全？**
A: 可以在方法上添加`synchronized`关键字，或使用`ConcurrentStack`等线程安全数据结构。

**Q: 这种实现的局限性是什么？**
A: 不适合需要频繁随机访问的场景，且连续pop/push操作可能导致性能波动。

这个实现满足了题目所有要求，并提供了清晰的代码结构和合理的性能特征。


## 多线程交替打印ABC解决方案

**题目描述**

创建三个线程A、B、C，分别打印字母A、B、C各10次，要求三个线程交替执行，按照ABCABC...的顺序打印。

### 解法1：信号量(Semaphore)实现

**实现思路**
使用三个信号量控制线程执行顺序，形成循环依赖链：
- 线程A需要获取信号量A后执行，然后释放信号量B
- 线程B需要获取信号量B后执行，然后释放信号量C
- 线程C需要获取信号量C后执行，然后释放信号量A

```java
import java.util.concurrent.Semaphore;

public class ABCSemaphore {
    private static Semaphore semA = new Semaphore(1);
    private static Semaphore semB = new Semaphore(0);
    private static Semaphore semC = new Semaphore(0);

    static class PrintThread extends Thread {
        private Semaphore current;
        private Semaphore next;
        private String content;
        private int count;

        public PrintThread(Semaphore current, Semaphore next, String content, int count) {
            this.current = current;
            this.next = next;
            this.content = content;
            this.count = count;
        }

        @Override
        public void run() {
            try {
                for (int i = 0; i < count; i++) {
                    current.acquire();
                    System.out.print(content);
                    next.release();
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) {
        new PrintThread(semA, semB, "A", 10).start();
        new PrintThread(semB, semC, "B", 10).start();
        new PrintThread(semC, semA, "C", 10).start();
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)
- 空间复杂度：O(1)

### 解法2：同步锁(synchronized)实现

**实现思路**
使用对象锁和wait/notify机制控制执行顺序：
- 每个线程需要获取前驱线程的锁和自身锁
- 打印后唤醒下一个线程，自身进入等待状态

```java
public class ABCSynchronized {
    private static Object lockA = new Object();
    private static Object lockB = new Object();
    private static Object lockC = new Object();

    static class PrintThread implements Runnable {
        private Object prevLock;
        private Object selfLock;
        private String content;
        private int count;

        public PrintThread(Object prevLock, Object selfLock, String content, int count) {
            this.prevLock = prevLock;
            this.selfLock = selfLock;
            this.content = content;
            this.count = count;
        }

        @Override
        public void run() {
            while (count > 0) {
                synchronized (prevLock) {
                    synchronized (selfLock) {
                        System.out.print(content);
                        count--;
                        selfLock.notifyAll();
                    }
                    try {
                        if (count == 0) {
                            prevLock.notifyAll();
                        } else {
                            prevLock.wait();
                        }
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        new Thread(new PrintThread(lockC, lockA, "A", 10)).start();
        Thread.sleep(10);
        new Thread(new PrintThread(lockA, lockB, "B", 10)).start();
        Thread.sleep(10);
        new Thread(new PrintThread(lockB, lockC, "C", 10)).start();
    }
}
```

### 解法3：可重入锁(ReentrantLock)实现

**实现思路**
使用全局状态变量和条件判断：
- 通过state变量控制当前应该执行的线程
- 使用while循环避免虚假唤醒

```java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ABCReentrantLock {
    private static Lock lock = new ReentrantLock();
    private static int state = 0;

    static class PrintThread extends Thread {
        private String content;
        private int targetState;
        private int count;

        public PrintThread(String content, int targetState, int count) {
            this.content = content;
            this.targetState = targetState;
            this.count = count;
        }

        @Override
        public void run() {
            for (int i = 0; i < count; ) {
                lock.lock();
                try {
                    while (state % 3 == targetState) {
                        System.out.print(content);
                        state++;
                        i++;
                    }
                } finally {
                    lock.unlock();
                }
            }
        }
    }

    public static void main(String[] args) {
        new PrintThread("A", 0, 10).start();
        new PrintThread("B", 1, 10).start();
        new PrintThread("C", 2, 10).start();
    }
}
```

### 解法4：Lock+Condition实现

**实现思路**
为每个线程创建Condition条件：
- 线程在不符合执行条件时await
- 前驱线程执行完成后signal下一个线程

```java
import java.util.concurrent.locks.*;

public class ABCCondition {
    private static Lock lock = new ReentrantLock();
    private static Condition conditionA = lock.newCondition();
    private static Condition conditionB = lock.newCondition();
    private static Condition conditionC = lock.newCondition();
    private static int state = 0;

    static class PrintThread extends Thread {
        private Condition current;
        private Condition next;
        private String content;
        private int targetState;
        private int count;

        public PrintThread(Condition current, Condition next, 
                         String content, int targetState, int count) {
            this.current = current;
            this.next = next;
            this.content = content;
            this.targetState = targetState;
            this.count = count;
        }

        @Override
        public void run() {
            lock.lock();
            try {
                for (int i = 0; i < count; i++) {
                    while (state % 3 != targetState) {
                        current.await();
                    }
                    System.out.print(content);
                    state++;
                    next.signal();
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                lock.unlock();
            }
        }
    }

    public static void main(String[] args) {
        new PrintThread(conditionA, conditionB, "A", 0, 10).start();
        new PrintThread(conditionB, conditionC, "B", 1, 10).start();
        new PrintThread(conditionC, conditionA, "C", 2, 10).start();
    }
}
```

### 方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|---------|
| Semaphore | 实现简单，逻辑清晰 | 需要多个信号量 | 简单同步场景 |
| Synchronized | Java原生支持 | 需要精细控制锁顺序 | 基础同步需求 |
| ReentrantLock | 灵活，可中断 | 需要手动释放锁 | 复杂同步控制 |
| Condition | 精确控制线程唤醒 | 实现较复杂 | 需要条件等待的场景 |

**最佳实践建议**
1. 简单场景优先考虑Semaphore方案
2. 需要精确控制时使用Lock+Condition
3. 保持代码简洁性和可读性


## LRU缓存实现方案

**LRU算法简介**

LRU（Least Recently Used）是一种常见的缓存淘汰策略，它会优先淘汰最近最少使用的数据，保留热点数据。

### 解法1：双向链表+哈希表

**实现思路**
1. 使用双向链表维护数据访问顺序
2. 使用哈希表实现O(1)时间复杂度的数据访问
3. 链表头部是最久未使用的数据，尾部是最近使用的数据

```java
import java.util.HashMap;
import java.util.Map;

public class LRUCache<K, V> {
    private final int capacity;
    private final Map<K, Node<K, V>> cache;
    private Node<K, V> head;
    private Node<K, V> tail;

    private static class Node<K, V> {
        K key;
        V value;
        Node<K, V> prev;
        Node<K, V> next;

        Node(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new HashMap<>();
    }

    public V get(K key) {
        Node<K, V> node = cache.get(key);
        if (node == null) return null;
        
        moveToTail(node);
        return node.value;
    }

    public void put(K key, V value) {
        Node<K, V> node = cache.get(key);
        
        if (node != null) {
            node.value = value;
            moveToTail(node);
        } else {
            node = new Node<>(key, value);
            cache.put(key, node);
            addToTail(node);
            
            if (cache.size() > capacity) {
                cache.remove(head.key);
                removeNode(head);
            }
        }
    }

    private void moveToTail(Node<K, V> node) {
        removeNode(node);
        addToTail(node);
    }

    private void removeNode(Node<K, V> node) {
        if (node.prev != null) {
            node.prev.next = node.next;
        } else {
            head = node.next;
        }
        
        if (node.next != null) {
            node.next.prev = node.prev;
        } else {
            tail = node.prev;
        }
    }

    private void addToTail(Node<K, V> node) {
        if (tail != null) {
            tail.next = node;
            node.prev = tail;
            node.next = null;
        }
        tail = node;
        
        if (head == null) {
            head = node;
        }
    }
}
```

**复杂度分析**
- 时间复杂度：get和put操作均为O(1)
- 空间复杂度：O(capacity)

### 解法2：LinkedHashMap实现

**实现思路**
利用Java内置的LinkedHashMap，它本身就维护了访问顺序

```java
import java.util.LinkedHashMap;
import java.util.Map;

public class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;
    }
}
```

**复杂度分析**
- 时间复杂度：与LinkedHashMap实现相同，get和put操作均为O(1)
- 空间复杂度：O(capacity)

### 方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|---------|
| 双向链表+哈希表 | 完全自定义实现，灵活性高 | 实现较复杂 | 需要特殊定制的场景 |
| LinkedHashMap | 实现简单，代码量少 | 功能受限 | 标准LRU实现场景 |

**最佳实践建议**
1. 优先考虑LinkedHashMap实现，除非有特殊需求
2. 面试场景建议手动实现双向链表版本
3. 生产环境使用成熟的开源实现如Guava Cache

**扩展思考**
1. 如何实现线程安全的LRU缓存？
2. 如何处理缓存穿透问题？
3. 如何实现带过期时间的LRU缓存？



