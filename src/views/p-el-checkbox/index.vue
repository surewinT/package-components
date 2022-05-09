
<!--
 * @Date: 2020-12-09 17:52:54
 * @Author: surewinT 840325271@qq.com
 * @LastEditTime: 2022-05-09 14:49:13
 * @LastEditors: surewinT 840325271@qq.com
 * @Description: 调用页面
-->

<template>
    <div class="">
        <p-el-checkbox
            v-model="result"
            resultType="Array"
            label="name"
            prop="id"
            :defaultCheck="defaultCheck"
            :checkboxList="checkboxList"
        />
    </div>
</template>

<script>
import Pelcheckbox from "@/components/p-el-checkbox";
export default {
    components: {
        "p-el-checkbox": Pelcheckbox,
    },
    props: [],
    data() {
        return {
            defaultCheck: ["1", "3"],
            checkboxList: [
                { name: "小红", id: "1" },
                { name: "小明", id: "2" },
                { name: "小芳", id: "3" },
            ],
            result: {},
        };
    },
    mounted() {},
    watch: {
        result: function () {
            console.log("变化了：", this.result);
        },
    },
    methods: {},
};
</script>

<style lang='scss' scoped>
</style>
