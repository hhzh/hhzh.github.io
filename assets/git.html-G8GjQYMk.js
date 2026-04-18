import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,a as s,e,r as l,o as c}from"./app-SX1WwGPK.js";const o={};function p(d,n){const a=l("Mermaid");return c(),i("div",null,[n[0]||(n[0]=s('<h2 id="引言" tabindex="-1"><a class="header-anchor" href="#引言"><span>引言</span></a></h2><p>一次 <code>git push --force</code> 覆盖同事的提交、一个遗漏的 <code>git stash</code> 导致半天的代码丢失、一条错误的 <code>git reset</code> 让重要功能提交消失——这些都不是理论风险，而是每个开发者迟早会踩的坑。Git 是团队协作的基石，但 80% 的开发者只用了 20% 的功能。读完本文，你将掌握 Git 的完整命令体系、分支管理规范、冲突解决策略，以及生产环境中必须遵守的安全操作清单。无论日常开发还是面试应对，这份指南都能帮你从&quot;会用&quot;进阶到&quot;精通&quot;。</p><hr><h2 id="git-版本控制完全指南" tabindex="-1"><a class="header-anchor" href="#git-版本控制完全指南"><span>Git 版本控制完全指南</span></a></h2><h3 id="git-核心概念回顾" tabindex="-1"><a class="header-anchor" href="#git-核心概念回顾"><span>Git 核心概念回顾</span></a></h3><p>Git 是一套分布式版本控制系统。理解其核心概念是高效使用的前提。</p><p>几个专用名词的译名如下：</p><ul><li><strong>Workspace（工作区）：</strong> 你电脑上实际看到的目录，存放正在编辑的文件。</li><li><strong>Index / Stage（暂存区）：</strong> 一个临时存放下次要提交的文件快照的区域。</li><li><strong>Repository（仓库区/本地仓库）：</strong> 存放所有提交历史、分支信息的完整版本库。</li><li><strong>Remote（远程仓库）：</strong> 托管在服务器上的仓库，用于团队协作。</li></ul>',8)),e(a,{id:"mermaid-41",code:"eJxLy8kvT85ILCpRCHHhUgACx2ilD/MnNyo83b70yd45T3t2KWiE5xdlFxckJqdqKsUq6Ora1aRnligkpqTUKDiBFS9TeDar6enaGWDFnnkpqRX6wSWJ6SDlYCOd4JqS83NzM0tqFJzB+mYpPJuz5umcDU92T366a7KCRlBqQX5xZkl+USVMpzNcZ0FpcUaNgku00qMZje939Cu82D/n+YpuhM7c/BK4fS5wXWmpJclAbc5owgWlOTk1Co5oViRnpCZn55eW6BelFqcCHQmRR3I8VB4kAwAFmXQe"}),n[1]||(n[1]=s('<blockquote><p><strong>💡 核心提示</strong>：<code>git pull</code> 本质是 <code>git fetch</code> + <code>git merge</code> 的组合操作。先理解这三个命令的区别，是掌握 Git 远程操作的关键。</p></blockquote><h3 id="git-分支模型" tabindex="-1"><a class="header-anchor" href="#git-分支模型"><span>Git 分支模型</span></a></h3><p>团队协作中，合理的分支管理策略能避免大量冲突和代码损失。</p>',3)),e(a,{id:"mermaid-53",code:"eJyNkE0SgjAMhfeeosO+Ii69gOcIEEpGSpmQMh5foehQ8IeuOu/lvX6NIbkydPVBPU/hrCVRVF5UQi1JMqk5Q1vUqsQBG9eFwRqLm/MSi4t0hSCZ7gU4Lhl1z5j6Hlk3zlAb933zF9WTqqGjULy1/MvZA3leze4AqOiuc29+PGKRDX6oCvnJDUK0G8YGocd0yI6nuHvrrHDmgRWShZk+8CxbQnS8vbNKwMza369FQA9AxbYI"}),n[2]||(n[2]=s(`<blockquote><p><strong>💡 核心提示</strong>：不要在 <code>main</code> 分支上直接开发。所有功能分支从 <code>develop</code> 或 <code>main</code> 创建，通过 Merge Request / Pull Request 合入，确保代码经过审查。</p></blockquote><h3 id="常用命令分类速查" tabindex="-1"><a class="header-anchor" href="#常用命令分类速查"><span>常用命令分类速查</span></a></h3><h4 id="新建代码库" tabindex="-1"><a class="header-anchor" href="#新建代码库"><span>新建代码库</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 在当前目录新建一个 Git 代码库</span>
<span class="token function">git</span> init

<span class="token comment"># 新建一个目录，将其初始化为 Git 代码库</span>
<span class="token function">git</span> init <span class="token punctuation">[</span>project-name<span class="token punctuation">]</span>

<span class="token comment"># 下载一个项目和它的整个代码历史</span>
<span class="token function">git</span> clone <span class="token punctuation">[</span>url<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h4><p>Git 的设置文件为 <code>.gitconfig</code>，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 显示当前的 Git 配置</span>
<span class="token function">git</span> config <span class="token parameter variable">--list</span>

<span class="token comment"># 编辑 Git 配置文件</span>
<span class="token function">git</span> config <span class="token parameter variable">-e</span> <span class="token punctuation">[</span>--global<span class="token punctuation">]</span>

<span class="token comment"># 设置提交代码时的用户信息</span>
<span class="token function">git</span> config <span class="token punctuation">[</span>--global<span class="token punctuation">]</span> user.name <span class="token string">&quot;[name]&quot;</span>
<span class="token function">git</span> config <span class="token punctuation">[</span>--global<span class="token punctuation">]</span> user.email <span class="token string">&quot;[email address]&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="增加-删除文件" tabindex="-1"><a class="header-anchor" href="#增加-删除文件"><span>增加/删除文件</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 添加指定文件到暂存区</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token punctuation">[</span>file1<span class="token punctuation">]</span> <span class="token punctuation">[</span>file2<span class="token punctuation">]</span> <span class="token punctuation">..</span>.

<span class="token comment"># 添加指定目录到暂存区，包括子目录</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token punctuation">[</span>dir<span class="token punctuation">]</span>

<span class="token comment"># 添加当前目录的所有文件到暂存区</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>

<span class="token comment"># 添加每个变化前，都会要求确认（分次提交）</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-p</span>

<span class="token comment"># 删除工作区文件，并且将这次删除放入暂存区</span>
<span class="token function">git</span> <span class="token function">rm</span> <span class="token punctuation">[</span>file1<span class="token punctuation">]</span> <span class="token punctuation">[</span>file2<span class="token punctuation">]</span> <span class="token punctuation">..</span>.

<span class="token comment"># 停止追踪指定文件，但该文件会保留在工作区</span>
<span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">--cached</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span>

<span class="token comment"># 改名文件，并且将这个改名放入暂存区</span>
<span class="token function">git</span> <span class="token function">mv</span> <span class="token punctuation">[</span>file-original<span class="token punctuation">]</span> <span class="token punctuation">[</span>file-renamed<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="代码提交" tabindex="-1"><a class="header-anchor" href="#代码提交"><span>代码提交</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 提交暂存区到仓库区</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token punctuation">[</span>message<span class="token punctuation">]</span>

<span class="token comment"># 提交暂存区的指定文件到仓库区</span>
<span class="token function">git</span> commit <span class="token punctuation">[</span>file1<span class="token punctuation">]</span> <span class="token punctuation">[</span>file2<span class="token punctuation">]</span> <span class="token punctuation">..</span>. <span class="token parameter variable">-m</span> <span class="token punctuation">[</span>message<span class="token punctuation">]</span>

<span class="token comment"># 提交工作区自上次 commit 之后的变化，直接到仓库区</span>
<span class="token function">git</span> commit <span class="token parameter variable">-a</span>

<span class="token comment"># 提交时显示所有 diff 信息</span>
<span class="token function">git</span> commit <span class="token parameter variable">-v</span>

<span class="token comment"># 使用一次新的 commit，替代上一次提交（修改上次提交信息）</span>
<span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token parameter variable">-m</span> <span class="token punctuation">[</span>message<span class="token punctuation">]</span>

<span class="token comment"># 重做上一次 commit，并包括指定文件的新变化</span>
<span class="token function">git</span> commit <span class="token parameter variable">--amend</span> <span class="token punctuation">[</span>file1<span class="token punctuation">]</span> <span class="token punctuation">[</span>file2<span class="token punctuation">]</span> <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="分支管理" tabindex="-1"><a class="header-anchor" href="#分支管理"><span>分支管理</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 列出所有本地分支</span>
<span class="token function">git</span> branch

<span class="token comment"># 列出所有远程分支</span>
<span class="token function">git</span> branch <span class="token parameter variable">-r</span>

<span class="token comment"># 列出所有本地分支和远程分支</span>
<span class="token function">git</span> branch <span class="token parameter variable">-a</span>

<span class="token comment"># 新建一个分支，但依然停留在当前分支</span>
<span class="token function">git</span> branch <span class="token punctuation">[</span>branch-name<span class="token punctuation">]</span>

<span class="token comment"># 新建一个分支，并切换到该分支</span>
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> <span class="token punctuation">[</span>branch<span class="token punctuation">]</span>

<span class="token comment"># 新建一个分支，指向指定 commit</span>
<span class="token function">git</span> branch <span class="token punctuation">[</span>branch<span class="token punctuation">]</span> <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>

<span class="token comment"># 新建一个分支，与指定的远程分支建立追踪关系</span>
<span class="token function">git</span> branch <span class="token parameter variable">--track</span> <span class="token punctuation">[</span>branch<span class="token punctuation">]</span> <span class="token punctuation">[</span>remote-branch<span class="token punctuation">]</span>

<span class="token comment"># 切换到指定分支，并更新工作区</span>
<span class="token function">git</span> checkout <span class="token punctuation">[</span>branch-name<span class="token punctuation">]</span>

<span class="token comment"># 切换到上一个分支</span>
<span class="token function">git</span> checkout -

<span class="token comment"># 建立追踪关系，在现有分支与指定的远程分支之间</span>
<span class="token function">git</span> branch --set-upstream <span class="token punctuation">[</span>branch<span class="token punctuation">]</span> <span class="token punctuation">[</span>remote-branch<span class="token punctuation">]</span>

<span class="token comment"># 合并指定分支到当前分支</span>
<span class="token function">git</span> merge <span class="token punctuation">[</span>branch<span class="token punctuation">]</span>

<span class="token comment"># 选择一个 commit，合并进当前分支</span>
<span class="token function">git</span> cherry-pick <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>

<span class="token comment"># 删除分支</span>
<span class="token function">git</span> branch <span class="token parameter variable">-d</span> <span class="token punctuation">[</span>branch-name<span class="token punctuation">]</span>

<span class="token comment"># 删除远程分支</span>
<span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> <span class="token punctuation">[</span>branch-name<span class="token punctuation">]</span>
<span class="token function">git</span> branch <span class="token parameter variable">-dr</span> <span class="token punctuation">[</span>remote/branch<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="标签" tabindex="-1"><a class="header-anchor" href="#标签"><span>标签</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 列出所有 tag</span>
<span class="token function">git</span> tag

<span class="token comment"># 新建一个 tag 在当前 commit</span>
<span class="token function">git</span> tag <span class="token punctuation">[</span>tag<span class="token punctuation">]</span>

<span class="token comment"># 新建一个 tag 在指定 commit</span>
<span class="token function">git</span> tag <span class="token punctuation">[</span>tag<span class="token punctuation">]</span> <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>

<span class="token comment"># 删除本地 tag</span>
<span class="token function">git</span> tag <span class="token parameter variable">-d</span> <span class="token punctuation">[</span>tag<span class="token punctuation">]</span>

<span class="token comment"># 删除远程 tag</span>
<span class="token function">git</span> push origin :refs/tags/<span class="token punctuation">[</span>tagName<span class="token punctuation">]</span>

<span class="token comment"># 查看 tag 信息</span>
<span class="token function">git</span> show <span class="token punctuation">[</span>tag<span class="token punctuation">]</span>

<span class="token comment"># 提交指定 tag</span>
<span class="token function">git</span> push <span class="token punctuation">[</span>remote<span class="token punctuation">]</span> <span class="token punctuation">[</span>tag<span class="token punctuation">]</span>

<span class="token comment"># 提交所有 tag</span>
<span class="token function">git</span> push <span class="token punctuation">[</span>remote<span class="token punctuation">]</span> <span class="token parameter variable">--tags</span>

<span class="token comment"># 新建一个分支，指向某个 tag</span>
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> <span class="token punctuation">[</span>branch<span class="token punctuation">]</span> <span class="token punctuation">[</span>tag<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查看信息" tabindex="-1"><a class="header-anchor" href="#查看信息"><span>查看信息</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 显示有变更的文件</span>
<span class="token function">git</span> status

<span class="token comment"># 显示当前分支的版本历史</span>
<span class="token function">git</span> log

<span class="token comment"># 显示 commit 历史，以及每次 commit 发生变更的文件</span>
<span class="token function">git</span> log <span class="token parameter variable">--stat</span>

<span class="token comment"># 搜索提交历史，根据关键词</span>
<span class="token function">git</span> log <span class="token parameter variable">-S</span> <span class="token punctuation">[</span>keyword<span class="token punctuation">]</span>

<span class="token comment"># 显示某个 commit 之后的所有变动，每个 commit 占据一行</span>
<span class="token function">git</span> log <span class="token punctuation">[</span>tag<span class="token punctuation">]</span> HEAD <span class="token parameter variable">--pretty</span><span class="token operator">=</span>format:%s

<span class="token comment"># 显示某个 commit 之后的所有变动，其&quot;提交说明&quot;必须符合搜索条件</span>
<span class="token function">git</span> log <span class="token punctuation">[</span>tag<span class="token punctuation">]</span> HEAD <span class="token parameter variable">--grep</span> feature

<span class="token comment"># 显示某个文件的版本历史，包括文件改名</span>
<span class="token function">git</span> log <span class="token parameter variable">--follow</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span>
<span class="token function">git</span> whatchanged <span class="token punctuation">[</span>file<span class="token punctuation">]</span>

<span class="token comment"># 显示指定文件相关的每一次 diff</span>
<span class="token function">git</span> log <span class="token parameter variable">-p</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span>

<span class="token comment"># 显示过去 5 次提交</span>
<span class="token function">git</span> log <span class="token parameter variable">-5</span> <span class="token parameter variable">--pretty</span> <span class="token parameter variable">--oneline</span>

<span class="token comment"># 显示所有提交过的用户，按提交次数排序</span>
<span class="token function">git</span> shortlog <span class="token parameter variable">-sn</span>

<span class="token comment"># 显示指定文件是什么人在什么时间修改过</span>
<span class="token function">git</span> blame <span class="token punctuation">[</span>file<span class="token punctuation">]</span>

<span class="token comment"># 显示暂存区和工作区的差异</span>
<span class="token function">git</span> <span class="token function">diff</span>

<span class="token comment"># 显示暂存区和上一个 commit 的差异</span>
<span class="token function">git</span> <span class="token function">diff</span> <span class="token parameter variable">--cached</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span>

<span class="token comment"># 显示工作区与当前分支最新 commit 之间的差异</span>
<span class="token function">git</span> <span class="token function">diff</span> HEAD

<span class="token comment"># 显示两次提交之间的差异</span>
<span class="token function">git</span> <span class="token function">diff</span> <span class="token punctuation">[</span>first-branch<span class="token punctuation">]</span><span class="token punctuation">..</span>.<span class="token punctuation">[</span>second-branch<span class="token punctuation">]</span>

<span class="token comment"># 显示今天你写了多少行代码</span>
<span class="token function">git</span> <span class="token function">diff</span> <span class="token parameter variable">--shortstat</span> <span class="token string">&quot;@{0 day ago}&quot;</span>

<span class="token comment"># 显示某次提交的元数据和内容变化</span>
<span class="token function">git</span> show <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>

<span class="token comment"># 显示某次提交发生变化的文件</span>
<span class="token function">git</span> show --name-only <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>

<span class="token comment"># 显示某次提交时，某个文件的内容</span>
<span class="token function">git</span> show <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>:<span class="token punctuation">[</span>filename<span class="token punctuation">]</span>

<span class="token comment"># 显示当前分支的最近几次提交</span>
<span class="token function">git</span> reflog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="远程同步" tabindex="-1"><a class="header-anchor" href="#远程同步"><span>远程同步</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 下载远程仓库的所有变动</span>
<span class="token function">git</span> fetch <span class="token punctuation">[</span>remote<span class="token punctuation">]</span>

<span class="token comment"># 显示所有远程仓库</span>
<span class="token function">git</span> remote <span class="token parameter variable">-v</span>

<span class="token comment"># 显示某个远程仓库的信息</span>
<span class="token function">git</span> remote show <span class="token punctuation">[</span>remote<span class="token punctuation">]</span>

<span class="token comment"># 增加一个新的远程仓库，并命名</span>
<span class="token function">git</span> remote <span class="token function">add</span> <span class="token punctuation">[</span>shortname<span class="token punctuation">]</span> <span class="token punctuation">[</span>url<span class="token punctuation">]</span>

<span class="token comment"># 取回远程仓库的变化，并与本地分支合并</span>
<span class="token function">git</span> pull <span class="token punctuation">[</span>remote<span class="token punctuation">]</span> <span class="token punctuation">[</span>branch<span class="token punctuation">]</span>

<span class="token comment"># 上传本地指定分支到远程仓库</span>
<span class="token function">git</span> push <span class="token punctuation">[</span>remote<span class="token punctuation">]</span> <span class="token punctuation">[</span>branch<span class="token punctuation">]</span>

<span class="token comment"># 强行推送当前分支到远程仓库，即使有冲突</span>
<span class="token function">git</span> push <span class="token punctuation">[</span>remote<span class="token punctuation">]</span> <span class="token parameter variable">--force</span>

<span class="token comment"># 推送所有分支到远程仓库</span>
<span class="token function">git</span> push <span class="token punctuation">[</span>remote<span class="token punctuation">]</span> <span class="token parameter variable">--all</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="撤销操作" tabindex="-1"><a class="header-anchor" href="#撤销操作"><span>撤销操作</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 恢复暂存区的指定文件到工作区</span>
<span class="token function">git</span> checkout <span class="token punctuation">[</span>file<span class="token punctuation">]</span>

<span class="token comment"># 恢复某个 commit 的指定文件到暂存区和工作区</span>
<span class="token function">git</span> checkout <span class="token punctuation">[</span>commit<span class="token punctuation">]</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span>

<span class="token comment"># 恢复暂存区的所有文件到工作区</span>
<span class="token function">git</span> checkout <span class="token builtin class-name">.</span>

<span class="token comment"># 重置暂存区的指定文件，与上一次 commit 保持一致，但工作区不变</span>
<span class="token function">git</span> reset <span class="token punctuation">[</span>file<span class="token punctuation">]</span>

<span class="token comment"># 重置暂存区与工作区，与上一次 commit 保持一致</span>
<span class="token function">git</span> reset <span class="token parameter variable">--hard</span>

<span class="token comment"># 重置当前分支的指针为指定 commit，同时重置暂存区，但工作区不变</span>
<span class="token function">git</span> reset <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>

<span class="token comment"># 重置当前分支的 HEAD 为指定 commit，同时重置暂存区和工作区，与指定 commit 一致</span>
<span class="token function">git</span> reset <span class="token parameter variable">--hard</span> <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>

<span class="token comment"># 重置当前 HEAD 为指定 commit，但保持暂存区和工作区不变</span>
<span class="token function">git</span> reset <span class="token parameter variable">--keep</span> <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>

<span class="token comment"># 新建一个 commit，用来撤销指定 commit（反向操作）</span>
<span class="token function">git</span> revert <span class="token punctuation">[</span>commit<span class="token punctuation">]</span>

<span class="token comment"># 暂时将未提交的变化移除，稍后再移入</span>
<span class="token function">git</span> stash
<span class="token function">git</span> stash pop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h4><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 生成一个可供发布的压缩包</span>
<span class="token function">git</span> archive
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="核心操作对比表" tabindex="-1"><a class="header-anchor" href="#核心操作对比表"><span>核心操作对比表</span></a></h3><table><thead><tr><th style="text-align:left;">操作</th><th style="text-align:left;">命令</th><th style="text-align:left;">影响范围</th><th style="text-align:left;">是否可恢复</th><th style="text-align:left;">使用场景</th></tr></thead><tbody><tr><td style="text-align:left;">撤销工作区修改</td><td style="text-align:left;"><code>git checkout &lt;file&gt;</code></td><td style="text-align:left;">工作区</td><td style="text-align:left;">否</td><td style="text-align:left;">放弃未暂存的修改</td></tr><tr><td style="text-align:left;">撤销暂存</td><td style="text-align:left;"><code>git reset &lt;file&gt;</code></td><td style="text-align:left;">暂存区</td><td style="text-align:left;">是</td><td style="text-align:left;">从暂存区移出，保留工作区</td></tr><tr><td style="text-align:left;">软重置</td><td style="text-align:left;"><code>git reset --soft &lt;commit&gt;</code></td><td style="text-align:left;">仅 HEAD</td><td style="text-align:left;">是</td><td style="text-align:left;">重新组织 commit</td></tr><tr><td style="text-align:left;">混合重置</td><td style="text-align:left;"><code>git reset --mixed &lt;commit&gt;</code></td><td style="text-align:left;">HEAD + 暂存区</td><td style="text-align:left;">是</td><td style="text-align:left;">回退 commit，保留工作区</td></tr><tr><td style="text-align:left;">硬重置</td><td style="text-align:left;"><code>git reset --hard &lt;commit&gt;</code></td><td style="text-align:left;">HEAD + 暂存区 + 工作区</td><td style="text-align:left;">否</td><td style="text-align:left;">彻底回退到指定 commit</td></tr><tr><td style="text-align:left;">反向提交</td><td style="text-align:left;"><code>git revert &lt;commit&gt;</code></td><td style="text-align:left;">新增 commit</td><td style="text-align:left;">是</td><td style="text-align:left;">安全撤销已推送的提交</td></tr><tr><td style="text-align:left;">暂存修改</td><td style="text-align:left;"><code>git stash</code></td><td style="text-align:left;">工作区 + 暂存区</td><td style="text-align:left;">是</td><td style="text-align:left;">切换分支时保存未提交修改</td></tr></tbody></table><blockquote><p><strong>💡 核心提示</strong>：<code>git reset</code> 和 <code>git revert</code> 的本质区别是：<code>reset</code> 是&quot;回到过去&quot;（修改历史），<code>revert</code> 是&quot;承认错误&quot;（新增一次反向提交）。已推送到远程的提交必须用 <code>revert</code>，绝不能用 <code>reset</code>。</p></blockquote><h3 id="git-远程操作流程" tabindex="-1"><a class="header-anchor" href="#git-远程操作流程"><span>Git 远程操作流程</span></a></h3>`,27)),e(a,{id:"mermaid-258",code:"eJx9kE9LwzAYxu/9FLnrCv499LDTjuJB/AKxe62Fdq1tt3N7cFQGdmNQCisoTtgQwaKeNsEv06TdtzBNHKh15hAS8uP3PHlduOxCR4WWjjUHmxJiy8aOp6u6jTseakEPYReRd59Eo9K/qgFHloqNCqHpE0mzfDkmi3GNOgHT8qDCyo+0mA82YKeATR43uV8ltzQcklEicYr1aDSbPExBmu4h3G6jLX5SLdPUPU4dVyFWD5yK3/6id2REo2G+eCBhVispvKKeEJ+Dp178YVszu0w3uCZRLH5CU5/GGYkSOnn7ZmS70JngaIBoGPObA2fYhbpdQXsyKmdT0n8l/ZfiMdhQzu66/3XbZ91u5is/YF8V9TgsnhvMVQ1YQQfyjwmT6LmcicTqvRZpGL8iheVwPQgxgnw5Le4C6RN+t/Dy"}),n[3]||(n[3]=s('<h3 id="面试问题示例与深度解析" tabindex="-1"><a class="header-anchor" href="#面试问题示例与深度解析"><span>面试问题示例与深度解析</span></a></h3><ul><li>&quot;请描述 <code>git merge</code> 和 <code>git rebase</code> 的区别？&quot;（<code>merge</code> 会创建合并节点保留完整历史，<code>rebase</code> 会重写提交历史保持线性。公共分支用 <code>merge</code>，本地功能分支用 <code>rebase</code>）</li><li>&quot;如果误删了一个重要分支，如何恢复？&quot;（使用 <code>git reflog</code> 找到分支删除前的 HEAD 指针，再用 <code>git branch &lt;name&gt; &lt;commit-hash&gt;</code> 重建分支）</li><li>&quot;如何解决 Git 合并冲突？&quot;（<code>git status</code> 查看冲突文件 -&gt; 手动编辑解决冲突标记 -&gt; <code>git add</code> 标记已解决 -&gt; <code>git commit</code> 完成合并）</li><li>&quot;<code>git pull --rebase</code> 和普通的 <code>git pull</code> 有什么区别？&quot;（<code>--rebase</code> 会将本地未推送的提交重新变基到远程分支上，避免产生多余的 merge commit，保持历史线性）</li></ul><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p>Git 是开发者日常工作中最重要的协作工具。掌握其核心概念（工作区、暂存区、仓库区）、常用命令体系、分支管理规范，以及安全的撤销和恢复策略，是提升团队协作效率、避免代码丢失的必备技能。理解 <code>reset</code> 与 <code>revert</code> 的区别、<code>merge</code> 与 <code>rebase</code> 的适用场景，能让你在复杂协作中游刃有余。</p><h3 id="生产环境避坑指南" tabindex="-1"><a class="header-anchor" href="#生产环境避坑指南"><span>生产环境避坑指南</span></a></h3><ol><li><strong>禁止 <code>git push --force</code> 到共享分支：</strong> 强制推送会覆盖远程历史，可能永久丢失同事的提交。如必须使用，请用 <code>--force-with-lease</code>（安全强制推送，仅在远程没有新提交时才允许）。</li><li><strong>敏感信息泄露：</strong> 密码、API Key、Token 一旦提交到 Git 历史，即使后续删除，仍可通过 <code>git log</code> 恢复。使用 <code>.gitignore</code> 和 <code>git filter-branch</code> 或 BFG 工具彻底清除。</li><li><strong>大文件入库：</strong> 二进制大文件（图片、编译产物）会导致仓库体积暴增。使用 Git LFS（Large File Storage）管理大文件。</li><li><strong>忽略文件配置：</strong> 确保 <code>.gitignore</code> 包含 IDE 配置文件（<code>.idea/</code>、<code>.vscode/</code>）、编译产物（<code>target/</code>、<code>build/</code>）、环境变量文件（<code>.env</code>）等。</li><li><strong>Commit 消息规范：</strong> 遵循 Conventional Commits 规范（如 <code>feat:</code>、<code>fix:</code>、<code>docs:</code>），便于自动生成 Changelog 和追溯变更。</li><li><strong>分支保护：</strong> 在 GitHub/GitLab 上为 <code>main</code>、<code>develop</code> 分支开启 Branch Protection，禁止直接推送，要求通过 Pull Request 和 Code Review 合入。</li><li><strong>定期 <code>git gc</code>：</strong> 对本地仓库执行 <code>git gc --prune=now</code> 清理无用对象，避免仓库膨胀。</li></ol><h3 id="行动清单" tabindex="-1"><a class="header-anchor" href="#行动清单"><span>行动清单</span></a></h3><ol><li><strong>检查 <code>.gitignore</code>：</strong> 确认项目中的 <code>.gitignore</code> 已覆盖 IDE 配置、编译产物、敏感文件（<code>.env</code>、<code>*.key</code>）。</li><li><strong>配置全局 alias：</strong> 设置常用别名，如 <code>git config --global alias.lg &quot;log --oneline --graph --decorate&quot;</code>。</li><li><strong>实践安全推送：</strong> 将习惯从 <code>git push --force</code> 改为 <code>git push --force-with-lease</code>。</li><li><strong>Commit 消息规范：</strong> 在团队内推行 Conventional Commits 规范，确保每次提交都有明确的类型和描述。</li><li><strong>扩展阅读：</strong> 推荐阅读 Pro Git 官方文档（https://git-scm.com/book/zh/v2），重点阅读&quot;Git 分支&quot;和&quot;Git 工具&quot;章节。</li></ol>',8))])}const m=t(o,[["render",p],["__file","git.html.vue"]]),v=JSON.parse('{"path":"/tool/git.html","title":"","lang":"zh-CN","frontmatter":{"description":"引言 一次 git push --force 覆盖同事的提交、一个遗漏的 git stash 导致半天的代码丢失、一条错误的 git reset 让重要功能提交消失——这些都不是理论风险，而是每个开发者迟早会踩的坑。Git 是团队协作的基石，但 80% 的开发者只用了 20% 的功能。读完本文，你将掌握 Git 的完整命令体系、分支管理规范、冲突解决策...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/tool/git.html"}],["meta",{"property":"og:site_name","content":"Java八股文网"}],["meta",{"property":"og:description","content":"引言 一次 git push --force 覆盖同事的提交、一个遗漏的 git stash 导致半天的代码丢失、一条错误的 git reset 让重要功能提交消失——这些都不是理论风险，而是每个开发者迟早会踩的坑。Git 是团队协作的基石，但 80% 的开发者只用了 20% 的功能。读完本文，你将掌握 Git 的完整命令体系、分支管理规范、冲突解决策..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2026-04-18T09:57:12.000Z"}],["meta",{"property":"article:author","content":"Mr.Hope"}],["meta",{"property":"article:modified_time","content":"2026-04-18T09:57:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2026-04-18T09:57:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Hope\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"引言","slug":"引言","link":"#引言","children":[]},{"level":2,"title":"Git 版本控制完全指南","slug":"git-版本控制完全指南","link":"#git-版本控制完全指南","children":[{"level":3,"title":"Git 核心概念回顾","slug":"git-核心概念回顾","link":"#git-核心概念回顾","children":[]},{"level":3,"title":"Git 分支模型","slug":"git-分支模型","link":"#git-分支模型","children":[]},{"level":3,"title":"常用命令分类速查","slug":"常用命令分类速查","link":"#常用命令分类速查","children":[]},{"level":3,"title":"核心操作对比表","slug":"核心操作对比表","link":"#核心操作对比表","children":[]},{"level":3,"title":"Git 远程操作流程","slug":"git-远程操作流程","link":"#git-远程操作流程","children":[]},{"level":3,"title":"面试问题示例与深度解析","slug":"面试问题示例与深度解析","link":"#面试问题示例与深度解析","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":3,"title":"生产环境避坑指南","slug":"生产环境避坑指南","link":"#生产环境避坑指南","children":[]},{"level":3,"title":"行动清单","slug":"行动清单","link":"#行动清单","children":[]}]}],"git":{"createdTime":1745907928000,"updatedTime":1776506232000,"contributors":[{"name":"Yideng","email":"oointer@163.com","commits":2}]},"readingTime":{"minutes":10.45,"words":3134},"filePathRelative":"tool/git.md","localizedDate":"2025年4月29日","autoDesc":true}');export{m as comp,v as data};
