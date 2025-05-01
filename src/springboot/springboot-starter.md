在我们之前的文章中，我们深入探讨了 Spring Boot 的架构设计，特别是其核心——自动配置（Auto-configuration）。我们了解到，自动配置是 Spring Boot 实现“开箱即用”的关键，它根据 classpath 中的依赖和环境条件，智能地为我们配置 Bean。

那么，这些“依赖”是如何以一种便捷的方式被引入的呢？答案就是 **Spring Boot Starters**。Starters 是 Spring Boot 简化依赖管理的一大杀器。理解 Starter 是什么，以及如何创建自定义 Starter，不仅能让你更高效地使用 Spring Boot 生态中的各种功能，还能让你将自己的库或模块“Spring Boot 化”，提供给其他开发者使用。同时，这也是面试中考察你对 Spring Boot 模块化和自动配置机制理解深度的高频考点。

今天，就让我们一起揭开 Starter 的面纱，并亲手创建一个自定义 Starter！

---

## 深度解析 Spring Boot Starter：简化依赖，以及如何打造你的专属“工具箱”

### 引言：告别依赖地狱，迎接一站式集成

在没有 Spring Boot Starter 的时代，当我们想在 Spring 应用中集成一个第三方技术（如 MyBatis、Redis、Kafka）时，需要手动引入一大堆相关的依赖，包括核心库、Spring 集成模块、连接池、日志库等，并且要小心翼翼地处理它们之间的版本兼容性问题。这个过程既繁琐又容易出错。

Spring Boot Starters 的出现，彻底改变了这一局面。它是一种特殊的 Maven 或 Gradle 依赖，充当了**聚合器**的角色。引入一个 Starter，就像拿到一个“工具箱”，里面已经为你准备好了该场景下所需的大部分常用工具（依赖）。

理解并学会创建自定义 Starter 的价值在于：

* **掌握 Spring Boot 模块化精髓：** 了解 Spring Boot 如何组织和打包功能模块。
* **简化库的使用：** 如果你开发了一个供他人使用的 Java 库，为其提供一个 Starter 可以极大地降低用户在 Spring Boot 应用中集成你的库的难度。
* **复用和标准化：** 将常用功能的 Spring Boot 集成配置和依赖打包成 Starter，可以在项目之间复用，并提供标准化的集成方式。
* **深度理解自动配置：** 创建 Starter 的过程通常需要配合自动配置，能让你从提供者的视角，更深刻理解自动配置如何与 Starter 协同工作。
* **应对面试：** Starter 和自动配置是 Spring Boot 架构的两个核心组件，面试中常常结合考察。

### Spring Boot Starter 是什么？

一个 Spring Boot Starter 本质上是一个带有特殊命名规则（通常是 `*-spring-boot-starter`，官方 Starter 是 `spring-boot-starter-*`）的 Maven 或 Gradle **依赖**（POM 文件）。它本身通常不包含任何业务代码，其主要作用是通过**依赖传递**引入一系列开箱即用的依赖。

例如，`spring-boot-starter-web` 这个 Starter 引入了 Spring MVC、内嵌的 Tomcat、Jackson 等用于构建 Web 应用的常用依赖。开发者只需要引入这一个依赖，就相当于引入了开发 Web 应用所需的大部分基础库。

Starters 的另一个重要作用是，它们通常会**与自动配置模块一起工作**。引入某个 Starter，意味着该 Starter 引入的库会被添加到 Classpath 中。Spring Boot 的自动配置机制会检测 Classpath 中是否存在这些库，如果存在，就触发相应的自动配置，为你注册好所需的 Bean。

### 为什么创建自定义 Starter？

你可能已经开发了一个自己的 Java 库，或者你们公司内部有一个通用的服务客户端库。为了让其他团队在他们的 Spring Boot 项目中更容易地使用你的库，你可以为其创建一个自定义 Starter。

