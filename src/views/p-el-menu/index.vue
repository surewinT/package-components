<!--
 * @Date: 2020-12-09 17:52:54
 * @Author: surewinT 840325271@qq.com
 * @LastEditTime: 2022-05-11 00:06:00
 * @LastEditors: surewinT 840325271@qq.com
 * @Description: 调用页面
-->

<template>
  <div class="">
    <el-menu class="p-el-menu">
      <Menutree :menuList="menuList" />
    </el-menu>
  </div>
</template>

<script>
import Menutree from "@/components/p-el-menu";
export default {
  components: {
    Menutree,
  },
  props: [],
  data() {
    return {
      menuList: [
        {
          label: "菜单1",
          value: "1",
          children: [
            {
              label: "菜单1-1",
              value: "1-1",
            },
            {
              label: "菜单1-2",
              value: "1-2",
              children: [
                {
                  label: "菜单1-2-1",
                  value: "1-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "菜单2",
          value: "2",
          childern: [],
        },
        {
          label: "菜单3",
          value: "3",
          children: [
            {
              label: "菜单3-1",
              value: "3-1",
            },
          ],
        },
      ],
    };
  },
  mounted() {},
  watch: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.p-el-menu {
  width: 200px;
}
</style>
