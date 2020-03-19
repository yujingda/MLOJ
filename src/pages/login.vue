<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img src="/images/login-new-logo.png" alt=""></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import NavFooter from './../components/NavFooter'
export default {
  name: 'login',
  components:{
    NavFooter
  },
  //这种声明方式是声明局部的data对象
  data(){
    return {
      username:'',
      password:'',
      //把uid当作cookie来使用，每次请求时将uid进行传输，从而使后端能够识别
      userId:''
    }
  },
  //这种声明方式声明的是全局的data对象，可能会造成数据混用
  // data:{

  // }
  methods:{
    // 获得的登录信息都存放在内存之中，页面刷新就会消失，因此要写函数将其保留
    login(){
      //解构，将username和pwd从数据（this之中）中结构出来，
      let { username,password } = this;
      this.axios.post('/user/login',{
        username,//当key和value都一样的时候，这楼里就可以简写，否则要写为username:a的形似
        password
      }).then((res)=>{
        //在全局函数设置了promise.reject之后，就可以在登陆失败时抛出异常而停止执行，转向catch
        this.$cookie.set('userId',res.id,{expires:'Session'});
        //想要把用户名传给首页，需要用vuex
        // this.$store.dispatch('saveUserName',res.username);
        // this.saveUserName(res.username);
        this.$router.push('/index'
          // name:'index',
          // params:{
          //   from:'login'
          // }
        );
      })
    },
    ...mapActions(['saveUserName']),
    register(){
      this.axios.post('/user/register',{
        username:'admin1',
        password:'admin1',
        email:'admin1@163.com'
      }).then(()=>{
        this.$message.success('注册成功');
      })
    }
  }
}
</script>
<style lang="scss">
.login{
  &>.container{
    height:113px;
    img{
      width:auto;
      height:100%;
    }
  }
  .wrapper{
    background:url('/images/login-bg-cou.jpg') no-repeat center;
    .container{
      height:576px;
      position: relative;
      .login-form{
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width:410px;
        height:510px;
        background-color:#ffffff;
        position:absolute;
        bottom:29px;
        right:0;
        h3{
          line-height:23px;
          font-size:24px;
          text-align:center;
          margin:40px auto 49px;
          .checked{
            color:#FF6600;
          }
          .sep-line{
            margin:0 32px;
          }
        }
        .input{
          box-sizing: border-box;
          display:inline-block;
          width:348px;
          height:50px;
          border:1px solid #E5E5E5;
          margin-bottom:20px;
          input{
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn{
          box-sizing: border-box;
          width:100%;
          line-height:50px;
          height: 50px;
          margin-top:10px;
          font-size:16px;
        }
        .tips{
          margin-top:14px;
          display:flex;
          justify-content:space-between;
          font-size:14px;
          cursor:pointer;
          .sms{
            color:#FF6600;
          }
          .reg{
            color:#999999;
            span{
              margin:0 7px;
            }
          }
        }
      }
    }
  }
}
</style>