import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

new Vue({
  //这里能直接写是因为导入的名字和实际的名字一样，如果写成import routs，那么这里要写router:routers
  router,
  render: h => h(App),
}).$mount('#app')
