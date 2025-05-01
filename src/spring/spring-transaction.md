事务（Transaction）是保障数据一致性的基石。在复杂的业务场景下，一个完整的业务操作往往涉及对多个数据资源的访问和修改。如果这些操作中的任何一步失败，我们希望之前已经成功的步骤能够被撤销，就像这些操作从未发生过一样，从而保证数据的完整性和一致性。

---

## 深度解析 Spring 事务管理：保障数据一致性的艺术

### 引言：事务，保障数据一致性的基石

想象一个最经典的场景：银行转账。需要从账户A扣款，并向账户B加款。这两个操作必须作为一个**不可分割的整体**来执行。如果在A扣款成功后，向B加款失败了（比如网络问题或账户B异常），但A的扣款却没有撤销，那么系统的数据就处于不一致的状态。

这就是事务要解决的核心问题。事务具有以下著名的ACID特性：

* **原子性 (Atomicity)：** 事务是一个不可分割的最小工作单元。要么所有操作都成功，要么所有操作都失败并回滚到事务开始前的状态。如同化学中的原子，不可再分。
* **一致性 (Consistency)：** 事务必须使数据库从一个一致性状态变换到另一个一致性状态。在事务开始之前和结束之后，数据库的完整性约束没有被破坏。
* **隔离性 (Isolation)：** 多个并发事务之间是相互隔离的，互不影响。一个事务的中间状态对其他事务是不可见的。这防止了脏读、不可重复读、幻读等问题。
* **持久性 (Durability)：** 事务一旦提交，其结果就是永久性的，即使系统发生故障也不会丢失。

在传统的 Java EE 开发中，管理事务往往需要侵入到业务代码中，手动获取连接、开启事务、提交或回滚事务、处理异常、关闭连接等，代码冗余且与业务逻辑耦合紧密。

Spring 框架的事务管理正是为了解决这些痛点而生。它提供了一套统一的抽象层，让我们可以用标准化、简洁的方式来管理事务，而无需关心底层是 JDBC、JPA、Hibernate 还是 JTA 等不同的事务 API。

Spring 提供了两种主要的事务管理方式：**编程式事务**和**声明式事务**。

### Spring 事务管理概述

Spring 事务管理的核心在于其**事务抽象层**。通过 `org.springframework.transaction.PlatformTransactionManager` 接口，Spring屏蔽了底层数据访问技术的事务细节。无论你使用的是 JDBC、各种 ORM 框架，甚至是 JTA 这种分布式事务规范，Spring 都能通过对应的 `PlatformTransactionManager` 实现类来统一管理事务操作。

1.  **编程式事务管理：** 开发者需要在代码中手动调用事务管理 API 来控制事务的开始、提交和回滚。Spring 提供了 `PlatformTransactionManager` 接口供直接使用，或者更推荐使用 `TransactionTemplate` 类来简化编程式事务的样板代码。
    * **优点：** 灵活性高，可以对事务进行更精细的控制。
    * **缺点：** 事务管理代码与业务逻辑耦合，增加了代码的侵入性和冗余。

2.  **声明式事务管理：** 这是 Spring 推荐的主流方式。开发者只需通过配置（XML 或 注解）来声明事务的属性（如应用范围、传播行为、隔离级别等），具体的事务管理（开启、提交、回滚）由 Spring 容器在运行时通过 AOP 来完成，业务逻辑代码无需关心事务细节。
    * **优点：** 将事务管理与业务逻辑彻底分离，代码更简洁、更专注于业务实现，提高了可维护性。
    * **缺点：** 相较于编程式事务，灵活性稍弱，对于复杂的事务场景可能需要仔细配置。

在绝大多数应用中，声明式事务因其带来的巨大便利性而成为首选。我们将重点深入探讨声明式事务，特别是 `@Transactional` 注解。

### 声明式事务管理：`@Transactional` 的魔力

声明式事务的核心是配置，而基于注解的声明式事务的核心就是 `@Transactional` 注解。

#### 启用声明式事务

要使用基于 `@Transactional` 注解的声明式事务，只需要在你的 Spring 配置类上添加 `@EnableTransactionManagement` 注解：

