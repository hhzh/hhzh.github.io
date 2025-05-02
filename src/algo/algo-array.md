## 二分查找算法详解

**题目描述**

```markdown
在一个无重复元素的升序整型数组中查找目标值，返回其索引，若不存在则返回-1

示例：
输入：nums = [0,1,3,4,6,7,9], target = 6
输出：5
解释：数字6在数组中的索引为5

要求：
1. 数组必须是有序且无重复的
2. 时间复杂度必须为O(log n)
```

### 解题思路

```markdown
二分查找核心思想：
1. 利用数组有序特性，每次比较可排除一半元素
2. 维护搜索区间的左右边界
3. 通过中点比较决定搜索方向
```

### 关键步骤

```markdown
1. 初始化左右指针
2. 循环条件：left <= right
3. 计算中点：防止溢出的写法 mid = left + (right - left)/2
4. 三种情况处理：
   - 找到目标：直接返回索引
   - 目标较小：搜索左半区
   - 目标较大：搜索右半区
5. 循环结束：返回-1表示未找到
```

## 标准实现

```java
public class BinarySearch {
    public int search(int[] nums, int target) {
        // 边界检查
        if (nums == null || nums.length == 0) {
            return -1;
        }
        
        int left = 0;
        int right = nums.length - 1;
        
        while (left <= right) {
            // 防止整数溢出
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(log n) - 每次迭代将搜索范围减半
空间复杂度：O(1) - 仅使用常数空间
```

## 变体实现：递归版本

```java
public class BinarySearchRecursive {
    public int search(int[] nums, int target) {
        return binarySearch(nums, target, 0, nums.length - 1);
    }
    
    private int binarySearch(int[] nums, int target, int left, int right) {
        if (left > right) {
            return -1;
        }
        
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            return binarySearch(nums, target, mid + 1, right);
        } else {
            return binarySearch(nums, target, left, mid - 1);
        }
    }
}
```

**递归版本特点**
```markdown
优点：代码更直观，符合算法描述
缺点：递归调用栈消耗额外空间
```

### 边界情况测试

```java
public static void main(String[] args) {
    BinarySearch bs = new BinarySearch();
    
    // 标准测试
    int[] nums1 = {0,1,3,4,6,7,9};
    System.out.println(bs.search(nums1, 6)); // 5
    
    // 边界测试
    int[] nums2 = {5};
    System.out.println(bs.search(nums2, 5)); // 0
    System.out.println(bs.search(nums2, 2)); // -1
    
    // 空数组测试
    int[] nums3 = {};
    System.out.println(bs.search(nums3, 1)); // -1
    
    // 性能测试
    int[] largeArray = new int[1000000];
    for (int i = 0; i < largeArray.length; i++) {
        largeArray[i] = i;
    }
    System.out.println(bs.search(largeArray, 999999)); // 999999
}
```

### 常见问题解答

**Q1：为什么循环条件是 left <= right？**
```markdown
当left == right时，区间仍有一个元素需要检查
```

**Q2：为什么mid计算要写成 left + (right - left)/2？**
```markdown
防止(left + right)可能导致的整数溢出
```

**Q3：如何修改代码处理有重复元素的情况？**
```markdown
找到目标后继续向左/右搜索可找到第一个/最后一个出现位置
```

### 算法可视化

```
初始数组：[0,1,3,4,6,7,9], target=6

第1轮：left=0, right=6, mid=3 (值4)
       4 < 6 → left=4

第2轮：left=4, right=6, mid=5 (值7)
       7 > 6 → right=4

第3轮：left=4, right=4, mid=4 (值6)
       找到目标，返回4
```

### 实际应用场景

```markdown
1. 数据库索引查找
2. 游戏中的分数排名系统
3. 大型系统的配置查找
4. 科学计算中的数值查找
```

**扩展思考**：
1. 如何实现查找第一个大于等于目标的元素？
2. 如何在旋转有序数组中实现二分查找？
3. 如何利用二分查找求平方根？

## 盛水最多的容器

**题目描述**
```markdown
给定表示高度的数组，找出两条线使其与x轴构成的容器能装最多水
示例：
[1,8,6,2,5,4,8,3,7] → 49
```

### 解法1：双指针法（最优解）
**核心思路**
```markdown
1. 初始化左右指针在数组两端
2. 计算当前容量并更新最大值
3. 移动较短边的指针向内收缩
```

**实现代码**
```java
class Solution {
    public int maxArea(int[] height) {
        int max = 0;
        int left = 0, right = height.length - 1;
        
        while (left < right) {
            int area = Math.min(height[left], height[right]) * (right - left);
            max = Math.max(max, area);
            
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return max;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 单次遍历
空间复杂度: O(1) - 常量空间
```

### 解法2：暴力枚举（不推荐）
**核心思路**
```markdown
枚举所有可能的容器组合
```

**实现代码**
```java
class Solution {
    public int maxArea(int[] height) {
        int max = 0;
        for (int i = 0; i < height.length; i++) {
            for (int j = i + 1; j < height.length; j++) {
                int area = Math.min(height[i], height[j]) * (j - i);
                max = Math.max(max, area);
            }
        }
        return max;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n^2) - 双重循环
空间复杂度: O(1)
```

### 解法3：动态规划（教学用）
**核心思路**
```markdown
1. dp[i][j]表示i到j的最大容量
2. 状态转移：max(当前容量，子问题解)
```

**实现代码**
```java
class Solution {
    public int maxArea(int[] height) {
        int n = height.length;
        int[][] dp = new int[n][n];
        
        for (int i = n-1; i >= 0; i--) {
            for (int j = i+1; j < n; j++) {
                int curr = Math.min(height[i], height[j]) * (j-i);
                dp[i][j] = Math.max(curr, Math.max(dp[i+1][j], dp[i][j-1]));
            }
        }
        return dp[0][n-1];
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n^2) - 填表
空间复杂度: O(n^2) - DP表
```

### 解法对比
| 维度       | 双指针法 | 暴力枚举 | 动态规划 |
|------------|---------|----------|----------|
| 时间复杂度 | O(n)    | O(n^2)   | O(n^2)   |
| 空间复杂度 | O(1)    | O(1)     | O(n^2)   |
| 适用场景   | 最优解  | 教学演示 | 理解DP   |
| 推荐指数   | ★★★★★  | ★        | ★★       |

**补充说明**
1. 双指针法是该问题的最优解
2. 暴力法仅用于理解问题本质
3. 动态规划展示问题分解思路

以下是优化后的两数相加问题的多解法版本：

---
## 两数相加（链表逆序存储）

**题目描述**
```markdown
给定两个非空链表，表示两个非负整数（逆序存储）
返回表示两数之和的新链表
示例：
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
解释：342 + 465 = 807
```

### 解法1：模拟加法（迭代）
**核心思路**
```markdown
1. 同时遍历两个链表
2. 逐位相加并处理进位
3. 创建新节点存储当前位结果
```

**实现代码**
```java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;
        
        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;
            if (l1 != null) {
                sum += l1.val;
                l1 = l1.next;
            }
            if (l2 != null) {
                sum += l2.val;
                l2 = l2.next;
            }
            
            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
        }
        
        return dummy.next;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(max(m,n)) - 较长链表的长度
空间复杂度: O(max(m,n)) - 结果链表长度
```

### 解法2：递归实现
**核心思路**
```markdown
1. 递归处理每位相加
2. 将进位传递到下一层递归
3. 合并子问题结果
```

**实现代码**
```java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        return helper(l1, l2, 0);
    }
    
    private ListNode helper(ListNode l1, ListNode l2, int carry) {
        if (l1 == null && l2 == null && carry == 0) {
            return null;
        }
        
        int sum = carry;
        if (l1 != null) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2 != null) {
            sum += l2.val;
            l2 = l2.next;
        }
        
        ListNode node = new ListNode(sum % 10);
        node.next = helper(l1, l2, sum / 10);
        return node;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(max(m,n))
空间复杂度: O(max(m,n)) - 递归栈深度
```

### 解法3：原地修改（空间优化）
**核心思路**
```markdown
1. 复用较长的链表存储结果
2. 减少新节点创建
3. 注意最后可能的进位
```