创建自定义 Starter 通常是为了解决以下问题：

* **简化依赖管理：** 将使用你的库所需的所有第三方依赖（包括 Spring 集成模块）聚合到一个 Starter 中，用户只需要引入这一个 Starter 依赖。
* **提供默认配置：** 将你的库在 Spring Boot 环境下最常用的配置（如创建客户端实例、配置连接池等）通过自动配置类打包到 Starter 中，用户无需手动编写这些样板配置。
* **标准化集成方式：** 强制用户通过引入 Starter 来集成你的库，确保他们使用了正确的依赖组合和默认配置。
* **隐藏实现细节：** 用户无需关心你的库内部依赖了哪些第三方库，以及如何在 Spring Boot 中进行繁琐的初始化配置。

### 自定义 Starter 的架构与组成 (重点)

一个典型的自定义 Starter 通常由**两个模块**组成（推荐使用 Maven 或 Gradle 的多模块项目来组织）：

1.  **Starter 模块 (`*-spring-boot-starter`)：** 这是用户项目直接引入的依赖。它本身通常是一个非常简单的 POM 文件，只包含对核心库和**自动配置模块**的依赖。它的主要作用就是通过依赖传递，将自动配置模块和核心库及其所有相关依赖带入到用户项目的 Classpath 中。
2.  **自动配置模块 (`*-spring-boot-autoconfigure`)：** 这是 Starter 的“大脑”，包含了真正的自动配置逻辑。这个模块是一个标准的 JAR 包，内部包含：
    * **自动配置类：** 用 `@Configuration` 标注的类，内部定义了 `@Bean` 方法，并使用 `@Conditional` 注解根据条件决定是否生效。
    * **`META-INF/spring.factories` 文件：** **这个文件是连接 Starter 和自动配置的关键！** 它位于 `resources/META-INF` 目录下，其中最重要的配置项就是 `org.springframework.boot.autoconfigure.EnableAutoConfiguration`。该 key 对应的值就是自动配置模块中所有需要被 Spring Boot 扫描到的自动配置类的全限定名列表。当用户项目引入了 Starter（从而将自动配置模块带入 Classpath），Spring Boot 的启动过程就会通过 `SpringFactoriesLoader` 机制发现并加载 `spring.factories` 文件中指定的自动配置类。
    * 可能还包含用于绑定配置文件的属性类（用 `@ConfigurationProperties` 标注）。

**架构图示 (概念):**

用户项目 -> 引入 Starter 模块 (`my-client-spring-boot-starter`)
↓ 依赖传递
自动配置模块 (`my-client-spring-boot-autoconfigure`) + 核心库模块 (`my-client-core`) + 其他依赖
↓ `my-client-spring-boot-autoconfigure` 模块包含
自动配置类 (`MyClientAutoConfiguration.java`)
`META-INF/spring.factories` (指向 `MyClientAutoConfiguration`)
↓ Spring Boot 启动时，通过 `SpringFactoriesLoader` 发现 `spring.factories` -> 加载 `MyClientAutoConfiguration` -> 根据 `@Conditional` 判断是否生效 -> 如果生效，执行 `@Bean` 方法，创建 Bean 到容器。

### 手把手创建自定义 Starter

我们将以一个简单的场景为例：创建一个 Starter 来集成一个虚构的第三方 Java 库 `MyClient`，该库提供一个简单的客户端类 `MyClient` 和一个配置类 `MyClientProperties`。

假设 `MyClient` 库的代码如下 (这是一个独立的库，我们不修改它)：

```java
// 核心库模块 (假设在 com.example.myclient.core 包)

// 客户端配置属性类
public class MyClientProperties {
    private String serverUrl = "http://localhost:8080";
    private int timeout = 5000;
    // getters and setters
    // ...
}

// 客户端类
public class MyClient {
    private String serverUrl;
    private int timeout;

    public MyClient(String serverUrl, int timeout) {
        this.serverUrl = serverUrl;
        this.timeout = timeout;
        System.out.println("MyClient created with URL: " + serverUrl + ", Timeout: " + timeout);
    }

    public void sendRequest(String data) {
        System.out.println("MyClient sending request to " + serverUrl + " with data: " + data);
        // 模拟发送请求
    }
}
```

