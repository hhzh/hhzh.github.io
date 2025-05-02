## 大数相加
**题目描述**

```markdown
以字符串的形式读入两个数字，编写一个函数计算它们的和，以字符串形式返回。
数据范围：s.length,t.length≤100000，字符串仅由'0'~‘9’构成
要求：时间复杂度 O(n)

示例：
输入："1","99"
返回值："100"
说明：1+99=100
```
思路
```markdown
模拟人工竖式计算过程，从最低位开始逐位相加并处理进位。通过双指针从字符串末尾同步遍历，避免转换为整数导致溢出
```

关键步骤
```markdown
1. 预处理空值：处理输入为空字符串的边界情况
2. 双指针遍历：同步移动指针获取当前位的数字
3. 进位处理：记录每一位相加后的进位值
4. 结果反转：计算结果按低位到高位顺序存储，需反转得到最终结果
```
解法1
```java
public class Solution {
  public String solve(String num1, String num2) {
    // 处理空字符串输入
    if (num1.isEmpty()) return num2;
    if (num2.isEmpty()) return num1;

    int p1 = num1.length() - 1;    // 数字1的指针
    int p2 = num2.length() - 1;    // 数字2的指针
    int carry = 0;                 // 进位标志
    StringBuilder res = new StringBuilder();

    // 双指针同步遍历
    while (p1 >= 0 || p2 >= 0) {
      // 获取当前位的数字（指针越界则补0）
      int n1 = (p1 >= 0) ? num1.charAt(p1--) - '0' : 0;
      int n2 = (p2 >= 0) ? num2.charAt(p2--) - '0' : 0;

      int sum = n1 + n2 + carry;
      carry = sum / 10;          // 计算新进位
      res.append(sum % 10);       // 记录当前位结果
    }

    // 处理最高位进位
    if (carry > 0) res.append(carry);

    return res.reverse().toString(); // 反转得到最终结果
  }

  public static void main(String[] args) {
    Solution solution = new Solution();
    System.out.println(solution.solve("999", "1"));    // 输出：1000
    System.out.println(solution.solve("12345", "6789")); // 输出：19134 
  }
}
```

复杂度分析
```agsl
时间复杂度：O(max(M,N))，M/N为输入字符串长度
空间复杂度：O(max(M,N))，存储结果字符串
```

我将按照标准格式优化这篇文章，分为两个独立的部分（整数转罗马数字、罗马数字转整数），以下是优化后的版本：

---

## 整数转罗马数字

**题目描述**
```markdown
给定一个1到3999的整数，将其转换为罗马数字表示。罗马数字包含以下字符：
I(1), V(5), X(10), L(50), C(100), D(500), M(1000)

特殊组合规则：
IV(4), IX(9), XL(40), XC(90), CD(400), CM(900)

示例：
输入: 1994
输出: "MCMXCIV"
解释: M=1000, CM=900, XC=90, IV=4
```

**解题思路**
```markdown
贪心算法：从最大的符号开始匹配，每次减去已匹配的数值
```

**关键步骤**
```markdown
1. 建立数值-符号的映射表（按降序排列）
2. 遍历映射表，用除法得到当前符号的重复次数
3. 拼接结果并减去已转换的数值
```

**解法实现**
```java
class Solution {
    public String intToRoman(int num) {
        // 按从大到小顺序排列的映射表
        int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String[] symbols = {"M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"};
        
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < values.length; i++) {
            // 获取当前符号的重复次数
            while (num >= values[i]) {
                sb.append(symbols[i]);
                num -= values[i];
            }
        }
        return sb.toString();
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(1) - 固定次数的循环（数值范围限定）
空间复杂度: O(1) - 固定大小的存储空间
```

以下是优化后的多解法版本：

---
## 有效的括号生成

**题目描述**
```markdown
给定一个整数n，生成所有由n对括号组成的有效组合。

示例：
输入: 3
输出: 
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```

**解法1：回溯算法（DFS）**

**核心思路**
```markdown
1. 通过递归构建所有可能的组合
2. 维护两个计数器：已用左括号数(left)和右括号数(right)
3. 约束条件：
   - 左括号数 ≤ n
   - 右括号数 ≤ 左括号数
```

**实现代码**
```java
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        backtrack(result, "", 0, 0, n);
        return result;
    }

    private void backtrack(List<String> result, String current, 
                         int left, int right, int max) {
        if (current.length() == max * 2) {
            result.add(current);
            return;
        }
        
        if (left < max) {
            backtrack(result, current + "(", left + 1, right, max);
        }
        if (right < left) {
            backtrack(result, current + ")", left, right + 1, max);
        }
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(4^n/√n) - 卡特兰数增长趋势
空间复杂度: O(n) - 递归栈深度
```

**解法2：动态规划**

**核心思路**
```markdown
1. 利用已知n-1的结果构建n的结果
2. 每个新组合可表示为 "(a)b" 形式
   - a是i对括号的有效组合
   - b是n-1-i对括号的有效组合
```

**实现代码**
```java
class Solution {
    public List<String> generateParenthesis(int n) {
        List<List<String>> dp = new ArrayList<>();
        dp.add(Collections.singletonList(""));
        
        for (int i = 1; i <= n; i++) {
            List<String> current = new ArrayList<>();
            for (int j = 0; j < i; j++) {
                for (String a : dp.get(j)) {
                    for (String b : dp.get(i - 1 - j)) {
                        current.add("(" + a + ")" + b);
                    }
                }
            }
            dp.add(current);
        }
        return dp.get(n);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(4^n/√n) - 同解法1
空间复杂度: O(4^n/√n) - 需要存储所有中间结果
```

**解法3：BFS遍历**

**核心思路**
```markdown
1. 使用队列进行层序遍历
2. 每个节点记录当前字符串和括号计数
3. 逐步构建完整组合
```

**实现代码**
```java
class Solution {
    class Node {
        String str;
        int left;
        int right;
        
        Node(String s, int l, int r) {
            str = s;
            left = l;
            right = r;
        }
    }

    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        Queue<Node> queue = new LinkedList<>();
        queue.offer(new Node("", 0, 0));
        
        while (!queue.isEmpty()) {
            Node node = queue.poll();
            
            if (node.left == n && node.right == n) {
                result.add(node.str);
                continue;
            }
            
            if (node.left < n) {
                queue.offer(new Node(node.str + "(", node.left + 1, node.right));
            }
            if (node.right < node.left) {
                queue.offer(new Node(node.str + ")", node.left, node.right + 1));
            }
        }
        return result;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(4^n/√n)
空间复杂度: O(4^n/√n) - 队列需要存储所有中间状态
```

