好的，各位中高级Java工程师朋友们！

在上一篇文章中，我们深入探讨了 Apache Pulsar 的架构设计，特别是其存储与计算分离的核心理念，以及 Broker、BookKeeper、Ledger、Subscription 等关键概念。理解 Pulsar 的架构原理，是掌握其强大之处的基础。然而，将理论转化为实践，知道如何在 Java 应用中正确地使用 Pulsar 客户端进行消息的生产和消费，并配置各种高级特性，同样至关重要。

本篇文章将作为上一篇的实践篇，带领大家从架构走向代码，详细讲解如何在 Java 中使用 Pulsar Client，并结合代码示例和配置，深入理解各种使用方式背后的原理和最佳实践。这对于将 Pulsar 应用于实际项目、解决使用中的问题、并自信应对面试官考察你的实战能力至关重要。

今天，我们就来动手实践，看看如何在 Java 世界里驾驭 Apache Pulsar！

---

## Apache Pulsar 使用教程：从架构到实践，构建高效消息应用

### 引言：从架构原理到代码实现

理解一个分布式系统的架构能帮助我们知其所以然，但掌握其使用方式才能真正将技术落地。Apache Pulsar 的强大之处，最终都要通过其客户端 API 在我们的应用中体现。

本篇文章旨在：

* 提供使用 Pulsar Java Client 进行消息生产和消费的详细指南。
* 结合代码示例和配置，讲解常用功能的使用方式。
* 将使用中的配置和 API 与之前讲解的架构概念（如持久性、订阅类型、Cursor）关联起来。
* 帮助开发者将 Pulsar 架构理解转化为实际开发和问题排查能力。
* 为应对面试中关于 Pulsar 使用和实践的问题做准备。

在开始之前，请确保你已经理解了 Pulsar 的核心概念和架构设计（建议先阅读我们之前的相关文章）。

### 前置知识回顾 (简要)

* **Broker：** 无状态计算层，处理客户端请求。
* **BookKeeper：** 有状态存储层，存储消息的 Ledger。
* **Topic：** 消息的逻辑分类，可分区 (Partitioned Topic)。
* **Subscription：** 消费者组消费 Topic 的方式，有多种类型 (Exclusive, Shared, Failover, Key_Shared)。
* **Cursor：** 持久化存储在 BookKeeper 中的消费进度。
* **Ledger & Entry：** BookKeeper 中的存储单元。

### Pulsar Java Client 环境搭建

1.  **添加依赖：** 在 Maven 或 Gradle 项目中添加 Pulsar Java Client 依赖。
    ```xml
    <dependency>
        <groupId>org.apache.pulsar</groupId>
        <artifactId>pulsar-client</artifactId>
        <version>2.11.0</version> </dependency>
    ```
    *注意：如果使用 Pulsar 2.8.0 及以上版本，推荐使用 `pulsar-client-all` 依赖以简化依赖管理。*

2.  **连接 Pulsar 集群：** 使用 `PulsarClient` 连接到 Pulsar 集群。`serviceUrl` 指向 Pulsar Broker 的地址。
    ```java
    import org.apache.pulsar.client.api.PulsarClient;
    import org.apache.pulsar.client.api.PulsarClientException;

    // 你的 Pulsar 集群地址
    String serviceUrl = "pulsar://localhost:6650"; // 或 pulsar+ssl://...

    PulsarClient client = null;
    try {
        client = PulsarClient.builder()
                .serviceUrl(serviceUrl)
                // 可选配置：认证、连接超时、操作超时、线程池等
                // .authentication(AuthenticationFactory.token("your-auth-token"))
                // .connectionTimeout(30, TimeUnit.SECONDS)
                // .operationTimeout(30, TimeUnit.SECONDS)
                .build();
        System.out.println("Pulsar Client created successfully.");
    } catch (PulsarClientException e) {
        System.err.println("Failed to create Pulsar Client: " + e.getMessage());
        e.printStackTrace();
    }

    // ... 使用 client 创建 Producer 或 Consumer

    // 应用关闭时关闭 client
    // if (client != null) {
    //     client.close();
    // }
    ```

3.  **认证 (Authentication)：** 如果 Pulsar 集群开启了认证，需要在构建 `PulsarClient` 时进行配置，例如使用 Token 认证或 TLS 认证。

### Topic 管理与类型 (简要)