```java
@Configuration
@EnableTransactionManagement // 启用 Spring 的声明式事务管理
public class TransactionConfig {

    // 需要配置一个 PlatformTransactionManager Bean
    // 例如，对于 JDBC/MyBatis
    @Bean
    public DataSourceTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    // 对于 JPA
    // @Bean
    // public JpaTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
    //     JpaTransactionManager transactionManager = new JpaTransactionManager();
    //     transactionManager.setEntityManagerFactory(entityManagerFactory);
    //     return transactionManager;
    // }
}
```
如果你使用 XML 配置，则使用 `<tx:annotation-driven/>` 标签。

`@EnableTransactionManagement` 的作用是导入 Spring 事务管理所需的后置处理器和其他基础设施 Bean，其中最重要的是一个能够解析 `@Transactional` 注解并创建事务代理的 BeanPostProcessor。

#### `@Transactional` 注解详解

`@Transactional` 注解可以应用于类或方法上。应用于类上时，表示该类中所有公共方法都将默认继承该注解的事务设置；应用于方法上时，会覆盖类级别的设置。

它提供了丰富的属性来控制事务的行为：

* **`propagation` (传播行为)：** **这是 `@Transactional` 最复杂也是最重要的属性，面试必考。** 它定义了事务方法在调用另一个事务方法时如何相互作用，即如何跨越方法调用边界“传播”事务。

    * **`REQUIRED` (默认)：** 这是最常用的传播行为。
        * 如果当前存在事务，则加入该事务。
        * 如果当前不存在事务，则新建一个事务。
        * **场景：** 大多数简单的CRUD操作或业务逻辑方法，它们应该在一个已有的事务中执行，或者如果没事务，就开启自己的事务。就像方法调用时，事务来了就“接力”用，没来就自己“开一个”。

    * **`REQUIRES_NEW`：** 总是新建一个事务。
        * 如果当前存在事务，则暂停（suspend）当前事务，新建一个独立的新事务。
        * 新事务有自己的独立的提交和回滚。外部事务的回滚不会影响新事务的提交（当然，如果外部事务回滚，通常意味着整个操作失败，新事务的操作结果也可能被间接影响，但这取决于业务逻辑，从事务层面说，新事务的提交是独立的）。
        * **场景：** 某些需要独立提交或回滚的子操作，即使外部事务失败，这个子操作也要记录下来（比如记录日志）。例如，在一个大事务中，调用一个记录操作日志的方法，这个日志记录应该独立于大事务提交，无论大事务是否回滚，日志都应该被保存。
        * **与 REQUIRED 的核心区别：** `REQUIRED` 共享同一个物理事务连接和上下文，回滚时会影响调用方；`REQUIRES_NEW` 使用独立的物理事务连接，回滚互不影响（除了外部回滚可能导致新事务结果被丢弃）。就像 REQUIRED 是在同一个房间里继续工作，REQUIRES_NEW 是跑到另一个房间单独完成任务，完成后再回原房间。

    * **`SUPPORTS`：** 支持当前事务。
        * 如果当前存在事务，则加入该事务。
        * 如果当前不存在事务，则以非事务方式执行。
        * **场景：** 某些只读操作，它们可以在事务中执行以保证数据一致性，但即使没有事务也不会报错，只是可能读到不一致的数据。

    * **`NOT_SUPPORTED`：** 总是以非事务方式执行。
        * 如果当前存在事务，则暂停当前事务，以非事务方式执行。
        * **场景：** 某些不需要事务支持的操作，且不希望影响或被外部事务影响（比如发送邮件、调用外部接口）。

    * **`NEVER`：** 总是以非事务方式执行。
        * 如果当前存在事务，则抛出异常。
        * **场景：** 明确禁止在事务环境中执行的操作。

    * **`MANDATORY`：** 必须在事务中执行。
        * 如果当前存在事务，则加入该事务。
        * 如果当前不存在事务，则抛出异常。
        * **场景：** 某些操作**必须**作为大事务的一部分来执行，独立执行没有意义或可能出错。

    * **`NESTED`：** 嵌套事务。
        * 如果当前存在事务，则嵌套在当前事务中执行，通过数据库的 Savepoint 实现。嵌套事务的回滚只会回滚到当前 Savepoint，不影响外部事务。但外部事务的回滚会回滚包括嵌套事务在内的所有操作。
        * 如果当前不存在事务，则行为与 `REQUIRED` 一致（新建一个事务）。
        * **与 REQUIRES_NEW 的区别：** `REQUIRES_NEW` 是完全独立的新事务；`NESTED` 是在外部事务内部创建的一个“检查点”，回滚范围受限但不是完全独立。它依赖于底层数据源是否支持 Savepoint。