**解法对比**
| 维度       | 回溯法       | 动态规划     | BFS法        |
|------------|-------------|-------------|-------------|
| 时间复杂度 | O(4^n/√n)   | O(4^n/√n)   | O(4^n/√n)   |
| 空间复杂度 | O(n)        | O(4^n/√n)   | O(4^n/√n)   |
| 优势       | 空间效率高   | 思路清晰     | 可并行化     |
| 适用场景   | 常规情况     | 需要递推关系 | 需要遍历所有可能 |

**补充说明**
1. 回溯法是最推荐的解法，在空间效率上有明显优势
2. 动态规划展示了问题分解的思路
3. BFS适用于需要获取所有中间状态的场景

以下是优化后的多解法版本：

---
## 字符串转换整数 (atoi)

**题目描述**
```markdown
实现一个将字符串转换为32位有符号整数的函数，需处理以下情况：
1. 丢弃前导空格
2. 识别正负号
3. 截断非数字后缀
4. 处理整数溢出（返回INT_MAX或INT_MIN）

示例：
输入: "   -42" → 输出: -42
输入: "4193 with words" → 输出: 4193
输入: "-91283472332" → 输出: -2147483648 (INT_MIN)
```

**解法1：直接解析法**

**核心思路**
```markdown
1. 使用指针逐步处理字符串
2. 分阶段处理：空格→符号→数字
3. 实时检测溢出（在计算过程中判断）
```

**实现代码**
```java
class Solution {
    public int myAtoi(String s) {
        int index = 0, sign = 1, total = 0;
        // 1. 处理空字符串
        if (s == null || s.length() == 0) return 0;

        // 2. 跳过前导空格
        while (index < s.length() && s.charAt(index) == ' ') index++;

        // 3. 处理符号
        if (index < s.length() && (s.charAt(index) == '+' || s.charAt(index) == '-')) {
            sign = s.charAt(index) == '-' ? -1 : 1;
            index++;
        }

        // 4. 转换数字并处理溢出
        while (index < s.length()) {
            int digit = s.charAt(index) - '0';
            if (digit < 0 || digit > 9) break;

            // 检查溢出
            if (Integer.MAX_VALUE / 10 < total || 
                (Integer.MAX_VALUE / 10 == total && Integer.MAX_VALUE % 10 < digit)) {
                return sign == 1 ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            }

            total = total * 10 + digit;
            index++;
        }
        return total * sign;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 单次字符串遍历
空间复杂度: O(1) - 常量空间
```

**解法2：DFA（确定性有限自动机）**

**核心思路**
```markdown
1. 定义状态转换表
   - 0: 初始状态
   - 1: 已获取符号
   - 2: 数字处理中
   - 3: 结束状态
2. 根据当前字符类型转换状态
```

**实现代码**
```java
class Solution {
    public int myAtoi(String s) {
        Automaton automaton = new Automaton();
        for (char c : s.toCharArray()) {
            automaton.process(c);
        }
        return (int)(automaton.sign * automaton.val);
    }

    class Automaton {
        public int sign = 1;
        public long val = 0;
        private String state = "start";
        
        private final Map<String, String[]> table = Map.of(
            "start", new String[]{"start", "signed", "number", "end"},
            "signed", new String[]{"end", "end", "number", "end"},
            "number", new String[]{"end", "end", "number", "end"},
            "end", new String[]{"end", "end", "end", "end"}
        );

        public void process(char c) {
            state = table.get(state)[getCol(c)];
            if ("number".equals(state)) {
                val = val * 10 + (c - '0');
                val = sign == 1 ? Math.min(val, Integer.MAX_VALUE) : Math.min(val, -(long)Integer.MIN_VALUE);
            } else if ("signed".equals(state)) {
                sign = c == '+' ? 1 : -1;
            }
        }

        private int getCol(char c) {
            if (c == ' ') return 0;
            if (c == '+' || c == '-') return 1;
            if (Character.isDigit(c)) return 2;
            return 3;
        }
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 单次字符串遍历
空间复杂度: O(1) - 固定大小的状态表
```

**解法3：正则表达式**

**核心思路**
```markdown
1. 使用正则提取有效数字部分
   ^\s*([+-]?\d+)
2. 对匹配结果进行转换和溢出检查
```

**实现代码**
```java
import java.util.regex.*;

class Solution {
    public int myAtoi(String s) {
        Pattern pattern = Pattern.compile("^\\s*([+-]?\\d+)");
        Matcher matcher = pattern.matcher(s);
        
        if (!matcher.find()) return 0;
        
        String numStr = matcher.group(1);
        int sign = 1, start = 0;
        if (numStr.charAt(0) == '-') {
            sign = -1;
            start = 1;
        } else if (numStr.charAt(0) == '+') {
            start = 1;
        }
        
        long result = 0;
        for (int i = start; i < numStr.length(); i++) {
            result = result * 10 + (numStr.charAt(i) - '0');
            if (sign * result > Integer.MAX_VALUE) return Integer.MAX_VALUE;
            if (sign * result < Integer.MIN_VALUE) return Integer.MIN_VALUE;
        }
        
        return (int)(sign * result);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 正则匹配和数字转换
空间复杂度: O(n) - 存储匹配结果
```

**解法对比**
| 维度       | 直接解析法 | DFA法      | 正则表达式法 |
|------------|-----------|------------|-------------|
| 时间复杂度 | O(n)      | O(n)       | O(n)        |
| 空间复杂度 | O(1)      | O(1)       | O(n)        |
| 代码复杂度 | 简单       | 中等       | 简单        |
| 扩展性     | 一般       | 强（易修改规则） | 弱         |

**补充说明**
1. 直接解析法最适合面试场景，代码简洁高效
2. DFA法展示了状态机思想，适合处理复杂文本解析
3. 正则表达式法代码简洁但性能稍差

以下是优化后的多解法版本：

---
## 无重复字符的最长子串

**题目描述**
```markdown
给定一个字符串，找出不含有重复字符的最长子串的长度。

示例：
输入: "abcabcbb" → 输出: 3 ("abc")
输入: "bbbbb" → 输出: 1 ("b")
输入: "pwwkew" → 输出: 3 ("wke")
```

