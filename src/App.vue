<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import storage from './storage'

export default {
  name: 'app',
  components:{
    //HelloWorld
  },
  data(){
    // return{
    //   res:{}
    // }
  },
  mounted() {
    //本地静态加载json
    // this.axios.get('/mock/user/login.json').then((res)=>{
    //   this.res = res;
    // this.axios.get('/mock').then((res)=>{
    // this.res = res;
    //})
  }
}
</script>

<style>
@import './assets/scss/reset.scss'
</style>
