<!--
 * @Date: 2022-01-11 16:54:51
 * @Author: surewinT 840325271@qq.com
 * @LastEditTime: 2022-05-13 22:09:50
 * @LastEditors: surewinT 840325271@qq.com
 * @Description: 勾选框
-->

<template>
  <div class="">
    <el-checkbox v-model="checked" @change="change">
      {{ source.label }}
    </el-checkbox>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    source: {
      type: Object,
      default() {
        return {};
      },
    },
    // 列表的全部勾选情况
    checkMap: Object,
  },
  data() {
    return {
      checked: false,
    };
  },
  mounted() {
    // 回显勾选状态
    this.checkChange();
  },
  watch: {},
  methods: {
    // 勾选改变
    change(val) {
      // 通过全局混入函数，调用对应组件的函数
      this.dispatch(
        "p-virtual-check",
        "virtual-check-change",
        this.source.value,
        val
      );
    },

    // 选择改变
    checkChange() {
      this.checked = this.checkMap[this.source.value] === true ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
