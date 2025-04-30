## 求二叉树最下层数值之和
求二叉树最下层数值之和

示例：

1

2 3

4 5 6

数值之和就是 4+5+6=15

# 解法

使用层序遍历，计算出最下层数值之和。

```java
import java.util.LinkedList;
import java.util.Queue;

public class BinaryTree {
    
    private class TreeNode {
        TreeNode left;
        TreeNode right;
        int val;

        public TreeNode() {}

        public TreeNode(int val) {
            this.val = val;
        }
    }

    public int deepestLeavesSum(TreeNode root) {
        if (root == null) {
            return 0;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int levelSum = 0;

        while (!queue.isEmpty()) {
            int levelSize = queue.size(); // 当前层的节点数
            levelSum = 0; // 初始化当前层的和

            for (int i = 0; i < levelSize; i++) {
                TreeNode currentNode = queue.poll();
                levelSum += currentNode.val; // 将当前节点的值加到层和中

                if (currentNode.left != null) {
                    queue.offer(currentNode.left); // 将左子节点加入队列
                }
                if (currentNode.right != null) {
                    queue.offer(currentNode.right); // 将右子节点加入队列
                }
            }
        }

        return levelSum; // 队列为空时，levelSum包含的是最底层的节点和
    }

    // 示例代码以展示如何使用
    public static void main(String[] args) {
        BinaryTree bt = new BinaryTree();
        TreeNode root = bt.new TreeNode(1);
        root.left = bt.new TreeNode(2);
        root.right = bt.new TreeNode(3);
        root.left.left = bt.new TreeNode(4);
        root.left.right = bt.new TreeNode(5);
        root.right.right = bt.new TreeNode(6);
        root.left.left.left = bt.new TreeNode(7);
        root.right.right.right = bt.new TreeNode(8);

        int sum = bt.deepestLeavesSum(root);
        System.out.println("Sum of deepest leaves: " + sum);  // 应输出 15 (7 + 8)
    }
}

```

## 二叉树的镜像
# 题目描述

操作给定的二叉树，将其变换为源二叉树的镜像。

例如：源二叉树

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1690192063816-e5843f59-82fd-4a1f-8631-f9c3fe6da292.png)

镜像二叉树

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1690192078751-25635e66-2e9c-4c97-8b02-0153227a796f.png)

# 解法1

比较简单的方法是使用递归算法，递归就是把大型复杂的问题层层转化为一个与原问题相似的小问题来求解。而二叉树的左右子树都可以看成一颗完整的树，对整个二叉树的遍历可以分解成对每颗子树的遍历，非常适合递归。

二叉树的镜像，可以分解成左右子树相互交换。

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树所有节点。

空间复杂度：O(n)。申请了额外的空间存储二叉树节点。

```java
public class Solution {

    // 二叉树镜像，使用递归实现
    public TreeNode Mirror(TreeNode pRoot) {
        // 判空
        if (pRoot == null) {
            return null;
        }
        // 先递归子树
        TreeNode left = Mirror(pRoot.left);
        TreeNode right = Mirror(pRoot.right);
        // 交换左右子树
        pRoot.left = right;
        pRoot.right = left;
        return pRoot;
    }

}
```

# 解法2

使用非递归算法实现二叉树的镜像，需要存储二叉树节点，可以使用栈、队列或者 List 集合存储，下面演示使用栈存储。

实现思路：

1. 把根节点压入栈中
2. 循环弹出栈顶节点，再把当前节点的左右子树压入栈，最后交换当前节点的左右子树。

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树所有节点。

空间复杂度：O(n)。申请了额外的空间存储二叉树节点。

```java
import java.util.Stack;

public class Solution {

    // 二叉树镜像，使用栈实现
    public TreeNode Mirror(TreeNode pRoot) {
        // 判空
        if (pRoot == null) {
            return null;
        }
        // 使用栈存储二叉树节点
        Stack<TreeNode> stack = new Stack<>();
        // 把根节点压入栈
        stack.push(pRoot);
        while (!stack.isEmpty()) {
            // 弹出栈顶节点
            TreeNode node = stack.pop();
            // 把当前节点的左右子树压入栈
            if (node.left != null) {
                stack.push(node.left);
            }
            if (node.right != null) {
                stack.push(node.right);
            }
            // 交换当前节点的左右子树
            TreeNode temp = node.left;
            node.left = node.right;
            node.right = temp;
        }
        return pRoot;
    }

}
```

## 合并二叉树
# 题目描述

已知两颗二叉树，将它们合并成一颗二叉树。合并规则是：都存在的结点，就将结点值加起来，否则空的位置就由另一个树的结点来代替。

例如：

第一棵树：

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1690187989302-0fed9663-1b6d-4b7a-b818-93b64f17bd43.png)

第二棵树：

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1690187997243-65dca040-964d-455f-9fb2-01a4b12e98bf.png)

合并后的树：

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1690188032073-a6ff74be-9753-423d-8dca-79439d5fa244.png)

# 解法

比较简单的方法是使用递归算法，递归就是把大型复杂的问题层层转化为一个与原问题相似的小问题来求解。而二叉树的左右子树都可以看成一颗完整的树，对整个二叉树的遍历可以分解成对每颗子树的遍历，非常适合递归。

合并两个二叉树，就是同时遍历两个二叉树，分别把根节点相加、左右子节点相加，然后递归遍历即可。

实现思路：

1. 如果一个节点为空就返回另一个节点，如果都为空也是返回空。
2. 新建一棵树，节点值是两棵树的节点值之和，左右节点也是两棵树的左右节点值之和。
3. 然后递归遍历左右子树

**复杂度分析：**

时间复杂度：O(min(m,n))。只需遍历节点数较少的树，一棵树遍历完成，另一棵树自然拼接上了。

空间复杂度：O(m+n)。申请了额外的空间存储所有节点。

```java
public class Solution {

    // 合并二叉树，使用递归实现
    public TreeNode mergeTrees(TreeNode t1, TreeNode t2) {
        // 如果一个节点为空就返回另一个节点，如果都为空也是返回空。
        if (t1 == null) {
            return t2;
        }
        if (t2 == null) {
            return t1;
        }
        // 新建一棵树，节点值为两棵树的节点值之和
        TreeNode node = new TreeNode(t1.val + t2.val);
        //递归左右子树
        node.left = mergeTrees(t1.left, t2.left);
        node.right = mergeTrees(t1.right, t2.right);
        return node;
    }

}
```

# 解法2

使用非递归算法合并两颗二叉树，可以使用层序遍历两颗二叉树，把每层的节点相加即可。存储每层节点可以使用栈、队列或者 List 集合，以下演示使用队列实现。

实现思路：

1. 新建一个队列，用来存储合并后每层节点，把合并后的根节点加入到队列中。
2. 再新建两个队列，分别用来存储两颗二叉树的每层节点，把两个根节点分别加入两个队列中。
3. 循环遍历两个队列，计算合并后节点的左右子节点。

**复杂度分析：**

时间复杂度：O(min(m,n))。只需遍历节点数较少的树，一棵树遍历完成，另一棵树自然拼接上了。

