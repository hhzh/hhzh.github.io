## 两两交换链表中的节点
#### <font style="color:rgb(28, 31, 33);">内容描述</font>


```plain
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

 

示例:

给定 1->2->3->4, 你应该返回 2->1->4->3.
```

#### <font style="color:rgb(28, 31, 33);">题目详解</font>

<font style="color:rgb(0, 0, 0);">题目给我们一个链表，两两交换相邻的节点，并且是实际的交换，不仅仅是交换值，那么我们应该有几个问题产生：</font>

1. <font style="color:rgb(28, 31, 33);">如果链表长度为0呢；</font>
2. <font style="color:rgb(28, 31, 33);">链表长度为奇数该怎么办，最后一个落单的节点怎么处理呢？</font>

## <font style="color:rgb(28, 31, 33);">解题方案</font>

#### <font style="color:rgb(28, 31, 33);">思路 1：时间复杂度: O(N) 空间复杂度: O(N)</font>

<font style="color:rgb(0, 0, 0);">我们想了想，不管那么多，先直接处理一下最基本的case，那么就是链表长度小于2的情况，我们都直接返回head就行了。然后其它情况呢？说明我们至少拥有两个节点了，我们直接交换前两个节点，再递归地去处理后面所有的节点即可。</font>

<font style="color:rgb(0, 0, 0);">因为递归深度为链表长度/2，所以空间复杂度为O(N)，时间复杂度同理。</font>



```java
class Solution {
    public ListNode swapPairs(ListNode head) {
        // 链表长度小于2，我们都直接返回head就行
        if (head == null || head.next == null) {
            return head;
        }
        ListNode next = head.next;
        // 递归处理后面所有的节点
        head.next = swapPairs(next.next);
        // 交换前两个节点
        next.next = head;
        return next;
    }
}
```

<font style="color:rgb(0, 0, 0);">之前我们也用过递归的操作，然后发现使用迭代来代替递归通常能够节省空间，接下来让我们试试吧。</font>

#### <font style="color:rgb(28, 31, 33);">思路 2：时间复杂度: O(N) 空间复杂度: O(1)</font>

<font style="color:rgb(0, 0, 0);">我们也可以用迭代的方法来做，这样可以将空间复杂度减小到O(1)。</font>



```java
class Solution {
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode p = dummy;
        while (true) {
        	//迭代所有节点
            if (p.next == null || p.next.next == null) {
                break;
            }
            ListNode first = p.next;
            ListNode second = first.next;
            //交换前两个节点
            first.next = second.next;
            second.next = first;
            p.next = second;
            p = p.next.next;
        }
        return dummy.next;
    }
}
```

<font style="color:rgb(0, 0, 0);">显然，这里我们的时间复杂度相较于递归没有变化，但是空间上我们得到了优化。</font>

### <font style="color:rgb(28, 31, 33);">小结</font>

<font style="color:rgb(0, 0, 0);">通常迭代来代替递归通常能够节省空间，但是迭代就会比较难写，我们要经常逼自己一把，因为面试的时候经常会有面试官让你同时写出两种方式的实现。</font>

## 删除链表的倒数第 n 个节点
### <font style="color:rgb(28, 31, 33);">内容描述</font>


```plain
给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

实例:

给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.

注意：给定的 n 保证是有效的

进阶：你能尝试一下用一趟扫描实现吗？
```

## <font style="color:rgb(28, 31, 33);">解题方案</font>

#### <font style="color:rgb(28, 31, 33);">思路 1：时间复杂度: O(N) 空间复杂度: O(1)</font>

<font style="color:rgb(0, 0, 0);">根据题意，我们去移除从后数第n个元素，相当于我们要移除从前数第len(list)-n个元素。</font>

<font style="color:rgb(0, 0, 0);">我们利用一个指针fast，先走n个元素，这时候这个指针的位置离链表尾端就还有len(list)-n个元素了。</font>

<font style="color:rgb(0, 0, 0);">我们再用一个指针flow，从头开始走，指针A走一步，指针B就走一步，完美走到第len(list)-n个元素。</font>



```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode slow = dummy;
        ListNode fast = dummy;
        for (int i = 0; i < n; i++) {
            fast = fast.next;
        }
        while (fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
}
```



#### <font style="color:rgb(28, 31, 33);">思路 2：时间复杂度: O(N) 空间复杂度: O(1)</font>

<font style="color:rgb(0, 0, 0);">链表是单链表，只能从前往后遍历，题目要求移除从后数第n个元素，相当于我们要移除从前数第len(list)-n个元素，如果我们知道链表的长度，自然可以从前数遍历到第len(list)-n个元素。</font>





