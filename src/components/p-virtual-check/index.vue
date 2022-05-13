<!--
 * @Date: 2022-05-13 14:01:24
 * @Author: surewinT 840325271@qq.com
 * @LastEditTime: 2022-05-13 22:10:20
 * @LastEditors: surewinT 840325271@qq.com
 * @Description: 虚拟列表-多选框组件
-->

<template>
  <div class="">
    <virtual-list
      class="check-virtual-list"
      :keeps="40"
      data-key="value"
      :data-sources="dataSources"
      :data-component="dataComponent"
      :extra-props="extraProps"
    />
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import ListItem from "./listItem.vue";
export default {
  name: "p-virtual-check",
  components: {
    "virtual-list": VirtualList,
  },
  props: {
    dataSources: Array,
  },
  data() {
    return {
      dataComponent: ListItem,
      // 传入组件的额外参数
      extraProps: {},
      checkMap: {},
    };
  },
  mounted() {
    this.setExtraProps();
    // 订阅勾选事件
    this.$on("virtual-check-change", (key, val) => {
      this.checkMap[key] = val;
      this.setExtraProps();
      this.$emit("check-change", this.checkMap);
    });
  },
  watch: {},
  methods: {
    setExtraProps() {
      this.extraProps["checkMap"] = this.checkMap;
    },
  },
};
</script>

<style lang="scss" scoped>
.check-virtual-list {
  height: 400px;
  width: 200px;
  overflow: auto;
  padding: 0 10px;
}
</style>