* **`isolation` (隔离级别)：** 控制事务的隔离程度，旨在解决并发事务引起的问题。
    * `DEFAULT`: 使用底层数据库默认的隔离级别。
    * `READ_UNCOMMITTED` (读未提交)：最低级别，可能发生脏读、不可重复读、幻读。
    * `READ_COMMITTED` (读已提交)：解决脏读。可能发生不可重复读、幻读。
    * `REPEATABLE_READ` (可重复读)：解决脏读、不可重复读。可能发生幻读。(MySQL默认)
    * `SERIALIZABLE` (串行化)：最高级别，解决所有问题，但并发性能最低。
    * **建议：** 大多数情况下使用 `DEFAULT`，让数据库来决定。除非有明确的需求且理解风险，不要随意调整隔离级别。

* **`readOnly`：** `boolean` 类型，默认为 `false`。设置为 `true` 时，表示该事务只进行读操作，不进行任何修改。某些数据库或ORM框架可能基于此进行优化（如不分配写锁，或者路由到只读副本）。
    * **建议：** 对于纯查询的方法，将其设置为 `readOnly=true` 是一种良好的实践。

* **`timeout`：** `int` 类型，以秒为单位，默认为底层事务系统的默认值。设置事务的超时时间，超过该时间事务会自动回滚。
    * **建议：** 对于可能长时间运行的事务，可以设置超时，防止资源长时间占用。

* **`rollbackFor` / `noRollbackFor`：** `Class[]` 类型，用于指定哪些异常应该/不应该触发事务回滚。
    * 默认情况下，Spring 声明式事务只对 **运行时异常 (RuntimeException 及其子类)** 和 **Error** 进行回滚。 Checked Exception (非 RuntimeException) 不会触发回滚。
    * **`rollbackFor = {CustomException.class}`：** 指定遇到 `CustomException`（即使是 Checked Exception）时进行回滚。
    * **`noRollbackFor = {BusinessException.class}`：** 指定遇到 `BusinessException`（即使是 RuntimeException 的子类）时也不回滚。
    * **场景：** 当你的业务逻辑会抛出自定义的 Checked Exception，并且希望它触发回滚时，需要使用 `rollbackFor`。当某个运行时异常是预期内的业务逻辑，不应导致回滚时，使用 `noRollbackFor`。

#### `@Transactional` 注解的优先级

如果 `@Transactional` 同时标注在类和方法上，**方法上的注解会覆盖类上的注解设置**。如果没有在方法上标注，则继承类上的设置。

#### `@Transactional` 的实现原理 (机制解析)

理解 `@Transactional` 注解背后的实现原理，能帮助你更好地使用它并解决常见问题。

Spring 的声明式事务是基于 **AOP (面向切面编程)** 实现的（关联设计模式中的**代理模式**和之前的**注解**、**Bean生命周期**文章）。

**整个过程是这样的：**

1.  **启用机制：** 你通过 `@EnableTransactionManagement` 注解（或 XML 配置）启用了 Spring 的声明式事务支持。
2.  **注册 BeanPostProcessor：** `@EnableTransactionManagement` 会向 Spring IoC 容器注册一个或多个 BeanPostProcessor（后置处理器），其中一个关键的就是负责处理事务注解的处理器。
3.  **Bean 生命周期拦截：** 在 Bean 的生命周期中，当一个 Bean 实例被创建并完成属性填充之后，这些 BeanPostProcessor 会介入 (`postProcessAfterInitialization` 阶段)。
4.  **检查 `@Transactional`：** 事务后置处理器会检查当前正在处理的 Bean 类及其公共方法上是否带有 `@Transactional` 注解。
5.  **创建事务代理：** 如果发现 `@Transactional` 注解，Spring 会为这个原始 Bean 创建一个 **事务代理对象**。这个代理对象会根据配置（目标类是否实现接口）使用 **JDK 动态代理** 或 **CGLIB 代理**。
6.  **织入事务逻辑：** 事务相关的切面 (Advisor) 和通知 (Advice)，其中最重要的是 **`TransactionInterceptor` (事务拦截器)**，会被“织入”到代理对象中。
7.  **代理拦截调用：** 当外部代码调用这个 Bean 被 `@Transactional` 标注的方法时，实际调用的是 Spring 生成的**代理对象**的方法。
8.  **事务拦截器工作：** 代理对象拦截到方法调用后，会将控制权转交给 `TransactionInterceptor`。`TransactionInterceptor` 会读取被调用方法上的 `@Transactional` 注解属性，获取配置好的 `PlatformTransactionManager` Bean，然后开始执行事务管理逻辑：
    * 根据传播行为判断是加入现有事务、新建事务还是暂停事务等。
    * 调用 `PlatformTransactionManager.getTransaction()` 开启事务或获取现有事务。
    * 将数据源连接、Hibernate Session 等资源绑定到当前线程（利用 `TransactionSynchronizationManager`）。
    * 调用原始 Bean 的业务方法。
    * 方法执行完成后，根据方法是否正常返回或抛出异常（并结合 `@Transactional` 的 `rollbackFor`/`noRollbackFor` 规则）来决定是调用 `PlatformTransactionManager.commit()` 还是 `PlatformTransactionManager.rollback()`。
    * 最后解绑线程资源。