```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // cnt 是链表的长度
        int cnt = 0;
        ListNode temp = head;
        while (temp != null) {
            cnt++;
            temp = temp.next;
        }
        // 算出从后数 n 个从前数第几个
        cnt = cnt - n;
        if (cnt == 0) {
            return head.next;
        }else {
            temp = head;
            // head 已经是第一个了，所以 cnt 减一
            cnt--;
            while (cnt-- != 0) {
                temp = temp.next;
            }
            temp.next = temp.next.next;
            return head;
        }
    }
}
```



### <font style="color:rgb(28, 31, 33);">进阶: 你能尝试一下用一趟扫描实现吗？</font>

#### <font style="color:rgb(28, 31, 33);">思路 3：时间复杂度: O(N) 空间复杂度: O(1)</font>

<font style="color:rgb(0, 0, 0);">一趟扫描，时间复杂度限制在o(n)。</font>

<font style="color:rgb(0, 0, 0);">注意到我们前面的思路2，我们先将指针fast移动n个元素，再将指针fast和指针slow一起移动len(list)-n个元素，这两个步骤加起来，fast指针从链表开头移动到链表末端。</font>

<font style="color:rgb(0, 0, 0);">我们可以将两个步骤合起来，fast移动n个元素前，slow不动；移动了n个元素后，slow跟着一起移动，于是我们实现了用一趟扫描就解决问题。</font>



```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(-1);
        dummy.next = head;
        ListNode slow = dummy;
        ListNode fast = dummy;
        int count = 0;
        while (fast.next != null) {
            if (count < n) {
                count++;
                fast = fast.next;
            } else {
                fast = fast.next;
                slow = slow.next;
            }
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
}
```



### <font style="color:rgb(28, 31, 33);">小结</font>

<font style="color:rgb(0, 0, 0);">这几个算法的时间复杂度虽然都是o(n)，但写法不一样，系数就不一样。我们在时间复杂度到极限时，就会去苛求代码细节以降低复杂度系数。思路2是我们最直接的想法，需要扫描一遍记录长度。思路1不需要记录长度，用一个指针扫描一遍链表，实际上相当于思路1的长度，这种做法很巧妙，代码量小，控制两个指针走就可以解决问题，不需要其它的操作。进阶思路3就是思路1的改进版，将两个循环合并成一个循环，满足题目所说，一遍扫描就解决。</font>

## 链表中的节点每k个一组翻转
# 题目描述

将给出的链表中的节点每 k 个一组翻转，返回翻转后的链表

如果链表中的节点数不是 k 的倍数，将最后剩下的节点保持原样

你不能更改节点中的值，只能更改节点本身。

例如：给定一个链表，1 -> 2 -> 3 -> 4 -> 5

当 k = 2 时，返回结果 2 -> 1 -> 4 -> 3 -> 5

当 k = 3 时，返回结果 3 -> 2 -> 1 -> 4 -> 5

# 解法1 使用栈

使用栈进行反转的方法简单直观，首先遍历链表，将每k个节点压入栈中，然后再从栈中取出，这样节点的顺序就被反转了。

```java
public class Solution {
    public ListNode reverseKNode(ListNode head, int k) {
        Stack<ListNode> stack = new Stack<>();
        // dummy是返回结果的头节点的前一个节点
        ListNode dummy = new ListNode(0);
        // current是返回结果的尾节点
        ListNode current = dummy;
        // index是当前遍历的节点
        ListNode index = head;

        while (index != null) {
            int count = 0;
            // 将k个节点压入栈
            while (index != null && count < k) {
                stack.push(index);
                index = index.next;
                count++;
            }

            // 如果达到了k个节点，则反转它们
            if (count == k) {
                while (!stack.isEmpty()) {
                    current.next = stack.pop();
                    current = current.next;
                }
                current.next = index;
            }
        }

        return dummy.next;
    }
}
```

# 解法2 直接调整指针

此方法避免使用额外空间，直接在链表上操作。它通过记录每组的开始和结束进行直接反转，相对复杂但更节省空间。

