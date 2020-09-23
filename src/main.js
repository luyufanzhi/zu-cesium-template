/*
 * @Author: wangchaoxu
 * @Date: 2020-05-12 17:17:38
 * @LastEditors: wangchaoxu
 * @LastEditTime: 2020-09-23 18:04:24
 * @Description:
 */
import Vue from 'vue';
import router from '@/router';
import store from '@/store';
import App from './App.vue';
import '@/plugin/elementui.js';
import '@/plugin/drag.js';
import '@/assets/style/include.less';
global.Cesium = require('cesium');
import 'cesium/Build/Cesium/Widgets/widgets.css';
import('@/components');
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
// 路由拦截守卫
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | cesium演示模版`;
  // 路由配置出声明是否需要登陆访问
  if (to.meta.needLogin) {
    const userName = '张三';
    const role = '管理员';
    if (!userName && to.path !== '/login') {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});
