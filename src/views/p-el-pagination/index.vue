<!--
 * @Date: 2022-05-11 14:38:32
 * @Author: surewinT 840325271@qq.com
 * @LastEditTime: 2022-05-11 20:12:14
 * @LastEditors: surewinT 840325271@qq.com
 * @Description:
-->

<template>
  <div class="">
            <p-el-pagination
      :total="total"
      :size="100"
      @handlePageSizeChange="handlePageSizeChange"
    />
  </div>
</template>

<script>
import Pagination from "@/components/p-el-pagination";
export default {
  components: {
    "p-el-pagination": Pagination,
  },
  props: [],
  data() {
    return {
      total: 500,
    };
  },
  mounted() {},
  watch: {},
  methods: {
    handlePageSizeChange(page, size) {
      console.log("分页器变化：", page, size);
    },
  },
};
</script>

<style lang="scss" scoped></style>
