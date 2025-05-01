在我们深入探讨了 Spring MVC 的架构设计和请求处理流程之后，我们知道，那些负责接收请求、处理业务、生成响应的“处理器”（Handler），在现代 Spring MVC 中通常就是我们 Controller 类中那些带有特定注解的方法。正是这些注解，定义了请求如何被映射到方法、方法如何接收参数、以及方法返回值如何被处理为响应。

理解这些 Spring MVC 常用注解的功能、用法，以及它们如何被 Spring MVC 框架识别和处理，是掌握 Spring MVC 开发的关键。这不仅能让你更高效地编写 Web 层代码，更能让你深入理解 Spring MVC 的请求处理流程中，各个组件是如何“读懂”你的代码意图的。同时，这也是面试官考察你 Spring MVC 实战经验和原理理解深度的高频切入点。

今天，我们就来系统梳理 Spring MVC 中的常用注解，并深入剖析它们在请求处理流程中扮演的角色。

---

## 深度解析 Spring MVC 常用注解：定义 Web 行为的“语言”

### 引言：注解，构建 Spring MVC Web 层的基石

Spring MVC 提供了一套丰富而强大的注解，用于简化 Web 层的开发。这些注解将请求映射、参数绑定、响应处理等复杂的 Web 开发任务，以声明式的方式呈现在代码中，极大地提高了开发效率和代码的可读性。

在 Spring MVC 语境下理解常用注解的价值：

* **掌握 Spring MVC 核心用法：** 绝大部分 Spring MVC 的功能都是通过注解来开启和配置的。
* **深入理解请求处理流程：** 注解直接关联着 `HandlerMapping` 如何找到 Handler，`HandlerAdapter` 如何调用 Handler 并处理参数/返回值等过程。
* **提高代码可读性：** 注解清晰地表达了方法处理哪种请求、需要哪些参数、返回什么类型的响应。
* **高效排查问题：** 理解注解与底层组件的关联，有助于定位请求未能正确处理的原因。
* **从容应对面试：** Spring MVC 常用注解是 Web 开发面试的基础，理解其原理更能加分。

本文将按照注解在构建 Spring MVC Web 层中的作用进行分类，深入解析它们的功能、用法，以及最重要的——它们是如何被 Spring MVC 核心组件处理的。

### Spring MVC 常用注解分类深度解析

我们将注解按功能组织，并重点关联它们与 Spring MVC 请求处理流程中的哪个组件相关。

#### 2.1 控制器标识与类型注解

这些注解用于将一个类标识为 Spring MVC 的控制器，并区分其处理响应的方式。

* **`@Controller`**
    * **功能与目的：** 标识一个类为 Spring MVC 的控制器。Spring 容器会将这个类识别为一个 Bean，`HandlerMapping` 会扫描这个 Bean 中的方法，查找 `@RequestMapping` 等注解，从而将其注册为请求处理器（Handler）。
    * **使用场景与示例：** 传统的 Spring MVC 控制器，通常方法返回逻辑视图名，需要配合 `ViewResolver` 和视图技术（如 JSP）来渲染页面。
        ```java
        @Controller
        @RequestMapping("/users") // 类级别映射
        public class UserController {
            // 方法级别映射
            @RequestMapping(value = "/list", method = RequestMethod.GET)
            public String listUsers(Model model) {
                // ... 添加数据到 Model
                return "userList"; // 返回逻辑视图名
            }
        }
        ```
    * **背后原理浅析：** `@Controller` 是一个 Spring Stereotype 注解，会被 `@ComponentScan` 扫描并注册为 Bean。`RequestMappingHandlerMapping` 会检测到这个 Bean，并解析其内部 `@RequestMapping` 等注解信息，构建 URL 到方法的映射关系。
    * **面试关联：** “`@Controller` 注解的作用是什么？”

