import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from './store'
import VueAxios from 'vue-axios'//方便我们用Vue去调用，而不用每个页面都调用
import App from './App.vue'
import router from './router'
// import env from './env'//如果是自己写的文件作为插件载入，必须在前面加./
axios.defaults.timeout = 8000;//响应超时时间
//根据环境变量获取请求地址
axios.defaults.baseURL = '/api';
//拦截代码,interce是拦截器，可以拦截用户请求等，从而统一处理
//responce是返回值，就函数执行之后所返回的值
//拦截全局的接口返回值，从而对错误信息进行处理，responce接受的是接口的返回值
axios.interceptors.response.use(function(response){
  let res = response.data;//responce是axios处理过的值，真正的值在responce.data里
  console.log(response);
  let path = location.hash;
  if(res.code == 0)//状态码为0，代表成功
  {
    console.log('bu!mingmingshiwoxian')
    return res.data;
  }  else if(res.code==35){//未登录用户进行访问是，返回10，说明错误
    if(path!='#/selectCourse'){
    window.location.href='/#/login';}
  }
  else{
    //alert(res.msg);
    //用于防止登良失败后还是存储cookie并继续执行的登陆成功的部分
    return Promise.reject();
  }
});



Vue.use(VueAxios,axios);//用于挂载实例
Vue.use(VueCookie);
Vue.use(ElementUI);
Vue.use(VueLazyLoad,{
  loading:'/images/loading-svg/loading-bars.svg'
})
Vue.config.productionTip = false

new Vue({
  //这里能直接写是因为导入的名字和实际的名字一样，如果写成import routs，那么这里要写router:routers
  router,
  //store实例要放在这
  store,
  render: h => h(App),
}).$mount('#app')