空间复杂度：O(m+n)。申请了额外的空间存储所有节点。

```java
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    // 合并二叉树，使用队列实现
    public TreeNode mergeTrees(TreeNode t1, TreeNode t2) {
        // 如果一个节点为空就返回另一个节点，如果都为空也是返回空。
        if (t1 == null) {
            return t2;
        }
        if (t2 == null) {
            return t1;
        }
        // 新建一棵树，节点值为两棵树的节点值之和
        TreeNode head = new TreeNode(t1.val + t2.val);
        // 用来存储合并后的每层节点
        Queue<TreeNode> queue = new LinkedList<>();
        // 分别存储两棵树的每层节点
        Queue<TreeNode> q1 = new LinkedList<>();
        Queue<TreeNode> q2 = new LinkedList<>();
        queue.offer(head);
        q1.offer(t1);
        q2.offer(t2);
        while (!q1.isEmpty() && !q2.isEmpty()) {
            // 取出合并后的节点，并计算左右子节点
            TreeNode node = queue.poll();
            TreeNode node1 = q1.poll();
            TreeNode node2 = q2.poll();
            TreeNode left1 = node1.left;
            TreeNode left2 = node2.left;
            TreeNode right1 = node1.right;
            TreeNode right2 = node2.right;
            // 计算左节点
            if (left1 != null || left2 != null) {
                // 如果一棵树的节点为空，直接使用另一棵树的节点
                if (left1 == null) {
                    node.left = left2;
                } else if (left2 == null) {
                    node.left = left1;
                } else {
                    // 两棵树的节点都不为空，则新建一个节点并求和
                    TreeNode left = new TreeNode(left1.val + left2.val);
                    node.left = left;
                    // 把下层节点加入队列
                    queue.offer(left);
                    q1.offer(left1);
                    q2.offer(left2);
                }
            }

            // 计算右节点
            if (right1 != null || right2 != null) {
                // 如果一棵树的节点为空，直接使用另一棵树的节点
                if (right1 == null) {
                    node.right = right2;
                } else if (right2 == null) {
                    node.right = right1;
                } else {
                    // 两棵树的节点都不为空，则新建一个节点并求和
                    TreeNode right = new TreeNode(right1.val + right2.val);
                    node.right = right;
                    // 把下层节点加入队列
                    queue.offer(right);
                    q1.offer(right1);
                    q2.offer(right2);
                }
            }
        }
        return head;
    }

}
```

## 满二叉树
## 题目描述

判断一个二叉树是不是满二叉树。

满二叉树定义：一个二叉树，如果每一个层的结点数都达到最大值，则这个二叉树就是满二叉树。也就是说，如果一个二叉树的层数为K，且结点总数是(2^k) -1 ，则它就是满二叉树。

![](https://cdn.nlark.com/yuque/0/2024/png/12651402/1716274768989-5146be0b-b499-4bd6-99b0-d5f1a01c8702.png)

## 解法1

使用递归判断左右子树是不是满二叉树。

```java
public class FullBinaryTreeChecker {

    // Definition for a binary tree node.
    public static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode(int x) { val = x; }
    }

    public static boolean isFullBinaryTree(TreeNode root) {
        if (root == null) {
            return true;
        }

        // 左右子树都为null（是叶子节点），满足要求
        if (root.left == null && root.right == null) {
            return true;
        }

        if (root.left != null && root.right != null) {
            // 递归遍历左右子树
            return isFullBinaryTree(root.left) && isFullBinaryTree(root.right);
        }

        // 有一个子树为null，则不满足
        return false;
    }

    public static void main(String[] args) {
        // Example 1: A full binary tree
        TreeNode root1 = new TreeNode(1);
        root1.left = new TreeNode(2);
        root1.right = new TreeNode(3);
        root1.left.left = new TreeNode(4);
        root1.left.right = new TreeNode(5);
        root1.right.left = new TreeNode(6);
        root1.right.right = new TreeNode(7);

        System.out.println("Is the first tree a full binary tree? " + isFullBinaryTree(root1));  // Should be true

        // Example 2: Not a full binary tree
        TreeNode root2 = new TreeNode(1);
        root2.left = new TreeNode(2);
        root2.right = new TreeNode(3);
        root2.left.left = new TreeNode(4);

        System.out.println("Is the second tree a full binary tree? " + isFullBinaryTree(root2));  // Should be false
    }
}

```

## 解法2

使用层序遍历，判断左右子树是否都存在。

```java
import java.util.LinkedList;
import java.util.Queue;

public class FullBinaryTreeChecker {

    public static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode(int x) { val = x; }
    }

    public static boolean isFullBinaryTree(TreeNode root) {
        if (root == null) return true; // 空树视为满二叉树

        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);

        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();

            if (node.left != null && node.right != null) {
                // 如果当前节点有两个子节点，将它们加入队列
                queue.add(node.left);
                queue.add(node.right);
            } else if (node.left != null || node.right != null) {
                // 如果当前节点只有一个子节点，说明不是满二叉树
                return false;
            }
            // 如果当前节点没有子节点，循环继续，但不做操作
        }

        return true;
    }

    public static void main(String[] args) {
        // Example 1: A full binary tree
        TreeNode root1 = new TreeNode(1);
        root1.left = new TreeNode(2);
        root1.right = new TreeNode(3);
        root1.left.left = new TreeNode(4);
        root1.left.right = new TreeNode(5);
        root1.right.left = new TreeNode(6);
        root1.right.right = new TreeNode(7);

        System.out.println("Is the first tree a full binary tree? " + isFullBinaryTree(root1));  // Should be true

        // Example 2: Not a full binary tree
        TreeNode root2 = new TreeNode(1);
        root2.left = new TreeNode(2);
        root2.right = new TreeNode(3);
        root2.left.left = new TreeNode(4);

        System.out.println("Is the second tree a full binary tree? " + isFullBinaryTree(root2));  // Should be false
    }
}

```

## 对称的二叉树
# 题目描述

给定一棵二叉树，判断其是否是自身的镜像（即：是否对称）

例如：下面这棵二叉树是对称的

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1690169510354-b37dd909-9419-4492-9a9c-f2e3e58dcbf2.png)

下面这颗二叉树不是对称的。

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1690169545952-4e1735a8-79f8-47ff-96cc-8da90c32f3dd.png)

# 解法1

比较简单的方法是使用递归算法，递归就是把大型复杂的问题层层转化为一个与原问题相似的小问题来求解。而二叉树的左右子树都可以看成一颗完整的树，对整个二叉树的遍历可以分解成对每颗子树的遍历，非常适合递归。

判断整个二叉树是否对称，可以分解成比较左右子树是否对称。

**复杂度分析：**

时间复杂度：O(n)。最坏的情况需要遍历二叉树所有节点。

空间复杂度：O(1)。常数的空间。

