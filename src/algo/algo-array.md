以下是优化后的盛水最多容器问题的解法，包含多种实现方式和详细分析：

---
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




## 最接近的三数之和
### <font style="color:rgb(28, 31, 33);">内容描述</font>


```plain
给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

例如：

给定数组 nums = [-1, 2, 1, -4], 和 target = 1.

与 target 最接近的三个数和为 2. (-1 + 2 + 1 = 2).
```

## <font style="color:rgb(28, 31, 33);">解题方案</font>

#### <font style="color:rgb(28, 31, 33);">思路 1：时间复杂度: O(N^2) 空间复杂度: O(1)</font>

<font style="color:rgb(0, 0, 0);">这道题基本和3.6小节一样，所以解法思路相差不大。同样是固定一个元素，设定两个左右边界指针来进行循环。但是有一点需要注意：这道题最后的结果是一个数值，所以不需要处理重复元素。</font>

<font style="color:rgb(0, 0, 0);">因为这道题最后要我们返回的最接近的那个和，而不是所有的组合，因此我们不需要去管重复元素，所以这里我们可以相对于3.6小节放聪明些，在这里我不对思路做具体详述了，差别不大，简单说下代码的执行流程吧：</font>

+ <font style="color:rgb(28, 31, 33);">先把</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">nums</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">进行升序排序，这一步不用说；</font>
+ <font style="color:rgb(28, 31, 33);">获取左右边界索引，左边界 l ，右边界 r ；</font>
+ <font style="color:rgb(199, 37, 78);">nums[i]</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">固定，</font><font style="color:rgb(199, 37, 78);">while</font><font style="color:rgb(28, 31, 33);">循环使左右边界向中间移动；</font>
+ <font style="color:rgb(199, 37, 78);">temp</font><font style="color:rgb(28, 31, 33);">=</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">nums[i]</font><font style="color:rgb(28, 31, 33);">+</font><font style="color:rgb(199, 37, 78);">nums[l]</font><font style="color:rgb(28, 31, 33);">+</font><font style="color:rgb(199, 37, 78);">nums[r]</font><font style="color:rgb(28, 31, 33);">判断 temp 和 target 是否相等，相等直接返回 target，如果大了则右边界 r 向左移动，如果小了，左边界 l 向右移动。</font>

<font style="color:rgb(0, 0, 0);">下面来看下具体代码实现：</font>



```java
class Solution {
    public int threeSumClosest(int[] nums, int target) {
        int n = nums.length;
        // 通过内部 api 进行排序
        Arrays.sort(nums);
        int ret = 1<<30;
        // 通过固定 nums[i]、移动 nums[left] 以及 nums[right] 来逼近目标值 target
        for (int i = 0; i < n; i++) {
            int left = i + 1;
            int right = n - 1;
            while (left < right) {
                int temp = nums[i] + nums[left] + nums[right];
                if (Math.abs(ret - target) > Math.abs(temp - target)) {
                    ret = temp;
                }
                // temp 小于目标值 target 说明应该向由移动 left 指针，如果大于目标值 target 说明应该向左移动 right 指针
                if (temp <= target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return ret;
    }
}
```



### <font style="color:rgb(28, 31, 33);">小结</font>

<font style="color:rgb(0, 0, 0);">这道题和 3.5 小节其实很像，所以我直接把3.5小节的最优方法拿过来用了一下，算是偷了个懒。其实你在看到很类似的题目的时候也可以像我一样直接把模板拿过来用，有的题目相似到改两个参数就行了，毕竟人生苦短：）</font>

## 三数之和
### <font style="color:rgb(28, 31, 33);">内容描述</font>