**解法1：滑动窗口（HashSet）**

**核心思路**
```markdown
1. 使用双指针维护滑动窗口
2. 右指针扩展窗口，左指针收缩窗口
3. HashSet记录窗口内字符
4. 遇到重复字符时移动左指针
```

**实现代码**
```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> set = new HashSet<>();
        int left = 0, max = 0;
        
        for (int right = 0; right < s.length(); right++) {
            while (set.contains(s.charAt(right))) {
                set.remove(s.charAt(left++));
            }
            set.add(s.charAt(right));
            max = Math.max(max, right - left + 1);
        }
        return max;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(2n) = O(n) - 最坏情况下左右指针各遍历一次
空间复杂度: O(min(m,n)) - 字符集大小或字符串长度
```

**解法2：优化的滑动窗口（HashMap）**

**核心思路**
```markdown
1. 使用HashMap存储字符及其最新索引
2. 遇到重复字符时直接跳转左指针
3. 避免不必要的窗口收缩
```

**实现代码**
```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int left = 0, max = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c)) {
                left = Math.max(left, map.get(c) + 1);
            }
            map.put(c, right);
            max = Math.max(max, right - left + 1);
        }
        return max;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 单次遍历
空间复杂度: O(min(m,n)) - 字符集大小或字符串长度
```

**解法3：字符集数组（最优）**

**核心思路**
```markdown
1. 假设字符集为ASCII 128
2. 使用int数组替代HashMap
3. 数组索引对应字符ASCII码
```

**实现代码**
```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] index = new int[128];
        int left = 0, max = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            left = Math.max(left, index[c]);
            index[c] = right + 1;
            max = Math.max(max, right - left + 1);
        }
        return max;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 单次遍历
空间复杂度: O(1) - 固定大小数组
```

**解法对比**
| 维度       | 滑动窗口(HashSet) | 优化滑动窗口(HashMap) | 字符集数组 |
|------------|------------------|----------------------|-----------|
| 时间复杂度 | O(2n)            | O(n)                 | O(n)      |
| 空间复杂度 | O(min(m,n))      | O(min(m,n))          | O(1)      |
| 适用场景   | 通用             | 需要快速跳转         | ASCII字符 |

**补充说明**
1. 解法3是效率最高的实现，适用于已知字符范围的情况
2. 解法2在大多数编程面试中是最佳选择
3. 解法1最容易理解，适合教学演示

以下是优化后的多解法版本：

---
## Z字形变换

**题目描述**
```markdown
将给定字符串按指定行数进行Z字形排列后按行读取。

示例：
输入: s = "LEETCODEISHIRING", numRows = 3
输出: "LCIRETOESIIGEDHN"

排列形式：
L   C   I   R
E T O E S I I G
E   D   H   N
```

**解法1：数学规律法**

**核心思路**
```markdown
1. 找出每行字符在原字符串中的位置规律
2. 第一行和最后一行字符间隔固定为 cycle = 2*(numRows-1)
3. 中间行字符间隔交替变化：cycle-2*i 和 2*i
```

**实现代码**
```java
class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1) return s;
        
        StringBuilder res = new StringBuilder();
        int cycle = 2 * (numRows - 1);
        
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j + i < s.length(); j += cycle) {
                res.append(s.charAt(j + i));
                if (i != 0 && i != numRows - 1 && j + cycle - i < s.length()) {
                    res.append(s.charAt(j + cycle - i));
                }
            }
        }
        return res.toString();
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 每个字符只访问一次
空间复杂度: O(n) - 存储结果字符串
```

**解法2：模拟Z字形遍历**

**核心思路**
```markdown
1. 使用StringBuilder数组存储每行字符
2. 维护当前行索引和移动方向
3. 到达边界时改变方向
```

**实现代码**
```java
class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1) return s;
        
        StringBuilder[] rows = new StringBuilder[numRows];
        for (int i = 0; i < numRows; i++) {
            rows[i] = new StringBuilder();
        }
        
        int curRow = 0;
        boolean goingDown = false;
        
        for (char c : s.toCharArray()) {
            rows[curRow].append(c);
            if (curRow == 0 || curRow == numRows - 1) {
                goingDown = !goingDown;
            }
            curRow += goingDown ? 1 : -1;
        }
        
        StringBuilder res = new StringBuilder();
        for (StringBuilder row : rows) {
            res.append(row);
        }
        return res.toString();
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 单次字符串遍历
空间复杂度: O(n) - 存储所有字符
```

**解法3：优化空间模拟法**

**核心思路**
```markdown
1. 预先计算每行容量
2. 使用字符数组代替StringBuilder
3. 直接计算字符最终位置
```

**实现代码**
```java
class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1) return s;
        
        char[] chars = s.toCharArray();
        char[] res = new char[chars.length];
        int cycle = 2 * (numRows - 1);
        int index = 0;
        
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j + i < chars.length; j += cycle) {
                res[index++] = chars[j + i];
                if (i != 0 && i != numRows - 1 && j + cycle - i < chars.length) {
                    res[index++] = chars[j + cycle - i];
                }
            }
        }
        return new String(res);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 单次遍历
空间复杂度: O(n) - 字符数组存储
```

**解法对比**
| 维度       | 数学规律法 | 模拟遍历法 | 优化空间法 |
|------------|-----------|------------|-----------|
| 时间复杂度 | O(n)      | O(n)       | O(n)      |
| 空间复杂度 | O(n)      | O(n)       | O(n)      |
| 优势       | 无额外空间| 直观易理解 | 内存连续  |
| 适用场景   | 行数较少  | 通用场景   | 大字符串  |

**补充说明**
1. 解法2是最推荐的方法，直观且易于理解
2. 解法1适合行数较少的情况，避免方向判断
3. 解法3在性能敏感场景下最优

以下是优化后的多解法版本：

---
## 最长公共子串

**题目描述**
```markdown
给定两个字符串str1和str2，找出它们的最长公共子串（要求连续）
示例：
输入："1AB2345CD", "12345EF"
输出："2345"
```

**解法1：动态规划（标准实现）**

**核心思路**
```markdown
1. 构建dp[i][j]表示以str1[i-1]和str2[j-1]结尾的公共子串长度
2. 状态转移：字符相等时dp[i][j] = dp[i-1][j-1] + 1
3. 记录最大长度和结束位置
```

