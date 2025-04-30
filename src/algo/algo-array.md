## 盛水最多的容器
## 题目描述

给定一个数组height，长度为n，每个数代表坐标轴中的一个点的高度，height[i] 是在第 i 点的高度，请问，从中选2个高度与x轴组成的容器最多能容纳多少水?

1. 你不能倾斜容器
2. 当n小于2时，视为不能形成容器，请返回0
3. 数据保证能容纳最多的水不会超过整形范围，即不会超过2^31-1

![](https://cdn.nlark.com/yuque/0/2024/png/12651402/1717769101069-921abe9a-398f-42dc-be24-2388a85a84ff.png)

示例：

输入：[1,7,3,2,4,5,8,2,7]

输出：49

## 解法

解题思路：

1. 使用双指针法，从左右两侧同时遍历数组。
2. 计算当前指针指向的两个高度能组成的容器的容量 currentArea。
3. 更新最大容器的容量 maxArea。
4. 移动较短高度的一侧指针，以尝试找到更大的容器。

```java
public class MaxWaterContainer {

    public static int maxArea(int[] height) {
        if (height == null || height.length < 2) {
            return 0;
        }

        // maxArea用于存储最大容量
        int maxArea = 0;
        // left与right表示左右指针
        int left = 0;
        int right = height.length - 1;

        while (left < right) {
            int width = right - left;
            // 高度取左右轴最小的高度
            int currentHeight = Math.min(height[left], height[right]);
            // 计算当前面积
            int currentArea = width * currentHeight;
            // 更新最大面积
            maxArea = Math.max(maxArea, currentArea);

            // 移动高度较小的指针
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxArea;
    }

    public static void main(String[] args) {
        int[] height = {1, 8, 6, 2, 5, 4, 8, 3, 7};
        System.out.println("Maximum water that can be contained: " + maxArea(height)); // 输出结果是 49
    }
}

```

## 两数相加
#### <font style="color:rgb(28, 31, 33);">内容描述</font>


```plain
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储一位数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
```

## <font style="color:rgb(28, 31, 33);">解题方案</font>

#### <font style="color:rgb(28, 31, 33);">思路 1：时间复杂度: O(N) 空间复杂度: O(N)</font>

<font style="color:rgb(0, 0, 0);">从题目中可以得知：</font>

+ <font style="color:rgb(28, 31, 33);">两个链表都是非空的，也就是至少拥有一个节点；</font>
+ <font style="color:rgb(28, 31, 33);">链表存储的是非负整数，且其位数是按照逆序的方式存储的</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">例如：342 存为 2 -> 4 -> 3</font><font style="color:rgb(28, 31, 33);">；</font>
+ <font style="color:rgb(28, 31, 33);">非负整数不会以 0 开头，因此我们不需要考虑链表末尾有无数个 0 的情况；</font>
+ <font style="color:rgb(28, 31, 33);">最后两数相加的结果也要存为链表返回，并且是逆序表示的。</font>

<font style="color:rgb(0, 0, 0);">别笑，你第一想法是不是将</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">l1</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">和</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">l2</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">全部变成数字做加法再换回去？这是我们最直接的想法了，那好，我们就来实现一下。</font>

<font style="color:rgb(0, 0, 0);">下面来看具体代码：</font>

_**<font style="color:rgb(0, 0, 0);">Java beats 52.43%</font>**_



```java
import java.math.BigInteger;
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        String numStr1 = String.valueOf(l1.val);
        String numStr2 = String.valueOf(l2.val);

        // 拼接 l1 的值
        while (l1.next != null){
            numStr1 += String.valueOf(l1.next.val);
            l1 = l1.next;
        }

        // 拼接 l2 的值
        while (l2.next != null) {
            numStr2 += String.valueOf(l2.next.val);
            l2 = l2.next;
        }

        // 使用 BigInteger 是为了防止大数的溢出
        BigInteger num1 = new BigInteger(new StringBuffer(numStr1).reverse().toString());
        BigInteger num2 = new BigInteger(new StringBuffer(numStr2).reverse().toString());

        BigInteger sum = num1.add(num2);

        String sumStr = new StringBuffer(String.valueOf(sum)).reverse().toString();

        ListNode head = new ListNode(0);
        ListNode dummy = head;
        // 将字符串 sum 转化为链表形式的 sum
        for (int i = 0; i < sumStr.length(); i++) {
            head.next = new ListNode(Integer.parseInt(String.valueOf(sumStr.charAt(i))));
            head = head.next;
        }
        return dummy.next;
    }
}
```



<font style="color:rgb(0, 0, 0);background-color:rgb(245, 245, 245);">注意：本思路只适用于大数基础数据结构的语言，例如 java 的 BigInteger 和 go 的 bigint，c++需要自己实现大数加法，详见思路2。</font>

<font style="color:rgb(0, 0, 0);">思路1的话，我们先把相关信息全部存成我们适应处理的结构，然后才去处理，这样的话会浪费一定的空间，我们能做一些优化吗？不存下来可以吗？</font>

#### <font style="color:rgb(28, 31, 33);">思路 2：时间复杂度: O(N) 空间复杂度: O(N)</font>

<font style="color:rgb(0, 0, 0);">因为我们一定得遍历完</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">l1</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">和</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">l2</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">的每一位才能得到最终结果，所以时间复杂度为</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">O(N)</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">没得商量。</font>

<font style="color:rgb(0, 0, 0);">虽然时间复杂度无法减小，但是我们可以考虑减小我们的空间复杂度啊，刚才我们是将</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">l1</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">和</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">l2</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">全部转回数字，然后用两个列表将它们的数字形式存了下来，这消耗了</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">O(N)</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">的空间。</font>

<font style="color:rgb(0, 0, 0);">实际上我们完全可以模拟真正的加法操作，即从个位数开始相加，如果有进位就记录一下，等到十位数相加的时候记得加上那个进位</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">1</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">就可以了，这是我们小学就学过的知识。</font>

<font style="color:rgb(0, 0, 0);">那么我们就先处理个位数的相加。然后我们发现处理十位数、百位数和后面的位数都和个位数相加的操作是一个样子的，只不过后面计算的结果乘上</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">10</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">再加上个位数相加的结果，这才是最终的结果。</font>

<font style="color:rgb(0, 0, 0);">于是我们就想到了用递归的方法，即一步一步将大问题转化为更小的问题，直到遇到基础情况（这里指的是个位数相加）返回即可。</font>

<font style="color:rgb(0, 0, 0);">下面我们来看代码：</font>

_**<font style="color:rgb(0, 0, 0);">Java beats 94.96%</font>**_



```java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode l3 = null;
        if (l1 == null && l2 == null) {
            // l1 与 l2 都为 null 的情况
            return null;
        } else if (l1 == null && l2 != null) {
            // l1 为 null 但是 l2 不为 null 的情况
            return l2;
        } else if (l1 != null && l2 == null) {
            // l1 不为 null 但是 l2 为 null 的情况
            return l1;
        } else {
            // l1 l2 都不为 null 的情况
            if (l1.val + l2.val < 10) {
                // 不需要进位的情况
                l3 = new ListNode(l1.val + l2.val);
                l3.next = addTwoNumbers(l1.next, l2.next);
            }else {
                // 需要进位的情况
                l3 = new ListNode(l1.val + l2.val - 10);
                l3.next = addTwoNumbers(l1.next, addTwoNumbers(l2.next, new ListNode(1)));
            }
        }
        return l3;
    }
}
```

<font style="color:rgb(0, 0, 0);">尽管这次我们没有先存储再处理，为什么递归还是是O(N)的空间复杂度呢？因为我们虽然没有手动存储，但是计算机内部还是帮我们存储了一个函数调用栈的。又因为每调一次我们栈的高度都会增加1，而这里显然我们需要调用N次，N指的是较长的那个链表的长度。</font>

<font style="color:rgb(0, 0, 0);">现在我们既不想手动存储，也不想计算机帮我们存储，我们就不想用额外空间，可以吗？</font>

#### <font style="color:rgb(28, 31, 33);">思路 3 时间复杂度: O(N) 空间复杂度: O(1)</font>

<font style="color:rgb(0, 0, 0);">好的，我们不用递归了，但是我们可以用迭代的方式来模拟这个过程，这样我们的空间可算是节省下来了。</font>

_**<font style="color:rgb(0, 0, 0);">Java beats 87.41%</font>**_



```java
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode head = null;
        ListNode tail = null;
        // one 用来判断是否应该进位
        boolean one = false;
        while (l1 != null || l2 != null) {
            int val = 0;
            if (l1 != null) {
                val += l1.val;
                l1 = l1.next;
            }
            if (l2 != null) {
                val += l2.val;
                l2 = l2.next;
            }
            if (one) {
                val += 1;
            }
            // 判断是否进位
            if (val >= 10) {
                val -= 10;
                one = true;
            }else {
                one = false;
            }
            if (head == null) {
                head = tail = new ListNode(val);
            }else {
                tail.next = new ListNode(val);
                tail = tail.next;
            }
        }
        if (one) {
            tail.next = new ListNode(1);
        }
        return head;
    }
}
```

_**<font style="color:rgb(0, 0, 0);"></font>**_

<font style="color:rgb(0, 0, 0);">好的，我们现在没用额外空间来存储了，而是直接在链表上面操作，这样更节省时间。</font>

## <font style="color:rgb(28, 31, 33);">总结</font>

+ <font style="color:rgb(28, 31, 33);">看题目的时候要注意非空、逆序、整数这样的敏感字眼；</font>
+ <font style="color:rgb(28, 31, 33);">要注意有的时候大数溢出是很容易被忽略的点；</font>
+ <font style="color:rgb(28, 31, 33);">我们知道了递归会涉及到电脑里的调用栈，所以递归还是会消耗额外空间的；</font>
+ <font style="color:rgb(28, 31, 33);">有的时候用迭代模拟递归的过程可以节省空间。</font>

## <font style="color:rgb(28, 31, 33);">学习更多</font>

+ <font style="color:rgb(28, 31, 33);">链表的应用场景</font>
+ <font style="color:rgb(28, 31, 33);">大整数类的实现</font>

## 旋转数组的最小数字
# 题目描述

有一个非降序数组，比如[1,2,3,4,5]，将它进行旋转，即把一个数组最开始的若干个元素搬到数组的末尾，变成一个旋转数组，比如变成了[3,4,5,1,2]，或者[4,5,1,2,3]这样的。请问，给定这样一个旋转数组，求数组中的最小值。

示例1

> 输入：[3,4,5,1,2]
>
> 返回值：1

示例2

> 输入：[3,100,200,3]
>
> 返回值：3

# 解法

旋转数组的特点是：前半段是有序的，后半段也是有序的，但是整体是无序的。怎么利用这个特点，找出数组的最小值？

这道题相当于二分查找的变体，也可以使用二分查找来求解。

实现思路：

循环比较中间值与末尾值大小，比较结果分为三种情况：

1. array[mid] > array[high]

出现这种情况的array类似[3,4,5,6,1,2]，此时最小数字一定在 mid 的右边。则 low = mid + 1

2. array[mid] = array[high]

出现这种情况的array类似 [1,0,1,1,1] 或者[1,1,1,0,1]，此时最小数字不好判断在 mid 左边还是右边，这时只好一个一个试，末尾位置左移一位，则 high = high - 1

3. array[mid] < array[high]

出现这种情况的array类似[1,0,1,1,1]，此时最小数字一定就是array[mid]或者在mid的左

边。因为右边必然都是递增的。则 high = mid

```java
public int minNumberInRotateArray(int[] array) {
    int low = 0;
    int high = array.length - 1;
    while (low < high) {
        // 没有使用 (high + low)/2，防止溢出
        int mid = low + (high - low) / 2;
        if (array[mid] > array[high]) {
            low = mid + 1;
        } else if (array[mid] == array[high]) {
            high = high - 1;
        } else {
            high = mid;
        }
    }
    return array[low];
}
```

## 摆动排序
#### <font style="color:rgb(28, 31, 33);">题目描述</font>


```plain
给定一个无序数组，在原数组中按照 
1、nums[0] <= nums[1] >= nums[2] <= nums[3]....
2、nums[0] < nums[1] > nums[2] < nums[3]....
这种次序进行排序，有无限多种排序方式，输出一种即可

例子:

输入: nums = [3,5,2,1,6,4]
输出: 其中一种输出 [3,5,1,6,2,4]
```

## <font style="color:rgb(28, 31, 33);">解题方案</font>

#### <font style="color:rgb(28, 31, 33);">思路1 时间复杂度: O(NlgN) 空间复杂度: O(N)</font>

<font style="color:rgb(0, 0, 0);">以下的次序1和次序2分别指代我们wiggle sort和wiggle sort 2需要我们返回的次序种类</font>

<font style="color:rgb(0, 0, 0);">观察排序的次序，我们可得次序1是次序2的特例。只要我们构造出数组2，肯定也能满足数组1，我们尝试通过构造数组来达到次序2。</font>

<font style="color:rgb(0, 0, 0);">假设nums有序，将nums拆成两个数组：(设n为数组nums的大小)</font>

<font style="color:rgb(0, 0, 0);">1：[nums[n-1],nums[n-2],…,nums[n/2+1]]</font>

<font style="color:rgb(0, 0, 0);">2：[nums[n/2],nums[n/2-1],…,nums[0]]</font>

<font style="color:rgb(0, 0, 0);">将第一个数组插空到第二个数组中</font>

<font style="color:rgb(0, 0, 0);">形成数组：nums[n/2],nums[n-1],nums[n/2-1],nums[n-2],…</font>

<font style="color:rgb(0, 0, 0);">则该数组位满足条件的数组</font>

<font style="color:rgb(0, 0, 0);">证明这个结论，只需要证明：</font>

<font style="color:rgb(0, 0, 0);">1、如果x是nums中的最小值，那么x的个数不会超过n/2+1(n为奇数)，n/2(n为偶数)</font>

<font style="color:rgb(0, 0, 0);">2、如果x不是nums中的最小值，那么x的个数不会超过n/2</font>

<font style="color:rgb(0, 0, 0);">上面两点的证明很简单，如果个数超过，那么至少会有两个相邻数相等</font>

<font style="color:rgb(0, 0, 0);">所以，nums[n/2]<nums[n-1]，nums[n-1]>nums[n/2-1]，。。。</font>

<font style="color:rgb(0, 0, 0);">次序2构造完毕，相同的代码，次序1肯定能满足</font>



```java
class Solution {
    public void wiggleSort(int[] nums) {
        int[] temp = Arrays.copyOf(nums, nums.length);
        Arrays.sort(temp);
        int k = temp.length - 1;
        for (int i = 1;i < nums.length;i += 2) {
            nums[i] = temp[k--];
        }
        for (int i = 0;i < nums.length;i += 2) {
            nums[i] = temp[k--];
        }
    }
}
```



#### <font style="color:rgb(28, 31, 33);">思路2 时间复杂度: O(N) 空间复杂度: O(1)</font>

<font style="color:rgb(0, 0, 0);">次序1有一种特殊的解法：观察到</font>

1. <font style="color:rgb(28, 31, 33);">如果i是奇数，nums[i] >= nums[i - 1]</font>
2. <font style="color:rgb(28, 31, 33);">如果i是偶数，nums[i] <= nums[i - 1]</font>

<font style="color:rgb(0, 0, 0);">所以我们只要遍历一遍数组，把不符合的情况交换一下就行了。</font>

<font style="color:rgb(0, 0, 0);">具体来说，</font>

<font style="color:rgb(0, 0, 0);">如果nums[i] > nums[i - 1]， 则交换以后肯定有nums[i] <= nums[i - 1]</font>

<font style="color:rgb(0, 0, 0);">假设nums[i]>=nums[i-1]，那么nums[i+1]如果大于nums[i]，这两个数需要交换，交换后仍然有nums[i+1]>nums[i-1]</font>



```java
class Solution {
    public void wiggleSort(int[] nums) {
        for (int i = 0;i < nums.length - 1;i++) {
            if (((i & 1) == 0 && nums[i] > nums[i + 1]) 
                || ((i & 1) == 1 && nums[i] < nums[i + 1])) {
                int temp = nums[i];
                nums[i] = nums[i + 1];
                nums[i + 1] = temp;
            }
        }
    }
}
```

## 搜索旋转排序数组
#### <font style="color:rgb(28, 31, 33);">题目描述</font>


```plain
假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

你可以假设数组中不存在重复的元素。

你的算法时间复杂度必须是 O(log n) 级别。

示例 1:

输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
示例 2:

输入: nums = [4,5,6,7,0,1,2], target = 3
输出: -1
```

#### <font style="color:rgb(28, 31, 33);">题目详解</font>

<font style="color:rgb(0, 0, 0);">题目中要求我们必须使用 O(log n) 级别的算法，所以我们的时间复杂度就有了限制。想一下，什么有什么方法可以让算法的时间复杂度为 O(log n) 呢？</font>

<font style="color:rgb(0, 0, 0);">还记得之前的题目中我们用过的</font><font style="color:rgb(0, 0, 0);"> </font>**<font style="color:rgb(0, 0, 0);">二分算法</font>**<font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">吗？二分算法其复杂度通常都是 O(log n) 的，二分算法同样适用于这道题，下面我们一起来看一下。</font>

## <font style="color:rgb(28, 31, 33);">解题方案</font>

#### <font style="color:rgb(28, 31, 33);">思路 1 时间复杂度: O (lgN) 空间复杂度: O (1)</font>

<font style="color:rgb(0, 0, 0);">我们可以想一下，题目给的数组可以分成两部分了吧，前面一部分中的最小值都要比后面一部分的最大值还要大</font>

<font style="color:rgb(0, 0, 0);">下面是 rotated-array 图解:</font>

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686494169871-aaa3df39-ed16-4cfc-8221-1282343bca9e.png)