```plain
给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。

例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

### <font style="color:rgb(28, 31, 33);">题目详解</font>

<font style="color:rgb(0, 0, 0);">首先看题目描述，我们知道这道题是要在数组</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">nums</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">中找到三个元素 a，b，c。并且a，b，c三个元素相加等于0，可以有负整数元素，并将符合条件的三个元素放进一个数组中。每一种符合条件的方案组成数组放进另一个数组中，最后返回的结果是一个二维数组，在这道题中我们要注意两点：</font>

+ <font style="color:rgb(199, 37, 78);">nums</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">中会出现重复的数字；</font>
+ <font style="color:rgb(28, 31, 33);">每一种组成方案只能出现一次。</font>

<font style="color:rgb(0, 0, 0);">了解这两点限制条件之后，我们来看下解题方案：</font>

## <font style="color:rgb(28, 31, 33);">解题方案</font>

#### <font style="color:rgb(28, 31, 33);">思路 1：时间复杂度: O(N^3) 空间复杂度: O(N)</font>

<font style="color:rgb(0, 0, 0);">这道题和我们做过的</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">两数相加</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">这道题很相似，两数相加的时候可以用双重循环来暴力地找出符合条件的组合，这道题只是把两数相加换成了三数相加，所以可以使用三重暴力循环来解这道题。</font>

<font style="color:rgb(0, 0, 0);">每一重循环都从</font><font style="color:rgb(199, 37, 78);">nums</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">中取出一个元素，如果三个元素相加等于 0，则将这三个元素放入数组</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">curRes</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">中。最后判断</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">curRes</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">是否在最后结果</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">res</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">中。如果不再说明此组合是第一次出现，并将</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">curRes</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">添加到</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">res</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">中去，如果在</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">res</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">中则不执行任何操作。</font>

<font style="color:rgb(0, 0, 0);">因为题目限制每一种组成方案只能出现一次，所以在做循环之前首先要对</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">nums</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">进行排序，因为数组</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">nums</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">中可以有重复元素的出现，如果不排序的话可能会造成组合方案的重复。而在进行排序之后可以限制这种情况的发生。下面我们来看代码：</font>





```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        int n = nums.length;
        // 将数组排序
        Arrays.sort(nums);
        List<List<Integer>> ret = new ArrayList<>();
        // 通过三层循环进行暴力搜索
        for (int i = 0; i < n; i++) {
            // 如果出现相同的值则跳过
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }
            for (int j = i + 1; j < n; j++) {
                // 如果出现相同的值则跳过
                if (j > i + 1 && nums[j] == nums[j - 1]) {
                    continue;
                }
                for (int k = j + 1; k < n; k++) {
                    // 如果出现相同的值则跳过
                    if (k > j + 1 && nums[k] == nums[k - 1]) {
                        continue;
                    }
                    // 如果三个数相加为 0，则是目标值集合
                    if (nums[i] + nums[j] + nums[k] == 0) {
                        List<Integer> temp = new ArrayList<>();
                        temp.add(nums[i]);
                        temp.add(nums[j]);
                        temp.add(nums[k]);
                        ret.add(temp);
                    }
                }
            }
        }
        return ret;
    }
}
```

<font style="color:rgb(0, 0, 0);">上面的代码就是这道题最暴力也是最简单的解法，直接三重循环取出每一种组合来尝试结果是否等于0。但是这样的解法如果你去 LeetCode 上进行提交的话是不会通过的，因为时间复杂度太高，也就是超时了。你可能会问：“我在测试程序的时候执行速度很快啊？”。但如果</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">nums</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">的长度是100,1000或者10,000呢？这种方法的执行速度还会很快吗？为了解决这个问题我们采用了一种更加高效的方式，下面来看思路2。</font>

#### <font style="color:rgb(28, 31, 33);">思路 2：时间复杂度: O(N^2) 空间复杂度: O(N)</font>

<font style="color:rgb(0, 0, 0);">为了解决思路1中时间复杂度太高的问题，我们在思路2中采用了一种全新的方法，暂时称它为左右边界方法吧。先来看一下大致的步骤：</font>

1. <font style="color:rgb(28, 31, 33);">获取</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">nums</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">的长度 n，将</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">nums</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">进行排序，排序的原因与思路1一致，并遍历</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">nums</font><font style="color:rgb(28, 31, 33);">；</font>
2. <font style="color:rgb(28, 31, 33);">获取左右边界索引，左边界 l 是</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">nums[i]</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">的下一个元素即索引是</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">i+1</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">，右边界 r 为最后一个元素即</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">n-1</font><font style="color:rgb(28, 31, 33);">；</font>
3. <font style="color:rgb(199, 37, 78);">nums[i]</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">固定，</font><font style="color:rgb(199, 37, 78);">while</font><font style="color:rgb(28, 31, 33);">循环使左右边界向中间移动；</font>
4. <font style="color:rgb(199, 37, 78);">temp</font><font style="color:rgb(28, 31, 33);">=</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">nums[i]</font><font style="color:rgb(28, 31, 33);">+</font><font style="color:rgb(199, 37, 78);">nums[l]</font><font style="color:rgb(28, 31, 33);">+</font><font style="color:rgb(199, 37, 78);">nums[r]</font><font style="color:rgb(28, 31, 33);">判断 temp 是否等于0；</font>
5. <font style="color:rgb(28, 31, 33);">如果</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">temp = 0</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">，则将</font><font style="color:rgb(199, 37, 78);">nums[i]</font><font style="color:rgb(28, 31, 33);">，</font><font style="color:rgb(199, 37, 78);">nums[l]</font><font style="color:rgb(28, 31, 33);">，</font><font style="color:rgb(199, 37, 78);">nums[r]</font><font style="color:rgb(28, 31, 33);">三个元素组成数组放入</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">res</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">中，如果 temp 大于 0，我们需要将右边界 r 向左移动取一个小一些的元素，如果 temp 小于0，则将 l 向右移动取一个大一些的元素重新组合尝试。</font>

<font style="color:rgb(0, 0, 0);">上面这种方法大大缓解了思路1超大的时间复杂度，下面我们来看下具体的代码：</font>



```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        int n = nums.length;
        // 将数组进行排序
        Arrays.sort(nums);
        List<List<Integer>> ret = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            // 如果出现相同的值则跳过
            if (i > 0 && nums[i] == nums[i - 1]) {
                continue;
            }
            // l 和 r 分别代表左右两个指针，实际上是双索引法的延申
            int l = i + 1;
            int r = n - 1;
            // 如果 l < r 说明还可以进行搜索满足条件的三个值
            while (l < r) {
                int temp = nums[i] + nums[l] + nums[r];
                if (temp == 0) {
                    // 如果 temp = 0 说明满足条件，可以添加到集合中
                    List<Integer> tempList = new ArrayList<>();
                    tempList.add(nums[i]);
                    tempList.add(nums[l]);
                    tempList.add(nums[r]);
                    ret.add(tempList);
                    // 满足条件就左右两个指针向中间靠拢
                    l++;
                    r--;
                    // l 右移的同时要排除重复的值
                    while (l < r && nums[l] == nums[l - 1]) {
                        l++;
                    }
                    // r 左移的同时要排除重复的值
                    while (l < r && nums[r] == nums[r + 1]) {
                        r--;
                    }
                } else if (temp > 0){
                    // temp > 0 说明需要更小的值，则右指针左移
                    r--;
                } else {
                    // temp < 0 说明需要更大的值，则左指针右移1
                    l++;
                }
            }
        }
        return ret;
    }
}
```



<font style="color:rgb(0, 0, 0);">上面的代码是经过我们优化后的，现在的时间复杂度是O(N^2)，你可以去 LeetCode 上提交一下试试，会获得一个不错的通过率。</font>

### <font style="color:rgb(28, 31, 33);">小结</font>

<font style="color:rgb(0, 0, 0);">这个小节的题目和我们之前做过的第一题很像，所以最暴力的解法和第一题一样，都是多重循环嵌套。但是很明显超时了，为了解决这个问题我们采用了左右边界的方法来解决这个问题，在左右边界方法中要注意元素重复的问题。可能比较难理解，可以把代码多敲几遍，这样你会越来越熟练。</font>

## 最长上升子序列1
# <font style="color:rgb(51, 51, 51);">题目描述</font>

给定一个长度为 n 的数组 arr，求它的最长严格上升子序列的长度。

最长上升子序列是指，在一个未经排序的数组中，找到一个最长的子序列（不必连续），使得这个子序列中的所有元素都严格按照升序排列。

所谓子序列，指一个数组删掉一些数（也可以不删）之后，形成的新数组。例如 [1,5,3,7,3] 数组，其子序列有：[1,3,3]、[7] 等。但 [1,6]、[1,3,5] 则不是它的子序列。

我们定义一个序列是 严格上升 的，当且仅当该序列不存在两个下标 i 和 j 满足 i<j 且 arr[i]≥arr[j]。

数据范围： 0≤n≤1000

要求：时间复杂度 O(n2)， 空间复杂度 O(n)



**<font style="color:rgb(51, 51, 51);">示例1</font>**

输入：[6,3,1,5,2,3,7]

返回值：4

说明：该数组最长上升子序列为 [1,2,3,7] ，长度为4

# 解法

使用动态规划

1. 创建数组dp，长度与arr数组长度相同，dp[i]表示前i个最长上升子序列的长度。
2. 初始化值为1，表示长度为1
3. 遍历数组，计算前 i 项最长上升子序列长度，并更新到 dp[i] 上面。

时间复杂度是O(n^2)

```java
class Solution {
    public int LIS(int[] arr) {
        if (arr == null || arr.length == 0) {
            return 0;
        }
        if (arr.length == 1) {
            return 1;
        }
        int[] dp = new int[arr.length];
        // 填充dp数组，所有值都为1
        Arrays.fill(dp, 1);
        int res = 0;
        for (int i = 1; i < arr.length; i++) {
            // 计算前 i 项最长上升子序列长度，并更新到 dp[i] 上面
            for (int j = 0; j < i; j++) {
                if (arr[j] < arr[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            res = Math.max(res, dp[i]);
        }
        return res;
    }

}
```

## 数组中超过半数的数字
给一个长度为 n 的数组，数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

例如输入一个长度为9的数组[1,2,3,2,2,2,5,4,2]。由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。

注意：给定的数组中一定存在满足要求的数字。

# 解法1

遍历数组，把当前值和当前值出现次数放到 HashMap 中，判断当前值出现次数，如果大于一半，就返回。

时间复杂度：O(n)

空间复杂度：O(n)

```java
public int MoreThanHalfNum_Solution(int[] array) {
    // 统计每个数字出现的次数
    HashMap<Integer, Integer> map = new HashMap<>();
    //遍历数组
    for (int i = 0; i < array.length; i++) {
        // 统计频率
        if (!map.containsKey(array[i])) {
            map.put(array[i], 1);
        } else {
            map.put(array[i], map.get(array[i]) + 1);
        }
        //一旦有个数大于长度一半的情况即可返回
        if (map.get(array[i]) > array.length / 2) {
            return array[i];
        }
    }
    return 0;
}
```

# 解法2

先将数组排序，出现次数超过数组长度一半的数字一定包含数组中间位置，只需返回数组中间位置的数字即可。

时间复杂度：O(nlogn)，使用快排

空间复杂度：O(1)

```java
public int MoreThanHalfNum_Solution(int[] array) {
    sort(array);
    return array[array.length / 2];
}
```

# 解法3

选出一个数作为 key（假设选第一个数），遍历数组，和 key 比较大小，如果相等，则出现次数加一，否则出现次数减一。如果次数为零，则替换 key。最后留下的 key 就是满足要求的数。

时间复杂度：O(n)

空间复杂度：O(1)

```java
public int MoreThanHalfNum_Solution(int[] array) {
    int key = array[0];
    int count = 1;
    for (int i = 1; i < array.length; i++) {
        if (key == array[i]) {
            count++;
        } else {
            count--;
            if (count == 0) {
                key = array[i + 1];
                count++;
            }
        }
    }
    return key;
}
```

## 合并两个有序数组
# 题目描述

给出一个有序的整数数组 A 和有序的整数数组 B ，请将数组 B 合并到数组 A 中，变成一个有序的升序数组。

注意：数组 A 有足够的空间存放数组 B

示例：

> 输入：[1,2,3],[2,5,6]
>
> 返回值：[1,2,2,3,5,6]

# 解法1

最容易想到的办法是，新建一个空数组 C，长度是数组 A 的元素数量加上数组 B 的元素数量。然后遍历数组 A 和数组 B，比较元素大小，放到数组 C 中，最后再把数组 C 赋值给数组 A。

**复杂度分析：**

**时间复杂度：**O(m+n)。两个数组长度之和。

**空间复杂度：**O(m+n)。需要申请额外的空间存储合并后结果。

```java
public void merge(int[] A, int m, int[] B, int n) {
    // 如果数组 B 为空，无需处理
    if (n == 0) {
        return;
    }
    // 如果数组 A 为空，直接把数组 B 赋值给数组 A
    if (m == 0) {
        for (int i = 0; i < n; i++) {
            A[i] = B[i];
        }
        return;
    }
    // 新建一个数组C，存储合并后结果
    int[] C = new int[m + n];
    int i = 0, j = 0, k = 0;
    while (i < m && j < n) {
        C[k++] = A[i] <= B[j] ? A[i++] : B[j++];
    }

    // 考虑到数组 A 有剩余的情况
    while (i < m) {
        C[k++] = A[i++];
    }
    // 考虑到数组 B 有剩余的情况
    while (j < n) {
        C[k++] = B[j++];
    }
    
    // 把合并的结果赋值给数组 A
    for (int p = 0; p < m + n; p++) {
        A[p] = C[p];
    }
}
```

# 解法2

由于我们已经知道了数组 A 和数组 B 的有效元素个数，最终的目的是把数组 B 的元素放到数组 A 中，我们可以从两个数组中最大的元素开始比较，放入位置是 A[m+n-1]，然后从后往前放。

**复杂度分析：**

**时间复杂度：**O(m+n)。两个数组长度之和。

**空间复杂度：**O(m+n)。没有申请额外的空间，不过利用了数组 A 的空间。

```java
public void merge(int A[], int m, int B[], int n) {
    int i = m - 1;
    int j = n - 1;
    int k = m + n - 1;
    // 判断数组B中的元素是否移动完成
    while (j >= 0) {
        if (i >= 0) {
            A[k--] = A[i] > B[j] ? A[i--] : B[j--];
        } else {
            // 如果数组B中还有剩余
            A[k--] = B[j--];
        }

    }
}
```

## 最长公共前缀
# 题目描述

给定一个的字符串数组 strs  , 编写一个函数来查找字符串数组中的最长公共前缀，返回这个公共前缀。

示例1

> 输入: ["flower","flow","flight"]
>
> 返回: "fl"

示例2

> 输入: ["dog","racecar","car"]
>
> 输出: ""
>
> 说明: 不存在公共前缀。

# 解法1

比较容易想到的办法是，先计算数组中前两个字符串的最长公共前缀，算出的结果再与第三个字符串比较，依次向下比较，直到遍历完整个数组，或者计算出的最长公共前缀是空为止。

**复杂度分析：**

时间复杂度：O(m*n)。m 是字符串的平均长度，n 是数组长度。

空间复杂度：O(1)。常数的空间。

```java
public String longestCommonPrefix(String[] strs) {
    // 判空
    if (strs == null || strs.length == 0) {
        return "";
    }
    // 从第一个字符串开始，循环比较
    String prefix = strs[0];
    for (int i = 1; i < strs.length; i++) {
        prefix = getCommonPrefix(prefix, strs[i]);
        // 最长公共前缀是空，就结束
        if (prefix.length() == 0) {
            return "";
        }
    }
    return prefix;
}

// 返回两个字符串的最长公共前缀
public String getCommonPrefix(String s1, String s2) {
    int index = 0;
    while (index < s1.length() && index < s2.length()
            && s1.charAt(index) == s2.charAt(index)) {
        index++;
    }
    return s1.substring(0, index);
}
```

# 解法2

我们也可以假设数组中第一个字符串是整个数组的最长公共前缀，然后遍历数组，比较第一个字符串中的每个字符是否符合要求。

**复杂度分析：**

时间复杂度：O(m*n)。m 是字符串的平均长度，n 是数组长度。

空间复杂度：O(1)。常数的空间。

```java
public String longestCommonPrefix(String[] strs) {
    // 判空
    if (strs == null || strs.length == 0) {
        return "";
    }
    
    // 遍历第一个字符串，校验每个字符是否符合要求
    for (int i = 0; i < strs[0].length(); i++) {
        // 取出第一个字符串的字符
        char firstChar = strs[0].charAt(i);
        // 遍历数组，校验每个字符是否符合要求
        for (int j = 1; j < strs.length; j++) {
            if (strs[j].length() == i || strs[j].charAt(i) != firstChar) {
                return strs[0].substring(0, i);
            }
        }
    }
    // 全部符合要求
    return strs[0];
}
```

## 两数之和
# <font style="color:rgb(28, 31, 33);">题目描述</font>

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9

所以返回 [0, 1]

# <font style="color:rgb(28, 31, 33);">解法1</font>

暴力破解，使用两层 for 循环，计算数组中任意两个数值之和，然后跟 target 比较，如果相等，返回两数下标。

**复杂度分析：**

+ 时间复杂度：O(n^2) 遍历两次数组
+ 空间复杂度：O(1) 未申请额外空间

```java
public int[] twoSum(int[] nums, int target) {
    for (int i = 0; i < nums.length - 1; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[]{i, j};
            }
        }
    }
    return null;
}
```

# 解法2

使用 HashMap 降低时间复杂度，key 是数组的值，value 是数组下标。

遍历数组，同时判断 HashMap 中是否存在 （target - 当前值），如果存在，则返回 HashMap 中的数组下标和当前值下标。如果不存在，则把当前值和当前下标放入 HashMap。

用空间换时间。

**复杂度分析：**

+ 时间复杂度：O(n) 遍历一次数组，一次hash索引查找时间复杂度是 O(1)
+ 空间复杂度：O(n) 申请了额外的 HashMap 空间

```java
public int[] twoSum(int[] numbers, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    // 遍历数组
    for (int i = 0; i < numbers.length; i++) {
        // 判断 map 中是否包含（target - 当前值），如果包含则返回下标，不包含则放入 map 中
        if (map.containsKey(target - numbers[i])) {
            return new int[]{map.get(target - numbers[i]), i};
        } else {
            map.put(numbers[i], i);
        }
    }
    return null;
}
```

## 小于n的最大数
# 题目描述

给定一个数n如23121；给定一组数字集合如[2 4 9]

求由集合中元素组成的小于n的最大数



示例 1：

输入：n = 23121, nums=[2,4,9]

输出：22999



示例 2：

输入：n = 23121, nums=[9,8,7]

输出：9999

# 解法

```java
import org.apache.commons.lang3.StringUtils;
import java.util.TreeSet;

public class Solution {
    public static String findMaxNumber(int n, int[] nums) {
        // 将输入的数字集合转换成TreeSet，并从小到大排序
        TreeSet<Integer> digits = new TreeSet<>();
        for (int num : nums) {
            digits.add(num);
        }

        // 将目标数字转换为字符数组，以便逐位处理
        char[] nChars = String.valueOf(n).toCharArray();
        StringBuilder result = new StringBuilder();

        // 标志用于表示我们是否需要构造一个完全小于n的数字
        boolean needSmaller = false;

        for (char nChar : nChars) {
            int currentDigit = nChar - '0';

            // 如果已经确定要构造比n小的数字，直接用集合中最大的数字
            if (needSmaller) {
                result.append(digits.last());
                continue;
            }

            // 寻找集合中小于或等于当前位的最大数字
            Integer replacement = digits.floor(currentDigit);

            // 如果没有找到小于或等于当前位的数字，或者与当前值不同，开始构造小于n的数字
            if (replacement == null || !replacement.equals(currentDigit)) {
                needSmaller = true;
            }

            // 如果无法找到小于当前位的数字，则移至上一位，后续全用最大数字填充
            if (replacement == null) {
                int j = result.length() - 1;
                while (j >= 0 && result.charAt(j) == (char) (digits.first() + '0')) {
                    j--;
                }
                if (j >= 0) {
                    result.setCharAt(j, (char) (digits.lower(result.charAt(j) - '0') + '0'));
                    result.setLength(j + 1);
                } else {
                    return StringUtils.repeat(String.valueOf(digits.last()),nChars.length - 1);
                }
                result.append(StringUtils.repeat(String.valueOf(digits.last()),nChars.length - result.length()));
                break;
            }

            result.append(replacement);
        }

        return result.toString();
    }

