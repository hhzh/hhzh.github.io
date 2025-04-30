## 大数相加
题目描述
以字符串的形式读入两个数字，编写一个函数计算它们的和，以字符串形式返回。

数据范围：s.length,t.length≤100000，字符串仅由'0'~‘9’构成

要求：时间复杂度 O(n)

示例：

输入："1","99"

返回值："100"

说明：1+99=100

解法
使用双指针指向两个字符串末尾，从后向前逐位相加，同时处理进位问题。如果还有剩余进位，将剩余进位结果添加到字符串中。

```java
public class Solution {
    public String solve(String s, String t) {
        if (s == null || "".equals(s)) {
            return t;
        }
        if (t == null || "".equals(t)) {
            return s;
        }
        
        int i = s.length() - 1;  // 指向字符串 s 的末尾
        int j = t.length() - 1;  // 指向字符串 t 的末尾
        int carry = 0;  // 进位
        StringBuilder result = new StringBuilder();  // 存储结果

        // 从后往前逐位相加
        while (i >= 0 || j >= 0) {
            int digitS = i >= 0 ? s.charAt(i) - '0' : 0;  // 获取 s 的当前位，超出范围则为 0
            int digitT = j >= 0 ? t.charAt(j) - '0' : 0;  // 获取 t 的当前位，超出范围则为 0
            int sum = digitS + digitT + carry;  // 当前位的和
            carry = sum / 10;  // 更新进位
            result.append(sum % 10);  // 将当前位的结果添加到 StringBuilder
            i--;  // 移动指针
            j--;  // 移动指针
        }

        // 如果最终有剩余的进位，将其添加到结果中
        if (carry != 0) {
            result.append(carry);
        }

        // 由于结果是从低位到高位逐位添加的，所以需要反转结果字符串
        return result.reverse().toString();
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        String s = "12345";
        String t = "6789";
        System.out.println(solution.solve(s, t));  // 输出：19134
    }
}
```

#### <font style="color:rgb(28, 31, 33);">内容描述</font>


```plain
罗马数字包含以下七种字符： I、 V、 X、 L、C、D 和 M。

字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
例如， 罗马数字 2 写做 II ，即为两个并列的 1；
12 写做 XII ，即为 X + II ； 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边，但也存在特例。
例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。
同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9；
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90； 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900；
给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。

示例 1:
输入: 3
输出: "III"

示例 2:
输入: 4
输出: "IV"

示例 3:
输入: 9
输出: "IX"

示例 4:
输入: 58
输出: "LVIII"
解释: L = 50, V = 5, III = 3.

示例 5:
输入: 1994
输出: "MCMXCIV"
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```

### <font style="color:rgb(28, 31, 33);">解题方案</font>
#### <font style="color:rgb(28, 31, 33);">思路 1：时间复杂度: O(N) 空间复杂度: O(1)</font>
<font style="color:rgb(0, 0, 0);">首先，根据题意，我们可以知道罗马数字有如下符号和其对应的数值：</font>

| <font style="color:rgb(28, 31, 33);">字符</font> | <font style="color:rgb(28, 31, 33);">数值</font> |
| --- | --- |
| <font style="color:rgb(28, 31, 33);">I</font> | <font style="color:rgb(28, 31, 33);">1</font> |
| <font style="color:rgb(28, 31, 33);">V</font> | <font style="color:rgb(28, 31, 33);">5</font> |
| <font style="color:rgb(28, 31, 33);">X</font> | <font style="color:rgb(28, 31, 33);">10</font> |
| <font style="color:rgb(28, 31, 33);">L</font> | <font style="color:rgb(28, 31, 33);">50</font> |
| <font style="color:rgb(28, 31, 33);">C</font> | <font style="color:rgb(28, 31, 33);">100</font> |
| <font style="color:rgb(28, 31, 33);">D</font> | <font style="color:rgb(28, 31, 33);">500</font> |
| <font style="color:rgb(28, 31, 33);">M</font> | <font style="color:rgb(28, 31, 33);">1000</font> |


<font style="color:rgb(0, 0, 0);">详细的罗马数字计数规则如下：</font>

+ <font style="color:rgb(28, 31, 33);">相同的数字连写，所表示的数等于这些数字相加得到的数，例如：III = 3；</font>
+ <font style="color:rgb(28, 31, 33);">小的数字在大的数字右边，所表示的数等于这些数字相加得到的数，例如：VIII = 8；</font>
+ <font style="color:rgb(28, 31, 33);">小的数字，限于（I、X 和 C）在大的数字左边，所表示的数等于大数减去小数所得的数，例如：IV = 4，这条规则好目前与本题无关；</font>
+ <font style="color:rgb(28, 31, 33);">正常使用时，连续的数字重复不得超过三次；</font>
+ <font style="color:rgb(28, 31, 33);">在一个数的上面画横线，表示这个数扩大 1000 倍（本题只考虑 3999 以内的数，所以用不到这条规则）；</font>
+ <font style="color:rgb(28, 31, 33);">从前向后遍历罗马数字，如果某个数比前一个数小，则加上该数；反之，减去前一个数的两倍然后加上该数。</font>

<font style="color:rgb(0, 0, 0);">我们可以将所有罗马数字的不同符号及对应整数放在字典中。但由于题目限制，正常使用时连续的数字重复不能超过三次，所以对于 400、40、4 或者是 900、90、9 这种情况我们直接单独列出来。</font>

<font style="color:rgb(0, 0, 0);background-color:rgb(245, 245, 245);">注：之所以将 900、90、9 这三种情况列出是因为罗马数字中并没有单独表示 400 的字符存在，而且不允许DCD这样的情况出现。</font>

<font style="color:rgb(0, 0, 0);">将罗马数字和对应整数以及各种特殊情况整合到字典中后，首先将字典按照对应罗马数字的对应整数值进行排序并遍历，每一项中的键</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">symbol</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">对应罗马数字符号 ，值</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">val</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">对应整数。</font>

<font style="color:rgb(0, 0, 0);">如果</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">num</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">大于</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">val</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">则进入</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">while</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">循环，并将当前的罗马数字字符</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">symbol</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">拼接到最后结果</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">roman</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">中，然后</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">num - val</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">，每执行一次 while 循环重新判断</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">num >= val</font><font style="color:rgb(0, 0, 0);">。如果不满足则跳出 while 循环，执行下一次 for 循环。具体流程参考：</font>



```python
以整数 3568 为例，3568 的对应罗马数字为：MMMDLXVIII

第一次 for 循环 ————> symbol = 'M' val = 1000 , num >= val成立，进入 while 循环：
	第一次 while 循环：
		将 'M' 拼接到 roman 中， num 减去当前 val ，此时 roman 为 'M',num 为 2568
	第二次 while 循环：
		将 'M' 拼接到 roman 中，num 减去当前 val ，此时 roman 为 'MM',num 为 1568
	第三次 while 循环：
		将 'M' 拼接到 roman 中，num 减去当前 val ，此时 roman 为 'MMM',num 为 568 					num >= val 不成立，退出 while 循环。
第二次 for 循环 ————> symbol = 'CM' val = 900 , num >= val不成立，不能进入 while 循环：    
第三次 for 循环 ————> symbol = 'D' val = 500 , num >= val成立，进入 while 循环： 
	第一次 while 循环：
    	将 'D' 拼接到 roman 中， num 减去当前 val ，此时 roman 为 'MMMD',num 为 68
        num >= val 不成立，退出 while 循环。
第四次 for 循环 ————> symbol = 'CD' val = 400 , num >= val不成立，不能进入 while 循环： 
…………
第七次 for 循环 ————> symbol = 'L' val = 50 , num >= val成立，进入 while 循环：
	第一次 while 循环：
    	将 'L' 拼接到 roman 中， num 减去当前 val ，此时 roman 为 'MMMDL',num 为 18
        num >= val 不成立，退出 while 循环。
…………依次执行后得出结果为 MMMDLXVIII 。
```



```java
class Solution {
    public String intToRoman(int num) {
        // 初始化了一个一一对应的map，方便后面取出符号。
        String[][] lookup = {
                {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"},
                {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"},
                {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"},
                {"", "M", "MM", "MMM"}
        };
        String ret = "";
        for (int i = 0; i < 4; i++) {
            ret = lookup[i][num % 10] + ret;
            num /= 10;
        }
        return ret;
    }
}
```