**实现代码**
```java
class Solution {
    public String longestCommonSubstring(String str1, String str2) {
        int m = str1.length(), n = str2.length();
        int[][] dp = new int[m+1][n+1];
        int maxLen = 0, endPos = 0;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (str1.charAt(i-1) == str2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                    if (dp[i][j] > maxLen) {
                        maxLen = dp[i][j];
                        endPos = i-1;
                    }
                }
            }
        }
        return maxLen == 0 ? "" : str1.substring(endPos-maxLen+1, endPos+1);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(mn) - 双重循环
空间复杂度: O(mn) - DP数组
```

**解法2：动态规划（空间优化）**

**核心思路**
```markdown
1. 观察状态转移只依赖前一行数据
2. 使用滚动数组将空间降至O(n)
```

**实现代码**
```java
class Solution {
    public String longestCommonSubstring(String str1, String str2) {
        int m = str1.length(), n = str2.length();
        int[] dp = new int[n+1];
        int maxLen = 0, endPos = 0;
        
        for (int i = 1; i <= m; i++) {
            int prev = 0;
            for (int j = 1; j <= n; j++) {
                int temp = dp[j];
                if (str1.charAt(i-1) == str2.charAt(j-1)) {
                    dp[j] = prev + 1;
                    if (dp[j] > maxLen) {
                        maxLen = dp[j];
                        endPos = i-1;
                    }
                } else {
                    dp[j] = 0;
                }
                prev = temp;
            }
        }
        return maxLen == 0 ? "" : str1.substring(endPos-maxLen+1, endPos+1);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(mn)
空间复杂度: O(n)
```

**解法3：后缀自动机**

**核心思路**
```markdown
1. 构建str1的后缀自动机
2. 用str2在后缀自动机上匹配
3. 维护当前匹配长度和最大长度
```

**实现代码**
```java
class Solution {
    public String longestCommonSubstring(String str1, String str2) {
        SAM sam = new SAM(str1);
        int maxLen = 0, endPos = 0;
        int currentLen = 0;
        
        for (int i = 0, j = 0; j < str2.length(); j++) {
            char c = str2.charAt(j);
            while (i > 0 && !sam.hasTransition(i, c)) {
                i = sam.link[i];
                currentLen = sam.length[i];
            }
            if (sam.hasTransition(i, c)) {
                i = sam.getTransition(i, c);
                currentLen++;
                if (currentLen > maxLen) {
                    maxLen = currentLen;
                    endPos = j;
                }
            }
        }
        return maxLen == 0 ? "" : str2.substring(endPos-maxLen+1, endPos+1);
    }
    
    class SAM {
        // 实现后缀自动机数据结构
        // 省略具体实现...
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(m+n) - 线性构建和查询
空间复杂度: O(m) - 后缀自动机存储
```

**解法对比**
| 维度       | 标准DP | 空间优化DP | 后缀自动机 |
|------------|--------|------------|------------|
| 时间复杂度 | O(mn)  | O(mn)      | O(m+n)     |
| 空间复杂度 | O(mn)  | O(n)       | O(m)       |
| 优势       | 易理解 | 空间高效   | 理论最优   |
| 适用场景   | 小数据 | 中等数据   | 大数据     |

**补充说明**
1. 面试推荐使用空间优化DP版本
2. 后缀自动机实现较复杂但性能最优
3. 滑动窗口法时间复杂度O(n^3)不推荐

以下是优化后的多解法版本：

---
## 跳台阶问题

**题目描述**
```markdown
一只青蛙一次可以跳上1级或2级台阶，求跳上n级台阶的总跳法数。
示例：
输入：2 → 输出：2 (1+1或2)
输入：7 → 输出：21
```

**解法1：递归法（不推荐）**

**核心思路**
```markdown
1. 基本情况：n=1时1种，n=2时2种
2. 递推关系：f(n) = f(n-1) + f(n-2)
```

**实现代码**
```java
class Solution {
    public int jumpFloor(int n) {
        if (n <= 2) return n;
        return jumpFloor(n-1) + jumpFloor(n-2);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(2^n) - 存在大量重复计算
空间复杂度: O(n) - 递归栈深度
```

**解法2：记忆化递归**

**核心思路**
```markdown
1. 使用数组存储已计算结果
2. 避免重复计算
```

**实现代码**
```java
class Solution {
    private int[] memo;
    
    public int jumpFloor(int n) {
        memo = new int[n+1];
        return helper(n);
    }
    
    private int helper(int n) {
        if (n <= 2) return n;
        if (memo[n] != 0) return memo[n];
        memo[n] = helper(n-1) + helper(n-2);
        return memo[n];
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 每个子问题只计算一次
空间复杂度: O(n) - 存储记忆数组
```

**解法3：动态规划（标准版）**

**核心思路**
```markdown
1. 自底向上计算
2. 使用数组存储中间结果
```

**实现代码**
```java
class Solution {
    public int jumpFloor(int n) {
        if (n <= 2) return n;
        int[] dp = new int[n+1];
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
        }
        return dp[n];
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n)
空间复杂度: O(n)
```

**解法4：动态规划（空间优化）**

**核心思路**
```markdown
1. 只需要前两个状态
2. 用变量代替数组
```

**实现代码**
```java
class Solution {
    public int jumpFloor(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n)
空间复杂度: O(1)
```

**解法5：矩阵快速幂**

**核心思路**
```markdown
1. 将递推式转化为矩阵幂运算
2. 使用快速幂算法加速计算
```

**实现代码**
```java
class Solution {
    public int jumpFloor(int n) {
        if (n <= 2) return n;
        int[][] matrix = {{1, 1}, {1, 0}};
        int[][] result = matrixPower(matrix, n-2);
        return 2*result[0][0] + result[0][1];
    }
    
    private int[][] matrixPower(int[][] m, int p) {
        int[][] res = {{1,0},{0,1}};
        while (p > 0) {
            if ((p & 1) != 0) {
                res = multiply(res, m);
            }
            m = multiply(m, m);
            p >>= 1;
        }
        return res;
    }
    
    private int[][] multiply(int[][] a, int[][] b) {
        int[][] c = new int[2][2];
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                c[i][j] = a[i][0]*b[0][j] + a[i][1]*b[1][j];
            }
        }
        return c;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(logn) - 快速幂算法
空间复杂度: O(1) - 固定大小矩阵
```

