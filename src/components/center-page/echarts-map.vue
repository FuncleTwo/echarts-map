
<!--
 * @Author: honghaosheng
 * @Date: 2023-07-11 09:12:25
 * @LastEditors: honghaosheng
 * @LastEditTime: 2023-07-12 17:18:16
 * 这里的map用到几种技术，一个就是echarts绘制地图，一个是用高德地图的web端口查询行政区，一个就是获取datav的geojson去给echarts绘制地图，逻辑是这样的，通过城市字段查询高德地图的行政区数据，拿到城市的adcode去datav的geojson获取区域的点位，再去给echarts绘制地图
-->
<template>
  <div id="map-container" ref="myEchart" class="echarts-map" />
</template>
<script lang='js'>
import * as echarts from 'echarts'
import dataValue from './json/dataValue'
import geoCoordMap from './json/geoCoordMap'
import { getAdcode, getJson } from './json/geoJson'
import { onBeforeMount, onBeforeUpdate, onBeforeUnmount, onMounted, reactive, ref } from '@vue/composition-api'
// 中国的adcode是100000
const adcode = '100000'
// 高德地图行政区的参数查询
const parameters = {
  key: 'cab2374a60206678667ce802defa8c20',
  keywords: '中国',
  subdistrict: 1
}
// 处理散点图的坐标，这个value的值是[经度,纬度,值]
const convertData = function(data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        // 对应geoCoordMap的name
        name: data[i].name,
        // [经度,纬度,值]
        value: geoCoord.concat(data[i].value)
      })
    }
  }
  console.log('res------------', res)
  return res
}
let areaName = ''
export default {
  name: 'EchartsMap',
  components: { },
  props: {},
  // 通常都是放setup钩子函数里面用
  setup() {
    const state = reactive({
    })
    // 绑定ref
    const myEchart = ref()
    onMounted(() => {
      console.log('myEchart', myEchart.value)
      getGeoJson(adcode)
    })
    // mounted钩子函数
    onBeforeMount(() => {
      getAdcode('https://restapi.amap.com/v3/config/district?', parameters)
        .then((res) => { console.log('res', res) })
    })
    // update钩子函数
    onBeforeUpdate(() => {})
    // destory钩子函数
    onBeforeUnmount(() => {})

    // 获取阿里的数据fetch，axios都行，ajax也可以
    const getGeoJson = (adcode) => {
      areaName = '中华人民共和国'
      const url = `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`
      getJson(url).then(data => {
        console.log('获取数据', data.data)
        initMap(data.data)
      })
      // fetch(url)
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log('获取数据', data)
      //     initMap(data)
      //   })
      // axios.get('https://geo.datav.aliyun.com/areas_v3/bound/140110.json')
      //   .then((response) => {
      //     initMap(data)
      //   })
    }
    // 初始化echarts
    const initMap = (data) => {
      console.log('dayin', areaName, data)
      echarts.registerMap(areaName, data)
      // var chart = echarts.init(document.getElementById('map-container'))
      // vue2全局注册的是用this.$echarts.init(dom)
      const chart = echarts.init(myEchart.value)
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (人)'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        // 画热力对照表
        visualMap: {
          min: 800,
          max: 50000,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          left: '5%',
          bottom: '8%',
          textStyle: {
            color: '#fff'
          },
          color: '#fff',
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        },
        title: {
          text: '设备分布',
          top: 20,
          left: '50%',
          textStyle: {
            color: '#fff'
          }
        },
        // 这里用上面的visualMap替换
        // dataRange: {
        //   min: 0,
        //   max: 500,
        //   text: ['高', '低'],
        //   realtime: true,
        //   calculable: true,
        //   color: ['#131936', '#313876']
        // },
        // 这是第二种方式注册map画中国地图， 配置echarts的option的geo,将注册的地图yls放在echarts的geo中。series里的type:scatter设置coordinateSystem: 'geo'；type: "lines",coordinateSystem: "geo",才能实现散点和飞线效果
        geo: {
          map: areaName,
          zoom: 1,
          roam: true,
          scaleLimit: {
            min: 1.2,
            max: 2
          },
          label: {
            normal: {
              show: false,
              textStyle: {
                fontSize: 12,
                color: 'rgba(69, 194, 248,1)'
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: 12,
                color: 'rgba(69, 194, 248,1)'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(255,209,163, .5)', // 区域边框颜色
              areaColor: 'rgba(73,86,166,.1)', // 区域颜色
              borderWidth: 0.5, // 区域边框宽度
              shadowBlur: 5,
              shadowColor: 'rgba(107,91,237,.7)'
            },
            emphasis: {
              borderColor: '#FFD1A3',
              areaColor: 'rgba(102,105,240,.3)',
              borderWidth: 1,
              shadowBlur: 5,
              shadowColor: 'rgba(135,138,255,.5)'
            }
          }
        },
        series: [
          // 这是第一种方式注册map画中国地图
          // {
          //   name: '犯罪数量',
          //   type: 'map',
          //   map: areaName,
          //   roam: true,
          //   mapLocation: {
          //     y: 60
          //   },
          //   itemStyle: {
          //     emphasis: { label: { show: true }},
          //     areaColor: 'rgba(24, 26, 58, 0.5)',
          //     // color: 'rgba(210, 205, 205, 0.5)'
          //     // borderWidth: 10
          //     borderColor: 'rgba(177, 148, 135,1)'
          //   },
          //   // 高亮下多边形的样式
          //   emphasis: {
          //     itemStyle: {
          //       areaColor: 'green',
          //       borderWidth: 2
          //     }
          //   },
          //   // 选中情况下
          //   select: {
          //     itemStyle: {
          //       areaColor: 'green'
          //     }
          //   },
          //   scaleLimit: {
          //     min: 1,
          //     max: 2
          //   },
          //   label: {
          //     show: false,
          //     color: 'yellow'
          //   },
          //   data: [
          //     { name: '广东省', value: 700 },
          //     { name: '广西壮族自治区', value: 600 },
          //     { name: '福建省', value: 500 },
          //     { name: '江西省', value: 400 },
          //     { name: '湖南省', value: 300 },
          //     { name: '贵州省', value: 200 },
          //     { name: '云南省', value: 100 }
          //   ]
          // },
          {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(dataValue.data),
            symbolSize: function(val) {
              return val[2] / 10
            },
            encode: {
              value: 2
            },
            label: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            }
          }
        ]

      }
      chart.setOption(option)
    }
    return {
      state,
      myEchart,
      getGeoJson,
      initMap,
      convertData
    }
  }
}
</script>
  <style lang='scss' scoped>
  .echarts-map{
    width: 100%;
    height: 100%;
  }
  </style>