    public static void main(String[] args) {
        int n1 = 23121;
        int[] nums1 = {2, 4, 9};
        System.out.println("示例 1 输出：" + findMaxNumber(n1, nums1)); // 输出：22999

        int n2 = 23121;
        int[] nums2 = {9, 8, 7};
        System.out.println("示例 2 输出：" + findMaxNumber(n2, nums2)); // 输出：9999
    }
}
```

## 翻转数组找最大长度
# 题目描述

使用Java编写，给定一个二进制数组 nums 和一个整数 k，如果可以翻转最多k个0，则返回数组中连续1的最大个数 。



示例 1：

输入：nums = [1,1,1,0,0,0,1,1,1,1,0], K = 2 输出：6 解释：[1,1,1,0,0,1,1,1,1,1,1] 数字从 0 翻转到 1，最长的子数组长度为 6。



示例 2：

输入：nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3 输出：10 解释：[0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1] 数字从 0 翻转到 1，最长的子数组长度为 10。



提示：

当nums非空时，nums[i] 不是 0 就是 1

k >=0

# 解法

可以使用滑动窗口（Sliding Window）的方法来寻找在翻转最多 k 个 0 后可得到的最长连续1序列。基本思路是使用两个指针left和right表示窗口的左右边界，遍历数组并维持窗口内最多包含k个0。如果窗口内的0超过了k个，就移动左指针left直到窗口内的0的数量重新不超过k个。

```java
public class MaxConsecutiveOnes {
    public static int longestOnes(int[] nums, int k) {
        int left = 0, right;
        int zeroCount = 0;  // 记录窗口内0的数量
        int maxOnes = 0;    // 记录最大连续1的数量

        for (right = 0; right < nums.length; right++) {
            if (nums[right] == 0) {
                zeroCount++;  // 窗口内0的数量增加
            }

            // 如果0的数量超过k，需要移动左指针直到0的数量不超过k
            while (zeroCount > k) {
                if (nums[left] == 0) {
                    zeroCount--;
                }
                left++;
            }

            // 更新最大连续1的数量
            maxOnes = Math.max(maxOnes, right - left + 1);
        }

        return maxOnes;
    }

