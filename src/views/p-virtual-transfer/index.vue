<!--
 * @Date: 2022-05-13 13:55:59
 * @Author: surewinT 840325271@qq.com
 * @LastEditTime: 2022-05-13 22:10:59
 * @LastEditors: surewinT 840325271@qq.com
 * @Description: 调用页面
-->

<template>
  <div class="">
    <p-virtual-transfer
      data-value="id"
      data-label="name"
      :basedata="basedata"
      v-model="result"
    />
  </div>
</template>

<script>
import PVirtualTransfer from "@/components/p-virtual-transfer";
export default {
  components: {
    "p-virtual-transfer": PVirtualTransfer,
  },
  props: [],
  data() {
    return {
      basedata: [],
      result: ["value1", "value2", "value4"],
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    result() {
      console.log("结果：", this.result);
    },
  },
  methods: {
    // 模拟数据获取
    getData() {
      let arr = [];
      for (let i = 0; i < 10000; i++) {
        arr.push({
          name: `名称：${i + 1}`,
          id: `value${i + 1}`,
        });
      }
      this.basedata = arr;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