* **`@RestController`**
    * **功能与目的：** 复合注解，等同于 `@Controller` + `@ResponseBody`。标识这是一个用于构建 RESTful Web 服务的控制器。它继承了 `@Controller` 的功能，同时默认将方法返回值直接作为 HTTP 响应体，而不是作为逻辑视图名。
    * **使用场景与示例：** 构建 RESTful API 接口，返回 JSON、XML 等数据格式。
        ```java
        @RestController // 等同于 @Controller + @ResponseBody
        @RequestMapping("/api/users")
        public class UserRestController {
            @GetMapping("/{id}") // 处理 GET /api/users/{id} 请求
            public User getUser(@PathVariable Long id) { // 方法返回值 User 对象会被转换为 JSON
                // ... 返回用户数据
                return new User(id, "Test User");
            }
        }
        ```
    * **背后原理浅析：** `@RestController` 也是一个 Stereotype 注解，会被 `HandlerMapping` 扫描。因为包含了 `@ResponseBody`，其方法返回值会由 `HandlerMethodReturnValueHandler` 中的 `RequestResponseBodyMethodProcessor` 处理，该处理器会使用 `HttpMessageConverter` 将返回值序列化并写入响应体，**跳过视图解析流程**。
    * **面试关联：** “`@Controller` 和 `@RestController` 的区别是什么？” （回答 `@RestController` = `@Controller` + `@ResponseBody`，解释 `@ResponseBody` 的作用和对视图解析的影响）

#### 2.2 请求映射注解

这些注解用于将特定的 Web 请求（基于 URL、HTTP 方法等）映射到控制器中的方法上。

* **`@RequestMapping`**
    * **功能与目的：** 应用于类或方法上，用于建立 Web 请求到处理器方法之间的映射关系。它是 Spring MVC 最核心的请求映射注解。
    * **常用属性：**
        * `value` 或 `path`：指定请求 URL 路径（支持 Ant 风格路径和路径变量）。
        * `method`：指定 HTTP 请求方法（`RequestMethod.GET`, `POST`, `PUT`, `DELETE` 等）。
        * `params`：根据请求参数是否存在或值来匹配。
        * `headers`：根据请求头信息来匹配。
        * `consumes`：指定处理哪些媒体类型的请求体（如 `application/json`）。
        * `produces`：指定生成哪些媒体类型的响应体（如 `application/json`）。
    * **使用场景与示例：** 可以用于类级别定义基础路径，方法级别定义具体路径和方法。
        ```java
        @Controller
        @RequestMapping("/products") // 类级别：所有方法路径都基于 /products
        public class ProductController {
            @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json") // 方法级别：GET /products/{id}，响应 JSON
            @ResponseBody // 方法返回值直接作为响应体 (如果不是 @RestController)
            public Product getProduct(@PathVariable Long id) { ... }

            @RequestMapping(value = "", method = RequestMethod.POST, consumes = "application/json") // 方法级别：POST /products，请求体是 JSON
            public ResponseEntity<Void> addProduct(@RequestBody Product product) { ... }
        }
        ```
    * **背后原理浅析：** `@RequestMapping` 注解的信息由 **`HandlerMapping`** 组件（特别是 `RequestMappingHandlerMapping`）在应用启动时进行扫描和解析。`RequestMappingHandlerMapping` 会构建一个内部查找表，将请求信息（URL、Method 等）与对应的处理器方法 (`HandlerMethod`) 关联起来。当请求到来时，`DispatcherServlet` 委托 `HandlerMapping`，`HandlerMapping` 就是根据 `@RequestMapping` 注解的匹配规则来查找对应的 Handler 方法。
    * **面试关联：** “`@RequestMapping` 注解有哪些常用属性？如何根据这些属性进行请求匹配？” “`@RequestMapping` 是如何在 Spring MVC 中工作的？由哪个组件负责？”

