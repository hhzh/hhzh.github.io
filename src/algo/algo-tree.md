## 求二叉树最下层数值之和

**题目描述**

```markdown
给定一个二叉树的根节点，返回其最底层叶子节点的数值之和。

示例：
输入：
    1
   / \
  2   3
 / \   \
4   5   6
输出：15 (4+5+6)

要求：
1. 时间复杂度O(n)
2. 空间复杂度O(n)
```

解题思路

```markdown
层序遍历法（BFS）：
1. 使用队列进行广度优先搜索
2. 记录每一层的节点值之和
3. 遍历完成后返回最后一层的和

关键点：
- 队列中同时只存储同一层的节点
- 每次处理完一层后更新当前层和
- 最后保留的层和即为结果
```

## 标准实现（BFS）

```java
import java.util.Queue;
import java.util.LinkedList;

class Solution {
    public int deepestLeavesSum(TreeNode root) {
        if (root == null) return 0;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int sum = 0;
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            sum = 0; // 重置当前层和
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                sum += node.val;
                
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
        }
        
        return sum;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(n) - 最坏情况下队列存储n/2个节点
```

## 替代解法（DFS）

```java
class Solution {
    private int maxDepth = 0;
    private int sum = 0;
    
    public int deepestLeavesSum(TreeNode root) {
        dfs(root, 0);
        return sum;
    }
    
    private void dfs(TreeNode node, int depth) {
        if (node == null) return;
        
        if (depth > maxDepth) {
            maxDepth = depth;
            sum = node.val;
        } else if (depth == maxDepth) {
            sum += node.val;
        }
        
        dfs(node.left, depth + 1);
        dfs(node.right, depth + 1);
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(h) - 递归栈深度，h为树高
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 构建测试树
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    
    // 常规测试
    System.out.println(solution.deepestLeavesSum(root)); // 15
    
    // 单节点树
    TreeNode single = new TreeNode(1);
    System.out.println(solution.deepestLeavesSum(single)); // 1
    
    // 不平衡树
    TreeNode unbalanced = new TreeNode(1);
    unbalanced.left = new TreeNode(2);
    unbalanced.left.left = new TreeNode(3);
    System.out.println(solution.deepestLeavesSum(unbalanced)); // 3
}

// 树节点定义
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
```

方法比较

| 方法       | 优点               | 缺点               | 适用场景           |
|------------|--------------------|--------------------|--------------------|
| BFS        | 直观易懂           | 需要额外队列空间   | 层相关操作首选     |
| DFS        | 空间效率高         | 需要全局变量       | 树深度较大时       |

常见问题解答

**Q1：为什么BFS的空间复杂度是O(n)？**
```markdown
最坏情况下（完全二叉树）队列需要存储约n/2个节点
```

**Q2：DFS如何确定最深层？**
```markdown
维护全局变量记录当前最大深度和对应节点值和
```

**Q3：如何处理空树？**
```markdown
在方法开始处检查root是否为null，直接返回0
```

算法可视化

```
示例树：
    1
   / \
  2   3
 / \   \
4   5   6

BFS过程：
层1：处理1，sum=1
层2：处理2,3，sum=5
层3：处理4,5,6，sum=15
返回15
```

**扩展思考**：
1. 如何求每层的平均值？
2. 如何找到最宽的一层？
3. 如何优化处理超大树的层序遍历？


## 二叉树的镜像

**题目描述**

```markdown
给定一个二叉树的根节点，将其转换为它的镜像二叉树。

示例：
输入：
     4
   /   \
  2     7
 / \   / \
1   3 6   9

输出：
     4
   /   \
  7     2
 / \   / \
9   6 3   1

要求：
1. 不能创建新节点，只能修改指针指向
2. 时间复杂度O(n)
3. 空间复杂度O(n)
```

解题思路

```markdown
核心操作：
1. 交换每个节点的左右子树
2. 递归处理子树

方法选择：
1. 递归法：代码简洁直观
2. 迭代法（栈/队列）：避免递归栈溢出
```

标准实现（递归法）

```java
class Solution {
    public TreeNode mirrorTree(TreeNode root) {
        if (root == null) return null;
        
        // 递归处理子树
        TreeNode left = mirrorTree(root.left);
        TreeNode right = mirrorTree(root.right);
        
        // 交换左右子树
        root.left = right;
        root.right = left;
        
        return root;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(h) - 递归栈深度，h为树高
```

迭代实现（栈）

```java
import java.util.Stack;

class Solution {
    public TreeNode mirrorTree(TreeNode root) {
        if (root == null) return null;
        
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            
            // 交换左右子节点
            TreeNode temp = node.left;
            node.left = node.right;
            node.right = temp;
            
            // 将子节点压栈
            if (node.left != null) stack.push(node.left);
            if (node.right != null) stack.push(node.right);
        }
        
        return root;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(n) - 最坏情况下栈存储所有节点
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 构建测试树
    TreeNode root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(7);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(9);
    
    // 镜像转换
    TreeNode mirrored = solution.mirrorTree(root);
    
    // 验证结果
    System.out.println(mirrored.val); // 4
    System.out.println(mirrored.left.val); // 7
    System.out.println(mirrored.right.val); // 2
    System.out.println(mirrored.left.left.val); // 9
    System.out.println(mirrored.left.right.val); // 6
    System.out.println(mirrored.right.left.val); // 3
    System.out.println(mirrored.right.right.val); // 1
}

// 树节点定义
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
```

方法比较

| 方法       | 优点               | 缺点               | 适用场景           |
|------------|--------------------|--------------------|--------------------|
| 递归法     | 代码简洁           | 可能栈溢出         | 树深度不大时       |
| 迭代法     | 避免递归栈溢出     | 需要额外数据结构   | 生产环境首选       |

常见问题解答

**Q1：为什么需要先递归再交换？**
```markdown
先处理子树可以确保交换时子树已经是镜像状态
```

**Q2：如何处理空节点？**
```markdown
在递归开始处检查节点是否为null，直接返回
```

**Q3：迭代法为什么使用栈而不是队列？**
```markdown
栈的LIFO特性更符合递归的思维模式，队列也可以实现但顺序不同
```

算法可视化

```
原始树：
     4
   /   \
  2     7
 / \   / \
1   3 6   9

转换过程：
1. 交换4的左右子树
2. 递归处理7和2
3. 交换7的左右子树（9和6）
4. 交换2的左右子树（3和1）
```

**扩展思考**：
1. 如何判断两棵树是否互为镜像？
2. 如何实现部分子树的镜像？
3. 如何优化处理超大树的镜像转换？


## 合并二叉树

**题目描述**

```markdown
给定两个二叉树，将它们合并为一个新的二叉树。合并规则是：
- 对应位置都有节点时，节点值相加
- 只有一个树有节点时，直接使用该节点
- 都为空时保持空

示例：
输入：
树1：     1         树2：     2
       / \               / \
      3   2             1   3
     /                   \   \
    5                     4   7

输出合并后的树：
      3
     / \
    4   5
   / \   \
  5   4   7
```

解题思路

```markdown
核心操作：
1. 同时遍历两棵树的对应节点
2. 根据节点存在情况决定合并方式
3. 递归处理左右子树

方法选择：
1. 递归法：代码简洁直观
2. 迭代法（队列）：避免递归栈溢出
```

