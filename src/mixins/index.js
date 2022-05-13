/*
 * @Date: 2022-01-07 16:21:56
 * @Author: surewinT 840325271@qq.com
 * @LastEditTime: 2022-05-13 15:49:21
 * @LastEditors: GZ1204 唐必赢
 * @Description: mixin 混入
 */

import Vue from 'vue'

Vue.mixin({
    data() {
        return {}
    },
    methods: {
        // 组件事件传递
        dispatch(componentName, eventName, ...rest) {
            let parent = this.$parent || this.$root
            let name = parent.$options.name

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent
                if (parent) {
                    name = parent.$options.name
                }
            }

            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(rest))
            }
        }
    }
})