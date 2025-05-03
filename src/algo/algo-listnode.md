## 两两交换链表节点

**题目描述**

```markdown
给定一个链表，两两交换其中相邻的节点，并实际交换节点而非仅修改值。

示例：
输入：1->2->3->4
输出：2->1->4->3

要求：
1. 不能修改节点内部值
2. 需实际交换节点位置
3. 处理链表长度奇偶情况
```

解题思路

```markdown
核心操作：
1. 交换相邻两个节点的指向关系
2. 维护前驱节点与后续链表的连接
3. 处理边界条件（空链表、单节点链表）

方法选择：
1. 递归法：直观但空间复杂度高
2. 迭代法：节省空间，推荐使用
```

关键步骤

```markdown
迭代法要点：
1. 使用哑节点(dummy)简化头节点处理
2. 维护三个指针：
   - pre：当前对的前驱节点
   - first：当前对的第一个节点
   - second：当前对的第二个节点
3. 四步交换操作：
   - first指向second.next
   - second指向first
   - pre指向second
   - pre移动到新的位置
```

标准实现（迭代法）

```java
class Solution {
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode pre = dummy;
        
        while (pre.next != null && pre.next.next != null) {
            ListNode first = pre.next;
            ListNode second = first.next;
            
            // 执行交换
            first.next = second.next;
            second.next = first;
            pre.next = second;
            
            // 移动pre指针
            pre = first;
        }
        
        return dummy.next;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 遍历链表一次
空间复杂度：O(1) - 只使用常数空间
```

## 递归实现

```java
class Solution {
    public ListNode swapPairs(ListNode head) {
        // 递归终止条件
        if (head == null || head.next == null) {
            return head;
        }
        
        ListNode newHead = head.next;
        head.next = swapPairs(newHead.next);
        newHead.next = head;
        
        return newHead;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点处理一次
空间复杂度：O(n) - 递归调用栈深度
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 偶数长度测试
    ListNode test1 = buildList(new int[]{1,2,3,4});
    printList(solution.swapPairs(test1)); // 2->1->4->3
    
    // 奇数长度测试
    ListNode test2 = buildList(new int[]{1,2,3});
    printList(solution.swapPairs(test2)); // 2->1->3
    
    // 边界测试
    ListNode test3 = buildList(new int[]{1});
    printList(solution.swapPairs(test3)); // 1
    
    ListNode test4 = buildList(new int[]{});
    printList(solution.swapPairs(test4)); // null
}

// 辅助方法：构建链表
private static ListNode buildList(int[] nums) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int num : nums) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}

// 辅助方法：打印链表
private static void printList(ListNode head) {
    while (head != null) {
        System.out.print(head.val + (head.next != null ? "->" : ""));
        head = head.next;
    }
    System.out.println();
}
```

方法比较

| 方法     | 优点               | 缺点               | 适用场景           |
|----------|--------------------|--------------------|--------------------|
| 迭代法   | 空间效率高         | 指针操作稍复杂     | 生产环境首选       |
| 递归法   | 代码简洁直观       | 栈空间消耗大       | 理解算法原理       |

常见问题解答

**Q1：为什么需要哑节点？**
```markdown
哑节点统一了头节点和其他节点的处理逻辑，避免单独处理头节点交换的特殊情况
```

**Q2：如何处理奇数长度链表？**
```markdown
当剩余单个节点时，循环条件 pre.next.next != null 会自动终止，最后一个节点保持原状
```

**Q3：递归法的空间消耗在哪里？**
```markdown
每次递归调用都需要保存当前函数栈帧，递归深度为n/2，故空间复杂度O(n)
```

可视化示例

```
初始链表：dummy -> 1 -> 2 -> 3 -> 4

第一轮交换：
1. first = 1, second = 2
2. 1.next = 3
3. 2.next = 1
4. dummy.next = 2
结果：dummy -> 2 -> 1 -> 3 -> 4

第二轮交换：
1. first = 3, second = 4
2. 3.next = null
3. 4.next = 3
4. 1.next = 4
结果：dummy -> 2 -> 1 -> 4 -> 3
```

**扩展思考**：
1. 如何实现三三交换链表节点？
2. 如何实现K个一组翻转链表？
3. 如何在交换节点时同时记录交换次数？


## 删除链表的倒数第N个节点

**题目描述**

```markdown
给定一个链表，删除链表的倒数第n个节点，并返回头节点。

示例：
输入：1->2->3->4->5, n=2
输出：1->2->3->5

约束条件：
1. 给定的n保证有效
2. 要求一趟扫描实现（进阶要求）
```

解题思路

```markdown
双指针法（快慢指针）：
1. 快指针先移动n步
2. 快慢指针同步移动直到快指针到达末尾
3. 此时慢指针指向待删除节点的前驱
4. 使用哑节点简化头节点删除情况
```

关键步骤

```markdown
1. 初始化哑节点和快慢指针
2. 快指针先行n步
3. 同步移动直到快指针到末尾
4. 删除慢指针的下一个节点
5. 处理边界条件（删除头节点）
```

标准实现（双指针法）

```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy;
        ListNode slow = dummy;
        
        // 快指针先走n步
        for (int i = 0; i < n; i++) {
            fast = fast.next;
        }
        
        // 同步移动直到快指针到末尾
        while (fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }
        
        // 删除节点
        slow.next = slow.next.next;
        return dummy.next;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(L) - 只需遍历链表一次
空间复杂度：O(1) - 只使用常数空间
```

替代解法：计算长度法

```java
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        int length = 0;
        ListNode curr = head;
        
        // 计算链表长度
        while (curr != null) {
            length++;
            curr = curr.next;
        }
        
        // 处理删除头节点情况
        if (n == length) {
            return head.next;
        }
        
        // 找到待删除节点的前驱
        curr = head;
        for (int i = 1; i < length - n; i++) {
            curr = curr.next;
        }
        
        // 删除节点
        curr.next = curr.next.next;
        return head;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(L) - 需要遍历链表两次
空间复杂度：O(1) - 只使用常数空间
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 常规测试
    ListNode test1 = buildList(new int[]{1,2,3,4,5});
    printList(solution.removeNthFromEnd(test1, 2)); // 1->2->3->5
    
    // 删除头节点
    ListNode test2 = buildList(new int[]{1,2});
    printList(solution.removeNthFromEnd(test2, 2)); // 2
    
    // 删除尾节点
    ListNode test3 = buildList(new int[]{1,2,3});
    printList(solution.removeNthFromEnd(test3, 1)); // 1->2
    
    // 单节点链表
    ListNode test4 = buildList(new int[]{1});
    printList(solution.removeNthFromEnd(test4, 1)); // null
}

// 辅助方法：构建链表
private static ListNode buildList(int[] nums) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int num : nums) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}

// 辅助方法：打印链表
private static void printList(ListNode head) {
    while (head != null) {
        System.out.print(head.val + (head.next != null ? "->" : ""));
        head = head.next;
    }
    System.out.println();
}
```

方法比较