```java
public class Solution {
    public ListNode reverseKNode(ListNode head, int k) {
        // dummy是返回结果的头节点的前一个节点
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        // pre是每组的前一节点
        ListNode pre = dummy;
        // current是每组的最后一个节点
        ListNode current = dummy;

        while (current.next != null) {
            // 找到每组的最后一个节点
            for (int i = 0; i < k && current != null; i++) {
                current = current.next;
            }
            if (current == null) {
                break; // 如果节点数不足k个，结束循环
            }
            ListNode start = pre.next; // 每组的第一个节点
            ListNode next = current.next; // 下一组的开始节点
            current.next = null; // 断开当前组
            pre.next = reverse(start); // 反转当前组，并连接前一组
            start.next = next; // 连接到下一组
            pre = start;
            current = pre;
        }
        return dummy.next;
    }

    private ListNode reverse(ListNode head) {
        ListNode result = null;
        ListNode current = head;
        while (current != null) {
            ListNode next = current.next;
            current.next = result;
            result = current;
            current = next;
        }
        return result;
    }
}
```

## 返回链表的最后k个节点
# 题目描述

输入一个长度为 n 的链表，返回该链表中最后 k 个节点。

如果该链表长度小于 k，请返回一个长度为 0 的链表。

示例1

> <font style="color:rgb(102, 102, 102);">输入：{1,2,3,4,5},2</font><font style="color:rgb(102, 102, 102);"></font>
>
> <font style="color:rgb(102, 102, 102);">返回值：{4,5}</font><font style="color:rgb(102, 102, 102);"></font>
>
> <font style="color:rgb(102, 102, 102);">说明：返回链表的最后两个节点是  {4,5}</font><font style="color:rgb(102, 102, 102);"></font>

<font style="color:rgb(102, 102, 102);">示例2</font>

> <font style="color:rgb(102, 102, 102);">输入：{2},8</font><font style="color:rgb(102, 102, 102);"></font>
>
> <font style="color:rgb(102, 102, 102);">返回值：{}</font>
>
> <font style="color:rgb(102, 102, 102);">说明：k 大于链表长度，返回空。</font>

# <font style="color:rgb(102, 102, 102);">解法1</font>

由于链表不支持随机访问，我们只需找到链表的倒数第 k 个节点即可，如果我们知道数组长度，假设是 n，第 （n - k）个节点也就是我们要找的节点。

实现思路：

1. 遍历链表，计算出链表长度，假设为 n
2. 第二次遍历链表，找到第 （n - k）节点，返回即可。

```java
public ListNode FindKthToTail(ListNode pHead, int k) {
    // 判空
    if (pHead == null || k == 0) {
        return null;
    }
    
    // 计算数组长度
    int n = 0;
    ListNode current = pHead;
    while (current != null) {
        n++;
        current = current.next;
    }
    if (k > n) {
        return null;
    }
    
    // 找到第（n - k）个节点
    int i = 0;
    current = pHead;
    while (current != null) {
        if (i == (n - k)) {
            break;
        }
        i++;
        current = current.next;
    }
    return current;
}
```

# 解法2

还有一种巧妙的办法，不用计算链表长度，也能找到链表的倒数第 k 个节点。使用快慢指针。

实现思路：

1. 快指针先走 k 步，链表剩余（数组长度 - k）步还没有走。
2. 此时慢指针开始出发，两个指针同时移动，当快指针走到链表末尾的时候，慢指针刚好走了（数组长度 - k）步，也就到达了链表的倒数第 k 个节点。

```java
public ListNode FindKthToTail(ListNode pHead, int k) {
    // 判空
    if (pHead == null || k == 0) {
        return null;
    }

    // 快指针移动 k 个节点
    ListNode fast = pHead;
    for (int i = 0; i < k; i++) {
        // 判断 k 是否大于链表长度
        if (fast == null) {
            return null;
        }
        fast = fast.next;
    }
    
    // 快慢指针同时移动，快指针移动到末尾，返回慢指针
    ListNode slow = pHead;
    while (fast != null) {
        fast = fast.next;
        slow = slow.next;
    }
    return slow;
}
```

## 删除有序链表中重复的元素2
# 题目描述

删除给出链表中的重复元素（链表中元素从小到大有序），使链表中的所有元素都只出现一次

例如：

给出的链表为 1 -> 1 -> 2，返回  2

给出的链表为 1 -> 1 -> 2 -> 3 -> 3 -> 3 -> 5，返回  2 -> 5

# 解法

**实现思路：**

遍历链表，比较两个相邻节点的值，如果相等，继续跟下个节点比较，直到找到不等的节点为止，删除这些值相等的节点。如果不相等，继续向下遍历。

