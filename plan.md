# 计划

## Redux 与 Firebase 集成参考教程

- [How to Integrate React Redux and Firebase in 3 Simple Steps](https://medium.com/quick-code/how-to-integrate-react-redux-and-firebase-in-3-simple-steps-c44804a6af38)
- [Adding Authentication To React Redux Firebase App](https://medium.com/quick-code/adding-authentication-to-react-redux-firebase-app-f0efcb1c519a)
- [How to use Redux in React Firebase](https://www.robinwieruch.de/react-firebase-redux-tutorial)

## 待克服的问题

- Firebase 数据库的数据结构如何设计？Firebase 和 Redux 都建议数据结构应当尽可能的扁平化，这样会使得查询性能更佳等等。
- 如何将 Firebase 的用户认证和数据库较为优雅地与 Redux 结合使用。我希望达到的效果是：除了 Redux 本身与 React 绑定使用 Context API 外，不再使用 Context 或者高阶组件、渲染属性这些模式。Hooks 可以考虑。
- 组件库的选择：antd 更易上手，但是 Marterial-UI 显然更加吸引我。
- 数据结构从数组改为对象，避免在添加新项目时，数组结构需要去重等问题。
- 规范路由配置。
- 使用 Firebase Storage 来实现上传和下载图片、音频等。[上传文件示例](https://firebase.google.com/docs/storage/web/upload-files?authuser=0#full_example)
- moment 时区问题。全局设置为 zh-CN，但是可能由于使用 VPN，时区有时候会切换到美国等地区。
- 实现音单功能，每个音单有一个主题，比如掏耳、舔耳、淫语等。
- 实现基于作者、标签、语言等维度的过滤展示，考虑是在前端实现还是客户端实现？

## 使用 Material-UI 的网页布局参考

- [material-kit-react](https://demos.creative-tim.com/material-kit-react/#/)
- [material-kit-react](https://demos.creative-tim.com/material-kit-react/#/landing-page)
- [material-dashboard-react](https://demos.creative-tim.com/material-dashboard-react/#/admin/notifications)

## 有关 React-Router

- [All About React Router 4 - CSS Tricks](https://css-tricks.com/react-router-4/)
- [关于 React Router 4 的一切](https://github.com/xitu/gold-miner/blob/master/TODO/all-about-react-router-4.md)
- [[译]基于 React Router 4 的可复用 Layout 组件](https://segmentfault.com/a/1190000008976511)

## 写一个爬虫，爬取 DLsite 上某些作品的封面地址，作者，标签等