**实现代码**
```java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode p1 = l1, p2 = l2;
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;
        
        while (p1 != null || p2 != null) {
            if (p1 != null && p2 != null) {
                int sum = p1.val + p2.val + carry;
                p1.val = sum % 10;
                carry = sum / 10;
                curr.next = p1;
                p1 = p1.next;
                p2 = p2.next;
            } else if (p1 != null) {
                int sum = p1.val + carry;
                p1.val = sum % 10;
                carry = sum / 10;
                curr.next = p1;
                p1 = p1.next;
            } else {
                int sum = p2.val + carry;
                p2.val = sum % 10;
                carry = sum / 10;
                curr.next = p2;
                p2 = p2.next;
            }
            curr = curr.next;
        }
        
        if (carry > 0) {
            curr.next = new ListNode(carry);
        }
        
        return dummy.next;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(max(m,n))
空间复杂度: O(1) - 原地修改
```

### 解法对比
| 维度       | 迭代法 | 递归法 | 原地修改法 |
|------------|--------|--------|------------|
| 时间复杂度 | O(n)   | O(n)   | O(n)       |
| 空间复杂度 | O(n)   | O(n)   | O(1)       |
| 代码简洁性 | 优秀   | 优秀   | 中等       |
| 推荐指数   | ★★★★★ | ★★★★   | ★★★★       |

**补充说明**
1. 迭代法是面试最佳选择，清晰高效
2. 递归法展示分治思想
3. 原地修改法适合内存敏感场景

以下是优化后的旋转数组找最小值问题的多解法版本：

---
## 旋转数组的最小数字

**题目描述**
```markdown
在旋转有序数组（如[3,4,5,1,2]）中找出最小元素
要求时间复杂度优于O(n)
示例：
[3,4,5,1,2] → 1
[2,2,2,0,1] → 0
```

### 解法1：二分查找（标准版）
**核心思路**
```markdown
1. 通过比较中间元素与右边界元素
2. 分三种情况调整搜索区间
3. 处理重复元素特殊情况
```

**实现代码**
```java
class Solution {
    public int minNumberInRotateArray(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else if (nums[mid] < nums[right]) {
                right = mid;
            } else {
                right--;  // 处理重复元素
            }
        }
        return nums[left];
    }
}
```

**复杂度分析**
```markdown
时间复杂度: 平均O(logn)，最坏O(n)（全重复元素）
空间复杂度: O(1)
```

### 解法2：二分查找（提前终止）
**核心思路**
```markdown
1. 增加有序数组提前判断
2. 减少不必要的二分过程
```

**实现代码**
```java
class Solution {
    public int minNumberInRotateArray(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            if (nums[left] < nums[right]) {
                return nums[left];  // 提前终止
            }
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else if (nums[mid] < nums[right]) {
                right = mid;
            } else {
                right--;
            }
        }
        return nums[left];
    }
}
```

**复杂度分析**
```markdown
时间复杂度: 最优O(1)，平均O(logn)
空间复杂度: O(1)
```

### 解法3：遍历法（基准解法）
**核心思路**
```markdown
1. 顺序查找第一个下降点
2. 无下降点则返回首元素
```

**实现代码**
```java
class Solution {
    public int minNumberInRotateArray(int[] nums) {
        for (int i = 0; i < nums.length - 1; i++) {
            if (nums[i] > nums[i+1]) {
                return nums[i+1];
            }
        }
        return nums[0];
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n)
空间复杂度: O(1)
```

### 解法对比
| 维度       | 标准二分法 | 优化二分法 | 遍历法 |
|------------|-----------|------------|--------|
| 时间复杂度 | O(logn)   | O(1)-O(logn)| O(n)   |
| 空间复杂度 | O(1)      | O(1)       | O(1)   |
| 适用场景   | 通用      | 部分有序   | 小数据 |
| 推荐指数   | ★★★★★    | ★★★★      | ★★     |

**补充说明**
1. 二分法是最优解法，推荐面试使用
2. 优化版在部分有序时效率更高
3. 遍历法适合数据量小的场景

以下是优化后的摆动排序问题的多解法版本：

---
## 摆动排序

**题目描述**
```markdown
将无序数组重新排列成摆动序列：
形式1：nums[0] <= nums[1] >= nums[2] <= nums[3]...
形式2：nums[0] < nums[1] > nums[2] < nums[3]...
```

### 解法1：排序+穿插（形式2）
**核心思路**
```markdown
1. 先排序数组
2. 将数组分为前后两半
3. 从后半和前半交替取元素
```

**实现代码**
```java
class Solution {
    public void wiggleSort(int[] nums) {
        int[] temp = nums.clone();
        Arrays.sort(temp);
        int n = nums.length;
        int left = (n - 1) / 2, right = n - 1;
        
        for (int i = 0; i < n; i++) {
            nums[i] = (i % 2 == 0) ? temp[left--] : temp[right--];
        }
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(nlogn) - 排序
空间复杂度: O(n) - 临时数组
```

### 解法2：一次遍历交换（形式1）
**核心思路**
```markdown
1. 遍历数组
2. 根据奇偶位置调整相邻元素
3. 不满足条件时交换
```

**实现代码**
```java
class Solution {
    public void wiggleSort(int[] nums) {
        for (int i = 0; i < nums.length - 1; i++) {
            if ((i % 2 == 0 && nums[i] > nums[i + 1]) ||
                (i % 2 == 1 && nums[i] < nums[i + 1])) {
                swap(nums, i, i + 1);
            }
        }
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 单次遍历
空间复杂度: O(1) - 原地交换
```

### 解法3：快速选择+虚拟索引（形式2优化）
**核心思路**
```markdown
1. 使用快速选择找到中位数
2. 三路分区重新排列
3. 虚拟索引实现穿插
```

**实现代码**
```java
class Solution {
    public void wiggleSort(int[] nums) {
        int n = nums.length;
        int median = findKthLargest(nums, (n + 1) / 2);
        
        int left = 0, i = 0, right = n - 1;
        while (i <= right) {
            int mappedIdx = getMappedIndex(i, n);
            if (nums[mappedIdx] > median) {
                swap(nums, getMappedIndex(left++, n), mappedIdx);
                i++;
            } else if (nums[mappedIdx] < median) {
                swap(nums, mappedIdx, getMappedIndex(right--, n));
            } else {
                i++;
            }
        }
    }
    
    private int getMappedIndex(int idx, int n) {
        return (1 + 2 * idx) % (n | 1);
    }
    
    private int findKthLargest(int[] nums, int k) {
        // 实现快速选择算法
        // ...
    }
}
```

**复杂度分析**
```markdown
时间复杂度: 平均O(n)，最坏O(n^2)
空间复杂度: O(1) - 原地操作
```

### 解法对比
| 维度       | 排序+穿插 | 遍历交换 | 快速选择 |
|------------|----------|----------|----------|
| 时间复杂度 | O(nlogn) | O(n)     | O(n)     |
| 空间复杂度 | O(n)     | O(1)     | O(1)     |
| 适用形式   | 形式2    | 形式1    | 形式2    |
| 推荐指数   | ★★★★     | ★★★★★   | ★★★★     |

**补充说明**
1. 遍历交换法是最简单高效的解法，推荐面试使用
2. 排序法思路直观，适合教学演示
3. 快速选择法适合对空间有严格要求的场景

以下是优化后的搜索旋转排序数组问题的多解法版本：

---
## 搜索旋转排序数组

**题目描述**
```markdown
在旋转后的有序数组中搜索目标值，返回其索引
要求时间复杂度O(logn)
示例：
输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
```

### 解法1：标准二分查找
**核心思路**
```markdown
1. 通过比较中点与右端点判断有序区间
2. 根据目标值与有序区间的关系调整搜索范围
3. 处理边界条件
```

**实现代码**
```java
class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            
            // 判断哪半边是有序的
            if (nums[mid] <= nums[right]) { // 右半有序
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            } else { // 左半有序
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
        }
        return -1;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(logn)
空间复杂度: O(1)
```

### 解法2：两次二分查找
**核心思路**
```markdown
1. 先找到旋转点（最小值位置）
2. 根据目标值确定搜索区间
3. 在选定区间进行标准二分查找
```

