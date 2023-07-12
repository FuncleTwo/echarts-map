<template>
  <div class="center-page">
    <div class="page-map">
      <echarts-map />
    </div>
  </div>
</template>
<script lang='js'>
import EchartsMap from './echarts-map.vue'
import { onBeforeMount, onBeforeUpdate, onBeforeUnmount, onMounted, reactive, ref } from '@vue/composition-api'
export default {
  name: 'CenterPage',
  components: { EchartsMap },
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
    onBeforeUpdate(() => {})
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
.center-page{
  width: 100%;
  height: 100%;
  .page-map{
    width: 100%;
    height: 80%;
  }
  .page-robot{
    width: 100%;
    height: 20%;
  }
}
</style>