    public static void main(String[] args) {
        int[] nums1 = {1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0};
        int k1 = 2;
        System.out.println("Output: " + longestOnes(nums1, k1));  // Expected: 6

        int[] nums2 = {0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1};
        int k2 = 3;
        System.out.println("Output: " + longestOnes(nums2, k2));  // Expected: 10
    }
}

```

## 最长子数组之和
## 题目描述

乱序数组中，输出和最大的子数组

示例：

比如[-6, 1,5,-3,4,-7,5] 最大和为7，子数组为 [1,5,-3,4]

## 解法

使用 Kadane 算法。Kadane 算法是一种动态规划的方法，它可以在一次遍历中找到具有最大和的连续子数组。

```java
public class MaxSubarraySum {

    public static int[] findMaxSumSubarray(int[] arr) {
        // 如果数组为空，返回空数组
        if (arr == null || arr.length == 0) {
            return new int[0]; 
        }

        // 保存当前遍历位置的最大子数组和
        int maxCurrent = arr[0];
        // 保存遍历到目前为止找到的最大子数组和
        int maxGlobal = arr[0];
        int start = 0;
        int end = 0;
        int tempStart = 0;

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > maxCurrent + arr[i]) {
                maxCurrent = arr[i];
                tempStart = i;
            } else {
                maxCurrent = maxCurrent + arr[i];
            }

