<!--
 * @Date: 2022-01-11 11:02:27
 * @Author: surewinT 840325271@qq.com
 * @LastEditTime: 2022-05-13 22:10:27
 * @LastEditors: surewinT 840325271@qq.com
 * @Description: 虚拟滚动-穿梭框组件
-->

<template>
  <div class="root">
    <!-- 左侧 -->
    <virtual-list
      :data-value="dataValue"
      :data-label="dataLabel"
      ref="Middle"
      title="标题1"
      :basedata="leftData"
      @check-change="leftChange"
    />
    <!-- 中间按钮 -->
    <div class="game-btn">
      <el-button
        icon="el-icon-arrow-left"
        type="primary"
        title="移到左边"
        @click="move('left')"
      ></el-button>
      <el-button
        icon="el-icon-arrow-right"
        type="primary"
        title="移到右边"
        @click="move('right')"
      ></el-button>
    </div>
    <!-- 右侧 -->
    <virtual-list
      ref="Right"
      title="标题2"
      :data-value="dataValue"
      :data-label="dataLabel"
      :basedata="rightData"
      @check-change="rightChange"
    />
  </div>
</template>

<script>
import VirtualList from "./virtualList.vue";
export default {
  components: {
    "virtual-list": VirtualList,
  },
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
    basedata: {
      type: Array,
      default: () => {
        return [];
      },
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
      leftData: [],
      leftSelect: [],
      rightData: [],
      rightSelect: [],
    };
  },
  mounted() {
    this.initData(this.value);
  },
  watch: {
    basedata() {
      this.initData(this.value);
    },
  },
  methods: {
    // 初始化数据
    initData(value) {
      let middleArr = [];
      let rightArr = [];
      let valueMap = {};
      value.forEach((res) => {
        valueMap[res] = true;
      });
      this.basedata.forEach((res) => {
        if (valueMap[res[this.dataValue]]) {
          rightArr.push(res);
        } else {
          middleArr.push(res);
        }
      });
      this.leftData = middleArr;
      this.rightData = rightArr;
    },

    // 左侧勾选
    leftChange(list) {
      this.leftSelect = list;
    },

    // 右侧勾选
    rightChange(list) {
      this.rightSelect = list;
    },

    // 左右移动
    async move(type) {
      let value = [];
      if (type == "right") {
        if (this.leftSelect.length == 0) {
          this.$message("未勾选任何数据");
          return;
        }
        value = [...this.value, ...this.leftSelect];
      }
      if (type == "left") {
        if (this.rightSelect.length == 0) {
          this.$message("未勾选任何数据");
          return;
        }
        value = this.value.filter((res) => {
          return !this.rightSelect.includes(res);
        });
      }
      this.initData(value);
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  display: flex;
  flex: 1;
  width: 910px;
  .game-left {
    border-right: 1px dashed #ccc;
  }
  .game-btn {
    display: flex;
    align-items: center;
    margin: 0 10px;
  }
}
</style>