* **命名规范：** Pulsar 的 Topic 名称格式为 `{persistent|non-persistent}://tenant/namespace/topic`。
    * `persistent` 或 `non-persistent`：指定消息是否需要持久化存储。
    * `tenant`：租户名称。
    * `namespace`：命名空间名称。
    * `topic`：主题名称。
    * 例如：`persistent://public/default/my-first-topic`。
* **分区 Topic (Partitioned Topic)：** 为了实现水平扩展，Topic 可以被分区。一个分区 Topic 包含多个内部 Topic（分区），数据分布在这些分区上。在创建生产者或消费者时，直接使用分区 Topic 的名称，Client 会自动与各个分区交互。
* **创建 Topic：** 当生产者第一次连接到 Topic 时，如果 Topic 不存在，Pulsar 会自动创建它（默认非分区 Topic）。也可以使用 Pulsar Admin Client 或命令行工具显式创建分区 Topic 并指定分区数量。

### 生产者 (Producer) 使用方式详细

生产者负责创建消息并发送到 Topic。

1.  **创建 Producer：** 使用 `PulsarClient` 构建 `Producer` 实例，指定要发送消息的 Topic。
    ```java
    import org.apache.pulsar.client.api.Producer;
    import org.apache.pulsar.client.api.Schema; // 用于指定消息体 Schema

    String topicName = "persistent://public/default/my-topic";

    Producer<byte[]> producer = null; // 默认使用 byte[] 作为消息体类型
    // Producer<String> stringProducer = null; // 使用 String Schema
    // Producer<MyPojo> pojoProducer = null; // 使用 Pojo Schema

    try {
        producer = client.newProducer()
                .topic(topicName)
                .producerName("my-producer-001") // 可选，指定生产者名称
                // 更多配置选项...
                .create();
        System.out.println("Producer created for topic: " + topicName);
    } catch (PulsarClientException e) {
        System.err.println("Failed to create producer: " + e.getMessage());
    }
    ```

2.  **发送选项 (Configuration)：** 在创建 Producer 时可以配置多种发送行为。
    * `enableBatching(boolean)`: 是否开启批量发送（默认 true）。将多条消息聚合成一批发送，减少网络请求次数，提高吞吐。
    * `batchingMaxMessages(int)`: 批量发送最大消息数。
    * `batchingMaxPublishDelay(long, TimeUnit)`: 批量发送最大等待时间。
    * `compressionType(CompressionType)`: 消息压缩类型 (LZ4, ZLIB, ZSTD, SNAPPY)。
    * **`acks(int)`:** 消息发送的确认机制。**关联 BookKeeper 持久性**。
        * `0`：不等待 Broker 确认，发送即返回成功。**吞吐量最高，但可能丢消息。**
        * `1`：等待 Leader Bookie 写入成功。**性能次之，Leader Bookie 故障可能丢消息。**
        * `all` (或 `-1`)：等待配置的写法定人数 (Write Quorum) 个 Bookie 节点写入成功。**可靠性最高，能保证已确认消息不丢失。** 默认值通常根据 BookKeeper 集群配置决定。
    * `messageRoutingMode(MessageRoutingMode)`: 消息路由模式 (RoundRobinPartition, SinglePartition, ConsistentHashing). 如何选择分区发送。
    * `messageKey(String)` / `messageKeyBytes(byte[])`: 设置消息 Key。用于消息路由到指定分区（Key 的 Hash）或顺序消息。
    * `properties(Map<String, String>)`: 设置消息属性（Metadata），用于过滤、业务标识等。

3.  **发送消息方式：**
    * **同步发送 (`send(byte[] message)`)：** 阻塞当前线程，直到消息成功发送（或失败）。适用于对发送结果强感知、对吞吐要求不极致的场景。
        ```java
        try {
            MessageId msgId = producer.send("Hello Pulsar - Sync!".getBytes());
            System.out.println("Message sent successfully: " + msgId);
        } catch (PulsarClientException e) {
            System.err.println("Message send failed: " + e.getMessage());
        }
        ```
    * **异步发送 (`sendAsync(byte[] message)`)：** 立即返回一个 `CompletableFuture`，发送操作在后台执行。适用于需要高吞吐的场景，通过注册回调处理结果。
        ```java
        producer.sendAsync("Hello Pulsar - Async!".getBytes()).thenAccept(msgId -> {
            System.out.println("Message sent successfully (async): " + msgId);
        }).exceptionally(e -> {
            System.err.println("Message send failed (async): " + e.getMessage());
            return null;
        });
        ```
    * **单向发送 (`sendAsync(byte[] message).get()` 或 `sendAsync(byte[] message).exceptionally(...)`)：** 异步发送，但可以阻塞等待结果 (`get()`) 或只关注异常 (`exceptionally()`)。

