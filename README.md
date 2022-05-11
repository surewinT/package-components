<!--
 * @Author: surewinT 840325271@qq.com
 * @Date: 2022-05-05 21:34:05
 * @LastEditors: surewinT 840325271@qq.com
 * @LastEditTime: 2022-05-11 20:16:02
 * @Description: 
-->
# package-components 

本项目对基础组件进行封装，以便更贴合实际业务。

# 目录说明

项目工程基于 [vue-admin-template](https://panjiachen.github.io/vue-element-admin-site/zh/) 搭建，项目工程目录可以查看官网

```
├── src            
      ├── components            # 业务组件库（封装的组件都放在这里）
      │   │── layout-components # 项目的主题组件（vue-admin-template官方的）
      │   │── p-el-checkbox     # 改造的el-checkbox
      │   │── p-el-menu         # vue递归生成菜单栏
      │   │── p-el-pagination   # 封装el-pagination
      ├── views                 # 组件案例
      │   │── login             # 登录页
      │   │── p-el-checkbox     # 改造的el-checkbox案例
      │   │── p-el-menu         # vue递归案例
      │   │── p-el-pagination   # 分页器案例
```


# 相关文章

[【组件封装】改造 Element-UI 多选框组件 (el-checkbox)](https://juejin.cn/post/7095637013214265374)
[【组件封装】二次封装el-pagination，拒绝繁琐配置](https://juejin.cn/post/7096377247673614343)

[【业务实例】vue组件递归及其应用](https://juejin.cn/post/7095993609790423071)