## 罗马数字转整数
**<font style="color:rgb(0, 0, 0);background-color:rgb(245, 245, 245);">难度：Easy</font>**<font style="color:rgb(0, 0, 0);background-color:rgb(245, 245, 245);">  
</font><font style="color:rgb(0, 0, 0);background-color:rgb(245, 245, 245);">原题链接：</font>[https://leetcode-cn.com/problems/roman-to-integer/。](https://leetcode-cn.com/problems/roman-to-integer/%E3%80%82)

<font style="color:rgb(0, 0, 0);">刚才上面的题目要求我们将整数转为罗马数字，其实还有一道题和这道题很相似，那就是罗马数字转整数。这道题和刚才那道题差不多，所以在这里我就不放题目内容了，大家跟着我一起，来把这道题做一下就行。</font>

#### <font style="color:rgb(28, 31, 33);">思路 1：时间复杂度: O(N) 空间复杂度: O(1)</font>
<font style="color:rgb(0, 0, 0);">这道题同样有将整数限制在</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">1 - 3999</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">之间。我们从前往后扫描，用一个临时变量来分段记录数字。因为有这样一条规则：小的数字，限于（I、X 和 C）在大的数字左边，所表示的数等于大数减去小数所得的数，例如：  
</font><font style="color:rgb(199, 37, 78);">IV = 4</font><font style="color:rgb(0, 0, 0);">。所以如果当前罗马数字的值比前面一个大，说明这一段的值应当是减去上一个值。否则，应将当前值加入到最后结果中并开始下一次记录，例如:</font><font style="color:rgb(199, 37, 78);">VI = 5 + 1, II = 1 +1</font><font style="color:rgb(0, 0, 0);">。</font>

<font style="color:rgb(0, 0, 0);">下面来看具体代码：</font>



```java
class Solution {
    public int romanToInt(String s) {
        // 初始化了一个一一对应的map，方便后面取出符号。
        String[][] lookup = {
                {"", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"},
                {"", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"},
                {"", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"},
                {"", "M", "MM", "MMM"}
        };
        int ret = 0;
        int base = 1000;
        int x = 3;
        int y = 3;
        int pos = 0;
        while (pos < s.length()){
            if (pos + lookup[x][y].length() <= s.length()) {
                boolean wrong = false;
                for (int i = 0; i < lookup[x][y].length(); i++) {
                    if (lookup[x][y].charAt(i) != s.charAt(pos + i)){
                        wrong = true;
                        break;
                    }
                }
                if (!wrong) {
                    pos += lookup[x][y].length();
                    ret += base * y;
                }
            }
            y--;
            if (y == 0) {
                base /= 10;
                x--;
                y = 9;
            }
        }
        return ret;
    }
}
```

### <font style="color:rgb(28, 31, 33);">小结</font>
<font style="color:rgb(0, 0, 0);">这个小节我们做了两道题。虽然这两道题差不多，但还是有差异的。整数转罗马数字明显更难一些，罗马数字转整数则相对比较简单。建议同学们自己多刷几遍，书读百遍，其义自见。</font>

## 有效括号
内容描述


```plain
给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。

例如，给出 n = 3，生成结果为：

[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```

## <font style="color:rgb(28, 31, 33);">解题方案</font>

#### <font style="color:rgb(28, 31, 33);">思路 1：时间复杂度: O(4^N / sqrt(N)) 空间复杂度: O(4^N / sqrt(N))</font>

<font style="color:rgb(0, 0, 0);">这道题是一个枚举题，首先我们看一下有效括号的条件：</font>

+ <font style="color:rgb(28, 31, 33);">左括号和右括号相等</font>
+ <font style="color:rgb(28, 31, 33);">在括号字符串中的任一前缀，右括号的数量不大于左括号的数量</font>

<font style="color:rgb(0, 0, 0);">假设我们已经枚举到了某个前缀S1，接下来的字符有两种情况，加上’(‘或者加上’)’，加上之后，如果该前缀不符合有效括号的条件，我们应该放弃这次枚举</font>

<font style="color:rgb(0, 0, 0);">比如：前缀’()’，后面一个字符只能是’(’</font>

<font style="color:rgb(0, 0, 0);">我们用递归的方式来实现这个题目</font>

<font style="color:rgb(0, 0, 0);">为了满足有效括号的条件，我们在枚举前缀时，需要左括号的数量和右括号的数量，维护这两个值，有利于我们判断是否满足条件</font>



```java
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        singleStr(result,"",0,0,n);
        return result;
    }

    private void singleStr(List<String> result, String str,int left, int right, int n){
        if (left == n && right == n) {
            result.add(str);
        }
        if (left < n) {
            singleStr(result,str + "(", left + 1,right,n);
        }
        if (right < left) {
            singleStr(result, str + ")", left, right+1,n);
        }
    }
}
```



### <font style="color:rgb(28, 31, 33);">小结</font>

<font style="color:rgb(0, 0, 0);">递归是个重要的知识点，面试题中经常会出现树的遍历。大家试着把括号生成这个题，跟树的遍历结合起来思考，其实括号生成这个题本质上边递归，边生成出一颗递归树：在每个节点我们计算约束条件，判断是否需要生成出子节点。</font>

<font style="color:rgb(0, 0, 0);">递归，本质上是对搜索节点进行无差别遍历。  
</font>![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686493966084-2dac3d8d-b89f-4149-a039-54319cec7c18.png)

#### <font style="color:rgb(28, 31, 33);">内容描述</font>


```plain
请你来实现一个 atoi 函数，使其能将字符串转换成整数。

首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。

当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。

该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。

注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0。

说明：

假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，qing返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。

示例 1:

输入: "42"
输出: 42

示例 2:

输入: "   -42"
输出: -42
解释: 第一个非空白字符为 '-', 它是一个负号。
     我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
     
示例 3:

输入: "4193 with words"
输出: 4193
解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。

示例 4:

输入: "words and 987"
输出: 0
解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
     因此无法执行有效的转换。
     
示例 5:

输入: "-91283472332"
输出: -2147483648
解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 
     因此返回 INT_MIN (−231) 。
```

## 字符串转换整数
解题方案

#### <font style="color:rgb(28, 31, 33);">思路 1：时间复杂度: O(N) 空间复杂度: O(1)</font>

<font style="color:rgb(0, 0, 0);">这道题还是有很多特殊情况，大家一定要提前充分考虑好再动笔，不然后面会一直在 debug。需要考虑比较多的边界条件&特殊情况：</font>

1. <font style="color:rgb(28, 31, 33);">首先输入可能会有空格，所以先去掉空格‘；</font>
2. <font style="color:rgb(28, 31, 33);">去掉空格后要考虑空字符串情况；</font>
3. <font style="color:rgb(28, 31, 33);">字符串首位可能会有正负号，要考虑；</font>
4. <font style="color:rgb(28, 31, 33);">开始转换成数字，题目说只要遇到非数字就可以break了；</font>
5. <font style="color:rgb(28, 31, 33);">结果太大或者太小超过</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">int</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">限制就要返回特定数字</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">2147483647</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">或者</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">-2147483648</font><font style="color:rgb(28, 31, 33);">；</font>
6. <font style="color:rgb(28, 31, 33);">根据之前的正负号结果返回对应数值。</font>

<font style="color:rgb(0, 0, 0);">下面来看具体代码：</font>



```java
class Solution {
    public int myAtoi(String str) {
        if (str == null || str.length() == 0) {
            return 0;
        }
        int start = 0;
        // 过滤前置空格
        while (start < str.length() && str.charAt(start) == ' ') {
            start++;
        }
        // 判断符号
        int sign = 1;
        if (start < str.length() && str.charAt(start) == '-') {
            sign = -1;
            start++;
        } else if (start < str.length() && str.charAt(start) == '+') {
            sign = 1;
            start++;
        }

        int ret = 0;
        while (start < str.length()) {
            if (str.charAt(start) <= '9' && str.charAt(start) >= '0') {
                if (sign > 0) {
                    // 判断越界
                    if (ret > 214748364 || (ret == 214748364 && str.charAt(start)> '7')) {
                        return 2147483647;
                    }
                    ret = ret * 10 + (str.charAt(start) - '0');
                } else {
                    // 判断越界
                    if (ret < -214748364 || (ret == -214748364 && str.charAt(start) > '8')) {
                        return -2147483648;
                    }
                    ret = ret * 10 - (str.charAt(start) - '0');
                }
            } else {
                break;
            }
            start++;
        }
        return ret;
    }
}
```

### <font style="color:rgb(28, 31, 33);">小结</font>

+ <font style="color:rgb(28, 31, 33);">一定要注意大数溢出；</font>
+ <font style="color:rgb(28, 31, 33);">考虑到负数，0等等edge case；</font>
+ <font style="color:rgb(28, 31, 33);">提前做一些处理，方便后面的逻辑判断。</font>

## 无重复字符的最长子串
#### <font style="color:rgb(28, 31, 33);">内容描述</font>


```plain
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:
输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

示例 2:
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

示例 3:
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。

请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

#### **<font style="color:rgb(28, 31, 33);">题目详解</font>**

+ <font style="color:rgb(28, 31, 33);">首先子串必须是要连续的，子序列可以不连续。比如字符串为</font><font style="color:rgb(199, 37, 78);">abcde</font><font style="color:rgb(28, 31, 33);">，那么子序列可以为</font><font style="color:rgb(199, 37, 78);">ace</font><font style="color:rgb(28, 31, 33);">，但是子串就不行，子串只能是</font><font style="color:rgb(199, 37, 78);">abc</font><font style="color:rgb(28, 31, 33);">,</font><font style="color:rgb(199, 37, 78);">abcd</font><font style="color:rgb(28, 31, 33);">,</font><font style="color:rgb(199, 37, 78);">abcde</font><font style="color:rgb(28, 31, 33);">,</font><font style="color:rgb(199, 37, 78);">bcd</font><font style="color:rgb(28, 31, 33);">等等；</font>
+ <font style="color:rgb(28, 31, 33);">并且我们要求的是不包含重复字符串的子串；</font>
+ <font style="color:rgb(28, 31, 33);">并且我们还要求返回的是满足条件的子串中最长的那个子串的长度。</font>

## <font style="color:rgb(28, 31, 33);">解题方案</font>

#### <font style="color:rgb(28, 31, 33);">思路 1：时间复杂度: O(N) 空间复杂度: O(N)</font>

<font style="color:rgb(0, 0, 0);">求一个最长的子串，里面不带任何重复字符。</font>

<font style="color:rgb(0, 0, 0);">假设</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">input</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">为</font><font style="color:rgb(199, 37, 78);">"abcabcbb"</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">，我们先从第一个字符开始，只有一个字符肯定不会重复吧。</font><font style="color:rgb(199, 37, 78);">“a”</font><font style="color:rgb(0, 0, 0);">满足条件，更新最大长度为</font><font style="color:rgb(199, 37, 78);">1</font><font style="color:rgb(0, 0, 0);">；然后走到第二个字符，</font><font style="color:rgb(199, 37, 78);">“ab”</font><font style="color:rgb(0, 0, 0);">也满足，更新最大长度为</font><font style="color:rgb(199, 37, 78);">2</font><font style="color:rgb(0, 0, 0);">。  
</font><font style="color:rgb(0, 0, 0);">走到第三个字符，</font><font style="color:rgb(199, 37, 78);">“abc”</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">也满足，更新最大长度为</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">3</font><font style="color:rgb(0, 0, 0);">。  
</font><font style="color:rgb(0, 0, 0);">走到第四个字符，我们发现</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">“a”</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">已经出现过了，于是我们就必须要删除之前的一些字符来继续满足无重复字符的条件，但是我们不知道前面已经出现过一次的</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">“a”</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">的</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">index</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">在哪里呀，所以我们只能一个一个找了，从当前子串的</font><font style="color:rgb(199, 37, 78);">“abca”</font><font style="color:rgb(0, 0, 0);">的第一个字符开始找，删除第一个字符</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">“a”</font><font style="color:rgb(0, 0, 0);">，发现这时候只剩下一个</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">“a”</font><font style="color:rgb(0, 0, 0);">了，我们又满足条件了，更新最大长度为</font><font style="color:rgb(199, 37, 78);">3</font><font style="color:rgb(0, 0, 0);">，以此类推：</font>



```plain
start
end
  |
  |
  v

  a  b  c  a  b  c  b  b

end 指针不停往前走，只要当前子串 s[start:end+1] 不满足无重复字符条件的时候，我们就让 start 指针往前走直到满足条件为止，每次满足条件我们都要更新一下最大长度，即 res。
```

<font style="color:rgb(0, 0, 0);">这就是滑动窗口的思想，也称为</font><font style="color:rgb(199, 37, 78);">sliding window</font><font style="color:rgb(0, 0, 0);">，下面我们来看下代码：</font>



```java
import java.util.HashSet;
class Solution {
    public int lengthOfLongestSubstring(String s) {
        if (s == null || "".equals(s)) {
            return 0;
        }
        int start = 0;
        int end = 0;
        int res = 0;
        // HashSet 用来去重
        HashSet lookup = new HashSet();
        while (start < s.length() && end < s.length()) {
            if (!lookup.contains(s.charAt(end))){
                // end 指针所遇到的字符没有在之前遍历的字符中没有遇到过，就放到 HashSet 中
                lookup.add(s.charAt(end));
                // 满足无重复字串时更新最大长度
                res = res > (end - start + 1) ? res : (end - start + 1);
                // end 指针后移
                end++;
            } else {
                // end 指针所遇到的字符没有在之前遍历的字符中遇到过，就从 HashSet 移除
                lookup.remove(s.charAt(start));
                // start 指针后移
                start++;
            }
        }
        return res;
    }
}
```



<font style="color:rgb(0, 0, 0);">思路一的话其实就是典型的滑动窗口的思想，定义两个指针，右指针不停走直到范围不满足，此时通过左指针向右边的移动来使得条件重新被满足，一直重复下去直到长度超出了。</font>

#### <font style="color:rgb(28, 31, 33);">思路 2：时间复杂度: O(N) 空间复杂度: O(N)</font>

<font style="color:rgb(0, 0, 0);">那么为了便于解答之后 </font><font style="color:rgb(199, 37, 78);">LeetCode</font><font style="color:rgb(0, 0, 0);"> 里面的类似题目，我们这里做一个 </font><font style="color:rgb(199, 37, 78);">slide window</font><font style="color:rgb(0, 0, 0);"> 的模版，以后就可以重复使用了，思路 2 其实就是把思路 1 做一个总结，写成一个通用型的，下面来看代码：</font>

_**<font style="color:rgb(0, 0, 0);">Java beats 51.04%</font>**_



```java
import java.util.HashMap;
class Solution {
    public int lengthOfLongestSubstring(String s) {
        HashMap<Character, Integer> lookup = new HashMap();
        int l = 0;
        int r = 0;
        //  counter 用来标记当前字串中 unique 字符的数量
        int counter = 0;
        int res = 0;
        while (r < s.length()) {
            if (lookup.get(s.charAt(r)) == null) {
                // 当前遍历到的字符如果不在 map 中需要进行判空处理
                lookup.put(s.charAt(r),  1);
            }else {
                // 否则可以直接 +1
                lookup.put(s.charAt(r), lookup.get(s.charAt(r)) + 1);
            }
            // 如果遍历到之前没有遇到的字符，则 counter++
            if (lookup.get(s.charAt(r)) == 1) {
                counter++;
            }
            // r 指针右移
            r++;
            // counter < r - l 则说明有重复字串出现，否则 counter 等于 r - l
            while (l < r && counter < r - l) {
                lookup.put(s.charAt(l), lookup.get(s.charAt(l)) - 1);
                // 当前 l 指针所代表的字符在 map 中如果为 0，说明 l 指针所代表的字符在 map 中完全被清除
                if (lookup.get(s.charAt(l)) == 0) {
                    counter--;
                }
                // l 指针右移
                l++;
            }
            // 更新最大字串长度
            res = res > (r - l) ? res : (r - l);
        }
        return res;
    }
}
```

<font style="color:rgb(0, 0, 0);">有兴趣的同学可以用这个模版去做一下第</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">159</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">题和第</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">340</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">题，会发现改几个数字就完全OK了。</font>

#### <font style="color:rgb(28, 31, 33);">思路 3：时间复杂度: O(N) 空间复杂度: O(N)</font>

<font style="color:rgb(0, 0, 0);">刚才思路 1 中有这样一句话：</font><font style="color:rgb(199, 37, 78);">但是我们不知道前面已经出现过一次的“a”的index在哪里呀，所以我们只能一个一个找了</font><font style="color:rgb(0, 0, 0);">。</font>

<font style="color:rgb(0, 0, 0);">我们可以对这里做一个优化，就不需要一个个去找了。只需要用一个字典，对当前子串中的每一个字符，将其在</font><font style="color:rgb(199, 37, 78);">input</font><font style="color:rgb(0, 0, 0);">中的来源</font><font style="color:rgb(199, 37, 78);">index</font><font style="color:rgb(0, 0, 0);">记录下来即可。</font>

<font style="color:rgb(0, 0, 0);">我们先从第一个字符开始，只要碰到已经出现过的字符，我们就必须从之前出现该字符的</font><font style="color:rgb(199, 37, 78);">index</font><font style="color:rgb(0, 0, 0);">开始重新往后看。</font>

<font style="color:rgb(0, 0, 0);">例如</font><font style="color:rgb(199, 37, 78);">‘xyzxlkjh’</font><font style="color:rgb(0, 0, 0);">，当看到第二个</font><font style="color:rgb(199, 37, 78);">‘x’</font><font style="color:rgb(0, 0, 0);">时，我们就应该从第一个</font><font style="color:rgb(199, 37, 78);">x</font><font style="color:rgb(0, 0, 0);">后面的</font><font style="color:rgb(199, 37, 78);">y</font><font style="color:rgb(0, 0, 0);">开始重新往后看了。</font>

<font style="color:rgb(0, 0, 0);">我们将每一个已经阅读过的字符作为</font><font style="color:rgb(199, 37, 78);">key</font><font style="color:rgb(0, 0, 0);">，而它的值就是它在原字符串中的</font><font style="color:rgb(199, 37, 78);">index</font><font style="color:rgb(0, 0, 0);">。如果我们现在的字符不在字典里面，我们就把它加进字典中去。因此，只要</font><font style="color:rgb(199, 37, 78);">end</font><font style="color:rgb(0, 0, 0);">指针指向的这个字符</font><font style="color:rgb(199, 37, 78);">c</font><font style="color:rgb(0, 0, 0);">，在该字典中的值大于等于了当前子串首字符的</font><font style="color:rgb(199, 37, 78);">index</font><font style="color:rgb(0, 0, 0);">时，就说明</font><font style="color:rgb(199, 37, 78);">c</font><font style="color:rgb(0, 0, 0);">在当前子串中已经出现过了，我们就将当前子串的首字符的</font><font style="color:rgb(199, 37, 78);">index</font><font style="color:rgb(0, 0, 0);">加</font><font style="color:rgb(199, 37, 78);">1</font><font style="color:rgb(0, 0, 0);">，即从后一位又重新开始读，此时当前子串已经满足条件了，然后我们更新</font><font style="color:rgb(199, 37, 78);">res</font><font style="color:rgb(0, 0, 0);">。</font>

### <font style="color:rgb(28, 31, 33);">程序变量解释</font>

+ <font style="color:rgb(199, 37, 78);">start</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">是当前无重复字符的子串首字符的</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">index</font><font style="color:rgb(28, 31, 33);">；</font>
+ <font style="color:rgb(199, 37, 78);">maps</font><font style="color:rgb(28, 31, 33);"> 放置每一个字符的 </font><font style="color:rgb(199, 37, 78);">index</font><font style="color:rgb(28, 31, 33);">，如果 </font><font style="color:rgb(199, 37, 78);">maps.get(s[i], -1)</font><font style="color:rgb(28, 31, 33);"> 大于等于 </font><font style="color:rgb(199, 37, 78);">start</font><font style="color:rgb(28, 31, 33);"> 的话，就说明字符重复了，此时就要重置 </font><font style="color:rgb(199, 37, 78);">res</font><font style="color:rgb(28, 31, 33);"> 和 </font><font style="color:rgb(199, 37, 78);">start</font><font style="color:rgb(28, 31, 33);"> 的值了。</font>

_**<font style="color:rgb(0, 0, 0);">Java beats 90.87%</font>**_



```java
import java.util.HashMap;
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int res = 0;
        // start 标记当前字串首字符在 s 中对应的索引位置
        int start = 0;
        int length = s.length();
        HashMap<Character, Integer> map = new HashMap();
        for (int i = 0; i < length; i++) {
            int temp = -1;
            if (map.get(s.charAt(i)) != null) {
                // 可能当前遍历到的字符是一个全新的字符，没有存在过 map 中，所以需要判空处理
                temp = map.get(s.charAt(i));
            }
            // 找到字串新的起点
            start = start > (temp + 1) ? start : (temp + 1);
            // 更新字串的长度
            res = res > (i - start + 1) ? res : (i - start + 1);
            // 将当前遍历到的字符记录在 map 中
            map.put(s.charAt(i), i);
        }
        return res;
    }
}
```



<font style="color:rgb(0, 0, 0);">思路3的话又可以省一些时间了，因为相当于我们的左指针不需要一步一步走了，而是知道下一步在哪里。</font>

## <font style="color:rgb(28, 31, 33);">总结</font>

1. <font style="color:rgb(28, 31, 33);">分清子串和子序列的概念；</font>
2. <font style="color:rgb(28, 31, 33);">学会从当前做不到的一些东西去优化，想想怎么利用基础数据结构去做优化；</font>
3. <font style="color:rgb(28, 31, 33);">学会从一类题中总结出模版。</font>

## Z字形变换
#### <font style="color:rgb(28, 31, 33);">内容描述</font>


```plain
将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：