4.  **消息 Key, Properties 的使用：**
    * 发送顺序消息：确保相同 Key 的消息发送到同一个分区，Producer 配置 `messageRoutingMode(MessageRoutingMode.HashingStickinessConsistency)` 或默认模式。
    * 消息过滤：消费者可以根据消息 Key 或 Properties 进行过滤。
    * 业务标识：在 Properties 中携带业务相关信息。

### 消费者 (Consumer) 使用方式详细

消费者负责订阅 Topic 并接收消息。

1.  **创建 Consumer：** 使用 `PulsarClient` 构建 `Consumer` 实例，指定要订阅的 Topic(s) 和**订阅信息**。
    ```java
    import org.apache.pulsar.client.api.Consumer;
    import org.apache.pulsar.client.api.SubscriptionType; // 导入订阅类型

    String topicName = "persistent://public/default/my-topic";
    String subscriptionName = "my-subscription"; // 订阅名称，用于追踪消费进度

    Consumer<byte[]> consumer = null; // 默认使用 byte[] 消息体
    // Consumer<String> stringConsumer = null;
    // Consumer<MyPojo> pojoConsumer = null;

    try {
        consumer = client.newConsumer()
                .topic(topicName) // 订阅单个 Topic
                // .topics(Arrays.asList("topic1", "topic2")) // 订阅多个 Topic
                .subscriptionName(subscriptionName) // 指定订阅名称
                .subscriptionType(SubscriptionType.Shared) // **重点：指定订阅类型！**
                // .autoCommitAcknowledgement(true) // 自动 Ack (默认 true)
                // 更多配置选项...
                .subscribe();
        System.out.println("Consumer created for topic: " + topicName + ", subscription: " + subscriptionName);
    } catch (PulsarClientException e) {
        System.err.println("Failed to create consumer: " + e.getMessage());
    }
    ```

2.  **创建 Consumer 时指定订阅类型 (重点)：** **关联架构中订阅类型详解。** 这是 Pulsar 的关键特性，决定了消息如何投递给消费组内的消费者实例以及如何分配 Partition 的消费权。
    * **`SubscriptionType.Exclusive` (独占)：** 只有一个消费者连接到此订阅。适用于严格顺序处理或主备模式。
    * **`SubscriptionType.Shared` (共享)：** 多个消费者可以连接到此订阅，消息在消费者间轮询分发。适用于并行处理和负载均衡，支持自动扩展。
    * **`SubscriptionType.Failover` (失效转移)：** 多个消费者连接，但只有一个主消费者接收所有消息。其他消费者备用，主消费者失败后自动切换。适用于主备高可用场景。
    * **`SubscriptionType.Key_Shared` (键共享)：** 多个消费者连接，相同 Key 的消息投递给同一个消费者。保证基于 Key 的局部顺序，并支持并行。
    * **选择依据：** 根据业务对消息顺序性、并行处理、高可用模式的需求选择。Shared 是最常用的通用模式。