| 方法         | 优点               | 缺点               | 适用场景           |
|--------------|--------------------|--------------------|--------------------|
| 双指针法     | 一趟扫描，效率高   | 逻辑稍复杂         | 推荐使用           |
| 计算长度法   | 直观易懂           | 需要两次遍历       | 理解算法原理       |

常见问题解答

**Q1：为什么需要哑节点？**
```markdown
哑节点统一了删除头节点和其他节点的处理逻辑，避免特殊判断
```

**Q2：如何处理n等于链表长度的情况？**
```markdown
此时快指针直接走到末尾，慢指针保持不动，自然处理了删除头节点的情况
```

**Q3：为什么快指针要先走n步？**
```markdown
这样当快指针到达末尾时，慢指针刚好指向倒数第n个节点的前驱节点
```

算法可视化

```
初始链表：dummy -> 1 -> 2 -> 3 -> 4 -> 5, n=2

步骤1：快指针先走2步
fast: 1 -> 2
slow: dummy

步骤2：同步移动
fast: 2 -> 3 -> 4 -> 5
slow: dummy -> 1 -> 2 -> 3

步骤3：删除操作
slow.next = slow.next.next
结果：dummy -> 1 -> 2 -> 3 -> 5
```

**扩展思考**：
1. 如何删除倒数第n个节点并返回被删除的节点？
2. 如何实现双向链表的类似操作？
3. 如何处理n可能无效的情况？


## K个一组翻转链表

**题目描述**

```markdown
给定一个链表，每k个节点一组进行翻转，返回翻转后的链表。
如果节点总数不是k的整数倍，最后剩余的节点保持原有顺序。

示例：
输入：1->2->3->4->5
k=2时输出：2->1->4->3->5
k=3时输出：3->2->1->4->5

限制：
1. 不能修改节点值，只能改变节点指向
2. 常数级空间复杂度（进阶要求）
```

解题思路

```markdown
核心操作：
1. 分组检测：确定每组k个节点的边界
2. 组内翻转：反转当前k个节点的顺序
3. 组间连接：将翻转后的子链表正确连接

关键点：
- 使用哨兵节点简化头节点处理
- 维护四个关键指针：
  * pre：上一组的尾节点
  * start：当前组的首节点
  * end：当前组的尾节点
  * next：下一组的首节点
```

标准实现（指针调整法）

```java
class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode pre = dummy;
        ListNode end = dummy;

        while (end.next != null) {
            // 定位当前组的尾节点
            for (int i = 0; i < k && end != null; i++) {
                end = end.next;
            }
            if (end == null) break;
            
            // 记录关键节点
            ListNode start = pre.next;
            ListNode next = end.next;
            
            // 断开当前组
            end.next = null;
            
            // 翻转当前组并连接
            pre.next = reverse(start);
            start.next = next;
            
            // 重置指针
            pre = start;
            end = pre;
        }
        return dummy.next;
    }

    // 辅助方法：翻转链表
    private ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点被处理两次（分组检测和翻转）
空间复杂度：O(1) - 只使用常数空间
```

替代解法（栈实现）

```java
class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        Deque<ListNode> stack = new ArrayDeque<>();
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        
        while (true) {
            int count = 0;
            ListNode curr = head;
            
            // 压入k个节点
            while (curr != null && count < k) {
                stack.push(curr);
                curr = curr.next;
                count++;
            }
            
            // 不足k个时保持原样
            if (count != k) {
                tail.next = head;
                break;
            }
            
            // 弹出k个节点实现翻转
            while (!stack.isEmpty()) {
                tail.next = stack.pop();
                tail = tail.next;
            }
            tail.next = curr;
            head = curr;
        }
        return dummy.next;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点入栈出栈各一次
空间复杂度：O(k) - 栈空间消耗
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 常规测试
    ListNode test1 = buildList(new int[]{1,2,3,4,5});
    printList(solution.reverseKGroup(test1, 2)); // 2->1->4->3->5
    
    // 边界测试
    ListNode test2 = buildList(new int[]{1});
    printList(solution.reverseKGroup(test2, 1)); // 1
    
    // 不足k的测试
    ListNode test3 = buildList(new int[]{1,2,3,4});
    printList(solution.reverseKGroup(test3, 3)); // 3->2->1->4
    
    // k等于长度
    ListNode test4 = buildList(new int[]{1,2,3});
    printList(solution.reverseKGroup(test4, 3)); // 3->2->1
}

// 辅助方法：构建链表
private static ListNode buildList(int[] nums) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int num : nums) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}

// 辅助方法：打印链表
private static void printList(ListNode head) {
    while (head != null) {
        System.out.print(head.val + (head.next != null ? "->" : ""));
        head = head.next;
    }
    System.out.println();
}
```

方法比较

| 方法         | 优点               | 缺点               | 适用场景           |
|--------------|--------------------|--------------------|--------------------|
| 指针调整法   | 空间效率高         | 指针操作较复杂     | 推荐使用           |
| 栈实现       | 逻辑简单直观       | 需要额外O(k)空间   | 理解算法原理       |

常见问题解答

**Q1：如何确定分组边界？**
```markdown
通过循环移动end指针k次，若提前遇到null说明不足k个
```

**Q2：为什么需要断开当前组？**
```markdown
断开后可以独立翻转当前组，避免影响后续节点
```

**Q3：翻转后如何保证组间连接？**
```markdown
通过pre指针连接已处理部分，start指针连接未处理部分
```

算法可视化

```
初始链表：dummy -> 1 -> 2 -> 3 -> 4 -> 5, k=2

第一组处理：
1. 定位end到2
2. 断开：dummy->1->2 | 3->4->5
3. 翻转1->2得到2->1
4. 连接：dummy->2->1->3->4->5
5. 移动pre到1

第二组处理：
1. 定位end到4
2. 断开：1->3->4 | 5
3. 翻转3->4得到4->3
4. 连接：2->1->4->3->5
```

**扩展思考**：
1. 如何实现从尾到头k组翻转？
2. 如何同时记录每组翻转的次数？
3. 如何优化大k值情况下的性能？


## 返回链表最后K个节点

**题目描述**

```markdown
给定一个链表，返回链表中最后k个节点组成的链表。
如果链表长度小于k，则返回空链表。

示例1：
输入：1->2->3->4->5, k=2
输出：4->5

示例2：
输入：2->NULL, k=8
输出：NULL

要求：
1. 不能修改原链表
2. 常数空间复杂度（进阶要求）
```

解题思路

```markdown
双指针法（快慢指针）：
1. 快指针先移动k步
2. 快慢指针同步移动直到快指针到达末尾
3. 此时慢指针指向倒数第k个节点
4. 返回从慢指针开始的子链表

边界处理：
- 空链表直接返回
- k=0时返回空
- k大于链表长度时返回空
```

标准实现（双指针法）

```java
public class Solution {
    public ListNode getLastKNodes(ListNode head, int k) {
        // 处理边界条件
        if (head == null || k <= 0) {
            return null;
        }

        ListNode fast = head;
        ListNode slow = head;
        
        // 快指针先走k步
        for (int i = 0; i < k; i++) {
            if (fast == null) {
                return null; // k大于链表长度
            }
            fast = fast.next;
        }
        
        // 同步移动直到快指针到末尾
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }
        
        return slow;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 只需遍历链表一次
空间复杂度：O(1) - 只使用常数空间
```

