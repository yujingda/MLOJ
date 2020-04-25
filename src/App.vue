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
    
    //当在登录页获得用户信息之后，为了防止刷新之后用户信息丢失，我们将其存储在app.vue之中
    this.getUser();
  },
  methods: {
      getUser(){
         let path = location.hash;
          if(path!='#/register'&&path!='#/login'){
            this.axios.get('/user/getcur').then((res)=>{
            this.$store.dispatch('saveUserName',res.user.username);
            this.$store.dispatch('saveIsAdmin',res.user.is_admin);
          });
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/button.scss';
@import './assets/scss/config.scss';
</style>