<font style="color:rgb(0, 0, 0);">所以这里引入一个二分法，那就是我们先搞两个指针，一个叫 l，指向数组第一个元素，一个叫 r，指向数组最后一个元素，然后我们用两个指针中间的那个元素 mid 来进行比较</font>

+ <font style="color:rgb(28, 31, 33);">如果 mid 指向的元素就是 target，return mid</font>
+ <font style="color:rgb(28, 31, 33);">如果 mid 和 r 同时落在绿线或者红线上</font>
    - <font style="color:rgb(28, 31, 33);">如果 target 在 mid 右边， l 指针右移一位</font>
    - <font style="color:rgb(28, 31, 33);">如果 target 在 mid 左边， r 指针左移一位</font>
+ <font style="color:rgb(28, 31, 33);">如果 r 在绿线上，mid 在红线上时</font>
    - <font style="color:rgb(28, 31, 33);">如果 target 在 mid 右边， l 指针右移一位</font>
    - <font style="color:rgb(28, 31, 33);">如果 target 在 mid 左边， r 指针左移一位</font>
+ <font style="color:rgb(28, 31, 33);">都没找到，return -1</font>

<font style="color:rgb(0, 0, 0);">下面来看具体的代码实现：</font>



```java
class Solution {
    public int search(int[] nums, int target) {
        int l = 0;
        int r = nums.length - 1;
        //搜索区间[l,r]

        while (l <= r) {
            //获得区间[l,r]的中点
            int mid = (l + r) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            if (nums[mid] <= nums[r]) {
                //mid和r同时落在绿线或者红线上
                if (nums[mid] < target && nums[r] >= target) {
                    //target在mid的右边
                    l = mid + 1;
                } else {
                    //target在mid的左边
                    r = mid - 1;
                }
            } else {
                //mid在红线，r在绿线的情况
                if (nums[l] <= target && target < nums[mid]) {
                    //target在mid的左边
                    r = mid - 1;
                } else {
                    //target在mid的右边
                    l = mid + 1;
                }
            }
        }
        return -1;
    }
}
```