标准实现（递归法）

```java
class Solution {
    public TreeNode mergeTrees(TreeNode t1, TreeNode t2) {
        if (t1 == null) return t2;
        if (t2 == null) return t1;
        
        TreeNode merged = new TreeNode(t1.val + t2.val);
        merged.left = mergeTrees(t1.left, t2.left);
        merged.right = mergeTrees(t1.right, t2.right);
        
        return merged;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(min(m,n)) - 只遍历较小树的节点
空间复杂度：O(min(m,n)) - 递归栈深度
```

迭代实现（队列）

```java
import java.util.LinkedList;
import java.util.Queue;

class Solution {
    public TreeNode mergeTrees(TreeNode t1, TreeNode t2) {
        if (t1 == null) return t2;
        if (t2 == null) return t1;
        
        Queue<TreeNode[]> queue = new LinkedList<>();
        queue.offer(new TreeNode[]{t1, t2});
        
        while (!queue.isEmpty()) {
            TreeNode[] nodes = queue.poll();
            
            // 合并节点值
            nodes[0].val += nodes[1].val;
            
            // 处理左子树
            if (nodes[0].left != null && nodes[1].left != null) {
                queue.offer(new TreeNode[]{nodes[0].left, nodes[1].left});
            } else if (nodes[0].left == null) {
                nodes[0].left = nodes[1].left;
            }
            
            // 处理右子树
            if (nodes[0].right != null && nodes[1].right != null) {
                queue.offer(new TreeNode[]{nodes[0].right, nodes[1].right});
            } else if (nodes[0].right == null) {
                nodes[0].right = nodes[1].right;
            }
        }
        
        return t1;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(min(m,n)) - 只遍历较小树的节点
空间复杂度：O(min(m,n)) - 队列存储节点对
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 构建测试树
    TreeNode t1 = new TreeNode(1);
    t1.left = new TreeNode(3);
    t1.right = new TreeNode(2);
    t1.left.left = new TreeNode(5);
    
    TreeNode t2 = new TreeNode(2);
    t2.left = new TreeNode(1);
    t2.right = new TreeNode(3);
    t2.left.right = new TreeNode(4);
    t2.right.right = new TreeNode(7);
    
    // 合并树
    TreeNode merged = solution.mergeTrees(t1, t2);
    
    // 验证结果
    System.out.println(merged.val); // 3
    System.out.println(merged.left.val); // 4
    System.out.println(merged.right.val); // 5
    System.out.println(merged.left.left.val); // 5
    System.out.println(merged.left.right.val); // 4
    System.out.println(merged.right.right.val); // 7
}

// 树节点定义
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
```

方法比较

| 方法       | 优点               | 缺点               | 适用场景           |
|------------|--------------------|--------------------|--------------------|
| 递归法     | 代码简洁           | 可能栈溢出         | 树深度不大时       |
| 迭代法     | 避免递归栈溢出     | 需要额外数据结构   | 生产环境首选       |

**常见问题解答**

**Q1：为什么时间复杂度是O(min(m,n))？**
```markdown
当一棵树遍历完后，另一棵树的剩余部分直接拼接，无需继续遍历
```

**Q2：如何处理两棵树都为空的情况？**
```markdown
递归法中会返回null，迭代法中不会将空节点加入队列
```

**Q3：迭代法为什么使用队列存储节点对？**
```markdown
方便同时处理两棵树的对应节点，保持同步遍历
```

算法可视化

```
树1：     1         树2：     2
       / \               / \
      3   2             1   3
     /                   \   \
    5                     4   7

合并过程：
1. 合并根节点1+2=3
2. 合并左子树3+1=4
3. 合并右子树2+3=5
4. 处理左子树的子树：
   - 5+null=5
   - null+4=4
5. 处理右子树的子树：
   - null+7=7
```

**扩展思考**：
1. 如何实现三棵树的合并？
2. 如何保留原始树结构不修改？
3. 如何优化处理超大树的合并？


## 判断满二叉树

**题目描述**

```markdown
给定一个二叉树的根节点，判断它是否是满二叉树。满二叉树的定义是：
1. 每个节点要么有0个子节点（叶子节点）
2. 要么有2个子节点
3. 所有叶子节点都在同一层

示例1（满二叉树）：
      1
    /   \
   2     3
  / \   / \
 4   5 6   7

示例2（非满二叉树）：
      1
    /   \
   2     3
  / \
 4   5
```

解题思路

```markdown
递归法：
1. 检查当前节点是否符合满二叉树节点要求（0或2个子节点）
2. 递归检查左右子树
3. 确保左右子树高度相同

层序遍历法：
1. 使用队列进行广度优先遍历
2. 检查每个节点的子节点数量
3. 确保所有叶子节点在同一层
```

标准实现（递归法）

```java
class Solution {
    public boolean isFullTree(TreeNode root) {
        if (root == null) return true;
        
        // 检查子节点数量
        if ((root.left == null) != (root.right == null)) {
            return false;
        }
        
        return isFullTree(root.left) && isFullTree(root.right);
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(h) - 递归栈深度，h为树高
```

## 层序遍历实现

```java
import java.util.LinkedList;
import java.util.Queue;

class Solution {
    public boolean isFullTree(TreeNode root) {
        if (root == null) return true;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        boolean mustBeLeaf = false;
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            
            // 检查节点子节点情况
            if (mustBeLeaf && (node.left != null || node.right != null)) {
                return false;
            }
            
            if (node.left != null && node.right != null) {
                queue.offer(node.left);
                queue.offer(node.right);
            } else if (node.left != null || node.right != null) {
                return false;
            } else {
                mustBeLeaf = true;
            }
        }
        
        return true;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(n) - 队列存储节点
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 测试满二叉树
    TreeNode fullTree = new TreeNode(1);
    fullTree.left = new TreeNode(2);
    fullTree.right = new TreeNode(3);
    fullTree.left.left = new TreeNode(4);
    fullTree.left.right = new TreeNode(5);
    fullTree.right.left = new TreeNode(6);
    fullTree.right.right = new TreeNode(7);
    System.out.println("Is full tree: " + solution.isFullTree(fullTree)); // true
    
    // 测试非满二叉树
    TreeNode notFullTree = new TreeNode(1);
    notFullTree.left = new TreeNode(2);
    notFullTree.right = new TreeNode(3);
    notFullTree.left.left = new TreeNode(4);
    System.out.println("Is full tree: " + solution.isFullTree(notFullTree)); // false
    
    // 测试单节点树
    TreeNode singleNode = new TreeNode(1);
    System.out.println("Is full tree: " + solution.isFullTree(singleNode)); // true
}

// 树节点定义
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
```

方法比较

| 方法         | 优点               | 缺点               | 适用场景           |
|--------------|--------------------|--------------------|--------------------|
| 递归法       | 代码简洁           | 可能栈溢出         | 树深度不大时       |
| 层序遍历法   | 避免递归栈溢出     | 需要额外队列空间   | 生产环境首选       |

**常见问题解答**

**Q1：空树是满二叉树吗？**
```markdown
通常认为空树是满二叉树，但具体要看题目要求
```

**Q2：只有一个节点的树是满二叉树吗？**
```markdown
是的，单个叶子节点满足满二叉树定义
```