```java
public class Solution {

    // 判断二叉树是否对称，使用递归实现
    public boolean isSymmetrical (TreeNode pRoot) {
        // 空树是对称的
        if (pRoot == null) {
            return true;
        }
        // 递归比较左右子树是否对称
        return recursion(pRoot.right, pRoot.left);
    }

    // 递归比较左右子树是否对称
    boolean recursion(TreeNode root1, TreeNode root2) {
        // 当左右子树都为空，是对称的
        if (root1 == null && root2 == null) {
            return true;
        }
        // 只有一个为空或者节点值不同，是不对称
        if (root1 == null || root2 == null || root1.val != root2.val) {
            return false;
        }
        // 每层对应的节点进入递归比较
        return recursion(root1.left, root2.right) && recursion(root1.right, root2.left);
    }

}
```

# 解法2

如果使用非递归算法，可以参考层序遍历，只需判断每层节点是否是回文数即可。存储每层节点可以使用栈、队列或者集合等数据结构，下面演示使用 LinkedList 实现，因为 LinkedList 方便在头尾节点进行操作。

实现思路：

1. 把根节点的左右子树添加到 LinkedList 集合中
2. 取出 LinkedList 集合的头尾节点，比较是否相等
3. 把取出的两个节点左右子树按照顺序分别添加到 LinkedList 集合中
4. 循环第二、三步集合

**复杂度分析：**

时间复杂度：O(n)。最坏的情况需要遍历二叉树所有节点。

空间复杂度：O(n)。申请了额外的空间存储二叉树节点。

```java
import java.util.LinkedList;

public class Solution {

    // 判断二叉树是否对称，使用LinkedList实现
    public boolean isSymmetrical(TreeNode pRoot) {
        // 空树是对称的
        if (pRoot == null) {
            return true;
        }
        // 把左右子树添加到集合中
        LinkedList<TreeNode> list = new LinkedList<>();
        list.add(pRoot.left);
        list.add(pRoot.right);
        while (!list.isEmpty()) {
            // 循环比较集合中的头尾节点是否相等
            for (int i = 0; i <= list.size() / 2; i++) {
                TreeNode left = list.pollFirst();
                TreeNode right = list.pollLast();
                if (left == null && right == null) {
                    continue;
                }
                if (left == null || right == null || left.val != right.val) {
                    return false;
                }
                // 把左右子树按顺序继续添加到头尾节点
                list.addFirst(left.right);
                list.addLast(right.left);
                list.addFirst(left.left);
                list.addLast(right.right);
            }
        }
        // 全部校验通过
        return true;
    }

}
```

## 二叉搜索树的最近公共祖先
# 题目描述

给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。

**注意：**

1. 对于该题的最近的公共祖先定义:对于有根树T的两个节点p、q，最近公共祖先LCA(T,p,q)表示一个节点x，满足x是p和q的祖先且x的深度尽可能大。在这里，一个节点也可以是它自己的祖先.
2. 二叉搜索树是若它的左子树不空，则左子树上所有节点的值均小于它的根节点的值； 若它的右子树不空，则右子树上所有节点的值均大于它的根节点的值
3. 所有节点的值都是唯一的。
4. p、q 为不同节点且均存在于给定的二叉搜索树中。

如果给定以下搜索二叉树: {7,1,12,0,4,11,14,#,#,3,5}，如下图:

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1690271772218-bdb08bc4-5c27-4e14-b1e3-ab87c1849de4.png)

示例1：

