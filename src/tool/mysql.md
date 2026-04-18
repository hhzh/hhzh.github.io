## 引言

MySQL 是 Java 开发者每天打交道最多的关系型数据库。但你是否注意过，一条简单的 `ALTER TABLE` 在千万级表上执行可能会锁表半小时？一个漏掉 `EXPLAIN` 的 SQL 上线后直接拖垮整个数据库？本文整理 MySQL 日常开发中最常用的 SQL 语句模板和操作指南，涵盖查询、建表、字段变更、索引管理、数据操作、事务和函数。无论你是刚接触 MySQL 的新手，还是需要快速查阅常用语法的中高级开发者，这篇指南都能帮你提升日常开发效率。

## 查询语句
```sql
select * from user order by id desc;
select * from user where status = 0 order by id desc;
select age, count(*) from user group by age order by age;
select * from user where status = 0 and create_time >= '2026-01-01' order by id desc;
select DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as ct from user group by ct order by ct;
```

## 建表

```sql
CREATE TABLE `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '姓名',
  `salary` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '薪水',
  `status` tinyint NOT NULL DEFAULT '0' COMMENT '状态，-1:已删除 0:正常 1:冻结',
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
  `modify_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
```

## 添加字段

```sql
ALTER TABLE `user` ADD COLUMN `age` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '年龄' after `name`;
```

## 修改字段

```sql
ALTER TABLE `user` MODIFY `age` int unsigned NOT NULL DEFAULT '0' COMMENT '年龄';
```

## 添加索引

```sql
ALTER TABLE `user` ADD INDEX `idx_name` (`name`);
ALTER TABLE `user` ADD INDEX `idx_name_age` (`name`,`age`);
ALTER TABLE `user` ADD UNIQUE INDEX `uk_name_age` (`name`,`age`);
```

## 删除索引

```mysql
ALTER TABLE table_name DROP INDEX index_name;
```

## 6. 设置不自动提交事务

```mysql
# 查看是否自动提交
show variables like 'autocommit';
# 设置不自动提交
set autocommit = 0;
# 设置自动提交
set autocommit = 1;
```

## 7. 使用存储过程插入数据

```sql
drop PROCEDURE IF EXISTS insertData;
DELIMITER $$
create procedure insertData()
begin
 declare i int default 1;
   while i <= 100000 do
         INSERT into user (name,age) VALUES (CONCAT("name",i), i);
         set i = i + 1; 
   end while; 
end $$

call insertData() $$
```

## 8. 删除字段

```sql
alter table user drop column age;
```

## 9 安装MySQL

> https://dev.mysql.com/downloads/mysql/

## 10. 事务

```mysql
show variables like '%autocommit%';
set autocommit=0;
set autocommit=1;
begin;
commit;
rollback;
```

## 11. 刷新表

```mysql
analyze table user;
```