**实现代码**
```java
class Solution {
    public int search(int[] nums, int target) {
        // 1. 找旋转点（最小值）
        int n = nums.length;
        int left = 0, right = n - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        int pivot = left;
        
        // 2. 确定搜索区间
        left = 0;
        right = n - 1;
        if (target >= nums[pivot] && target <= nums[right]) {
            left = pivot;
        } else {
            right = pivot - 1;
        }
        
        // 3. 标准二分查找
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(logn) - 两次二分
空间复杂度: O(1)
```

### 解法3：递归二分查找
**核心思路**
```markdown
1. 递归实现二分查找
2. 每次递归判断有序区间
3. 缩小搜索范围
```

**实现代码**
```java
class Solution {
    public int search(int[] nums, int target) {
        return helper(nums, 0, nums.length - 1, target);
    }
    
    private int helper(int[] nums, int left, int right, int target) {
        if (left > right) return -1;
        
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        
        if (nums[mid] <= nums[right]) { // 右半有序
            if (target > nums[mid] && target <= nums[right]) {
                return helper(nums, mid + 1, right, target);
            } else {
                return helper(nums, left, mid - 1, target);
            }
        } else { // 左半有序
            if (target >= nums[left] && target < nums[mid]) {
                return helper(nums, left, mid - 1, target);
            } else {
                return helper(nums, mid + 1, right, target);
            }
        }
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(logn)
空间复杂度: O(logn) - 递归栈
```

### 解法对比
| 维度       | 标准二分法 | 两次二分法 | 递归二分法 |
|------------|-----------|------------|------------|
| 时间复杂度 | O(logn)   | O(logn)    | O(logn)    |
| 空间复杂度 | O(1)      | O(1)       | O(logn)    |
| 实现难度   | 中等      | 中等       | 简单       |
| 推荐指数   | ★★★★★    | ★★★★      | ★★★       |

**补充说明**
1. 标准二分法是面试最佳选择
2. 两次二分法思路更清晰但效率稍低
3. 递归法代码简洁但空间效率低

以下是优化后的下一个排列问题的多解法版本：

---
## 下一个排列

**题目描述**
```markdown
实现获取数组的下一个排列的函数，将数字重新排列成字典序中下一个更大的排列
必须原地修改，只允许使用常数空间
示例：
[1,2,3] → [1,3,2]
[3,2,1] → [1,2,3]
[1,1,5] → [1,5,1]
```

### 解法1：标准解法（推荐）
**核心思路**
```markdown
1. 从后向前找第一个升序对(i,i+1)
2. 在[i+1,end]中找最小的大于nums[i]的数
3. 交换这两个数
4. 反转[i+1,end]部分
```

**实现代码**
```java
class Solution {
    public void nextPermutation(int[] nums) {
        int i = nums.length - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        
        if (i >= 0) {
            int j = nums.length - 1;
            while (j >= 0 && nums[j] <= nums[i]) {
                j--;
            }
            swap(nums, i, j);
        }
        reverse(nums, i + 1);
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
    
    private void reverse(int[] nums, int start) {
        int end = nums.length - 1;
        while (start < end) {
            swap(nums, start++, end--);
        }
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 最多两次扫描
空间复杂度: O(1) - 原地修改
```

### 解法2：库函数法（Python）
**核心思路**
```markdown
使用标准库函数itertools.permutations
（仅适用于Python等语言）
```

**实现代码**
```python
import itertools

class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        perms = itertools.permutations(nums)
        seen = set()
        target = tuple(nums)
        next_p = None
        
        for p in perms:
            if p > target:
                next_p = p
                break
                
        if next_p:
            nums[:] = next_p
        else:
            nums.sort()
```

**复杂度分析**
```markdown
时间复杂度: O(n!) - 全排列
空间复杂度: O(n!) - 存储排列
```

### 解法3：暴力搜索（教学用）
**核心思路**
```markdown
1. 生成所有排列
2. 排序后查找当前排列的下一个
3. 不推荐实际使用
```

**实现代码**
```java
// 仅用于教学理解，实际不可行
```

### 解法对比
| 维度       | 标准解法 | 库函数法 | 暴力搜索 |
|------------|---------|----------|----------|
| 时间复杂度 | O(n)    | O(n!)    | O(n!)    |
| 空间复杂度 | O(1)    | O(n!)    | O(n!)    |
| 适用场景   | 通用    | Python   | 教学     |
| 推荐指数   | ★★★★★  | ★★       | ★        |

**补充说明**
1. 标准解法是面试最佳选择
2. 库函数法展示语言特性优势
3. 暴力搜索帮助理解问题本质

以下是优化后的最接近的三数之和问题的多解法版本：

---
## 最接近的三数之和

**题目描述**
```markdown
给定整数数组nums和目标值target，找出三个数使它们的和最接近target
返回这三个数的和
示例：
输入：nums = [-1,2,1,-4], target = 1
输出：2 (因为 -1 + 2 + 1 = 2)
```

### 解法1：排序+双指针（推荐）
**核心思路**
```markdown
1. 先对数组进行排序
2. 固定一个数，用双指针寻找另外两个数
3. 实时更新最接近的和
```

**实现代码**
```java
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        Arrays.sort(nums);
        int closestSum = nums[0] + nums[1] + nums[2];
        
        for (int i = 0; i < nums.length - 2; i++) {
            int left = i + 1, right = nums.length - 1;
            while (left < right) {
                int currentSum = nums[i] + nums[left] + nums[right];
                if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
                    closestSum = currentSum;
                }
                
                if (currentSum < target) {
                    left++;
                } else if (currentSum > target) {
                    right--;
                } else {
                    return target; // 找到完全匹配的
                }
            }
        }
        return closestSum;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n^2) - 排序O(nlogn) + 双指针O(n^2)
空间复杂度: O(1) - 常量空间
```

### 解法2：暴力枚举（基准解法）
**核心思路**
```markdown
枚举所有可能的三元组组合
```

**实现代码**
```java
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        int closestSum = nums[0] + nums[1] + nums[2];
        
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                for (int k = j + 1; k < nums.length; k++) {
                    int currentSum = nums[i] + nums[j] + nums[k];
                    if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
                        closestSum = currentSum;
                    }
                }
            }
        }
        return closestSum;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n^3) - 三重循环
空间复杂度: O(1)
```

### 解法3：优化双指针（提前终止）
**核心思路**
```markdown
1. 在双指针法基础上增加提前终止条件
2. 找到完全匹配时立即返回
```

**实现代码**
```java
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        Arrays.sort(nums);
        int closestSum = nums[0] + nums[1] + nums[2];
        
        for (int i = 0; i < nums.length - 2; i++) {
            // 跳过重复元素
            if (i > 0 && nums[i] == nums[i-1]) continue;
            
            int left = i + 1, right = nums.length - 1;
            while (left < right) {
                int currentSum = nums[i] + nums[left] + nums[right];
                if (currentSum == target) return target;
                
                if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
                    closestSum = currentSum;
                }
                
                if (currentSum < target) {
                    left++;
                    // 跳过重复元素
                    while (left < right && nums[left] == nums[left-1]) left++;
                } else {
                    right--;
                    // 跳过重复元素
                    while (left < right && nums[right] == nums[right+1]) right--;
                }
            }
        }
        return closestSum;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n^2)
空间复杂度: O(1)
```

### 解法对比
| 维度       | 双指针法 | 暴力枚举 | 优化双指针 |
|------------|---------|----------|------------|
| 时间复杂度 | O(n^2)  | O(n^3)   | O(n^2)     |
| 空间复杂度 | O(1)    | O(1)     | O(1)       |
| 优化点     | 排序    | 无       | 提前终止   |
| 推荐指数   | ★★★★★  | ★        | ★★★★       |

**补充说明**
1. 双指针法是面试最佳选择
2. 暴力法仅用于理解问题本质
3. 优化版在处理重复元素时更高效

以下是优化后的三数之和问题的多解法版本：

---
## 三数之和

**题目描述**
```markdown
在数组中找到所有不重复的三元组，使得它们的和为0
示例：
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2], [-1,0,1]]
```

### 解法1：排序+双指针（推荐）
**核心思路**
```markdown
1. 先对数组进行排序
2. 固定一个数，用双指针寻找另外两个数
3. 跳过重复元素避免重复解
4. 根据当前和调整指针位置
```