## 下一个排列
#### <font style="color:rgb(28, 31, 33);">题目描述</font>


```plain
实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

必须原地修改，只允许使用额外常数空间。

以下是一些例子，输入位于左侧列，其相应输出位于右侧列。
1,2,3 → 1,3,2
3,2,1 → 1,2,3
1,1,5 → 1,5,1
```

## <font style="color:rgb(28, 31, 33);">解题方案</font>

#### <font style="color:rgb(28, 31, 33);">思路：时间复杂度: O (N) 空间复杂度: O (1)</font>

_**<font style="color:rgb(0, 0, 0);background-color:rgb(245, 245, 245);">引子</font>**_<font style="color:rgb(0, 0, 0);background-color:rgb(245, 245, 245);">：十进制数怎么求下一个数？</font>

<font style="color:rgb(0, 0, 0);">比如 1099，从最后一位 9 开始寻找，发现 9 不存在下一个数字，于是看倒数第二位，倒数第二位同样是 9 也不存在下一个数字。看倒数第 3 位，是 0，下一个数字是 1，于是把倒数第三位变成下一个数字 1，再把后面两位变成最小的两个数字，也就是 00，于是 1099 的下一个数就是 1100。</font>

<font style="color:rgb(0, 0, 0);">最后我们总结出来的步骤：</font>