> 输入：{7,1,12,0,4,11,14,#,#,3,5},1,12
>
> 返回值：7
>
> 说明：节点1 和 节点12的最近公共祖先是7

示例2：

> 输入：{7,1,12,0,4,11,14,#,#,3,5},12,11
>
> 返回值：12
>
> 说明：因为一个节点也可以是它自己的祖先。所以输出12

# 解法1

简单的办法就是，比较两个节点的遍历路径，找到最近的公共祖先。

由于二叉搜索树是有序的，就是根节点值大于左子节点，小于右子节点，左右子树也是二叉搜索树。利用这个特性，查找目标节点就比较简单了。

题目中定义了所有节点值都是唯一的，并且两个目标节点一定存在于二叉搜索树中，所以计算遍历路径的逻辑也比较简单。

**实现思路：**

1. 计算两个目标节点在二叉搜索树中的遍历路径
2. 比较两个路径，找到最近的公共祖先

**复杂度分析：**

时间复杂度：O(n)。最坏的情况需要遍历二叉树所有节点。

空间复杂度：O(n)。申请了额外的空间存储二叉树节点。

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {

    // 二叉搜索树的最近公共祖先，使用比较搜索路径
    public int lowestCommonAncestor(TreeNode root, int p, int q) {
        // 使用List存储根节点到目标节点的搜索路径
        List<Integer> pPath = getPath(root, p);
        List<Integer> qPath = getPath(root, q);
        int result = 0;
        //比较两个路径，找到第一个不同的点
        for (int i = 0; i < pPath.size() && i < qPath.size(); i++) {
            // 如果节点值不相等，说明已经找到最近公共祖先，直接退出循环
            if (!pPath.get(i).equals(qPath.get(i))) {
                break;
            }
            // 更新最近的公共祖先节点
            result = pPath.get(i);
        }
        return result;
    }

    // 计算根节点到目标节点的路径
    public List<Integer> getPath(TreeNode root, int target) {
        List<Integer> path = new ArrayList<>();
        TreeNode node = root;
        // 循环比较，直到找到目标节点
        while (node.val != target) {
            path.add(node.val);
            // 如果目标值小于当前节点值，说明目标节点在左侧
            if (target < node.val) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        // 把目标节点也添加到路径中
        path.add(node.val);
        return path;
    }

}
```

# 解法2

比较简单的方法是使用递归算法，递归就是把大型复杂的问题层层转化为一个与原问题相似的小问题来求解。而二叉树的左右子树都可以看成一颗完整的树，对整个二叉树的遍历可以分解成对每颗子树的遍历，非常适合递归。

**实现思路：**

1. 遍历二叉树，比较 p、q 节点与当前节点的值。
2. 如果 p、q 节点值都大于当前节点的值，说明目标值在右子树，开始递归遍历右子树。
3. 如果 p、q 节点值都小于当前节点的值，说明目标值在左子树，开始递归遍历左子树。
4. 如果当前节点的值在 p、q 节点值中间，说明当前节点就是我们要找的目标节点。

**复杂度分析：**

时间复杂度：O(n)。最坏的情况需要遍历二叉树所有节点。

空间复杂度：O(n)。申请了额外的空间存储二叉树节点。

```java
public class Solution {

    // 二叉搜索树的最近公共祖先，使用递归实现
    public int lowestCommonAncestor(TreeNode root, int p, int q) {
        // pq都在当前节点的右边，进入右子树
        if ((p > root.val && q > root.val)) {
            return lowestCommonAncestor(root.right, p, q);
        } else if (p < root.val && q < root.val) {
            // pq都在当前节点的右边，进入左子树
            return lowestCommonAncestor(root.left, p, q);
        } else {
            // 当前节点在pq节点中间，返回当前节点
            return root.val;
        }
    }

}
```

## 二叉树和为某一值的路径
# 题目描述

给定一个二叉树 root 和一个值 sum ，判断是否有从根节点到叶子节点的节点值之和等于 sum 的路径。

1. 该题路径定义为从树的根结点开始往下一直到叶子结点所经过的结点
2. 叶子节点是指没有子节点的节点
3. 路径只能从父节点到子节点，不能从子节点到父节点

示例：

给出如下的二叉树， sum = 22，

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1690164885947-c25b951b-e197-4b08-9d01-aba0af9caec2.png)

返回true，因为存在一条路径 5 -> 4 -> 11 -> 2 的节点值之和为 22。

# 解法1

比较简单的方法是使用递归算法，递归就是把大型复杂的问题层层转化为一个与原问题相似的小问题来求解。而二叉树的左右子树都可以看成一颗完整的树，对整个二叉树的遍历可以分解成对每颗子树的遍历，非常适合递归。

计算二叉树的路径之和，可以分解成计算左右子树的路径之和。

**复杂度分析：**

时间复杂度：O(n)。最差的情况需要遍历二叉树所有节点。

空间复杂度：O(1)。常数的空间。

```java
public class Solution {

    // 计算二叉树是否存在和为某一值的路径，使用递归实现
    public boolean hasPathSum(TreeNode root, int sum) {
        // 判空
        if (root == null) {
            return false;
        }
        // 遍历到叶子节点且找到和为sum的路径
        if (root.left == null && root.right == null && root.val == sum) {
            return true;
        }
        // 递归遍历左右子树
        return hasPathSum(root.left, sum - root.val) ||
                hasPathSum(root.right, sum - root.val);
    }

}
```

# 解法2

如果采用非递归算法的话，可以使用层序遍历，从上向下遍历，不断累加走过的路径的节点值，直到走到叶子节点的时候，判断走过路径的节点值之和是否等于目标值。

由于不是严格的层序遍历，不要求每层节点的遍历顺序，所以存储每层节点的时候，可以使用栈、队列或者 List 集合，以下演示使用栈结构存储每层节点。

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树所有节点。

空间复杂度：O(n)。申请了额外的空间存储二叉树节点。

```java
import java.util.Stack;

public class Solution {

    // 计算二叉树是否存在和为某一值的路径，使用递归实现
    public boolean hasPathSum(TreeNode root, int sum) {
        // 判空
        if (root == null) {
            return false;
        }
        // 使用栈存储每层节点
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode treeNode = stack.pop();
            // 遍历到叶子节点且找到和为sum的路径
            if (treeNode.left == null && treeNode.right == null && treeNode.val == sum) {
                return true;
            }
            // 计算路径之和，并把左右子节点压入栈
            if (treeNode.left != null) {
                treeNode.left.val += treeNode.val;
                stack.push(treeNode.left);
            }
            if (treeNode.right != null) {
                treeNode.right.val += treeNode.val;
                stack.push(treeNode.right);
            }
        }
        // 遍历完成，没有找到符合要求的路径
        return false;
    }

}
```

## 二叉树的最大深度
# 题目描述

求给定二叉树的最大深度，

注意：深度是指树的根节点到任一叶子节点路径上节点的数量。最大深度是所有叶子节点的深度的最大值。

# 解法1

比较简单的方法是使用递归算法，递归就是把大型复杂的问题层层转化为一个与原问题相似的小问题来求解。而二叉树的左右子树都可以看成一颗完整的树，对整个二叉树的遍历可以分解成对每颗子树的遍历，非常适合递归。

实现思路：

1. 判断当前节点是否为空，如果不为空则树的深度加一，否则返回0。
2. 递归计算左右子树的深度。
3. 计算左右子树的最大深度

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树的所有结点。

空间复杂度：O(1)。常量的空间。

```java
public class Solution {
    // 计算二叉树的最大深度，使用递归
    public int maxDepth(TreeNode root) {
        // 判断是否是空节点
        if (root == null) {
            return 0;
        }
        // 递归计算左右子树的最大深度，每遍历一层，深度加一
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }
}
```

# 解法2

既然是统计树的最大深度，可以使用层序遍历，层序遍历会遍历树的每一层。在层序遍历的基础上，额外统计一下层数就可以了。

层序遍历通常使用队列实现，实现思路如下：

1. 把根节点加入队列中
2. 判断队列是否为空，如果不为空，就把当前节点的左右子节点也加入队列中，层数加一。
3. 循环第二步

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树的所有结点。

空间复杂度：O(1)。常量的空间。

```java
import java.util.ArrayDeque;
import java.util.Queue;

public class Solution {

    // 计算二叉树的最大深度，使用层序遍历
    public int maxDepth(TreeNode root) {
        // 判空
        if (root == null) {
            return 0;
        }
        // 记录最大深度
        int depth = 0;
        // 使用队列存储每层需要遍历的节点
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            // 拉取队列中所有元素，并遍历
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode current = queue.poll();
                // 把左右子树加入队列，用于下层遍历
                if (current.left != null) {
                    queue.add(current.left);
                }
                if (current.right != null) {
                    queue.add(current.right);
                }
            }
            // 层数加一
            depth++;
        }
        return depth;
    }

}
```

## 二叉树之字形遍历
# 引言

二叉树的遍历共分为三种，分别是：前序遍历、中序遍历、后序遍历。

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1689910129415-14430732-7698-41b9-83a4-18a6ed76d19b.png)

前中后的遍历顺序，是相对于根节点来说的。

1. 前序遍历（又叫先序遍历、根序遍历）
    1. 先遍历根节点
    2. 再遍历左子树
    3. 再遍历右子树

访问顺序是 A -> B -> D -> E -> C -> F -> G

2. 中序遍历
    1. 先遍历左子树
    2. 再遍历根节点
    3. 再遍历右子树

访问顺序是 D -> B -> E -> A -> F -> C -> G

3. 后序遍历
    1. 先遍历左子树
    2. 再遍历右子树
    3. 再遍历根节点

访问顺序是 D -> E -> B -> F -> G -> C -> A

还有一种是层序遍历，就是逐层遍历，访问顺序是 A  -> B -> C -> D -> E -> F -> G

还有一种是之字形遍历，也是层序遍历，只不过要将偶数层逆序遍历，访问顺序是 A -> C -> B -> D -> E -> F -> G

# 题目描述

给定二叉树的根节点 root ，返回它节点值的之字形遍历结果。

# 解法1

使用**队列**结构可以实现层序遍历的效果，使用队列的原因是队列支持**先进先出**，并且支持**拉取功能**（查看并删除），当然使用其他数据结构，比如 List 也能实现类似的功能，只不过更麻烦一些。

之字形遍历是层序遍历的变形，在层序遍历的基础上增加了奇偶层的判断，奇数层从左向右遍历，偶数层从右向左遍历。实现也非常简单，把层序遍历的代码稍微改动一下就可以了。

实现思路：

1. 把根节点放入队列中
2. 判断队列是否还有剩余元素，如果有，就从队列中拉取所有元素并遍历，并把该元素的左右子树加入队列中。如果当前层是偶数层，就反转本层的遍历结果。
3. 循环第二步

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树的所有结点。

空间复杂度：O(n)。申请了额外空间存储二叉树节点。

```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Queue;