**Q3：如何检查所有叶子节点在同一层？**
```markdown
层序遍历时标记首次出现叶子节点的层数，后续叶子节点必须在该层
```

算法可视化

```
满二叉树检查过程：
1. 检查根节点有两个子节点
2. 递归检查左子树
3. 递归检查右子树
4. 确保左右子树高度相同
```

**扩展思考**：
1. 如何计算满二叉树的节点数？
2. 如何构造一个满二叉树？
3. 如何优化处理超大树的检查？


## 对称二叉树

**题目描述**

```markdown
给定一个二叉树的根节点，判断它是否是镜像对称的。

示例1（对称）：
      1
    /   \
   2     2
  / \   / \
 3   4 4   3

示例2（不对称）：
      1
    /   \
   2     2
    \     \
     3     3

要求：
1. 时间复杂度O(n)
2. 空间复杂度O(n)
```

解题思路

```markdown
核心思想：
1. 对称二叉树需要满足：
   - 左右子树镜像对称
   - 左子树的左子树与右子树的右子树对称
   - 左子树的右子树与右子树的左子树对称

方法选择：
1. 递归法：代码简洁直观
2. 迭代法（队列）：避免递归栈溢出
```

标准实现（递归法）

```java
class Solution {
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return isMirror(root.left, root.right);
    }
    
    private boolean isMirror(TreeNode left, TreeNode right) {
        if (left == null && right == null) return true;
        if (left == null || right == null) return false;
        return (left.val == right.val) 
            && isMirror(left.left, right.right) 
            && isMirror(left.right, right.left);
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(h) - 递归栈深度，h为树高
```

迭代实现（队列）

```java
import java.util.LinkedList;
import java.util.Queue;

class Solution {
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root.left);
        queue.offer(root.right);
        
        while (!queue.isEmpty()) {
            TreeNode left = queue.poll();
            TreeNode right = queue.poll();
            
            if (left == null && right == null) continue;
            if (left == null || right == null) return false;
            if (left.val != right.val) return false;
            
            queue.offer(left.left);
            queue.offer(right.right);
            queue.offer(left.right);
            queue.offer(right.left);
        }
        
        return true;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(n) - 队列存储节点
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 测试对称树
    TreeNode symTree = new TreeNode(1);
    symTree.left = new TreeNode(2);
    symTree.right = new TreeNode(2);
    symTree.left.left = new TreeNode(3);
    symTree.left.right = new TreeNode(4);
    symTree.right.left = new TreeNode(4);
    symTree.right.right = new TreeNode(3);
    System.out.println("Is symmetric: " + solution.isSymmetric(symTree)); // true
    
    // 测试不对称树
    TreeNode asymTree = new TreeNode(1);
    asymTree.left = new TreeNode(2);
    asymTree.right = new TreeNode(2);
    asymTree.left.right = new TreeNode(3);
    asymTree.right.right = new TreeNode(3);
    System.out.println("Is symmetric: " + solution.isSymmetric(asymTree)); // false
    
    // 测试单节点树
    TreeNode singleNode = new TreeNode(1);
    System.out.println("Is symmetric: " + solution.isSymmetric(singleNode)); // true
}

// 树节点定义
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
```

方法比较

| 方法       | 优点               | 缺点               | 适用场景           |
|------------|--------------------|--------------------|--------------------|
| 递归法     | 代码简洁           | 可能栈溢出         | 树深度不大时       |
| 迭代法     | 避免递归栈溢出     | 需要额外队列空间   | 生产环境首选       |

**常见问题解答**

**Q1：空树是对称的吗？**
```markdown
是的，空树被认为是镜像对称的
```

**Q2：单个节点的树是对称的吗？**
```markdown
是的，单个节点满足对称条件
```

**Q3：为什么需要比较左左与右右、左右与右左？**
```markdown
这是镜像对称的核心特征：外侧子树和内侧子树分别对称
```

算法可视化

```
对称树检查过程：
1. 比较根节点的左右子树
2. 比较左子树的左节点与右子树的右节点
3. 比较左子树的右节点与右子树的左节点
4. 递归/迭代检查所有对应节点
```

**扩展思考**：
1. 如何判断多叉树的对称性？
2. 如何找出二叉树中最大的对称子树？
3. 如何优化处理超大树的对称性检查？


## 二叉搜索树的最近公共祖先

**题目描述**

```markdown
给定一个二叉搜索树和两个节点p、q，找到这两个节点的最近公共祖先（LCA）。

最近公共祖先定义：对于有根树T的两个节点p、q，最近公共祖先表示一个节点x，满足：
1. x是p和q的祖先
2. x的深度尽可能大
3. 一个节点可以是它自己的祖先

二叉搜索树性质：
- 左子树所有节点值 < 根节点值
- 右子树所有节点值 > 根节点值
- 所有节点值唯一
- p和q不同且都存在树中

示例1：
输入: root = [7,1,12,0,4,11,14,null,null,3,5], p = 1, q = 12
输出: 7

示例2：
输入: root = [7,1,12,0,4,11,14,null,null,3,5], p = 12, q = 11
输出: 12
```

解题思路

```markdown
利用BST性质：
1. 若p、q都小于当前节点值，LCA在左子树
2. 若p、q都大于当前节点值，LCA在右子树
3. 否则当前节点就是LCA

方法选择：
1. 递归法：代码简洁直观
2. 迭代法：空间效率更高
```

标准实现（递归法）

```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (p.val < root.val && q.val < root.val) {
            return lowestCommonAncestor(root.left, p, q);
        } else if (p.val > root.val && q.val > root.val) {
            return lowestCommonAncestor(root.right, p, q);
        } else {
            return root;
        }
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(h) - h为树高，最坏O(n)
空间复杂度：O(h) - 递归栈深度
```

迭代实现

```java
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (p.val < root.val && q.val < root.val) {
                root = root.left;
            } else if (p.val > root.val && q.val > root.val) {
                root = root.right;
            } else {
                break;
            }
        }
        return root;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(h) - h为树高
空间复杂度：O(1) - 只使用常数空间
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 构建测试树
    TreeNode root = new TreeNode(7);
    root.left = new TreeNode(1);
    root.right = new TreeNode(12);
    root.left.left = new TreeNode(0);
    root.left.right = new TreeNode(4);
    root.right.left = new TreeNode(11);
    root.right.right = new TreeNode(14);
    root.left.right.left = new TreeNode(3);
    root.left.right.right = new TreeNode(5);
    
    // 测试用例1
    TreeNode p1 = root.left; // 1
    TreeNode q1 = root.right; // 12
    System.out.println(solution.lowestCommonAncestor(root, p1, q1).val); // 7
    
    // 测试用例2
    TreeNode p2 = root.right; // 12
    TreeNode q2 = root.right.left; // 11
    System.out.println(solution.lowestCommonAncestor(root, p2, q2).val); // 12
    
    // 测试用例3
    TreeNode p3 = root.left.right.left; // 3
    TreeNode q3 = root.left.right.right; // 5
    System.out.println(solution.lowestCommonAncestor(root, p3, q3).val); // 4
}

// 树节点定义
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
```

方法比较