现在，我们来创建 Spring Boot Starter 项目。

**Step 1: 创建一个多模块 Maven 项目**

项目结构如下：

```
my-client-spring-boot
├── pom.xml             (Parent POM)
├── my-client-spring-boot-autoconfigure
│   └── pom.xml         (Auto-configure Module POM)
│   └── src/main/java/...
│   └── src/main/resources/META-INF/spring.factories
└── my-client-spring-boot-starter
    └── pom.xml         (Starter Module POM)
```

Parent POM (`my-client-spring-boot/pom.xml`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>my-client-spring-boot</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>pom</packaging> // 父模块使用 pom 打包类型

    <modules>
        <module>my-client-spring-boot-autoconfigure</module>
        <module>my-client-spring-boot-starter</module>
    </modules>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <spring-boot.version>3.2.0</spring-boot.version> // 定义 Spring Boot 版本
    </properties>

    <dependencyManagement> // 统一管理依赖版本
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

</project>
```

**Step 2: 创建自动配置模块 (`my-client-spring-boot-autoconfigure`)**

Auto-configure Module POM (`my-client-spring-boot-autoconfigure/pom.xml`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.example</groupId>
        <artifactId>my-client-spring-boot</artifactId>
        <version>1.0.0-SNAPSHOT</version>
    </parent>

    <artifactId>my-client-spring-boot-autoconfigure</artifactId>

    <dependencies>
        // 引入 Spring Boot Auto-configure 模块本身
        // 它包含了 @Configuration, @Conditional 等自动配置相关的类
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-autoconfigure</artifactId>
        </dependency>

        // 引入用于绑定配置属性的模块
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional> // 这个是可选的，用于生成配置元数据，提供IDE提示
        </dependency>

        // **引入你的核心库依赖！**
        // 假设核心库 groupId 是 com.example, artifactId 是 my-client-core, version 是 1.0.0
        <dependency>
             <groupId>com.example</groupId>
             <artifactId>my-client-core</artifactId>
             <version>1.0.0</version> // 使用你的核心库版本
        </dependency>

        // 可能还需要其他 Spring 相关的依赖，例如如果你的客户端需要 Spring 的 RestTemplate
        // <dependency>
        //      <groupId>org.springframework.boot</groupId>
        //      artifactId>spring-boot-starter-web</artifactId>
        // </dependency>

    </dependencies>
</project>
```

创建配置属性类 (`com.example.myclient.autoconfigure.MyClientProperties`):

```java
// 放在 auto-configure 模块中

package com.example.myclient.autoconfigure;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "myclient") // 绑定 application.properties/yml 中以 myclient 开头的属性
public class MyClientProperties {
    private String serverUrl = "http://localhost:8080";
    private int timeout = 5000;

    public String getServerUrl() { return serverUrl; }
    public void setServerUrl(String serverUrl) { this.serverUrl = serverUrl; }
    public int getTimeout() { return timeout; }
    public void setTimeout(int timeout) { this.timeout = timeout; }
}
```
*注意：这个 `MyClientProperties` 是独立于核心库的，放在 auto-configure 模块中，用于适配 Spring Boot 的配置绑定机制。*

创建自动配置类 (`com.example.myclient.autoconfigure.MyClientAutoConfiguration`):

```java
// 放在 auto-configure 模块中

package com.example.myclient.autoconfigure;

import com.example.myclient.core.MyClient; // 引入核心库中的类
import com.example.myclient.core.MyClientProperties as CoreClientProperties; // 核心库中可能也有同名属性类，这里用别名区分

import org.springframework.boot.autoconfigure.AutoConfiguration; // Spring Boot 2.7+ 推荐使用 @AutoConfiguration
// import org.springframework.boot.autoconfigure.condition.ConditionalOnClass; // 如果使用 Spring Boot 2.6-
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

// @AutoConfiguration 或 @Configuration (取决于 Spring Boot 版本)
// @ConditionalOnClass 注解确保只有当 MyClient 类在 Classpath 中存在时，这个自动配置类才可能生效
// @ConditionalOnClass(MyClient.class) // 如果核心库类名 MyClient 独特性足够，可以使用
// 如果 MyClient 类名可能与其他库冲突，可以使用更独特的类名判断，或者组合判断
@AutoConfiguration // Spring Boot 2.7+
@EnableConfigurationProperties(MyClientProperties.class) // 让 MyClientProperties 生效并绑定属性
public class MyClientAutoConfiguration {

    // 定义一个 Bean，使用 @ConditionalOnMissingBean 确保只有当容器中没有 MyClient 类型的 Bean 时才创建
    // 这样用户可以手动配置一个 MyClient Bean 来覆盖自动配置
    @Bean
    @ConditionalOnMissingBean(MyClient.class)
    public MyClient myClient(MyClientProperties properties) {
        // 使用绑定好的属性创建核心库的 MyClient 实例
        return new MyClient(properties.getServerUrl(), properties.getTimeout());
    }

    // 如果核心库的 MyClientProperties 需要作为 Bean 注册，可以在这里定义 Bean
    // 但通常 Spring Boot 的配置绑定机制 (EnableConfigurationProperties) 已经让其属性可用，不一定需要注册为 Bean
    // @Bean
    // public CoreClientProperties coreClientProperties(MyClientProperties properties) {
    //     // 根据 auto-configure 的属性创建核心库的属性对象
    //     CoreClientProperties coreProps = new CoreClientProperties();
    //     coreProps.setServerUrl(properties.getServerUrl());
    //     coreProps.setTimeout(properties.getTimeout());
    //     return coreProps;
    // }
}
```

创建 `META-INF/spring.factories` 文件 (`my-client-spring-boot-autoconfigure/src/main/resources/META-INF/spring.factories`):

```properties
# Auto Configure
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.example.myclient.autoconfigure.MyClientAutoConfiguration
```
*这是关键步骤！它告诉 Spring Boot：我的自动配置类是 `com.example.myclient.autoconfigure.MyClientAutoConfiguration`。*

**Step 3: 创建 Starter 模块 (`my-client-spring-boot-starter`)**

Starter Module POM (`my-client-spring-boot-starter/pom.xml`):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.example</groupId>
        <artifactId>my-client-spring-boot</artifactId>
        <version>1.0.0-SNAPSHOT</version>
    </parent>

    // **遵循命名规范：*-spring-boot-starter**
    <artifactId>my-client-spring-boot-starter</artifactId>

    <dependencies>
        // **核心：依赖你的自动配置模块**
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>my-client-spring-boot-autoconfigure</artifactId>
            <version>${project.version}</version> // 使用同一个版本
        </dependency>

        // **可选：直接引入核心库依赖 (如果自动配置模块没有引入的话)**
        // **通常自动配置模块会依赖核心库，通过传递依赖到这里**
        // 但如果核心库本身也需要依赖管理，可以在这里再次声明，并省略 version
        // <dependency>
        //      <groupId>com.example</groupId>
        //      artifactId>my-client-core</artifactId>
        // </dependency>

        // 你还可以根据需要在这里引入其他常用的第三方依赖，这些依赖会被传递给用户项目
        // 例如，如果你的客户端通常与 Spring Web 集成，可以考虑引入 spring-boot-starter-web
        // 但要小心，不要引入不必要的依赖，保持 Starter 最小化
    </dependencies>

</project>
```

**Step 4: 构建项目**

在项目根目录 (`my-client-spring-boot`) 执行 `mvn clean install`。这会构建并安装父模块、自动配置模块和 Starter 模块到本地 Maven 仓库。

### 使用自定义 Starter

现在，其他 Spring Boot 项目就可以像使用官方 Starter 一样，在 `pom.xml` 中引入你的自定义 Starter 了：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version> // 使用 Spring Boot 父级 POM 管理版本
        <relativePath/>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>my-app-using-client</artifactId>
    <version>1.0.0-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId> // 引入 Spring Boot 核心 Starter
        </dependency>

        // **引入你的自定义 Starter**
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>my-client-spring-boot-starter</artifactId>
            <version>1.0.0-SNAPSHOT</version> // 使用你 Starter 的版本
        </dependency>

        // 其他依赖...

    </dependencies>
    // ...
</project>
```

在用户项目的 `application.properties` 或 `application.yml` 中，可以配置 `MyClient` 的属性：

```properties
# application.properties
myclient.server-url=http://my.custom.server:9090
myclient.timeout=10000
```

当这个用户项目启动时：

1.  `my-client-spring-boot-starter` 被添加到 Classpath。
2.  通过依赖传递，`my-client-spring-boot-autoconfigure` 和 `my-client-core` (及其他相关依赖) 也被添加到 Classpath。
3.  Spring Boot 启动，`SpringFactoriesLoader` 扫描 Classpath 下的 `META-INF/spring.factories` 文件。
4.  发现 `my-client-spring-boot-autoconfigure` 模块中的 `spring.factories` 文件，并找到其中注册的自动配置类 `com.example.myclient.autoconfigure.MyClientAutoConfiguration`。
5.  在启动流程的适当阶段，Spring Boot 处理 `MyClientAutoConfiguration` 类：
    * `@EnableConfigurationProperties(MyClientProperties.class)` 使 `application.properties` 中以 `myclient` 开头的属性绑定到 `MyClientProperties` 对象。
    * `@ConditionalOnMissingBean(MyClient.class)` 检查容器中是否已经有 `MyClient` 类型的 Bean。如果**没有**，则执行 `@Bean` 方法。
    * 执行 `myClient()` 方法，使用绑定好的 `MyClientProperties` 属性创建一个 `MyClient` 实例，并将其注册为 Spring 容器中的一个 Bean。
6.  用户项目中的其他 Bean 可以通过 `@Autowired` 直接注入 `MyClient` 类型的 Bean 来使用它，而无需手动配置。

这就是 Starter 如何通过聚合依赖和结合自动配置，极大地简化第三方库在 Spring Boot 中的集成过程。

### Starter 命名规范

遵循 Spring Boot 官方的 Starter 命名规范非常重要，这有助于开发者识别和查找 Starter。

* **官方 Starter：** `spring-boot-starter-*` (例如 `spring-boot-starter-web`)，由 Spring Boot 团队维护。
* **自定义 Starter：** `*-spring-boot-starter` (例如 `my-client-spring-boot-starter`)。请注意，自定义 Starter 的名称前缀是你自己的模块名，后缀是 `-spring-boot-starter`。

### 理解 Starter 与自动配置的关系 (重申)

再次强调，Starter 和自动配置是紧密协作的伙伴：

* **Starter 负责：** 将特定场景所需的**库文件（`.jar` 包）**引入到项目的 Classpath 中。它是一个**依赖管理工具**。
* **自动配置负责：** 扫描 Classpath，检测是否存在特定的库（通过 `@ConditionalOnClass` 等注解），并根据条件**自动配置和注册所需的 Bean**。它是**配置工具**。

Starter 引入了原材料，自动配置则利用这些原材料为你做好菜。自定义 Starter 就是将你的原材料和做菜的食谱（自动配置类）一起打包，方便别人取用。

### 理解 Starter 的价值

* **模块化：** 将特定功能的集成打包成独立的模块。
* **可复用性：** 可以在不同的 Spring Boot 项目中轻松复用。
* **提升开发者体验 (DX)：** 极大简化了库的集成过程，让库的用户更愉快。
* **版本管理：** 结合 Spring Boot 的父级 POM/BOM，统一管理依赖版本，减少冲突。

### Starter 为何是面试热点

面试官喜欢考察 Starter，是因为：

* 它是 Spring Boot 解决依赖管理痛点的核心方案，反映你对现代构建方式的理解。
* 创建自定义 Starter 需要理解自动配置原理，特别是 `@Conditional` 注解和 `spring.factories` 机制，这能深入考察你对 Spring Boot 底层原理的掌握程度。
* 它结合了依赖管理、自动配置、模块化等多个重要概念。

### 面试问题示例与深度解析

1.  **SpringBoot Starter 是什么？它的作用是什么？**
    * **要点：** 定义 Starter 为依赖聚合器。作用：简化依赖管理，减少版本冲突，提供一站式集成，通常包含自动配置模块。举例说明 `spring-boot-starter-web`。
2.  **官方 Starter 和自定义 Starter 的命名规范有什么区别？**
    * **要点：** 官方：`spring-boot-starter-*`；自定义：`*-spring-boot-starter`。
3.  **如何创建一个自定义 Starter？请简述过程。**
    * **要点：** 简述推荐的多模块结构（父 -> auto-configure + starter）。重点说明 auto-configure 模块包含自动配置类 (`@Configuration`, `@Conditional`, `@Bean`) 和 `META-INF/spring.factories` 文件（关键！）。Starter 模块主要依赖 auto-configure 模块。
4.  **在自定义 Starter 中，`spring.factories` 文件有什么作用？它应该放在哪里？**
    * **要点：** 作用：通过 `SpringFactoriesLoader` 机制，告诉 Spring Boot 容器哪些类是自动配置类。Spring Boot 扫描并加载这些类进行自动配置。位置：应该放在自动配置模块的 `src/main/resources/META-INF/` 目录下。
5.  **自定义 Starter 中的自动配置类是如何被 Spring Boot 发现和加载的？**
    * **要点：** 当用户项目引入 Starter，auto-configure 模块进入 Classpath。Spring Boot 启动时，`SpringFactoriesLoader` 扫描 Classpath 中的 `META-INF/spring.factories` 文件，读取 `EnableAutoConfiguration` 对应的类名列表。然后，在启动流程的适当阶段，根据这些类上的 `@Conditional` 注解判断是否生效，最终加载符合条件的自动配置类。
6.  **创建自定义 Starter 时，为什么推荐使用多模块项目？**
    * **要点：** 将用户直接引用的 Starter POM 和包含核心逻辑的自动配置模块分离开，结构清晰，职责明确。Starter POM 保持简洁，只负责依赖聚合；自动配置模块专注于实现配置逻辑。
7.  **你的核心库依赖应该放在 Starter 模块还是 Auto-configure 模块？为什么？**
    * **要点：** 通常放在 Auto-configure 模块。原因：自动配置类需要直接依赖核心库才能创建和配置其中的 Bean。通过 Auto-configure 模块依赖核心库，再由 Starter 模块依赖 Auto-configure 模块，核心库就会通过依赖传递到达用户项目。

### 总结

Spring Boot Starter 是简化依赖管理和实现功能模块化的强大工具。通过遵循命名规范和利用 `META-INF/spring.factories` 文件，Starter 能够与 Spring Boot 的自动配置机制紧密协作，为用户提供“一站式”的集成体验。

创建自定义 Starter 是将你的库或模块与 Spring Boot 生态无缝融合的关键步骤。它不仅能提高你库的易用性，也能加深你对 Spring Boot 自动配置原理的理解，是从会用 Spring Boot 到精通 Spring Boot 的重要标志。