public class Solution {

    // 二叉树的之字形遍历，使用队列实现
    public ArrayList<ArrayList<Integer>> Print(TreeNode pRoot) {
        // 使用ArrayList存储遍历结果
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        // 判空
        if (pRoot == null) {
            return result;
        }
        // 使用队列存储每层需要遍历的节点
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.offer(pRoot);
        // 标识是否是偶数层
        boolean evenFlag = false;
        while (!queue.isEmpty()) {
            // 使用row记录当前层的遍历结果
            ArrayList<Integer> row = new ArrayList<>();
            //因先进入的是根节点，故每层节点多少，队列大小就是多少
            // 拉取队列中所有元素，并遍历
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode current = queue.poll();
                row.add(current.val);
                //若是左右孩子存在，则存入左右孩子作为下一个层次
                if (current.left != null) {
                    queue.offer(current.left);
                }
                if (current.right != null) {
                    queue.offer(current.right);
                }
            }
            // 偶数层反转
            if (evenFlag) {
                Collections.reverse(row);
            }
            // 奇偶层转换
            evenFlag = !evenFlag;
            // 记录当前层的遍历结果
            result.add(row);
        }
        return result;
    }

}
```

# 解法2

使用栈结构也能实现之字形遍历，原理跟解法1类似，最终的效果就是实现奇数层正序遍历，偶数层倒序遍历。

实现思路：

1. 创建两个栈，分别是奇数层栈和偶数层栈。
2. 把根节点压入奇数层栈中
3. 判断两个栈中是否还有剩余元素，弹出并遍历奇数层栈，把左右子节点按照正序压入偶数层栈。弹出并遍历偶数层栈，把左右子节点按照倒序压入奇数层栈。
4. 循环第二步

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树的所有结点。

空间复杂度：O(n)。申请了额外空间存储二叉树节点。

```java
import java.util.ArrayList;
import java.util.Stack;

public class Solution {

    // 二叉树的之字形遍历，使用栈实现
    public ArrayList<ArrayList<Integer>> Print(TreeNode pRoot) {
        // 使用ArrayList存储遍历结果
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        // 判空
        if (pRoot == null) {
            return result;
        }
        Stack<TreeNode> oddStack = new Stack<>();
        Stack<TreeNode> evenStack = new Stack<>();
        //放入第一次
        oddStack.push(pRoot);
        while (!oddStack.isEmpty() || !evenStack.isEmpty()) {
            // 使用row记录当前层的遍历结果
            ArrayList<Integer> row = new ArrayList<>();
            // 遍历奇数层
            while (!oddStack.isEmpty()) {
                TreeNode node = oddStack.pop();
                // 存储遍历结果
                row.add(node.val);
                // 奇数层的子节点按逆序加入偶数层，等待下层遍历
                if (node.left != null) {
                    evenStack.push(node.left);
                }
                if (node.right != null) {
                    evenStack.push(node.right);
                }
            }
            // 存储本层的遍历结果
            if (row.size() != 0) {
                result.add(new ArrayList<>(row));
                // 清空本层数据
                row.clear();
            }
            // 遍历偶数层
            while (!evenStack.isEmpty()) {
                TreeNode node = evenStack.pop();
                // 存储遍历结果
                row.add(node.val);
                // 偶数层的子节点按正序加入奇数层，等待下层遍历
                if (node.right != null) {
                    oddStack.push(node.right);
                }
                if (node.left != null) {
                    oddStack.push(node.left);
                }
            }
            // 存储本层的遍历结果
            if (row.size() != 0) {
                result.add(row);
            }
        }
        return result;
    }

}
```

## 二叉树的层序遍历
# 引言

二叉树的遍历共分为三种，分别是：前序遍历、中序遍历、后序遍历。

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1689910129415-14430732-7698-41b9-83a4-18a6ed76d19b.png)

前中后的遍历顺序，是相对于根节点来说的。

1. 前序遍历（又叫先序遍历、根序遍历）
    1. 先遍历根节点
    2. 再遍历左子树
    3. 再遍历右子树

访问顺序是 A -> B -> D -> E -> C -> F -> G

2. 中序遍历
    1. 先遍历左子树
    2. 再遍历根节点
    3. 再遍历右子树

访问顺序是 D -> B -> E -> A -> F -> C -> G

3. 后序遍历
    1. 先遍历左子树
    2. 再遍历右子树
    3. 再遍历根节点

访问顺序是 D -> E -> B -> F -> G -> C -> A

还有一种是层序遍历，就是逐层遍历，访问顺序是 A  -> B -> C -> D -> E -> F -> G

还有一种是之字形遍历，也是层序遍历，只不过要将偶数层逆序遍历，访问顺序是 A -> C -> B D -> E -> F -> G

# 题目描述

给定二叉树的根节点 root ，返回它节点值的层序遍历结果。

# 解法1

比较简单的方法是使用递归算法，递归就是把大型复杂的问题层层转化为一个与原问题相似的小问题来求解。而二叉树的左右子树都可以看成一颗完整的树，对整个二叉树的遍历可以分解成对每颗子树的遍历，非常适合递归。

层序遍历的顺序是，从上到下依次遍历每层的节点。

实现思路：

1. 创建一个 List 集合，把访问的节点放到 List 集合。
2. 先从左子树开始递归遍历
3. 然后递归遍历右子树
4. 最后遍历根节点（或者父节点）

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树的所有结点。

空间复杂度：O(n)。申请了额外空间存储二叉树节点。

```java
import java.util.ArrayList;

public class Solution {

    // 二叉树的层序遍历，使用递归实现
    public ArrayList<ArrayList<Integer>> levelOrder(TreeNode root) {
        // 使用ArrayList存储遍历结果
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        // 判空
        if (root == null) {
            return result;
        }
        // 递归层次遍历
        traverse(root, 1, result);
        return result;
    }

    // 递归遍历
    void traverse(TreeNode root, int depth, ArrayList<ArrayList<Integer>> result) {
        if (root == null) {
            return;
        }
        // 遍历到新的一层，申请额外的存储集合
        if (depth > result.size()) {
            result.add(new ArrayList<>());
        }
        // 获取当前层的存储集合
        ArrayList<Integer> row = result.get(depth - 1);
        row.add(root.val);
        // 递归左右子树
        traverse(root.left, depth + 1, result);
        traverse(root.right, depth + 1, result);
    }

}
```

# 解法2

使用**队列**结构可以实现层序遍历的效果，使用队列的原因是队列支持**先进先出**，并且支持**拉取功能**（查看并删除），当然使用其他数据结构，比如 List 也能实现类似的功能，只不过更麻烦一些。

实现思路：

1. 把根节点放入队列中
2. 判断队列是否还有剩余元素，如果有，就从队列中拉取所有元素并遍历，并把该元素的左右子树加入队列中。
3. 循环第二步

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树的所有结点。

空间复杂度：O(n)。申请了额外空间存储二叉树节点。

```java
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Queue;