3.  **接收消息方式：**
    * **同步接收 (`receive()`)：** 阻塞当前线程，直到收到一条消息。适用于简单场景或批量处理。
        ```java
        try {
            Message<byte[]> msg = consumer.receive();
            System.out.println("Received message: " + new String(msg.getData()));
            // 消息处理完成后，发送确认
            consumer.acknowledge(msg); // 手动 Ack
            // consumer.acknowledgeAsync(msg); // 异步 Ack
        } catch (PulsarClientException e) {
            System.err.println("Failed to receive message: " + e.getMessage());
        }
        ```
    * **异步接收 (`receiveAsync()`)：** 立即返回 `CompletableFuture`，接收操作在后台执行。适用于非阻塞应用。
        ```java
        consumer.receiveAsync().thenAccept(msg -> {
            System.out.println("Received message (async): " + new String(msg.getData()));
            // 消息处理完成后，发送确认
            consumer.acknowledgeAsync(msg);
        }).exceptionally(e -> {
            System.err.println("Failed to receive message (async): " + e.getMessage());
            return null;
        });
        // 需要循环或事件循环来持续接收异步消息
        ```
    * **使用 MessageListener：** 在创建 Consumer 时注册一个 `MessageListener`，当收到消息时回调监听器方法。这是 Push 模式消费的底层实现。
        ```java
        import org.apache.pulsar.client.api.MessageListener;

        consumer = client.newConsumer()
                .topic(topicName)
                .subscriptionName(subscriptionName)
                .subscriptionType(SubscriptionType.Shared)
                .messageListener(new MessageListener<byte[]>() {
                    @Override
                    public void received(Consumer<byte[]> consumer, Message<byte[]> msg) {
                        try {
                            System.out.println("Received message (listener): " + new String(msg.getData()) + ", ID: " + msg.getMessageId());
                            // 消息处理完成后，发送确认
                            consumer.acknowledge(msg); // listener 中通常使用此方式 Ack
                        } catch (Exception e) {
                            System.err.println("Error processing message: " + e.getMessage());
                            // 处理失败，发送否定确认，消息会重投 (可能进入 DLQ)
                            consumer.negativeAcknowledge(msg);
                        }
                    }
                })
                .subscribe();
        // 在 listener 模式下，主线程通常无需 receive()，只需保持应用运行
        ```

4.  **消息确认 (Acknowledgement) - 关键：** **为什么需要 Ack?** Ack 是消费者向 Broker 发送的信号，表示该消息已经被成功处理。Broker 收到 Ack 后，会更新该订阅的 Cursor (游标)，标记该消息及其之前的所有消息为已消费。这是保证消息**不重复投递**和**追踪消费进度**的关键。如果消息未 Ack，Broker 会认为消息未被成功处理，在一定条件下（如消费者断开连接、重平衡、否定确认）会将消息**重投**给其他消费者或同一消费者。Ack 是**原子性**的，Ack 某个 Offset 意味着该 Offset 及其之前的所有消息都被标记为已消费。**关联 Cursor 更新到 BookKeeper**：消费者提交的 Ack 信息最终会被 Broker 持久化到 BookKeeper 中该订阅对应的 Cursor 位置，保证消费进度的不丢失。
    * `acknowledge(MessageId msgId)` / `acknowledge(Message<T> msg)`：手动确认单条消息。
    * `acknowledgeAsync(MessageId msgId)` / `acknowledgeAsync(Message<T> msg)`：异步手动确认单条消息。
    * `acknowledgeCumulative(MessageId msgId)`：累计确认，确认该 MessageId 及其之前所有未确认的消息。
    * `negativeAcknowledge(MessageId msgId)` / `negativeAcknowledge(Message<T> msg)`：否定确认。告诉 Broker 该消息处理失败，Broker 会在稍后**重投**这条消息。
    * `redeliverUnacknowledgedMessages()`：手动触发重投所有之前未确认的消息（通常在处理失败后调用）。
    * **自动 Ack vs 手动 Ack：** `autoCommitAcknowledgement(boolean)` (默认 true) 开启自动确认。自动确认在消费者**接收**到消息后自动发送 Ack，**可能导致消息在未处理成功时丢失**。强烈建议**禁用自动确认**，使用**手动确认**，在**消息处理成功后**再发送 Ack，保证 At-least-once 语义。

### Pulsar 高级功能使用 (代码/配置示例)

* **顺序消息：**
    * 生产者：发送消息时设置 `messageKey`。Producer 配置使用基于 Key 的路由模式（如默认模式或 `messageRoutingMode(MessageRoutingMode.HashingStickinessConsistency)`）。
    * 消费者：使用 **`SubscriptionType.Key_Shared` 订阅**。
    * **关联：** 确保相同 Key 消息进入同一 Partition，Key_Shared 订阅确保相同 Key 消息始终由同一个消费者处理。
* **定时/延时消息：**
    * 生产者：发送消息时设置消息的延时投递属性。
        ```java
        producer.newMessage()
                .value("Delayed message".getBytes())
                .deliverAfter(10, TimeUnit.MINUTES) // 延迟 10 分钟投递
                // 或 .deliverAt(timestamp) // 指定一个具体的时间戳投递
                .send();
        ```
    * **原理：** 消息发送后，Broker 不会立即将消息指针放入 ConsumeQueue，而是存放在一个延时消息的内部结构中，到期后再放入 ConsumeQueue。