**实现代码**
```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        
        for (int i = 0; i < nums.length - 2; i++) {
            // 跳过重复的固定数
            if (i > 0 && nums[i] == nums[i-1]) continue;
            
            int left = i + 1, right = nums.length - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    // 跳过重复的左指针和右指针
                    while (left < right && nums[left] == nums[left+1]) left++;
                    while (left < right && nums[right] == nums[right-1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n^2) - 排序O(nlogn) + 双指针O(n^2)
空间复杂度: O(1) - 不考虑结果存储
```

### 解法2：哈希表法
**核心思路**
```markdown
1. 使用哈希表记录数字出现次数
2. 双重循环枚举前两个数
3. 在哈希表中查找需要的第三个数
```

**实现代码**
```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        
        // 记录每个数字的最后出现位置
        for (int i = 0; i < nums.length; i++) {
            map.put(nums[i], i);
        }
        
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            
            for (int j = i + 1; j < nums.length - 1; j++) {
                if (j > i + 1 && nums[j] == nums[j-1]) continue;
                
                int target = -nums[i] - nums[j];
                if (map.containsKey(target) && map.get(target) > j) {
                    res.add(Arrays.asList(nums[i], nums[j], target));
                }
            }
        }
        return res;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n^2) - 双重循环
空间复杂度: O(n) - 哈希表存储
```

### 解法3：暴力枚举（基准解法）
**核心思路**
```markdown
1. 三重循环枚举所有可能的三元组
2. 使用集合自动去重
```

**实现代码**
```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Set<List<Integer>> res = new HashSet<>();
        Arrays.sort(nums);
        
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                for (int k = j + 1; k < nums.length; k++) {
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        res.add(Arrays.asList(nums[i], nums[j], nums[k]));
                    }
                }
            }
        }
        return new ArrayList<>(res);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n^3) - 三重循环
空间复杂度: O(n) - 结果存储
```

### 解法对比
| 维度       | 双指针法 | 哈希表法 | 暴力枚举 |
|------------|---------|----------|----------|
| 时间复杂度 | O(n^2)  | O(n^2)   | O(n^3)   |
| 空间复杂度 | O(1)    | O(n)     | O(n)     |
| 优化点     | 排序+双指针 | 哈希加速 | 无优化   |
| 推荐指数   | ★★★★★  | ★★★★     | ★        |

**补充说明**
1. 双指针法是面试最佳选择，效率高
2. 哈希表法思路清晰但空间消耗大
3. 暴力法仅用于理解问题本质

以下是优化后的最长上升子序列问题的多解法版本：

---
## 最长上升子序列

**题目描述**
```markdown
给定一个无序数组，找到其中最长的严格递增子序列的长度
示例：
输入：[6,3,1,5,2,3,7]
输出：4 (因为[1,2,3,7]长度为4)
```

### 解法1：动态规划（标准版）
**核心思路**
```markdown
1. dp[i]表示以nums[i]结尾的最长上升子序列长度
2. 对于每个i，遍历前面的元素j
3. 如果nums[j]<nums[i]，则更新dp[i]
```

**实现代码**
```java
class Solution {
    public int lengthOfLIS(int[] nums) {
        if (nums.length == 0) return 0;
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        int maxLen = 1;
        
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            maxLen = Math.max(maxLen, dp[i]);
        }
        return maxLen;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n^2)
空间复杂度: O(n)
```

### 解法2：贪心+二分查找（最优解）
**核心思路**
```markdown
1. 维护一个tails数组，tails[i]表示长度为i+1的子序列的最小末尾
2. 对于每个数字，用二分查找确定它在tails中的位置
3. 更新tails数组
```

**实现代码**
```java
class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0;
        
        for (int num : nums) {
            int left = 0, right = size;
            // 二分查找插入位置
            while (left < right) {
                int mid = left + (right - left) / 2;
                if (tails[mid] < num) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            tails[left] = num;
            if (left == size) size++;
        }
        return size;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(nlogn) - 二分查找优化
空间复杂度: O(n)
```

### 解法3：树状数组优化
**核心思路**
```markdown
1. 离散化处理原数组
2. 使用树状数组维护前缀最大值
3. 查询和更新时间复杂度均为O(logn)
```

**实现代码**
```java
// 实现较复杂，适用于高级场景
```

### 解法4：线段树优化
**核心思路**
```markdown
1. 类似树状数组思路
2. 使用线段树维护区间最大值
3. 查询和更新时间复杂度均为O(logn)
```

### 解法对比
| 维度       | 动态规划 | 贪心+二分 | 树状数组 | 线段树 |
|------------|---------|-----------|----------|--------|
| 时间复杂度 | O(n^2)  | O(nlogn)  | O(nlogn) | O(nlogn) |
| 空间复杂度 | O(n)    | O(n)      | O(n)     | O(n)   |
| 实现难度   | 简单    | 中等      | 较难     | 难     |
| 推荐指数   | ★★★★    | ★★★★★    | ★★★      | ★★     |

**补充说明**
1. 面试推荐使用贪心+二分法，兼顾效率和实现难度
2. 动态规划法思路直观，适合教学
3. 树状数组和线段树适合竞赛场景

以下是优化后的寻找数组中出现次数超过一半数字的多解法版本：

---
## 数组中超过半数的数字

**题目描述**
```markdown
给定一个长度为n的数组，找出出现次数超过n/2的数字
示例：
输入：[1,2,3,2,2,2,5,4,2]
输出：2 (出现5次 > 9/2)
```

### 解法1：摩尔投票法（最优解）
**核心思路**
```markdown
1. 维护候选人和计数变量
2. 遍历数组，相同则计数+1，不同则-1
3. 计数为0时更换候选人
```

**实现代码**
```java
class Solution {
    public int majorityElement(int[] nums) {
        int candidate = nums[0];
        int count = 1;
        
        for (int i = 1; i < nums.length; i++) {
            if (count == 0) {
                candidate = nums[i];
                count = 1;
            } else if (nums[i] == candidate) {
                count++;
            } else {
                count--;
            }
        }
        return candidate;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 单次遍历
空间复杂度: O(1) - 常量空间
```

### 解法2：哈希表统计法
**核心思路**
```markdown
1. 使用哈希表记录每个数字出现次数
2. 遍历过程中检查是否超过半数
```

**实现代码**
```java
class Solution {
    public int majorityElement(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();
        int half = nums.length / 2;
        
        for (int num : nums) {
            int count = map.getOrDefault(num, 0) + 1;
            if (count > half) return num;
            map.put(num, count);
        }
        return -1; // 题目保证存在，此行不会执行
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 单次遍历
空间复杂度: O(n) - 哈希表存储
```

### 解法3：排序取中法
**核心思路**
```markdown
1. 将数组排序
2. 中间位置的元素必定是众数
```

**实现代码**
```java
class Solution {
    public int majorityElement(int[] nums) {
        Arrays.sort(nums);
        return nums[nums.length / 2];
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(nlogn) - 排序时间
空间复杂度: O(1) - 原地排序
```

### 解法4：随机抽样法
**核心思路**
```markdown
1. 随机选取一个元素
2. 验证是否为众数
3. 期望时间复杂度O(n)
```

**实现代码**
```java
class Solution {
    public int majorityElement(int[] nums) {
        Random rand = new Random();
        int half = nums.length / 2;
        
        while (true) {
            int candidate = nums[rand.nextInt(nums.length)];
            int count = 0;
            for (int num : nums) {
                if (num == candidate) count++;
                if (count > half) return candidate;
            }
        }
    }
}
```

**复杂度分析**
```markdown
时间复杂度: 期望O(n)，最坏O(∞)
空间复杂度: O(1)
```

### 解法对比
| 维度       | 摩尔投票 | 哈希表 | 排序法 | 随机法 |
|------------|---------|--------|--------|--------|
| 时间复杂度 | O(n)    | O(n)   | O(nlogn)| 期望O(n) |
| 空间复杂度 | O(1)    | O(n)   | O(1)   | O(1)   |
| 适用场景   | 通用    | 通用   | 简单   | 概率   |
| 推荐指数   | ★★★★★  | ★★★★   | ★★★    | ★★     |

**补充说明**
1. 摩尔投票法是面试最佳选择，效率最高
2. 哈希表法思路直观，适合教学
3. 排序法代码最简洁
4. 随机法展示概率算法的思路

以下是优化后的合并两个有序数组问题的多解法版本：