替代解法（计算长度法）

```java
public class Solution {
    public ListNode getLastKNodes(ListNode head, int k) {
        if (head == null || k <= 0) {
            return null;
        }
        
        // 计算链表长度
        int length = 0;
        ListNode curr = head;
        while (curr != null) {
            length++;
            curr = curr.next;
        }
        
        // 检查k是否合法
        if (k > length) {
            return null;
        }
        
        // 定位到倒数第k个节点
        curr = head;
        for (int i = 0; i < length - k; i++) {
            curr = curr.next;
        }
        
        return curr;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 需要遍历链表两次
空间复杂度：O(1) - 只使用常数空间
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 常规测试
    ListNode test1 = buildList(new int[]{1,2,3,4,5});
    printList(solution.getLastKNodes(test1, 2)); // 4->5
    
    // 边界测试
    ListNode test2 = buildList(new int[]{2});
    printList(solution.getLastKNodes(test2, 8)); // null
    
    // k等于长度
    ListNode test3 = buildList(new int[]{1,2,3});
    printList(solution.getLastKNodes(test3, 3)); // 1->2->3
    
    // k=0测试
    ListNode test4 = buildList(new int[]{1,2,3});
    printList(solution.getLastKNodes(test4, 0)); // null
}

// 辅助方法：构建链表
private static ListNode buildList(int[] nums) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int num : nums) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}

// 辅助方法：打印链表
private static void printList(ListNode head) {
    if (head == null) {
        System.out.println("NULL");
        return;
    }
    while (head != null) {
        System.out.print(head.val + (head.next != null ? "->" : ""));
        head = head.next;
    }
    System.out.println();
}
```

方法比较

| 方法         | 优点               | 缺点               | 适用场景           |
|--------------|--------------------|--------------------|--------------------|
| 双指针法     | 一趟扫描，效率高   | 逻辑稍复杂         | 推荐使用           |
| 计算长度法   | 直观易懂           | 需要两次遍历       | 理解算法原理       |

常见问题解答

**Q1：为什么快指针要先走k步？**
```markdown
这样当快指针到达末尾时，慢指针刚好落后k步，指向倒数第k个节点
```

**Q2：如何处理k大于链表长度的情况？**
```markdown
快指针在先行移动时会提前到达null，此时直接返回null
```

**Q3：两种方法哪种更好？**
```markdown
双指针法更优，虽然两种方法时间复杂度都是O(n)，但双指针法只需遍历一次
```

算法可视化

```
链表：1->2->3->4->5, k=2

步骤1：快指针先走2步
fast: 1 -> 2 -> 3
slow: 1

步骤2：同步移动
fast: 3 -> 4 -> 5 -> null
slow: 1 -> 2 -> 3 -> 4

结果：从slow(4)开始的子链表：4->5
```

**扩展思考**：
1. 如何返回最后k个节点的同时保留原链表？
2. 如何实现双向链表的类似操作？
3. 如何优化处理超大k值的情况？


## 删除有序链表中的重复元素 II

**题目描述**

```markdown
给定一个升序排列的链表，删除所有含有重复数字的节点，只保留原始链表中没有重复出现的数字。

示例1：
输入：1->1->2
输出：2

示例2：
输入：1->1->2->3->3->3->5
输出：2->5

要求：
1. 链表已按升序排列
2. 时间复杂度O(n)
3. 空间复杂度O(1)
```

解题思路

```markdown
双指针法：
1. 使用哑节点(dummy)简化头节点删除操作
2. 维护两个指针：
   - pre：指向当前确定不重复的节点
   - curr：用于遍历检查重复
3. 当发现重复节点时，跳过所有相同值的节点
4. 未发现重复时正常移动指针
```

关键步骤

```markdown
1. 创建哑节点并初始化指针
2. 比较相邻节点值：
   - 发现重复：记录重复值并跳过所有该值节点
   - 未发现重复：移动pre指针
3. 始终维护pre.next到curr的链表关系
4. 处理尾部可能的重复情况
```

标准实现

```java
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode pre = dummy;
        ListNode curr = head;
        
        while (curr != null) {
            // 跳过所有重复节点
            while (curr.next != null && curr.val == curr.next.val) {
                curr = curr.next;
            }
            
            // 判断是否有重复
            if (pre.next == curr) {
                // 无重复，移动pre
                pre = pre.next;
            } else {
                // 有重复，跳过所有重复节点
                pre.next = curr.next;
            }
            
            curr = curr.next;
        }
        
        return dummy.next;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 只需遍历链表一次
空间复杂度：O(1) - 只使用常数空间
```

替代解法（标记法）

```java
class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode pre = dummy;
        ListNode curr = head;
        
        while (curr != null) {
            boolean duplicate = false;
            
            // 检查当前节点是否重复
            while (curr.next != null && curr.val == curr.next.val) {
                curr = curr.next;
                duplicate = true;
            }
            
            if (duplicate) {
                // 跳过重复节点
                pre.next = curr.next;
            } else {
                // 保留不重复节点
                pre = curr;
            }
            
            curr = curr.next;
        }
        
        return dummy.next;
    }
}
```

**方法特点**
```markdown
优点：逻辑更直观，易于理解
缺点：多一个布尔变量存储状态
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 常规测试
    ListNode test1 = buildList(new int[]{1,1,2});
    printList(solution.deleteDuplicates(test1)); // 2
    
    ListNode test2 = buildList(new int[]{1,1,2,3,3,3,5});
    printList(solution.deleteDuplicates(test2)); // 2->5
    
    // 边界测试
    ListNode test3 = buildList(new int[]{1,1,1});
    printList(solution.deleteDuplicates(test3)); // null
    
    ListNode test4 = buildList(new int[]{1,2,2,3});
    printList(solution.deleteDuplicates(test4)); // 1->3
    
    // 无重复测试
    ListNode test5 = buildList(new int[]{1,2,3});
    printList(solution.deleteDuplicates(test5)); // 1->2->3
}

// 辅助方法：构建链表
private static ListNode buildList(int[] nums) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int num : nums) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}

// 辅助方法：打印链表
private static void printList(ListNode head) {
    if (head == null) {
        System.out.println("null");
        return;
    }
    while (head != null) {
        System.out.print(head.val + (head.next != null ? "->" : ""));
        head = head.next;
    }
    System.out.println();
}
```

常见问题解答

**Q1：为什么需要哑节点？**
```markdown
哑节点统一了头节点和其他节点的删除操作，避免单独处理头节点删除的特殊情况
```

**Q2：如何处理全重复的链表？**
```markdown
算法会自动跳过所有重复节点，最终pre.next指向null，返回空链表
```

**Q3：如何保证稳定性？**
```markdown
算法始终保持原始链表中非重复节点的相对顺序，是稳定的
```

算法可视化

```
示例：1->1->2->3->3->3->5

步骤1：发现1重复，pre保持在dummy，跳过所有1
步骤2：pre.next指向2，pre移动到2
步骤3：发现3重复，pre.next指向5
结果：2->5
```

