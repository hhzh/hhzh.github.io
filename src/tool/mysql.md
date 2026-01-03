MySQL工作中常用SQL语句

## 0. 查询语句
```sql
select * from user order by id desc;
select * from user where status = 0 order by id desc;
select age, count(*) from user group by age order by age;
select * from user where status = 0 and create_time >= '2026-01-01' order by id desc;
select DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as ct from user group by ct order by ct;
```

## 1. 建表

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

## 2. 添加字段

```sql
ALTER TABLE `user` ADD COLUMN `age` tinyint unsigned NOT NULL DEFAULT '0' COMMENT '年龄' after `name`;
```

## 3. 修改字段

```sql
ALTER TABLE `user` MODIFY `age` int unsigned NOT NULL DEFAULT '0' COMMENT '年龄';
```

## 4. 添加索引

```sql
ALTER TABLE `user` ADD INDEX `idx_name` (`name`);
ALTER TABLE `user` ADD INDEX `idx_name_age` (`name`,`age`);
ALTER TABLE `user` ADD UNIQUE INDEX `uk_name_age` (`name`,`age`);
```

## 5. 删除索引

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

