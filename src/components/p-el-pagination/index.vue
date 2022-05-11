<!--
 * @Date: 2021-09-27 17:17:18
 * @Author: surewinT 840325271@qq.com
 * @LastEditTime: 2022-05-11 20:13:05
 * @LastEditors: surewinT 840325271@qq.com
 * @Description: 分页器组件
-->

<template>
  <div class="" style="text-align: center">
    <el-pagination
      @size-change="sizeChange"
      @current-change="pageChange"
      :current-page="currentPage"
      :page-sizes="[30, 50, 100, 200, 500]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
      small
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    total: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 30,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentPage: 1,
      currentsize: 30,
    };
  },
  mounted() {
    this.currentsize = this.size;
    this.currentPage = this.page;
  },
  watch: {
    size() {
      this.currentsize = this.size;
    },
    page() {
      this.currentPage = this.page;
    },
  },
  methods: {
    sizeChange(val) {
      this.currentsize = val;
      // size变化时，默认定位到第一页
      this.currentPage = 1;
      this.$emit("handlePageSizeChange", this.currentPage, this.currentsize);
    },
    pageChange(val) {
      this.currentPage = val;
      this.$emit("handlePageSizeChange", this.currentPage, this.currentsize);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .el-input__inner {
    height: 25px;
  }
}
</style>
