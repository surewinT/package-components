<!--
 * @Author: surewinT 840325271@qq.com
 * @LastEditTime: 2022-05-09 19:39:48
 * @LastEditors: surewinT 840325271@qq.com
 * @Description: 改造 Element-UI 多选框组件 (el-checkbox)
-->

<template>
  <div :class="customClass">
    <el-checkbox
      v-if="showCheckAll"
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >
      全选
    </el-checkbox>
    <el-checkbox-group
      v-model="labelResult"
      :class="inline ? '' : 'al_checkbox'"
    >
      <span v-for="(item, index) in labelList" :key="index">
        <el-checkbox
          :label="item"
          :class="labelClass"
          @change="handleCheckChange"
          v-if="judgeHidden(item)"
        >
          <span>
            <slot
              name="label"
              :index="index"
              :label="item"
              :checkboxList="checkboxList"
              :disabled="checkboxMap[item] && checkboxMap[item].disabled"
              :data="
                checkboxList[index]
                  ? JSON.parse(JSON.stringify(checkboxList[index]))
                  : {}
              "
            >
              <span> {{ item }} </span>
            </slot>
          </span>
        </el-checkbox>
      </span>
    </el-checkbox-group>
  </div>
</template>

<script>
/**
 * @description:props说明
 * @param {Boolean} showCheckAll -是否显示全选按钮
 * @param {Boolean} inline -是否是行内表单
 * @param {Array<Object>} checkboxList -多选框组件的数据配置
 * @param {String} label -label对应的字段
 * @param {String} prop -value对应的字段
 * @param {Array} defaultCheck -默认勾选的项
 * @param {String} resultType -绑定值的类型(支持对象、数组两种格式)
 * @param {String} labelClass -单个选项绑定类名，可用于自定义样式
 * @param {String} customClass -多选框的绑定类型，可用于自定义样式
 * @param {Array} checkboxHidden -隐藏的表单项，元素对应checkboxList中prop的值
 */
export default {
  name: "ByCheckboxGroup",
  props: {
    showCheckAll: {
      type: Boolean,
      default: true,
    },
    inline: {
      type: Boolean,
      default: true,
    },
    checkboxList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    label: {
      type: String,
      default: "label",
    },
    prop: {
      type: String,
      default: "value",
    },
    defaultCheck: {
      type: Array,
      default: () => {
        return [];
      },
    },
    resultType: {
      type: String,
      default: "Array", // 可选：Array 、Object
    },
    labelClass: {
      type: String,
      default: "",
    },
    customClass: {
      type: String,
      default: "",
    },
    checkboxHidden: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      labelList: [],
      labelResult: [],
      labelMap: {}, // label与res的映射(res指checkboxList每一项元素)
      isIndeterminate: false,
      checkAll: false,
      currentLabel: null,
      currentValue: null,
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    arrayRusult: function () {
      let result = [];
      if (this.resultType == "Array") {
        this.labelResult.forEach((res) => {
          result.push(this.labelMap[res]);
        });
      }
      return result;
    },
    objectRusult: function () {
      let obj = {};
      if (this.resultType == "Object") {
        for (let item in this.labelMap) {
          if (this.checkboxHidden.indexOf(this.labelMap[item]) != -1) {
            continue;
          }
          if (this.labelResult.indexOf(item) == -1) {
            obj[this.labelMap[item]] = false;
          } else {
            obj[this.labelMap[item]] = true;
          }
        }
      }
      return obj;
    },
    // 名字映射
    checkboxMap() {
      let obj = {};
      for (let res of this.checkboxList) {
        obj[res[this.label]] = res;
      }
      return obj;
    },
  },
  watch: {
    checkboxList() {
      this.loadData();
    },
    labelResult() {
      this.isIndeterminate = true;
      this.checkAll = false;
      if (this.labelResult.length == 0) {
        this.isIndeterminate = false;
        this.checkAll = false;
      } else if (
        this.labelResult.length ==
        this.labelList.length - this.checkboxHidden.length
      ) {
        this.isIndeterminate = false;
        this.checkAll = true;
      }
      // 返回数组结果
      if (this.resultType == "Array") {
        this.$emit("input", this.arrayRusult);
      }
      // 返回对象结果
      if (this.resultType == "Object") {
        this.$emit("input", this.objectRusult);
      }
    },
    defaultCheck() {
      this.labelResult = [];
      this.checkboxList.forEach((res) => {
        if (this.defaultCheck.indexOf(res[this.prop]) != -1) {
          this.labelResult.push(res[this.label]);
        }
      });
    },
  },
  methods: {
    // 初始化数据
    loadData() {
      this.checkboxList.forEach((res) => {
        this.labelList.push(res[this.label]);
        this.labelMap[res[this.label]] = res[this.prop];
        if (this.defaultCheck.indexOf(res[this.prop]) != -1) {
          this.labelResult.push(res[this.label]);
        }
      });
    },
    // 全选按钮
    handleCheckAllChange(val) {
      this.isIndeterminate = false;
      if (val) {
        this.isIndeterminate = false;
        this.checkAll = true;
        this.labelResult = JSON.parse(JSON.stringify(this.labelList));
        // 过滤隐藏选项
        this.labelResult = this.labelResult.filter((res) => {
          let exist = this.checkboxHidden.indexOf(this.labelMap[res]);
          return exist == -1;
        });
      } else {
        this.checkAll = false;
        this.labelResult = [];
      }
    },
    // 单击多选框
    handleCheckChange(val, e) {
      this.currentLabel = this.labelMap[e.target.value];
      this.currentValue = val;
      // 返回数组结果：（勾选结果，点击的prop，点击的prop是否勾选）
      if (this.resultType == "Array") {
        this.$emit(
          "change",
          this.arrayRusult,
          this.currentLabel,
          this.currentValue
        );
      }
      // 返回对象结果：（勾选结果，点击的prop，点击的prop是否勾选）
      if (this.resultType == "Object") {
        this.$emit(
          "change",
          this.objectRusult,
          this.currentLabel,
          this.currentValue
        );
      }
    },
    // 隐藏判断
    judgeHidden(name) {
      let show =
        this.checkboxHidden.indexOf(this.labelMap[name]) == -1 ? true : false;
      return show;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-checkbox {
  display: inline-block;
  padding-right: 10px;
}
.al_checkbox {
  .el-checkbox {
    display: block;
    margin-right: 0;
  }
}
// 滚动条样式修改
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 10px;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: rgba(155, 155, 155, 0.8);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(155, 155, 155, 0.1);
}
</style>