**扩展思考**：
1. 如何同时删除重复项并记录被删除的值？
2. 如何实现保留一个重复项（如1->1->2变为1->2）？
3. 如何处理无序链表的去重问题？


## 删除有序链表中的重复元素（保留一个）

**题目描述**

```markdown
给定一个升序排列的链表，删除所有重复的元素，使得每个元素只出现一次。

示例1：
输入：1->1->2
输出：1->2

示例2：
输入：1->1->2->3->3
输出：1->2->3

要求：
1. 链表已按升序排列
2. 时间复杂度O(n)
3. 空间复杂度O(1)
```

解题思路

```markdown
单指针遍历法：
1. 使用当前指针遍历链表
2. 比较当前节点与下一节点的值
3. 若相等则跳过下一节点（删除重复）
4. 若不等则正常移动指针
```

关键步骤

```markdown
1. 处理空链表或单节点链表的边界情况
2. 循环条件：当前节点和下一节点均不为空
3. 值比较与节点删除操作
4. 指针移动控制
```

标准实现

```java
public class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode current = head;
        
        while (current != null && current.next != null) {
            if (current.val == current.next.val) {
                // 删除重复节点
                current.next = current.next.next;
            } else {
                // 移动指针
                current = current.next;
            }
        }
        
        return head;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 只需遍历链表一次
空间复杂度：O(1) - 只使用常数空间
```

替代解法（递归实现）

```java
public class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        
        head.next = deleteDuplicates(head.next);
        return head.val == head.next.val ? head.next : head;
    }
}
```

**递归特点**
```markdown
优点：代码简洁
缺点：递归栈空间O(n)
适用场景：链表长度较小的情况
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 常规测试
    ListNode test1 = buildList(new int[]{1,1,2});
    printList(solution.deleteDuplicates(test1)); // 1->2
    
    ListNode test2 = buildList(new int[]{1,1,2,3,3});
    printList(solution.deleteDuplicates(test2)); // 1->2->3
    
    // 边界测试
    ListNode test3 = buildList(new int[]{1,1,1});
    printList(solution.deleteDuplicates(test3)); // 1
    
    ListNode test4 = buildList(new int[]{1});
    printList(solution.deleteDuplicates(test4)); // 1
    
    // 无重复测试
    ListNode test5 = buildList(new int[]{1,2,3});
    printList(solution.deleteDuplicates(test5)); // 1->2->3
}

// 辅助方法：构建链表
private static ListNode buildList(int[] nums) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int num : nums) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}

// 辅助方法：打印链表
private static void printList(ListNode head) {
    while (head != null) {
        System.out.print(head.val + (head.next != null ? "->" : ""));
        head = head.next;
    }
    System.out.println();
}
```

方法比较

| 方法       | 优点               | 缺点               | 适用场景           |
|------------|--------------------|--------------------|--------------------|
| 迭代法     | 空间效率高         | 代码稍长           | 生产环境首选       |
| 递归法     | 代码简洁           | 栈空间消耗大       | 理解算法原理       |

常见问题解答

**Q1：为什么不需要哑节点？**
```markdown
因为头节点不会被删除，只需要处理后续节点的重复情况
```

**Q2：如何处理全重复的链表？**
```markdown
算法会保留第一个节点，自动跳过后续重复节点
```

**Q3：为什么时间复杂度是O(n)？**
```markdown
每个节点最多被访问一次，最坏情况下遍历整个链表
```

算法可视化

```
示例：1->1->2->3->3

步骤1：发现1重复，跳过第二个1
步骤2：1->2->3->3
步骤3：发现3重复，跳过第二个3
结果：1->2->3
```

**扩展思考**：
1. 如何修改算法保留最后出现的重复元素？
2. 如何统计被删除的重复元素个数？
3. 如何同时处理升序和降序排列的链表？


## 判断链表是否为回文结构

**题目描述**

```markdown
给定一个单链表，判断其是否为回文结构。回文链表是指正序和逆序读取结果相同的链表。

示例1：
输入：1->2->2->1
输出：true

示例2：
输入：1->2
输出：false

要求：
1. 时间复杂度O(n)
2. 空间复杂度O(1)（进阶要求）
```

解题思路

```markdown
最优解法（快慢指针+部分反转）：
1. 使用快慢指针找到链表中点
2. 反转链表后半部分
3. 比较前后两部分是否相同
4. 恢复链表原状（可选）

关键点：
- 快指针速度是慢指针两倍
- 处理奇数长度和偶数长度的情况
- 比较后恢复链表保持原始结构
```

标准实现

```java
public class Solution {
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) {
            return true;
        }
        
        // 1. 找到中点
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // 2. 反转后半部分
        ListNode secondHalf = reverse(slow);
        
        // 3. 比较前后两部分
        ListNode p1 = head;
        ListNode p2 = secondHalf;
        boolean result = true;
        while (result && p2 != null) {
            if (p1.val != p2.val) {
                result = false;
            }
            p1 = p1.next;
            p2 = p2.next;
        }
        
        // 4. 恢复链表（可选）
        reverse(secondHalf);
        
        return result;
    }
    
    private ListNode reverse(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 找中点O(n)，反转O(n/2)，比较O(n/2)
空间复杂度：O(1) - 只使用常数空间
```

替代解法（使用栈）

```java
public class Solution {
    public boolean isPalindrome(ListNode head) {
        Stack<Integer> stack = new Stack<>();
        ListNode curr = head;
        
        // 将链表元素压入栈
        while (curr != null) {
            stack.push(curr.val);
            curr = curr.next;
        }
        
        // 比较栈中元素与链表
        curr = head;
        while (curr != null) {
            if (curr.val != stack.pop()) {
                return false;
            }
            curr = curr.next;
        }
        
        return true;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 两次遍历
空间复杂度：O(n) - 需要额外栈空间
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 测试用例
    ListNode test1 = buildList(new int[]{1,2,2,1});
    System.out.println(solution.isPalindrome(test1)); // true
    
    ListNode test2 = buildList(new int[]{1,2});
    System.out.println(solution.isPalindrome(test2)); // false
    
    ListNode test3 = buildList(new int[]{1});
    System.out.println(solution.isPalindrome(test3)); // true
    
    ListNode test4 = buildList(new int[]{1,2,3,2,1});
    System.out.println(solution.isPalindrome(test4)); // true
    
    ListNode test5 = buildList(new int[]{1,2,3,4});
    System.out.println(solution.isPalindrome(test5)); // false
}

// 辅助方法：构建链表
private static ListNode buildList(int[] nums) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int num : nums) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}
```

方法比较

| 方法               | 优点               | 缺点               | 适用场景           |
|--------------------|--------------------|--------------------|--------------------|
| 快慢指针+部分反转  | 空间效率高         | 修改链表结构       | 生产环境首选       |
| 栈实现             | 逻辑简单           | 需要额外O(n)空间   | 理解算法原理       |

常见问题解答

**Q1：为什么快指针要移动两步？**
```markdown
这样当快指针到达末尾时，慢指针刚好到达中点，实现高效定位
```