* **死信队列 (DLQ)：** Pulsar 支持自动将多次消费失败（如多次否定确认 `negativeAcknowledge` 或多次重试后仍未 Ack）的消息发送到死信队列。
    * **配置：** 在 Consumer 构建器中配置 `deadLetterPolicy`。
        ```java
        consumer = client.newConsumer()
                .topic(topicName)
                .subscriptionName(subscriptionName)
                .subscriptionType(SubscriptionType.Shared)
                .enableRetry(true) // 开启重试 (默认 true)
                .deadLetterPolicy(DeadLetterPolicy.newBuilder()
                        .maxRedeliverCount(3) // 最大重试次数
                        .deadLetterTopic("persistent://public/default/my-dlq-topic") // 死信 Topic 名称
                        .build())
                .subscribe();
        ```
    * **原理：** 当消息重试次数达到阈值，Broker 会将其发送到配置的死信 Topic。
* **消息过滤：**
    * **Broker 端过滤 (按 Tag 或 SQL92)：** 生产者发送时设置 `Tag` 或 `Properties`。消费者订阅时使用 `messageSelector` (SQL92 语法) 或 `subscriptionTopicsMode(SubscriptionTopicsMode.TAG)` (Tag 过滤模式)。
    * **消费者端过滤：** 在消费者接收到消息后，根据业务逻辑进行过滤。

### 在 Spring Boot 中集成 Pulsar (推荐方式)

在 Spring Boot 应用中，推荐使用 Spring Cloud Stream Binder for Pulsar 或第三方的 Pulsar Spring Boot Starter，它们提供了自动配置和便捷的 Spring 集成。

1.  **添加依赖：** 引入 Spring Boot Parent POM，然后添加 Pulsar Spring Boot Starter 依赖（例如 Spring Cloud Alibaba RocketMQ/Pulsar Starter 或社区的 Pulsar Starter）。
    ```xml
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-stream-rocketmq</artifactId> </dependency>
    ```
    *注意：目前 Spring Cloud 官方没有直接提供 Pulsar Binder，社区有一些实现。如果使用 Spring Cloud Alibaba，他们有 RocketMQ 的 Starter，但直接的 Pulsar Starter 可能需要查找社区项目或 Spring Cloud Stream 的 Binder。*

2.  **配置：** 在 `application.yml` 中配置 Pulsar 连接信息、生产者和消费者属性。Starter 会自动配置 `PulsarClient` Bean。
    ```yaml
    # application.yml
    spring:
      pulsar: # 或其他 starter 定义的配置前缀
        client:
          service-url: pulsar://localhost:6650
          # 其他客户端配置
        producer:
          # 全局生产者配置
          # send-timeout: 10s
        consumer:
          # 全局消费者配置
          # auto-commit-acknowledgement: false # 禁用自动 Ack

    # Spring Cloud Stream 配置 (如果使用 Spring Cloud Stream Binder)
    # spring:
    #   cloud:
    #     stream:
    #       bindings:
    #         inputChannel:
    #           destination: my-topic
    #           group: my-subscription # 订阅名称
    #           consumer:
    #             enable-dlq: true # 启用 DLQ
    #             max-attempts: 3 # 最大重试
    #             subscription-type: shared # 订阅类型
    #         outputChannel:
    #           destination: another-topic
    #       rocketmq: # 或 pulsar (取决于 Binder)
    #         binder:
    #           name-server: localhost:9876 # RocketMQ NameServer (示例)
    #         bindings:
    #           inputChannel:
    #             consumer:
    #               subscription: my-subscription # 订阅名称
    #               consumeMode: CLUSTERING # 集群消费
    #               subscriptionType: SHARE # RocketMQ Starter 中的订阅类型定义
    ```

3.  **使用：** 注入自动配置的 `PulsarClient` Bean 或 `RocketMQTemplate` (取决于 Starter)，或者使用 Spring Cloud Stream 定义的 Source/Sink 接口。

### 理解 Pulsar 使用方式的价值

* **将架构知识转化为实践：** 将对 Pulsar 架构的理解应用于实际的客户端配置和代码编写中。
* **灵活使用 Pulsar 特性：** 掌握多种订阅模式、Ack 机制、定时消息、DLQ 等核心功能的使用。
* **提高代码质量和可靠性：** 知道如何正确配置生产者 Ack 和消费者 Ack，避免消息丢失和重复。
* **深入对比选型：** 通过实际使用了解 Pulsar 的操作体验和功能特点，为与其他 MQ 的选型对比提供实践依据。
* **应对面试：** 面试官常会结合实际使用场景来考察对 Pulsar 的掌握程度。