public class Solution {

    // 二叉树的层序遍历，使用队列实现
    public ArrayList<ArrayList<Integer>> levelOrder(TreeNode root) {
        // 使用ArrayList存储遍历结果
        ArrayList<ArrayList<Integer>> result = new ArrayList<>();
        // 判空
        if (root == null) {
            return result;
        }
        // 使用Queue存储每层需要遍历的节点
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            // 使用row记录当前层的遍历结果
            ArrayList<Integer> row = new ArrayList<>();
            // 拉取队列中所有元素，并遍历
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode current = queue.poll();
                row.add(current.val);
                // 把左右子树加入队列，用于下层遍历
                if (current.left != null) {
                    queue.add(current.left);
                }
                if (current.right != null) {
                    queue.add(current.right);
                }
            }
            // 记录当前层的遍历结果
            result.add(row);
        }
        return result;
    }

}
```

## 二叉树的后序遍历
# 引言

二叉树的遍历共分为三种，分别是：前序遍历、中序遍历、后序遍历。

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1689910129415-14430732-7698-41b9-83a4-18a6ed76d19b.png)

前中后的遍历顺序，是相对于根节点来说的。

1. 前序遍历（又叫先序遍历、根序遍历）
    1. 先遍历根节点
    2. 再遍历左子树
    3. 再遍历右子树

访问顺序是 A -> B -> D -> E -> C -> F -> G

2. 中序遍历
    1. 先遍历左子树
    2. 再遍历根节点
    3. 再遍历右子树

访问顺序是 D -> B -> E -> A -> F -> C -> G

3. 后序遍历
    1. 先遍历左子树
    2. 再遍历右子树
    3. 再遍历根节点

访问顺序是 D -> E -> B -> F -> G -> C -> A

还有一种是层序遍历，就是逐层遍历，访问顺序是 A  -> B -> C -> D -> E -> F -> G

还有一种是之字形遍历，也是层序遍历，只不过要将偶数层逆序遍历，访问顺序是 A -> C -> B D -> E -> F -> G

# 题目描述

给定二叉树的根节点 root ，返回它节点值的后序遍历结果。

# 解法1

比较简单的方法是使用递归算法，后序遍历的顺序是：

1. 先遍历左子树
2. 再遍历右子树
3. 再遍历根节点

实现思路：

1. 创建一个 List 集合，把访问的节点放到 List 集合。
2. 先从左子树开始递归遍历
3. 然后递归遍历右子树
4. 最后遍历根节点（或者父节点）

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树的所有结点。

空间复杂度：O(n)。申请了额外空间存储二叉树节点。

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {

    // 二叉树的后序遍历
    public int[] postorderTraversal(TreeNode root) {
        // 创建List集合，存储遍历结果
        List<Integer> list = new ArrayList<>();
        // 递归前序遍历
        postorder(list, root);
        // 遍历结果转换数组返回
        int[] result = new int[list.size()];
        for (int i = 0; i < list.size(); i++) {
            result[i] = list.get(i);
        }
        return result;
    }

    // 递归遍历
    public void postorder(List<Integer> list, TreeNode root) {
        // 遇到空节点就返回
        if (root == null) {
            return;
        }
        // 先遍历左子树
        postorder(list, root.left);
        // 然后遍历右子树
        postorder(list, root.right);
        // 最后遍历根节点
        list.add(root.val);
    }

}
```

# 解法2

使用 栈 结构也能实现前序遍历的效果，实现思路：

1. 从上到下，把所有左子树压入栈
2. 弹出栈顶元素，开始遍历左子树叶子节点
3. 开始遍历右子树，直到右子树遍历完成
4. 最后遍历根节点（也是父节点）

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树的所有结点。

空间复杂度：O(n)。申请了额外空间存储二叉树节点。

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class Solution {

    // 二叉树的后序遍历，使用栈结构
    public int[] postorderTraversal(TreeNode root) {
        // 使用list集合存储遍历结果
        List<Integer> list = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode pre = null;
        // 根节点先入栈
        while (root != null || !stack.isEmpty()) {
            // 从上到下，把左子树都压入栈
            while (root != null) {
                stack.push(root);
                root = root.left;
            }
            // 遍历栈顶节点
            TreeNode node = stack.pop();
            //如果该元素的右边没有或是已经访问过
            if (node.right == null || node.right == pre) {
                //访问中间的节点
                list.add(node.val);
                //且记录为访问过了
                pre = node;
            } else {
                //该节点入栈
                stack.push(node);
                //先访问右边
                root = node.right;
            }
        }
        // 遍历结果转换数组返回
        int[] res = new int[list.size()];
        for (int i = 0; i < list.size(); i++) {
            res[i] = list.get(i);
        }
        return res;
    }

}
```

## 二叉树的中序遍历
# 引言

二叉树的遍历共分为三种，分别是：前序遍历、中序遍历、后序遍历。

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1689910129415-14430732-7698-41b9-83a4-18a6ed76d19b.png)

前中后的遍历顺序，是相对于根节点来说的。

1. 前序遍历（又叫先序遍历、根序遍历）
    1. 先遍历根节点
    2. 再遍历左子树
    3. 再遍历右子树

访问顺序是 A -> B -> D -> E -> C -> F -> G

2. 中序遍历
    1. 先遍历左子树
    2. 再遍历根节点
    3. 再遍历右子树

访问顺序是 D -> B -> E -> A -> F -> C -> G

3. 后序遍历
    1. 先遍历左子树
    2. 再遍历右子树
    3. 再遍历根节点

访问顺序是 D -> E -> B -> F -> G -> C -> A

还有一种是层序遍历，就是逐层遍历，访问顺序是 A  -> B -> C -> D -> E -> F -> G

还有一种是之字形遍历，也是层序遍历，只不过要将偶数层逆序遍历，访问顺序是 A -> C -> B D -> E -> F -> G

# 题目描述

给定二叉树的根节点 root ，返回它节点值的中序遍历结果。

# 解法1

比较简单的方法是使用递归算法，中序遍历的顺序是：

1. 先遍历左子树
2. 再遍历根节点
3. 再遍历右子树

实现思路：

1. 创建一个 List 集合，把访问的节点放到 List 集合。
2. 先从左子树开始递归遍历
3. 然后遍历根节点（或者父节点）
4. 最后递归遍历右子树

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树的所有结点。

空间复杂度：O(n)。申请了额外空间存储二叉树节点。

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {

    // 二叉树的中序遍历
    public int[] inorderTraversal(TreeNode root) {
        // 创建List集合，存储遍历结果
        List<Integer> list = new ArrayList<>();
        // 递归前序遍历
        inorder(list, root);
        // 遍历结果转换数组返回
        int[] result = new int[list.size()];
        for (int i = 0; i < list.size(); i++) {
            result[i] = list.get(i);
        }
        return result;
    }

    // 递归遍历
    public void inorder(List<Integer> list, TreeNode root) {
        // 遇到空节点就返回
        if (root == null) {
            return;
        }
        // 先遍历左子树
        inorder(list, root.left);
        // 再遍历根节点
        list.add(root.val);
        // 最后遍历右子树
        inorder(list, root.right);
    }

}
```