---
## 合并两个有序数组

**题目描述**
```markdown
将两个有序数组合并为一个有序数组
要求：合并后的数组存储在第一个数组中
示例：
输入：A=[1,2,3], B=[2,5,6]
输出：[1,2,2,3,5,6]
```

### 解法1：双指针从后向前合并（最优解）
**核心思路**
```markdown
1. 利用数组A的尾部空间
2. 从两个数组的末尾开始比较
3. 较大的元素放入合并后的末尾
```

**实现代码**
```java
class Solution {
    public void merge(int[] A, int m, int[] B, int n) {
        int i = m - 1, j = n - 1, k = m + n - 1;
        
        while (j >= 0) {
            if (i >= 0 && A[i] > B[j]) {
                A[k--] = A[i--];
            } else {
                A[k--] = B[j--];
            }
        }
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(m+n) - 单次遍历
空间复杂度: O(1) - 原地修改
```

### 解法2：新建数组合并（直观解法）
**核心思路**
```markdown
1. 创建新数组存储合并结果
2. 双指针从前向后比较
3. 最后将结果拷贝回原数组
```

**实现代码**
```java
class Solution {
    public void merge(int[] A, int m, int[] B, int n) {
        int[] C = new int[m + n];
        int i = 0, j = 0, k = 0;
        
        while (i < m && j < n) {
            C[k++] = A[i] <= B[j] ? A[i++] : B[j++];
        }
        while (i < m) C[k++] = A[i++];
        while (j < n) C[k++] = B[j++];
        
        System.arraycopy(C, 0, A, 0, m + n);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(m+n)
空间复杂度: O(m+n) - 额外数组
```

### 解法3：先合并后排序（简易解法）
**核心思路**
```markdown
1. 将B数组直接拼接到A数组后面
2. 对整个数组进行排序
```

**实现代码**
```java
class Solution {
    public void merge(int[] A, int m, int[] B, int n) {
        System.arraycopy(B, 0, A, m, n);
        Arrays.sort(A);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O((m+n)log(m+n)) - 排序时间
空间复杂度: O(1) - 原地排序
```

### 解法对比
| 维度       | 从后向前合并 | 新建数组法 | 先合并后排序 |
|------------|-------------|------------|-------------|
| 时间复杂度 | O(m+n)      | O(m+n)     | O((m+n)log(m+n)) |
| 空间复杂度 | O(1)        | O(m+n)     | O(1)        |
| 适用场景   | 通用        | 教学演示   | 快速实现    |
| 推荐指数   | ★★★★★      | ★★★        | ★★          |

**补充说明**
1. 从后向前合并是最优解法，推荐面试使用
2. 新建数组法思路直观，适合理解问题
3. 先合并后排序代码最简洁但效率较低

以下是优化后的最长公共前缀问题的多解法版本：

---
## 最长公共前缀

**题目描述**
```markdown
查找字符串数组中的最长公共前缀
示例：
输入：["flower","flow","flight"]
输出："fl"
输入：["dog","racecar","car"]
输出：""
```

### 解法1：横向扫描（推荐）
**核心思路**
```markdown
1. 以第一个字符串为基准
2. 依次与其他字符串比较
3. 逐步缩小公共前缀范围
```

**实现代码**
```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(S) - S为所有字符串字符总数
空间复杂度: O(1)
```

### 解法2：纵向扫描（直观解法）
**核心思路**
```markdown
1. 逐个字符比较所有字符串
2. 遇到不匹配字符立即返回
```

**实现代码**
```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        
        for (int i = 0; i < strs[0].length(); i++) {
            char c = strs[0].charAt(i);
            for (int j = 1; j < strs.length; j++) {
                if (i == strs[j].length() || strs[j].charAt(i) != c) {
                    return strs[0].substring(0, i);
                }
            }
        }
        return strs[0];
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(S)
空间复杂度: O(1)
```

### 解法3：分治法
**核心思路**
```markdown
1. 将问题分解为子问题
2. 合并左右子问题的解
```

**实现代码**
```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        return divide(strs, 0, strs.length - 1);
    }
    
    private String divide(String[] strs, int left, int right) {
        if (left == right) return strs[left];
        
        int mid = (left + right) / 2;
        String lcpLeft = divide(strs, left, mid);
        String lcpRight = divide(strs, mid + 1, right);
        return commonPrefix(lcpLeft, lcpRight);
    }
    
    private String commonPrefix(String left, String right) {
        int min = Math.min(left.length(), right.length());
        for (int i = 0; i < min; i++) {
            if (left.charAt(i) != right.charAt(i)) {
                return left.substring(0, i);
            }
        }
        return left.substring(0, min);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(S)
空间复杂度: O(mlogn) - 递归栈空间
```

### 解法4：二分查找法
**核心思路**
```markdown
1. 对最短字符串长度进行二分
2. 检查当前长度是否是公共前缀
```

**实现代码**
```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) return "";
        
        int minLen = Integer.MAX_VALUE;
        for (String str : strs) {
            minLen = Math.min(minLen, str.length());
        }
        
        int low = 1, high = minLen;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (isCommonPrefix(strs, mid)) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return strs[0].substring(0, (low + high) / 2);
    }
    
    private boolean isCommonPrefix(String[] strs, int len) {
        String prefix = strs[0].substring(0, len);
        for (int i = 1; i < strs.length; i++) {
            if (!strs[i].startsWith(prefix)) {
                return false;
            }
        }
        return true;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(Slogn)
空间复杂度: O(1)
```

### 解法对比
| 维度       | 横向扫描 | 纵向扫描 | 分治法 | 二分法 |
|------------|---------|----------|--------|--------|
| 时间复杂度 | O(S)    | O(S)     | O(S)   | O(Slogn) |
| 空间复杂度 | O(1)    | O(1)     | O(mlogn)| O(1)   |
| 实现难度   | 简单    | 简单     | 中等   | 中等   |
| 推荐指数   | ★★★★★  | ★★★★     | ★★★    | ★★★★   |

**补充说明**
1. 横向扫描是面试最佳选择，代码简洁高效
2. 纵向扫描思路最直观
3. 分治法展示分治思想
4. 二分法适合超长字符串场景

## 两数之和

**题目描述**

```markdown
给定一个整数数组 nums 和一个目标值 target，请在数组中找出和为目标值的两个整数，并返回它们的数组下标。

假设：
1. 每种输入只会对应一个答案
2. 不能重复使用同一个元素

示例：
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：nums[0] + nums[1] = 2 + 7 = 9
```

### 解题思路

```markdown
1. 暴力解法：双重循环检查所有可能的组合
2. 哈希优化：利用哈希表实现O(1)时间复杂度的查找
```

### 关键步骤

```markdown
1. 边界处理：空数组或单元素数组直接返回
2. 哈希表使用：存储已遍历元素的值和索引
3. 差值查找：检查(target - current)是否存在于哈希表
```

## 解法1：暴力枚举

**思路**
```markdown
通过双重循环穷举所有可能的元素组合，检查是否满足条件
```

```java
public int[] twoSum(int[] nums, int target) {
    // 外层循环遍历每个元素（除最后一个）
    for (int i = 0; i < nums.length - 1; i++) {
        // 内层循环遍历后续元素
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[]{i, j};
            }
        }
    }
    return new int[0]; // 无解情况
}
```

**复杂度分析**
```markdown
时间复杂度：O(n²) - 最坏情况下需遍历n(n-1)/2次
空间复杂度：O(1) - 仅使用常数级额外空间
```

## 解法2：哈希表优化

**思路**
```markdown
利用哈希表实现O(1)时间复杂度的查找，将时间复杂度从O(n²)降至O(n)
```

```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> numMap = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        // 检查补数是否已存在
        if (numMap.containsKey(complement)) {
            return new int[]{numMap.get(complement), i};
        }
        // 将当前值存入哈希表
        numMap.put(nums[i], i);
    }
    return new int[0]; // 无解情况
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 只需遍历一次数组
空间复杂度：O(n) - 最坏情况下需存储所有元素
```