**Q2：如何处理奇数长度链表？**
```markdown
当fast不为null时，slow再前进一步，确保后半部分比前半部分短
```

**Q3：为什么需要恢复链表？**
```markdown
保持链表原始结构是良好编程习惯，但题目若无明确要求可省略
```

算法可视化

```
示例：1->2->2->1

步骤1：快慢指针定位
fast: 1->2->null
slow: 1->2

步骤2：反转后半部分
后半部分：2->1 反转为 1->2

步骤3：比较
前半部分：1->2
后半部分：1->2
结果：true
```

**扩展思考**：
1. 如何判断双向链表的回文性？
2. 如何优化大内存链表的处理？
3. 如何并行化处理超长链表的回文判断？


## 判断链表中是否有环

**题目描述**

```markdown
给定一个链表，判断链表中是否有环。如果链表中有某个节点可以通过连续跟踪next指针再次到达，则链表中存在环。

示例1：
输入：3->2->0->-4（-4指向2）
输出：true

示例2：
输入：1->null
输出：false

要求：
1. 时间复杂度O(n)
2. 空间复杂度O(1)
```

解题思路

```markdown
快慢指针法（Floyd判圈算法）：
1. 初始化两个指针，快指针每次移动两步，慢指针每次移动一步
2. 如果快指针遇到null，说明链表无环
3. 如果快慢指针相遇，说明链表有环

数学原理：
- 若有环，快指针最终会追上慢指针
- 若无环，快指针会先到达链表尾部
```

标准实现

```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) {
            return false;
        }
        
        ListNode slow = head;
        ListNode fast = head.next;
        
        while (slow != fast) {
            if (fast == null || fast.next == null) {
                return false;
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        return true;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) 
- 无环时：快指针先到达尾部，遍历n/2次
- 有环时：快慢指针最多移动n次相遇

空间复杂度：O(1) - 只使用两个指针
```

替代解法（哈希表法）

```java
import java.util.HashSet;
import java.util.Set;

public class Solution {
    public boolean hasCycle(ListNode head) {
        Set<ListNode> visited = new HashSet<>();
        ListNode curr = head;
        
        while (curr != null) {
            if (visited.contains(curr)) {
                return true;
            }
            visited.add(curr);
            curr = curr.next;
        }
        return false;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 最坏遍历整个链表
空间复杂度：O(n) - 需要存储所有访问过的节点
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 测试无环链表
    ListNode test1 = buildList(new int[]{1,2,3});
    System.out.println(solution.hasCycle(test1)); // false
    
    // 测试有环链表
    ListNode test2 = buildCycleList(new int[]{3,2,0,-4}, 1);
    System.out.println(solution.hasCycle(test2)); // true
    
    // 测试单节点无环
    ListNode test3 = buildList(new int[]{1});
    System.out.println(solution.hasCycle(test3)); // false
    
    // 测试单节点自环
    ListNode test4 = new ListNode(1);
    test4.next = test4;
    System.out.println(solution.hasCycle(test4)); // true
}

// 辅助方法：构建普通链表
private static ListNode buildList(int[] nums) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int num : nums) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}

// 辅助方法：构建带环链表
private static ListNode buildCycleList(int[] nums, int pos) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    ListNode cycleNode = null;
    
    for (int i = 0; i < nums.length; i++) {
        curr.next = new ListNode(nums[i]);
        curr = curr.next;
        if (i == pos) {
            cycleNode = curr;
        }
    }
    curr.next = cycleNode;
    return dummy.next;
}
```

方法比较

| 方法       | 优点               | 缺点               | 适用场景           |
|------------|--------------------|--------------------|--------------------|
| 快慢指针法 | 空间效率高         | 难以确定环的入口   | 生产环境首选       |
| 哈希表法   | 逻辑简单           | 需要额外O(n)空间   | 理解算法原理       |

常见问题解答

**Q1：为什么快指针要走两步？**
```markdown
两步速度差能确保在有环情况下快指针一定能追上慢指针，且时间复杂度最优
```

**Q2：如何找到环的入口？**
```markdown
相遇后将快指针重置到头节点，然后快慢指针同速移动，再次相遇点即为环入口
```

**Q3：快指针走三步可以吗？**
```markdown
可以但效率不一定更高，两步已经是最优速度差
```

算法可视化

```
有环链表：3->2->0->-4->2...

步骤1：
slow:3, fast:2

步骤2：
slow:2, fast:0

步骤3：
slow:0, fast:2

步骤4：
slow:-4, fast:-4
相遇返回true
```

**扩展思考**：
1. 如何计算环的长度？
2. 如何判断多个环的情况？
3. 如何优化大内存链表的环检测？


## 两个链表的第一个公共节点

**题目描述**

```markdown
给定两个无环单链表，找出它们的第一个公共节点。如果没有公共节点则返回null。

示例：
链表A：1->2->3->6->7
链表B：4->5->6->7
公共节点：6

要求：
1. 时间复杂度O(m+n)
2. 空间复杂度O(1)（进阶要求）
```

解题思路

```markdown
最优解法（双指针交替遍历）：
1. 使用两个指针同时遍历两个链表
2. 当一个指针到达链表末尾时，转到另一链表头部继续遍历
3. 最终会在第一个公共节点相遇，或同时到达末尾(null)

数学原理：
- 两个指针走过的路径长度相同：L1 + L2 + C（C为公共部分）
- 会在第一个公共节点相遇
```

标准实现

```java
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode pA = headA, pB = headB;
        
        while (pA != pB) {
            pA = (pA == null) ? headB : pA.next;
            pB = (pB == null) ? headA : pB.next;
        }
        
        return pA;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(m+n) - 最坏情况下遍历两个链表各一次
空间复杂度：O(1) - 只使用两个指针
```

替代解法（长度差法）

```java
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        // 计算两个链表长度
        int lenA = getLength(headA), lenB = getLength(headB);
        
        // 长链表先走长度差步
        while (lenA > lenB) {
            headA = headA.next;
            lenA--;
        }
        while (lenB > lenA) {
            headB = headB.next;
            lenB--;
        }
        
        // 同步遍历直到找到公共节点
        while (headA != headB) {
            headA = headA.next;
            headB = headB.next;
        }
        
        return headA;
    }
    
    private int getLength(ListNode head) {
        int length = 0;
        while (head != null) {
            length++;
            head = head.next;
        }
        return length;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(m+n) - 需要遍历链表两次
空间复杂度：O(1) - 只使用常数空间
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 构建测试链表
    ListNode common = buildList(new int[]{6,7});
    ListNode headA = buildList(new int[]{1,2,3});
    ListNode headB = buildList(new int[]{4,5});
    connectList(headA, common);
    connectList(headB, common);
    
    // 测试有公共节点
    ListNode result = solution.getIntersectionNode(headA, headB);
    System.out.println(result != null ? result.val : "null"); // 6
    
    // 测试无公共节点
    ListNode headC = buildList(new int[]{1,2,3});
    ListNode headD = buildList(new int[]{4,5});
    result = solution.getIntersectionNode(headC, headD);
    System.out.println(result != null ? result.val : "null"); // null
}

// 辅助方法：构建链表
private static ListNode buildList(int[] nums) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int num : nums) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}

// 辅助方法：连接公共部分
private static void connectList(ListNode head, ListNode common) {
    while (head.next != null) {
        head = head.next;
    }
    head.next = common;
}
```