### Pulsar 使用方式为何是面试热点

* **考察实际动手能力：** 会用是基础。
* **考察架构影响用法：** 面试官会问为什么这样配置 Ack？为什么选择这种订阅类型？这要求你将用法与架构原理关联起来。
* **考察核心特性：** 订阅类型、Ack 机制、顺序消息、定时消息等是 Pulsar 的独特或重要特性，常结合使用场景提问。
* **考察与 Spring 的集成：** 考察在 Java 主流框架中使用 Pulsar 的能力。

### 面试问题示例与深度解析

* **如何在 Java 中连接到 Pulsar 集群？需要哪些核心配置？** (回答 `PulsarClient.builder().serviceUrl(...)`，配置服务地址，可选认证)
* **请描述一下在 Java 中创建 Pulsar Producer 的过程。有哪些重要的配置选项？** (回答 `client.newProducer().topic(...).create()`。重要配置：`acks`, `enableBatching`, `messageRoutingMode`, `messageKey`)
* **Producer 的 `acks` 参数有什么作用？设置为 `all` 有什么意义？它与 BookKeeper 的持久性有什么关系？** (**核心！** 回答确认机制，`acks=all` 等待写法定人数 Bookie 确认。关系：保证消息写入 BookKeeper 集群的持久性)
* **请描述一下在 Java 中创建 Pulsar Consumer 的过程。需要指定哪些核心信息？** (回答 `client.newConsumer().topic(...).subscriptionName(...).subscriptionType(...).create()`。核心信息：Topic(s), Subscription Name, Subscription Type)
* **Pulsar 的订阅 (Subscription) 有哪几种类型？请说明在 Java 中如何创建 Consumer 时指定订阅类型？你通常会根据什么来选择订阅类型？** (**核心！** 回答四种类型：Exclusive, Shared, Failover, Key_Shared。在 `client.newConsumer().subscriptionType(...)` 指定。选择依据：对消息顺序、并行、高可用的需求)
* **请解释一下 Pulsar 的消息确认 (Acknowledgement) 机制。为什么需要 Ack？在 Java 中如何手动发送 Ack？如何处理消费失败的消息？** (**核心！** 回答 Ack 是消费者处理成功的信号，Broker 收到更新 Cursor，保证不重复投递。手动 Ack：`consumer.acknowledge(msg)` 或 `acknowledgeAsync(msg)`)。失败：`negativeAcknowledge` 或不 Ack，Broker 重投)
* **消息确认 (Ack) 后，在 Pulsar 的架构底层发生了什么？** (Ack 信息发送给 Broker，Broker 更新该订阅在 BookKeeper 中的 Cursor 位置，持久化消费进度)
* **如何在 Java 中发送顺序消息？需要 Producer 和 Consumer 端如何配合？** (Producer 发送时设置 `messageKey`，并使用 Key 路由模式。Consumer 使用 `SubscriptionType.Key_Shared` 订阅)
* **如何在 Java 中发送延时或定时消息？** (Producer 发送时设置 `deliverAfter` 或 `deliverAt` 属性)
* **Spring Boot 应用如何集成 Pulsar？需要哪些依赖和配置？** (引入 Pulsar Starter，配置 `serviceUrl` 等，通常自动配置 `PulsarClient`，注入使用)

### 总结

掌握 Apache Pulsar 的 Java Client 使用方式，是将对 Pulsar 架构的理解转化为实际开发能力的关键。通过 `PulsarClient` 构建 Producer 和 Consumer，配置各种发送和接收选项，特别是正确地选择**订阅类型**和处理**消息确认 (Ack)**，是构建可靠、高效 Pulsar 应用的核心。

理解各种使用方式背后的原理（如 `acks` 与 BookKeeper 持久性、订阅类型与 Partition 分配、Ack 与 Cursor 更新）能够帮助你更灵活地运用 Pulsar 特性，排查问题，并在面试中展现出扎实的实践功底。

希望这篇技术文章能帮助你将 Pulsar 的架构知识与 Java 客户端使用完美结合，熟练驾驭 Pulsar 构建高效消息应用！感谢您的阅读。