## 一、代理模式的"双重人格"：隔离与控制
代理模式就像明星的经纪人——**控制访问**并**扩展功能**。通过代理对象间接操作目标对象，既能实现业务逻辑隔离（如权限校验），又能无缝添加日志、事务等扩展功能[[1]](https://developer.aliyun.com/article/1630374) [[6]](https://www.cnblogs.com/loquat6/p/17261075.html)。

**静态代理**像是定制西装：
```java
// 接口
public interface Payment {
    void pay();
}

// 目标类
class Alipay implements Payment {
    public void pay() { /* 支付逻辑 */ }
}

// 代理类
class PaymentProxy implements Payment {
    private Alipay target;
    
    public void pay() {
        log("支付开始");
        target.pay(); // 核心调用
        log("支付完成");
    }
}
```
每个接口都需要手动编写代理类，当接口新增方法时，所有代理类必须同步修改，维护成本极高[[2]](https://www.tulingxueyuan.cn/tlzx/javamst/17396.html) [[12]](https://www.yisu.com/jc/215352.html)。

**动态代理**则是万能裁缝：
- **JDK动态代理**：运行时通过反射生成`$Proxy0`类，代理所有接口方法
- **CGLIB代理**：通过ASM生成目标类的子类，连非接口方法也能代理

![代理模式内存模型对比](https://via.placeholder.com/600x200)
_静态代理编译期确定类结构，动态代理运行时生成字节码[[6]](https://www.cnblogs.com/loquat6/p/17261075.html) [[40]](https://www.cnblogs.com/zjfjava/p/16795493.html)_

---

## 二、动态代理的"武功秘籍"
### 1. JDK动态代理：接口的艺术
```java
public class LogHandler implements InvocationHandler {
    private Object target; // 目标对象
    
    public Object invoke(Object proxy, Method method, Object[] args) {
        log(method.getName() + "调用开始");
        Object result = method.invoke(target, args);
        log(method.getName() + "调用结束");
        return result;
    }
}

// 生成代理对象
Payment proxy = (Payment) Proxy.newProxyInstance(
    target.getClass().getClassLoader(),
    target.getClass().getInterfaces(),
    new LogHandler(target)
);
```
**核心机制**：
1. `ProxyGenerator`生成`$Proxy0.class`字节码
2. 代理类继承`Proxy`并实现目标接口
3. 通过`Method`对象反射调用目标方法[[40]](https://www.cnblogs.com/zjfjava/p/16795493.html) [[56]](https://zhuanlan.zhihu.com/p/359480475)

### 2. CGLIB代理：继承的魔法
```java
Enhancer enhancer = new Enhancer();
enhancer.setSuperclass(UserService.class);
enhancer.setCallback(new MethodInterceptor() {
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) {
        log("拦截方法:" + method.getName());
        return proxy.invokeSuper(obj, args); // 调用父类方法
    }
});
UserService proxy = (UserService) enhancer.create();
```
**关键技术**：
- **FastClass机制**：为每个方法生成索引ID，直接通过ID调用方法避免反射
- **ASM字节码操纵**：动态生成继承目标类的子类[[56]](https://zhuanlan.zhihu.com/p/359480475) [[36]](https://segmentfault.com/a/1190000004360241)

---

## 三、性能对决：速度与空间的较量
### JMH基准测试数据（100万次调用）
| 方案          | 耗时(ms) | 内存峰值(MB) | 适用场景                |
|---------------|----------|-------------|-------------------------|
| JDK动态代理   | 120      | 15          | 接口存在、高频更新      |
| CGLIB         | 85       | 22          | 无接口、性能敏感场景    |
| 静态代理      | 95       | 12          | 方法少、长期稳定接口[[36]](https://segmentfault.com/a/1190000004360241) [[57]](https://segmentfault.com/a/1190000004360241?sort=newest)_

**选型建议**：
- **有接口**：优先JDK动态代理（Java 8+性能优化显著）
- **无接口/性能敏感**：选择CGLIB（注意final方法限制）
- **高并发场景**：考虑静态代理预编译优势[[10]](https://www.cnblogs.com/scar1et/p/11955629.html) [[30]](https://blog.csdn.net/qq_33949023/article/details/113223269)

---

## 四、框架级实战：Spring与Dubbo的智慧
### 1. Spring AOP的代理策略
```xml
<!-- 强制使用CGLIB -->
<aop:config proxy-target-class="true">
```
Spring根据目标对象是否实现接口自动选择：
- **实现接口**：JDK动态代理
- **未实现接口**：CGLIB代理
  源码中通过`DefaultAopProxyFactory`决策代理方式[[40]](https://www.cnblogs.com/zjfjava/p/16795493.html) [[44]](https://www.tulingxueyuan.cn/tlzx/javamst/12218.html)

### 2. Dubbo的远程调用
```java
// 服务引用生成代理
ReferenceConfig<DemoService> reference = new ReferenceConfig<>();
reference.setInterface(DemoService.class);
DemoService proxy = reference.get(); // 动态代理对象
```
通过动态代理封装网络通信细节，客户端像调用本地方法一样使用远程服务[[29]](https://developer.aliyun.com/article/1047146) [[59]](https://xie.infoq.cn/article/7b34a71aaaa975b0cb5b41904)

---

## 五、面试直通车：必知必会
### 高频对比题
| 维度         | JDK动态代理                  | CGLIB代理                    |
|--------------|-----------------------------|-----------------------------|
| 实现基础     | 接口                        | 继承                        |
| 性能         | 调用慢（反射）、生成快       | 调用快（FastClass）、生成慢 |
| final限制    | 无影响                      | 无法代理final方法           |
| 内存消耗     | 低                          | 高（生成子类）[[6]](https://www.cnblogs.com/loquat6/p/17261075.html) [[25]](https://www.zhihu.com/question/480315061/answer/2759857305)_

### 设计模式辨析
- **代理 vs 装饰器**：前者控制访问，后者增强功能
- **代理 vs 适配器**：前者保持接口一致，后者转换接口[[44]](https://www.tulingxueyuan.cn/tlzx/javamst/12218.html) [[49]](https://zhuanlan.zhihu.com/p/234911221)

---

## 六、陷阱与优化
### 1. JDK 17+的模块化限制
```bash
# 启动参数添加
--add-opens java.base/java.lang=ALL-UNNAMED
```
Java 9+的模块系统限制了反射访问，需要手动开放权限包[[40]](https://www.cnblogs.com/zjfjava/p/16795493.html)

### 2. 内存泄漏案例
```java
// 错误示例：未关闭ClassLoader
ClassLoader loader = new URLClassLoader(urls);
MyInterface proxy = (MyInterface) Proxy.newProxyInstance(
    loader, interfaces, handler
);
// 长时间运行后PermGen溢出
```
解决方案：及时回收或使用公共ClassLoader[[43]](https://blog.csdn.net/Along39988/article/details/123904213)

---

**延伸阅读**：
- 《Effective Java》条目18：接口优于抽象类
- JEP 416：方法句柄替代反射（JDK 18性能优化）[[46]](https://developer.aliyun.com/article/619238)

掌握代理模式的底层原理与工程实践，是构建高扩展性Java系统的关键。选择代理方案时，需在接口约束、性能需求、维护成本之间寻找平衡点，正如武侠中的"无招胜有招"——理解本质方能游刃有余。