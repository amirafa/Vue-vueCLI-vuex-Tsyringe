import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './class-component-hooks'
// Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// let service=new Service();
// service.fetchData().then((resp)=>{
//   //console.log("router",resp.data.tabs)
//   let tabs=resp.data.tabs;
//   tabs.forEach((element:any) => {
//     router.addRoute({path:`/${element}`,name:`${element}`,component : Marketing})
//   });
//   console.log("here",router.getRoutes());
//   new Vue({
//     router,
//     store,
//     render: h => h(App)
//   }).$mount('#app')
// })
// router.addRoute({
//   path: '/dsf',
//   name: 'homse',
//   component: Marketing
// },)

// console.log("here",router.getRoutes())
