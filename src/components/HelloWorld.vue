<!--
 * @Author: honghaosheng
 * @Date: 2023-07-12 16:16:52
 * @LastEditors: honghaosheng
 * @LastEditTime: 2023-07-12 17:07:28
-->
<template>
  <div ref="vue3" class="HelloWorld">
    <aaa></aaa>
  </div>
</template>
<script lang='js'>
import { onBeforeMount, onBeforeUpdate, onBeforeUnmount, onMounted, reactive, ref } from '@vue/composition-api'
import aaa from './center-page/index'
export default {
  name: 'HelloWorld',
  components: {aaa},
  props: {},
  // 通常都是放setup钩子函数里面用
  setup() {
    const state = reactive({
    })
    // 绑定ref
    const vue3 = ref()
    onMounted(() => {
      console.log('绑定ref', vue3.value)
    })
    // mounted钩子函数
    onBeforeMount(() => {})
    // update钩子函数
    onBeforeUpdate(() =>{})
    // destory钩子函数
    onBeforeUnmount(() => {})
    return {
      state,
      vue3
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