L   C   I   R
E T O E S I I G
E   D   H   N
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："LCIRETOESIIGEDHN"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);

示例 1:

输入: s = "LEETCODEISHIRING", numRows = 3
输出: "LCIRETOESIIGEDHN"

示例 2:

输入: s = "LEETCODEISHIRING", numRows = 4
输出: "LDREOEIIECIHNTSG"
解释:

L     D     R
E   O E   I I
E C   I H   N
T     S     G
```

<font style="color:rgb(0, 0, 0);background-color:rgb(245, 245, 245);">题目详解</font>

+ <font style="color:rgb(28, 31, 33);">我们首先要考虑到一些特殊情况，比如空字符串的情况，还有numRows 比字符串长度大的情况。</font>

## <font style="color:rgb(28, 31, 33);">解题方案</font>

#### <font style="color:rgb(28, 31, 33);">思路 1：时间复杂度: O(N) 空间复杂度: O(N)</font>

<font style="color:rgb(0, 0, 0);">观察一下每一行的每个字符在原字符串的位置：</font>

+ <font style="color:rgb(28, 31, 33);">第一行和最后一行，两个相邻字符之间，在原字符串位置，相差</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">(numRows-1)*2</font><font style="color:rgb(28, 31, 33);">；</font>
+ <font style="color:rgb(28, 31, 33);">中间的行，相邻字符之间，在原字符串的位置，都以</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">(numRows-1)</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">的倍数为中间数成为等差数列，并且差值比</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">numRows-1</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">小。也就是，假设上一个字符在原字符串的位置是</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">j</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">，这个字符距离下一个</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">numRows-1</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">的倍数最近的是，</font><font style="color:rgb(199, 37, 78);">j + (numRows - 1) - (j % (numRows - 1))</font><font style="color:rgb(28, 31, 33);">，那么下一个字符在原字符串的位置是，</font><font style="color:rgb(199, 37, 78);">j + 2 * ((numRows - 1) - (j % (numRows - 1)))</font><font style="color:rgb(28, 31, 33);">；</font>
+ <font style="color:rgb(28, 31, 33);">注意，如果 </font><font style="color:rgb(199, 37, 78);">numRows为1</font><font style="color:rgb(28, 31, 33);"> 时，</font><font style="color:rgb(199, 37, 78);">numRows-1为0</font><font style="color:rgb(28, 31, 33);">，此时上述公式失效，需要特判。</font>



```java
class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1) { // numRows为1时需要特判
            return s;
        }
        String res = "";
        int step = numRows - 1;
        for (int i = 0; i < numRows; i++) {
            int j = i;
            while (j < s.length()) {
                res += s.charAt(j);
                if (i == 0 || i == numRows - 1) { // 第一行和最后一行
                    j += 2 * step;
                } else { // 其它行
                    j += 2 * (step - j % step);
                }
            }
        }
        return res;
    }
}
```



#### <font style="color:rgb(28, 31, 33);">思路 2：时间复杂度: O(N) 空间复杂度: O(N)</font>

<font style="color:rgb(0, 0, 0);">刚才的思路一我们需要推公式，公式有的时候还不适用，需要特判，所以我们不如暴力模拟。并且思路1需要取模运算，它的效率很低。</font>

<font style="color:rgb(199, 37, 78);">idx</font><font style="color:rgb(0, 0, 0);">从</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">0</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">开始，自增直到</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">numRows-1</font><font style="color:rgb(0, 0, 0);">，此后又一直自减到</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">0</font><font style="color:rgb(0, 0, 0);">，重复执行。</font>

<font style="color:rgb(0, 0, 0);">给个例子容易懂一些：</font><font style="color:rgb(199, 37, 78);">s = “abcdefghijklmn”</font><font style="color:rgb(0, 0, 0);">,</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">numRows = 4</font>



```plain
a   g   m
b f h l n
c e i k
d   j
```

<font style="color:rgb(0, 0, 0);">从第一行开始往下，走到第四行又往上走，这里用</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">step = 1</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">代表往下走，</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">step = -1</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">代表往上走。</font>

<font style="color:rgb(0, 0, 0);">因为只会有一次遍历，同时把每一行的元素都存下来，所以时间复杂度和空间复杂度都是 </font><font style="color:rgb(199, 37, 78);">O(N)</font><font style="color:rgb(0, 0, 0);">。</font>



```java
class Solution {
    public String convert(String s, int numRows) {
        // 只有一行，或者每一行只有一个元素
        if (numRows == 1 || s.length() <= numRows) {
            return s;
        }
        StringBuffer[] buffers = new StringBuffer[numRows];
        for (int i = 0; i < buffers.length; i++) {
            buffers[i] = new StringBuffer("");
        }
        int idx = 0;
        int step = 1;
        for (int i = 0; i < s.length(); i++) {
            buffers[idx].append(s.charAt(i));
            // 如果在第一行，就往下走
            if (idx == 0) {
                step = 1;
            }
            // 如果在最后一行，就往上走
            if (idx == numRows - 1) {
                step = -1;
            }
            idx += step;
        }
        String res = "";
        for (int i = 0; i < buffers.length; i++) {
            res += buffers[i];
        }
        return res;
    }
}
```

_**<font style="color:rgb(0, 0, 0);"></font>**_

### <font style="color:rgb(28, 31, 33);">小结</font>

<font style="color:rgb(0, 0, 0);">有的时候我们上来就会想到暴力解法，就像这里的思路2，然后我们想着说能不能做一些优化，于是想到一个数学上的办法，觉得自己很厉害，但其实暴力解法可能会更好一些，至少在某些简单场景下。</font>

## 最长公共子串
## <font style="color:rgb(51, 51, 51);">描述</font>

给定两个字符串str1和str2,输出两个字符串的最长公共子串

题目保证str1和str2的最长公共子串存在且唯一。


数据范围： 1≤∣str1∣,∣str2∣≤5000  
要求： 空间复杂度O(n2)，时间复杂度 O(n2)


**<font style="color:rgb(51, 51, 51);">示例1</font>**

输入："1AB2345CD","12345EF"复制

返回值："2345"

<font style="color:rgb(51, 51, 51);">备注：</font><font style="color:rgb(51, 51, 51);">1≤≤∣str1∣,∣str2∣≤5000</font>

<font style="color:rgb(51, 51, 51);"></font>

# <font style="color:rgb(51, 51, 51);">解法1 动态规划</font>

使用动态规划

1. 创建一个二维数组，长度为 l1+1 和 l2+1，其中** dp[i][j] **表示以 **str1[i-1] **和 **str2[j-1]** 结尾的最长公共子串的长度。
2. 填充dp数组：遍历两个字符串，当 **str1[i-1]** 和 **str2[j-1]** 相等时，**dp[i][j] = dp[i-1][j-1] + 1**。这表示当前字符匹配，且在此基础上扩展了之前的公共子串长度。如果不相等，则设置 **dp[i][j] **为0，表示以这两个字符结尾的字符串没有公共子串。

```java
public class Solution {
    public String longestCommonSubstring(String str1, String str2) {
        if (str1 == null || str2 == null || str1.length() == 0 || str2.length() == 0) {
            return "";
        }

        int maxLength = 0; // 最长公共子串的长度
        int endIndex = 0; // 记录最长公共子串结束的位置

        int l1 = str1.length(), l2 = str2.length();
        // dp[i][j]表示以str1[i-1]和str2[j-1]结尾的最长公共子串的长度
        int[][] dp = new int[l1 + 1][l2 + 1]; 

        for (int i = 1; i <= l1; i++) {
            for (int j = 1; j <= l2; j++) {
                if (str1.charAt(i - 1) == str2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    if (dp[i][j] > maxLength) {
                        maxLength = dp[i][j];
                        endIndex = i - 1; // 更新最长公共子串的结束位置
                    }
                } else {
                    dp[i][j] = 0; // 如果当前字符不匹配，重置长度为0
                }
            }
        }

        // 根据最长公共子串的长度和结束位置回溯得到子串
        return str1.substring(endIndex - maxLength + 1, endIndex + 1);
    }
}
```

# 解法2 滑动窗口

将两个字符串str1和str2沿其长度方向“滑动”，在每个可能的对齐方式下检查并更新最长公共子串。

1. 外层循环：遍历str1和str2的所有可能的对齐方式。这可以通过首先固定str1，然后移动str2的起始位置，接着固定str2，移动str1的起始位置来实现。
2. 内层循环：在每种对齐方式下，比较str1和str2当前位置的字符，如果相同，则继续比较下一个字符，同时更新最长公共子串的记录；如果不同，则结束当前对齐方式下的比较，进入下一种对齐方式。
3. 更新最长公共子串记录：在内层循环中，如果找到了更长的公共子串，则更新最长公共子串的长度和内容。

时间复杂度O(n^3)

```java
public class Solution {
    public String longestCommonSubstring(String str1, String str2) {
        int maxLength = 0;
        String longestCommon = "";

        // 滑动str2相对于str1
        for (int i = 0; i < str1.length(); i++) {
            for (int j = 0; j < str2.length(); j++) {
                int length = 0;
                while (i + length < str1.length() && j + length < str2.length()
                        && str1.charAt(i + length) == str2.charAt(j + length)) {
                    length++;
                }
                if (length > maxLength) {
                    maxLength = length;
                    longestCommon = str1.substring(i, i + length);
                }
            }
        }

        return longestCommon.isEmpty() ? "-1" : longestCommon;
    }
}