```java
public ListNode deleteDuplicates(ListNode head) {
    // 判空
    if (head == null) {
        return null;
    }
    // 在头节点前增加一个空节点，方便删除头节点
    ListNode result = new ListNode(0);
    result.next = head;

    ListNode current = result;
    // 当前节点和下个节点不为空
    while (current.next != null && current.next.next != null) {
        // 判断相邻节点是否相等，如果相等，则删除
        if (current.next.val == current.next.next.val) {
            // 删除后面所有相等的节点
            int temp = current.next.val;
            while (current.next != null && current.next.val == temp) {
                current.next = current.next.next;
            }
        } else {
            // 否则继续向下遍历
            current = current.next;
        }
    }
    return result.next;
}
```

## 删除有序链表中重复的元素1
# 题目描述

删除给出链表中的重复元素（链表中元素从小到大有序），使链表中的所有元素都只出现一次

例如：

给出的链表为 1 -> 1 -> 2，返回  1 -> 2

给出的链表为 1 -> 1 -> 2 -> 3 -> 3，返回  1 -> 2 -> 3

# 解法

**实现思路：**

遍历链表，比较两个相邻节点的值，如果相等，则删除其中一个节点。如果不相等，继续向下遍历。

```java
/*
 * public class ListNode {
 *   int val;
 *   ListNode next = null;
 *   public ListNode(int val) {
 *     this.val = val;
 *   }
 * }
 */

public ListNode deleteDuplicates(ListNode head) {
    // 判空
    if (head == null) {
        return null;
    }
    ListNode current = head;
    // 当前节点和下个节点不为空
    while (current != null && current.next != null) {
        // 判断相邻节点是否相等，如果相等，则删除
        if (current.val == current.next.val) {
            current.next = current.next.next;
        } else {
            // 否则继续向下遍历
            current = current.next;
        }
    }
    return head;
}
```

## 判断链表是否是回文
给定一个链表，请判断该链表是否为回文结构。

回文是指该字符串正序逆序完全一致。

示例1：

> <font style="color:rgb(102, 102, 102);">输入：{1}</font><font style="color:rgb(102, 102, 102);"></font>
>
> <font style="color:rgb(102, 102, 102);">返回值：true</font>

示例2：

> <font style="color:rgb(102, 102, 102);">输入：{2,1}</font><font style="color:rgb(102, 102, 102);"></font>
>
> <font style="color:rgb(102, 102, 102);">返回值：false</font><font style="color:rgb(102, 102, 102);"></font>
>
> <font style="color:rgb(102, 102, 102);">说明：2->1   </font>

示例3：

> <font style="color:rgb(102, 102, 102);">输入：{1,2,2,1}</font><font style="color:rgb(102, 102, 102);"></font>
>
> <font style="color:rgb(102, 102, 102);">返回值：true</font>
>
> <font style="color:rgb(102, 102, 102);">说明：1->2->2->1   </font>

# 解法1

由于链表不支持随机查询，可将链接转换成list，再进行随机查询比较。

+ 时间复杂度：O(n)，两次遍历；
+ 空间复杂度：O(n)，列表存储数据需要的size为n。

```java
public boolean isPail(ListNode head) {
    if (head.next == null) {
        return true;
    }
    // 将链表转换成list
    List<Integer> list = new ArrayList<>();
    while (head != null) {
        list.add(head.val);
        head = head.next;
    }
    // 返回进行头尾比较
    for (int i = 0; i <= list.size() / 2; i++) {
        if (!list.get(i).equals(list.get(list.size() - i - 1))) {
            return false;
        }
    }
    return true;
}
```

# 解法2

使用快慢指针，快指针的速度为慢指针的两倍，当快指针到达链表尾部时，慢指针到达中间位置，将慢指针之后的部分进行反转，再与前半部分进行比较。

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1689495739268-2e6aded3-8d2c-4893-9868-cbb9c6550640.png)

```java
public boolean isPail(ListNode head) {
    ListNode fast = head, slow = head;
    // 通过快慢指针找到中间位置
    while (fast != null && fast.next != null) {
        fast = fast.next.next;
        slow = slow.next;
    }
    //如果fast不为空，说明链表的长度是奇数
    if (fast != null) {
        slow = slow.next;
    }
    //反转后半部分链表
    slow = reverse(slow);

    fast = head;
    while (slow != null) {
        //然后比较，判断节点值是否相等
        if (fast.val != slow.val)
            return false;
        fast = fast.next;
        slow = slow.next;
    }
    return true;
}

// 反转链表
public ListNode reverse(ListNode head) {
    if (head == null) {
        return null;
    }
    // result为反转后链表的头节点
    ListNode result = null;
    while (head != null) {
        // 存储next节点，保证与链表断开后，不会失去连接
        ListNode next = head.next;
        // 把head节点插入到result节点的前面
        head.next = result;
        // 使用result替换head，一次反转结束
        result = head;
        // 把第一步存储的next节点还给head
        head = next;
    }
    // 返回结果
    return result;
}
```