**解法6：通项公式法**

**核心思路**
```markdown
1. 斐波那契数列通项公式：
   f(n) = (φ^n - ψ^n)/√5
   其中φ=(1+√5)/2, ψ=(1-√5)/2
2. 由于ψ^n很小可忽略
```

**实现代码**
```java
class Solution {
    public int jumpFloor(int n) {
        double sqrt5 = Math.sqrt(5);
        double phi = (1 + sqrt5) / 2;
        return (int)Math.round(Math.pow(phi, n+1) / sqrt5);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(1) - 数学运算
空间复杂度: O(1)
```

**解法对比**
| 维度       | 递归法 | 记忆化递归 | 标准DP | 优化DP | 矩阵法 | 公式法 |
|------------|--------|------------|--------|--------|--------|--------|
| 时间复杂度 | O(2^n) | O(n)       | O(n)   | O(n)   | O(logn)| O(1)   |
| 空间复杂度 | O(n)   | O(n)       | O(n)   | O(1)   | O(1)   | O(1)   |
| 推荐指数   | ★      | ★★★       | ★★★★  | ★★★★★ | ★★★★  | ★★★    |

**补充说明**
1. 面试推荐使用空间优化DP（解法4）
2. 公式法存在浮点精度问题，n较大时可能不准确
3. 矩阵法适合n非常大的场景（如n>10^6）

以下是优化后的多解法版本：

---
## 斐波那契数列

**题目描述**
```markdown
输出斐波那契数列的第n项（从0开始）
定义：
F(0)=0, F(1)=1, 
F(n)=F(n-1)+F(n-2) (n≥2)
```

**解法1：递归法（不推荐）**

**核心思路**
```markdown
直接根据定义递归实现
```

**实现代码**
```java
class Solution {
    public int Fibonacci(int n) {
        if (n == 0) return 0;
        if (n == 1) return 1;
        return Fibonacci(n-1) + Fibonacci(n-2);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(2^n) - 指数级增长
空间复杂度: O(n) - 递归栈深度
```

**解法2：记忆化递归**

**核心思路**
```markdown
使用数组存储已计算结果避免重复计算
```

**实现代码**
```java
class Solution {
    private int[] memo;
    
    public int Fibonacci(int n) {
        memo = new int[n+1];
        return helper(n);
    }
    
    private int helper(int n) {
        if (n == 0) return 0;
        if (n == 1) return 1;
        if (memo[n] != 0) return memo[n];
        memo[n] = helper(n-1) + helper(n-2);
        return memo[n];
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n)
空间复杂度: O(n)
```

**解法3：动态规划（标准版）**

**核心思路**
```markdown
自底向上计算并存储所有中间结果
```

**实现代码**
```java
class Solution {
    public int Fibonacci(int n) {
        if (n == 0) return 0;
        int[] dp = new int[n+1];
        dp[0] = 0;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
        }
        return dp[n];
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n)
空间复杂度: O(n)
```

**解法4：动态规划（空间优化）**

**核心思路**
```markdown
只保留前两个状态，空间优化到O(1)
```

**实现代码**
```java
class Solution {
    public int Fibonacci(int n) {
        if (n == 0) return 0;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n)
空间复杂度: O(1)
```

**解法5：矩阵快速幂**

**核心思路**
```markdown
利用矩阵快速幂将时间复杂度降至O(logn)
```

**实现代码**
```java
class Solution {
    public int Fibonacci(int n) {
        if (n == 0) return 0;
        int[][] matrix = {{1,1},{1,0}};
        int[][] result = matrixPower(matrix, n-1);
        return result[0][0];
    }
    
    private int[][] matrixPower(int[][] m, int p) {
        int[][] res = {{1,0},{0,1}};
        while (p > 0) {
            if ((p & 1) != 0) {
                res = multiply(res, m);
            }
            m = multiply(m, m);
            p >>= 1;
        }
        return res;
    }
    
    private int[][] multiply(int[][] a, int[][] b) {
        int[][] c = new int[2][2];
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                c[i][j] = a[i][0]*b[0][j] + a[i][1]*b[1][j];
            }
        }
        return c;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(logn)
空间复杂度: O(1)
```

**解法6：通项公式法**

**核心思路**
```markdown
使用斐波那契数列的闭式表达式直接计算
```

**实现代码**
```java
class Solution {
    public int Fibonacci(int n) {
        double sqrt5 = Math.sqrt(5);
        double phi = (1 + sqrt5) / 2;
        return (int)Math.round(Math.pow(phi, n) / sqrt5);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(1)
空间复杂度: O(1)
```

**解法对比**
| 维度       | 递归法 | 记忆化递归 | 标准DP | 优化DP | 矩阵法 | 公式法 |
|------------|--------|------------|--------|--------|--------|--------|
| 时间复杂度 | O(2^n) | O(n)       | O(n)   | O(n)   | O(logn)| O(1)   |
| 空间复杂度 | O(n)   | O(n)       | O(n)   | O(1)   | O(1)   | O(1)   |
| 推荐指数   | ★      | ★★★       | ★★★★  | ★★★★★ | ★★★★  | ★★★    |

**补充说明**
1. 面试推荐使用空间优化DP（解法4）
2. 矩阵法适合n非常大的场景（如n>10^6）
3. 公式法存在浮点精度问题，n较大时可能不准确

以下是优化后的字符串变形解法，包含多种实现方式和详细分析：

---
## 字符串变形

**题目描述**
```markdown
将字符串中的单词顺序反转，同时反转每个字符的大小写
示例：
输入："This is a sample" → 输出："SAMPLE A IS tHIS"
注意：需处理前导/后缀空格
```

**解法1：双反转法（推荐）**

**核心思路**
```markdown
1. 先整体反转字符串
2. 再逐个单词反转
3. 同步处理大小写转换
```

**实现代码**
```java
class Solution {
    public String trans(String s, int n) {
        if (n == 0) return s;
        
        char[] chars = s.toCharArray();
        // 大小写转换
        for (int i = 0; i < n; i++) {
            chars[i] = toggleCase(chars[i]);
        }
        
        // 整体反转
        reverse(chars, 0, n-1);
        
        // 逐个单词反转
        int start = 0;
        while (start < n) {
            while (start < n && chars[start] == ' ') start++;
            int end = start;
            while (end < n && chars[end] != ' ') end++;
            reverse(chars, start, end-1);
            start = end;
        }
        
        return new String(chars);
    }
    
    private char toggleCase(char c) {
        if (Character.isUpperCase(c)) {
            return Character.toLowerCase(c);
        } else if (Character.isLowerCase(c)) {
            return Character.toUpperCase(c);
        }
        return c;
    }
    
    private void reverse(char[] arr, int left, int right) {
        while (left < right) {
            char temp = arr[left];
            arr[left++] = arr[right];
            arr[right--] = temp;
        }
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 三次线性遍历
空间复杂度: O(n) - 字符数组存储
```

