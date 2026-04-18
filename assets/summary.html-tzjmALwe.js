import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,e as l,r as i,o as d}from"./app-SX1WwGPK.js";const r={};function o(c,t){const n=i("Mermaid");return d(),a("div",null,[t[0]||(t[0]=e(`<h2 id="程序员年终总结-从「信息传递」到「价值塑造」的体系化方法" tabindex="-1"><a class="header-anchor" href="#程序员年终总结-从「信息传递」到「价值塑造」的体系化方法"><span>程序员年终总结：从「信息传递」到「价值塑造」的体系化方法</span></a></h2><hr><blockquote><p><strong>💡 核心心法</strong>：年终总结不是写你做了什么，而是写你为组织创造了什么价值。领导看的不是苦劳，是功劳。</p></blockquote><hr><h4 id="_1-日常汇报-建立「决策者思维」" tabindex="-1"><a class="header-anchor" href="#_1-日常汇报-建立「决策者思维」"><span>1. 日常汇报：建立「决策者思维」</span></a></h4><p><strong>电梯汇报法（30秒版）</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>结构：进展（70%） + 风险（20%） + 求助（10%）

案例：
&quot;支付系统重构已完成80%（进展），
 但第三方接口鉴权方案存在合规隐患（风险），
 需要法务部介入评估（求助）。&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>周报三维模型</strong>：</p><table><thead><tr><th style="text-align:left;">模块</th><th style="text-align:left;">内容要点</th><th style="text-align:left;">数据加持</th></tr></thead><tbody><tr><td style="text-align:left;"><strong>业务贡献</strong></td><td style="text-align:left;">订单处理效率提升</td><td style="text-align:left;">平均处理时长↓40%</td></tr><tr><td style="text-align:left;"><strong>技术突破</strong></td><td style="text-align:left;">自研分布式锁组件</td><td style="text-align:left;">减少Redis调用量70%</td></tr><tr><td style="text-align:left;"><strong>待办事项</strong></td><td style="text-align:left;">灰度发布方案设计</td><td style="text-align:left;">预计影响用户范围≤5%</td></tr></tbody></table><blockquote><p><strong>🚫 避坑</strong>：删除&quot;修复若干bug&quot;等无效描述，改为&quot;解决历史订单状态同步异常问题，影响用户量3200人&quot;。</p></blockquote><p><strong>反面教材 vs 正面模板</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>反面教材（普通程序员的周报）：
- 本周完成了订单模块开发
- 修复了一些bug
- 参加了需求评审会
- 学习了Kafka相关知识

（领导看了内心毫无波澜：你干了啥？价值在哪？）

正面模板（高绩效程序员的周报）：
- 【业务贡献】完成订单模块重构，上线后订单处理时长从5s降到3s（↓40%），
  预计每月减少用户投诉200+
- 【技术突破】自研分布式锁组件，替代原Redis轮询方案，
  Redis调用量减少70%，服务器成本预计每月节省2万元
- 【风险预警】支付网关第三方接口即将到期，建议提前2周启动续签流程
- 【下周计划】灰度发布方案评审（已邀请测试和产品），预计影响范围≤5%

（领导看了：这人靠谱，知道业务价值，还能预警风险）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h4 id="_2-项目总结-打造「可复用的经验资产」" tabindex="-1"><a class="header-anchor" href="#_2-项目总结-打造「可复用的经验资产」"><span>2. 项目总结：打造「可复用的经验资产」</span></a></h4><p><strong>技术总结五步法</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>业务背景（为什么做）
  → 技术方案（怎么做）
  → 核心难点（卡点突破）
  → 成果数据（量化价值）
  → 经验沉淀（模式总结）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>反面教材 vs 正面模板</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>反面教材（流水账式总结）：
&quot;今年做了支付系统、订单系统、用户中心，
  用了Spring Cloud、Redis、Kafka等技术。&quot;

（领导：然后呢？你解决了什么问题？带来什么价值？）

正面模板（价值导向总结）：
&quot;为解决大促期间库存超卖问题（背景），
  设计基于Redis+Lua的分布式扣减方案（方案），
  突破热点商品并发锁冲突难题（难点），
  TP99从3s优化至200ms，大促期间零资损（成果），
  总结出&#39;库存预占-异步落库-对冲补偿&#39;三阶防护模型，
  已沉淀为团队标准组件，被3个业务线采用（经验）&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>汇报策略选择矩阵</strong>：</p><table><thead><tr><th style="text-align:left;">听众类型</th><th style="text-align:left;">侧重方向</th><th style="text-align:left;">技术细节占比</th><th style="text-align:left;">关键话术</th></tr></thead><tbody><tr><td style="text-align:left;">技术总监</td><td style="text-align:left;">架构创新性、性能突破</td><td style="text-align:left;">60%</td><td style="text-align:left;">&quot;这个方案在XX场景下比业界标准快30%&quot;</td></tr><tr><td style="text-align:left;">产品VP</td><td style="text-align:left;">业务指标提升、扩展性</td><td style="text-align:left;">30%</td><td style="text-align:left;">&quot;这个改动让转化率提升了X%，支撑了XX业务目标&quot;</td></tr><tr><td style="text-align:left;">CEO</td><td style="text-align:left;">成本节约、战略价值</td><td style="text-align:left;">10%</td><td style="text-align:left;">&quot;今年技术优化总共节省了XX万，支撑了XX亿GMV&quot;</td></tr></tbody></table><hr><h4 id="_3-年终总结-构建「个人价值坐标系」" tabindex="-1"><a class="header-anchor" href="#_3-年终总结-构建「个人价值坐标系」"><span>3. 年终总结：构建「个人价值坐标系」</span></a></h4><p><strong>价值量化四维度</strong>：</p><table><thead><tr><th style="text-align:left;">维度</th><th style="text-align:left;">计算公式</th><th style="text-align:left;">案例</th></tr></thead><tbody><tr><td style="text-align:left;"><strong>效率提升</strong></td><td style="text-align:left;">节省工时 × 人工成本</td><td style="text-align:left;">自动化脚本节省1200人天/年</td></tr><tr><td style="text-align:left;"><strong>成本降低</strong></td><td style="text-align:left;">（旧方案成本 - 新方案成本）× 规模</td><td style="text-align:left;">服务器资源消耗降低￥58万/年</td></tr><tr><td style="text-align:left;"><strong>风险控制</strong></td><td style="text-align:left;">潜在损失 × 发生概率</td><td style="text-align:left;">资损防护系统避免￥220万风险</td></tr><tr><td style="text-align:left;"><strong>创新价值</strong></td><td style="text-align:left;">专利/技术方案复用次数</td><td style="text-align:left;">流量染色方案被3个事业部采用</td></tr></tbody></table><p><strong>PPT设计黄金结构</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>1. 战略对齐（领导最在意的3个目标，说明你的工作和这些目标的关联）
2. 关键战役（用STAR法则讲3个核心项目）
   - S（Situation）：当时的情况/问题
   - T（Task）：你的任务/目标
   - A（Action）：你做了什么（突出你的独特贡献）
   - R（Result）：结果数据（量化！量化！量化！）
3. 能力进化（技术栈升级 + 方法论沉淀）
4. 未来展望（明年能为组织创造的新价值点）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>反面教材 vs 正面模板</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>反面教材（年终总结 = 功能清单）：
&quot;1月：做了A功能
 2月：做了B功能
 3月：做了C功能
 ...
 12月：做了L功能&quot;

（领导：所以呢？这些功能带来了什么？你的成长在哪？）

正面模板（年终总结 = 价值报告）：
&quot;一、今年我主导的3个关键项目，总计节省成本￥180万：
   1. 支付系统重构：故障率降低60%，节省资损￥120万
   2. 自动化部署平台：部署时间从2h降到10min，节省人力￥40万/年
   3. 慢查询优化：核心接口TP99从3s降到200ms，支撑了双11峰值
 二、技术影响力：
   - 主导制定了团队代码规范，新人上手时间缩短50%
   - 输出8篇技术文档，被3个兄弟团队引用
   - 在部门技术大会做了2次分享
 三、明年规划：
   - 推动全链路压测体系建设，支撑明年2倍业务增长
   - 培养2名中级工程师达到高级水平&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>💡 高光技巧</strong>：</p><ul><li>在目录页增加「我为组织节省的成本」磁贴图</li><li>用技术架构图替代文字堆砌</li><li>每个数据都要有对比（优化前 vs 优化后）</li></ul></blockquote><hr><h4 id="_4-年终复盘-实施「组织手术刀式剖析」" tabindex="-1"><a class="header-anchor" href="#_4-年终复盘-实施「组织手术刀式剖析」"><span>4. 年终复盘：实施「组织手术刀式剖析」</span></a></h4><p><strong>五阶复盘法</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>1. 目标回溯（原始KPI vs 实际达成）
2. 关键动作（哪些决策带来80%结果）
3. 根因分析（5Why法深挖问题本质）
4. 规律提炼（可复用的成功因子/失败模式）
5. 迭代计划（具体到Q1的3个改进项）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>技术人专属复盘模板</strong>：</p><div class="language-markdown line-numbers-mode" data-ext="md" data-title="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">##</span> [项目名称] 复盘报告</span>

<span class="token bold"><span class="token punctuation">**</span><span class="token content">1. 架构决策评估</span><span class="token punctuation">**</span></span>
<span class="token list punctuation">-</span> ✅ 正确决策：采用CQRS模式分离读写（查询性能提升3倍）
<span class="token list punctuation">-</span> ❌ 错误决策：过早引入Service Mesh（增加运维复杂度，收益不明显）

<span class="token bold"><span class="token punctuation">**</span><span class="token content">2. 技术债务台账</span><span class="token punctuation">**</span></span>
<span class="token table"><span class="token table-header-row"><span class="token punctuation">|</span><span class="token table-header important"> 债务类型 </span><span class="token punctuation">|</span><span class="token table-header important"> 位置 </span><span class="token punctuation">|</span><span class="token table-header important"> 修复成本 </span><span class="token punctuation">|</span><span class="token table-header important"> 容忍期限 </span><span class="token punctuation">|</span>
</span><span class="token table-line"><span class="token punctuation">|</span> <span class="token punctuation">:---</span> <span class="token punctuation">|</span> <span class="token punctuation">:---</span> <span class="token punctuation">|</span> <span class="token punctuation">:---</span> <span class="token punctuation">|</span> <span class="token punctuation">:---</span> <span class="token punctuation">|</span>
</span><span class="token table-data-rows"><span class="token punctuation">|</span><span class="token table-data"> 硬编码 </span><span class="token punctuation">|</span><span class="token table-data"> OrderService.java </span><span class="token punctuation">|</span><span class="token table-data"> 8人天 </span><span class="token punctuation">|</span><span class="token table-data"> Q2 </span><span class="token punctuation">|</span>
<span class="token punctuation">|</span><span class="token table-data"> 缺少幂等设计 </span><span class="token punctuation">|</span><span class="token table-data"> PayCallback接口 </span><span class="token punctuation">|</span><span class="token table-data"> 3人天 </span><span class="token punctuation">|</span><span class="token table-data"> Q1 </span><span class="token punctuation">|</span>
</span></span>
<span class="token bold"><span class="token punctuation">**</span><span class="token content">3. 认知升级清单</span><span class="token punctuation">**</span></span>
<span class="token list punctuation">-</span> 分布式事务选型应优先考虑业务补偿而非强一致性
<span class="token list punctuation">-</span> 日志规范需在项目启动时强制执行，后期补的成本是初期的3倍
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="年终总结流程图" tabindex="-1"><a class="header-anchor" href="#年终总结流程图"><span>年终总结流程图</span></a></h2>`,37)),l(n,{id:"mermaid-270",code:"eJx10UtLAlEUB/B9n2KgpbiIHlSLoLLMXkS5u7QIcSpwEdUmNBi0cpzMMc1XI6GIaQ8tKfIxil9mzr3Ot+jOvQZumuX9nfOfc889PD04ORLcjjGBfosIuhJUbuEmB+1vostY0ome3Bfs9gVhyU+0LAm24bpKEZplo5e/ZG1LzJcRyBkId3BEwvmIWWwTrQ6JqKHroBT3WeEyK3T4SU0zpYj5ljX0JkhdWsuDHJYHcDQCvQYk70DRcCwBHTUgrCDaQMMn7dNG6xUXWtAP8V/w5BWWvIrIQ3XPvbiLv1Ig5+g18IdK60crV1mlE5lhFaJp7liO46c8dyfzNf+gXiT1DF0An5EPuMYHTMkkFrZZXfl3m1mKmbkXG8gaTn8GBBfCjTBts3bUeebNWCnDvcLzXSx/HWE1ToLdQahn3VKOm6k+93XmG3SZP1B/xNkYDRpUrkBOcN9gvmk5fYCdHTc/3mTHW4joIaNdsEZQyly2mGwjXCtBV/0TRmfnFz4v3Z147PPNj3snxGnROwLO/8A1BM+sd8YzNwLbQxBFcc4zNfYL60EaxA=="}),t[1]||(t[1]=e(`<hr><h2 id="汇报禁忌清单-技术人常踩的-6-大雷区" tabindex="-1"><a class="header-anchor" href="#汇报禁忌清单-技术人常踩的-6-大雷区"><span>汇报禁忌清单：技术人常踩的 6 大雷区</span></a></h2><ol><li><strong>用技术术语轰炸非技术领导</strong> —— 大谈CAP定理、最终一致性，领导内心OS：&quot;说人话。&quot;</li><li><strong>只报喜不报忧</strong> —— 隐藏问题直到爆发，领导最怕的不是问题，是&quot;突然的惊吓&quot;。</li><li><strong>把周报写成代码变更记录</strong> —— &quot;写了XX个类、XX行代码&quot;毫无意义，领导关心的是业务影响。</li><li><strong>年终总结变成功能清单</strong> —— 按月罗列功能 = 没有总结。价值量化 = 有总结。</li><li><strong>复盘流于表面</strong> —— 仅陈述事实无深度归因，等于浪费时间。</li><li><strong>忽视汇报视觉化</strong> —— 纯文字PPT让听众3分钟走神，用架构图和数据图表说话。</li></ol><hr><h2 id="必死-5-大雷区" tabindex="-1"><a class="header-anchor" href="#必死-5-大雷区"><span>必死 5 大雷区</span></a></h2><ol><li><strong>没有量化数据</strong>：通篇&quot;提升了效率&quot;&quot;优化了性能&quot;但没有数字，领导认为&quot;没有成果&quot;。</li><li><strong>只写执行不写思考</strong>：写&quot;完成了XX开发&quot;不如写&quot;通过分析XX问题，提出XX方案，效果XX&quot;。</li><li><strong>不写失败和复盘</strong>：完美报告 = 假报告。主动写&quot;今年最大的失误是XX，教训是XX&quot;反而加分。</li><li><strong>没有未来规划</strong>：只总结过去，不规划未来 = 没有上进心。至少要写3个明年改进项。</li><li><strong>汇报对象错位</strong>：给技术领导讲业务、给业务领导讲架构，没有根据听众调整内容比重。</li></ol><hr><h2 id="实操清单" tabindex="-1"><a class="header-anchor" href="#实操清单"><span>实操清单</span></a></h2><h4 id="📝-话术抄作业" tabindex="-1"><a class="header-anchor" href="#📝-话术抄作业"><span>📝 话术抄作业</span></a></h4><p><strong>年终汇报开场白</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;今年我主要围绕3个核心目标开展工作：
 第一，提升系统稳定性，故障率降低60%；
 第二，优化开发效率，部署时间从2小时缩短到10分钟；
 第三，支撑业务增长，双11峰值TPS达到平时的10倍。
 下面我逐项汇报。&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>述职答辩模板（STAR法则）</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;关于支付系统重构项目：
 背景（S）：旧系统大促期间故障频发，去年双11出现3次P1事故。
 目标（T）：将故障率降低50%，支撑明年2倍业务增长。
 行动（A）：我主导了架构重构，引入异步化处理、分布式缓存、
           熔断降级机制，并建立了全链路监控。
 结果（R）：今年双11零P1事故，TP99从3s降到200ms，
           预计节省资损120万。&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>争取加薪/晋升的铺垫话术</strong>：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>&quot;今年我主导了3个核心项目，总计节省成本180万，
 故障率降低60%，还培养了2名中级工程师。
 对比当前职级标准，我认为我已经达到了下一级的要求，
 想和您聊聊我的成长路径和明年的规划。&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="✅-年终总结前-10-分钟检查清单" tabindex="-1"><a class="header-anchor" href="#✅-年终总结前-10-分钟检查清单"><span>✅ 年终总结前 10 分钟检查清单</span></a></h4><table><thead><tr><th style="text-align:left;">检查项</th><th style="text-align:left;">通过？</th></tr></thead><tbody><tr><td style="text-align:left;">每个项目是否都有量化数据（前/后对比）？</td><td style="text-align:left;">☐</td></tr><tr><td style="text-align:left;">是否有3-5个核心项目（而不是罗列全部）？</td><td style="text-align:left;">☐</td></tr><tr><td style="text-align:left;">是否写了1-2个失败/教训（展示反思能力）？</td><td style="text-align:left;">☐</td></tr><tr><td style="text-align:left;">是否包含了明年规划（至少3个改进方向）？</td><td style="text-align:left;">☐</td></tr><tr><td style="text-align:left;">技术术语是否已翻译成业务价值？</td><td style="text-align:left;">☐</td></tr><tr><td style="text-align:left;">PPT是否有架构图和数据图表（不是纯文字）？</td><td style="text-align:left;">☐</td></tr><tr><td style="text-align:left;">是否根据不同听众调整了内容比重？</td><td style="text-align:left;">☐</td></tr><tr><td style="text-align:left;">是否排练过至少2遍？</td><td style="text-align:left;">☐</td></tr></tbody></table><h4 id="📚-推荐资源" tabindex="-1"><a class="header-anchor" href="#📚-推荐资源"><span>📚 推荐资源</span></a></h4><ul><li>STAR法则详解：https://en.wikipedia.org/wiki/STAR_method</li><li>《金字塔原理》—— 结构化表达经典</li><li>极客时间《技术管理实战36讲》—— 汇报、复盘、述职全覆盖</li></ul>`,19))])}const v=s(r,[["render",o],["__file","summary.html.vue"]]),m=JSON.parse('{"path":"/eq/summary.html","title":"","lang":"zh-CN","frontmatter":{"description":"程序员年终总结：从「信息传递」到「价值塑造」的体系化方法 💡 核心心法：年终总结不是写你做了什么，而是写你为组织创造了什么价值。领导看的不是苦劳，是功劳。 1. 日常汇报：建立「决策者思维」 电梯汇报法（30秒版）： 周报三维模型： 🚫 避坑：删除\\"修复若干bug\\"等无效描述，改为\\"解决历史订单状态同步异常问题，影响用户量3200人\\"。 反面教材 ...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/eq/summary.html"}],["meta",{"property":"og:site_name","content":"Java八股文网"}],["meta",{"property":"og:description","content":"程序员年终总结：从「信息传递」到「价值塑造」的体系化方法 💡 核心心法：年终总结不是写你做了什么，而是写你为组织创造了什么价值。领导看的不是苦劳，是功劳。 1. 日常汇报：建立「决策者思维」 电梯汇报法（30秒版）： 周报三维模型： 🚫 避坑：删除\\"修复若干bug\\"等无效描述，改为\\"解决历史订单状态同步异常问题，影响用户量3200人\\"。 反面教材 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-04-18T10:13:35.000Z"}],["meta",{"property":"article:author","content":"Mr.Hope"}],["meta",{"property":"article:modified_time","content":"2026-04-18T10:13:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-04-18T10:13:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Hope\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"程序员年终总结：从「信息传递」到「价值塑造」的体系化方法","slug":"程序员年终总结-从「信息传递」到「价值塑造」的体系化方法","link":"#程序员年终总结-从「信息传递」到「价值塑造」的体系化方法","children":[]},{"level":2,"title":"年终总结流程图","slug":"年终总结流程图","link":"#年终总结流程图","children":[]},{"level":2,"title":"汇报禁忌清单：技术人常踩的 6 大雷区","slug":"汇报禁忌清单-技术人常踩的-6-大雷区","link":"#汇报禁忌清单-技术人常踩的-6-大雷区","children":[]},{"level":2,"title":"必死 5 大雷区","slug":"必死-5-大雷区","link":"#必死-5-大雷区","children":[]},{"level":2,"title":"实操清单","slug":"实操清单","link":"#实操清单","children":[]}],"git":{"createdTime":1746192759000,"updatedTime":1776507215000,"contributors":[{"name":"Yideng","email":"oointer@163.com","commits":2}]},"readingTime":{"minutes":9.04,"words":2711},"filePathRelative":"eq/summary.md","localizedDate":"2025年5月2日","autoDesc":true}');export{v as comp,m as data};