## 判断链表是否有环
判断给定的链表中是否有环。如果有环则返回true，否则返回false。

输入分为两部分，第一部分为链表，第二部分代表是否有环，然后将组成的head头结点传入到函数里面。-1代表无环，其它的数字代表有环，这些参数解释仅仅是为了方便读者自测调试。实际在编程时读入的是链表的头节点。

例如输入{3,2,0,-4},1时，对应的链表结构如下图所示：

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686495845241-92027e57-f01a-41da-88cb-f626fdf898d4.png)<font style="color:rgb(102, 102, 102);">  
</font>

可以看出环的入口结点为从头结点开始的第1个结点（注：头结点为第0个结点），所以输出true。

<font style="color:rgb(51, 51, 51);">示例1：</font>

输入：{3,2,0,-4},1

返回值：true

说明：第一部分{3,2,0,-4}代表一个链表，第二部分的1表示，-4到位置1（注：头结点为位置0），即-4->2存在一个链接，组成传入的head为一个带环的链表，返回true

<font style="color:rgb(51, 51, 51);">示例2：</font>

输入：{1},-1

返回值：false

说明：第一部分{1}代表一个链表，-1代表无环，组成传入head为一个无环的单链表，返回false

<font style="color:rgb(51, 51, 51);">示例3：</font>

输入：{-1,-7,7,-4,19,6,-9,-5,-2,-5},6

返回值：true

<font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);"></font>

<font style="color:rgb(51, 51, 51);">判断给定的链表中是否有环。如果有环则返回true，否则返回false。</font>

<font style="color:rgb(51, 51, 51);">实现思路：</font>

1. <font style="color:rgb(51, 51, 51);">使用快慢指针</font>
2. <font style="color:rgb(51, 51, 51);">快指针每次移动两步，慢指针每次移动一步。</font>
3. <font style="color:rgb(51, 51, 51);">如果快指针追上慢指针，说明有环。如果快指针移动到末尾，说明无环。</font>

```java
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
```

<font style="color:rgb(51, 51, 51);">其中，ListNode是链表节点的定义，包含一个val属性和一个next属性，表示节点的值和下一个节点的指针。</font>

## 两个链表的第一个公共节点
# 题目描述

输入两个无环的单向链表，找出它们的第一个公共结点，如果没有公共节点则返回空。

示例：

输入 1 -> 2 -> 3 -> 6 ->7 和 4 -> 5 -> 6 -> 7，输出 节点 6

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1689748288455-d90820ae-d332-4bb1-aff6-cd489e852ea9.png)

# 解法1

最容易想到的办法是：

1. 遍历链表1，把链表1的节点都放入 Set 集合中。
2. 然后遍历链表2，同时判断节点是否存在 Set 集合中，如果存在，说明两个链表相交，返回当前节点。如果不存在，说明两个链表不相交。

**复杂度分析：**

**时间复杂度：**O(m+n)。链表1和链表2的长度之和。

**空间复杂度：**O(m)。使用额外的 Set 集合存储链表1的节点。

```java
public ListNode FindFirstCommonNode(ListNode pHead1, ListNode pHead2) {
    // 先把链表1的节点放到集合中
    Set<ListNode> set = new HashSet<>();
    while (pHead1 != null) {
        set.add(pHead1);
        pHead1 = pHead1.next;
    }

    // 遍历链表2，判断节点是否在 set 集合中
    while (pHead2 != null) {
        if (set.contains(pHead2)) {
            return pHead2;
        }
        pHead2 = pHead2.next;
    }
    // 如果不存在，说明不相交。
    return null;
}
```

# 解法2

有没有不需要申请额外空间，就能算出相交节点的方法？

由于两个链表的长度不同，遍历的时候怎么才能同时到达公共节点 6 的位置？

最容易想到的办法是：

1. 使用两个指针，分别去遍历两个链表。
2. 第一次先计算出两个链表的长度
3. 第二次让长度较长的链表先走，直到剩余长度和长度较短的链表长度相等，两个指针再同时走。
4. 如果相等，说明两个链表相交，返回当前节点。否则遍历到两个链表末尾结束。

**复杂度分析：**

**时间复杂度：**O(m+n)。链表1和链表2的长度之和。

**空间复杂度：**O(1)。常数的空间。