* **`@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`, `@PatchMapping`**
    * **功能与目的：** `@RequestMapping(method = RequestMethod.GET)` 等的便捷缩写。使得代码更简洁、意图更清晰。
    * **使用场景与示例：** 推荐在大多数情况下使用这些派生注解代替 `@RequestMapping` 的 `method` 属性。
        ```java
        @RestController
        @RequestMapping("/api/orders")
        public class OrderRestController {
            @GetMapping("/{id}") // 代替 @RequestMapping(value="/{id}", method=RequestMethod.GET)
            public Order getOrder(@PathVariable Long id) { ... }

            @PostMapping("") // 代替 @RequestMapping(value="", method=RequestMethod.POST)
            public ResponseEntity<Void> createOrder(@RequestBody Order order) { ... }
            // ... @PutMapping, @DeleteMapping, @PatchMapping
        }
        ```
    * **背后原理浅析：** 它们本身也是元注解，通过 `@RequestMapping(...)` 标注了具体的 HTTP 方法。`HandlerMapping` 同样能够识别这些注解进行映射。
    * **给开发者的建议：** 优先使用这些方法特异性注解，提高代码可读性。
    * **面试关联：** “`@GetMapping` 和 `@RequestMapping(method = RequestMethod.GET)` 有什么区别？” （回答是便捷缩写，功能相同）

#### 2.3 请求参数绑定注解

这些注解用于从各种请求源（URL 路径、Query 参数、请求头、请求体等）提取数据并绑定到处理器方法的参数上。它们由 `HandlerMethodArgumentResolver` 处理。

* **`@RequestParam`**
    * **功能与目的：** 绑定 Web 请求的 Query Parameter 或表单参数到处理器方法的参数上。
    * **常用属性：** `value` (参数名), `required` (是否必需，默认 true), `defaultValue` (默认值)。
    * **使用场景与示例：** 获取 URL 后面的 `?name=value` 形式的参数。
        ```java
        @GetMapping("/search")
        public String searchProducts(@RequestParam("keyword") String keyword, // 绑定 keyword 参数
                                     @RequestParam(value = "page", defaultValue = "1") int page) { // 绑定 page 参数，提供默认值
            // ...
            return "searchResults";
        }
        ```
    * **背后原理浅析：** `RequestMappingHandlerAdapter` 在调用处理器方法时，会查找能够处理 `@RequestParam` 的 `HandlerMethodArgumentResolver` (如 `RequestParamMethodArgumentResolver`)。该解析器从请求中获取对应名称的参数值，并进行类型转换，最终绑定到方法参数上。
    * **面试关联：** “如何获取请求的 Query 参数？”

* **`@PathVariable`**
    * **功能与目的：** 绑定 URI 模板变量的值到处理器方法的参数上。URI 模板变量是 URL 路径中用 `{}` 包围的部分。
    * **使用场景与示例：** RESTful 风格的 URL 中获取资源标识符。
        ```java
        @GetMapping("/users/{id}")
        public User getUser(@PathVariable("id") Long userId) { // 绑定 {id} 到 userId 参数
            // ...
            return userService.findById(userId);
        }
        ```
    * **背后原理浅析：** 同样由 `RequestMappingHandlerAdapter` 调用 `PathVariableMethodArgumentResolver` 进行解析和绑定。`HandlerMapping` 在匹配带有路径变量的 URL 时，会提取出变量的实际值，并将这些值传递给参数解析器。
    * **面试关联：** “`@RequestParam` 和 `@PathVariable` 的区别是什么？”