### 测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 常规测试
    System.out.println(Arrays.toString(solution.twoSum(new int[]{2,7,11,15}, 9))); // [0,1]
    
    // 边界测试
    System.out.println(Arrays.toString(solution.twoSum(new int[]{3,3}, 6))); // [0,1]
    System.out.println(Arrays.toString(solution.twoSum(new int[]{3}, 3)));  // []
    
    // 性能测试
    int[] largeArray = new int[1000000];
    Arrays.fill(largeArray, 1);
    largeArray[999999] = 2;
    System.out.println(Arrays.toString(solution.twoSum(largeArray, 3))); // [0,999999]
}
```

### 方法比较

| 方法        | 时间复杂度 | 空间复杂度 | 适用场景               |
|-------------|------------|------------|------------------------|
| 暴力枚举    | O(n²)      | O(1)       | 小规模数据             |
| 哈希表优化  | O(n)       | O(n)       | 大规模数据，追求效率   |

**选择建议**：在内存充足的情况下优先选择哈希表解法，数据量极小时可考虑暴力解法。


## 小于n的最大数

**题目描述**

```markdown
给定一个数n和一组数字集合，求由集合中元素组成的小于n的最大数

约束条件：
1. 只能使用集合中的数字
2. 结果必须严格小于n
3. 结果应尽可能大

示例：
输入：n = 23121, nums = [2,4,9]
输出：22999

输入：n = 23121, nums = [9,8,7]
输出：9999
```

### 解题思路

```markdown
1. 贪心算法：从高位到低位逐位构造数字
2. 回溯策略：当某位无法找到合适数字时回退调整前一位
3. 剪枝优化：尽早确定可以构造更小数字的情况
```

### 关键步骤

```markdown
1. 预处理：将数字集合排序以便快速查找
2. 逐位构造：
   - 优先选择等于当前位的数字
   - 若无则选择小于当前位的最大数字
   - 若仍无则回溯调整前一位
3. 后续处理：确定某位小于n后，后续位填充最大可用数字
```

## 解法1：贪心+回溯

```java
import java.util.TreeSet;

public class Solution {
    public String findMaxNumber(int n, int[] nums) {
        TreeSet<Integer> digits = new TreeSet<>();
        for (int num : nums) {
            digits.add(num);
        }
        
        char[] target = String.valueOf(n).toCharArray();
        StringBuilder result = new StringBuilder();
        boolean isSmaller = false;
        
        for (int i = 0; i < target.length; i++) {
            int current = target[i] - '0';
            
            if (isSmaller) {
                result.append(digits.last());
                continue;
            }
            
            Integer candidate = digits.floor(current);
            if (candidate == null) {
                // 回溯处理
                int backPos = i - 1;
                while (backPos >= 0) {
                    int prevDigit = result.charAt(backPos) - '0';
                    Integer smaller = digits.lower(prevDigit);
                    if (smaller != null) {
                        result.setCharAt(backPos, (char)(smaller + '0'));
                        result.setLength(backPos + 1);
                        isSmaller = true;
                        break;
                    }
                    backPos--;
                }
                
                if (!isSmaller) {
                    // 特殊情况：首位无法满足，返回len-1个最大数字
                    return repeatMaxDigit(digits.last(), target.length - 1);
                }
                i--; // 重新处理当前位
            } else {
                result.append(candidate);
                if (candidate < current) {
                    isSmaller = true;
                }
            }
        }
        
        // 处理构造数字等于原数的情况（需要确保严格小于）
        if (result.toString().equals(String.valueOf(n))) {
            return findSmallerNumber(result, digits);
        }
        
        return result.toString();
    }
    
    private String repeatMaxDigit(int digit, int count) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < count; i++) {
            sb.append(digit);
        }
        return sb.toString();
    }
    
    private String findSmallerNumber(StringBuilder num, TreeSet<Integer> digits) {
        for (int i = num.length() - 1; i >= 0; i--) {
            int current = num.charAt(i) - '0';
            Integer smaller = digits.lower(current);
            if (smaller != null) {
                num.setCharAt(i, (char)(smaller + '0'));
                for (int j = i + 1; j < num.length(); j++) {
                    num.setCharAt(j, (char)(digits.last() + '0'));
                }
                return num.toString();
            }
        }
        return repeatMaxDigit(digits.last(), num.length() - 1);
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(L) - L为数字n的位数，最坏情况下需要回溯处理
空间复杂度：O(L) - 存储结果和中间状态
```

## 解法2：DFS回溯

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Solution {
    private List<Integer> digits;
    private String maxNum = "0";
    private String target;
    
    public String findMaxNumber(int n, int[] nums) {
        this.target = String.valueOf(n);
        this.digits = new ArrayList<>();
        for (int num : nums) digits.add(num);
        Collections.sort(digits, Collections.reverseOrder());
        
        backtrack(new StringBuilder(), false);
        return maxNum;
    }
    
    private void backtrack(StringBuilder current, boolean isSmaller) {
        if (current.length() == target.length()) {
            if (current.toString().compareTo(target) < 0) {
                if (current.length() > maxNum.length() || 
                    current.toString().compareTo(maxNum) > 0) {
                    maxNum = current.toString();
                }
            }
            return;
        }
        
        int pos = current.length();
        int maxDigit = isSmaller ? digits.get(0) : 
                      Math.min(digits.get(0), target.charAt(pos) - '0');
        
        for (int digit : digits) {
            if (digit > maxDigit) continue;
            
            current.append(digit);
            boolean newIsSmaller = isSmaller || (digit < target.charAt(pos) - '0');
            backtrack(current, newIsSmaller);
            current.deleteCharAt(current.length() - 1);
            
            // 剪枝：如果已经找到可能的最大数字
            if (newIsSmaller && digit == maxDigit) break;
        }
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(k^L) - k为数字集合大小，L为数字位数（可通过剪枝优化）
空间复杂度：O(L) - 递归栈深度
```

### 测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 示例测试
    System.out.println(solution.findMaxNumber(23121, new int[]{2,4,9})); // 22999
    System.out.println(solution.findMaxNumber(23121, new int[]{9,8,7})); // 9999
    
    // 边界测试
    System.out.println(solution.findMaxNumber(1000, new int[]{1}));     // 111
    System.out.println(solution.findMaxNumber(9999, new int[]{8,9}));   // 9998
    
    // 性能测试
    System.out.println(solution.findMaxNumber(123456789, new int[]{1,3,5,7,9})); 
    // 输出：99999999
}
```

### 方法比较

| 方法        | 时间复杂度 | 空间复杂度 | 适用场景               |
|-------------|------------|------------|------------------------|
| 贪心+回溯   | O(L)       | O(L)       | 常规情况，效率较高     |
| DFS回溯     | O(k^L)     | O(L)       | 需要穷举所有可能的情况 |

**选择建议**：
1. 优先选择贪心+回溯解法，效率更高
2. 当需要处理复杂约束条件时，可考虑DFS回溯
3. 对于极大数字（超过long范围），字符串处理更安全

## 翻转数组找最大长度

**题目描述**

```markdown
给定一个二进制数组 nums 和一个整数 k，如果可以翻转最多 k 个 0，返回数组中连续 1 的最大个数。

示例 1：
输入：nums = [1,1,1,0,0,0,1,1,1,1,0], K = 2
输出：6
解释：翻转中间两个0后得到 [1,1,1,1,1,1,1,1,1,1,0]

示例 2：
输入：nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
输出：10
解释：翻转三个0后得到 [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]

约束条件：
1. 数组元素只能是0或1
2. k >= 0
```

### 解题思路

```markdown
滑动窗口（Sliding Window）技术：
1. 维护一个窗口，记录窗口内0的个数
2. 当0的个数超过k时，收缩窗口左边界
3. 始终保持窗口内0的个数不超过k
4. 窗口的最大长度即为所求
```

### 关键步骤

```markdown
1. 初始化左右指针和计数器
2. 右指针遍历数组：
   - 遇到0时增加计数器
   - 当0数超过k时移动左指针
3. 实时更新最大窗口大小
4. 处理边界情况（全1或全0数组）
```

## 解法1：标准滑动窗口

```java
public class Solution {
    public int longestOnes(int[] nums, int k) {
        int left = 0;
        int zeroCount = 0;
        int maxLength = 0;
        
        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) {
                zeroCount++;
            }
            
            // 当0的数量超过k时，收缩窗口
            while (zeroCount > k) {
                if (nums[left] == 0) {
                    zeroCount--;
                }
                left++;
            }
            