| 方法       | 优点               | 缺点               | 适用场景           |
|------------|--------------------|--------------------|--------------------|
| 递归法     | 代码简洁           | 可能栈溢出         | 树高度不大时       |
| 迭代法     | 空间效率高         | 代码稍长           | 生产环境首选       |

**常见问题解答**

**Q1：为什么BST性质可以简化LCA查找？**
```markdown
BST的有序性让我们可以确定p、q的位置关系，无需遍历整个树
```

**Q2：如果p或q不存在树中会怎样？**
```markdown
题目已保证p、q都存在，实际应用中需要额外检查
```

**Q3：如何处理普通二叉树的LCA问题？**
```markdown
需要更通用的解法，如记录父节点或使用递归搜索
```

算法可视化

```
示例1查找过程：
p=1, q=12
1. 7: 1<7且12>7 → 返回7

示例2查找过程：
p=12, q=11
1. 7: 12>7且11>7 → 右移
2. 12: 11<12 → 返回12
```

**扩展思考**：
1. 如何扩展处理多个节点的LCA？
2. 如何优化处理频繁查询的场景？
3. 如何实现BST的动态插入/删除后的LCA查询？


## 二叉树路径和检查

**题目描述**

```markdown
给定一个二叉树和一个目标和，判断是否存在从根节点到叶子节点的路径，使得路径上所有节点值的和等于给定的目标值。

示例：
输入：
      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1
sum = 22

输出：true
解释：路径5->4->11->2的和为22

要求：
1. 路径必须从根节点到叶子节点
2. 时间复杂度O(n)
3. 空间复杂度O(h)，h为树高
```

解题思路

```markdown
核心思想：
1. 递归检查子树是否存在满足条件的路径
2. 每次递归减去当前节点值
3. 到达叶子节点时检查剩余和是否为0

方法选择：
1. 递归法：代码简洁直观
2. 迭代法（栈）：避免递归栈溢出
```

标准实现（递归法）

```java
class Solution {
    public boolean hasPathSum(TreeNode root, int sum) {
        if (root == null) return false;
        
        // 到达叶子节点时检查
        if (root.left == null && root.right == null) {
            return root.val == sum;
        }
        
        // 递归检查左右子树
        return hasPathSum(root.left, sum - root.val) || 
               hasPathSum(root.right, sum - root.val);
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(h) - 递归栈深度，h为树高
```

迭代实现（栈）

```java
import java.util.Stack;

class Solution {
    public boolean hasPathSum(TreeNode root, int sum) {
        if (root == null) return false;
        
        Stack<TreeNode> nodeStack = new Stack<>();
        Stack<Integer> sumStack = new Stack<>();
        nodeStack.push(root);
        sumStack.push(sum - root.val);
        
        while (!nodeStack.isEmpty()) {
            TreeNode node = nodeStack.pop();
            int currSum = sumStack.pop();
            
            if (node.left == null && node.right == null && currSum == 0) {
                return true;
            }
            
            if (node.right != null) {
                nodeStack.push(node.right);
                sumStack.push(currSum - node.right.val);
            }
            if (node.left != null) {
                nodeStack.push(node.left);
                sumStack.push(currSum - node.left.val);
            }
        }
        
        return false;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(h) - 栈存储节点和路径和
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 构建测试树
    TreeNode root = new TreeNode(5);
    root.left = new TreeNode(4);
    root.right = new TreeNode(8);
    root.left.left = new TreeNode(11);
    root.right.left = new TreeNode(13);
    root.right.right = new TreeNode(4);
    root.left.left.left = new TreeNode(7);
    root.left.left.right = new TreeNode(2);
    root.right.right.right = new TreeNode(1);
    
    // 测试用例1
    System.out.println(solution.hasPathSum(root, 22)); // true
    
    // 测试用例2
    System.out.println(solution.hasPathSum(root, 26)); // true
    
    // 测试用例3
    System.out.println(solution.hasPathSum(root, 18)); // false
    
    // 测试空树
    System.out.println(solution.hasPathSum(null, 0)); // false
}

// 树节点定义
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
```

方法比较

| 方法       | 优点               | 缺点               | 适用场景           |
|------------|--------------------|--------------------|--------------------|
| 递归法     | 代码简洁           | 可能栈溢出         | 树高度不大时       |
| 迭代法     | 避免递归栈溢出     | 需要额外数据结构   | 生产环境首选       |

**常见问题解答**

**Q1：为什么要在叶子节点检查？**
```markdown
题目要求路径必须到叶子节点，中间节点即使满足和也不能返回true
```

**Q2：如何处理空树情况？**
```markdown
直接返回false，因为空树没有路径
```

**Q3：为什么迭代法使用两个栈？**
```markdown
一个栈存储节点，另一个栈存储对应的剩余和，保持同步处理
```

算法可视化

```
示例树路径检查过程：
查找sum=22：
1. 5 → sum=17
2. 4 → sum=13
3. 11 → sum=2
4. 2 → sum=0 → 返回true
```

**扩展思考**：
1. 如何返回所有满足条件的路径？
2. 如何优化处理超大树的路径检查？
3. 如何实现任意节点到任意节点的路径和检查？


## 二叉树的最大深度

**题目描述**

```markdown
给定一个二叉树的根节点，返回其最大深度。最大深度是指从根节点到最远叶子节点的最长路径上的节点数。

示例：
输入：
     3
    / \
   9  20
     /  \
    15   7
输出：3
解释：最长路径为3→20→15或3→20→7，长度为3

要求：
1. 时间复杂度O(n)
2. 空间复杂度O(h)，h为树高
```

解题思路

```markdown
核心思想：
1. 递归计算左右子树深度
2. 取较大值加1（当前节点）
3. 空节点深度为0

方法选择：
1. 递归法：代码简洁直观
2. 迭代法（层序遍历）：避免递归栈溢出
```

标准实现（递归法）

```java
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(h) - 递归栈深度，h为树高
```

迭代实现（层序遍历）

```java
import java.util.Queue;
import java.util.LinkedList;

class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int depth = 0;
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            depth++;
        }
        
        return depth;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(n) - 最坏情况下队列存储n/2个节点
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 构建测试树
    TreeNode root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    
    // 测试常规树
    System.out.println(solution.maxDepth(root)); // 3
    
    // 测试单节点树
    TreeNode singleNode = new TreeNode(1);
    System.out.println(solution.maxDepth(singleNode)); // 1
    
    // 测试空树
    System.out.println(solution.maxDepth(null)); // 0
    
    // 测试不平衡树
    TreeNode unbalanced = new TreeNode(1);
    unbalanced.left = new TreeNode(2);
    unbalanced.left.left = new TreeNode(3);
    System.out.println(solution.maxDepth(unbalanced)); // 3
}

// 树节点定义
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
```

方法比较

| 方法       | 优点               | 缺点               | 适用场景           |
|------------|--------------------|--------------------|--------------------|
| 递归法     | 代码简洁           | 可能栈溢出         | 树高度不大时       |
| 迭代法     | 避免递归栈溢出     | 需要额外队列空间   | 生产环境首选       |

**常见问题解答**

**Q1：为什么递归法要加1？**
```markdown
加1代表当前节点的深度，再加上子树的最大深度
```

**Q2：层序遍历如何统计深度？**
```markdown
每处理完一层节点后深度计数器加1
```