```

## 跳台阶
# <font style="color:rgb(51, 51, 51);">题目描述</font>

一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个 n 级的台阶总共有多少种跳法（先后次序不同算不同的结果）。

数据范围：1≤n≤40

要求：时间复杂度：O(n) ，空间复杂度： O(1)



**<font style="color:rgb(51, 51, 51);">示例1</font>**

输入：2

返回值：2

说明：青蛙要跳上两级台阶有两种跳法，分别是：先跳一级，再跳一级或者直接跳两级。因此答案为2

**<font style="color:rgb(51, 51, 51);">示例2</font>**

输入：7

返回值：21

# 解法1 递归

使用递归：

1. 当n为1时，只有一种跳法，即跳1级。因此，返回1。
2. 当n为2时，有两种跳法，可以是两次跳1级，或者一次跳2级。因此，返回2。
3. 对于 **n > 2** 的情况，设想你现在就站在第 n 级台阶上，那么你是怎么来到这里的呢？根据题目条件，你只可能是从第 **n-1** 级台阶上跳上来的（这时你只需要跳1级台阶），或者是从第 **n-2** 级台阶上跳上来的（这时你需要跳2级台阶）。因此，达到第**n**级台阶的总跳法数，就是达到第 **n-1** 级台阶的跳法数 加上 达到第 **n-2** 级台阶的跳法数。

时间复杂度O(n^2)

```java
class Solution {
    public int jumpFloor(int number) {
        if (number == 1) {
            return 1;
        } else if (number == 2) {
            return 2;
        } else {
            return jumpFloor(number - 1) + jumpFloor(number - 2);
        }
    }
}
```

# 解法2 动态规划

使用动态规划可以降低重复计算，时间复杂度O(n)

```java
class Solution {
    public int jumpFloor(int number) {
        if (number <= 2) {
            return number;
        }
        int[] dp = new int[number + 1];
        dp[1] = 1; // 只有1种方式跳到第1阶
        dp[2] = 2; // 有2种方式跳到第2阶
        for (int i = 3; i <= number; i++) {
            // 第i阶的跳法等于第i-1阶和第i-2阶的跳法之和
            dp[i] = dp[i - 1] + dp[i - 2]; 
        }
        return dp[number];
    }
}

