<!--
 * @Date: 2022-05-13 13:55:59
 * @Author: surewinT 840325271@qq.com
 * @LastEditTime: 2022-05-13 22:09:43
 * @LastEditors: surewinT 840325271@qq.com
 * @Description: 调用页面
-->

<template>
  <div class="">
    <p-virtual-check :dataSources="dataList" @check-change="checkChange" />
  </div>
</template>

<script>
import PVirtualCheck from "@/components/p-virtual-check";
export default {
  components: {
    "p-virtual-check": PVirtualCheck,
  },
  props: [],
  data() {
    return {
      dataList: [],
    };
  },
  mounted() {
    this.getData();
  },
  watch: {},
  methods: {
    // 模拟数据获取
    getData() {
      let arr = [];
      for (let i = 0; i < 10000; i++) {
        arr.push({
          label: `名称：${i + 1}`,
          value: `value${i + 1}`,
        });
      }
      this.dataList = arr;
    },

    checkChange(result) {
      console.log("勾选：", result);
    },
  },
};
</script>

<style lang="scss" scoped></style>