            // 更新最大长度
            maxLength = Math.max(maxLength, right - left + 1);
        }
        
        return maxLength;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个元素最多被访问两次（左右指针各一次）
空间复杂度：O(1) - 只使用了常数空间
```

## 解法2：优化的滑动窗口

```java
public class Solution {
    public int longestOnes(int[] nums, int k) {
        int left = 0;
        int right;
        
        for (right = 0; right < nums.length; right++) {
            if (nums[right] == 0) {
                k--;
            }
            
            // 当k为负时才开始移动左指针
            if (k < 0) {
                if (nums[left] == 0) {
                    k++;
                }
                left++;
            }
        }
        
        return right - left;
    }
}
```

**优化点**
```markdown
1. 直接使用k作为计数器，减少变量使用
2. 只有当k为负时才调整窗口，减少不必要的左指针移动
3. 最终窗口大小即为结果，无需额外比较
```

### 测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 示例测试
    int[] nums1 = {1,1,1,0,0,0,1,1,1,1,0};
    System.out.println(solution.longestOnes(nums1, 2)); // 6
    
    int[] nums2 = {0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1};
    System.out.println(solution.longestOnes(nums2, 3)); // 10
    
    // 边界测试
    int[] allOnes = {1,1,1,1};
    System.out.println(solution.longestOnes(allOnes, 2)); // 4
    
    int[] allZeros = {0,0,0};
    System.out.println(solution.longestOnes(allZeros, 2)); // 2
    
    // 性能测试
    int[] largeArray = new int[1000000];
    Arrays.fill(largeArray, 1);
    largeArray[500000] = 0;
    System.out.println(solution.longestOnes(largeArray, 1)); // 1000000
}
```

### 方法比较

| 方法            | 时间复杂度 | 空间复杂度 | 优势                     |
|-----------------|------------|------------|--------------------------|
| 标准滑动窗口    | O(n)       | O(1)       | 逻辑清晰，易于理解       |
| 优化的滑动窗口  | O(n)       | O(1)       | 减少不必要的指针移动     |

**选择建议**：
1. 理解问题时可先实现标准滑动窗口
2. 追求极致性能时使用优化版本
3. 两种方法在大多数情况下性能相当

**扩展思考**：如果题目改为可以翻转最多k个1（即将1翻转为0），该如何修改算法？（只需将判断条件中的0改为1即可）


## 最大子数组和问题

**题目描述**

```markdown
给定一个整数数组，找出具有最大和的连续子数组，并返回该子数组及其和。

示例：
输入：[-6, 1, 5, -3, 4, -7, 5]
输出：子数组 [1, 5, -3, 4]，和为 7

要求：
1. 子数组至少包含一个元素
2. 数组可能包含负数
```

### 解题思路

```markdown
Kadane算法（动态规划变种）：
1. 遍历数组，计算以当前元素结尾的最大子数组和
2. 比较局部最大值与全局最大值
3. 记录子数组的起止位置
```

### 关键步骤

```markdown
1. 初始化当前和与最大和
2. 遍历时决策：
   - 将当前元素加入现有子数组
   - 或以当前元素开始新子数组
3. 动态更新子数组边界
4. 处理全负数数组的特殊情况
```

## 解法1：标准Kadane算法

```java
public class MaxSubarray {
    public static Result findMaxSubarray(int[] nums) {
        if (nums == null || nums.length == 0) {
            return new Result(0, 0, 0);
        }

        int maxCurrent = nums[0];
        int maxGlobal = nums[0];
        int start = 0, end = 0;
        int tempStart = 0;

        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > maxCurrent + nums[i]) {
                maxCurrent = nums[i];
                tempStart = i;
            } else {
                maxCurrent += nums[i];
            }

            if (maxCurrent > maxGlobal) {
                maxGlobal = maxCurrent;
                start = tempStart;
                end = i;
            }
        }

        return new Result(maxGlobal, start, end);
    }

    static class Result {
        int sum;
        int start;
        int end;
        
        public Result(int sum, int start, int end) {
            this.sum = sum;
            this.start = start;
            this.end = end;
        }
    }

    public static void main(String[] args) {
        int[] arr = {-6, 1, 5, -3, 4, -7, 5};
        Result result = findMaxSubarray(arr);
        
        System.out.println("最大和: " + result.sum);
        System.out.print("子数组: [");
        for (int i = result.start; i <= result.end; i++) {
            System.out.print(arr[i] + (i < result.end ? ", " : ""));
        }
        System.out.println("]");
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 单次遍历数组
空间复杂度：O(1) - 仅使用常数空间（不包括结果存储）
```

## 解法2：分治法（扩展思路）

```java
public class DivideConquerSolution {
    public static Result findMaxSubarray(int[] nums) {
        return findMaxSubarray(nums, 0, nums.length - 1);
    }

    private static Result findMaxSubarray(int[] nums, int low, int high) {
        if (low == high) {
            return new Result(nums[low], low, high);
        }

        int mid = (low + high) / 2;
        Result left = findMaxSubarray(nums, low, mid);
        Result right = findMaxSubarray(nums, mid + 1, high);
        Result cross = findMaxCrossingSubarray(nums, low, mid, high);

        if (left.sum >= right.sum && left.sum >= cross.sum) {
            return left;
        } else if (right.sum >= left.sum && right.sum >= cross.sum) {
            return right;
        } else {
            return cross;
        }
    }

    private static Result findMaxCrossingSubarray(int[] nums, int low, int mid, int high) {
        int leftSum = Integer.MIN_VALUE;
        int sum = 0;
        int maxLeft = mid;
        for (int i = mid; i >= low; i--) {
            sum += nums[i];
            if (sum > leftSum) {
                leftSum = sum;
                maxLeft = i;
            }
        }

        int rightSum = Integer.MIN_VALUE;
        sum = 0;
        int maxRight = mid + 1;
        for (int j = mid + 1; j <= high; j++) {
            sum += nums[j];
            if (sum > rightSum) {
                rightSum = sum;
                maxRight = j;
            }
        }

        return new Result(leftSum + rightSum, maxLeft, maxRight);
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(nlogn) - 分治递归
空间复杂度：O(logn) - 递归栈深度
```

### 测试用例

```java
public static void main(String[] args) {
    // 常规测试
    testCase(new int[]{-6, 1, 5, -3, 4, -7, 5}, 7, new int[]{1, 5, -3, 4});
    
    // 全正数数组
    testCase(new int[]{1, 2, 3, 4}, 10, new int[]{1, 2, 3, 4});
    
    // 全负数数组
    testCase(new int[]{-5, -3, -2, -1}, -1, new int[]{-1});
    
    // 边界测试
    testCase(new int[]{1}, 1, new int[]{1});
    testCase(new int[]{-2, 1, -3, 4, -1, 2, 1, -5, 4}, 6, new int[]{4, -1, 2, 1});
}

private static void testCase(int[] input, int expectedSum, int[] expectedSubarray) {
    Result result = MaxSubarray.findMaxSubarray(input);
    System.out.println("输入: " + Arrays.toString(input));
    System.out.println("输出和: " + result.sum + " (预期: " + expectedSum + ")");
    System.out.println("输出子数组: " + getSubarrayString(input, result) + 
                      " (预期: " + Arrays.toString(expectedSubarray) + ")");
    System.out.println("---");
}

private static String getSubarrayString(int[] arr, Result result) {
    return Arrays.toString(Arrays.copyOfRange(arr, result.start, result.end + 1));
}
```

### 方法比较

| 方法        | 时间复杂度 | 空间复杂度 | 适用场景               |
|-------------|------------|------------|------------------------|
| Kadane算法  | O(n)       | O(1)       | 常规情况，效率最高     |
| 分治法      | O(nlogn)   | O(logn)    | 学术研究，并行计算场景 |

**选择建议**：
1. 生产环境优先选择Kadane算法
2. 需要处理超大数据集时考虑分治法的并行实现
3. 分治法更适合多维数组的最大子数组问题

**扩展思考**：
1. 如何返回所有可能的最大和子数组？
2. 如果要求子数组长度最短/最长该如何修改？
3. 如何解决环形数组的最大子数组和问题？


## 数字全排列（含重复元素）

**题目描述**

```markdown
给定一个可能包含重复数字的整数数组，返回所有不重复的全排列，结果按字典序排列。

示例：
输入：[1,1,2]
输出：
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]

约束条件：
1. 1 <= nums.length <= 8
2. -10 <= nums[i] <= 10
```