**解法2：栈辅助法**

**核心思路**
```markdown
1. 使用栈存储单词
2. 后进先出实现反转
3. 处理大小写转换
```

**实现代码**
```java
class Solution {
    public String trans(String s, int n) {
        Stack<String> stack = new Stack<>();
        StringBuilder word = new StringBuilder();
        
        // 处理前导空格
        int i = 0;
        while (i < n && s.charAt(i) == ' ') {
            word.append(' ');
            i++;
        }
        if (word.length() > 0) stack.push(word.toString());
        
        // 提取单词
        word = new StringBuilder();
        while (i < n) {
            char c = s.charAt(i);
            if (c == ' ') {
                stack.push(word.toString());
                word = new StringBuilder();
                // 处理连续空格
                while (i < n && s.charAt(i) == ' ') {
                    word.append(' ');
                    i++;
                }
                stack.push(word.toString());
                word = new StringBuilder();
            } else {
                word.append(toggleCase(c));
                i++;
            }
        }
        if (word.length() > 0) stack.push(word.toString());
        
        // 构建结果
        StringBuilder res = new StringBuilder();
        while (!stack.isEmpty()) {
            res.append(stack.pop());
        }
        return res.toString();
    }
    
    private char toggleCase(char c) {
        if (Character.isUpperCase(c)) {
            return Character.toLowerCase(c);
        } else if (Character.isLowerCase(c)) {
            return Character.toUpperCase(c);
        }
        return c;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 两次遍历
空间复杂度: O(n) - 栈空间
```

**解法3：双指针法**

**核心思路**
```markdown
1. 从后向前遍历字符串
2. 使用双指针定位单词边界
3. 实时处理大小写转换
```

**实现代码**
```java
class Solution {
    public String trans(String s, int n) {
        StringBuilder res = new StringBuilder();
        int end = n;
        
        for (int i = n-1; i >= 0; i--) {
            if (s.charAt(i) == ' ') {
                if (i+1 < end) {
                    res.append(convertCase(s.substring(i+1, end)));
                }
                res.append(' ');
                end = i;
            }
        }
        // 处理第一个单词
        if (end > 0) {
            res.append(convertCase(s.substring(0, end)));
        }
        return res.toString();
    }
    
    private String convertCase(String word) {
        char[] chars = word.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            chars[i] = toggleCase(chars[i]);
        }
        return new String(chars);
    }
    
    private char toggleCase(char c) {
        if (Character.isUpperCase(c)) {
            return Character.toLowerCase(c);
        } else if (Character.isLowerCase(c)) {
            return Character.toUpperCase(c);
        }
        return c;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 单次遍历
空间复杂度: O(n) - 结果存储
```

**解法对比**
| 维度       | 双反转法 | 栈辅助法 | 双指针法 |
|------------|---------|----------|----------|
| 时间复杂度 | O(n)    | O(n)     | O(n)     |
| 空间复杂度 | O(n)    | O(n)     | O(n)     |
| 边界处理   | 优秀     | 良好      | 优秀      |
| 推荐指数   | ★★★★★  | ★★★★    | ★★★★★   |

**补充说明**
1. 双反转法代码简洁高效，推荐面试使用
2. 栈辅助法思路直观，适合教学演示
3. 双指针法空间利用率最优

以下是优化后的多解法版本：

---
## 最长回文子串

**题目描述**
```markdown
给定一个字符串s，找到s中最长的回文子串
示例：
输入："babad" → 输出："bab"或"aba"
输入："cbbd" → 输出："bb"
```

**解法1：中心扩展法（推荐）**

**核心思路**
```markdown
1. 遍历每个字符作为中心点
2. 向两边扩展寻找最长回文
3. 处理奇偶长度两种情况
```

**实现代码**
```java
class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);    // 奇数长度
            int len2 = expandAroundCenter(s, i, i+1);  // 偶数长度
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }
    
    private int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() 
               && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n^2) - 中心点遍历+扩展
空间复杂度: O(1) - 常量空间
```

**解法2：动态规划**

**核心思路**
```markdown
1. dp[i][j]表示s[i..j]是否为回文
2. 状态转移：两端相等且内部是回文
3. 记录最长回文位置
```

**实现代码**
```java
class Solution {
    public String longestPalindrome(String s) {
        int n = s.length();
        boolean[][] dp = new boolean[n][n];
        String res = "";
        
        for (int i = n-1; i >= 0; i--) {
            for (int j = i; j < n; j++) {
                dp[i][j] = s.charAt(i) == s.charAt(j) 
                          && (j - i < 3 || dp[i+1][j-1]);
                
                if (dp[i][j] && j - i + 1 > res.length()) {
                    res = s.substring(i, j+1);
                }
            }
        }
        return res;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n^2) - 填表
空间复杂度: O(n^2) - DP表
```

**解法3：Manacher算法（最优）**

**核心思路**
```markdown
1. 插入特殊字符处理偶回文
2. 维护回文半径数组P[i]
3. 利用对称性减少重复计算
```

**实现代码**
```java
class Solution {
    public String longestPalindrome(String s) {
        String T = preProcess(s);
        int n = T.length();
        int[] P = new int[n];
        int C = 0, R = 0;
        
        for (int i = 1; i < n-1; i++) {
            int mirror = 2*C - i;
            if (R > i) {
                P[i] = Math.min(R - i, P[mirror]);
            }
            
            while (T.charAt(i + 1 + P[i]) == T.charAt(i - 1 - P[i])) {
                P[i]++;
            }
            
            if (i + P[i] > R) {
                C = i;
                R = i + P[i];
            }
        }
        
        int maxLen = 0;
        int center = 0;
        for (int i = 1; i < n-1; i++) {
            if (P[i] > maxLen) {
                maxLen = P[i];
                center = i;
            }
        }
        int start = (center - maxLen) / 2;
        return s.substring(start, start + maxLen);
    }
    
    private String preProcess(String s) {
        StringBuilder sb = new StringBuilder("^");
        for (int i = 0; i < s.length(); i++) {
            sb.append("#").append(s.charAt(i));
        }
        sb.append("#$");
        return sb.toString();
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 线性扫描
空间复杂度: O(n) - 半径数组
```

