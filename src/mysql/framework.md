很多开发同学对SQL优化如数家珍，却对MySQL架构一知半解。岂不是只见树叶，不见森林，终将陷入细节中不能自拔。
今天就一块学习MySQL分层架构，深入了解MySQL底层实现原理，以及每层的作用，我们常见的SQL优化到底在哪一层做了优化？
## 1. MySQL整体架构
由图中可以看到MySQL架构主要分为**Server层**和**存储引擎层**。
**Server层**又分为连接器、缓存、分析器、优化器、执行器。所有跨存储引擎的功能都在这层实现，比如：函数、存储过程、触发器、视图等。
**存储引擎**是可插拔式的，常见的存储引擎有MyISAM、InnoDB、Memory等，MySQL5.5之前默认的是MyISAM，之后默认的是InnoDB。
![image-1.png](https://javabaguwen.com/img/MySQL%E6%9E%B6%E6%9E%84.png)

## 2. 连接器
连接器主要用来管理客户端的连接和用户身份认证。
客户端与Server端的连接采用的是TCP协议，经过TCP握手，建立连接之后，连接器开始进行身份验证。
```
> mysql -hlocalhost -P3306 -uroot -p
```
![image-2.png](https://javabaguwen.com/img/MySQL%E8%BF%9E%E6%8E%A5%E5%99%A8.png)
如果认证失败，就会出现错误 **ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)**。
可以通过 **show processlist** 命令查看系统所有连接的信息：

其中Commond列表示连接状态，Daemon表示后台进程，Query表示查询，Sleep表示空闲连接。
## 3. 查询缓存
客户端请求不会直接去存储引擎查询数据，而是先在缓存中查询结果是否存在。如果结果已存在，直接返回，否则再执行一遍查询流程，查询结束后把结果再缓存起来。
如果数据表发生更改，将清空失效缓存，例如 insert、update、delete、alter操作等。
对于频繁变更的数据表来说，缓存命中率很低。使用缓存反而降低了读写性能，所以在MySQL8.0以后就移除了缓存模块。
可以通过下面命令查看是否开启了缓存：
![image-3.png](https://javabaguwen.com/img/MySQL%E7%BC%93%E5%AD%98.png)

## 4. 分析器
分析器主要对SQL语句进行**词法分析**和**语法分析**。
首先进行词法分析，分析出MySQL的关键字、以及每个词语代表的含义。然后进行语法分析，检测SQL语句是否符合MySQL语法要求。
MySQL通过识别字符串中列名、表名、where、select/update/insert 等MySQL关键字，在根据语法规则判断sql是否满足语法，最终会生成一个抽象语法树(AST)。
比如：SQL语句中少写个where关键字，就会提示错误。
```
mysql> select * from user id=1;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '=1' at line 1
```

## 5. 优化器
在真正执行SQL语句之前，还需要经过优化器处理。
我们熟知的执行计划（Explain）就是优化器生成的。
优化器主要有两个作用：**逻辑优化**和**物理优化**。
逻辑优化主要进行等价谓词重写、条件化简、子查询消除、连接消除、语义优化、分组合并、选择下推、索引优化查询、表查询替换视图查询、Union替换or操作等。
物理优化主要作用是通过贪婪算法，根据代价估算模型，估算出每种执行方式的代价。并使用索引优化表连接，最终生成查询执行计划。
附上MySQL优化器架构图，可以清晰的看到优化过程：
![image-4.png](https://javabaguwen.com/img/MySQL%E4%BC%98%E5%8C%96%E5%99%A8.png)
如果想知道优化器估算结果信息，可以通过Explain查看，关注一灯，下篇文章会详细讲解Explain具体用法。
## 6. 执行器
在优化器优化完SQL，并生成了执行计划后，就会把执行计划传递给执行器。
执行器调用存储引擎接口，真正的执行SQL查询。获取到存储引擎返回的查询结果，并把结果返回给客户端，至此SQL语句执行结束。
## 7. 总结
本篇文章主要带大家了解了MySQL分层架构，以及每层的架构的作用。可以看出MySQL每层架构分工明确、逻辑清晰，深刻地体现了架构设计中“高内聚，低耦合”的设计思想。我们平时在做架构设计的时候，也要多学习一下这种分层架构的设计思想。
