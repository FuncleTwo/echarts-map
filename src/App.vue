<template>
  <div id="app">
    <router-link :to="{path:'/Helloworld',params:{}}">跳转到地图</router-link>
    <router-view class="map"></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  width: 1920px;
  height: 1080px;
}
.map{width: 100%;
  height: 100%;}
</style>
