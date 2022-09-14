# Tenon-workbench

workbench 用于连接编辑器与外部服务(head-bar，toolbar，foot-bar...)
使编辑器能够独立于feature之外
feature则可以在实例化时主动请求编辑器实例，di将编辑器实例注入
feature之间的依赖也通过di实现面向interface编程，抽离了实例化的过程

## workbench负责的事情
- 抽象出编辑器接口，不同编辑器可以用不同的方式来实现接口，并且通过adapter进行衔接
- 实现header-bar，toolbar，foot-bar的配置化服务
- 键盘事件的同一管理
- 编辑区域的grid操作，可以注册行列
- widget服务