            if (maxCurrent > maxGlobal) {
                maxGlobal = maxCurrent;
                start = tempStart;
                end = i;
            }
        }

        // 提取子数组
        int[] subarray = new int[end - start + 1];
        System.arraycopy(arr, start, subarray, 0, subarray.length);
        return subarray;
    }

    public static void main(String[] args) {
        int[] arr = {-6, 1, 5, -3, 4, -7, 5};
        int[] result = findMaxSumSubarray(arr);
        System.out.print("The subarray with the maximum sum is: [");
        for (int i = 0; i < result.length; i++) {
            System.out.print(result[i] + (i < result.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}

```

性能分析：

时间复杂度：O(n)，其中 n 是数组的长度，因为数组只被遍历了一次。

空间复杂度：O(1)，不包括输出子数组所需的空间，算法本身只使用了固定数量的额外空间。如果包含输出数组，则为 O(k)，k 是输出数组的长度。

## 二分查找
# 题目描述

请实现无重复数字的升序数组的二分查找

给定一个 元素升序的、无重复数字的整型数组 nums 和一个目标值 target ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标（下标从 0 开始），否则返回 -1。

示例：

> 输入：[0,1,3,4,6,7,9],6
>
> 返回 5
>
> 说明：6在数组中下标是5

实现思路：

1. 找到数组中间位置
2. 把数组的中点值与 target 进行比较，如果相等，直接返回中点值下标。如果中点值较大，说明目标值在数组前半部分。如果中点值较小，说明目标值在数组的后半部分。
3. 继续循环计算中点值，并与 target 进行比较，直到首尾相等。

```java
public int search(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    // 从数组首尾开始，直到二者相遇
    while (left <= right) {
        // 每次检查中点的值
        int mid = (left + right) / 2;
        if (nums[mid] == target) {
            return mid;
        }
        // 进入左的区间
        if (nums[mid] > target) {
            right = mid - 1;
        } else {
            //进入右区间
            left = mid + 1;
        }
    }
    // 未找到
    return -1;
}
```

## 数字全排列
## 题目描述

给出一组可能包含重复项的数字，返回该组数字的所有排列。结果以字典序升序排列。

示例：

输入：

[1,1,2]

返回值：

[[1,1,2],[1,2,1],[2,1,1]]

## 解法

可以采用递归回溯算法，并在生成排列时使用排序和跳过重复项的策略。

流程：

1. 递归回溯方法，用于生成所有排列。
2. 终止条件是当前排列 current 的大小等于输入数组的长度，将当前排列加入结果列表。
3. 遍历输入数组，如果当前元素已经使用，或者当前元素与前一个元素相同且前一个元素已经使用过，则跳过当前元素。
4. 否则，将当前元素添加到当前排列，并标记为已使用，进行下一层递归。
5. 递归完成后，移除当前元素，并将其标记为未使用，回溯到上一步。

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PermutationsWithDuplicates {

    public static List<List<Integer>> permuteUnique(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        // 将数组排序，以便按字典序生成排列
        Arrays.sort(nums); 
        // 用于标记元素是否已经在当前排列中使用
        boolean[] used = new boolean[nums.length];
        // 用于存储当前的排列
        List<Integer> current = new ArrayList<>();
        backtrack(nums, used, current, result);
        return result;
    }

    private static void backtrack(int[] nums, boolean[] used, List<Integer> current, List<List<Integer>> result) {
        if (current.size() == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }
        
        for (int i = 0; i < nums.length; i++) {
            // 如果当前数字已经使用，或者当前数字与前一个数字相同且前一个数字已经使用过
            if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) {
                continue;
            }
            used[i] = true;
            current.add(nums[i]);
            backtrack(nums, used, current, result);
            current.remove(current.size() - 1);
            used[i] = false;
        }
    }

    public static void main(String[] args) {
        int[] nums = {1, 1, 2};
        List<List<Integer>> permutations = permuteUnique(nums);
        for (List<Integer> permutation : permutations) {
            System.out.println(permutation);
        }
    }
}

```

## 旋转矩阵
## 题目描述

给定一个二维数组，要求逆时针旋转90度。

原数组

1   2    3    4

5   6   7    8

9  10   11  12

旋转后的数组

4   8   12

3   7   11

2   6   10

1   5   9

## 解法

1. 先整体转置矩阵，通过交换matrix[i][j]和matrix[j][i]实现，行变为列，列变为行。
2. 垂直翻转矩阵，每一列的上半部分元素与下半部分交换。

```java
public class RotateMatrix {
    public static int[][] rotate(int[][] matrix) {
        int n = matrix.length;
        int m = matrix[0].length;

        // 先转置矩阵
        int[][] transposedMatrix = new int[m][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                transposedMatrix[j][i] = matrix[i][j];
            }
        }

        // 再垂直翻转矩阵
        for (int i = 0; i < m/2; i++) {
            for (int j = 0; j < n; j++) {
                int temp = transposedMatrix[i][j];
                transposedMatrix[i][j] = transposedMatrix[m-1-i][j];
                transposedMatrix[m-1-i][j] = temp;
            }
        }
        return transposedMatrix;
    }

    public static void printMatrix(int[][] matrix) {
        for (int[] row : matrix) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3, 4},
            {5, 6, 7, 8},
            {9, 10, 11, 12}
        };

        System.out.println("Original Matrix:");
        printMatrix(matrix);

        System.out.println("Rotated Matrix:");
        rotate(matrix);
    }
}

```