**解法对比**
| 维度       | 中心扩展法 | 动态规划 | Manacher算法 |
|------------|-----------|----------|--------------|
| 时间复杂度 | O(n^2)    | O(n^2)   | O(n)         |
| 空间复杂度 | O(1)      | O(n^2)   | O(n)         |
| 实现难度   | 简单       | 中等     | 较难         |
| 推荐指数   | ★★★★★    | ★★★★    | ★★★★★       |

**补充说明**
1. 面试推荐使用中心扩展法，平衡效率和实现难度
2. Manacher算法适合性能敏感场景
3. 动态规划有助于理解回文特性

以下是优化后的最长公共子序列（LCS）解法，包含多种实现方式和详细分析：

---
## 最长公共子序列

**题目描述**
```markdown
给定两个字符串str1和str2，返回它们的最长公共子序列
示例：
输入："ABCBDAB", "BDCABA" → 输出："BCBA"
```

**解法1：标准动态规划**

**核心思路**
```markdown
1. dp[i][j]表示str1前i个和str2前j个的LCS长度
2. 状态转移：
   - 字符相等：dp[i][j] = dp[i-1][j-1]+1
   - 不等：dp[i][j] = max(dp[i-1][j], dp[i][j-1])
3. 反向追踪构建LCS字符串
```

**实现代码**
```java
class Solution {
    public String LCS(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m+1][n+1];
        
        // 构建DP表
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i-1) == s2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        
        // 回溯构建LCS字符串
        StringBuilder sb = new StringBuilder();
        int i = m, j = n;
        while (i > 0 && j > 0) {
            if (s1.charAt(i-1) == s2.charAt(j-1)) {
                sb.append(s1.charAt(i-1));
                i--; j--;
            } else if (dp[i-1][j] > dp[i][j-1]) {
                i--;
            } else {
                j--;
            }
        }
        
        return sb.length() == 0 ? "-1" : sb.reverse().toString();
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(mn) - 填表+回溯
空间复杂度: O(mn) - DP表存储
```

**解法2：空间优化DP**

**核心思路**
```markdown
1. 观察DP表只依赖前一行和当前行
2. 使用两行数组替代完整DP表
```

**实现代码**
```java
class Solution {
    public String LCS(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[2][n+1];
        
        for (int i = 1; i <= m; i++) {
            int curr = i % 2;
            int prev = 1 - curr;
            for (int j = 1; j <= n; j++) {
                if (s1.charAt(i-1) == s2.charAt(j-1)) {
                    dp[curr][j] = dp[prev][j-1] + 1;
                } else {
                    dp[curr][j] = Math.max(dp[prev][j], dp[curr][j-1]);
                }
            }
        }
        
        // 回溯需要重建完整DP表（略）
        // 实际应用中可结合解法1的回溯方法
        return reconstructLCS(s1, s2, dp[m%2], m, n);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(mn)
空间复杂度: O(n) - 两行数组
```

**解法3：递归+记忆化**

**核心思路**
```markdown
1. 自顶向下递归实现
2. 使用memo数组避免重复计算
```

**实现代码**
```java
class Solution {
    private int[][] memo;
    
    public String LCS(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        memo = new int[m+1][n+1];
        for (int[] row : memo) Arrays.fill(row, -1);
        
        lcsLength(s1, s2, m, n);
        return reconstruct(s1, s2, m, n);
    }
    
    private int lcsLength(String s1, String s2, int i, int j) {
        if (i == 0 || j == 0) return 0;
        if (memo[i][j] != -1) return memo[i][j];
        
        if (s1.charAt(i-1) == s2.charAt(j-1)) {
            memo[i][j] = lcsLength(s1, s2, i-1, j-1) + 1;
        } else {
            memo[i][j] = Math.max(lcsLength(s1, s2, i-1, j), 
                               lcsLength(s1, s2, i, j-1));
        }
        return memo[i][j];
    }
    
    private String reconstruct(String s1, String s2, int i, int j) {
        if (i == 0 || j == 0) return "";
        if (s1.charAt(i-1) == s2.charAt(j-1)) {
            return reconstruct(s1, s2, i-1, j-1) + s1.charAt(i-1);
        }
        if (memo[i-1][j] > memo[i][j-1]) {
            return reconstruct(s1, s2, i-1, j);
        }
        return reconstruct(s1, s2, i, j-1);
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(mn)
空间复杂度: O(mn) - 递归栈+memo数组
```

**解法对比**
| 维度       | 标准DP | 空间优化DP | 记忆化递归 |
|------------|--------|------------|------------|
| 时间复杂度 | O(mn)  | O(mn)      | O(mn)      |
| 空间复杂度 | O(mn)  | O(n)       | O(mn)      |
| 实现难度   | 中等   | 中等       | 较难       |
| 推荐指数   | ★★★★★ | ★★★★      | ★★★       |

**补充说明**
1. 面试推荐使用标准DP解法，清晰易实现
2. 空间优化版适合内存敏感场景
3. 记忆化递归有助于理解问题本质

以下是优化后的回文数判断解法，包含多种实现方式和详细分析：

---
## 回文数判断

**题目描述**
```markdown
判断一个整数是否是回文数（正序和倒序相同）
示例：
121 → true
-121 → false
10 → false
```

**解法1：字符串比较法**

**核心思路**
```markdown
1. 将整数转换为字符串
2. 双指针比较首尾字符
```

**实现代码**
```java
class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0) return false;
        String s = Integer.toString(x);
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left++) != s.charAt(right--)) {
                return false;
            }
        }
        return true;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - n为数字位数
空间复杂度: O(n) - 字符串存储
```

**解法2：数字反转法（推荐）**

**核心思路**
```markdown
1. 反转后半部分数字
2. 与前半部分比较
3. 处理奇偶位数情况
```

**实现代码**
```java
class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) {
            return false;
        }
        
        int reversed = 0;
        while (x > reversed) {
            reversed = reversed * 10 + x % 10;
            x /= 10;
        }
        
        return x == reversed || x == reversed / 10;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(logn) - 反转一半数字
空间复杂度: O(1) - 常量空间
```