```java
public ListNode FindFirstCommonNode(ListNode pHead1, ListNode pHead2) {
    // 计算出两个链表的长度
    int len1 = length(pHead1), len2 = length(pHead2);

    // 如果链表长度不一样，长度较长的先走，直到他们的长度一样为止
    while (len1 != len2) {
        if (len1 > len2) {
            pHead1 = pHead1.next;
            len1--;
        } else {
            pHead2 = pHead2.next;
            len2--;
        }
    }

    // 然后两个链表同时走，直到相交，或者走到末尾
    while (pHead1 != pHead2) {
        pHead1 = pHead1.next;
        pHead2 = pHead2.next;
    }
    return pHead1;
}

// 计算链表长度
private int length(ListNode pHead) {
    int length = 0;
    while (pHead != null) {
        pHead = pHead.next;
        length++;
    }
    return length;
}
```

# 解法3

由于两个链表的长度不同，遍历的时候怎么才能同时到达公共节点 6 的位置？

还有一个巧妙的办法，就是让两个指针同时去遍历两个链表，最终两个指针走过的长度相等，都是 链表1 + 链表2。

**实现思路：**

1. 使用两个指针 index1 和 index2，同时去遍历链表1和链表2。
2. 当指针 index1 走到链表1的末尾时，继续从头开始遍历链表2，最终指针 index1 走过的路径是 1 -> 2 -> 3 -> 6 -> 7 -> 4 -> 5 -> 6。
3. 当指针 index2 走到链表2的末尾时，继续从头开始遍历链表1，最终指针 index2 走过的路径是 4 -> 5 -> 6 -> 7 -> 1 -> 2 -> 3 -> 6。
4. 两个指针走过的路径长度相同，最终在节点 6 位置相遇。
5. 如果两个链表没有相交，当两个指针同时遍历完两个链表，也就是 index1 和 index2 都是 null，结束。

```java
public ListNode FindFirstCommonNode(ListNode pHead1, ListNode pHead2) {
    // 使用两个指针同时遍历两个链表
    ListNode index1 = pHead1, index2 = pHead2;
    // 当节点相等或者每个指针都遍历完两个链表时，退出循环
    while (index1 != index2) {
        // 当指针遍历完当前链表时，接着从头开始遍历另一个链表
        index1 = (index1 == null) ? pHead2 : index1.next;
        index2 = (index2 == null) ? pHead1 : index2.next;
    }
    return index1;
}
```

**复杂度分析：**

**时间复杂度：**O(m+n)。链表1和链表2的长度之和。

**空间复杂度：**O(1)。常数的空间。

## 链表内指定区间反转
# 题目描述

将链表 m 位置到 n 位置之间的区间反转，要求时间复杂度 O(n)，空间复杂度 O(1)。

例如：

给出的链表 1 -> 2 -> 3 -> 4 -> 5，m = 2，n = 4。

返回的链表 1 -> 4 -> 3 -> 2 -> 5

# 解法

1. 给链表创建一个虚拟头结点，方便处理m=1的情况（从头节点开始反转）。
2. 遍历链表，找到m节点的前驱节点，定义为pre节点。
3. 从m节点开始反转，直到n节点结束。
4. 返回链表的头节点

怎样反转链表中相邻的两个节点，还需要一点小技巧。例如：怎么下面链表中节点2和节点3交换位置？

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1692781124065-38b97641-b8ff-4a79-9ffb-db7b101f7a9b.png)

分为下面几步：

1. 保存节点3的位置，防止断开连接。
2. 断开节点2与节点3的连接，将节点2的后继节点指向节点4。
3. 断开节点3与节点4的连接，将节点3的后继节点指向节点2。
4. 断开节点1与节点2的连接，将节点1的后继节点指向节点3。

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1692782143478-30498911-5522-4138-8da6-632891b54550.png)

```java
public class Solution {

    // 二叉搜索树的最近公共祖先，使用递归实现
    public ListNode reverseBetween(ListNode head, int m, int n) {
        // 创建一个虚拟头结点，方便处理m=1的情况
        ListNode dummy = new ListNode(0);
        dummy.next = head;

        // 找到m节点的前驱节点pre节点
        ListNode pre = dummy;
        for (int i = 1; i < m; i++) {
            pre = pre.next;
        }

        // 从m节点开始反转，直到n节点结束
        ListNode current = pre.next;
        for (int i = m; i < n; i++) {
            // 保存current的下一个节点，防止断链
            ListNode next = current.next;
            // 将current节点断开，指向next的下一个节点
            current.next = next.next;
            // 将next节点插入到pre的后面
            next.next = pre.next;
            // 更新pre的next指针，指向插入的节点next
            pre.next = next;
        }

        // 返回虚拟头结点的下一个节点，即反转后的链表头结点
        return dummy.next;
    }

}
```