**Q3：空树的深度是多少？**
```markdown
0，因为没有任何节点
```

算法可视化

```
示例树深度计算过程：
1. 根节点3：max(左子树深度,右子树深度)+1
2. 左子树9：max(0,0)+1=1
3. 右子树20：max(左子树15深度,右子树7深度)+1
4. 15和7都是叶子节点：max(0,0)+1=1
5. 回算：20的深度=1+1=2
6. 最终：max(1,2)+1=3
```

**扩展思考**：
1. 如何计算二叉树的最小深度？
2. 如何统计每层的节点数？
3. 如何优化处理超大树的深度计算？


## 二叉树的之字形层序遍历

**题目描述**

```markdown
给定一个二叉树的根节点，返回其节点值的之字形层序遍历结果。
即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行。

示例：
输入：
     3
    / \
   9  20
     /  \
    15   7
输出：
[
  [3],
  [20,9],
  [15,7]
]

要求：
1. 时间复杂度O(n)
2. 空间复杂度O(n)
```

解题思路

```markdown
核心思想：
1. 使用队列进行常规层序遍历
2. 根据层数奇偶性决定是否反转当前层结果
3. 使用双栈交替处理奇偶层

方法选择：
1. 队列+反转法：实现简单
2. 双栈法：无需反转，效率更高
```

## 标准实现（队列+反转）

```java
import java.util.*;

class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        boolean reverse = false;
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> level = new ArrayList<>();
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            
            if (reverse) Collections.reverse(level);
            result.add(level);
            reverse = !reverse;
        }
        
        return result;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(n) - 队列存储节点
```

## 双栈实现

```java
import java.util.*;

class Solution {
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Stack<TreeNode> oddStack = new Stack<>();  // 奇数层
        Stack<TreeNode> evenStack = new Stack<>(); // 偶数层
        oddStack.push(root);
        
        while (!oddStack.isEmpty() || !evenStack.isEmpty()) {
            List<Integer> level = new ArrayList<>();
            
            if (!oddStack.isEmpty()) {
                while (!oddStack.isEmpty()) {
                    TreeNode node = oddStack.pop();
                    level.add(node.val);
                    if (node.left != null) evenStack.push(node.left);
                    if (node.right != null) evenStack.push(node.right);
                }
            } else {
                while (!evenStack.isEmpty()) {
                    TreeNode node = evenStack.pop();
                    level.add(node.val);
                    if (node.right != null) oddStack.push(node.right);
                    if (node.left != null) oddStack.push(node.left);
                }
            }
            
            result.add(level);
        }
        
        return result;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(n) - 栈存储节点
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 构建测试树
    TreeNode root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    
    // 测试常规树
    List<List<Integer>> result = solution.zigzagLevelOrder(root);
    System.out.println(result); // [[3], [20,9], [15,7]]
    
    // 测试单节点树
    TreeNode singleNode = new TreeNode(1);
    System.out.println(solution.zigzagLevelOrder(singleNode)); // [[1]]
    
    // 测试空树
    System.out.println(solution.zigzagLevelOrder(null)); // []
}

// 树节点定义
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
```

方法比较

| 方法         | 优点               | 缺点               | 适用场景           |
|--------------|--------------------|--------------------|--------------------|
| 队列+反转    | 实现简单           | 需要反转操作       | 快速实现           |
| 双栈法       | 无需反转           | 需要维护两个栈     | 追求更高效率       |

**常见问题解答**

**Q1：为什么偶数层要反转？**
```markdown
之字形遍历要求偶数层从右向左遍历，反转可以实现这一效果
```

**Q2：双栈法如何保证顺序？**
```markdown
奇数层栈先压左后压右，偶数层栈先压右后压左，自然形成交替顺序
```

**Q3：如何处理空树？**
```markdown
直接返回空列表，避免空指针异常
```

算法可视化

```
示例树遍历过程：
层0(奇数): [3]
层1(偶数): [20,9] (反转)
层2(奇数): [15,7]
```

**扩展思考**：
1. 如何实现N叉树的之字形遍历？
2. 如何优化处理超大树的之字形遍历？
3. 如何同时记录每个节点的层级信息？


## 二叉树的层序遍历

**题目描述**

```markdown
给定一个二叉树的根节点，返回其节点值的层序遍历结果。（即逐层地，从左到右访问所有节点）

示例：
输入：
     3
    / \
   9  20
     /  \
    15   7
输出：
[
  [3],
  [9,20],
  [15,7]
]

要求：
1. 时间复杂度O(n)
2. 空间复杂度O(n)
```

解题思路

```markdown
核心思想：
1. 使用队列进行广度优先搜索(BFS)
2. 每次处理一层的所有节点
3. 将子节点按顺序加入队列

方法选择：
1. 迭代法（队列）：标准实现
2. 递归法：理解递归思想
```

## 标准实现（队列迭代法）

```java
import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> level = new ArrayList<>();
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            
            result.add(level);
        }
        
        return result;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(n) - 队列存储节点
```

## 递归实现

```java
import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        traverse(root, 0, result);
        return result;
    }
    
    private void traverse(TreeNode node, int level, List<List<Integer>> result) {
        if (node == null) return;
        
        if (level >= result.size()) {
            result.add(new ArrayList<>());
        }
        
        result.get(level).add(node.val);
        traverse(node.left, level + 1, result);
        traverse(node.right, level + 1, result);
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点访问一次
空间复杂度：O(h) - 递归栈深度，h为树高
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 构建测试树
    TreeNode root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    
    // 测试常规树
    List<List<Integer>> result = solution.levelOrder(root);
    System.out.println(result); // [[3], [9,20], [15,7]]
    
    // 测试单节点树
    TreeNode singleNode = new TreeNode(1);
    System.out.println(solution.levelOrder(singleNode)); // [[1]]
    
    // 测试空树
    System.out.println(solution.levelOrder(null)); // []
}

// 树节点定义
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
```

方法比较

| 方法       | 优点               | 缺点               | 适用场景           |
|------------|--------------------|--------------------|--------------------|
| 迭代法     | 直观高效           | 需要额外队列空间   | 生产环境首选       |
| 递归法     | 代码简洁           | 可能栈溢出         | 理解递归原理       |

**常见问题解答**

**Q1：为什么使用队列而不是栈？**
```markdown
队列的FIFO特性保证先处理上层节点，符合层序遍历要求
```

**Q2：如何处理空树情况？**
```markdown
在方法开始处检查root是否为null，直接返回空列表
```

**Q3：递归法如何知道当前层级？**
```markdown
通过level参数记录当前深度，与result的索引对应
```

算法可视化

```
示例树遍历过程：
1. 处理层0: [3]
2. 处理层1: [9,20] 
3. 处理层2: [15,7]
```

**扩展思考**：
1. 如何实现自底向上的层序遍历？
2. 如何统计每层的平均值？
3. 如何优化处理超大树的层序遍历？


## 二叉树的后序遍历

**题目描述**

给定一个二叉树的根节点 `root`，返回它的节点值的后序遍历结果。

**示例**

```
输入：
    1
     \
      2
     /
    3
输出：[3, 2, 1]
```

**后序遍历特点**
1. 先遍历左子树
2. 再遍历右子树
3. 最后访问根节点

---

**解法1：递归法**