### 解题思路

```markdown
回溯算法 + 剪枝策略：
1. 排序数组使相同元素相邻
2. 使用标记数组记录元素使用情况
3. 剪枝条件：
   - 当前元素已使用
   - 当前元素与前一个元素相同且前一个元素未被使用
4. 递归构建排列树
```

### 关键步骤

```markdown
1. 预处理：排序输入数组
2. 回溯框架：
   - 终止条件：当前排列长度等于输入数组长度
   - 遍历选择：跳过已使用和重复元素
   - 递归深入：做出选择并标记
   - 回溯撤销：撤销选择并取消标记
3. 结果收集：完成排列时保存副本
```

## 标准实现

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums); // 关键步骤：排序使相同元素相邻
        backtrack(nums, new boolean[nums.length], new ArrayList<>(), res);
        return res;
    }

    private void backtrack(int[] nums, boolean[] used, 
                         List<Integer> path, List<List<Integer>> res) {
        // 终止条件：完成一个排列
        if (path.size() == nums.length) {
            res.add(new ArrayList<>(path));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            // 剪枝条件（核心逻辑）
            if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) {
                continue;
            }

            // 做出选择
            used[i] = true;
            path.add(nums[i]);

            // 递归深入
            backtrack(nums, used, path, res);

            // 撤销选择
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n*n!) - 最坏情况无重复时有n!种排列，每种排列需要O(n)时间构建
空间复杂度：O(n) - 递归栈深度和临时存储空间
```

## 替代解法：交换法

```java
public class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        dfs(nums, 0, res);
        return res;
    }

    private void dfs(int[] nums, int start, List<List<Integer>> res) {
        if (start == nums.length) {
            List<Integer> list = new ArrayList<>();
            for (int num : nums) list.add(num);
            res.add(list);
            return;
        }

        Set<Integer> seen = new HashSet<>();
        for (int i = start; i < nums.length; i++) {
            if (seen.add(nums[i])) { // 跳过重复元素
                swap(nums, start, i);
                dfs(nums, start + 1, res);
                swap(nums, start, i); // 回溯
            }
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

**方法比较**

| 方法       | 优点                   | 缺点                   | 适用场景             |
|------------|------------------------|------------------------|----------------------|
| 回溯+剪枝  | 逻辑清晰，节省空间     | 需要排序预处理         | 通用场景             |
| 交换法     | 无需额外标记空间       | 难以保持字典序         | 内存受限环境         |

### 测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 常规测试
    int[] nums1 = {1,1,2};
    System.out.println(solution.permuteUnique(nums1));
    
    // 全相同元素
    int[] nums2 = {2,2,2};
    System.out.println(solution.permuteUnique(nums2));
    
    // 无重复元素
    int[] nums3 = {1,2,3};
    System.out.println(solution.permuteUnique(nums3));
    
    // 边界测试
    int[] nums4 = {1};
    System.out.println(solution.permuteUnique(nums4));
}
```

### 常见问题解答

**Q1：为什么要先排序数组？**
```markdown
排序使相同元素相邻，便于通过nums[i] == nums[i-1]判断重复，配合!used[i-1]确保相同元素的相对顺序
```

**Q2：!used[i-1]和used[i-1]的区别？**
```markdown
!used[i-1]保证相同元素按顺序使用，避免生成重复排列。若改为used[i-1]会漏掉有效排列
```

**Q3：如何优化空间复杂度？**
```markdown
可使用交换法（原地交换元素），但会破坏字典序且实现复杂度较高
```

### 算法可视化

```
输入：[1,1,2]
排序后：[1,1,2]

递归树：
       []
     /  |  \
   1    1    2
  / \   ↓
 1   2  1
 |   |  |
 2   1  1

剪枝情况：
第二个1与前一个1相同且前一个未被使用时跳过
```

**扩展思考**：
1. 如何输出排列的字典序编号？
2. 如何只求排列总数而不生成具体排列？
3. 如何流式处理超大结果集？


## 矩阵旋转（逆时针90度）

**题目描述**

```markdown
给定一个m×n的二维矩阵，将其逆时针旋转90度后返回

示例：
输入：
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
输出：
[
  [4, 8,12],
  [3, 7,11],
  [2, 6,10],
  [1, 5, 9]
]
```

### 解题思路

```markdown
数学规律法：
1. 转置操作：行列互换（matrix[i][j] → matrix[j][i]）
2. 垂直翻转：首尾行交换（第一行与最后一行交换，第二行与倒数第二行交换...）
```

### 关键步骤

```markdown
1. 创建新矩阵：转置后矩阵维度变为n×m
2. 转置实现：双重循环交换行列索引
3. 垂直翻转：只需交换行到中间位置
4. 边界处理：空矩阵和单元素矩阵特殊情况
```

## 标准实现

```java
public class MatrixRotation {
    public static int[][] rotateCounterClockwise(int[][] matrix) {
        if (matrix == null || matrix.length == 0) return matrix;
        
        int m = matrix.length;
        int n = matrix[0].length;
        int[][] result = new int[n][m];
        
        // 转置矩阵
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                result[j][i] = matrix[i][j];
            }
        }
        
        // 垂直翻转
        for (int i = 0; i < n / 2; i++) {
            int[] temp = result[i];
            result[i] = result[n - 1 - i];
            result[n - 1 - i] = temp;
        }
        
        return result;
    }

    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int num : row) {
                System.out.printf("%-4d", num);
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9,10,11,12}
        };

        System.out.println("原始矩阵:");
        printMatrix(matrix);

        int[][] rotated = rotateCounterClockwise(matrix);
        System.out.println("\n旋转后矩阵:");
        printMatrix(rotated);
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(m×n) - 需要遍历所有元素两次（转置和翻转）
空间复杂度：O(m×n) - 需要额外存储结果矩阵
```

## 原地旋转（方阵专用）

```java
public class InPlaceRotation {
    public static void rotate(int[][] matrix) {
        int n = matrix.length;
        // 转置矩阵
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // 垂直翻转
        for (int i = 0; i < n / 2; i++) {
            for (int j = 0; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[n-1-i][j];
                matrix[n-1-i][j] = temp;
            }
        }
    }
}
```

**适用条件**
```markdown
仅适用于n×n方阵：
1. 转置时只需处理上三角矩阵（j从i开始）
2. 直接在原矩阵上操作，空间复杂度O(1)
```

### 测试用例

```java
public static void main(String[] args) {
    // 矩形矩阵测试
    int[][] test1 = {
        {1,2,3,4},
        {5,6,7,8},
        {9,10,11,12}
    };
    testRotation(test1);

    // 方阵测试
    int[][] test2 = {
        {1,2,3},
        {4,5,6},
        {7,8,9}
    };
    testRotation(test2);

    // 边界测试
    int[][] test3 = {{1}};
    testRotation(test3);

    int[][] test4 = {};
    testRotation(test4);
}

private static void testRotation(int[][] matrix) {
    System.out.println("原始矩阵:");
    printMatrix(matrix);
    System.out.println("旋转后:");
    printMatrix(rotateCounterClockwise(matrix));
    System.out.println("------------------");
}
```

### 数学原理

```
旋转前坐标：(i,j)
逆时针90度后坐标：(j, n-1-i)

分步实现：
1. 转置：(i,j) → (j,i)
2. 垂直翻转：(j,i) → (j, n-1-i)
```

### 常见问题解答

**Q1：如何实现顺时针旋转？**
```markdown
步骤相反：
1. 垂直翻转
2. 转置矩阵
```

**Q2：处理非方阵时要注意什么？**
```markdown
必须创建新矩阵，因为旋转后维度会变化（m×n → n×m）
```

**Q3：如何优化空间复杂度？**
```markdown
对于方阵可使用原地旋转，非方阵必须使用额外空间
```

### 扩展应用

```markdown
1. 图像处理中的旋转操作
2. 矩阵运算中的基变换
3. 游戏开发中的精灵旋转
4. 数据结构转换（如稀疏矩阵存储）
```

**进阶思考**：
1. 如何实现任意角度的旋转？
2. 如何同时处理矩阵旋转和缩放？
3. 如何优化大规模矩阵的旋转性能？