## 合并k个已排序的链表
# 题目描述

合并 k 个升序的链表并将结果作为一个升序的链表返回其头节点。

要求：时间复杂度 O(nlogn)

# 解法

1. 创建一个新链表
2. 循环遍历链表集合，找到最小值的节点，追加到新链表上面，然后移除最小节点
3. 重复第2步

```java
public class Solution {
    public ListNode mergeKLists(ArrayList<ListNode> lists) {
        ListNode head = new ListNode(0), cur = head;
        while (true) {
            // 本轮循环，值最小的节点
            ListNode minNode = null;
            // 本轮循环，值最小的节点，所在的集合下标
            int minIndex = 0;
            for (int i = 0; i < lists.size(); i++) {
                // 找到本轮循环中，值最小节点和下标
                if (lists.get(i) != null) {
                    if (minNode == null) {
                        minNode = lists.get(i);
                        minIndex = i;
                    } else if (minNode.val > lists.get(i).val) {
                        minNode = lists.get(i);
                        minIndex = i;
                    }
                }
            }
            if (minNode == null) {
                break;
            }
            // 找到最小节点，将其插入到链表中
            cur.next = minNode;
            cur = minNode;
            // 移除最小节点
            lists.set(minIndex, minNode.next);
        }
        return head.next;
    }
}
```

## 合并两个有序链表
# <font style="color:rgb(0, 0, 0);">题目描述</font>

<font style="color:rgb(0, 0, 0);">输入两个递增的链表，单个链表的长度为n，合并这两个链表并使新链表中的节点仍然是递增排序的。</font><font style="color:rgb(102, 102, 102);">  
</font><font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">要求：空间复杂度 O(1)，时间复杂度O(n)</font>

<font style="color:rgb(0, 0, 0);">如输入{1,3,5},{2,4,6}时，合并后的链表为{1,2,3,4,5,6}，所以对应的输出为{1,2,3,4,5,6}，转换过程如下图所示：</font>

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1689412079811-aa69f2e2-7a12-428b-ba30-14629f39e0e6.png)

<font style="color:rgb(0, 0, 0);">两个有序链表，合并成一个有序链表。</font>

# <font style="color:rgb(0, 0, 0);">解法1</font>

<font style="color:rgb(0, 0, 0);">实现思路：</font>

1. <font style="color:rgb(0, 0, 0);">新建一个空链表，用来存储合并后的结果。</font>
2. <font style="color:rgb(0, 0, 0);">比较两个链表第一个节点的值，如果链表1的值较小，则把链表1的节点放到空链表中，链表1节点向后移动一位，否则以同样的方式处理链表2。</font>
3. <font style="color:rgb(0, 0, 0);">循环上述步骤，直到遍历完链表1和链表2。</font>

新建mergeHead为合并后的链表头节点，mergeTail为合并后链表尾节点

```java
public ListNode merge(ListNode pHead1, ListNode pHead2) {
    if (pHead1 == null) {
        return pHead2;
    }
    if (pHead2 == null) {
        return pHead1;
    }
    // mergeHead为合并后的链表头节点，mergeTail为合并后链表尾节点
    ListNode mergeHead = null;
    ListNode mergeTail = null;
    while (pHead1 != null && pHead2 != null) {
        if (pHead1.val <= pHead2.val) {
            if (mergeHead == null) {
                mergeHead = mergeTail = pHead1;
            } else {
                mergeTail.next = pHead1;
                mergeTail = mergeTail.next;
            }
            pHead1 = pHead1.next;
        } else {
            if (mergeHead == null) {
                mergeHead = mergeTail = pHead2;
            } else {
                mergeTail.next = pHead2;
                mergeTail = mergeTail.next;
            }
            pHead2 = pHead2.next;
        }
    }
    if (pHead1 == null) {
        mergeTail.next = pHead2;
    } else {
        mergeTail.next = pHead1;
    }
    return mergeHead;
}
```

# 解法2

使用递归方法，逻辑更简单：

```java
public ListNode merge(ListNode pHead1, ListNode pHead2) {
    if (pHead1 == null) {
        return pHead2;
    }
    if (pHead2 == null) {
        return pHead1;
    }
    // 如果链表1值较小，就把合并后的链表拼接到链表1上面，返回链表1
    if (pHead1.val <= pHead2.val) {
        pHead1.next = merge(pHead1.next, pHead2);
        return pHead1;
    } else {
        pHead2.next = merge(pHead1, pHead2.next);
        return pHead2;
    }
}
```

