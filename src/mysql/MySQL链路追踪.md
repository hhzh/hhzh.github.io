## 引言

Explain 告诉你用了索引，但为什么选这个索引呢？同一条 SQL 换个参数就走了完全不同的索引——这不是玄学，而是优化器在背后做了复杂的代价计算。当你只能看到执行计划的结果，却不知道优化器为什么做出这个选择时，排查就走进了死胡同。

好在 MySQL 提供了一个好用的工具——`optimizer_trace`（优化器追踪），可以帮你查看优化器生成执行计划的完整过程，包括访问表的方法、各种开销计算、各种转换等。读完本文你将掌握：
- **optimizer_trace 的开启与解读**：从配置到输出的完整流程
- **索引选择过程的代价分析**：为什么同一条 SQL 不同参数走了不同的索引
- **生产环境安全使用指南**：如何在不影响线上服务的前提下分析执行计划

## optimizer_trace 配置查看

```sql
SHOW VARIABLES LIKE '%optimizer_trace%';
```

输出参数详解：

| 参数 | 说明 |
| :--- | :--- |
| **optimizer_trace** | 主配置，enabled 的 on 表示开启，off 表示关闭；one_line 表示是否展示成一行 |
| **optimizer_trace_features** | 表示优化器的可选特性，包括贪心搜索、范围优化等 |
| **optimizer_trace_limit** | 优化器追踪最大显示数目，默认是 1 条 |
| **optimizer_trace_max_mem_size** | 优化器追踪占用的最大内存容量 |
| **optimizer_trace_offset** | 显示的第一个优化器追踪的偏移量 |

> **💡 核心提示**：`optimizer_trace_max_mem_size` 默认值是 1MB（1048576 字节）。对于复杂 SQL，优化过程生成的追踪信息可能超出限制，超出部分会被截断并在 `MISSING_BYTES_BEYOND_MAX_MEM_SIZE` 列中显示被截断的字节数。如果分析大 SQL，可适当调大此值。

## 开启 optimizer_trace

**optimizer_trace** 默认是关闭的，可以使用命令手动开启：

```sql
SET optimizer_trace = "enabled=on";
```

> **注意**：开启 optimizer_trace 会带来一定的性能开销，因为它需要记录优化器内部的所有决策过程。建议仅在诊断时临时开启，分析完毕后立即关闭：`SET optimizer_trace = "enabled=off";`

## 线上问题复现：为什么选错索引？

先造点数据备用，创建一张用户表：

```sql
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(100) NOT NULL COMMENT '姓名',
  `gender` tinyint NOT NULL COMMENT '性别',
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`),
  KEY `idx_gender_name` (`gender`, `name`)
) ENGINE=InnoDB COMMENT='用户表';
```

创建了两个索引，分别是 `idx_name(name)` 和 `idx_gender_name(gender, name)`。

### 第一次查询

```sql
SELECT * FROM user WHERE gender = 0 AND name = '一灯';
```

EXPLAIN 结果显示，优先使用了 `idx_gender_name` 的联合索引，因为 WHERE 条件中刚好有 `gender` 和 `name` 两个字段，与联合索引的最左前缀完美匹配。

### 第二次查询（换个参数）

```sql
SELECT * FROM user WHERE gender = 0 AND name = '张三';
```

这次竟然使用了 `idx_name` 上的索引！同一条 SQL 因为传参不同，而使用了不同的索引。到这里，使用现有工具已经无法分析：MySQL 优化器为什么使用了 `idx_name` 而没有使用 `idx_gender_name`？只能请今天的主角——**optimizer_trace** 出场了。

## 使用 optimizer_trace 分析

使用 **optimizer_trace** 查看优化器的选择过程：

```sql
SELECT * FROM information_schema.OPTIMIZER_TRACE;
```

输出结果共有 4 列：

| 列名 | 说明 |
| :--- | :--- |
| **QUERY** | 我们执行的查询语句 |
| **TRACE** | 优化器生成执行计划的过程（重点关注） |
| **MISSING_BYTES_BEYOND_MAX_MEM_SIZE** | 被截断的优化过程信息字节数 |
| **INSUFFICIENT_PRIVILEGES** | 是否有权限查看优化过程，0 表示有权限，1 表示没有 |

### 解读 TRACE 列：索引选择过程

TRACE 列的 JSON 内容量很大，我们重点分析 **range_scan_alternatives** 部分，这部分展示了优化器的索引选择过程。该部分包含以下关键字段：

| 字段 | 说明 |
| :--- | :--- |
| **index** | 索引名称 |
| **ranges** | 查询范围 |
| **index_dives_for_eq_ranges** | 是否用到索引潜水的优化逻辑 |
| **rowid_ordered** | 结果是否按主键排序 |
| **using_mrr** | 是否使用 Multi-Range Read 优化 |
| **index_only** | 是否使用了覆盖索引 |
| **in_memory** | 使用内存大小 |
| **rows** | 预估扫描行数 |
| **cost** | 预估成本大小，值越低越好 |
| **chosen** | 是否被选中 |
| **cause** | 未被选择的原因，cost 过高即成本过高 |

```mermaid
flowchart TD
    Start["SQL 语句进入优化器"] --> Parse["解析 SQL\n提取 WHERE/JOIN 条件"]
    Parse --> Candidates["收集可用索引"]
    Candidates --> Loop["遍历每个候选索引"]
    Loop --> Calc["计算索引代价 cost\n基于统计信息和代价模型"]
    Calc --> Store["记录索引评估结果\nrange_scan_alternatives"]
    Store --> Next{"还有索引？"}
    Next -- 是 --> Loop
    Next -- 否 --> Compare["对比所有候选索引的 cost"]
    Compare --> Select["选择 cost 最低的索引"]
    Select --> Plan["生成最终执行计划"]
    
    Calc -. "cost 包含\nrows 预估 + I/O 开销 + CPU 开销" -. Compare