**解法3：数学比较法**

**核心思路**
```markdown
1. 计算数字位数
2. 逐位比较首尾数字
3. 使用数学运算取位
```

**实现代码**
```java
class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0) return false;
        
        int div = 1;
        while (x / div >= 10) {
            div *= 10;
        }
        
        while (x > 0) {
            int left = x / div;
            int right = x % 10;
            if (left != right) return false;
            
            x = (x % div) / 10;
            div /= 100;
        }
        return true;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(logn) - 数字位数
空间复杂度: O(1) - 常量空间
```

**解法对比**
| 维度       | 字符串法 | 数字反转法 | 数学比较法 |
|------------|---------|------------|------------|
| 时间复杂度 | O(n)    | O(logn)    | O(logn)    |
| 空间复杂度 | O(n)    | O(1)       | O(1)       |
| 实现难度   | 简单    | 中等       | 较难       |
| 推荐指数   | ★★★★   | ★★★★★     | ★★★★      |

**补充说明**
1. 数字反转法是最优解法，推荐面试使用
2. 字符串法简单直观，适合快速实现
3. 数学比较法展示位运算技巧

以下是优化后的有效括号判断解法，包含多种实现方式和详细分析：

---
## 有效的括号

**题目描述**
```markdown
给定包含'(){}[]'的字符串，判断括号是否有效匹配
示例：
"()" → true
"([)]" → false
"{[]}" → true
```

**解法1：栈匹配法（推荐）**

**核心思路**
```markdown
1. 使用栈存储遇到的左括号
2. 遇到右括号时检查栈顶是否匹配
3. 最终检查栈是否为空
```

**实现代码**
```java
class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        Map<Character, Character> map = Map.of(
            ')', '(', 
            ']', '[', 
            '}', '{'
        );
        
        for (char c : s.toCharArray()) {
            if (!map.containsKey(c)) {
                stack.push(c);
            } else if (stack.isEmpty() || stack.pop() != map.get(c)) {
                return false;
            }
        }
        return stack.isEmpty();
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 单次遍历
空间复杂度: O(n) - 栈空间
```

**解法2：字符串替换法**

**核心思路**
```markdown
循环替换所有成对括号为空字符串
```

**实现代码**
```java
class Solution {
    public boolean isValid(String s) {
        while (s.contains("()") || s.contains("[]") || s.contains("{}")) {
            s = s.replace("()", "")
                .replace("[]", "")
                .replace("{}", "");
        }
        return s.isEmpty();
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n^2) - 嵌套替换
空间复杂度: O(n) - 字符串拷贝
```

**解法3：计数法（有限场景）**

**核心思路**
```markdown
1. 仅适用于单一括号类型
2. 维护左括号计数器
3. 遇到右括号时减计数
```

**实现代码**
```java
// 仅适用于全小括号场景
class Solution {
    public boolean isValid(String s) {
        int balance = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') balance++;
            else if (c == ')') balance--;
            if (balance < 0) return false;
        }
        return balance == 0;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n)
空间复杂度: O(1)
```

**解法对比**
| 维度       | 栈匹配法 | 替换法 | 计数法 |
|------------|---------|--------|--------|
| 时间复杂度 | O(n)    | O(n^2) | O(n)   |
| 空间复杂度 | O(n)    | O(n)   | O(1)   |
| 适用范围   | 通用    | 教学用 | 单一型 |
| 推荐指数   | ★★★★★  | ★★     | ★★★    |

**补充说明**
1. 栈解法是最通用高效的实现
2. 替换法虽然直观但性能较差
3. 计数法仅适用于面试特定变种题

以下是优化后的整数反转解法，包含多种实现方式和详细分析：

---
## 整数反转

**题目描述**
```markdown
反转32位有符号整数，溢出时返回0
示例：
123 → 321
-123 → -321
120 → 21
```

**解法1：数学运算（推荐）**

**核心思路**
```markdown
1. 逐位弹出原数末尾数字
2. 推入新数开头
3. 每次检查溢出情况
```

**实现代码**
```java
class Solution {
    public int reverse(int x) {
        int rev = 0;
        while (x != 0) {
            int pop = x % 10;
            x /= 10;
            // 检查正数溢出
            if (rev > Integer.MAX_VALUE/10 || 
               (rev == Integer.MAX_VALUE/10 && pop > 7)) {
                return 0;
            }
            // 检查负数溢出
            if (rev < Integer.MIN_VALUE/10 || 
               (rev == Integer.MIN_VALUE/10 && pop < -8)) {
                return 0;
            }
            rev = rev * 10 + pop;
        }
        return rev;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(log|x|) - 数字位数
空间复杂度: O(1) - 常量空间
```

markdown字符串反转
**核心思路**
```markdown
1. 转换为字符串处理
2. 反转后转换回整数
3. 捕获溢出异常
```

**实现代码**
```java
class Solution {
    public int reverse(int x) {
        try {
            String reversed = new StringBuilder()
                .append(Math.abs(x))
                .reverse()
                .toString();
            int result = Integer.parseInt(reversed);
            return x < 0 ? -result : result;
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(n) - 字符串操作
空间复杂度: O(n) - 字符串存储
```

**解法3：长整型处理**

**核心思路**
```markdown
1. 使用更大范围的long存储
2. 完成反转后检查是否溢出
```

**实现代码**
```java
class Solution {
    public int reverse(int x) {
        long rev = 0;
        while (x != 0) {
            rev = rev * 10 + x % 10;
            x /= 10;
            if (rev > Integer.MAX_VALUE || rev < Integer.MIN_VALUE) {
                return 0;
            }
        }
        return (int)rev;
    }
}
```

**复杂度分析**
```markdown
时间复杂度: O(log|x|)
空间复杂度: O(1)
```

**解法对比**
| 维度       | 数学运算 | 字符串法 | 长整型法 |
|------------|---------|----------|----------|
| 时间复杂度 | O(logn) | O(n)     | O(logn)  |
| 空间复杂度 | O(1)    | O(n)     | O(1)     |
| 溢出处理   | 提前检查 | 异常捕获 | 后期检查 |
| 推荐指数   | ★★★★★  | ★★★      | ★★★★     |

**补充说明**
1. 数学运算解法最优，推荐面试使用
2. 字符串解法简单但效率较低
3. 长整型解法代码更简洁

