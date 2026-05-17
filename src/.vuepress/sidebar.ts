import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    "/algo/": [
        {
            text: "算法",
            collapsible: true,
            children: "structure",
        },
    ],
    "/tool/": [
        {
            text: "工具清单",
            collapsible: true,
            children: "structure",
        },
    ],
    "/interview/": [
        {
            text: "面试流程",
            collapsible: true,
            children: "structure",
        },
    ],
    "/eq/": [
        {
            text: "程序员的情商课",
            collapsible: false,
            children: "structure",
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
            children: "structure",
        },
        {
            text: "三、Java进阶",
            collapsible: true,
            children: [
                {
                    text: "Java集合",
                    collapsible: true,
                    prefix: "list/",
                    children: "structure",
                },
                {
                    text: "Java并发",
                    collapsible: true,
                    prefix: "concurrency/",
                    children: "structure",
                },
            ],
        },
        {
            text: "四、数据库",
            collapsible: true,
            children: [
                {
                    text: "MySQL",
                    collapsible: true,
                    prefix: "mysql/",
                    children: "structure",
                },
                {
                    text: "Redis",
                    collapsible: true,
                    prefix: "redis/",
                    children: "structure",
                },
            ],
        },
        {
            text: "五、JVM",
            collapsible: true,
            prefix: "jvm/",
            children: "structure",
        },
        {
            text: "六、框架",
            collapsible: true,
            children: [
                {
                    text: "Spring",
                    collapsible: true,
                    prefix: "spring/",
                    children: "structure",
                },
                {
                    text: "SpringBoot",
                    collapsible: true,
                    prefix: "springboot/",
                    children: "structure",
                },
                {
                    text: "SpringMVC",
                    collapsible: true,
                    prefix: "SpringMVC/",
                    children: "structure",
                },
                {
                    text: "SpringCloud",
                    collapsible: true,
                    prefix: "springcloud/",
                    children: "structure",
                },
                {
                    text: "Dubbo",
                    collapsible: true,
                    prefix: "dubbo/",
                    children: "structure",
                },
                {
                    text: "Netty",
                    collapsible: true,
                    prefix: "netty/",
                    children: "structure",
                },
                {
                    text: "ShardingSphere",
                    collapsible: true,
                    prefix: "shardingsphere/",
                    children: "structure",
                },
                {
                    text: "zookeeper",
                    collapsible: true,
                    prefix: "zookeeper/",
                    children: "structure",
                },
                {
                    text: "mybatis",
                    collapsible: true,
                    prefix: "mybatis/",
                    children: "structure",
                },
                {
                    text: "nacos",
                    collapsible: true,
                    prefix: "nacos/",
                    children: "structure",
                },
                {
                    text: "pulsar",
                    collapsible: true,
                    prefix: "pulsar/",
                    children: "structure",
                },
                {
                    text: "grpc",
                    collapsible: true,
                    prefix: "grpc/",
                    children: "structure",
                },
                {
                    text: "disruptor",
                    collapsible: true,
                    prefix: "disruptor/",
                    children: "structure",
                },
                {
                    text: "elasticsearch",
                    collapsible: true,
                    prefix: "elasticsearch/",
                    children: "structure",
                },
                {
                    text: "ddd",
                    collapsible: true,
                    prefix: "ddd/",
                    children: "structure",
                },
                {
                    text: "seata",
                    collapsible: true,
                    prefix: "seata/",
                    children: "structure",
                },
            ],
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
                    children: "structure",
                },
                {
                    text: "RocketMQ",
                    collapsible: true,
                    prefix: "rocketmq/",
                    children: "structure",
                },
                {
                    text: "RabbitMQ",
                    collapsible: true,
                    prefix: "rabbitmq/",
                    children: "structure",
                },
            ],
        },
    ],
});