```

## 斐波那契数列
## <font style="color:rgb(51, 51, 51);">描述</font>

大家都知道斐波那契数列，现在要求输入一个正整数 n ，请你输出斐波那契数列的第 n 项。

斐波那契数列是一个满足

F(0)=1，F(1)=1, F(n)=F(n - 1)+F(n - 2)（n ≥ 2，n ∈ N*）

的数列

数据范围：1≤n≤40

要求：空间复杂度 O(1)，时间复杂度O(n) ，本题也有时间复杂度 O(logn) 的解法

### <font style="color:rgb(51, 51, 51);">输入描述：</font>

一个正整数n

### <font style="color:rgb(51, 51, 51);">返回值描述：</font>

输出一个正整数。



# 解法1 递归

使用递归

```java
class Solution {
    public int Fibonacci(int n) {
        if (n == 0) {
            return 0;
        }
        if (n == 1 || n == 2) {
            return 1;
        }
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
}
```

# 解法2 循环

使用循环

```java
class Solution {
    public int Fibonacci(int n) {
        if (n == 1 || n == 2) {
            return 1;
        }
        int res = 0;
        int s1 = 1;
        int s2 = 1;
        for (int i = 3; i <= n; i++) {
            res = s1 + s2;
            s1 = s2;
            s2 = res;
        }
        return res;
    }
}
```

## 字符串变形
题目描述

对于一个长度为 n 字符串，我们需要对它做一些变形。

首先这个字符串中包含着一些空格，就像"Hello World"一样，然后我们要做的是把这个字符串中由空格隔开的单词反序，同时反转每个字符的大小写。

比如"Hello World"变形后就变成了"wORLD hELLO"。

示例1：

> 输入："This is a sample",16
>
> 返回值："SAMPLE A IS tHIS"

示例2：

> 输入："ios",3
>
> 返回值："IOS"

示例3：

> 输入：" h i",4
>
> 返回值："I H "

注意：输入的字符串前后都可能包含空格

解法1

本来考虑把字符串以空格拆分成数组，然后倒序遍历数组，对数组中每个元素进行大小写转换，最后再拼接成字符串返回。后来测试后发现，输入的字符前后可能包含空格，这种做法处理边界问题比较麻烦，于是放弃了。

后来想到一个可行的办法如下：

1. 先将字符串进行大小写转换
2. 将字符串整体反转
3. 再将字符串局部反转

**具体流程效果如下：**

原字符串："Hello World"

大小写转换："hELLO wORLD"

整体反转："DLROw OLLEh"

局部反转："wORLD hELLO"

**复杂度分析：**

时间复杂度：O(n)。虽然有多次循环，但是每次循环只有一层。

空间复杂度：O(n)。申请了额外的空间存储返回值。

```java
public String trans(String s, int n) {
    // 判空
    if (n == 0) {
        return s;
    }
    StringBuilder result = new StringBuilder();
    // 先将字符串进行大小写转换
    for (int i = 0; i < n; i++) {
        if (s.charAt(i) <= 'Z' && s.charAt(i) >= 'A') {
            result.append((char) (s.charAt(i) - 'A' + 'a'));
        } else if (s.charAt(i) >= 'a' && s.charAt(i) <= 'z') {
            result.append((char) (s.charAt(i) - 'a' + 'A'));
        } else {
            // 空格直接复制
            result.append(s.charAt(i));
        }
    }

    // 将字符串整体反转
    result.reverse();
    for (int i = 0; i < n; i++) {
        int j = i;
        // 以空格为界，进行局部反转
        while (j < n && result.charAt(j) != ' ') {
            j++;
        }
        String temp = result.substring(i, j);
        StringBuilder builder = new StringBuilder(temp);
        temp = builder.reverse().toString();
        result.replace(i, j, temp);
        i = j;
    }
    return result.toString();
}
```

## 最长回文子串
# <font style="color:rgb(28, 31, 33);">内容描述</font>

```plain
给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。

示例 2：
输入: "cbbd"
输出: "bb"
```

**<font style="color:rgb(0, 0, 0);">题目详解</font>**

+ <font style="color:rgb(28, 31, 33);">回文的概念我们已经介绍过了，指的是一个字符串 </font><font style="color:rgb(199, 37, 78);">a</font><font style="color:rgb(28, 31, 33);"> 和其逆序 </font><font style="color:rgb(199, 37, 78);">a[::-1]</font><font style="color:rgb(28, 31, 33);">是相等的；</font>
+ <font style="color:rgb(28, 31, 33);">题目中要求我们输出的是最长的那个回文子串，而不是子序列；</font>
+ <font style="color:rgb(28, 31, 33);">这样的子串可能会有多个，题目说了，任意返回其中一个即可。</font>

# <font style="color:rgb(28, 31, 33);">解法1 暴力破解</font>

时间复杂度O(n^2)

使用两层for循环判断每个子串是否是回文，如果是则更新。

```java
class Solution {
    public String getLongestPalindrome(String s) {
        String res = s.substring(0, 1);
        for (int i = 0; i < s.length() - 1; i++) {
            for (int j = i + 1; j < s.length(); j++) {
                if (j - i + 1 > res.length()
                        && isLongestPalindrome(s.substring(i, j + 1))) {
                    res = s.substring(i, j + 1);
                }
            }
        }
        return res;
    }

