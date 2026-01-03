import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/interview/": [
        "README.md",
        "map",
    ],
    "/algo/": [
        {
            text: "算法",
            collapsible: true,
            children: [
                {
                    text: "数字与字符串",
                    link: "algo-string",
                },
                {
                    text: "数组",
                    link: "algo-array",
                },
                {
                    text: "链表",
                    link: "algo-listnode",
                },
                {
                    text: "二叉树",
                    link: "algo-tree",
                },
                {
                    text: "排序算法",
                    link: "algo-sort",
                },
                {
                    text: "其他",
                    link: "algo-other",
                },
                {
                    text: "智力题",
                    link: "brain",
                },
            ]
        },
    ],
    "/tool/": [
        {
            text: "工具清单",
            collapsible: true,
            children: [
                {
                    text: "Git教程",
                    link: "git",
                },
                {
                    text: "CodeReview流程",
                    link: "CodeReview",
                },
                {
                    text: "Guava Cache缓存",
                    link: "GuavaCache",
                },
                {
                    text: "Caffeine Cache缓存",
                    link: "caffeine",
                },
                {
                    text: "Linux常用命令",
                    link: "linux",
                },{
                    text: "Maven用法",
                    link: "Maven",
                },{
                    text: "JUnit用法",
                    link: "JUnit",
                },{
                    text: "Nginx架构设计",
                    link: "nginx",
                },{
                    text: "Intellij IDEA高效使用教程",
                    link: "intellij-idea",
                },{
                    text: "Cursor IDE使用教程",
                    link: "cursor-ide",
                },{
                    text: "Markdown使用教程",
                    link: "markdown",
                },{
                    text: "Mermaid使用教程",
                    link: "Mermaid",
                },{
                    text: "MySQL常用命令",
                    link: "mysql",
                },
            ]
        },
    ],
    "/interview/": [
        {
            text: "面试流程",
            collapsible: true,
            children: [
                {
                    text: "面试流程",
                    link: "flow",
                },
                {
                    text: "制作简历",
                    link: "profile",
                },
                {
                    text: "项目难点",
                    link: "project",
                },
                {
                    text: "面试常见问题",
                    link: "question",
                },
                {
                    text: "如何跟HR谈薪",
                    link: "salary",
                },
            ]
        },
    ],
    "/eq/": [
        {
            text: "程序员的情商课",
            collapsible: false,
            children: [
                {
                    text: "摒弃学生思维",
                    link: "eq-student",
                },
                {
                    text: "如何做年终总结",
                    link: "summary",
                },
                {
                    text: "如何升职加薪",
                    link: "upgrade",
                },
                {
                    text: "新人管理者注意事项",
                    link: "manager",
                },
                {
                    text: "需求问题",
                    link: "eq-product",
                },
                {
                    text: "沟通协作问题",
                    link: "eq-talk",
                },
                {
                    text: "战略规划问题",
                    link: "eq-plan",
                },{
                    text: "个人成长问题",
                    link: "eq-person",
                },{
                    text: "用户与市场问题",
                    link: "eq-user",
                }
            ]
        },
    ],
    "/about/": [
        "about-me",
    ],
    "/": [
        {
            text: "一、前言",
            link: "home",
        },
        {
            text: "二、Java基础",
            collapsible: true,
            prefix: "basic/",
            children: [
                {
                    text: "2.1 Java泛型",
                    link: "generic",
                },
                {
                    text: "2.2 Java反射",
                    link: "reflect",
                },
                {
                    text: "2.3 Java8新特性",
                    link: "java8",
                },
                {
                    text: "2.4 Java8注解",
                    link: "annotation",
                },
                {
                    text: "2.5 值传递与引用传递",
                    link: "delivery",
                },
                {
                    text: "2.6 静态代理与动态代理",
                    link: "proxy",
                },
                {
                    text: "2.7 深拷贝与浅拷贝",
                    link: "copy",
                },
                {
                    text: "2.8 Java异常体系",
                    link: "exception",
                },
            ]
        },
        {
            text: "三、Java进阶",
            collapsible: true,
            children: [
                {
                    text: "Java集合",
                    collapsible: true,
                    prefix: "list/",
                    children: [
                        {
                            text: "ArrayList",
                            link: "ArrayList",
                        },
                        {
                            text: "LinkedList",
                            link: "LinkedList",
                        },
                        {
                            text: "HashMap",
                            link: "HashMap",
                        },
                        {
                            text: "LinkedHashMap",
                            link: "LinkedHashMap",
                        },
                        {
                            text: "TreeMap",
                            link: "TreeMap",
                        },
                        {
                            text: "Set集合",
                            link: "Set",
                        },
                        {
                            text: "CopyOnWriteArrayList",
                            link: "CopyOnWriteArrayList",
                        },
                        {
                            text: "ConcurrentHashMap",
                            link: "ConcurrentHashMap",
                        },
                        {
                            text: "ArrayBlockingQueue",
                            link: "ArrayBlockingQueue",
                        },
                        {
                            text: "LinkedBlockingQueue",
                            link: "LinkedBlockingQueue",
                        },
                        {
                            text: "SynchronousQueue",
                            link: "SynchronousQueue",
                        },
                        {
                            text: "PriorityQueue",
                            link: "PriorityQueue",
                        },
                        {
                            text: "DelayQueue",
                            link: "DelayQueue",
                        },
                        {
                            text: "BlockingQueue合集",
                            link: "BlockingQueue合集",
                        },
                    ],
                },
                {
                    text: "Java并发",
                    collapsible: true,
                    prefix: "concurrency/",
                    children: [
                        {
                            text: "AQS",
                            link: "AQS"
                        },
                        {
                            text: "ReentrantLock",
                            link: "ReentrantLock"
                        },
                        {
                            text: "CountDownLatch",
                            link: "CountDownLatch"
                        },
                        {
                            text: "Semaphore",
                            link: "Semaphore"
                        },
                        {
                            text: "CyclicBarrier",
                            link: "CyclicBarrier"
                        },
                        {
                            text: "ThreadLocal",
                            link: "ThreadLocal"
                        },
                        {
                            text: "线程",
                            link: "Thread"
                        },
                        {
                            text: "线程池",
                            link: "ThreadPool"
                        },
                        {
                            text: "Synchronized",
                            link: "Synchronized"
                        },
                        {
                            text: "volatile",
                            link: "volatile"
                        },
                        {
                            text: "AtomicInteger",
                            link: "AtomicInteger"
                        },
                    ],
                },
            ]
        },
        {
            text: "四、数据库",
            collapsible: true,
            children: [
                {
                    text: "MySQL",
                    collapsible: true,
                    prefix: "mysql/",
                    children: [
                        {
                            text: "4.1 MySQL架构",
                            link: "framework",
                        },
                        {
                            text: "4.2 MySQL存储引擎",
                            link: "engine",
                        },
                        {
                            text: "4.3 索引",
                            link: "index",
                        },
                        {
                            text: "4.4 Explain执行计划",
                            link: "explain",
                        },
                        {
                            text: "4.6 日志",
                            link: "log",
                        },
                        {
                            text: "4.7 慢查询日志",
                            link: "slow",
                        },
                        {
                            text: "4.8 锁",
                            link: "lock",
                        },
                        {
                            text: "4.9 MySQL加锁范围",
                            link: "range",
                        },
                        {
                            text: "4.10 死锁",
                            link: "dead",
                        },
                        {
                            text: "4.11 事务",
                            link: "transaction",
                        },
                        {
                            text: "4.12 主从同步",
                            link: "sync",
                        },
                        {
                            text: "4.13 深分页问题",
                            link: "page",
                        },
                        {
                            text: "4.15 MySQL使用规范",
                            link: "standard",
                        },
                        {
                            text: "4.16 索引下推",
                            link: "push",
                        },
                        {
                            text: "4.17 备份数据",
                            link: "backup",
                        },
                        {
                            text: "4.18 幻读问题",
                            link: "phantom",
                        },
                        {
                            text: "4.19 索引跳跃",
                            link: "skip",
                        },
                        {
                            text: "4.20 锁超时",
                            link: "timeout",
                        },
                        {
                            text: "4.21 分析MySQL性能",
                            link: "performance",
                        },
                        {
                            text: "4.22 在线加字段",
                            link: "online",
                        },
                        {
                            text: "4.23 二阶段提交",
                            link: "second",
                        },
                        {
                            text: "4.24 优化SQL查询流程",
                            link: "optimize",
                        },
                        {
                            text: "4.25 数据库三范式",
                            link: "three",
                        },
                        {
                            text: "4.26 MVCC",
                            link: "mvcc",
                        },
                    ]
                }, {
                    text: "Redis",
                    collapsible: true,
                    prefix: "redis/",
                    children: [
                        {
                            text: "4.1 Redis数据结构",
                            link: "redis-data",
                        },
                        {
                            text: "4.2 Redis批量命令",
                            link: "redis-batch",
                        },
                        {
                            text: "4.3 Redis缓存问题",
                            link: "redis-cache",
                        },
                        {
                            text: "4.4 Redis快的原因",
                            link: "redis-fast",
                        },
                        {
                            text: "4.6 Redis线程模型",
                            link: "redis-thread",
                        },
                        {
                            text: "4.7 Redis大key问题",
                            link: "redis-bigkey",
                        },
                        {
                            text: "4.8 Redis热点key问题",
                            link: "redis-hotkey",
                        },
                        {
                            text: "4.9 Redis持久化",
                            link: "redis-persistent",
                        },
                        {
                            text: "4.10 Redis事务",
                            link: "redis-transaction",
                        },
                        {
                            text: "4.11 Redis集群",
                            link: "redis-cluster",
                        },
                        {
                            text: "4.12 Redis消息队列",
                            link: "redis-mq",
                        },
                        {
                            text: "4.13 Redis分布式锁",
                            link: "redis-lock",
                        }
                    ]
                }
            ]
        },
        {
            text: "五、JVM",
            collapsible: true,
            prefix: "jvm/",
            children: [
                {
                    text: "JVM内存模型",
                    link: "jvm-framework",
                },{
                    text: "JVM性能调优",
                    link: "jvm-optimize",
                },
            ]
        },
        {
            text: "六、框架",
            collapsible: true,
            children: [
                {
                    text: "Spring",
                    collapsible: true,
                    prefix: "spring/",
                    children: [
                        {
                            text: "Spring架构设计",
                            link: "spring-framework",
                        },
                        {
                            text: "Bean生命周期",
                            link: "spring-bean",
                        },
                        {
                            text: "Spring用到哪些设计模式",
                            link: "spring-design",
                        },
                        {
                            text: "Spring常用注解",
                            link: "spring-annotation",
                        },
                        {
                            text: "Spring事务",
                            link: "spring-transaction",
                        },
                        {
                            text: "IOC与AOP区别",
                            link: "spring-ioc-aop",
                        },
                        {
                            text: "Spring循环依赖",
                            link: "spring-depend",
                        }
                    ]
                },
                {
                    text: "SpringBoot",
                    collapsible: true,
                    prefix: "springboot/",
                    children: [
                        {
                            text: "SpringBoot是什么",
                            link: "springboot-what",
                        },
                        {
                            text: "SpringBoot启动流程",
                            link: "springboot-start",
                        },
                        {
                            text: "SpringBoot starter是什么",
                            link: "springboot-starter",
                        },
                        {
                            text: "SpringBoot常用注解",
                            link: "springboot-annotation",
                        }
                    ]
                }, {
                    text: "SpringMVC",
                    collapsible: true,
                    prefix: "SpringMVC/",
                    children: [
                        {
                            text: "SpringMVC架构设计",
                            link: "springmvc-framework",
                        },
                        {
                            text: "SpringMVC工作原理",
                            link: "springmvc-work",
                        },
                        {
                            text: "SpringMVC常用注解",
                            link: "springmvc-annotation",
                        },
                    ]
                }, {
                    text: "SpringCloud",
                    collapsible: true,
                    prefix: "springcloud/",
                    children: [
                        {
                            text: "SpringCloud架构设计",
                            link: "springcloud-framework",
                        },
                        {
                            text: "SpringCloud体系架构选型",
                            link: "springcloud-select",
                        },
                        {
                            text: "Eureka架构设计",
                            link: "springcloud-eureka",
                        },
                        {
                            text: "open feign架构设计",
                            link: "springcloud-feign",
                        },
                        {
                            text: "SpringCloud Gateway架构设计",
                            link: "springcloud-gateway",
                        },
                        {
                            text: "Hystrix架构设计",
                            link: "springcloud-hystrix",
                        },
                        {
                            text: "Ribbon架构设计",
                            link: "springcloud-ribbon",
                        },
                        {
                            text: "Zuul架构设计",
                            link: "springcloud-zuul",
                        },
                    ]
                }, {
                    text: "Dubbo",
                    collapsible: true,
                    prefix: "dubbo/",
                    children: [
                        {
                            text: "Dubbo架构设计",
                            link: "dubbo-framework",
                        },
                    ]
                }, {
                    text: "Netty",
                    collapsible: true,
                    prefix: "netty/",
                    children: [
                        {
                            text: "Netty架构设计",
                            link: "netty-framework",
                        },
                    ]
                }, {
                    text: "ShardingSphere",
                    collapsible: true,
                    prefix: "shardingsphere/",
                    children: [
                        {
                            text: "ShardingSphere架构设计",
                            link: "ShardingSphere-framework",
                        },
                    ]
                }, {
                    text: "zookeeper",
                    collapsible: true,
                    prefix: "zookeeper/",
                    children: [
                        {
                            text: "zookeeper架构设计",
                            link: "zookeeper-framework",
                        },
                    ]
                }, {
                    text: "mybatis",
                    collapsible: true,
                    prefix: "mybatis/",
                    children: [
                        {
                            text: "mybatis架构设计",
                            link: "mybatis-framework",
                        },
                    ]
                }, {
                    text: "nacos",
                    collapsible: true,
                    prefix: "nacos/",
                    children: [
                        {
                            text: "Nacos架构设计",
                            link: "nacos-framework",
                        },
                    ]
                }, {
                    text: "pulsar",
                    collapsible: true,
                    prefix: "pulsar/",
                    children: [
                        {
                            text: "Pulsar架构设计",
                            link: "pulsar-framework",
                        },
                    ]
                }, {
                    text: "grpc",
                    collapsible: true,
                    prefix: "grpc/",
                    children: [
                        {
                            text: "Grpc架构设计",
                            link: "grpc-framework",
                        },
                    ]
                }, {
                    text: "disruptor",
                    collapsible: true,
                    prefix: "disruptor/",
                    children: [
                        {
                            text: "Disruptor架构设计",
                            link: "disruptor-framework",
                        },
                    ]
                }, {
                    text: "elasticsearch",
                    collapsible: true,
                    prefix: "elasticsearch/",
                    children: [
                        {
                            text: "Elasticsearch架构设计",
                            link: "elasticsearch-framework",
                        },
                    ]
                }, {
                    text: "ddd",
                    collapsible: true,
                    prefix: "ddd/",
                    children: [
                        {
                            text: "DDD架构设计",
                            link: "ddd-framework",
                        },
                    ]
                }, {
                    text: "seata",
                    collapsible: true,
                    prefix: "seata/",
                    children: [
                        {
                            text: "Seata架构设计",
                            link: "seata-framework",
                        },
                    ]
                }
            ]
        },
        {
            text: "七、消息队列",
            collapsible: true,
            prefix: "mq/",
            children: [
                {
                    text: "Kafka",
                    collapsible: true,
                    prefix: "kafka/",
                    children: [
                        {
                            text: "Kafka架构设计",
                            link: "kafka-framework",
                        },
                        {
                            text: "Kafka 选举流程",
                            link: "kafka-select",
                        },
                        {
                            text: "Kafka 消息相关问题",
                            link: "kafka-message",
                        },
                    ]
                }, {
                    text: "RocketMQ",
                    collapsible: true,
                    prefix: "rocketmq/",
                    children: [
                        {
                            text: "RocketMQ架构设计",
                            link: "rocketmq-framework",
                        },
                        {
                            text: "RocketMQ事务消息",
                            link: "rocketmq-transaction",
                        },
                    ]
                }, {
                    text: "RabbitMQ",
                    collapsible: true,
                    prefix: "rabbitmq/",
                    children: [
                        {
                            text: "RabbitMQ架构设计",
                            link: "rabbitmq-framework",
                        },
                    ]
                }
            ]
        }
    ],
});
