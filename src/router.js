/*
 * @Author: honghaosheng
 * @Date: 2023-07-12 16:46:51
 * @LastEditors: honghaosheng
 * @LastEditTime: 2023-07-12 17:04:42
 */
import Vue from 'vue'
import VueRouter from "vue-router"
// 组件比vue实例后创建，官方文档中提到组件必须先于实例化引入
Vue.use(VueRouter)
const constantRoutes = [{
    path:'/Helloworld',
    component: () => import('@/components/HelloWorld'),
}]
// 创建路由
const router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
routes: constantRoutes})
export default router