所以，当你调用一个带有 `@Transactional` 注解的方法时，它已经不再是你原始对象的方法，而是被代理对象层层包装过的。

### Spring 事务管理中的常见问题与陷阱

理解了 `@Transactional` 是通过 AOP 代理实现的，很多常见问题就迎刃而解了。

1.  **内部方法调用 (Self-invocation) 失效：**
    * **场景：** 在同一个类 `MyService` 中，方法 `methodA()` 没有 `@Transactional` 注解，但它调用了同类中带有 `@Transactional` 注解的 `methodB()`。
    * ```java
        @Service
        public class MyService {
            // ... 注入 UserRepository

            public void methodA() { // 没有事务注解
                // ... 一些操作
                methodB(); // 内部调用 methodB
                // ... 一些操作
            }

            @Transactional // 期望这里有事务
            public void methodB() {
                // 数据操作 ...
                // 如果这里出错，可能 methodA 的操作不会回滚
            }
        }
        ```
    * **原因：** 当外部代码调用 `methodA()` 时，是通过 `MyService` 的**代理对象**调用的。`methodA()` 方法本身没有事务，所以代理对象直接进入 `methodA()` 的方法体。在 `methodA()` 内部调用 `methodB()` 时，使用的是 `this.methodB()`。这里的 `this` 指的是原始的 `MyService` 对象，而不是 Spring 创建的那个代理对象。因此，对 `methodB()` 的调用绕过了事务代理，`@Transactional` 注解自然就失效了。
    * **解决办法：**
        * **分离方法到不同类：** 将 `methodB()` 移动到另一个 Service 类中，然后通过 `@Autowired` 注入这个新的 Service 类，再调用其 `methodB()` 方法。此时因为调用的是另一个 Bean 的方法，会通过 Spring 容器中的代理对象进行调用。
        * **注入自身代理对象：** 在 `MyService` 类中注入自身的代理对象，通过代理对象来调用 `methodB()`。可以通过 `AopContext.currentProxy()` 获取当前代理，或者注入 `ApplicationContext` 后再 `getBean()` 获取自身。需要额外配置或开启 AOP Exposure。
        ```java
        @Service
        public class MyService {
             // ...
             @Autowired
             private MyService self; // 注入自身代理 (需要 AOP Exposure 配置)

             public void methodA() {
                 // ...
                 self.methodB(); // 通过代理调用 methodB
                 // ...
             }
             @Transactional
             public void methodB() { ... }
        }
        ```

2.  **`private`, `protected`, `package-private` 方法上的 `@Transactional` 失效：**
    * **原因：** Spring AOP 默认的代理机制（无论是 JDK 动态代理还是 CGLIB）主要是针对**公共方法**进行拦截。非公共方法无法被代理对象拦截到，因此 `@Transactional` 注解不会生效。CGLIB 可以代理非 final 的非公共方法，但 Spring 的事务代理默认配置可能只拦截公共方法，且即使能代理，其他非 Spring AOP 的 AspectJ 编译时织入也需要注意非公共方法的处理。
    * **解决办法：** 确保 `@Transactional` 注解应用于公共方法。如果必须在非公共方法上应用事务，可能需要考虑使用 AspectJ 的编译时织入或加载时织入，但这会增加项目复杂度。通常建议将需要事务的方法暴露为公共方法。