**思路**
利用递归天然的栈结构特性，按照后序顺序访问节点：
1. 递归遍历左子树
2. 递归遍历右子树
3. 访问当前节点

**关键步骤**
1. 终止条件：当前节点为null时返回
2. 递归处理左右子树
3. 将当前节点值加入结果集

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        postorder(root, res);
        return res;
    }
    
    private void postorder(TreeNode root, List<Integer> res) {
        if (root == null) return;
        postorder(root.left, res);   // 遍历左子树
        postorder(root.right, res);  // 遍历右子树
        res.add(root.val);           // 访问根节点
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)，每个节点被访问一次
- 空间复杂度：O(h)，递归栈深度取决于树的高度（最坏情况O(n)）

---

**解法2：迭代法（双栈法）**

**思路**
利用显式栈模拟递归过程：
1. 使用主栈按"根-右-左"顺序压入节点（类似前序变种）
2. 用辅助栈反转得到"左-右-根"的后序顺序

**关键步骤**
1. 根节点压入主栈
2. 循环弹出节点并压入辅助栈
3. 按先左后右的顺序将子节点压入主栈
4. 最终辅助栈的出栈顺序即为后序

```java
import java.util.*;

public class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        LinkedList<Integer> res = new LinkedList<>();
        if (root == null) return res;
        
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            res.addFirst(node.val);  // 插入结果头部实现反转
            
            if (node.left != null) stack.push(node.left);
            if (node.right != null) stack.push(node.right);
        }
        return res;
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)，每个节点入栈出栈各一次
- 空间复杂度：O(n)，栈空间消耗

---

**解法3：迭代法（标记法）**

**思路**
通过标记已访问的右子树来避免重复处理：
1. 使用栈保存节点和访问状态
2. 遇到新节点先压栈并标记为未访问
3. 当弹出已标记节点时才进行访问

```java
import java.util.*;

public class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Stack<Object> stack = new Stack<>();
        if (root != null) stack.push(root);
        
        while (!stack.isEmpty()) {
            Object obj = stack.pop();
            if (obj instanceof TreeNode) {
                TreeNode node = (TreeNode) obj;
                stack.push(node.val);  // 值直接入结果栈
                if (node.right != null) stack.push(node.right);
                if (node.left != null) stack.push(node.left);
            } else {
                res.add((Integer) obj);
            }
        }
        return res;
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)
- 空间复杂度：O(n)

---

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 构建测试树：1 -> 2 -> 3
    TreeNode root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.left = new TreeNode(3);
    
    System.out.println(solution.postorderTraversal(root)); // 输出 [3, 2, 1]
    System.out.println(solution.postorderTraversal(null)); // 输出 []
}
```

**不同解法的选择建议**
- 面试推荐：递归法（简洁易懂）
- 实际应用：迭代法（避免栈溢出风险）
- 拓展思考：Morris遍历（可达到O(1)空间复杂度）


## 二叉树的中序遍历

**题目描述**

给定一个二叉树的根节点 `root`，返回它的节点值的中序遍历结果。

**示例**

```
输入：
    1
     \
      2
     /
    3
输出：[1, 3, 2]
```

**中序遍历特点**
1. 先遍历左子树
2. 再访问根节点
3. 最后遍历右子树

---

**解法1：递归法**

**思路**
利用递归天然的栈结构特性，按照中序顺序访问节点：
1. 递归遍历左子树
2. 访问当前节点
3. 递归遍历右子树

**关键步骤**
1. 终止条件：当前节点为null时返回
2. 先递归处理左子树
3. 将当前节点值加入结果集
4. 最后递归处理右子树

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        inorder(root, res);
        return res;
    }
    
    private void inorder(TreeNode root, List<Integer> res) {
        if (root == null) return;
        inorder(root.left, res);   // 遍历左子树
        res.add(root.val);         // 访问根节点
        inorder(root.right, res);  // 遍历右子树
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)，每个节点被访问一次
- 空间复杂度：O(h)，递归栈深度取决于树的高度（最坏情况O(n)）

---

**解法2：迭代法（显式栈）**

**思路**
使用显式栈模拟递归过程：
1. 沿着左子树深度优先压栈
2. 弹出栈顶节点并访问
3. 转向右子树重复过程

**关键步骤**
1. 当前节点非空时持续压栈并左移
2. 当前节点为空时弹出栈顶访问
3. 转向右子树继续处理

```java
import java.util.*;

public class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        
        while (root != null || !stack.isEmpty()) {
            // 深入左子树
            while (root != null) {
                stack.push(root);
                root = root.left;
            }
            // 访问节点
            root = stack.pop();
            res.add(root.val);
            // 转向右子树
            root = root.right;
        }
        return res;
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)，每个节点入栈出栈各一次
- 空间复杂度：O(n)，栈空间消耗

---

**解法3：Morris遍历（空间优化）**

**思路**
通过修改树结构实现O(1)空间复杂度：
1. 利用叶子节点的空指针建立临时链接
2. 遍历完成后恢复树结构

```java
import java.util.*;

public class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        TreeNode curr = root;
        
        while (curr != null) {
            if (curr.left == null) {
                res.add(curr.val);
                curr = curr.right;
            } else {
                // 寻找前驱节点
                TreeNode pre = curr.left;
                while (pre.right != null && pre.right != curr) {
                    pre = pre.right;
                }
                
                if (pre.right == null) {
                    pre.right = curr;  // 建立临时链接
                    curr = curr.left;
                } else {
                    pre.right = null;  // 恢复树结构
                    res.add(curr.val);
                    curr = curr.right;
                }
            }
        }
        return res;
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)，每个节点被访问两次
- 空间复杂度：O(1)，只使用常数级额外空间

---

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 构建测试树：1 -> 2 -> 3
    TreeNode root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.left = new TreeNode(3);
    
    System.out.println(solution.inorderTraversal(root)); // 输出 [1, 3, 2]
    System.out.println(solution.inorderTraversal(null)); // 输出 []
}
```

**不同解法的选择建议**
- 面试推荐：递归法（代码简洁）
- 实际应用：迭代法（避免栈溢出）
- 特殊要求：Morris遍历（空间敏感场景）

**补充说明**
中序遍历的重要特性：对二叉搜索树(BST)进行中序遍历，可以得到有序的升序序列。这个特性常用于BST的验证和相关算法问题。


## 二叉树的前序遍历

**题目描述**

给定一个二叉树的根节点 `root`，返回它的节点值的前序遍历结果。

**示例**

```
输入：
    1
   / \
  2   3
 / \
4   5
输出：[1, 2, 4, 5, 3]
```

**前序遍历特点**
1. 先访问根节点
2. 再遍历左子树
3. 最后遍历右子树

---

**解法1：递归法**

**思路**
利用递归天然的栈结构特性，按照前序顺序访问节点：
1. 访问当前节点
2. 递归遍历左子树
3. 递归遍历右子树

**关键步骤**
1. 终止条件：当前节点为null时返回
2. 先将当前节点值加入结果集
3. 递归处理左子树
4. 递归处理右子树

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        preorder(root, res);
        return res;
    }
    
    private void preorder(TreeNode root, List<Integer> res) {
        if (root == null) return;
        res.add(root.val);         // 访问根节点
        preorder(root.left, res);  // 遍历左子树
        preorder(root.right, res); // 遍历右子树
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)，每个节点被访问一次
- 空间复杂度：O(h)，递归栈深度取决于树的高度（最坏情况O(n)）