方法比较

| 方法               | 优点               | 缺点               | 适用场景           |
|--------------------|--------------------|--------------------|--------------------|
| 双指针交替遍历     | 代码简洁           | 逻辑稍抽象         | 生产环境首选       |
| 长度差法           | 逻辑直观           | 需要计算长度       | 理解算法原理       |

常见问题解答

**Q1：为什么交替遍历能保证相遇？**
```markdown
两个指针走过的路径长度相同：L1+L2+C，最终会在第一个公共节点相遇
```

**Q2：如何处理无环链表？**
```markdown
算法同样适用，最终两个指针会同时到达null，返回null
```

**Q3：哪种方法效率更高？**
```markdown
交替遍历法虽然时间复杂度相同，但实际运行效率更高，减少了一次完整遍历
```

算法可视化

```
链表A：1->2->3->6->7
链表B：4->5->6->7

指针A路径：1->2->3->6->7->4->5->6
指针B路径：4->5->6->7->1->2->3->6
在节点6相遇
```

**扩展思考**：
1. 如何判断有环链表的第一个公共节点？
2. 如何计算两个链表的公共部分长度？
3. 如何优化处理超长链表的公共节点查找？


## 链表区间反转

**题目描述**

```markdown
给定一个单链表和两个整数m、n，反转链表中从位置m到n的节点。要求时间复杂度O(n)，空间复杂度O(1)。

示例：
输入：1->2->3->4->5, m=2, n=4
输出：1->4->3->2->5

约束条件：
1. 1 ≤ m ≤ n ≤ 链表长度
2. 只能修改节点指针，不能修改节点值
```

解题思路

```markdown
四步反转法：
1. 定位到m-1位置的pre节点
2. 记录反转开始节点start
3. 执行n-m次相邻节点反转
4. 重新连接反转后的子链表

关键点：
- 使用哑节点简化头节点处理
- 每次反转将下一个节点插入到pre之后
- 保持链表不断开
```

标准实现

```java
public class Solution {
    public ListNode reverseBetween(ListNode head, int m, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode pre = dummy;
        
        // 定位到m-1位置
        for (int i = 1; i < m; i++) {
            pre = pre.next;
        }
        
        ListNode start = pre.next;
        ListNode then = start.next;
        
        // 执行n-m次相邻节点反转
        for (int i = 0; i < n - m; i++) {
            start.next = then.next;
            then.next = pre.next;
            pre.next = then;
            then = start.next;
        }
        
        return dummy.next;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 最多遍历链表两次
空间复杂度：O(1) - 只使用常数空间
```

替代解法（头插法）

```java
public class Solution {
    public ListNode reverseBetween(ListNode head, int m, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode pre = dummy;
        
        // 定位到m-1位置
        for (int i = 1; i < m; i++) {
            pre = pre.next;
        }
        
        // 头插法反转
        ListNode curr = pre.next;
        for (int i = m; i < n; i++) {
            ListNode temp = curr.next;
            curr.next = temp.next;
            temp.next = pre.next;
            pre.next = temp;
        }
        
        return dummy.next;
    }
}
```

**方法特点**
```markdown
优点：代码更简洁
缺点：指针操作顺序需要特别注意
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 常规测试
    ListNode test1 = buildList(new int[]{1,2,3,4,5});
    printList(solution.reverseBetween(test1, 2, 4)); // 1->4->3->2->5
    
    // 反转整个链表
    ListNode test2 = buildList(new int[]{1,2,3});
    printList(solution.reverseBetween(test2, 1, 3)); // 3->2->1
    
    // 反转单个节点
    ListNode test3 = buildList(new int[]{1,2,3});
    printList(solution.reverseBetween(test3, 2, 2)); // 1->2->3
    
    // 边界测试
    ListNode test4 = buildList(new int[]{1});
    printList(solution.reverseBetween(test4, 1, 1)); // 1
}

// 辅助方法：构建链表
private static ListNode buildList(int[] nums) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int num : nums) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}

// 辅助方法：打印链表
private static void printList(ListNode head) {
    while (head != null) {
        System.out.print(head.val + (head.next != null ? "->" : ""));
        head = head.next;
    }
    System.out.println();
}
```

方法比较

| 方法       | 优点               | 缺点               | 适用场景           |
|------------|--------------------|--------------------|--------------------|
| 四步反转法 | 逻辑清晰           | 代码稍长           | 理解算法原理       |
| 头插法     | 代码简洁           | 指针操作顺序敏感   | 生产环境首选       |

常见问题解答

**Q1：为什么需要哑节点？**
```markdown
哑节点统一了从头节点开始反转和其他位置反转的操作，避免特殊处理
```

**Q2：如何处理m=1的情况？**
```markdown
哑节点的存在使得m=1时pre指向哑节点，无需特殊处理
```

**Q3：反转过程中如何保证链表不断开？**
```markdown
每次操作只修改必要的指针，并保持至少一个指针连接
```

算法可视化

```
初始链表：dummy->1->2->3->4->5, m=2, n=4

步骤1：定位pre到1，start=2
步骤2：第一次反转：
  - 将3插入到pre(1)之后：1->3->2->4->5
步骤3：第二次反转：
  - 将4插入到pre(1)之后：1->4->3->2->5
结果：dummy->1->4->3->2->5
```

**扩展思考**：
1. 如何实现每隔k个节点反转一次？
2. 如何同时记录反转的起始和结束位置？
3. 如何优化处理超大区间的反转？


## 合并两个有序链表

**题目描述**

```markdown
将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

示例：
输入：1->3->5 和 2->4->6
输出：1->2->3->4->5->6

要求：
1. 时间复杂度O(n+m)
2. 空间复杂度O(1)（迭代法）
```

解题思路

```markdown
双指针迭代法：
1. 创建哑节点作为合并后链表的起始点
2. 使用指针遍历两个链表，比较节点值
3. 将较小值的节点连接到结果链表
4. 处理剩余未遍历完的链表

递归法：
1. 比较两个链表头节点值
2. 将较小节点作为头节点
3. 递归合并剩余部分
```

标准实现（迭代法）

```java
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                curr.next = l1;
                l1 = l1.next;
            } else {
                curr.next = l2;
                l2 = l2.next;
            }
            curr = curr.next;
        }
        
        // 连接剩余部分
        curr.next = (l1 != null) ? l1 : l2;
        
        return dummy.next;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n+m) - 遍历两个链表各一次
空间复杂度：O(1) - 只使用常数空间
```

## 递归实现