    public boolean isLongestPalindrome(String s) {
        for (int i = 0; i < s.length() / 2; i++) {
            if (s.charAt(i) != s.charAt(s.length() - i - 1)) {
                return false;
            }
        }
        return true;
    }

}
```

# <font style="color:rgb(28, 31, 33);">解法2 动态规划</font>

<font style="color:rgb(28, 31, 33);">时间复杂度: O(N^2) 空间复杂度: O(N^2)</font>

<font style="color:rgb(0, 0, 0);">我们可以用 dp动态规划 的方式来处理这道题。</font>

<font style="color:rgb(0, 0, 0);background-color:rgb(245, 245, 245);">注：dp 解法可参看 2.5 小节最长公共前缀。</font>

+ <font style="color:rgb(199, 37, 78);">dp[i][j] = True</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">代表</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">s[i:j+1]</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">是回文；</font>
+ <font style="color:rgb(199, 37, 78);">dp[i][j] = False</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">代表</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">s[i:j+1]</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">不是回文；</font>
+ 判断dp[i][j]是否是回文，分解为：s.charAt(i) == s.charAt(j) 并且 dp[i+1][j-1]是回文。

```java
class Solution {
    public String longestPalindrome(String s) {
        int length = s.length();
        String res = "";
        // dp[i][j] 用来表示 i 到 j 的字串是否是回文串
        boolean[][] dp = new boolean[length][length];
        for (int i = length - 1; i >= 0; i--) {
            for (int j = i; j < length; j++) {
                dp[i][j] = s.charAt(i) == s.charAt(j) && (j - i < 3 || dp[i + 1][j - 1]);
                // dp[i][j] 用来判断是否为回文串， j - i + 1 > res.length() 用来判断是否是最长回文串
                if (dp[i][j] && (res == null || j - i + 1 > res.length())) {
                    res = s.substring(i, j + 1);
                }
            }
        }
        return res;
    }
}
```

# 解法3 中心扩散法

选取一个中心点，从中心向两边扩散，直到不满足回文为止，这个中心点从0开始向后移动。

时间复杂度 O(n^2)

```java
class Solution {
    public String longestPalindrome(String s) {
        String res = s.substring(0, 1);
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > res.length()) {
                res = s.substring(i - (len - 1) / 2, i + len / 2);
            }
        }
        return res;
    }

    private int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }

}
```

# <font style="color:rgb(28, 31, 33);">解法3</font>

<font style="color:rgb(28, 31, 33);">时间复杂度: O(N^2) 空间复杂度: O(1)</font>

<font style="color:rgb(0, 0, 0);">回文字符串长度为奇数和偶数是不一样的：</font>

1. <font style="color:rgb(28, 31, 33);">奇数：</font><font style="color:rgb(199, 37, 78);">'xxx s[i] xxx'</font><font style="color:rgb(28, 31, 33);">, 比如</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">'abcdcba'</font><font style="color:rgb(28, 31, 33);">；</font>
2. <font style="color:rgb(28, 31, 33);">偶数：</font><font style="color:rgb(199, 37, 78);">'xxx s[i] s[i+1] xxx'</font><font style="color:rgb(28, 31, 33);">, 比如</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">'abcddcba'</font><font style="color:rgb(28, 31, 33);">。</font>

<font style="color:rgb(0, 0, 0);">我们区分回文字符串长度为奇数和偶数的情况，然后依次把每一个字符当做回文字符串的中间字符，向左右扩展到满足回文的最大长度，不停更新满足回文条件的最长子串的左右</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">index</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">:</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">l</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">和</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">r</font><font style="color:rgb(0, 0, 0);">，最后返回</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">s[l:r+1]</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">即为结果。</font>

<font style="color:rgb(0, 0, 0);">下面来看具体代码：</font>

```java
class Solution {
    public String longestPalindrome(String s) {
        if(s.equals("")){
            return "";
        }
        int l = 0; // left index of the current substring
        int r = 0; // right index of the current substring
        int maxLength = 0; // length of the longest palindromic substring for now
        int n = s.length();
        for (int i = 0; i < n; i++) {
            // odd case: 'xxx s[i] xxx', such as 'abcdcba' 
            // 向左最多移动 i 位，向右最多移动 n - 1 - i 位
            for (int j = 0; j < Math.min(i + 1, n - i); j++) {
                // 不对称了就不用继续往下判断了
                if (s.charAt(i - j) != s.charAt(i + j)) {
                    break;
                }
                // 如果当前子串长度大于目前最长长度
                if (2 * j + 1 > maxLength) {
                    maxLength = 2 * j + 1;
                    l = i - j;
                    r = i + j;
                }
            }
            // even case: 'xxx s[i] s[i+1] xxx', such as 'abcddcba' 
            if (i + 1 < n && s.charAt(i) == s.charAt(i + 1)) {
                // s[i]向左最多移动 i 位，s[i+1]向右最多移动 [n-1-(i+1)] 位
                for (int j = 0; j < Math.min(i + 1, n - i - 1); j++ ) {
                    // 不对称了就不用继续往下判断了
                    if (s.charAt(i - j) != s.charAt(i + 1 + j)) {
                        break;
                    }
                    if (2 * j + 2 > maxLength) {
                        maxLength = 2 * j + 2;
                        l = i - j;
                        r = i + 1 + j;
                    }
                }
            }
        }
        return s.substring(l,r + 1); 
    }
}
```



# <font style="color:rgb(28, 31, 33);">解法3</font>

<font style="color:rgb(28, 31, 33);">时间复杂度: O(N) 空间复杂度: O(N)</font>

<font style="color:rgb(199, 37, 78);">Manacher</font><font style="color:rgb(0, 0, 0);">算法增加两个辅助变量</font><font style="color:rgb(199, 37, 78);">id</font><font style="color:rgb(0, 0, 0);">和</font><font style="color:rgb(199, 37, 78);">mx</font><font style="color:rgb(0, 0, 0);">，其中</font><font style="color:rgb(199, 37, 78);">id</font><font style="color:rgb(0, 0, 0);">表示最大回文子串中心的位置，</font><font style="color:rgb(199, 37, 78);">mx</font><font style="color:rgb(0, 0, 0);">则为</font><font style="color:rgb(199, 37, 78);">id+P[id]</font><font style="color:rgb(0, 0, 0);">，也就是最大回文子串的边界。得到一个很重要的结论：</font>

<font style="color:rgb(0, 0, 0);">如果</font><font style="color:rgb(199, 37, 78);">mx > i</font><font style="color:rgb(0, 0, 0);">，那么</font><font style="color:rgb(199, 37, 78);">P[i] >= Min(P[2 * id - i], mx - i)</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(0, 0, 0);">. 为什么这样说呢，下面解释：</font>

<font style="color:rgb(0, 0, 0);">下面，令</font><font style="color:rgb(0, 0, 0);"> </font><font style="color:rgb(199, 37, 78);">j = 2*id - i</font><font style="color:rgb(0, 0, 0);">，也就是说</font><font style="color:rgb(199, 37, 78);">j</font><font style="color:rgb(0, 0, 0);">是</font><font style="color:rgb(199, 37, 78);">i</font><font style="color:rgb(0, 0, 0);">关于</font><font style="color:rgb(199, 37, 78);">id</font><font style="color:rgb(0, 0, 0);">的对称点。</font>

+ <font style="color:rgb(28, 31, 33);">当</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">mx - i > P[j]</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">的时候，以</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">S[j]</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">为中心的回文子串包含在以</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">S[id]</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">为中心的回文子串中，由于</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">i</font><font style="color:rgb(28, 31, 33);">和</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">j</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">对称，以</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">S[i]</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">为中心的回文子串必然包含在以</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">S[id]</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">为中心的回文子串中，所以必有</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">P[i] = P[j]</font><font style="color:rgb(28, 31, 33);">；  
  </font>![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686493553484-4f363497-432a-4edf-8ba9-e789b3b8693d.png)
+ <font style="color:rgb(28, 31, 33);">当 P</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">[j] >= mx - i</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">的时候，以</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">S[j]</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">为中心的回文子串不一定完全包含于以</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">S[id]</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">为中心的回文子串中，但是基于对称性可知，下图中两个绿框所包围的部分是相同的，也就是说以</font><font style="color:rgb(199, 37, 78);">S[i]</font><font style="color:rgb(28, 31, 33);">为中心的回文子串，其向右至少会扩张到</font><font style="color:rgb(199, 37, 78);">mx</font><font style="color:rgb(28, 31, 33);">的位置，也就是说</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">P[i] >= mx - i</font><font style="color:rgb(28, 31, 33);">。至于</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">mx</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">之后的部分是否对称，再具体匹配。所以</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">P[i] >= Min(P[2 * id - i], mx - i)</font><font style="color:rgb(28, 31, 33);">，因为以</font><font style="color:rgb(199, 37, 78);">j</font><font style="color:rgb(28, 31, 33);">为中心的绘回文子串的左边界可能会比</font><font style="color:rgb(199, 37, 78);">mx</font><font style="color:rgb(28, 31, 33);">关于</font><font style="color:rgb(199, 37, 78);">id</font><font style="color:rgb(28, 31, 33);">的对称点要大，此时只能证明</font><font style="color:rgb(199, 37, 78);">P[i]=P[j]</font><font style="color:rgb(28, 31, 33);">。</font>

<font style="color:rgb(0, 0, 0);">下面的图来源于上面的链接</font>

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686493553665-8f9c4d2c-9f29-41e6-971c-67b04ddc0409.png)

+ <font style="color:rgb(28, 31, 33);">此外，对于</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">mx <= i</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(28, 31, 33);">的情况，因为无法对</font><font style="color:rgb(28, 31, 33);"> </font><font style="color:rgb(199, 37, 78);">P[i]</font><font style="color:rgb(28, 31, 33);">做更多的假设，只能让</font><font style="color:rgb(199, 37, 78);">P[i] = 0</font><font style="color:rgb(28, 31, 33);">，然后再去匹配。</font>

<font style="color:rgb(0, 0, 0);">在下面的程序中我的</font><font style="color:rgb(199, 37, 78);">P数组</font><font style="color:rgb(0, 0, 0);">保存的是以当前字符为回文子串中心时，该回文子串的长度（不包含当前字符自身）。</font>

<font style="color:rgb(0, 0, 0);">简单地用一个小例子来解释：原字符串为</font><font style="color:rgb(199, 37, 78);">'qacbcaw'</font><font style="color:rgb(0, 0, 0);">，一眼就可以看出来最大回文子串是</font><font style="color:rgb(199, 37, 78);">'acbca'</font><font style="color:rgb(0, 0, 0);">，  
</font><font style="color:rgb(0, 0, 0);">下面是我做的表格。</font>

![](https://cdn.nlark.com/yuque/0/2023/png/12651402/1686493554397-76bcb384-16d5-49e0-9b72-dede361d8bbe.png)<font style="color:rgb(0, 0, 0);">  
</font><font style="color:rgb(0, 0, 0);">所以最终代码中的</font><font style="color:rgb(199, 37, 78);">max_i</font><font style="color:rgb(0, 0, 0);">就是字符</font><font style="color:rgb(199, 37, 78);">'b'</font><font style="color:rgb(0, 0, 0);">所对应的</font><font style="color:rgb(199, 37, 78);">index8</font><font style="color:rgb(0, 0, 0);">，</font><font style="color:rgb(199, 37, 78);">start</font><font style="color:rgb(0, 0, 0);">的值就是</font><font style="color:rgb(199, 37, 78);">(max_i - P[max_i] - 1) // 2 = 1</font><font style="color:rgb(0, 0, 0);">,最终输出结果为</font><font style="color:rgb(199, 37, 78);">s[1:6]</font><font style="color:rgb(0, 0, 0);">,即</font><font style="color:rgb(199, 37, 78);">acbca’</font>

```java
class Solution {
    public String longestPalindrome(String s) {
        String data = "#";
        for (int i = 0; i < s.length(); i++) {
            data += s.charAt(i);
            data += "#";
        }
        // 半径
        int[] rad = new int[data.length()];
        int id = 0;
        int mx = 0;
        for (int i = 1; i < data.length(); i++) {
            int last = 0;
            if (i > mx) {
                last = i;
            } else {
                if (rad[2 * id - i] < mx - i) {
                    // 2*id-i为中心的最大回文被以id为中心的最大回文所覆盖，没必要继续扩展下去，直接返回
                    rad[i] = rad[2 * id - i];
                    continue;
                } else {
                    last = mx;
                }
            }
            // 继续扩展
            while (last + 1 < data.length() && 2 * i - (last + 1) >= 0 && data.charAt(last + 1) == data.charAt(2 * i - (last + 1))) {
                last++;
            }
            rad[i] = last - i;
            id = i;
            mx = last;
        }
        int left = 0;
        int right = -1;
        for (int i = 0; i < data.length(); i++) {
            // 因为有#的存在，i-rad[i]必是#，也就是偶数下标，i-rad[i]+1对应的必是字母，所以(i-rad[i]+1-1)/2就是原来字母的位置
            int tempLeft = (i - rad[i]) / 2;
            // 同理
            int tempRight = (i + rad[i] - 2) / 2;
            if (tempLeft <= tempRight && right - left < tempRight - tempLeft) {
                left = tempLeft;
                right = tempRight;
            }
        }
        return s.substring(left, right + 1);
    }
}
```

<font style="color:rgb(0, 0, 0);">第647题也可以用这个算法解，可以记一下这个算法的模版，或者自己去实现一个你喜欢的版本。</font>

## 最长公共序列2
# <font style="color:rgb(51, 51, 51);">题目描述</font>

给定两个字符串str1和str2，输出两个字符串的最长公共子序列。如果最长公共子序列为空，则返回"-1"。目前给出的数据，仅仅会存在一个最长的公共子序列。


数据范围：0≤∣str1∣,∣str2∣≤2000

要求：空间复杂度 O(n2) ，时间复杂度 O(n2)

# 解法

使用动态规划：

1. 创建一个二维数组，长度是 (l1+1)x(l2+1)，l1和l2分别是两个字符串的长度，**dp[i][j]** 表示s1的前i个字符和s2的前j个字符的最长公共子序列。
2. 初始化dp的第一行和第一列为""（空字符串），代表任何字符串与长度为0的字符串的最长公共子序列是空。
3. 使用两层for循环，遍历两个字符串
4. 如果 **s1[i - 1]** 等于 **s2[j - 1]**（注意数组索引从0开始，所以访问时要减1），说明这两个字符是当前所考虑的公共子序列的一部分，因此 **dp[i][j]** 应该是 **dp[i - 1][j - 1] **加上这个公共字符。
5. 如果 **s1[i - 1]** 不等于 **s2[j - 1]**，则说明当前字符不可能同时出现在两个字符串的公共子序列中，此时 **dp[i][j] **应该是 **dp[i - 1][j]** 和 **dp[i][j - 1] **中较长的一个，因为我们要找的是最长公共子序列。

时间复杂度O(n^2)

```java
class Solution {
    public String LCS(String s1, String s2) {
        int l1 = s1.length(), l2 = s2.length();
        String[][] dp = new String[l1 + 1][l2 + 1];
        for (int i = 0; i <= l1; i++) {
            for (int j = 0; j <= l2; j++) {
                if (i == 0 || j == 0) {
                    dp[i][j] = "";
                } else if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + s1.charAt(i - 1);
                } else {
                    dp[i][j] = dp[i - 1][j].length() >= dp[i][j - 1].length()
                            ? dp[i - 1][j] : dp[i][j - 1];
                }
            }
        }
        return "".equals(dp[l1][l2]) ? "-1" : dp[l1][l2];
    }

}
```

## 判断整数是否是回文数
题目描述

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:

> 输入: 121
>
> 返回: true

示例 2:

> 输入: -121
>
> 返回: false

示例 3:

> 输入: 10
>
> 返回: false

解法1

将数值转换成字符串，然后比较字符串的首尾字符是否相等，因为字符串支持随机访问。

**复杂度分析：**

时间复杂度：O(n)。需要遍历数值的每一位数。

空间复杂度：O(n)。申请了额外的空间存储字符串。

```java
public boolean isPalindrome(int x) {
    // 负数不是回文数
    if (x < 0) {
        return false;
    }

    // 转换成字符串进行比较
    String str = String.valueOf(x);
    
    // 前半段字符与后半段字符进行比较
    for (int i = 0; i < str.length() / 2; i++) {
        if (str.charAt(i) != str.charAt(str.length() - 1 - i)) {
            return false;
        }
    }
    return true;
}
```

解法2

既然是回文数，我们可以把整数反转后，再进行比较。

**复杂度分析：**

时间复杂度：O(1)。

空间复杂度：O(1)。常量的空间。

```java
public boolean isPalindrome(int x) {
    // 负数不是回文数
    if (x < 0) {
        return false;
    }
    int result = x;
    // 反转之后的数字可能超过整型的范围
    long y = 0;
    while (x != 0) {
        y = y * 10 + x % 10;
        x /= 10;
    }
    return result == y;
}
```

## 有效的括号
# 题目描述

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

1.左括号必须用相同类型的右括号闭合。

2.左括号必须以正确的顺序闭合。

注意：空字符串可被认为是有效字符串。



示例1

> 输入: "()"
>
> 返回: true

示例2

> 输入: "()[]{}"
>
> 返回: true

示例3

> 输入: "([)]"
>
> 返回: false

示例4

> 输入: "{[]}"
>
> 返回: true

解法1

我们可以使用 String 提供的 replace() 方法，把所有成对的括号替换成空字符串，如果最后还有剩余，说明不是有效的。

**复杂度分析：**

时间复杂度：O(n^2)。需要不断循环替换。

空间复杂度：O(n)。替换的过程中需要申请额外的空间。



```java
public boolean isValid(String s) {
    int length;
    do {
        length = s.length();
        // 把成对括号替换成空字符串
        s = s.replace("()", "");
        s = s.replace("[]", "");
        s = s.replace("{}", "");
        // 如果本次没有可替换的成对括号，就结束
    } while (length != s.length());
    // 判断是否还有剩余括号
    return length == 0;
}
```

解法2

涉及到成对匹配的问题，我们可以使用 栈 结构来解决。

实现思路：

1. 遍历整个字符串，如果是左括号就入栈。
2. 如果是右括号则查看当前栈顶括号是否与之相匹配，如果不匹配直接返回 false，如果匹配就弹出栈顶元素。
3. 遍历完成后，如果栈内没有元素则说明全部匹配成功，返回 true，否则返回 false。

**复杂度分析：**

时间复杂度：O(n)。只需遍历一次字符串。

空间复杂度：O(n)。替换的过程中需要申请额外的空间。

```java
public boolean isValid(String s) {
    // 新建栈结构
    Stack<Character> stack = new Stack<>();
    for (int i = 0; i < s.length(); i++) {
        // 如果是左括号就入栈
        if (s.charAt(i) == '{' || s.charAt(i) == '[' || s.charAt(i) == '(') {
            stack.push(s.charAt(i));
        }
        // 如果是右括号就和栈顶进行比较
        if (s.charAt(i) == ']') {
            if (stack.isEmpty() || stack.peek() != '[') {
                return false;
            }
            // 匹配成功，就弹出栈顶元素
            stack.pop();
        }
        if (s.charAt(i) == '}') {
            if (stack.isEmpty() || stack.peek() != '{') {
                return false;
            }
            stack.pop();
        }
        if (s.charAt(i) == ')') {
            if (stack.isEmpty() || stack.peek() != '(') {
                return false;
            }
            stack.pop();
        }
    }
    // 如果栈为空，说明全部匹配成功
    return stack.isEmpty();
}
```

## 整数反转
题目描述

给定一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

注意：假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

示例 1:

> 输入: 123
>
> 返回: 321

示例 2:

> 输入: -123
>
> 返回: -321

示例 3:

> 输入: 120
>
> 返回: 21

解法

整数反转的思路比较简单，把这个数对 10 求余后，就得到个位数值。先除以 10，再对 10 求余，就得到了十位数值，以此类推。

有几种特殊情况需要处理：

1. 负数的情况
2. 如果负数是 Integer.MIN_VALUE，直接转成正数，会出现溢出情况。
3. 个位数是零的情况下，反转后，要舍去最高位的零，例如 120 反转后为 21。

```java
public int reverse(int x) {
    // 如果是 int 最小值，反转后会溢出
    if (x == Integer.MIN_VALUE) {
        return 0;
    }

    // 如果是负数，直接转成正数处理
    if (x < 0) {
        return -reverse(-x);
    }

    // 循环计算每位数值
    int result = 0;
    while (x != 0) {
        // 处理溢出
        if (result > 214748364) {
            return 0;
        }
        result = result * 10 + x % 10;
        x /= 10;
    }
    return result;
}
```