```

> **💡 核心提示**：优化器选择索引的依据是 **cost（代价）**，代价 = I/O 成本 + CPU 成本。优化器会估算使用每个索引需要扫描的行数（rows），再乘以单位行的 I/O 和 CPU 成本，得到总 cost。**cost 值越低的索引越可能被选中**，但这不一定是我们直觉上认为"最优"的索引——因为优化器依赖统计信息的准确性。

从输出结果中可以看到，优化器最终选择了使用 `idx_name` 索引，而 `idx_gender_name` 索引因为 **cost 过高** 没有被选择。这背后的原因可能是：优化器根据表的统计信息（如索引选择性、数据分布）估算出 `idx_name` 能过滤出更少的行数，从而认为 `idx_name` 的代价更低。

## 生产环境避坑指南

| 坑位 | 现象 | 解决方案 |
| :--- | :--- | :--- |
| **内存限制导致信息截断** | `MISSING_BYTES_BEYOND_MAX_MEM_SIZE` 有值，trace 信息不完整 | 调大 `optimizer_trace_max_mem_size`（如设置为 4MB），重新执行查询 |
| **生产环境长时间开启** | 性能开销累积，影响线上 QPS | 仅在诊断会话中临时开启，分析后立即关闭：`SET optimizer_trace = "enabled=off"` |
| **统计信息不准确** | 优化器基于过期的统计信息做出错误选择 | 定期执行 `ANALYZE TABLE` 更新统计信息，确保优化器的代价估算准确 |
| **trace 输出难以理解** | JSON 格式嵌套深，字段繁多 | 关注 `range_scan_alternatives` 和 `cost` 关键字段，使用 JSON 格式化工具查看 |
| **参数绑定导致索引变化** | 同一 SQL 不同参数走了不同索引 | 这是正常现象——优化器根据具体参数值选择性不同索引。可使用 `EXPLAIN FORMAT=JSON` 或 optimizer_trace 逐一分析 |
| **忘记关闭 optimizer_trace** | 会话保持开启状态影响后续查询性能 | 养成分析完毕后立即关闭的习惯，或使用 `SET optimizer_trace = "enabled=off";` 作为诊断脚本的结尾 |

## 总结

| 工具 | 用途 | 精度 | 推荐场景 |
| :--- | :--- | :--- | :--- |
| **EXPLAIN** | 查看执行计划结果 | 索引、连接类型、扫描行数 | 日常 SQL 优化 |
| **EXPLAIN FORMAT=JSON** | 查看更详细的执行计划 | 成本估算、过滤条件 | 深入分析执行计划 |
| **optimizer_trace** | 查看优化器完整决策过程 | 索引选择过程、代价计算细节 | 定位索引选错原因 |

### 行动清单

1. **诊断时临时开启**：`SET optimizer_trace = "enabled=on"`，用完立即关闭。
2. **调大内存限制**：遇到信息截断时，先执行 `SET optimizer_trace_max_mem_size = 4194304`。
3. **重点关注 range_scan_alternatives**：这是索引选择的核心分析区域，对比各索引的 cost。
4. **定期更新统计信息**：执行 `ANALYZE TABLE` 确保优化器的统计信息是最新的。
5. **理解代价模型**：优化器基于 cost 做选择，不要主观认为"一定应该走某个索引"。
6. **扩展阅读**：推荐《MySQL 技术内幕：InnoDB 存储引擎》第 6 章"查询优化"和 MySQL 官方文档 "The Optimizer Trace"。