```java
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null) return l2;
        if (l2 == null) return l1;
        
        if (l1.val <= l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n+m) - 每个节点处理一次
空间复杂度：O(n+m) - 递归调用栈深度
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 常规测试
    ListNode l1 = buildList(new int[]{1,3,5});
    ListNode l2 = buildList(new int[]{2,4,6});
    printList(solution.mergeTwoLists(l1, l2)); // 1->2->3->4->5->6
    
    // 空链表测试
    ListNode l3 = buildList(new int[]{});
    ListNode l4 = buildList(new int[]{1});
    printList(solution.mergeTwoLists(l3, l4)); // 1
    
    // 相同元素测试
    ListNode l5 = buildList(new int[]{1,1,1});
    ListNode l6 = buildList(new int[]{1,1,1});
    printList(solution.mergeTwoLists(l5, l6)); // 1->1->1->1->1->1
}

// 辅助方法：构建链表
private static ListNode buildList(int[] nums) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int num : nums) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}

// 辅助方法：打印链表
private static void printList(ListNode head) {
    while (head != null) {
        System.out.print(head.val + (head.next != null ? "->" : ""));
        head = head.next;
    }
    System.out.println();
}
```

方法比较

| 方法     | 优点               | 缺点               | 适用场景           |
|----------|--------------------|--------------------|--------------------|
| 迭代法   | 空间效率高         | 代码稍长           | 生产环境首选       |
| 递归法   | 代码简洁           | 栈空间消耗大       | 理解算法原理       |

常见问题解答

**Q1：为什么需要哑节点？**
```markdown
哑节点简化了链表头节点的处理，避免空指针异常
```

**Q2：如何处理不等长链表？**
```markdown
当其中一个链表遍历完后，直接将另一个链表的剩余部分连接到结果链表
```

**Q3：递归法的空间消耗在哪里？**
```markdown
每次递归调用都需要保存当前函数栈帧，递归深度为n+m
```

算法可视化

```
链表1：1 -> 3 -> 5
链表2：2 -> 4 -> 6

迭代过程：
步骤1：选择1，结果：1
步骤2：选择2，结果：1->2
步骤3：选择3，结果：1->2->3
步骤4：选择4，结果：1->2->3->4
步骤5：选择5，结果：1->2->3->4->5
步骤6：连接剩余6，结果：1->2->3->4->5->6
```

**扩展思考**：
1. 如何合并K个有序链表？
2. 如何实现降序合并？
3. 如何优化处理超大链表的合并？


## 合并K个有序链表

**题目描述**

```markdown
将K个升序链表合并为一个新的升序链表并返回。

示例：
输入：
[
  1->4->5,
  1->3->4,
  2->6
]
输出：1->1->2->3->4->4->5->6

要求：
1. 时间复杂度O(NlogK)，其中N是所有链表节点总数
2. 空间复杂度O(1)（最小堆法）
```

解题思路

```markdown
最小堆优先队列法：
1. 创建最小堆存储所有链表的头节点
2. 每次取出堆顶最小节点加入结果链表
3. 将该节点的下一节点放入堆中
4. 重复直到堆为空

分治法：
1. 两两合并链表
2. 递归合并直到只剩一个链表
```

标准实现（最小堆法）

```java
import java.util.PriorityQueue;
import java.util.Comparator;

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        
        PriorityQueue<ListNode> minHeap = new PriorityQueue<>(
            lists.length, Comparator.comparingInt(a -> a.val));
        
        // 初始化堆
        for (ListNode node : lists) {
            if (node != null) {
                minHeap.offer(node);
            }
        }
        
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        
        while (!minHeap.isEmpty()) {
            ListNode minNode = minHeap.poll();
            curr.next = minNode;
            curr = curr.next;
            
            if (minNode.next != null) {
                minHeap.offer(minNode.next);
            }
        }
        
        return dummy.next;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(NlogK) - 每个节点处理一次，堆操作logK
空间复杂度：O(K) - 堆中最多存储K个节点
```

## 分治合并法

```java
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;
        return merge(lists, 0, lists.length - 1);
    }
    
    private ListNode merge(ListNode[] lists, int left, int right) {
        if (left == right) return lists[left];
        
        int mid = left + (right - left) / 2;
        ListNode l1 = merge(lists, left, mid);
        ListNode l2 = merge(lists, mid + 1, right);
        return mergeTwoLists(l1, l2);
    }
    
    private ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                curr.next = l1;
                l1 = l1.next;
            } else {
                curr.next = l2;
                l2 = l2.next;
            }
            curr = curr.next;
        }
        
        curr.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(NlogK) - 分治合并次数logK，每次合并O(N)
空间复杂度：O(logK) - 递归栈深度
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 构建测试链表
    ListNode l1 = buildList(new int[]{1,4,5});
    ListNode l2 = buildList(new int[]{1,3,4});
    ListNode l3 = buildList(new int[]{2,6});
    
    // 测试合并
    ListNode[] lists = {l1, l2, l3};
    ListNode result = solution.mergeKLists(lists);
    printList(result); // 1->1->2->3->4->4->5->6
    
    // 测试空链表
    ListNode[] emptyLists = {};
    printList(solution.mergeKLists(emptyLists)); // null
}

// 辅助方法：构建链表
private static ListNode buildList(int[] nums) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int num : nums) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}

// 辅助方法：打印链表
private static void printList(ListNode head) {
    while (head != null) {
        System.out.print(head.val + (head.next != null ? "->" : ""));
        head = head.next;
    }
    System.out.println();
}
```

方法比较

| 方法         | 优点               | 缺点               | 适用场景           |
|--------------|--------------------|--------------------|--------------------|
| 最小堆法     | 实现简单           | 需要额外O(K)空间   | K较小的情况        |
| 分治法       | 空间效率高         | 实现较复杂         | 生产环境首选       |

常见问题解答

**Q1：为什么最小堆法的时间复杂度是O(NlogK)？**
```markdown
每个节点处理一次，每次堆操作O(logK)，共N个节点
```

**Q2：分治法如何保证效率？**
```markdown
通过两两合并减少合并次数，合并次数为logK次
```

**Q3：如何处理空链表输入？**
```markdown
在方法开始处检查输入数组是否为空或长度为0
```

算法可视化

```
输入链表：
[1->4->5, 1->3->4, 2->6]

最小堆法：
1. 初始堆：[1,1,2]
2. 取出1，加入1->1->2
3. 堆变为：[3,2,4]
4. 取出2，加入->3
5. 堆变为：[3,4,6]
...
最终结果：1->1->2->3->4->4->5->6
```

**扩展思考**：
1. 如何实现降序合并？
2. 如何优化处理超大K值的情况？
3. 如何并行化处理合并过程？


## 奇偶逆序重排链表

**题目描述**

```markdown
给定一个单链表，将其重新排列为：第一个节点后接最后一个节点，第二个节点后接倒数第二个节点，依此类推。

示例1：
输入：1->2->3->4->5->6
输出：1->6->2->5->3->4

示例2：
输入：1->2->3->4->3->2->1
输出：1->1->2->2->3->3->4

要求：
1. 不能修改节点值，只能改变节点指向
2. 时间复杂度O(n)
3. 空间复杂度O(1)
```

解题思路