---

**解法2：迭代法（显式栈）**

**思路**
使用显式栈模拟递归过程：
1. 根节点先入栈
2. 每次弹出栈顶节点并访问
3. 按先右后左的顺序压入子节点

**关键步骤**
1. 根节点压栈
2. 循环弹出栈顶节点并访问
3. 右子节点先压栈（保证左子节点先出栈）
4. 左子节点后压栈

```java
import java.util.*;

public class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            res.add(node.val);
            if (node.right != null) stack.push(node.right);
            if (node.left != null) stack.push(node.left);
        }
        return res;
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)，每个节点入栈出栈各一次
- 空间复杂度：O(n)，栈空间消耗

---

**解法3：Morris遍历（空间优化）**

**思路**
通过修改树结构实现O(1)空间复杂度：
1. 利用叶子节点的空指针建立临时链接
2. 遍历完成后恢复树结构

```java
import java.util.*;

public class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        TreeNode curr = root;
        
        while (curr != null) {
            if (curr.left == null) {
                res.add(curr.val);
                curr = curr.right;
            } else {
                TreeNode pre = curr.left;
                while (pre.right != null && pre.right != curr) {
                    pre = pre.right;
                }
                
                if (pre.right == null) {
                    res.add(curr.val);  // 访问节点
                    pre.right = curr;  // 建立临时链接
                    curr = curr.left;
                } else {
                    pre.right = null;   // 恢复树结构
                    curr = curr.right;
                }
            }
        }
        return res;
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)，每个节点被访问两次
- 空间复杂度：O(1)，只使用常数级额外空间

---

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 构建测试树
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    
    System.out.println(solution.preorderTraversal(root)); // 输出 [1, 2, 4, 5, 3]
    System.out.println(solution.preorderTraversal(null)); // 输出 []
}
```

**不同解法的选择建议**
- 面试推荐：递归法（代码简洁直观）
- 实际应用：迭代法（避免栈溢出风险）
- 特殊场景：Morris遍历（内存严格受限时）

**应用场景**
前序遍历常用于：
1. 复制二叉树结构
2. 计算目录结构的缩进显示
3. 表达式树的前缀表示
4. 序列化二叉树结构


## 判断完全二叉树

**题目描述**

给定一个二叉树的根节点 `root`，判断该树是否是完全二叉树。

**完全二叉树定义**：
1. 除最后一层外，其他各层节点数达到最大值
2. 最后一层的节点都连续集中在最左边

**示例**
```
输入：
    1
   / \
  2   3
 / \
4   5
输出：true

输入：
    1
   / \
  2   3
 / \   \
4   5   7
输出：false
```

---

**解法1：层序遍历法**

**思路**
利用队列进行层序遍历，关键判断条件：
1. 遇到第一个空节点后，后续必须全部是空节点
2. 空节点只能出现在最后一层或倒数第二层的最右边

**关键步骤**
1. 初始化队列并放入根节点
2. 设置空节点标记位
3. 每次出队检查节点状态
4. 按层序将子节点入队（包括null）

```java
import java.util.LinkedList;
import java.util.Queue;

public class Solution {
    public boolean isCompleteTree(TreeNode root) {
        if (root == null) return true;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        boolean hasNull = false;
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            
            if (node == null) {
                hasNull = true;
            } else {
                if (hasNull) return false;  // 空节点后出现非空
                queue.offer(node.left);
                queue.offer(node.right);
            }
        }
        return true;
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)，每个节点访问一次
- 空间复杂度：O(n)，队列最大存储量

---

**解法2：节点索引验证法**

**思路**
利用完全二叉树的索引特性：
1. 给每个节点编号（根节点为1）
2. 左孩子编号为2*i，右孩子为2*i+1
3. 最大编号应等于节点总数

**实现步骤**
1. 使用包装类记录节点数和最大编号
2. 深度优先遍历计算这两个值
3. 比较最大编号和节点总数

```java
class Solution {
    public boolean isCompleteTree(TreeNode root) {
        int totalNodes = countNodes(root);
        return validateIndex(root, 1, new int[]{totalNodes});
    }
    
    private int countNodes(TreeNode root) {
        if (root == null) return 0;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
    
    private boolean validateIndex(TreeNode node, int index, int[] maxIndex) {
        if (node == null) return true;
        if (index > maxIndex[0]) return false;
        return validateIndex(node.left, 2*index, maxIndex) && 
               validateIndex(node.right, 2*index+1, maxIndex);
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)，两次遍历
- 空间复杂度：O(h)，递归栈深度

---

**解法3：双指针层序遍历**

**优化点**
减少null节点的存储空间：
1. 使用两个指针分别跟踪当前层和下一层
2. 记录非空节点的出现位置

```java
import java.util.LinkedList;
import java.util.Queue;

public class Solution {
    public boolean isCompleteTree(TreeNode root) {
        if (root == null) return true;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        boolean end = false;
        
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node == null) {
                end = true;
            } else {
                if (end) return false;
                queue.offer(node.left);
                queue.offer(node.right);
            }
        }
        return true;
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)
- 空间复杂度：O(n/2)，最坏情况存储最后一层节点

---

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 测试用例1：完全二叉树
    TreeNode root1 = new TreeNode(1);
    root1.left = new TreeNode(2);
    root1.right = new TreeNode(3);
    root1.left.left = new TreeNode(4);
    root1.left.right = new TreeNode(5);
    System.out.println(solution.isCompleteTree(root1)); // true
    
    // 测试用例2：非完全二叉树
    TreeNode root2 = new TreeNode(1);
    root2.left = new TreeNode(2);
    root2.right = new TreeNode(3);
    root2.left.left = new TreeNode(4);
    root2.right.right = new TreeNode(5);
    System.out.println(solution.isCompleteTree(root2)); // false
}
```

**不同解法的选择建议**
1. 面试推荐：层序遍历法（直观易懂）
2. 空间优化：双指针层序遍历
3. 理论验证：节点索引法（理解完全二叉树本质特性）

**常见误区提醒**
1. 注意只有右孩子没有左孩子的情况
2. 最后一层节点必须靠左排列
3. 空树属于完全二叉树


## 判断平衡二叉树

**题目描述**

给定一个二叉树的根节点 `root`，判断该树是否是平衡二叉树。

**平衡二叉树定义**：
1. 空树是平衡二叉树
2. 左右子树高度差不超过1
3. 左右子树也都是平衡二叉树

**示例**
```
输入：
    3
   / \
  9  20
    /  \
   15   7
输出：true

输入：
       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
输出：false
```

---

**解法1：自顶向下递归**

**思路**
1. 计算当前节点左右子树高度
2. 检查高度差是否≤1
3. 递归检查左右子树

**关键点**
- 存在重复计算高度的问题
- 代码简单直观但效率较低

```java
class Solution {
    public boolean isBalanced(TreeNode root) {
        if (root == null) return true;
        
        int leftHeight = height(root.left);
        int rightHeight = height(root.right);
        
        return Math.abs(leftHeight - rightHeight) <= 1 
               && isBalanced(root.left) 
               && isBalanced(root.right);
    }
    