## 奇偶逆序重排链表
假设你有一个单向链表L，其首节点被标为"head"，这个链表代表了小美的工作任务流程：

L0 → L1 → … → Ln-1 → Ln

你需要对其进行重新组织，以达到以下新的工作任务流程：

L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …

请注意，这里不能只修改节点任务的内容，而是需要实际地进行节点任务的交换。



备注

链表的长度范围为 [1, 5 * 10 4 ]

1 <= node.val <= 1000



示例1

输入

head = [1,2,3,4,5,6]

输出

[1,6,2,5,3,4]



示例2

输入

head = [1,2,3,4,3,2,1]

输出

[1,1,2,2,3,3,4]



# 解法

1. 计算出链表长度
2. 反转后半段链表
3. 与前半段链表拼接起来

```java
class Solution {
    public void reorderList(ListNode head) {
        // 1. 计算链表长度
        int n = 0;
        ListNode cur = head;
        while (cur != null) {
            n++;
            cur = cur.next;
        }

        // 2. 找到中间节点
        cur = head;
        int count = 0;
        while (cur != null) {
            cur = cur.next;
            count++;
            if (count == n / 2) {
                break;
            }
        }

        // 3. 反转后半部分链表
        ListNode cur2 = null;
        while (cur != null) {
            ListNode next = cur.next;
            cur.next = cur2;
            cur2 = cur;
            cur = next;
        }

        // 4. 合并链表
        cur = head;
        while (cur2 != null) {
            ListNode next1 = cur.next;
            ListNode next2 = cur2.next;
            cur2.next = cur.next;
            cur.next = cur2;
            cur = next1;
            cur2 = next2;
            if (cur2 == null) {
                cur.next = null;
                break;
            }
        }
    }
}
```

## 反转链表
## <font style="color:rgb(51, 51, 51);">}描述</font>

<font style="color:rgb(102, 102, 102);">给定一个单链表的头结点pHead(该头节点是有值的，比如在下图，它的val是1)，长度为n，反转该链表后，返回新链表的表头。</font>

<font style="color:rgb(102, 102, 102);">如当输入链表{1,2,3}时，</font>

<font style="color:rgb(102, 102, 102);">经反转后，原链表变为</font><font style="color:rgb(102, 102, 102);">{3,2,1}，所以</font><font style="color:rgb(102, 102, 102);">对应的输出为{3,2,1}。</font>

<font style="color:rgb(102, 102, 102);">以上转换过程</font><font style="color:rgb(102, 102, 102);">如下图所示：</font>

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686495732666-473ffdea-4046-4a71-8bf0-bd0dae501d75.png)

<font style="color:rgb(51, 51, 51);">示例1</font>

<font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">输入：</font><font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">{1,2,3}</font><font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">复制</font>

<font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">返回值：</font><font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">{3,2,1}</font><font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">复制</font>

<font style="color:rgb(51, 51, 51);">示例2</font>

<font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">输入：</font><font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">{}</font><font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">复制</font>

<font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">返回值：</font><font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">{}</font><font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">复制</font>

<font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">说明：空链表则输出空    </font>

<font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">实</font>现思路：

1. <font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">存储 next 节点</font>
2. <font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">把 head 节点插入到 pre 节点的头部</font>
3. <font style="color:rgb(102, 102, 102);background-color:rgb(247, 248, 249);">把 head 节点替换为 pre 节点，自此完成了把 head 节点节点插入到 pre 头节点的工作。</font>

```java
public ListNode reverseList(ListNode head) {
    if (head == null) {
        return null;
    }
    // result为反转后链表的头节点
    ListNode result = null;
    while (head != null) {
        // 存储next节点，保证与链表断开后，不会失去连接
        ListNode next = head.next;
        // 把head节点插入到result节点的前面
        head.next = result;
        // 使用result替换head，一次反转结束
        result = head;
        // 把第一步存储的next节点还给head
        head = next;
    }
    // 返回结果
    return result;
}
```

![](https://cdn.nlark.com/yuque/0/2024/png/12651402/1712325085778-f373cb66-8d7b-4d8b-85cd-590862b82b6f.png)

![](https://cdn.nlark.com/yuque/0/2024/png/12651402/1712325130282-fa7e3ce9-7277-47fd-a338-72234e4a4767.png)











