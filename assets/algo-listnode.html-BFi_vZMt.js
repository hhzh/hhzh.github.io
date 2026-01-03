import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as t,o as p}from"./app-CJ6OYlQ-.js";const e={};function o(c,n){return p(),a("div",null,[...n[0]||(n[0]=[t(`<h2 id="两两交换链表节点" tabindex="-1"><a class="header-anchor" href="#两两交换链表节点"><span>两两交换链表节点</span></a></h2><p><strong>题目描述</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>给定一个链表，两两交换其中相邻的节点，并实际交换节点而非仅修改值。

示例：
输入：1-&gt;2-&gt;3-&gt;4
输出：2-&gt;1-&gt;4-&gt;3

要求：
<span class="token list punctuation">1.</span> 不能修改节点内部值
<span class="token list punctuation">2.</span> 需实际交换节点位置
<span class="token list punctuation">3.</span> 处理链表长度奇偶情况
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解题思路</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>核心操作：
<span class="token list punctuation">1.</span> 交换相邻两个节点的指向关系
<span class="token list punctuation">2.</span> 维护前驱节点与后续链表的连接
<span class="token list punctuation">3.</span> 处理边界条件（空链表、单节点链表）

方法选择：
<span class="token list punctuation">1.</span> 递归法：直观但空间复杂度高
<span class="token list punctuation">2.</span> 迭代法：节省空间，推荐使用
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键步骤</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>迭代法要点：
<span class="token list punctuation">1.</span> 使用哑节点(dummy)简化头节点处理
<span class="token list punctuation">2.</span> 维护三个指针：
   <span class="token list punctuation">-</span> pre：当前对的前驱节点
   <span class="token list punctuation">-</span> first：当前对的第一个节点
   <span class="token list punctuation">-</span> second：当前对的第二个节点
<span class="token list punctuation">3.</span> 四步交换操作：
   <span class="token list punctuation">-</span> first指向second.next
   <span class="token list punctuation">-</span> second指向first
   <span class="token list punctuation">-</span> pre指向second
   <span class="token list punctuation">-</span> pre移动到新的位置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准实现（迭代法）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">swapPairs</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dummy<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> pre <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
        
        <span class="token keyword">while</span> <span class="token punctuation">(</span>pre<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> pre<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ListNode</span> first <span class="token operator">=</span> pre<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token class-name">ListNode</span> second <span class="token operator">=</span> first<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            
            <span class="token comment">// 执行交换</span>
            first<span class="token punctuation">.</span>next <span class="token operator">=</span> second<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            second<span class="token punctuation">.</span>next <span class="token operator">=</span> first<span class="token punctuation">;</span>
            pre<span class="token punctuation">.</span>next <span class="token operator">=</span> second<span class="token punctuation">;</span>
            
            <span class="token comment">// 移动pre指针</span>
            pre <span class="token operator">=</span> first<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 遍历链表一次
空间复杂度：O(1) - 只使用常数空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>递归实现</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">swapPairs</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 递归终止条件</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> head<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token class-name">ListNode</span> newHead <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        head<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">swapPairs</span><span class="token punctuation">(</span>newHead<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
        newHead<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
        
        <span class="token keyword">return</span> newHead<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 每个节点处理一次
空间复杂度：O(n) - 递归调用栈深度
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Solution</span> solution <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 偶数长度测试</span>
    <span class="token class-name">ListNode</span> test1 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">swapPairs</span><span class="token punctuation">(</span>test1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2-&gt;1-&gt;4-&gt;3</span>
    
    <span class="token comment">// 奇数长度测试</span>
    <span class="token class-name">ListNode</span> test2 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">swapPairs</span><span class="token punctuation">(</span>test2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2-&gt;1-&gt;3</span>
    
    <span class="token comment">// 边界测试</span>
    <span class="token class-name">ListNode</span> test3 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">swapPairs</span><span class="token punctuation">(</span>test3<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
    
    <span class="token class-name">ListNode</span> test4 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">swapPairs</span><span class="token punctuation">(</span>test4<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：打印链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">&quot;-&gt;&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法比较</p><table><thead><tr><th>方法</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>迭代法</td><td>空间效率高</td><td>指针操作稍复杂</td><td>生产环境首选</td></tr><tr><td>递归法</td><td>代码简洁直观</td><td>栈空间消耗大</td><td>理解算法原理</td></tr></tbody></table><p>常见问题解答</p><p><strong>Q1：为什么需要哑节点？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>哑节点统一了头节点和其他节点的处理逻辑，避免单独处理头节点交换的特殊情况
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q2：如何处理奇数长度链表？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>当剩余单个节点时，循环条件 pre.next.next != null 会自动终止，最后一个节点保持原状
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q3：递归法的空间消耗在哪里？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>每次递归调用都需要保存当前函数栈帧，递归深度为n/2，故空间复杂度O(n)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可视化示例</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>初始链表：dummy -&gt; 1 -&gt; 2 -&gt; 3 -&gt; 4

第一轮交换：
1. first = 1, second = 2
2. 1.next = 3
3. 2.next = 1
4. dummy.next = 2
结果：dummy -&gt; 2 -&gt; 1 -&gt; 3 -&gt; 4

第二轮交换：
1. first = 3, second = 4
2. 3.next = null
3. 4.next = 3
4. 1.next = 4
结果：dummy -&gt; 2 -&gt; 1 -&gt; 4 -&gt; 3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩展思考</strong>：</p><ol><li>如何实现三三交换链表节点？</li><li>如何实现K个一组翻转链表？</li><li>如何在交换节点时同时记录交换次数？</li></ol><h2 id="删除链表的倒数第n个节点" tabindex="-1"><a class="header-anchor" href="#删除链表的倒数第n个节点"><span>删除链表的倒数第N个节点</span></a></h2><p><strong>题目描述</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>给定一个链表，删除链表的倒数第n个节点，并返回头节点。

示例：
输入：1-&gt;2-&gt;3-&gt;4-&gt;5, n=2
输出：1-&gt;2-&gt;3-&gt;5

约束条件：
<span class="token list punctuation">1.</span> 给定的n保证有效
<span class="token list punctuation">2.</span> 要求一趟扫描实现（进阶要求）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解题思路</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>双指针法（快慢指针）：
<span class="token list punctuation">1.</span> 快指针先移动n步
<span class="token list punctuation">2.</span> 快慢指针同步移动直到快指针到达末尾
<span class="token list punctuation">3.</span> 此时慢指针指向待删除节点的前驱
<span class="token list punctuation">4.</span> 使用哑节点简化头节点删除情况
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键步骤</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="token list punctuation">1.</span> 初始化哑节点和快慢指针
<span class="token list punctuation">2.</span> 快指针先行n步
<span class="token list punctuation">3.</span> 同步移动直到快指针到末尾
<span class="token list punctuation">4.</span> 删除慢指针的下一个节点
<span class="token list punctuation">5.</span> 处理边界条件（删除头节点）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准实现（双指针法）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">removeNthFromEnd</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dummy<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> fast <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> slow <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
        
        <span class="token comment">// 快指针先走n步</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 同步移动直到快指针到末尾</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>fast<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 删除节点</span>
        slow<span class="token punctuation">.</span>next <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(L) - 只需遍历链表一次
空间复杂度：O(1) - 只使用常数空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>替代解法：计算长度法</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">removeNthFromEnd</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        
        <span class="token comment">// 计算链表长度</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>curr <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            length<span class="token operator">++</span><span class="token punctuation">;</span>
            curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 处理删除头节点情况</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">==</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 找到待删除节点的前驱</span>
        curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> length <span class="token operator">-</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 删除节点</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token keyword">return</span> head<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(L) - 需要遍历链表两次
空间复杂度：O(1) - 只使用常数空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Solution</span> solution <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 常规测试</span>
    <span class="token class-name">ListNode</span> test1 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">removeNthFromEnd</span><span class="token punctuation">(</span>test1<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;2-&gt;3-&gt;5</span>
    
    <span class="token comment">// 删除头节点</span>
    <span class="token class-name">ListNode</span> test2 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">removeNthFromEnd</span><span class="token punctuation">(</span>test2<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
    
    <span class="token comment">// 删除尾节点</span>
    <span class="token class-name">ListNode</span> test3 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">removeNthFromEnd</span><span class="token punctuation">(</span>test3<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;2</span>
    
    <span class="token comment">// 单节点链表</span>
    <span class="token class-name">ListNode</span> test4 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">removeNthFromEnd</span><span class="token punctuation">(</span>test4<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：打印链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">&quot;-&gt;&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法比较</p><table><thead><tr><th>方法</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>双指针法</td><td>一趟扫描，效率高</td><td>逻辑稍复杂</td><td>推荐使用</td></tr><tr><td>计算长度法</td><td>直观易懂</td><td>需要两次遍历</td><td>理解算法原理</td></tr></tbody></table><p>常见问题解答</p><p><strong>Q1：为什么需要哑节点？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>哑节点统一了删除头节点和其他节点的处理逻辑，避免特殊判断
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q2：如何处理n等于链表长度的情况？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>此时快指针直接走到末尾，慢指针保持不动，自然处理了删除头节点的情况
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q3：为什么快指针要先走n步？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>这样当快指针到达末尾时，慢指针刚好指向倒数第n个节点的前驱节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>算法可视化</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>初始链表：dummy -&gt; 1 -&gt; 2 -&gt; 3 -&gt; 4 -&gt; 5, n=2

步骤1：快指针先走2步
fast: 1 -&gt; 2
slow: dummy

步骤2：同步移动
fast: 2 -&gt; 3 -&gt; 4 -&gt; 5
slow: dummy -&gt; 1 -&gt; 2 -&gt; 3

步骤3：删除操作
slow.next = slow.next.next
结果：dummy -&gt; 1 -&gt; 2 -&gt; 3 -&gt; 5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩展思考</strong>：</p><ol><li>如何删除倒数第n个节点并返回被删除的节点？</li><li>如何实现双向链表的类似操作？</li><li>如何处理n可能无效的情况？</li></ol><h2 id="k个一组翻转链表" tabindex="-1"><a class="header-anchor" href="#k个一组翻转链表"><span>K个一组翻转链表</span></a></h2><p><strong>题目描述</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>给定一个链表，每k个节点一组进行翻转，返回翻转后的链表。
如果节点总数不是k的整数倍，最后剩余的节点保持原有顺序。

示例：
输入：1-&gt;2-&gt;3-&gt;4-&gt;5
k=2时输出：2-&gt;1-&gt;4-&gt;3-&gt;5
k=3时输出：3-&gt;2-&gt;1-&gt;4-&gt;5

限制：
<span class="token list punctuation">1.</span> 不能修改节点值，只能改变节点指向
<span class="token list punctuation">2.</span> 常数级空间复杂度（进阶要求）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解题思路</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>核心操作：
<span class="token list punctuation">1.</span> 分组检测：确定每组k个节点的边界
<span class="token list punctuation">2.</span> 组内翻转：反转当前k个节点的顺序
<span class="token list punctuation">3.</span> 组间连接：将翻转后的子链表正确连接

关键点：
<span class="token list punctuation">-</span> 使用哨兵节点简化头节点处理
<span class="token list punctuation">-</span> 维护四个关键指针：
  <span class="token list punctuation">*</span> pre：上一组的尾节点
  <span class="token list punctuation">*</span> start：当前组的首节点
  <span class="token list punctuation">*</span> end：当前组的尾节点
  <span class="token list punctuation">*</span> next：下一组的首节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准实现（指针调整法）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseKGroup</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dummy<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> pre <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> end <span class="token operator">=</span> dummy<span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>end<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 定位当前组的尾节点</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> k <span class="token operator">&amp;&amp;</span> end <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                end <span class="token operator">=</span> end<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>end <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">break</span><span class="token punctuation">;</span>
            
            <span class="token comment">// 记录关键节点</span>
            <span class="token class-name">ListNode</span> start <span class="token operator">=</span> pre<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token class-name">ListNode</span> next <span class="token operator">=</span> end<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            
            <span class="token comment">// 断开当前组</span>
            end<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            
            <span class="token comment">// 翻转当前组并连接</span>
            pre<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">reverse</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">;</span>
            start<span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span>
            
            <span class="token comment">// 重置指针</span>
            pre <span class="token operator">=</span> start<span class="token punctuation">;</span>
            end <span class="token operator">=</span> pre<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 辅助方法：翻转链表</span>
    <span class="token keyword">private</span> <span class="token class-name">ListNode</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>curr <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ListNode</span> next <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            curr<span class="token punctuation">.</span>next <span class="token operator">=</span> prev<span class="token punctuation">;</span>
            prev <span class="token operator">=</span> curr<span class="token punctuation">;</span>
            curr <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> prev<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 每个节点被处理两次（分组检测和翻转）
空间复杂度：O(1) - 只使用常数空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>替代解法（栈实现）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseKGroup</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Deque</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ListNode</span><span class="token punctuation">&gt;</span></span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayDeque</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> tail <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
        
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
            
            <span class="token comment">// 压入k个节点</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>curr <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> count <span class="token operator">&lt;</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span><span class="token punctuation">;</span>
                curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                count<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            
            <span class="token comment">// 不足k个时保持原样</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">!=</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                tail<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            
            <span class="token comment">// 弹出k个节点实现翻转</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>stack<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                tail<span class="token punctuation">.</span>next <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                tail <span class="token operator">=</span> tail<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            tail<span class="token punctuation">.</span>next <span class="token operator">=</span> curr<span class="token punctuation">;</span>
            head <span class="token operator">=</span> curr<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 每个节点入栈出栈各一次
空间复杂度：O(k) - 栈空间消耗
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Solution</span> solution <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 常规测试</span>
    <span class="token class-name">ListNode</span> test1 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">reverseKGroup</span><span class="token punctuation">(</span>test1<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2-&gt;1-&gt;4-&gt;3-&gt;5</span>
    
    <span class="token comment">// 边界测试</span>
    <span class="token class-name">ListNode</span> test2 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">reverseKGroup</span><span class="token punctuation">(</span>test2<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
    
    <span class="token comment">// 不足k的测试</span>
    <span class="token class-name">ListNode</span> test3 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">reverseKGroup</span><span class="token punctuation">(</span>test3<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3-&gt;2-&gt;1-&gt;4</span>
    
    <span class="token comment">// k等于长度</span>
    <span class="token class-name">ListNode</span> test4 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">reverseKGroup</span><span class="token punctuation">(</span>test4<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3-&gt;2-&gt;1</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：打印链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">&quot;-&gt;&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法比较</p><table><thead><tr><th>方法</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>指针调整法</td><td>空间效率高</td><td>指针操作较复杂</td><td>推荐使用</td></tr><tr><td>栈实现</td><td>逻辑简单直观</td><td>需要额外O(k)空间</td><td>理解算法原理</td></tr></tbody></table><p>常见问题解答</p><p><strong>Q1：如何确定分组边界？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>通过循环移动end指针k次，若提前遇到null说明不足k个
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q2：为什么需要断开当前组？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>断开后可以独立翻转当前组，避免影响后续节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q3：翻转后如何保证组间连接？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>通过pre指针连接已处理部分，start指针连接未处理部分
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>算法可视化</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>初始链表：dummy -&gt; 1 -&gt; 2 -&gt; 3 -&gt; 4 -&gt; 5, k=2

第一组处理：
1. 定位end到2
2. 断开：dummy-&gt;1-&gt;2 | 3-&gt;4-&gt;5
3. 翻转1-&gt;2得到2-&gt;1
4. 连接：dummy-&gt;2-&gt;1-&gt;3-&gt;4-&gt;5
5. 移动pre到1

第二组处理：
1. 定位end到4
2. 断开：1-&gt;3-&gt;4 | 5
3. 翻转3-&gt;4得到4-&gt;3
4. 连接：2-&gt;1-&gt;4-&gt;3-&gt;5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩展思考</strong>：</p><ol><li>如何实现从尾到头k组翻转？</li><li>如何同时记录每组翻转的次数？</li><li>如何优化大k值情况下的性能？</li></ol><h2 id="返回链表最后k个节点" tabindex="-1"><a class="header-anchor" href="#返回链表最后k个节点"><span>返回链表最后K个节点</span></a></h2><p><strong>题目描述</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>给定一个链表，返回链表中最后k个节点组成的链表。
如果链表长度小于k，则返回空链表。

示例1：
输入：1-&gt;2-&gt;3-&gt;4-&gt;5, k=2
输出：4-&gt;5

示例2：
输入：2-&gt;NULL, k=8
输出：NULL

要求：
<span class="token list punctuation">1.</span> 不能修改原链表
<span class="token list punctuation">2.</span> 常数空间复杂度（进阶要求）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解题思路</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>双指针法（快慢指针）：
<span class="token list punctuation">1.</span> 快指针先移动k步
<span class="token list punctuation">2.</span> 快慢指针同步移动直到快指针到达末尾
<span class="token list punctuation">3.</span> 此时慢指针指向倒数第k个节点
<span class="token list punctuation">4.</span> 返回从慢指针开始的子链表

边界处理：
<span class="token list punctuation">-</span> 空链表直接返回
<span class="token list punctuation">-</span> k=0时返回空
<span class="token list punctuation">-</span> k大于链表长度时返回空
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准实现（双指针法）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">getLastKNodes</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 处理边界条件</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> k <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token class-name">ListNode</span> fast <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> slow <span class="token operator">=</span> head<span class="token punctuation">;</span>
        
        <span class="token comment">// 快指针先走k步</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> k<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>fast <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// k大于链表长度</span>
            <span class="token punctuation">}</span>
            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 同步移动直到快指针到末尾</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>fast <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">return</span> slow<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 只需遍历链表一次
空间复杂度：O(1) - 只使用常数空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>替代解法（计算长度法）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">getLastKNodes</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> k <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 计算链表长度</span>
        <span class="token keyword">int</span> length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>curr <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            length<span class="token operator">++</span><span class="token punctuation">;</span>
            curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 检查k是否合法</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">&gt;</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 定位到倒数第k个节点</span>
        curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> length <span class="token operator">-</span> k<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">return</span> curr<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 需要遍历链表两次
空间复杂度：O(1) - 只使用常数空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Solution</span> solution <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 常规测试</span>
    <span class="token class-name">ListNode</span> test1 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">getLastKNodes</span><span class="token punctuation">(</span>test1<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 4-&gt;5</span>
    
    <span class="token comment">// 边界测试</span>
    <span class="token class-name">ListNode</span> test2 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">getLastKNodes</span><span class="token punctuation">(</span>test2<span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null</span>
    
    <span class="token comment">// k等于长度</span>
    <span class="token class-name">ListNode</span> test3 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">getLastKNodes</span><span class="token punctuation">(</span>test3<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;2-&gt;3</span>
    
    <span class="token comment">// k=0测试</span>
    <span class="token class-name">ListNode</span> test4 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">getLastKNodes</span><span class="token punctuation">(</span>test4<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：打印链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;NULL&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">&quot;-&gt;&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法比较</p><table><thead><tr><th>方法</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>双指针法</td><td>一趟扫描，效率高</td><td>逻辑稍复杂</td><td>推荐使用</td></tr><tr><td>计算长度法</td><td>直观易懂</td><td>需要两次遍历</td><td>理解算法原理</td></tr></tbody></table><p>常见问题解答</p><p><strong>Q1：为什么快指针要先走k步？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>这样当快指针到达末尾时，慢指针刚好落后k步，指向倒数第k个节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q2：如何处理k大于链表长度的情况？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>快指针在先行移动时会提前到达null，此时直接返回null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q3：两种方法哪种更好？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>双指针法更优，虽然两种方法时间复杂度都是O(n)，但双指针法只需遍历一次
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>算法可视化</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>链表：1-&gt;2-&gt;3-&gt;4-&gt;5, k=2

步骤1：快指针先走2步
fast: 1 -&gt; 2 -&gt; 3
slow: 1

步骤2：同步移动
fast: 3 -&gt; 4 -&gt; 5 -&gt; null
slow: 1 -&gt; 2 -&gt; 3 -&gt; 4

结果：从slow(4)开始的子链表：4-&gt;5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩展思考</strong>：</p><ol><li>如何返回最后k个节点的同时保留原链表？</li><li>如何实现双向链表的类似操作？</li><li>如何优化处理超大k值的情况？</li></ol><h2 id="删除有序链表中的重复元素-ii" tabindex="-1"><a class="header-anchor" href="#删除有序链表中的重复元素-ii"><span>删除有序链表中的重复元素 II</span></a></h2><p><strong>题目描述</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>给定一个升序排列的链表，删除所有含有重复数字的节点，只保留原始链表中没有重复出现的数字。

示例1：
输入：1-&gt;1-&gt;2
输出：2

示例2：
输入：1-&gt;1-&gt;2-&gt;3-&gt;3-&gt;3-&gt;5
输出：2-&gt;5

要求：
<span class="token list punctuation">1.</span> 链表已按升序排列
<span class="token list punctuation">2.</span> 时间复杂度O(n)
<span class="token list punctuation">3.</span> 空间复杂度O(1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解题思路</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>双指针法：
<span class="token list punctuation">1.</span> 使用哑节点(dummy)简化头节点删除操作
<span class="token list punctuation">2.</span> 维护两个指针：
   <span class="token list punctuation">-</span> pre：指向当前确定不重复的节点
   <span class="token list punctuation">-</span> curr：用于遍历检查重复
<span class="token list punctuation">3.</span> 当发现重复节点时，跳过所有相同值的节点
<span class="token list punctuation">4.</span> 未发现重复时正常移动指针
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键步骤</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="token list punctuation">1.</span> 创建哑节点并初始化指针
<span class="token list punctuation">2.</span> 比较相邻节点值：
   <span class="token list punctuation">-</span> 发现重复：记录重复值并跳过所有该值节点
   <span class="token list punctuation">-</span> 未发现重复：移动pre指针
<span class="token list punctuation">3.</span> 始终维护pre.next到curr的链表关系
<span class="token list punctuation">4.</span> 处理尾部可能的重复情况
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准实现</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">deleteDuplicates</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> head<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dummy<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> pre <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        
        <span class="token keyword">while</span> <span class="token punctuation">(</span>curr <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 跳过所有重复节点</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>curr<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> curr<span class="token punctuation">.</span>val <span class="token operator">==</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            
            <span class="token comment">// 判断是否有重复</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>pre<span class="token punctuation">.</span>next <span class="token operator">==</span> curr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 无重复，移动pre</span>
                pre <span class="token operator">=</span> pre<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 有重复，跳过所有重复节点</span>
                pre<span class="token punctuation">.</span>next <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            
            curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 只需遍历链表一次
空间复杂度：O(1) - 只使用常数空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>替代解法（标记法）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">deleteDuplicates</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dummy<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> pre <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        
        <span class="token keyword">while</span> <span class="token punctuation">(</span>curr <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">boolean</span> duplicate <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            
            <span class="token comment">// 检查当前节点是否重复</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span>curr<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> curr<span class="token punctuation">.</span>val <span class="token operator">==</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
                duplicate <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            
            <span class="token keyword">if</span> <span class="token punctuation">(</span>duplicate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 跳过重复节点</span>
                pre<span class="token punctuation">.</span>next <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 保留不重复节点</span>
                pre <span class="token operator">=</span> curr<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            
            curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方法特点</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>优点：逻辑更直观，易于理解
缺点：多一个布尔变量存储状态
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Solution</span> solution <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 常规测试</span>
    <span class="token class-name">ListNode</span> test1 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">deleteDuplicates</span><span class="token punctuation">(</span>test1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
    
    <span class="token class-name">ListNode</span> test2 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">deleteDuplicates</span><span class="token punctuation">(</span>test2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2-&gt;5</span>
    
    <span class="token comment">// 边界测试</span>
    <span class="token class-name">ListNode</span> test3 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">deleteDuplicates</span><span class="token punctuation">(</span>test3<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null</span>
    
    <span class="token class-name">ListNode</span> test4 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">deleteDuplicates</span><span class="token punctuation">(</span>test4<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;3</span>
    
    <span class="token comment">// 无重复测试</span>
    <span class="token class-name">ListNode</span> test5 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">deleteDuplicates</span><span class="token punctuation">(</span>test5<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;2-&gt;3</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：打印链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">&quot;-&gt;&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>常见问题解答</p><p><strong>Q1：为什么需要哑节点？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>哑节点统一了头节点和其他节点的删除操作，避免单独处理头节点删除的特殊情况
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q2：如何处理全重复的链表？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>算法会自动跳过所有重复节点，最终pre.next指向null，返回空链表
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q3：如何保证稳定性？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>算法始终保持原始链表中非重复节点的相对顺序，是稳定的
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>算法可视化</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>示例：1-&gt;1-&gt;2-&gt;3-&gt;3-&gt;3-&gt;5

步骤1：发现1重复，pre保持在dummy，跳过所有1
步骤2：pre.next指向2，pre移动到2
步骤3：发现3重复，pre.next指向5
结果：2-&gt;5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩展思考</strong>：</p><ol><li>如何同时删除重复项并记录被删除的值？</li><li>如何实现保留一个重复项（如1-&gt;1-&gt;2变为1-&gt;2）？</li><li>如何处理无序链表的去重问题？</li></ol><h2 id="删除有序链表中的重复元素-保留一个" tabindex="-1"><a class="header-anchor" href="#删除有序链表中的重复元素-保留一个"><span>删除有序链表中的重复元素（保留一个）</span></a></h2><p><strong>题目描述</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>给定一个升序排列的链表，删除所有重复的元素，使得每个元素只出现一次。

示例1：
输入：1-&gt;1-&gt;2
输出：1-&gt;2

示例2：
输入：1-&gt;1-&gt;2-&gt;3-&gt;3
输出：1-&gt;2-&gt;3

要求：
<span class="token list punctuation">1.</span> 链表已按升序排列
<span class="token list punctuation">2.</span> 时间复杂度O(n)
<span class="token list punctuation">3.</span> 空间复杂度O(1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解题思路</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>单指针遍历法：
<span class="token list punctuation">1.</span> 使用当前指针遍历链表
<span class="token list punctuation">2.</span> 比较当前节点与下一节点的值
<span class="token list punctuation">3.</span> 若相等则跳过下一节点（删除重复）
<span class="token list punctuation">4.</span> 若不等则正常移动指针
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关键步骤</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="token list punctuation">1.</span> 处理空链表或单节点链表的边界情况
<span class="token list punctuation">2.</span> 循环条件：当前节点和下一节点均不为空
<span class="token list punctuation">3.</span> 值比较与节点删除操作
<span class="token list punctuation">4.</span> 指针移动控制
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准实现</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">deleteDuplicates</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> current <span class="token operator">=</span> head<span class="token punctuation">;</span>
        
        <span class="token keyword">while</span> <span class="token punctuation">(</span>current <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> current<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>current<span class="token punctuation">.</span>val <span class="token operator">==</span> current<span class="token punctuation">.</span>next<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 删除重复节点</span>
                current<span class="token punctuation">.</span>next <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token comment">// 移动指针</span>
                current <span class="token operator">=</span> current<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">return</span> head<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 只需遍历链表一次
空间复杂度：O(1) - 只使用常数空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>替代解法（递归实现）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">deleteDuplicates</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> head<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        head<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">deleteDuplicates</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> head<span class="token punctuation">.</span>val <span class="token operator">==</span> head<span class="token punctuation">.</span>next<span class="token punctuation">.</span>val <span class="token operator">?</span> head<span class="token punctuation">.</span>next <span class="token operator">:</span> head<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>递归特点</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>优点：代码简洁
缺点：递归栈空间O(n)
适用场景：链表长度较小的情况
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Solution</span> solution <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 常规测试</span>
    <span class="token class-name">ListNode</span> test1 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">deleteDuplicates</span><span class="token punctuation">(</span>test1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;2</span>
    
    <span class="token class-name">ListNode</span> test2 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">deleteDuplicates</span><span class="token punctuation">(</span>test2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;2-&gt;3</span>
    
    <span class="token comment">// 边界测试</span>
    <span class="token class-name">ListNode</span> test3 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">deleteDuplicates</span><span class="token punctuation">(</span>test3<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
    
    <span class="token class-name">ListNode</span> test4 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">deleteDuplicates</span><span class="token punctuation">(</span>test4<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
    
    <span class="token comment">// 无重复测试</span>
    <span class="token class-name">ListNode</span> test5 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">deleteDuplicates</span><span class="token punctuation">(</span>test5<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;2-&gt;3</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：打印链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">&quot;-&gt;&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法比较</p><table><thead><tr><th>方法</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>迭代法</td><td>空间效率高</td><td>代码稍长</td><td>生产环境首选</td></tr><tr><td>递归法</td><td>代码简洁</td><td>栈空间消耗大</td><td>理解算法原理</td></tr></tbody></table><p>常见问题解答</p><p><strong>Q1：为什么不需要哑节点？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>因为头节点不会被删除，只需要处理后续节点的重复情况
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q2：如何处理全重复的链表？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>算法会保留第一个节点，自动跳过后续重复节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q3：为什么时间复杂度是O(n)？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>每个节点最多被访问一次，最坏情况下遍历整个链表
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>算法可视化</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>示例：1-&gt;1-&gt;2-&gt;3-&gt;3

步骤1：发现1重复，跳过第二个1
步骤2：1-&gt;2-&gt;3-&gt;3
步骤3：发现3重复，跳过第二个3
结果：1-&gt;2-&gt;3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩展思考</strong>：</p><ol><li>如何修改算法保留最后出现的重复元素？</li><li>如何统计被删除的重复元素个数？</li><li>如何同时处理升序和降序排列的链表？</li></ol><h2 id="判断链表是否为回文结构" tabindex="-1"><a class="header-anchor" href="#判断链表是否为回文结构"><span>判断链表是否为回文结构</span></a></h2><p><strong>题目描述</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>给定一个单链表，判断其是否为回文结构。回文链表是指正序和逆序读取结果相同的链表。

示例1：
输入：1-&gt;2-&gt;2-&gt;1
输出：true

示例2：
输入：1-&gt;2
输出：false

要求：
<span class="token list punctuation">1.</span> 时间复杂度O(n)
<span class="token list punctuation">2.</span> 空间复杂度O(1)（进阶要求）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解题思路</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>最优解法（快慢指针+部分反转）：
<span class="token list punctuation">1.</span> 使用快慢指针找到链表中点
<span class="token list punctuation">2.</span> 反转链表后半部分
<span class="token list punctuation">3.</span> 比较前后两部分是否相同
<span class="token list punctuation">4.</span> 恢复链表原状（可选）

关键点：
<span class="token list punctuation">-</span> 快指针速度是慢指针两倍
<span class="token list punctuation">-</span> 处理奇数长度和偶数长度的情况
<span class="token list punctuation">-</span> 比较后恢复链表保持原始结构
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准实现</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isPalindrome</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 1. 找到中点</span>
        <span class="token class-name">ListNode</span> slow <span class="token operator">=</span> head<span class="token punctuation">,</span> fast <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>fast <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 2. 反转后半部分</span>
        <span class="token class-name">ListNode</span> secondHalf <span class="token operator">=</span> <span class="token function">reverse</span><span class="token punctuation">(</span>slow<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 3. 比较前后两部分</span>
        <span class="token class-name">ListNode</span> p1 <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> p2 <span class="token operator">=</span> secondHalf<span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> result <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>result <span class="token operator">&amp;&amp;</span> p2 <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>p1<span class="token punctuation">.</span>val <span class="token operator">!=</span> p2<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p1 <span class="token operator">=</span> p1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            p2 <span class="token operator">=</span> p2<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 4. 恢复链表（可选）</span>
        <span class="token function">reverse</span><span class="token punctuation">(</span>secondHalf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token class-name">ListNode</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>curr <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ListNode</span> next <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            curr<span class="token punctuation">.</span>next <span class="token operator">=</span> prev<span class="token punctuation">;</span>
            prev <span class="token operator">=</span> curr<span class="token punctuation">;</span>
            curr <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> prev<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 找中点O(n)，反转O(n/2)，比较O(n/2)
空间复杂度：O(1) - 只使用常数空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>替代解法（使用栈）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isPalindrome</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        
        <span class="token comment">// 将链表元素压入栈</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>curr <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>curr<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
            curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 比较栈中元素与链表</span>
        curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>curr <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>curr<span class="token punctuation">.</span>val <span class="token operator">!=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 两次遍历
空间复杂度：O(n) - 需要额外栈空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Solution</span> solution <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 测试用例</span>
    <span class="token class-name">ListNode</span> test1 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">isPalindrome</span><span class="token punctuation">(</span>test1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
    
    <span class="token class-name">ListNode</span> test2 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">isPalindrome</span><span class="token punctuation">(</span>test2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
    
    <span class="token class-name">ListNode</span> test3 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">isPalindrome</span><span class="token punctuation">(</span>test3<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
    
    <span class="token class-name">ListNode</span> test4 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">isPalindrome</span><span class="token punctuation">(</span>test4<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
    
    <span class="token class-name">ListNode</span> test5 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">isPalindrome</span><span class="token punctuation">(</span>test5<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法比较</p><table><thead><tr><th>方法</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>快慢指针+部分反转</td><td>空间效率高</td><td>修改链表结构</td><td>生产环境首选</td></tr><tr><td>栈实现</td><td>逻辑简单</td><td>需要额外O(n)空间</td><td>理解算法原理</td></tr></tbody></table><p>常见问题解答</p><p><strong>Q1：为什么快指针要移动两步？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>这样当快指针到达末尾时，慢指针刚好到达中点，实现高效定位
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q2：如何处理奇数长度链表？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>当fast不为null时，slow再前进一步，确保后半部分比前半部分短
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q3：为什么需要恢复链表？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>保持链表原始结构是良好编程习惯，但题目若无明确要求可省略
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>算法可视化</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>示例：1-&gt;2-&gt;2-&gt;1

步骤1：快慢指针定位
fast: 1-&gt;2-&gt;null
slow: 1-&gt;2

步骤2：反转后半部分
后半部分：2-&gt;1 反转为 1-&gt;2

步骤3：比较
前半部分：1-&gt;2
后半部分：1-&gt;2
结果：true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩展思考</strong>：</p><ol><li>如何判断双向链表的回文性？</li><li>如何优化大内存链表的处理？</li><li>如何并行化处理超长链表的回文判断？</li></ol><h2 id="判断链表中是否有环" tabindex="-1"><a class="header-anchor" href="#判断链表中是否有环"><span>判断链表中是否有环</span></a></h2><p><strong>题目描述</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>给定一个链表，判断链表中是否有环。如果链表中有某个节点可以通过连续跟踪next指针再次到达，则链表中存在环。

示例1：
输入：3-&gt;2-&gt;0-&gt;-4（-4指向2）
输出：true

示例2：
输入：1-&gt;null
输出：false

要求：
<span class="token list punctuation">1.</span> 时间复杂度O(n)
<span class="token list punctuation">2.</span> 空间复杂度O(1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解题思路</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>快慢指针法（Floyd判圈算法）：
<span class="token list punctuation">1.</span> 初始化两个指针，快指针每次移动两步，慢指针每次移动一步
<span class="token list punctuation">2.</span> 如果快指针遇到null，说明链表无环
<span class="token list punctuation">3.</span> 如果快慢指针相遇，说明链表有环

数学原理：
<span class="token list punctuation">-</span> 若有环，快指针最终会追上慢指针
<span class="token list punctuation">-</span> 若无环，快指针会先到达链表尾部
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准实现</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasCycle</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token class-name">ListNode</span> slow <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> fast <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        
        <span class="token keyword">while</span> <span class="token punctuation">(</span>slow <span class="token operator">!=</span> fast<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>fast <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> fast<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) 
<span class="token list punctuation">-</span> 无环时：快指针先到达尾部，遍历n/2次
<span class="token list punctuation">-</span> 有环时：快慢指针最多移动n次相遇

空间复杂度：O(1) - 只使用两个指针
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>替代解法（哈希表法）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">HashSet</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Set</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasCycle</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ListNode</span><span class="token punctuation">&gt;</span></span> visited <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        
        <span class="token keyword">while</span> <span class="token punctuation">(</span>curr <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>visited<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            visited<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span><span class="token punctuation">;</span>
            curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 最坏遍历整个链表
空间复杂度：O(n) - 需要存储所有访问过的节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Solution</span> solution <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 测试无环链表</span>
    <span class="token class-name">ListNode</span> test1 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">hasCycle</span><span class="token punctuation">(</span>test1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
    
    <span class="token comment">// 测试有环链表</span>
    <span class="token class-name">ListNode</span> test2 <span class="token operator">=</span> <span class="token function">buildCycleList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">hasCycle</span><span class="token punctuation">(</span>test2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
    
    <span class="token comment">// 测试单节点无环</span>
    <span class="token class-name">ListNode</span> test3 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">hasCycle</span><span class="token punctuation">(</span>test3<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
    
    <span class="token comment">// 测试单节点自环</span>
    <span class="token class-name">ListNode</span> test4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    test4<span class="token punctuation">.</span>next <span class="token operator">=</span> test4<span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">hasCycle</span><span class="token punctuation">(</span>test4<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建普通链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建带环链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildCycleList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">,</span> <span class="token keyword">int</span> pos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> cycleNode <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> pos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            cycleNode <span class="token operator">=</span> curr<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    curr<span class="token punctuation">.</span>next <span class="token operator">=</span> cycleNode<span class="token punctuation">;</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法比较</p><table><thead><tr><th>方法</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>快慢指针法</td><td>空间效率高</td><td>难以确定环的入口</td><td>生产环境首选</td></tr><tr><td>哈希表法</td><td>逻辑简单</td><td>需要额外O(n)空间</td><td>理解算法原理</td></tr></tbody></table><p>常见问题解答</p><p><strong>Q1：为什么快指针要走两步？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>两步速度差能确保在有环情况下快指针一定能追上慢指针，且时间复杂度最优
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q2：如何找到环的入口？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>相遇后将快指针重置到头节点，然后快慢指针同速移动，再次相遇点即为环入口
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q3：快指针走三步可以吗？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>可以但效率不一定更高，两步已经是最优速度差
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>算法可视化</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>有环链表：3-&gt;2-&gt;0-&gt;-4-&gt;2...

步骤1：
slow:3, fast:2

步骤2：
slow:2, fast:0

步骤3：
slow:0, fast:2

步骤4：
slow:-4, fast:-4
相遇返回true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩展思考</strong>：</p><ol><li>如何计算环的长度？</li><li>如何判断多个环的情况？</li><li>如何优化大内存链表的环检测？</li></ol><h2 id="两个链表的第一个公共节点" tabindex="-1"><a class="header-anchor" href="#两个链表的第一个公共节点"><span>两个链表的第一个公共节点</span></a></h2><p><strong>题目描述</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>给定两个无环单链表，找出它们的第一个公共节点。如果没有公共节点则返回null。

示例：
链表A：1-&gt;2-&gt;3-&gt;6-&gt;7
链表B：4-&gt;5-&gt;6-&gt;7
公共节点：6

要求：
<span class="token list punctuation">1.</span> 时间复杂度O(m+n)
<span class="token list punctuation">2.</span> 空间复杂度O(1)（进阶要求）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解题思路</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>最优解法（双指针交替遍历）：
<span class="token list punctuation">1.</span> 使用两个指针同时遍历两个链表
<span class="token list punctuation">2.</span> 当一个指针到达链表末尾时，转到另一链表头部继续遍历
<span class="token list punctuation">3.</span> 最终会在第一个公共节点相遇，或同时到达末尾(null)

数学原理：
<span class="token list punctuation">-</span> 两个指针走过的路径长度相同：L1 + L2 + C（C为公共部分）
<span class="token list punctuation">-</span> 会在第一个公共节点相遇
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准实现</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">getIntersectionNode</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> headA<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> headB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> pA <span class="token operator">=</span> headA<span class="token punctuation">,</span> pB <span class="token operator">=</span> headB<span class="token punctuation">;</span>
        
        <span class="token keyword">while</span> <span class="token punctuation">(</span>pA <span class="token operator">!=</span> pB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pA <span class="token operator">=</span> <span class="token punctuation">(</span>pA <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> headB <span class="token operator">:</span> pA<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            pB <span class="token operator">=</span> <span class="token punctuation">(</span>pB <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> headA <span class="token operator">:</span> pB<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">return</span> pA<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(m+n) - 最坏情况下遍历两个链表各一次
空间复杂度：O(1) - 只使用两个指针
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>替代解法（长度差法）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">getIntersectionNode</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> headA<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> headB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 计算两个链表长度</span>
        <span class="token keyword">int</span> lenA <span class="token operator">=</span> <span class="token function">getLength</span><span class="token punctuation">(</span>headA<span class="token punctuation">)</span><span class="token punctuation">,</span> lenB <span class="token operator">=</span> <span class="token function">getLength</span><span class="token punctuation">(</span>headB<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 长链表先走长度差步</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>lenA <span class="token operator">&gt;</span> lenB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            headA <span class="token operator">=</span> headA<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            lenA<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>lenB <span class="token operator">&gt;</span> lenA<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            headB <span class="token operator">=</span> headB<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            lenB<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 同步遍历直到找到公共节点</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>headA <span class="token operator">!=</span> headB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            headA <span class="token operator">=</span> headA<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            headB <span class="token operator">=</span> headB<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">return</span> headA<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">getLength</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> length <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            length<span class="token operator">++</span><span class="token punctuation">;</span>
            head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> length<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(m+n) - 需要遍历链表两次
空间复杂度：O(1) - 只使用常数空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Solution</span> solution <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 构建测试链表</span>
    <span class="token class-name">ListNode</span> common <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> headA <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> headB <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">connectList</span><span class="token punctuation">(</span>headA<span class="token punctuation">,</span> common<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">connectList</span><span class="token punctuation">(</span>headB<span class="token punctuation">,</span> common<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 测试有公共节点</span>
    <span class="token class-name">ListNode</span> result <span class="token operator">=</span> solution<span class="token punctuation">.</span><span class="token function">getIntersectionNode</span><span class="token punctuation">(</span>headA<span class="token punctuation">,</span> headB<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> result<span class="token punctuation">.</span>val <span class="token operator">:</span> <span class="token string">&quot;null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 6</span>
    
    <span class="token comment">// 测试无公共节点</span>
    <span class="token class-name">ListNode</span> headC <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> headD <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    result <span class="token operator">=</span> solution<span class="token punctuation">.</span><span class="token function">getIntersectionNode</span><span class="token punctuation">(</span>headC<span class="token punctuation">,</span> headD<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> result<span class="token punctuation">.</span>val <span class="token operator">:</span> <span class="token string">&quot;null&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：连接公共部分</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">connectList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> common<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    head<span class="token punctuation">.</span>next <span class="token operator">=</span> common<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法比较</p><table><thead><tr><th>方法</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>双指针交替遍历</td><td>代码简洁</td><td>逻辑稍抽象</td><td>生产环境首选</td></tr><tr><td>长度差法</td><td>逻辑直观</td><td>需要计算长度</td><td>理解算法原理</td></tr></tbody></table><p>常见问题解答</p><p><strong>Q1：为什么交替遍历能保证相遇？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>两个指针走过的路径长度相同：L1+L2+C，最终会在第一个公共节点相遇
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q2：如何处理无环链表？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>算法同样适用，最终两个指针会同时到达null，返回null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q3：哪种方法效率更高？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>交替遍历法虽然时间复杂度相同，但实际运行效率更高，减少了一次完整遍历
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>算法可视化</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>链表A：1-&gt;2-&gt;3-&gt;6-&gt;7
链表B：4-&gt;5-&gt;6-&gt;7

指针A路径：1-&gt;2-&gt;3-&gt;6-&gt;7-&gt;4-&gt;5-&gt;6
指针B路径：4-&gt;5-&gt;6-&gt;7-&gt;1-&gt;2-&gt;3-&gt;6
在节点6相遇
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩展思考</strong>：</p><ol><li>如何判断有环链表的第一个公共节点？</li><li>如何计算两个链表的公共部分长度？</li><li>如何优化处理超长链表的公共节点查找？</li></ol><h2 id="链表区间反转" tabindex="-1"><a class="header-anchor" href="#链表区间反转"><span>链表区间反转</span></a></h2><p><strong>题目描述</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>给定一个单链表和两个整数m、n，反转链表中从位置m到n的节点。要求时间复杂度O(n)，空间复杂度O(1)。

示例：
输入：1-&gt;2-&gt;3-&gt;4-&gt;5, m=2, n=4
输出：1-&gt;4-&gt;3-&gt;2-&gt;5

约束条件：
<span class="token list punctuation">1.</span> 1 ≤ m ≤ n ≤ 链表长度
<span class="token list punctuation">2.</span> 只能修改节点指针，不能修改节点值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解题思路</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>四步反转法：
<span class="token list punctuation">1.</span> 定位到m-1位置的pre节点
<span class="token list punctuation">2.</span> 记录反转开始节点start
<span class="token list punctuation">3.</span> 执行n-m次相邻节点反转
<span class="token list punctuation">4.</span> 重新连接反转后的子链表

关键点：
<span class="token list punctuation">-</span> 使用哑节点简化头节点处理
<span class="token list punctuation">-</span> 每次反转将下一个节点插入到pre之后
<span class="token list punctuation">-</span> 保持链表不断开
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准实现</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseBetween</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">,</span> <span class="token keyword">int</span> m<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dummy<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> pre <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
        
        <span class="token comment">// 定位到m-1位置</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> m<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pre <span class="token operator">=</span> pre<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token class-name">ListNode</span> start <span class="token operator">=</span> pre<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> then <span class="token operator">=</span> start<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        
        <span class="token comment">// 执行n-m次相邻节点反转</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n <span class="token operator">-</span> m<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            start<span class="token punctuation">.</span>next <span class="token operator">=</span> then<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            then<span class="token punctuation">.</span>next <span class="token operator">=</span> pre<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            pre<span class="token punctuation">.</span>next <span class="token operator">=</span> then<span class="token punctuation">;</span>
            then <span class="token operator">=</span> start<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 最多遍历链表两次
空间复杂度：O(1) - 只使用常数空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>替代解法（头插法）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseBetween</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">,</span> <span class="token keyword">int</span> m<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dummy<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> pre <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
        
        <span class="token comment">// 定位到m-1位置</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> m<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pre <span class="token operator">=</span> pre<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 头插法反转</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> pre<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> m<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ListNode</span> temp <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            curr<span class="token punctuation">.</span>next <span class="token operator">=</span> temp<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            temp<span class="token punctuation">.</span>next <span class="token operator">=</span> pre<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            pre<span class="token punctuation">.</span>next <span class="token operator">=</span> temp<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>方法特点</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>优点：代码更简洁
缺点：指针操作顺序需要特别注意
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Solution</span> solution <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 常规测试</span>
    <span class="token class-name">ListNode</span> test1 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">reverseBetween</span><span class="token punctuation">(</span>test1<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;4-&gt;3-&gt;2-&gt;5</span>
    
    <span class="token comment">// 反转整个链表</span>
    <span class="token class-name">ListNode</span> test2 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">reverseBetween</span><span class="token punctuation">(</span>test2<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3-&gt;2-&gt;1</span>
    
    <span class="token comment">// 反转单个节点</span>
    <span class="token class-name">ListNode</span> test3 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">reverseBetween</span><span class="token punctuation">(</span>test3<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;2-&gt;3</span>
    
    <span class="token comment">// 边界测试</span>
    <span class="token class-name">ListNode</span> test4 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">reverseBetween</span><span class="token punctuation">(</span>test4<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：打印链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">&quot;-&gt;&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法比较</p><table><thead><tr><th>方法</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>四步反转法</td><td>逻辑清晰</td><td>代码稍长</td><td>理解算法原理</td></tr><tr><td>头插法</td><td>代码简洁</td><td>指针操作顺序敏感</td><td>生产环境首选</td></tr></tbody></table><p>常见问题解答</p><p><strong>Q1：为什么需要哑节点？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>哑节点统一了从头节点开始反转和其他位置反转的操作，避免特殊处理
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q2：如何处理m=1的情况？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>哑节点的存在使得m=1时pre指向哑节点，无需特殊处理
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q3：反转过程中如何保证链表不断开？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>每次操作只修改必要的指针，并保持至少一个指针连接
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>算法可视化</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>初始链表：dummy-&gt;1-&gt;2-&gt;3-&gt;4-&gt;5, m=2, n=4

步骤1：定位pre到1，start=2
步骤2：第一次反转：
  - 将3插入到pre(1)之后：1-&gt;3-&gt;2-&gt;4-&gt;5
步骤3：第二次反转：
  - 将4插入到pre(1)之后：1-&gt;4-&gt;3-&gt;2-&gt;5
结果：dummy-&gt;1-&gt;4-&gt;3-&gt;2-&gt;5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩展思考</strong>：</p><ol><li>如何实现每隔k个节点反转一次？</li><li>如何同时记录反转的起始和结束位置？</li><li>如何优化处理超大区间的反转？</li></ol><h2 id="合并两个有序链表" tabindex="-1"><a class="header-anchor" href="#合并两个有序链表"><span>合并两个有序链表</span></a></h2><p><strong>题目描述</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

示例：
输入：1-&gt;3-&gt;5 和 2-&gt;4-&gt;6
输出：1-&gt;2-&gt;3-&gt;4-&gt;5-&gt;6

要求：
<span class="token list punctuation">1.</span> 时间复杂度O(n+m)
<span class="token list punctuation">2.</span> 空间复杂度O(1)（迭代法）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解题思路</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>双指针迭代法：
<span class="token list punctuation">1.</span> 创建哑节点作为合并后链表的起始点
<span class="token list punctuation">2.</span> 使用指针遍历两个链表，比较节点值
<span class="token list punctuation">3.</span> 将较小值的节点连接到结果链表
<span class="token list punctuation">4.</span> 处理剩余未遍历完的链表

递归法：
<span class="token list punctuation">1.</span> 比较两个链表头节点值
<span class="token list punctuation">2.</span> 将较小节点作为头节点
<span class="token list punctuation">3.</span> 递归合并剩余部分
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准实现（迭代法）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> l1<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> l2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
        
        <span class="token keyword">while</span> <span class="token punctuation">(</span>l1 <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> l2 <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>l1<span class="token punctuation">.</span>val <span class="token operator">&lt;=</span> l2<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                curr<span class="token punctuation">.</span>next <span class="token operator">=</span> l1<span class="token punctuation">;</span>
                l1 <span class="token operator">=</span> l1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                curr<span class="token punctuation">.</span>next <span class="token operator">=</span> l2<span class="token punctuation">;</span>
                l2 <span class="token operator">=</span> l2<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 连接剩余部分</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token punctuation">(</span>l1 <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> l1 <span class="token operator">:</span> l2<span class="token punctuation">;</span>
        
        <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n+m) - 遍历两个链表各一次
空间复杂度：O(1) - 只使用常数空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>递归实现</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> l1<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> l2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>l1 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> l2<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>l2 <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> l1<span class="token punctuation">;</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>l1<span class="token punctuation">.</span>val <span class="token operator">&lt;=</span> l2<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            l1<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>l1<span class="token punctuation">.</span>next<span class="token punctuation">,</span> l2<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> l1<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            l2<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>l1<span class="token punctuation">,</span> l2<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> l2<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n+m) - 每个节点处理一次
空间复杂度：O(n+m) - 递归调用栈深度
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Solution</span> solution <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 常规测试</span>
    <span class="token class-name">ListNode</span> l1 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> l2 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>l1<span class="token punctuation">,</span> l2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;2-&gt;3-&gt;4-&gt;5-&gt;6</span>
    
    <span class="token comment">// 空链表测试</span>
    <span class="token class-name">ListNode</span> l3 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> l4 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>l3<span class="token punctuation">,</span> l4<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
    
    <span class="token comment">// 相同元素测试</span>
    <span class="token class-name">ListNode</span> l5 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> l6 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>l5<span class="token punctuation">,</span> l6<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;1-&gt;1-&gt;1-&gt;1-&gt;1</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：打印链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">&quot;-&gt;&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法比较</p><table><thead><tr><th>方法</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>迭代法</td><td>空间效率高</td><td>代码稍长</td><td>生产环境首选</td></tr><tr><td>递归法</td><td>代码简洁</td><td>栈空间消耗大</td><td>理解算法原理</td></tr></tbody></table><p>常见问题解答</p><p><strong>Q1：为什么需要哑节点？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>哑节点简化了链表头节点的处理，避免空指针异常
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q2：如何处理不等长链表？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>当其中一个链表遍历完后，直接将另一个链表的剩余部分连接到结果链表
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q3：递归法的空间消耗在哪里？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>每次递归调用都需要保存当前函数栈帧，递归深度为n+m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>算法可视化</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>链表1：1 -&gt; 3 -&gt; 5
链表2：2 -&gt; 4 -&gt; 6

迭代过程：
步骤1：选择1，结果：1
步骤2：选择2，结果：1-&gt;2
步骤3：选择3，结果：1-&gt;2-&gt;3
步骤4：选择4，结果：1-&gt;2-&gt;3-&gt;4
步骤5：选择5，结果：1-&gt;2-&gt;3-&gt;4-&gt;5
步骤6：连接剩余6，结果：1-&gt;2-&gt;3-&gt;4-&gt;5-&gt;6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩展思考</strong>：</p><ol><li>如何合并K个有序链表？</li><li>如何实现降序合并？</li><li>如何优化处理超大链表的合并？</li></ol><h2 id="合并k个有序链表" tabindex="-1"><a class="header-anchor" href="#合并k个有序链表"><span>合并K个有序链表</span></a></h2><p><strong>题目描述</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>将K个升序链表合并为一个新的升序链表并返回。

示例：
输入：
[
  1-&gt;4-&gt;5,
  1-&gt;3-&gt;4,
  2-&gt;6
]
输出：1-&gt;1-&gt;2-&gt;3-&gt;4-&gt;4-&gt;5-&gt;6

要求：
<span class="token list punctuation">1.</span> 时间复杂度O(NlogK)，其中N是所有链表节点总数
<span class="token list punctuation">2.</span> 空间复杂度O(1)（最小堆法）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解题思路</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>最小堆优先队列法：
<span class="token list punctuation">1.</span> 创建最小堆存储所有链表的头节点
<span class="token list punctuation">2.</span> 每次取出堆顶最小节点加入结果链表
<span class="token list punctuation">3.</span> 将该节点的下一节点放入堆中
<span class="token list punctuation">4.</span> 重复直到堆为空

分治法：
<span class="token list punctuation">1.</span> 两两合并链表
<span class="token list punctuation">2.</span> 递归合并直到只剩一个链表
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准实现（最小堆法）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">PriorityQueue</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Comparator</span></span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">mergeKLists</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span><span class="token punctuation">[</span><span class="token punctuation">]</span> lists<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>lists <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> lists<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        
        <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ListNode</span><span class="token punctuation">&gt;</span></span> minHeap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PriorityQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>
            lists<span class="token punctuation">.</span>length<span class="token punctuation">,</span> <span class="token class-name">Comparator</span><span class="token punctuation">.</span><span class="token function">comparingInt</span><span class="token punctuation">(</span>a <span class="token operator">-&gt;</span> a<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 初始化堆</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ListNode</span> node <span class="token operator">:</span> lists<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                minHeap<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        
        <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
        
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>minHeap<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ListNode</span> minNode <span class="token operator">=</span> minHeap<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            curr<span class="token punctuation">.</span>next <span class="token operator">=</span> minNode<span class="token punctuation">;</span>
            curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            
            <span class="token keyword">if</span> <span class="token punctuation">(</span>minNode<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                minHeap<span class="token punctuation">.</span><span class="token function">offer</span><span class="token punctuation">(</span>minNode<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(NlogK) - 每个节点处理一次，堆操作logK
空间复杂度：O(K) - 堆中最多存储K个节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分治合并法" tabindex="-1"><a class="header-anchor" href="#分治合并法"><span>分治合并法</span></a></h2><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">mergeKLists</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span><span class="token punctuation">[</span><span class="token punctuation">]</span> lists<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>lists <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> lists<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">merge</span><span class="token punctuation">(</span>lists<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> lists<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token class-name">ListNode</span> <span class="token function">merge</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span><span class="token punctuation">[</span><span class="token punctuation">]</span> lists<span class="token punctuation">,</span> <span class="token keyword">int</span> left<span class="token punctuation">,</span> <span class="token keyword">int</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">==</span> right<span class="token punctuation">)</span> <span class="token keyword">return</span> lists<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">;</span>
        
        <span class="token keyword">int</span> mid <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token punctuation">(</span>right <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> l1 <span class="token operator">=</span> <span class="token function">merge</span><span class="token punctuation">(</span>lists<span class="token punctuation">,</span> left<span class="token punctuation">,</span> mid<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> l2 <span class="token operator">=</span> <span class="token function">merge</span><span class="token punctuation">(</span>lists<span class="token punctuation">,</span> mid <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> right<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span>l1<span class="token punctuation">,</span> l2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token class-name">ListNode</span> <span class="token function">mergeTwoLists</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> l1<span class="token punctuation">,</span> <span class="token class-name">ListNode</span> l2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
        
        <span class="token keyword">while</span> <span class="token punctuation">(</span>l1 <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> l2 <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>l1<span class="token punctuation">.</span>val <span class="token operator">&lt;=</span> l2<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                curr<span class="token punctuation">.</span>next <span class="token operator">=</span> l1<span class="token punctuation">;</span>
                l1 <span class="token operator">=</span> l1<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                curr<span class="token punctuation">.</span>next <span class="token operator">=</span> l2<span class="token punctuation">;</span>
                l2 <span class="token operator">=</span> l2<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token punctuation">(</span>l1 <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> l1 <span class="token operator">:</span> l2<span class="token punctuation">;</span>
        <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(NlogK) - 分治合并次数logK，每次合并O(N)
空间复杂度：O(logK) - 递归栈深度
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Solution</span> solution <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 构建测试链表</span>
    <span class="token class-name">ListNode</span> l1 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> l2 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> l3 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 测试合并</span>
    <span class="token class-name">ListNode</span><span class="token punctuation">[</span><span class="token punctuation">]</span> lists <span class="token operator">=</span> <span class="token punctuation">{</span>l1<span class="token punctuation">,</span> l2<span class="token punctuation">,</span> l3<span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> result <span class="token operator">=</span> solution<span class="token punctuation">.</span><span class="token function">mergeKLists</span><span class="token punctuation">(</span>lists<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;1-&gt;2-&gt;3-&gt;4-&gt;4-&gt;5-&gt;6</span>
    
    <span class="token comment">// 测试空链表</span>
    <span class="token class-name">ListNode</span><span class="token punctuation">[</span><span class="token punctuation">]</span> emptyLists <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">mergeKLists</span><span class="token punctuation">(</span>emptyLists<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：打印链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">&quot;-&gt;&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法比较</p><table><thead><tr><th>方法</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>最小堆法</td><td>实现简单</td><td>需要额外O(K)空间</td><td>K较小的情况</td></tr><tr><td>分治法</td><td>空间效率高</td><td>实现较复杂</td><td>生产环境首选</td></tr></tbody></table><p>常见问题解答</p><p><strong>Q1：为什么最小堆法的时间复杂度是O(NlogK)？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>每个节点处理一次，每次堆操作O(logK)，共N个节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q2：分治法如何保证效率？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>通过两两合并减少合并次数，合并次数为logK次
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q3：如何处理空链表输入？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>在方法开始处检查输入数组是否为空或长度为0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>算法可视化</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>输入链表：
[1-&gt;4-&gt;5, 1-&gt;3-&gt;4, 2-&gt;6]

最小堆法：
1. 初始堆：[1,1,2]
2. 取出1，加入1-&gt;1-&gt;2
3. 堆变为：[3,2,4]
4. 取出2，加入-&gt;3
5. 堆变为：[3,4,6]
...
最终结果：1-&gt;1-&gt;2-&gt;3-&gt;4-&gt;4-&gt;5-&gt;6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩展思考</strong>：</p><ol><li>如何实现降序合并？</li><li>如何优化处理超大K值的情况？</li><li>如何并行化处理合并过程？</li></ol><h2 id="奇偶逆序重排链表" tabindex="-1"><a class="header-anchor" href="#奇偶逆序重排链表"><span>奇偶逆序重排链表</span></a></h2><p><strong>题目描述</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>给定一个单链表，将其重新排列为：第一个节点后接最后一个节点，第二个节点后接倒数第二个节点，依此类推。

示例1：
输入：1-&gt;2-&gt;3-&gt;4-&gt;5-&gt;6
输出：1-&gt;6-&gt;2-&gt;5-&gt;3-&gt;4

示例2：
输入：1-&gt;2-&gt;3-&gt;4-&gt;3-&gt;2-&gt;1
输出：1-&gt;1-&gt;2-&gt;2-&gt;3-&gt;3-&gt;4

要求：
<span class="token list punctuation">1.</span> 不能修改节点值，只能改变节点指向
<span class="token list punctuation">2.</span> 时间复杂度O(n)
<span class="token list punctuation">3.</span> 空间复杂度O(1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解题思路</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>三步法：
<span class="token list punctuation">1.</span> 找到链表中点（快慢指针）
<span class="token list punctuation">2.</span> 反转后半部分链表
<span class="token list punctuation">3.</span> 合并前后两部分链表

关键点：
<span class="token list punctuation">-</span> 快慢指针找中点时，注意奇偶长度处理
<span class="token list punctuation">-</span> 反转链表时保持空间复杂度O(1)
<span class="token list punctuation">-</span> 合并时注意指针移动顺序
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准实现</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reorderList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 1. 找到链表中点</span>
        <span class="token class-name">ListNode</span> slow <span class="token operator">=</span> head<span class="token punctuation">,</span> fast <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>fast <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 2. 反转后半部分</span>
        <span class="token class-name">ListNode</span> prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> curr <span class="token operator">=</span> slow<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>curr <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ListNode</span> next <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            curr<span class="token punctuation">.</span>next <span class="token operator">=</span> prev<span class="token punctuation">;</span>
            prev <span class="token operator">=</span> curr<span class="token punctuation">;</span>
            curr <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 3. 合并两个链表</span>
        <span class="token class-name">ListNode</span> first <span class="token operator">=</span> head<span class="token punctuation">,</span> second <span class="token operator">=</span> prev<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>second<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ListNode</span> temp1 <span class="token operator">=</span> first<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            <span class="token class-name">ListNode</span> temp2 <span class="token operator">=</span> second<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            first<span class="token punctuation">.</span>next <span class="token operator">=</span> second<span class="token punctuation">;</span>
            second<span class="token punctuation">.</span>next <span class="token operator">=</span> temp1<span class="token punctuation">;</span>
            first <span class="token operator">=</span> temp1<span class="token punctuation">;</span>
            second <span class="token operator">=</span> temp2<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 找中点O(n)，反转O(n/2)，合并O(n/2)
空间复杂度：O(1) - 只使用常数空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>替代解法（栈实现）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">reorderList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
        
        <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ListNode</span><span class="token punctuation">&gt;</span></span> stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stack</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>curr <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>curr<span class="token punctuation">)</span><span class="token punctuation">;</span>
            curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">int</span> size <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> size <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ListNode</span> top <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">ListNode</span> next <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
            curr<span class="token punctuation">.</span>next <span class="token operator">=</span> top<span class="token punctuation">;</span>
            top<span class="token punctuation">.</span>next <span class="token operator">=</span> next<span class="token punctuation">;</span>
            curr <span class="token operator">=</span> next<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 两次遍历
空间复杂度：O(n) - 需要栈存储所有节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Solution</span> solution <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 测试偶数长度链表</span>
    <span class="token class-name">ListNode</span> test1 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    solution<span class="token punctuation">.</span><span class="token function">reorderList</span><span class="token punctuation">(</span>test1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>test1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;6-&gt;2-&gt;5-&gt;3-&gt;4</span>
    
    <span class="token comment">// 测试奇数长度链表</span>
    <span class="token class-name">ListNode</span> test2 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    solution<span class="token punctuation">.</span><span class="token function">reorderList</span><span class="token punctuation">(</span>test2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>test2<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;5-&gt;2-&gt;4-&gt;3</span>
    
    <span class="token comment">// 测试回文链表</span>
    <span class="token class-name">ListNode</span> test3 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    solution<span class="token punctuation">.</span><span class="token function">reorderList</span><span class="token punctuation">(</span>test3<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>test3<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1-&gt;1-&gt;2-&gt;2-&gt;3</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：打印链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">&quot;-&gt;&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法比较</p><table><thead><tr><th>方法</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>三步法</td><td>空间效率高</td><td>指针操作稍复杂</td><td>生产环境首选</td></tr><tr><td>栈实现</td><td>逻辑简单</td><td>需要额外O(n)空间</td><td>理解算法原理</td></tr></tbody></table><p>常见问题解答</p><p><strong>Q1：为什么快指针要走两步？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>两步速度差能确保在遍历结束时慢指针正好位于中点或前半部分的末尾
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q2：如何处理奇数长度链表？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>当链表长度为奇数时，中点节点不需要反转，直接作为合并后的末尾节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q3：合并时为什么条件为second.next != null？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>确保在合并完成后不会形成环，正确处理奇数长度情况
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>算法可视化</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>示例：1-&gt;2-&gt;3-&gt;4-&gt;5-&gt;6

步骤1：找到中点
fast:1-&gt;3-&gt;5-&gt;null
slow:1-&gt;2-&gt;3

步骤2：反转后半部分
后半部分：4-&gt;5-&gt;6 反转为 6-&gt;5-&gt;4

步骤3：合并
1-&gt;6-&gt;2-&gt;5-&gt;3-&gt;4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩展思考</strong>：</p><ol><li>如何实现每隔k个节点逆序重排？</li><li>如何同时记录重排的次数？</li><li>如何优化处理超大链表的逆序重排？</li></ol><h2 id="反转链表" tabindex="-1"><a class="header-anchor" href="#反转链表"><span>反转链表</span></a></h2><p><strong>题目描述</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>给定一个单链表的头节点，反转该链表并返回反转后的头节点。

示例：
输入：1-&gt;2-&gt;3
输出：3-&gt;2-&gt;1

要求：
<span class="token list punctuation">1.</span> 不能修改节点值，只能改变节点指向
<span class="token list punctuation">2.</span> 时间复杂度O(n)
<span class="token list punctuation">3.</span> 空间复杂度O(1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解题思路</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>迭代法：
<span class="token list punctuation">1.</span> 维护三个指针：prev、curr、next
<span class="token list punctuation">2.</span> 每次迭代将curr.next指向prev
<span class="token list punctuation">3.</span> 移动prev和curr指针
<span class="token list punctuation">4.</span> 直到curr为null时，prev即为新头节点

递归法：
<span class="token list punctuation">1.</span> 递归到链表末尾
<span class="token list punctuation">2.</span> 回溯时反转指针指向
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准实现（迭代法）</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ListNode</span> prev <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> head<span class="token punctuation">;</span>
        
        <span class="token keyword">while</span> <span class="token punctuation">(</span>curr <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ListNode</span> next <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span> <span class="token comment">// 保存下一个节点</span>
            curr<span class="token punctuation">.</span>next <span class="token operator">=</span> prev<span class="token punctuation">;</span>         <span class="token comment">// 反转指针</span>
            prev <span class="token operator">=</span> curr<span class="token punctuation">;</span>              <span class="token comment">// 移动prev指针</span>
            curr <span class="token operator">=</span> next<span class="token punctuation">;</span>              <span class="token comment">// 移动curr指针</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">return</span> prev<span class="token punctuation">;</span> <span class="token comment">// prev即为新头节点</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 遍历链表一次
空间复杂度：O(1) - 只使用常数空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>递归实现</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">ListNode</span> <span class="token function">reverseList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 递归终止条件</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>head <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> head<span class="token punctuation">.</span>next <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> head<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token class-name">ListNode</span> newHead <span class="token operator">=</span> <span class="token function">reverseList</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
        head<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next <span class="token operator">=</span> head<span class="token punctuation">;</span> <span class="token comment">// 反转指针</span>
        head<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>      <span class="token comment">// 断开原指针</span>
        
        <span class="token keyword">return</span> newHead<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>复杂度分析</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>时间复杂度：O(n) - 每个节点处理一次
空间复杂度：O(n) - 递归调用栈深度
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试用例</p><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Solution</span> solution <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Solution</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 常规测试</span>
    <span class="token class-name">ListNode</span> test1 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">reverseList</span><span class="token punctuation">(</span>test1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3-&gt;2-&gt;1</span>
    
    <span class="token comment">// 边界测试</span>
    <span class="token class-name">ListNode</span> test2 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">reverseList</span><span class="token punctuation">(</span>test2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
    
    <span class="token class-name">ListNode</span> test3 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printList</span><span class="token punctuation">(</span>solution<span class="token punctuation">.</span><span class="token function">reverseList</span><span class="token punctuation">(</span>test3<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null</span>
    
    <span class="token comment">// 性能测试</span>
    <span class="token class-name">ListNode</span> test4 <span class="token operator">=</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">10000</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> start <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    solution<span class="token punctuation">.</span><span class="token function">reverseList</span><span class="token punctuation">(</span>test4<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Time: &quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;ms&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：构建链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ListNode</span> <span class="token function">buildList</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ListNode</span> dummy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ListNode</span> curr <span class="token operator">=</span> dummy<span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> num <span class="token operator">:</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        curr<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        curr <span class="token operator">=</span> curr<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dummy<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 辅助方法：打印链表</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printList</span><span class="token punctuation">(</span><span class="token class-name">ListNode</span> head<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>head <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span>head<span class="token punctuation">.</span>val <span class="token operator">+</span> <span class="token punctuation">(</span>head<span class="token punctuation">.</span>next <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token string">&quot;-&gt;&quot;</span> <span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        head <span class="token operator">=</span> head<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法比较</p><table><thead><tr><th>方法</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>迭代法</td><td>空间效率高</td><td>指针操作稍复杂</td><td>生产环境首选</td></tr><tr><td>递归法</td><td>代码简洁</td><td>栈空间消耗大</td><td>理解算法原理</td></tr></tbody></table><p>常见问题解答</p><p><strong>Q1：为什么迭代法需要三个指针？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>prev记录前驱节点，curr处理当前节点，next保存后续节点，防止链表断开
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q2：递归法的空间消耗在哪里？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>每次递归调用都需要保存当前函数栈帧，递归深度为n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Q3：如何处理空链表？</strong></p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code>在方法开始处检查head是否为null即可
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>算法可视化</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>原始链表：1-&gt;2-&gt;3-&gt;null

迭代过程：
步骤1：prev=null, curr=1, next=2 → 1-&gt;null
步骤2：prev=1, curr=2, next=3 → 2-&gt;1
步骤3：prev=2, curr=3, next=null → 3-&gt;2
结果：3-&gt;2-&gt;1-&gt;null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>扩展思考</strong>：</p><ol><li>如何实现部分区间反转？</li><li>如何实现每k个节点一组反转？</li><li>如何优化处理超大链表的反转？</li></ol>`,398)])])}const u=s(e,[["render",o],["__file","algo-listnode.html.vue"]]),d=JSON.parse('{"path":"/algo/algo-listnode.html","title":"","lang":"zh-CN","frontmatter":{"description":"两两交换链表节点 题目描述 解题思路 关键步骤 标准实现（迭代法） 复杂度分析 递归实现 复杂度分析 测试用例 方法比较 常见问题解答 Q1：为什么需要哑节点？ Q2：如何处理奇数长度链表？ Q3：递归法的空间消耗在哪里？ 可视化示例 扩展思考： 如何实现三三交换链表节点？ 如何实现K个一组翻转链表？ 如何在交换节点时同时记录交换次数？ 删除链表的倒数...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/algo/algo-listnode.html"}],["meta",{"property":"og:site_name","content":"Java八股文网"}],["meta",{"property":"og:description","content":"两两交换链表节点 题目描述 解题思路 关键步骤 标准实现（迭代法） 复杂度分析 递归实现 复杂度分析 测试用例 方法比较 常见问题解答 Q1：为什么需要哑节点？ Q2：如何处理奇数长度链表？ Q3：递归法的空间消耗在哪里？ 可视化示例 扩展思考： 如何实现三三交换链表节点？ 如何实现K个一组翻转链表？ 如何在交换节点时同时记录交换次数？ 删除链表的倒数..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-05-03T14:33:00.000Z"}],["meta",{"property":"article:author","content":"Mr.Hope"}],["meta",{"property":"article:modified_time","content":"2025-05-03T14:33:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-05-03T14:33:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Hope\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"两两交换链表节点","slug":"两两交换链表节点","link":"#两两交换链表节点","children":[]},{"level":2,"title":"删除链表的倒数第N个节点","slug":"删除链表的倒数第n个节点","link":"#删除链表的倒数第n个节点","children":[]},{"level":2,"title":"K个一组翻转链表","slug":"k个一组翻转链表","link":"#k个一组翻转链表","children":[]},{"level":2,"title":"返回链表最后K个节点","slug":"返回链表最后k个节点","link":"#返回链表最后k个节点","children":[]},{"level":2,"title":"删除有序链表中的重复元素 II","slug":"删除有序链表中的重复元素-ii","link":"#删除有序链表中的重复元素-ii","children":[]},{"level":2,"title":"删除有序链表中的重复元素（保留一个）","slug":"删除有序链表中的重复元素-保留一个","link":"#删除有序链表中的重复元素-保留一个","children":[]},{"level":2,"title":"判断链表是否为回文结构","slug":"判断链表是否为回文结构","link":"#判断链表是否为回文结构","children":[]},{"level":2,"title":"判断链表中是否有环","slug":"判断链表中是否有环","link":"#判断链表中是否有环","children":[]},{"level":2,"title":"两个链表的第一个公共节点","slug":"两个链表的第一个公共节点","link":"#两个链表的第一个公共节点","children":[]},{"level":2,"title":"链表区间反转","slug":"链表区间反转","link":"#链表区间反转","children":[]},{"level":2,"title":"合并两个有序链表","slug":"合并两个有序链表","link":"#合并两个有序链表","children":[]},{"level":2,"title":"合并K个有序链表","slug":"合并k个有序链表","link":"#合并k个有序链表","children":[]},{"level":2,"title":"分治合并法","slug":"分治合并法","link":"#分治合并法","children":[]},{"level":2,"title":"奇偶逆序重排链表","slug":"奇偶逆序重排链表","link":"#奇偶逆序重排链表","children":[]},{"level":2,"title":"反转链表","slug":"反转链表","link":"#反转链表","children":[]}],"git":{"createdTime":1745978351000,"updatedTime":1746282780000,"contributors":[{"name":"Yideng","email":"oointer@163.com","commits":5}]},"readingTime":{"minutes":40.7,"words":12209},"filePathRelative":"algo/algo-listnode.md","localizedDate":"2025年4月30日","autoDesc":true}');export{u as comp,d as data};
