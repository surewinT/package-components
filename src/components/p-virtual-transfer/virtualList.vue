<!--
 * @Date: 2022-01-11 11:02:27
 * @Author: surewinT 840325271@qq.com
 * @LastEditTime: 2022-05-13 21:50:46
 * @LastEditors: surewinT 840325271@qq.com
 * @Description: 列表
-->

<template>
  <div class="check-root">
    <!-- 头部 -->
    <div class="header">
      <el-checkbox v-model="checkAll" @change="changeAll">
        {{ title }}
      </el-checkbox>
      <div class="num">{{ checkNum }}</div>
    </div>
    <div class="search" v-if="showSearch">
      <el-input
        size="small"
        clearable
        placeholder="支持 lable / value 搜索"
        v-model="searchName"
        @input="inputChange"
      >
      </el-input>
    </div>
    <!-- 列表 -->
    <div class="main" :style="{ width: width }">
      <virtual-list
        class="check-virtual-list"
        :keeps="50"
        :key="virtualKey"
        :data-key="dataValue"
        :data-sources="dataSources"
        :data-component="dataComponent"
        :extra-props="extraProps"
      />
    </div>
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import List from "./listItem.vue";
export default {
  name: "p-virtual-transfer",
  components: {
    "virtual-list": VirtualList,
  },
  props: {
    basedata: {
      type: Array,
      default: () => {
        return [];
      },
    },
    width: {
      type: String,
      default: "280px",
    },
    title: {
      type: String,
      default: "",
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
    dataValue: {
      type: String,
      default: "value",
    },
    dataLabel: {
      type: String,
      default: "label",
    },
  },
  data() {
    return {
      // 头部
      checkAll: false,
      searchName: "",
      // 列表
      dataSources: [],
      dataComponent: List,
      extraProps: {
        checkMap: {},
        dataLabel: this.dataLabel,
        dataValue: this.dataValue,
      },
      virtualKey: 0, // 用于强制更新视图
      // 其他
      checkMap: {},
      allCheckMap: {},
    };
  },
  mounted() {
    this.initData();
    // 订阅勾选事件
    this.$on("virtual-transfer-check-change", (key, val) => {
      this.checkMap[key] = val;
      this.extraProps["checkMap"] = this.checkMap;
      this.handleResult();
    });
  },
  watch: {
    basedata() {
      this.initData();
    },
  },
  computed: {
    checkNum() {
      let num = 0;
      for (let key in this.checkMap) {
        this.checkMap[key] ? num++ : "";
      }
      return `${num}/${this.basedata.length}`;
    },
  },
  methods: {
    // 初始化数据
    initData() {
      this.$nextTick(() => {
        this.checkAll = false;
        this.allCheckMap = {};
        this.checkMap = {};
        this.extraProps["checkMap"] = this.checkMap;
        this.basedata.forEach((res) => {
          this.allCheckMap[res[this.dataValue]] = true;
        });
        this.dataSources = this.basedata;
        this.virtualKey++;
      });
    },

    // 全选
    changeAll(val) {
      val
        ? (this.checkMap = JSON.parse(JSON.stringify(this.allCheckMap)))
        : (this.checkMap = {});
      this.extraProps["checkMap"] = this.checkMap;
      this.virtualKey++;
      this.handleResult();
    },

    // 搜索
    inputChange() {
      this.$nextTick(() => {
        this.checkAll = false;
        this.allCheckMap = {};
        // 正则匹配
        let arr = [];
        let searcReg = new RegExp(String(this.searchName));
        this.basedata.forEach((res) => {
          if (
            searcReg.test(String(res[this.dataLabel])) ||
            searcReg.test(String(res[this.dataValue]))
          ) {
            this.allCheckMap[res[this.dataValue]] = true;
            arr.push(res);
          }
        });
        this.dataSources = arr;
        this.virtualKey++;
      });
    },

    // 处理结果
    handleResult() {
      let arr = [];
      for (let key in this.checkMap) {
        this.checkMap[key] === true ? arr.push(key) : "";
      }
      this.$emit("check-change", arr);
    },
  },
};
</script>

<style lang="scss" scoped>
.check-root {
  border: 1px solid #ebeef5;
  .header {
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    background-color: #f5f7fa;
    display: flex;
    justify-content: space-between;
    .num {
      color: #909399;
    }
  }
  .search {
    padding: 5px 20px;
    ::v-deep .el-input__inner {
      border-radius: 10px;
    }
  }

  .main {
    background-color: #fff;
    padding: 0 10px;
    .check-virtual-list {
      height: 400px;
      overflow: auto;
      padding: 0 10px;
    }
  }
}
</style>
