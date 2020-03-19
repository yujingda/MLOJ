<template>
  <div class="register">
    <div class="container">
      <a href="/#/index"><img src="/images/login-new-logo.png" alt=""></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="register-form">
          <h3>
            <span class="checked">帐号注册</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入学号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="input">
            <input type="text" placeholder="请输入姓名" v-model="userzname">
          </div>
          <div class="input">
            <input type="text" placeholder="请输入班级" v-model="userclass">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="register">注册</a>
          </div>
          <div class="tips">
            <div class="sms">手机短信登录/注册</div>
            <div class="reg">立即登录</div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
    </div>
</template>
<script>
// import { mapActions } from 'vuex';
import NavFooter from './../components/NavFooter'
export default {
  name: 'register',
  components:{
    NavFooter
  },
  data(){
    return {
      username:'',
      userzname:'',
      userclass:'',
      password:'',
      userId:''
    }
  },
  methods:{
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
.register{
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
      .register-form{
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