3.  **异常处理不当导致回滚失效：**
    * **原因：** Spring 默认只对 `RuntimeException` 及其子类和 `Error` 进行回滚。如果你的方法抛出了一个 **Checked Exception** (如 `IOException`, `SQLException` 等非 `RuntimeException` 的异常)，并且你没有通过 `rollbackFor` 属性指定回滚，事务就不会回滚。同样，如果在事务方法内部 `try-catch` 捕获了应该回滚的异常（包括 `RuntimeException`），但在 `catch` 块中没有再次抛出或抛出新的 `RuntimeException`，Spring 事务管理器就不会感知到异常的发生，从而导致事务正常提交。
    * **场景示例：**
        ```java
        @Service
        public class MyService {
            @Transactional // 默认只回滚 RuntimeException 和 Error
            public void saveData(Data data) throws IOException { // Checked Exception
                // ... 保存数据
                if (...) {
                    throw new IOException("File error"); // Checked Exception，默认不回滚
                }
                // ...
            }

            @Transactional
            public void processData(Data data) {
                try {
                    // ... 数据操作
                    throw new RuntimeException("Processing failed"); // RuntimeException
                } catch (RuntimeException e) {
                    // 异常被捕获，没有再次抛出
                    System.out.println("Caught exception: " + e.getMessage());
                    // 事务不会回滚!
                }
            }
        }
        ```
    * **解决办法：**
        * 对于 Checked Exception 需要回滚的场景，使用 `rollbackFor`：`@Transactional(rollbackFor = IOException.class)`。
        * 对于捕获了异常但需要回滚的场景：在 `catch` 块中将异常重新抛出（`throw e;`），或者包装成一个 `RuntimeException` 抛出（`throw new RuntimeException(e);`），或者在 `@Transactional` 中使用 `noRollbackFor` 属性来包含这个被捕获但不希望回滚的异常类型（尽管这通常与业务逻辑冲突）。

### 编程式事务管理简介

尽管声明式事务更常用，但编程式事务在某些场景下仍有其用武之地，例如事务边界需要根据复杂的业务逻辑动态决定，或者在非 Spring Bean 中需要事务支持。

* **`PlatformTransactionManager` 接口：** 你可以直接注入 `PlatformTransactionManager` 接口的实现类，然后手动调用 `getTransaction(TransactionDefinition definition)` 获取事务状态，调用 `commit(TransactionStatus status)` 提交，或调用 `rollback(TransactionStatus status)` 回滚。这非常底层，样板代码较多。
* **`TransactionTemplate` 类：** 推荐的编程式事务方式。它封装了获取事务、执行业务逻辑、处理提交/回滚的样板代码。你只需要提供一个 `TransactionCallback` 或 `TransactionCallbackWithoutResult` 实现，将业务逻辑放在其 `doInTransaction()` 方法中。
    ```java
    @Service
    public class MyProgrammaticService {
        @Autowired
        private TransactionTemplate transactionTemplate; // 注入 TransactionTemplate

        public void doBusinessWithTx() {
            transactionTemplate.execute(new TransactionCallbackWithoutResult() {
                @Override
                protected void doInTransactionWithoutResult(TransactionStatus status) {
                    // 你的业务逻辑，所有数据操作都在这个事务中
                    // 可以通过 status.setRollbackOnly() 手动标记回滚
                    // 如果此处抛出 RuntimeException，TransactionTemplate 会自动回滚
                }
            });
        }
    }
    ```
    * **使用场景：** 事务逻辑非常个性化或复杂，难以用 `@Transactional` 注解清晰表达；或者在非Spring管理的对象中需要事务（虽然这种场景应尽量避免）。

### Spring 事务管理器 (PlatformTransactionManager)

它是 Spring 事务抽象的核心接口。不同的数据访问技术需要配置不同的 `PlatformTransactionManager` 实现：

* `DataSourceTransactionManager`: 管理 JDBC 连接的事务，适用于直接使用 JDBC 或 MyBatis。
* `JpaTransactionManager`: 管理 JPA 事务，适用于使用 JPA 作为 ORM 框架。
* `HibernateTransactionManager`: 管理 Hibernate Session 的事务（在新版本 Hibernate 中推荐使用 JpaTransactionManager）。
* `JtaTransactionManager`: 管理分布式事务，当需要跨多个独立资源（如多个数据库、JMS队列）进行事务操作时使用。它依赖于 JTA 事务管理器（如应用服务器提供的）。
* `MongoTransactionManager`, `RedisTransactionManager` 等：针对 NoSQL 数据库的事务管理器（如果底层数据库支持事务）。

Spring 会根据你配置的数据源和 ORM 框架，自动配置或提示你手动配置合适的 `PlatformTransactionManager` Bean。