* **`@RequestBody`**
    * **功能与目的：** 将 HTTP 请求体的内容绑定到处理器方法的参数上。常用于接收 POST 或 PUT 请求提交的 JSON、XML 等数据。
    * **使用场景与示例：** 接收客户端提交的结构化数据。
        ```java
        @PostMapping("/users")
        public ResponseEntity<Void> createUser(@RequestBody User user) { // 将请求体 JSON 绑定到 User 对象
            // ... 创建用户
            return ResponseEntity.created(...).build();
        }
        ```
    * **背后原理浅析 (深入)：** 由 `RequestMappingHandlerAdapter` 调用 `RequestResponseBodyMethodProcessor` (它同时也是一个 `HandlerMethodArgumentResolver` 和 `HandlerMethodReturnValueHandler`) 进行处理。当作为参数解析器时，`RequestResponseBodyMethodProcessor` 会查找合适的 **`HttpMessageConverter`** (如 `MappingJackson2HttpMessageConverter` 用于 JSON)，将请求体的内容读取并反序列化为方法参数指定的类型对象。
    * **面试关联：** “如何接收 POST 请求的 JSON 数据？ `@RequestBody` 是如何工作的？它与哪个组件协作？” （回答 `HttpMessageConverter`）

* **`@RequestHeader`, `@CookieValue`**
    * **功能与目的：** `@RequestHeader` 绑定请求头的值，`@CookieValue` 绑定 Cookie 的值。
    * **背后原理浅析：** 由对应的 `HandlerMethodArgumentResolver` (如 `RequestHeaderMethodArgumentResolver`, `CookieValueMethodArgumentResolver`) 处理。

* **`@ModelAttribute` (参数级别)**
    * **功能与目的：** 绑定请求参数或路径变量到命令对象 (Command Object / POJO) 上。 Spring MVC 会先创建命令对象，然后将请求参数的值绑定到其属性上。也可以用于从 Model 中获取属性。
    * **使用场景与示例：** 接收多个表单参数并绑定到 POJO。
        ```java
        @PostMapping("/saveUser")
        public String saveUser(@ModelAttribute User user) { // 将表单参数绑定到 User 对象
            // ... 保存用户
            return "success";
        }
        ```
    * **背后原理浅析：** 由 `ModelAttributeMethodProcessor` 处理。它首先尝试从 Model 中获取同名对象，如果不存在则创建新对象，然后利用 `WebDataBinder` 将请求参数绑定到对象属性上。

* **`@SessionAttribute`, `@RequestAttribute`**
    * **功能与目的：** 从 Session 或 Request 属性中获取对应名称的值并绑定到方法参数上。
    * **背后原理浅析：** 由对应的 `HandlerMethodArgumentResolver` 处理。

* **`@Valid` / `@Validated`**
    * **功能与目的：** 触发对被标注参数的校验。需要配合 JSR 303/380 (Bean Validation) 及其实现（如 Hibernate Validator）。
    * **使用场景与示例：** 在 `@RequestBody`, `@ModelAttribute` 等参数前使用，对请求体或表单提交的数据进行校验。
        ```java
        @PostMapping("/users")
        public ResponseEntity<Void> createUser(@Valid @RequestBody User user) { // 校验 User 对象
            // ...
        }
        ```
    * **背后原理浅析：** 由 `MethodValidationPostProcessor` 和 Spring MVC 集成的校验器处理。参数解析器在绑定参数后，如果参数被 `@Valid` 或 `@Validated` 标注，会触发校验过程。校验失败会抛出异常，通常由 Spring MVC 的默认异常处理器捕获，或你自定义处理。
    * **面试关联：** “如何在 Spring MVC 中对请求参数进行校验？”

#### 2.4 响应处理注解

这些注解用于控制处理器方法的返回值如何转化为 HTTP 响应。

