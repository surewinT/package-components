<!--
 * @Date: 2022-05-10 11:45:08
 * @Author: surewinT 840325271@qq.com
 * @LastEditTime: 2022-05-11 00:05:36
 * @LastEditors: surewinT 840325271@qq.com
 * @Description: 递归生成菜单
-->

<template>
  <div class="">
    <div v-for="(menu, index) in menuList" :key="index">
      <el-menu-item
        v-if="!menu.children || menu.children.length == 0"
        :index="menu.value"
      >
        <i :class="menu.icon ? menu.icon : 'el-icon-menu'"></i>
        <span slot="title" class="group_title">{{ menu.label }}</span>
      </el-menu-item>
      <el-submenu v-else :index="menu.value">
        <template slot="title">
          <i :class="menu.icon ? menu.icon : 'el-icon-menu'"></i>
          <span>{{ menu.label }}</span>
        </template>
        <!-- 递归自身 -->
        <p-el-menu :menuList="menu.children" />
      </el-submenu>
    </div>
  </div>
</template>

<script>
export default {
  // 必须写name
  name: "p-el-menu",
  components: {},
  props: ["menuList"],
  data() {
    return {};
  },
  mounted() {},
  watch: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