+ <font style="color:rgb(28, 31, 33);">从后面开始，寻找第一个有下一个数字的数字，假设该位置为倒数第 i 位。我们把倒数第 i 位变成它的下一个数字</font>
+ <font style="color:rgb(28, 31, 33);">将</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">倒数第 1 位 - 第 i-1 位变成最小的数字</font><font style="color:rgb(28, 31, 33);">，也就是 0</font>

<font style="color:rgb(0, 0, 0);">首先，什么是全排列呢？上过高中的同学肯定都知道，回顾一下：</font>[全排列](https://baike.baidu.com/item/%E5%85%A8%E6%8E%92%E5%88%97)

<font style="color:rgb(0, 0, 0);">这里题目需要我们获得下一个更大的排列，那么我们想一下，在所有位元素固定的情况下，如何让这个排列数字更大呢？自然是把大一点的数字放在前面比较好啦。但由于我们只是去找下一个更大的排列，而不仅仅是找到一个更大的就行，所以我们要将最合适的一个较大的数字和前面一个较小的数字换一下位置。</font>

+ <font style="color:rgb(28, 31, 33);">如果一个序列是递减的，那么它不具有下一个排列。因为他就是最大的排列</font>
+ <font style="color:rgb(28, 31, 33);">如果一个序列是递增的，那么它是最小的排列</font>

<font style="color:rgb(0, 0, 0);">算法具体流程：</font>

+ <font style="color:rgb(28, 31, 33);">从后面开始，寻找第一个有下一个数字的数字，假设该位置为倒数第 i 位。这里要注意，由于从开头到倒数第 i+1 位，数字不变，因此倒数第 i 位能选的数字只能是倒数第 i 位后面的数字</font>
+ <font style="color:rgb(28, 31, 33);">将倒数第 i 位变成它的取值范围内的下一个数字</font>
+ <font style="color:rgb(28, 31, 33);">将倒数第 1 位 - 第 i-1 位变成最小的排列，也就是，数字升序（由于倒数第 i 位后面的数字是降序的，所以可以利用这个性质来实现 o (n) 的算法来实现升序）</font>

<font style="color:rgb(0, 0, 0);">我们来看一个具体的例子，一个排列为 124653</font>

<font style="color:rgb(0, 0, 0);">我们倒着往前找，遇到 4 小于 6 的情况停止，因为 4 后面有比它大的数。</font>

<font style="color:rgb(0, 0, 0);">并且我们可以知道：</font>

1. <font style="color:rgb(28, 31, 33);">124653 和它的下一个排列的公共前缀为 12 (因为 4653 存在下一个排列，所以前面的数字 12 保持不变)</font>
2. <font style="color:rgb(28, 31, 33);">4 后面的元素是递减的 (上面介绍的终止条件是前一个元素小于后一个元素，这里是 4<6)</font>

<font style="color:rgb(0, 0, 0);">现在，我们开始考虑如何找到 4653 的下个排列，首先明确 4 后面的几个数字中至少有一个大于 4.</font>

<font style="color:rgb(0, 0, 0);">4 肯定要和 653 这 3 个数字中大于 4 的数字中 (6，5) 的某一个进行交换。这里就是 4 要和 6，5 中的某一个交换，很明显要和 5 交换，如果找到这样的元素呢，因为我们知道 4 后面的元素是递减的，所以在 653 中从后面往前查找，找到第一个大于 4 的数字，这就是需要和 4 进行交换的数字。这里我们找到了 5，交换之后得到的临时序列为 5643.，交换后得到的 643 也是一个递减序列。</font>

<font style="color:rgb(0, 0, 0);">所以得到的 4653 的下一个临时序列为 5643，但是既然前面数字变大了 (4653—>5643)，后面的自然要变为升序才行，变换 5643 得到 5346.</font>

<font style="color:rgb(0, 0, 0);">所以 124653 的下一个序列为 125346.</font>

<font style="color:rgb(0, 0, 0);">再来一个例子，比如 125430</font>

+ <font style="color:rgb(28, 31, 33);">从末尾开始，找到 decreasing subsequence，5430，因为来调 5430 无论怎么调，都不可能有比它更小的，数也被自然的分成两部分 (1,2) 和 （5，4，3，0)</font>
+ <font style="color:rgb(28, 31, 33);">下一步是找这个 sequence 里面第一个比前面部分，比 2 大的，3，也很容易理解，因为下一个必定是 (1,3) 打头</font>
+ <font style="color:rgb(28, 31, 33);">交换 3 和 2 ，变成 (1,3,5,4,2,0), 再把后面的部分 reverse，得到后面部分可得到的最小的</font>

<font style="color:rgb(0, 0, 0);">这个时候，得到下一个 sequence 130245</font>

<font style="color:rgb(0, 0, 0);">下面我们来看下具体的代码实现：</font>



```java
class Solution {
    public void nextPermutation(int[] nums) {
        int idx = nums.length - 2;
        //寻找从右边开始第一个比右边小的数
        while (idx >= 0 && nums[idx] >= nums[idx + 1]) {
            idx--;
        }
        if (idx >= 0) {
            int next = nums.length - 1;
            //寻找nums[idx]的下一个数
            while (next >= 0 && nums[next] <= nums[idx]) {
                next--;
            }
            //交换nums[idx]和nums[next]
            int temp = nums[idx];
            nums[idx] = nums[next];
            nums[next] = temp;
        }
        //将nums[idx+1..]倒过来
        int left = idx + 1, right = nums.length - 1;
        while (left < right) {
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        }
    }
}
```



### <font style="color:rgb(28, 31, 33);">小结</font>

<font style="color:rgb(0, 0, 0);">这道题的难点在于如何十进制数怎么求下一个数？同学们吧过程仔细的多看几遍，然后动手敲，敲第一遍的时候不要看代码，硬着头皮上。这样会对你的算法能力有很大的促进。</font>

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