* **`@ResponseBody`**
    * **功能与目的：** 标注在方法或类上（类级别时对其所有方法生效）。表示方法的返回值不作为逻辑视图名，而是直接写入 HTTP 响应体。常用于返回 JSON、XML 或其他数据格式。
    * **使用场景与示例：** 构建 RESTful API 接口。如前所述，`@RestController` 包含了 `@ResponseBody`。
        ```java
        @GetMapping("/data")
        @ResponseBody // 方法返回值 Map 会被转换为 JSON 并写入响应体
        public Map<String, Object> getData() {
            Map<String, Object> data = new HashMap<>();
            data.put("message", "Hello, Data!");
            return data;
        }
        ```
    * **背后原理浅析 (深入)：** 当 `HandlerMethodReturnValueHandler` (特别是 `RequestResponseBodyMethodProcessor`) 遇到 `@ResponseBody` 注解时，它会使用 **`HttpMessageConverter`** (如 `MappingJackson2HttpMessageConverter` 用于 JSON) 将方法的返回值对象序列化为指定的格式（通常根据请求的 Accept Header 或默认设置），然后将序列化后的数据直接写入 HTTP 响应流。**这个过程完全跳过了 `ViewResolver` 和 `View` 的视图解析和渲染阶段。**
    * **面试关联：** “`@ResponseBody` 注解的作用是什么？它与视图解析有什么区别？它与哪个组件协作？” （回答写入响应体，跳过视图解析，协作组件是 `HttpMessageConverter`）

* **`@ResponseStatus`**
    * **功能与目的：** 标注在方法上或自定义异常类上，用于指定响应的 HTTP 状态码和可选的 reason 信息。
    * **使用场景与示例：** 在方法成功执行后返回特定的状态码，或将某个异常映射到特定的错误状态码。
        ```java
        @PostMapping("/items")
        @ResponseStatus(HttpStatus.CREATED) // 创建成功返回 201 状态码
        public Item createItem(@RequestBody Item item) { ... }

        // 标记在异常类上
        @ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "User Not Found") // 当抛出此异常时返回 404
        public class UserNotFoundException extends RuntimeException { ... }
        ```
    * **背后原理浅析：** 当方法返回或抛出带有 `@ResponseStatus` 的异常时，`HandlerExceptionResolver` 或 Spring MVC 的内部机制会读取这个注解信息，并设置到 HTTP 响应中。

#### 2.5 Model 与 Session 管理注解

这些注解用于处理模型数据和 Session 中的属性。

* **`@ModelAttribute` (方法级别)**
    * **功能与目的：** 标注在 Controller 的方法上。该方法会在当前 Controller 的任何 `@RequestMapping` 方法执行之前执行，其返回值会自动添加到 Model 中。常用于为多个视图共享数据，或初始化表单对象。
    * **使用场景与示例：** 准备下拉列表数据、初始化表单对象。
        ```java
        @Controller
        @RequestMapping("/users")
        public class UserController {
            @ModelAttribute("user") // 在任何 handler 方法执行前执行此方法，返回值添加到 Model，键为 "user"
            public User newUserModel() {
                return new User(); // 每次请求 /users/* 时都会执行此方法，创建 User 对象添加到 Model
            }

            @GetMapping("/new")
            public String showNewUserForm(Model model) {
                // Model 中已包含键为 "user" 的 User 对象 (由 @ModelAttribute 方法添加)
                return "userForm";
            }

            @PostMapping("/save")
            public String saveUser(@ModelAttribute("user") User user) { // 此处的 @ModelAttribute 用于从 Model 中获取对象并绑定请求参数
                // ... 保存用户
                return "redirect:/users/list";
            }
        }
        ```
    * **背后原理浅析：** 由 `ModelAttributeMethodProcessor` (作为 `HandlerMethodReturnValueHandler`) 处理标注在方法上的 `@ModelAttribute`。它将方法的返回值添加到 Model 中。这个方法会在请求处理流程中较早的阶段执行，确保 Model 中包含所需的数据。
    * **面试关联：** “`@ModelAttribute` 注解的作用是什么？它有哪些用法（方法级别和参数级别）？”