    private int height(TreeNode node) {
        if (node == null) return 0;
        return Math.max(height(node.left), height(node.right)) + 1;
    }
}
```

**复杂度分析**
- 时间复杂度：O(n²)，最坏情况（链表状）每个节点被重复计算
- 空间复杂度：O(n)，递归栈空间

---

**解法2：自底向上递归（优化）**

**思路**
1. 后序遍历计算高度
2. 检查子树平衡性时直接返回高度或-1（不平衡标志）
3. 遇到不平衡立即终止递归

**优化点**
- 每个节点只计算一次高度
- 提前终止不平衡情况的检测

```java
class Solution {
    public boolean isBalanced(TreeNode root) {
        return checkHeight(root) != -1;
    }
    
    private int checkHeight(TreeNode node) {
        if (node == null) return 0;
        
        int left = checkHeight(node.left);
        if (left == -1) return -1;
        
        int right = checkHeight(node.right);
        if (right == -1) return -1;
        
        if (Math.abs(left - right) > 1) return -1;
        
        return Math.max(left, right) + 1;
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)，每个节点只访问一次
- 空间复杂度：O(n)，递归栈空间

---

**解法3：迭代法（栈实现）**

**思路**
1. 使用后序遍历迭代模板
2. 维护节点高度映射表
3. 检查每个子树平衡性

**特点**
- 避免递归栈溢出风险
- 需要额外存储空间

```java
import java.util.*;

class Solution {
    public boolean isBalanced(TreeNode root) {
        if (root == null) return true;
        
        Map<TreeNode, Integer> heightMap = new HashMap<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        heightMap.put(null, 0);
        
        while (!stack.isEmpty()) {
            TreeNode node = stack.peek();
            
            if ((node.left == null || heightMap.containsKey(node.left)) &&
                (node.right == null || heightMap.containsKey(node.right))) {
                stack.pop();
                int left = heightMap.get(node.left);
                int right = heightMap.get(node.right);
                if (Math.abs(left - right) > 1) return false;
                heightMap.put(node, Math.max(left, right) + 1);
            } else {
                if (node.right != null) stack.push(node.right);
                if (node.left != null) stack.push(node.left);
            }
        }
        return true;
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)
- 空间复杂度：O(n)，栈和哈希表开销

---

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 测试用例1：平衡二叉树
    TreeNode root1 = new TreeNode(3);
    root1.left = new TreeNode(9);
    root1.right = new TreeNode(20);
    root1.right.left = new TreeNode(15);
    root1.right.right = new TreeNode(7);
    System.out.println(solution.isBalanced(root1)); // true
    
    // 测试用例2：非平衡二叉树
    TreeNode root2 = new TreeNode(1);
    root2.left = new TreeNode(2);
    root2.right = new TreeNode(2);
    root2.left.left = new TreeNode(3);
    root2.left.right = new TreeNode(3);
    root2.left.left.left = new TreeNode(4);
    root2.left.left.right = new TreeNode(4);
    System.out.println(solution.isBalanced(root2)); // false
}
```

**不同解法的选择建议**
1. 面试推荐：自底向上递归（最优解法）
2. 理解原理：自顶向下递归（直观但效率低）
3. 特殊需求：迭代法（避免递归栈溢出）

**常见误区提醒**
1. 注意空树属于平衡二叉树
2. 需要同时满足高度差条件和子树平衡条件
3. 高度计算应从叶子节点开始（高度为1）


## 判断二叉搜索树

**题目描述**

给定一个二叉树的根节点 `root`，判断该树是否是有效的二叉搜索树(BST)。

**二叉搜索树定义**：
1. 节点的左子树只包含小于当前节点的数
2. 节点的右子树只包含大于当前节点的数
3. 所有左子树和右子树自身也必须是二叉搜索树

**示例**
```
输入：
    2
   / \
  1   3
输出：true

输入：
    5
   / \
  1   4
     / \
    3   6
输出：false
解释：根节点的值为5，右子树中的节点4小于5
```

---

**解法1：递归中序遍历**

**思路**
利用BST中序遍历有序的特性：
1. 中序遍历时记录前驱节点值
2. 检查当前节点是否大于前驱节点

**关键点**
- 使用类变量保存前驱值
- 注意处理Integer.MIN_VALUE边界情况

```java
class Solution {
    private Integer prev = null;
    
    public boolean isValidBST(TreeNode root) {
        if (root == null) return true;
        
        // 检查左子树
        if (!isValidBST(root.left)) return false;
        
        // 检查当前节点
        if (prev != null && root.val <= prev) return false;
        prev = root.val;
        
        // 检查右子树
        return isValidBST(root.right);
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)
- 空间复杂度：O(h)，递归栈空间

---

**解法2：迭代中序遍历**

**思路**
使用显式栈实现中序遍历：
1. 沿着左子树深度优先压栈
2. 弹出节点时检查顺序性
3. 转向右子树继续处理

**优化点**
- 避免递归栈溢出
- 发现不符合立即返回

```java
import java.util.*;

class Solution {
    public boolean isValidBST(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        Integer prev = null;
        
        while (!stack.isEmpty() || root != null) {
            while (root != null) {
                stack.push(root);
                root = root.left;
            }
            root = stack.pop();
            if (prev != null && root.val <= prev) return false;
            prev = root.val;
            root = root.right;
        }
        return true;
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)
- 空间复杂度：O(h)

---

**解法3：上下界递归**

**思路**
为每个节点维护值范围：
1. 根节点范围(-∞, +∞)
2. 左子树范围(-∞, 父节点值)
3. 右子树范围(父节点值, +∞)

**特点**
- 无需中序遍历
- 边遍历边验证

```java
class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }
    
    private boolean validate(TreeNode node, Integer low, Integer high) {
        if (node == null) return true;
        if ((low != null && node.val <= low) || 
            (high != null && node.val >= high)) {
            return false;
        }
        return validate(node.left, low, node.val) && 
               validate(node.right, node.val, high);
    }
}
```

**复杂度分析**
- 时间复杂度：O(n)
- 空间复杂度：O(h)

---

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 测试用例1：有效BST
    TreeNode root1 = new TreeNode(2);
    root1.left = new TreeNode(1);
    root1.right = new TreeNode(3);
    System.out.println(solution.isValidBST(root1)); // true
    
    // 测试用例2：无效BST
    TreeNode root2 = new TreeNode(5);
    root2.left = new TreeNode(1);
    root2.right = new TreeNode(4);
    root2.right.left = new TreeNode(3);
    root2.right.right = new TreeNode(6);
    System.out.println(solution.isValidBST(root2)); // false
    
    // 测试用例3：边界值测试
    TreeNode root3 = new TreeNode(Integer.MIN_VALUE);
    root3.right = new TreeNode(Integer.MAX_VALUE);
    System.out.println(solution.isValidBST(root3)); // true
}
```

**不同解法的选择建议**
1. 面试推荐：上下界递归（直观体现BST定义）
2. 效率优先：迭代中序遍历（避免递归开销）
3. 理解原理：递归中序遍历（经典方法）

**常见误区提醒**
1. 不能仅比较节点与直接子节点
2. 注意处理相等的边界情况
3. 考虑整数边界值(Integer.MIN_VALUE/MAX_VALUE)
