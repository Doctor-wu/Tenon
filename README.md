# Tenon / 榫卯

## 体验地址: [传送门](https://doctorwu.club/tenon)

## 🏗️ 升级中的低代码平台...

<!-- ### TODO
- [x] 表单物料 -0
- [x] 展示型组件物料 -0
- [x] 接入方SDK -1
- [x] 真机预览 -1.5
- [ ] 根据基础组件构建复杂组件 -2
- [ ] 页面与布局分离 -3
- [x] For逻辑组件
- [x] If 逻辑组件
- [x] 组件属性绑定解决方案 - tenonPropsBinding及runtimeBinding
- [ ] 弹窗解决方案 -4
- [x] tenon组件状态解决方案 - 物料初始自带状态运行时存储，页面级别状态持久化存储
- [x] tenon组件方法解决方案 - 抽离tenon-event模块，存在于页面级别，可被组件调用 -->


## 2022-09-11 项目改造

### 改造项目

- [ ] 重构tenon系统
  - [ ] 重构现有组件系统交互，props
  - [ ] 将tenon改造为多页应用，抽离出编辑器
  - [ ] 抽离渲染层
  - [ ] 抽离网络层管理网络
  - [ ] 新增数据层来支持组件系统
    - [ ] 将所有操作收敛到mutation中，支持快速撤销与重做
    - [ ] 支持协同, OT
  - [ ] 性能优化
  - [ ] 迁移组件库至TDesign
  - [ ] 支持Service-Worker
  - [ ] 新增测试
  - [ ] 改造为docker项目
  - [ ] 改造 tenon-node-framework
- [ ] 新增workbench系统
  - [x] 参考vscode使用workbench来连接编辑器与feature
  - [x] DI
  - [ ] 可注册widget
  - [x] 可注册feature
  - [x] 可注册工具栏
- [ ] 新增场景编辑器, 可根据基础编辑器构造场景
- [ ] 新增后端场景nodejs服务的低代码支持
  - [ ] 中间件系统