```markdown
三步法：
1. 找到链表中点（快慢指针）
2. 反转后半部分链表
3. 合并前后两部分链表

关键点：
- 快慢指针找中点时，注意奇偶长度处理
- 反转链表时保持空间复杂度O(1)
- 合并时注意指针移动顺序
```

标准实现

```java
class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        
        // 1. 找到链表中点
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        // 2. 反转后半部分
        ListNode prev = null, curr = slow;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        
        // 3. 合并两个链表
        ListNode first = head, second = prev;
        while (second.next != null) {
            ListNode temp1 = first.next;
            ListNode temp2 = second.next;
            first.next = second;
            second.next = temp1;
            first = temp1;
            second = temp2;
        }
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 找中点O(n)，反转O(n/2)，合并O(n/2)
空间复杂度：O(1) - 只使用常数空间
```

替代解法（栈实现）

```java
class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        
        Stack<ListNode> stack = new Stack<>();
        ListNode curr = head;
        while (curr != null) {
            stack.push(curr);
            curr = curr.next;
        }
        
        curr = head;
        int size = stack.size();
        for (int i = 0; i < size / 2; i++) {
            ListNode top = stack.pop();
            ListNode next = curr.next;
            curr.next = top;
            top.next = next;
            curr = next;
        }
        curr.next = null;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 两次遍历
空间复杂度：O(n) - 需要栈存储所有节点
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 测试偶数长度链表
    ListNode test1 = buildList(new int[]{1,2,3,4,5,6});
    solution.reorderList(test1);
    printList(test1); // 1->6->2->5->3->4
    
    // 测试奇数长度链表
    ListNode test2 = buildList(new int[]{1,2,3,4,5});
    solution.reorderList(test2);
    printList(test2); // 1->5->2->4->3
    
    // 测试回文链表
    ListNode test3 = buildList(new int[]{1,2,3,2,1});
    solution.reorderList(test3);
    printList(test3); // 1->1->2->2->3
}

// 辅助方法：构建链表
private static ListNode buildList(int[] nums) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int num : nums) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}

// 辅助方法：打印链表
private static void printList(ListNode head) {
    while (head != null) {
        System.out.print(head.val + (head.next != null ? "->" : ""));
        head = head.next;
    }
    System.out.println();
}
```

方法比较

| 方法       | 优点               | 缺点               | 适用场景           |
|------------|--------------------|--------------------|--------------------|
| 三步法     | 空间效率高         | 指针操作稍复杂     | 生产环境首选       |
| 栈实现     | 逻辑简单           | 需要额外O(n)空间   | 理解算法原理       |

常见问题解答

**Q1：为什么快指针要走两步？**
```markdown
两步速度差能确保在遍历结束时慢指针正好位于中点或前半部分的末尾
```

**Q2：如何处理奇数长度链表？**
```markdown
当链表长度为奇数时，中点节点不需要反转，直接作为合并后的末尾节点
```

**Q3：合并时为什么条件为second.next != null？**
```markdown
确保在合并完成后不会形成环，正确处理奇数长度情况
```

算法可视化

```
示例：1->2->3->4->5->6

步骤1：找到中点
fast:1->3->5->null
slow:1->2->3

步骤2：反转后半部分
后半部分：4->5->6 反转为 6->5->4

步骤3：合并
1->6->2->5->3->4
```

**扩展思考**：
1. 如何实现每隔k个节点逆序重排？
2. 如何同时记录重排的次数？
3. 如何优化处理超大链表的逆序重排？


## 反转链表

**题目描述**

```markdown
给定一个单链表的头节点，反转该链表并返回反转后的头节点。

示例：
输入：1->2->3
输出：3->2->1

要求：
1. 不能修改节点值，只能改变节点指向
2. 时间复杂度O(n)
3. 空间复杂度O(1)
```

解题思路

```markdown
迭代法：
1. 维护三个指针：prev、curr、next
2. 每次迭代将curr.next指向prev
3. 移动prev和curr指针
4. 直到curr为null时，prev即为新头节点

递归法：
1. 递归到链表末尾
2. 回溯时反转指针指向
```

标准实现（迭代法）

```java
public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        
        while (curr != null) {
            ListNode next = curr.next; // 保存下一个节点
            curr.next = prev;         // 反转指针
            prev = curr;              // 移动prev指针
            curr = next;              // 移动curr指针
        }
        
        return prev; // prev即为新头节点
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 遍历链表一次
空间复杂度：O(1) - 只使用常数空间
```

## 递归实现

```java
public class Solution {
    public ListNode reverseList(ListNode head) {
        // 递归终止条件
        if (head == null || head.next == null) {
            return head;
        }
        
        ListNode newHead = reverseList(head.next);
        head.next.next = head; // 反转指针
        head.next = null;      // 断开原指针
        
        return newHead;
    }
}
```

**复杂度分析**
```markdown
时间复杂度：O(n) - 每个节点处理一次
空间复杂度：O(n) - 递归调用栈深度
```

测试用例

```java
public static void main(String[] args) {
    Solution solution = new Solution();
    
    // 常规测试
    ListNode test1 = buildList(new int[]{1,2,3});
    printList(solution.reverseList(test1)); // 3->2->1
    
    // 边界测试
    ListNode test2 = buildList(new int[]{1});
    printList(solution.reverseList(test2)); // 1
    
    ListNode test3 = buildList(new int[]{});
    printList(solution.reverseList(test3)); // null
    
    // 性能测试
    ListNode test4 = buildList(new int[10000]);
    long start = System.currentTimeMillis();
    solution.reverseList(test4);
    System.out.println("Time: " + (System.currentTimeMillis() - start) + "ms");
}

// 辅助方法：构建链表
private static ListNode buildList(int[] nums) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    for (int num : nums) {
        curr.next = new ListNode(num);
        curr = curr.next;
    }
    return dummy.next;
}

// 辅助方法：打印链表
private static void printList(ListNode head) {
    while (head != null) {
        System.out.print(head.val + (head.next != null ? "->" : ""));
        head = head.next;
    }
    System.out.println();
}
```

方法比较

| 方法     | 优点               | 缺点               | 适用场景           |
|----------|--------------------|--------------------|--------------------|
| 迭代法   | 空间效率高         | 指针操作稍复杂     | 生产环境首选       |
| 递归法   | 代码简洁           | 栈空间消耗大       | 理解算法原理       |

常见问题解答

**Q1：为什么迭代法需要三个指针？**
```markdown
prev记录前驱节点，curr处理当前节点，next保存后续节点，防止链表断开
```

**Q2：递归法的空间消耗在哪里？**
```markdown
每次递归调用都需要保存当前函数栈帧，递归深度为n
```

**Q3：如何处理空链表？**
```markdown
在方法开始处检查head是否为null即可
```

算法可视化

```
原始链表：1->2->3->null

迭代过程：
步骤1：prev=null, curr=1, next=2 → 1->null
步骤2：prev=1, curr=2, next=3 → 2->1
步骤3：prev=2, curr=3, next=null → 3->2
结果：3->2->1->null
```

**扩展思考**：
1. 如何实现部分区间反转？
2. 如何实现每k个节点一组反转？
3. 如何优化处理超大链表的反转？
