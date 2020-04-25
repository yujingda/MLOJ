<template>
  <div class="detail">
    <product-param :title="product.name"></product-param>
    <div class="wrapper">
      <div class="container clearfix">
        <div class="content">
        <div class="courseIntrod">
          <h2 class="item-title">课程详情</h2>
          <p class="item-info">机器学习是人工智能领域的核心技术与基础。本课程全面、系统的讲授机器学习理论与方法。课程内容全面，所有算法的原理、核心思想都会完整清晰的讲述，结合代码讲解、实验程序、实践项目，让你加深对算法的理解。通过实际应用案例，让你真正理解机器学习的理论与适用场景。学完此课将为你后续的学术研究与产品研发打下坚实的基础。</p>
      </div>
          <div class="line"></div>
          <div class="homework">
          <h2 class="item-title">课程作业</h2>
          <ul>
         <li class="item-addr"> 
             <a v-bind:href="'/#/homework/'" target="_blank"><!-- < v-for="(item,index) in homeworkList" :key="index"> -->
            <i class="icon-loc"></i>
            <div class="addr">单元测试1&nbsp;&nbsp;&nbsp;截止时间{{deadtime}}</div>
            <div class="stock">未完成</div>
             </a>
          </li>
          <li class="item-addr"> 
             <a v-bind:href="'/#/homework/'" target="_blank"><!-- < v-for="(item,index) in homeworkList" :key="index"> -->
            <i class="icon-loc"></i>
            <div class="addr">单元测试1&nbsp;&nbsp;&nbsp;截止时间{{deadtime}}</div>
            <div class="stock">未完成</div>
             </a>
          </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
        <modal title="提示" sureText="提交" cancelText="取消" btnType="3" modalType="middle" 
         v-bind:showModal="showModal" v-on:submit = "gotologin()" v-on:cancel="showModal=false">
        <!-- 插槽的用法 -->
        <template v-slot:body>
            <div class="login-form">
          <h3>
            <span class="checked">课程创建</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入课程名" v-model="coursename">
          </div>
          <div class="input">
            <input type="text" placeholder="请输入课程介绍" v-model="courseintrod">
          </div>
        </div>
        </template>
        </modal>
  </div>
</template>
<script>
import ProductParam from './../components/ProductParam'
import Modal from './../components/Modal'
export default{
  name:'detail',
  data(){
    return {
        id:this.$route.params.id,
        version:1,
        product:{},
        homeworkList:{},
        showModal:false,
    }
  },
  mounted(){
      this.getProductInfo();
  },
  components:{
    ProductParam,
    Modal
  },
  methods:{
      getProductInfo(){
          this.axios.get(`/products/${this.id}`).then((res)=>{
              this.product = res;
          })
      },
    addCart(){
      this.axios.post('/carts',{
          productId:this.id,
          selected:true
      }).then((res)=>{
          this.$store.dispatch('saveCartCount',res.cartTotalQuantity);
          this.$router.push('/cart');
      }).catch((res)=>{
        this.erroe = res;
      })
    }
  }
}
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .detail{
      .login-form{
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        background-color:#ffffff;
        display: inline-block;
        
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
          justify-content: center;
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
      }
    .wrapper{
      .content{
        float:right;
        width:100%;
        .courseIntrod{
            background-color: #fafafa;
        }
        .item-title{
          font-size:28px;
          padding-top:10px;
          padding-bottom:16px;
          height: 26px;
          border-bottom: 1px solid $colorF;
          margin-bottom: 10px;
        }
        .item-info{
          padding-top: 10px;
          font-size:14px;
          height: 36px;
          padding-bottom: 20px;
        }
        .delivery{
          font-size:16px;
          color:#FF6700;
          margin-top:26px;
          margin-bottom:14px;
          height: 15px;
        }
        .line{
          height:0;
          margin-top:25px;
          margin-bottom:28px;
          border-top:1px solid #E5E5E5;
        }
        .item-addr{
          height:75px;
          width: 95%;
          margin-top: 15px;
          background-color:#FAFAFA;
          border:1px solid #E5E5E5;
          box-sizing:border-box;
          padding-top:31px;
          padding-left:64px;
          font-size:14px;
          line-height:14px;
          position:relative;
          a{
              display: flex;
          justify-content: space-between;
          }
          .icon-loc{
            position: absolute;
            top: 27px;
            left: 34px;
            @include backgroundimg(20px,20px,'/images/detail/icon-loc.png');
          }
          .addr{
            color:#666666;
          }
          .stock{
           margin-right: 10%;
            color:#FF6700;
          }
          &:last-child{
              margin-bottom: 15px;
          }
        }
        .item-version,.item-color{
          margin-top:30px;
          h2{
            font-size:18px;
            margin-bottom:20px;
          }
        }
        .item-version,.item-color{
          .phone{
            width:287px;
            height:50px;
            line-height:50px;
            font-size:16px;
            color:#333333;
            border:1px solid #E5E5E5;
            box-sizing: border-box;
            text-align:center;
            cursor:pointer;
            span{
              color:#666666;
              margin-left:15px;
            }
            .color{
              display:inline-block;
              width:14px;
              height:14px;
              background-color:#666666;
            }
            &.checked{
              border:1px solid #FF6600;
              color:#FF6600;
            }
          }
        }
        .item-total{
          height: 108px;
          background: #FAFAFA;
          padding: 24px 33px 29px 30px;
          font-size: 14px;
          margin-top:50px;
          margin-bottom:30px;
          box-sizing: border-box;
          .phone-total{
            font-size: 24px;
            color: #FF6600;
            margin-top: 18px;
          }
        }
      }
    }
    .price-info{
      background-color:#F3F3F3;
      height:340px;
      h2{
        font-size:24px;
        color:#333333;
        padding-top:38px;
        margin-bottom:30px;
      }
    }
  }

</style>