* **`@SessionAttributes`**
    * **功能与目的：** 标注在 Controller 类上。指定 Model 中哪些属性需要存储到 Session 中，以便在多个请求之间共享。
    * **使用场景与示例：** 用于跨请求维护表单向导状态等。
        ```java
        @Controller
        @RequestMapping("/booking")
        @SessionAttributes({"bookingForm", "step"}) // 将 Model 中键为 "bookingForm" 和 "step" 的属性存储到 Session
        public class BookingController {
            // ...
            @GetMapping("/step1")
            public String setupStep1(Model model) {
                model.addAttribute("bookingForm", new BookingForm());
                model.addAttribute("step", 1);
                return "bookingStep1";
            }

            @PostMapping("/step1")
            public String processStep1(@ModelAttribute BookingForm bookingForm, Model model) {
                 // bookingForm 会从 Session 中获取 (如果已存在)，并绑定请求参数
                 model.addAttribute("step", 2); // 更新 step，也会存储到 Session
                 return "redirect:/booking/step2";
            }
        }
        ```
    * **背后原理浅析：** `RequestMappingHandlerAdapter` (通过其内部组件) 会在 Model 处理完成后，根据 `@SessionAttributes` 注解中指定的属性名，将 Model 中的对应属性同步到 HttpSession 中。
    * **给开发者的建议：** 谨慎使用 `@SessionAttributes`，Session 存储资源消耗较大，且不利于分布式部署。优先考虑其他状态管理方式（如隐藏字段、缓存等）。
    * **面试关联：** “如何在 Spring MVC 中跨请求共享 Model 数据？ `@SessionAttributes` 是如何工作的？”

### 注解在 Spring MVC 中的作用总结

Spring MVC 中的注解共同构成了其声明式的编程模型，它们的核心作用在于：

* **简化 Handler 定义：** `@Controller`, `@RestController` 标识 Bean 的角色，`@RequestMapping` 及其派生注解定义请求与方法的映射，替代了复杂的 XML 配置或接口实现。
* **自动化参数绑定：** `@RequestParam`, `@PathVariable`, `@RequestBody` 等注解，配合 `HandlerMethodArgumentResolver`，使得从请求中获取各类数据变得异常简单，无需手动解析 Servlet API。
* **自动化响应处理：** `@ResponseBody` 注解，配合 `HandlerMethodReturnValueHandler` 和 `HttpMessageConverter`，使得返回数据格式（如 JSON）变得非常便捷，无需手动操作响应流或依赖视图技术。
* **与核心组件协作：** 注解是驱动 Spring MVC 核心组件 (`HandlerMapping`, `HandlerAdapter`, `ViewResolver` 等) 工作的重要指令。

### 注解与 Spring MVC 请求流程的关联

回顾 Spring MVC 的请求处理流程，我们可以看到注解是如何驱动这个流程的：

* `HandlerMapping` 根据 `@RequestMapping` 及其派生注解找到对应的 Handler 方法 (`HandlerMethod`)。
* `HandlerAdapter` (`RequestMappingHandlerAdapter`) 调用找到的 `HandlerMethod`。
* 在调用方法前，`HandlerAdapter` 查找并使用 `HandlerMethodArgumentResolver` 集合，这些解析器根据方法参数上的注解 (`@RequestParam`, `@PathVariable`, `@RequestBody`, `@ModelAttribute` 等) 将请求数据绑定到方法参数上。
* 在调用方法后，`HandlerAdapter` 查找并使用 `HandlerMethodReturnValueHandler` 集合，这些处理器根据方法返回值的类型或注解 (`@ResponseBody`, `@ModelAttribute` 等) 来处理返回值，例如：
    * 遇到 `@ResponseBody`，使用 `HttpMessageConverter` 将返回值写入响应体，**跳过视图解析**。
    * 遇到 `ModelAndView` 或逻辑视图名，流程继续到 `ViewResolver`。
* `HandlerExceptionResolver` 可以处理抛出异常时方法或异常类上的 `@ResponseStatus` 等注解。

简而言之，注解是开发者与 Spring MVC 框架进行“交流”的语言。你用注解告诉框架“这个方法处理这个路径的 GET 请求，需要从请求体里拿 JSON 数据转成 User 对象作为参数，方法返回值直接转成 JSON 返回”。框架的各个组件则“读懂”这些注解，并执行相应的操作。