# 解法2

使用 栈 结构也能实现前序遍历的效果，实现思路：

1. 从上到下，把所有左子树压入栈
2. 弹出栈顶元素，开始遍历左子树叶子节点
3. 继续弹出栈顶元素，开始遍历父节点
4. 最后遍历右子树，循环前三步操作

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树的所有结点。

空间复杂度：O(n)。申请了额外空间存储二叉树节点。

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class Solution {

    // 二叉树的中序遍历，使用栈结构
    public int[] preorderTraversal(TreeNode root) {
        // 使用list集合存储遍历结果
        List<Integer> list = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        // 根节点先入栈
        while (root != null || !stack.isEmpty()) {
            // 从上到下，把左子树都压入栈
            while (root != null) {
                stack.push(root);
                root = root.left;
            }
            // 遍历栈顶节点
            TreeNode node = stack.pop();
            list.add(node.val);
            // 开始遍历右子树
            root = node.right;
        }
        // 遍历结果转换数组返回
        int[] res = new int[list.size()];
        for (int i = 0; i < list.size(); i++) {
            res[i] = list.get(i);
        }
        return res;
    }

}
```

## 二叉树的前序遍历
# 引言

二叉树的遍历共分为三种，分别是：前序遍历、中序遍历、后序遍历。

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1689910129415-14430732-7698-41b9-83a4-18a6ed76d19b.png)

前中后的遍历顺序，是相对于根节点来说的。

1. 前序遍历（又叫先序遍历、根序遍历）
    1. 先遍历根节点
    2. 再遍历左子树
    3. 再遍历右子树

访问顺序是 A -> B -> D -> E -> C -> F -> G

2. 中序遍历
    1. 先遍历左子树
    2. 再遍历根节点
    3. 再遍历右子树

访问顺序是 D -> B -> E -> A -> F -> C -> G

3. 后序遍历
    1. 先遍历左子树
    2. 再遍历右子树
    3. 再遍历根节点

访问顺序是 D -> E -> B -> F -> G -> C -> A

还有一种是层序遍历，就是逐层遍历，访问顺序是 A  -> B -> C -> D -> E -> F -> G

还有一种是之字形遍历，也是层序遍历，只不过要将偶数层逆序遍历，访问顺序是 A -> C -> B D -> E -> F -> G

# 题目描述

给定二叉树的根节点 root ，返回它节点值的 前序 遍历。

# 解法1

比较简单的方法是使用递归算法，前序遍历的顺序是：

1. 先遍历根节点
2. 再遍历左子树
3. 再遍历右子树

实现思路：

1. 创建一个 List 集合，把访问的节点放到 List 集合。
2. 先遍历根节点
3. 再遍历左子树，如果左子树下面还有左子树，就继续向下遍历，直到遍历到叶子节点，然后返回。
4. 返回父节点后，继续遍历右子树，同理进行递归遍历。

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树的所有结点。

空间复杂度：O(n)。申请了额外空间存储二叉树节点。

```java
// 二叉树的前序遍历
public int[] preorderTraversal(TreeNode root) {
    // 创建List集合，存储遍历结果
    List<Integer> list = new ArrayList<>();
    // 递归前序遍历
    preorder(list, root);
    // 遍历结果转换数组返回
    int[] result = new int[list.size()];
    for (int i = 0; i < list.size(); i++) {
        result[i] = list.get(i);
    }
    return result;
}

// 递归遍历
public void preorder(List<Integer> list, TreeNode root) {
    // 遇到空节点就返回
    if (root == null) {
        return;
    }
    // 先遍历根节点
    list.add(root.val);
    // 再遍历左子树
    preorder(list, root.left);
    // 最后遍历右子树
    preorder(list, root.right);
}
```

# 解法2

使用 栈 结构也能实现前序遍历的效果，实现思路：

1. 把根节点（或者父节点）压入栈顶
2. 弹出栈顶，遍历当前节点，再依次把右子树和左子树压入栈顶。
3. 循环第二步，也就是实现了依次遍历父节点、左子树、右子树的效果。

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树的所有结点。

空间复杂度：O(n)。申请了额外空间存储二叉树节点。

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class Solution {

    // 二叉树的前序遍历，使用栈结构
    public int[] preorderTraversal(TreeNode root) {
        // 判空
        if (root == null) {
            return null;
        }
        // 使用list集合存储遍历结果
        List<Integer> list = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        // 根节点先入栈
        stack.push(root);
        while (!stack.isEmpty()) {
            // 先遍历栈顶元素
            TreeNode node = stack.pop();
            list.add(node.val);
            // 把右子树压入栈
            if (node.right != null) {
                stack.push(node.right);
            }
            // 把左子树压入栈
            if (node.left != null) {
                stack.push(node.left);
            }
        }
        // 遍历结果转换数组返回
        int[] res = new int[list.size()];
        for (int i = 0; i < list.size(); i++) {
            res[i] = list.get(i);
        }
        return res;
    }

}
```

## 判断是不是完全二叉树
# 题目描述

给定一个二叉树，确定他是否是一个完全二叉树。

**完全二叉树的定义：**若二叉树的深度为 h，除第 h 层外，其它各层的结点数都达到最大个数，第 h 层所有的叶子结点都连续集中在最左边，这就是完全二叉树。（第 h 层可能包含 [1~2h] 个节点）

例如：下面的树是完全二叉树，因为第一层和第二层节点达到最大个数，第三层叶子节点集中在左边。

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1690255947049-1761f4da-8f52-44fd-ac1b-7dfee2dd8810.png)

# 解法

基于完全二叉树的特性，我们可以使用层序遍历，从上向下，从左向右，遍历二叉树，只需判断节点是否集中在最左边。我们使用队列存储二叉树节点，因为队列的特性是先进先出，适合从上向下，从左向右遍历。

实现思路：

1. 创建一个队列，把根节点放入队列中。
2. 循环从队列获取节点，如果节点为空，就标识第一次遇到空节点。如果之前已经出现过空节点，再出现非空节点，说明不是完全二叉树。
3. 把当前节点的左右子树放入队列，不管左右子树是否为空。

```java
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    // 判断是不是完全二叉树，使用队列实现
    public boolean isCompleteTree(TreeNode root) {
        // 空树是完全二叉树
        if (root == null) {
            return true;
        }
        // 使用队列存储每层节点
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        // 标识是否出现空节点
        boolean emptyNode = false;
        TreeNode current;
        while (!queue.isEmpty()) {
            current = queue.poll();
            // 标识第一次遇到空节点
            if (current == null) {
                emptyNode = true;
                continue;
            }
            // 如果出现空节点之后，又遇到非空节点，说明不是完全二叉树
            if (emptyNode) {
                return false;
            }
            // 把左右子节点放入队列，留作下层遍历
            queue.offer(current.left);
            queue.offer(current.right);
        }
        return true;
    }

}
```