### 事务同步 (Transaction Synchronization)

在事务内部，如果需要操作资源（如数据库连接、Hibernate Session），如何确保同一个事务内的所有操作都使用同一个资源实例？Spring 通过 `TransactionSynchronizationManager` 来实现。它是一个线程安全的、基于 `ThreadLocal` 的工具类，用于将资源（如 `ConnectionHolder`）绑定到当前执行事务的线程。事务管理器在开启事务时将资源绑定，在提交/回滚时解绑，确保事务中的所有操作都使用线程绑定的那个资源。

### Spring 事务管理为何是面试热点

Spring 事务管理是考察候选人是否具备扎实企业级应用开发经验的重要维度。面试官喜欢问这个话题，是因为：

1.  **核心企业级功能：** 几乎所有业务系统都离不开事务。
2.  **概念复杂性：** 事务传播行为、隔离级别等概念本身就容易混淆。
3.  **实现机制：** 它结合了 AOP 代理、Bean 生命周期等多个 Spring 核心机制，能够全面考察对 Spring 底层的理解。
4.  **实际问题多：** 事务失效、回滚不符合预期等问题在实际开发中经常遇到，能反映候选人解决问题的能力。

### 面试问题示例与深度解析

以下是一些常见的 Spring 事务面试问题，结合我们上面的内容，你可以轻松回答：

1.  **请解释 Spring 的事务传播行为，特别是 REQUIRED 和 REQUIRES_NEW 的区别。**
    * **要点：** 解释传播行为定义了事务方法之间的事务关系。详细解释 REQUIRED（加入或新建，共享连接，一同回滚）和 REQUIRES_NEW（总是新建，暂停当前，独立提交/回滚，独立连接）。用简单的嵌套调用场景对比两者回滚行为的不同影响。
2.  **`@Transactional` 注解是如何工作的？原理是什么？**
    * **要点：** 回答基于 AOP 代理。解释 `@EnableTransactionManagement` 注册 BeanPostProcessor，BeanPostProcessor 在 Bean 生命周期中创建事务代理。代理拦截方法调用，`TransactionInterceptor` 执行事务逻辑，调用 `PlatformTransactionManager`。
3.  **`@Transactional` 注解在什么情况下会失效？为什么？**
    * **要点：** 1) 内部方法调用（`this` 调用），原因：绕过代理。 2) 非公共方法，原因：代理无法拦截。 3) 异常被捕获未抛出，原因：事务管理器无法感知异常。 4) 抛出 Checked Exception 但未配置 `rollbackFor`，原因：默认不回滚 Checked Exception。给出解决方案。
4.  **Spring 默认对哪些异常进行事务回滚？**
    * **要点：** 默认只对 RuntimeException 及其子类和 Error 进行回滚。Checked Exception 默认不回滚。
5.  **声明式事务和编程式事务有什么优缺点？何时使用？**
    * **要点：** 声明式优点（解耦、简洁），缺点（灵活性稍弱）；编程式优点（灵活性高），缺点（代码侵入性）。使用场景：大部分用声明式，复杂或特定场景用编程式（如 `TransactionTemplate`）。
6.  **请解释一下 Spring 事务隔离级别。**
    * **要点：** 解释隔离级别目的（解决并发问题）。列出标准级别名称并简述各自解决的问题（脏读、不可重复读、幻读）。提及 DEFAULT 使用数据库默认。
7.  **Spring 如何管理多数据源的事务？**
    * **要点：** 如果是同构多数据源（同一个数据库类型），且业务逻辑不跨多个数据源，可以为每个数据源配置独立的 `PlatformTransactionManager`，并通过 `@Transactional` 的 `value` 属性指定使用哪个事务管理器。如果需要跨不同类型的数据源或资源（如数据库+消息队列），需要使用支持分布式事务的 `JtaTransactionManager`，这依赖于底层的 JTA 实现（如应用服务器）。这是一个更高级的话题，简要提及即可。

### 总结

Spring 事务管理是框架为我们提供的强大且便捷的核心功能之一。通过统一的事务抽象层和声明式事务，Spring 极大地简化了企业级应用的事务控制。

掌握 `@Transactional` 注解的各种属性（特别是传播行为、隔离级别和回滚规则），理解声明式事务基于 AOP 代理的实现原理，并能够识别和解决常见的事务陷阱，是每一位中高级 Java 开发者必备的技能。这些知识不仅能帮助你写出更健壮、数据一致性更高的应用。