### 注解使用建议

* **清晰明了：** 合理使用 `@RequestMapping` 的属性，使用 `@GetMapping` 等派生注解。
* **推荐 `@RestController`：** 构建 RESTful API 时的首选。
* **合理使用参数注解：** 根据数据来源选择合适的注解 (`@RequestParam`, `@PathVariable`, `@RequestBody` 等)。
* **区分 `@Value` 和 `@ConfigurationProperties`：** `@Value` 用于分散属性，`@ConfigurationProperties` 用于结构化属性集。
* **理解 `@ModelAttribute` 的双重作用：** 方法级别用于向 Model 添加数据，参数级别用于从 Model 获取并绑定请求参数。

### 理解注解如何助你理解 Spring MVC 和应对面试

掌握 Spring MVC 常用注解，并理解其背后的处理机制和与核心组件的关联，是应对面试官考察 Spring MVC 核心原理的利器：

* **直接关联面试问题：** 许多面试问题直接就是关于某个注解的用法或原理。
* **展现原理深度：** 能将注解与 `HandlerMapping`, `HandlerAdapter`, `HandlerMethodArgumentResolver`, `HandlerMethodReturnValueHandler`, `HttpMessageConverter`, `ViewResolver` 等组件串联起来，解释请求流程中注解的“作用点”和“执行者”，能体现你对框架底层原理的深刻理解。
* **解释核心流程：** 在描述 Spring MVC 请求处理流程时，可以自然地穿插讲解各个阶段涉及的注解及其如何驱动流程。

### 面试问题示例与深度解析

* **请描述一下 Spring MVC 的请求处理流程，并说明其中涉及哪些常用注解及其作用？** (综合题，将流程与注解结合讲解)
* **`@Controller` 和 `@RestController` 的区别是什么？** (回答 `@RestController` = `@Controller` + `@ResponseBody`，解释 `@ResponseBody` 作用及对视图解析的影响)
* **`@RequestMapping` 注解有哪些常用属性？如何根据这些属性进行请求匹配？** (列举属性并说明匹配规则)
* **请解释 `@RequestParam` 和 `@PathVariable` 的区别和使用场景。**
* **如何在 Spring MVC 中接收 POST 请求发送的 JSON 数据？ `@RequestBody` 注解是如何工作的？它与哪个组件协作？** (回答 `@RequestBody`，解释其工作原理，协作组件是 `HttpMessageConverter`)
* **如何在 Spring MVC 中将方法返回值直接作为 JSON 响应给客户端？ `@ResponseBody` 注解是如何工作的？它与视图解析有什么关系？** (回答 `@ResponseBody` 或 `@RestController`，解释 `HttpMessageConverter` 序列化，跳过视图解析)
* **`@ModelAttribute` 注解有哪些用法？** (回答方法级别和参数级别，并解释各自的作用)
* **如何在 Spring MVC 中对请求参数进行校验？** (回答 `@Valid` / `@Validated` 配合 Bean Validation)

### 总结

Spring MVC 的常用注解是构建强大 Web 层的基石。从 `@Controller` 定义控制器，到 `@RequestMapping` 映射请求，再到 `@RequestParam`, `@PathVariable`, `@RequestBody` 绑定参数，`@ResponseBody` 处理响应，`@ModelAttribute` 管理模型数据，这些注解以声明式的方式极大地简化了 Web 开发。

掌握这些注解的功能、用法，并深入理解它们如何被 `HandlerMapping`, `HandlerAdapter` 等 Spring MVC 核心组件在请求处理流程中识别和处理，特别是 `@RequestBody` 和 `@ResponseBody` 如何与 `HttpMessageConverter` 协作并影响视图解析流程，是成为一名优秀 Spring MVC 开发者的关键。这不仅能提升你的实战能力，更是应对面试官对 Web 框架原理考察的必备知识。