## 判断是不是平衡二叉树
# 题目描述

给定二叉树，判断该二叉树是否是平衡二叉树。

平衡二叉树（Balanced Binary Tree），具有以下性质：它是一棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。

# 解法1

比较简单的方法是使用递归算法，递归就是把大型复杂的问题层层转化为一个与原问题相似的小问题来求解。而二叉树的左右子树都可以看成一颗完整的树，对整个二叉树的遍历可以分解成对每颗子树的遍历，非常适合递归。

判断整个二叉树是否是平衡二叉树，可以分解成判断左右子树是否是平衡二叉树，可以递归计算左右子树的高度差是否超过1。

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树所有节点。

空间复杂度：O(1)。常量的空间。

```java
public class Solution {

    // 判断是不是平衡二叉树，使用递归实现
    public boolean IsBalanced_Solution(TreeNode pRoot) {
        // 空树是平衡二叉树
        if (pRoot == null) {
            return true;
        }
        // 递归计算左右子树的高度
        int left = deep(pRoot.left);
        int right = deep(pRoot.right);
        // 判断左右子树的高度差是否大于一
        if (left - right > 1 || left - right < -1) {
            return false;
        }
        // 递归判断左右子树是否是平衡二叉树
        return IsBalanced_Solution(pRoot.left) && IsBalanced_Solution(pRoot.right);
    }

    // 递归计算二叉树高度
    public int deep(TreeNode root) {
        // 空节点高度为0
        if (root == null) {
            return 0;
        }
        // 递归算左右子树的高度
        int left = deep(root.left);
        int right = deep(root.right);
        // 计算子树最大高度，并加上父节点
        return (left > right) ? left + 1 : right + 1;
    }

}
```

# 解法2

解法1是从上向下遍历，先计算根节点的左右子树的高度差，判断是否是平衡二叉树。再计算根节点的左子树的左右子树的高度差，判断是否是平衡二叉树。再计算根节点的右子树的左右子树的高度差，判断是否是平衡二叉树。导致每个节点的高度重复计算了多次，有没有办法优化一下，让每个节点的高度只计算一次，计算父节点高度的时候，复用子节点的高度。

我们可以从下向上遍历，先计算叶子节点的高度，再计算叶子节点的父节点的高度，计算父节点高度的时候复用子节点的高度。遍历到不满足要求的子树的时候，也可以提前退出。

实现思路：

1. 判断空树是平衡二叉树，直接返回
2. 使用递归，从下向上，计算每个节点左右子树的高度差，先计算最左边的叶子节点。
3. 如果高度差大于一，说明不是平衡二叉树，直接返回 -1 结束，不再遍历其他子树。

**复杂度分析：**

时间复杂度：O(n)。最坏的情况需要遍历二叉树所有节点。

空间复杂度：O(1)。常量的空间。

```java
public class Solution {

    // 判断是不是平衡二叉树，使用递归实现
    public boolean IsBalanced_Solution(TreeNode pRoot) {
        // 空树是平衡二叉树
        if (pRoot == null) {
            return true;
        }
        // 递归判断是否是平衡二叉树
        return getDepth(pRoot) != -1;
    }

    // 从下向上，递归判断是否是平衡二叉树
    public int getDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        // 使用递归从下向上计算左子树的高度
        int left = getDepth(root.left);
        // 如果不是平衡二叉树，直接退出
        if (left < 0) {
            return -1;
        }
        // 计算右子树的高度
        int right = getDepth(root.right);
        // 如果不是平衡二叉树，直接退出
        if (right < 0) {
            return -1;
        }
        // 计算左右子树高度差
        return Math.abs(left - right) > 1 ? -1 : Math.max(left, right) + 1;
    }

}
```

## 判断是不是二叉搜索树
# 题目描述

给定一个二叉树根节点，请你判断这棵树是不是二叉搜索树。

二叉搜索树满足每个节点的左子树上的所有节点均小于当前节点且右子树上的所有节点均大于当前节点。

例如：下面的树是二叉搜索树

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1690201232242-edcdc802-2545-409d-9d78-e74430dce3f9.png)

因为根节点的值是2，大于左子树的节点值1，小于右子树的节点值3。

# 解法1

比较简单的方法是使用递归算法，递归就是把大型复杂的问题层层转化为一个与原问题相似的小问题来求解。而二叉树的左右子树都可以看成一颗完整的树，对整个二叉树的遍历可以分解成对每颗子树的遍历，非常适合递归。

二叉搜索树就是左子节点、父节点、右子节点的值，顺序递增，相当于每个子树中序遍历的结果顺序递增，可以使用递归算法实现中序遍历，判断二叉搜索树。

实现思路：

1. 中序遍历，先遍历到左子树的叶子节点
2. 比较左子树节点值与父节点值大小
3. 更新左子树的最大值
4. 最后遍历右子树

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树所有节点。

空间复杂度：O(1)。常量的空间。

```java
public class Solution {

    // 记录左子树的最大值
    int maxLeftValue = Integer.MIN_VALUE;

    // 判断是不是二叉搜索树，使用递归实现
    public boolean isValidBST(TreeNode root) {
        if (root == null) {
            return true;
        }
        // 中序遍历，先遍历左子树
        if (!isValidBST(root.left)) {
            return false;
        }
        // 比较父节点与左子树大小
        if (root.val < maxLeftValue) {
            return false;
        }
        // 更新左子树的最大值
        maxLeftValue = root.val;
        // 最后遍历右子树
        return isValidBST(root.right);
    }

}

```

# 解法2

如果不使用递归算法的话，可以使用栈存储即将遍历的左子树节点，用来辅助实现中序遍历，然后再使用 List 集合存储中序遍历的结果。

实现思路：

1. 把二叉树的左节点都压入栈
2. 弹出栈顶节点，从叶子节点开始弹出，把当前节点放入 List 集合中
3. 然后遍历二叉树的叶子节点
4. 最后判断 List 集合的中序遍历结果是否有序

**复杂度分析：**

时间复杂度：O(n)。需要遍历二叉树所有节点。

空间复杂度：O(1)。申请了额外的空间存储二叉树节点。

```java
import java.util.ArrayList;
import java.util.Stack;

public class Solution {

    // 判断是不是二叉搜索树，使用栈实现
    public boolean isValidBST(TreeNode root) {
        // 使用栈存储即将遍历的节点
        Stack<TreeNode> stack = new Stack<>();
        TreeNode node = root;
        // 使用List存储中序遍历的结果
        ArrayList<Integer> list = new ArrayList<>();
        while (node != null || !stack.isEmpty()) {
            // 把所有左节点压入栈
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            // 从叶子节点开始出栈
            node = stack.pop();
            // 存储中序遍历的结果
            list.add(node.val);
            // 遍历完左节点和父节点，最后遍历右节点
            node = node.right;
        }
        // 判断中序遍历结果是否有序
        for (int i = 0; i < list.size() - 1; i++) {
            //一旦有降序，则不是搜索树
            if (list.get(i) > list.get(i + 1)) {
                return false;
            }
        }
        return true;
    }

}
```

