<template><!--模板-->
    <div class="header"><!--<根元素 -->
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <!-- 加上javascript:;是为了防止页面刷新 -->
                    <a href="javascript:;">大连理工大学软件学院机器学习评分系统</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="!username" @click="login()">在这登录</a>
                    <a href="javascript:;">我要注册</a>
                    <a href="javascript:;" class="my-car" @click="goTomyCart()"><span class="icon-cart"></span>个人中心</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>已发布课程</span>
                    </div>
                    <div class="item-menu">
                        <span>本课资料</span>
                        <div class="children"></div>
                    </div>
                </div>
                <div class="header-search">
                    <div class="wrapper">
                        <input type="text" name="keyword">
                        <!-- 加js是防止点击后跳转 -->
                        <a href="javascript:;"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//这里用于装载各种可复用的组件
export default {
    name:'nav-header',//接下来实现交互额的部分 
    data(){
        return{
            username:'jack',
            phoneList:[]
        }
    },
    filters:{//过滤器常用于金额和日期的格式化
        currency(val){
            if(!val)return '0.00';
            return '￥' + val.toFixed(2) + '元'
        }
    },
    mounted(){
        this.getProductList();
    },
    methods:{
        login(){
            this.$router.push('login')
        },
        getProductList(){
            this.axios.get('/products',{
                params:{//get传参使用params，post直接写
                    categoryId:100012
                }
            }).then((responce)=>{//他所回传的res是整个包，包括头和回复
                let res = responce.data.data;
                if(res.list.length>6){
                    this.phoneList = res.list.slice(0,6);
                }
            })
        },
        goTomyCart(){
            this.$router.push('/cart')//闭路由跳转，同时传参
        }
    }
}
</script> 

<style lang="scss">
@import '../assets/scss/base.scss';
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
    .header{
        //scss的语法支持嵌套
        .nav-topbar{
            height: 39px;
            line-height: 39px;//高度和行高通常一样，行高是啥
            background-color: #333333;
            color: #B0B0B0;//a标签有内置的样式所以这里的字体颜色设置没有用，需要把a的样式填充掉
            .container{
            @include flex();
            a{
                display: inline-block;
                color: #B0B0B0;
                margin-right: 17px;
            }
            .my-car{
                    width: 110px;
                    background-color: #FF6600;
                    text-align: center;
                    color: #ffffff;
                    .icon-cart{
                        @include backgroundimg(16px,12px,'/images/icon-cart-checked.png');
                        margin-right: 4px;
                    }
                }
        }
        }
        .nav-header{//对于共性，可以抽取出一个scss文件
            .container{
                position: relative;
                height: 112px;
                @include flex();
                border-bottom: 1px solid $colorH;
                .header-logo{
                    display: inline-block;
                    width: 55px;
                    height:55px;
                    background-color: #FF6600;
                    a{//动画的实现方法：伪类
                        display: inline-block;
                        width: 110px;
                        height: 55px;
                        &:before{
                            content:' ';//这个用于占位，没有content就没有伪类
                            @include backgroundimg(55px,55px,'/images/dutry_logo.png',55px);
                            transition: margin .2s;
                        }
                        &:after{
                            content:' ';
                            @include backgroundimg(55px,55px,'/images/mi-home.png',55px);
                        }
                        &:hover:before{
                            margin-left: -55px;
                            transition: margin .2s;//用于设置过渡的动画效果
                        }
                    }
                }
                .header-menu{
                    display: inline-block;
                    width: 643px;
                    padding-left: 209px;
                    .item-menu{
                        display: inline-block;
                        color: #333333;
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 112px;//使其垂直居中
                        margin-right: 20px;
                        span{
                            cursor: pointer;
                        }
                        &:hover{
                            color:$colorA;
                            .children{
                                height: 220px;
                                opacity: 1;
                            }
                        }
                        .children{//通过将高度设置成0来将其隐藏
                            position: absolute;//使其相对于container进行定位
                            top:112px;
                            left: 0;
                            opacity: 0;
                            height: 0px;
                            width: 1226px;
                            overflow: hidden;
                            transition: all .5s;
                            border-top:1px solid #e5e5e5;
                            box-shadow: 0px 7px 6px 0px rgba(0,0,0,0.11);
                            background-color: #ffffff;
                            z-index: 10px;
                            .product{
                                position: relative;
                                font-size: 12px;
                                line-height: 12px;
                                float: left;
                                width: 16.6%;
                                height: 200px;
                                text-align: center;
                                .a{
                                    display: inline-block;
                                }
                                img{
                                    width: auto;
                                    height: 111px;
                                    margin-top: 20px;
                                }
                                .pro-img{
                                    height: 137px;
                                }
                                .pro-name{
                                    font-weight: bold;
                                    margin-top: 19px;
                                    margin-bottom: 8px;
                                    color:$colorB
                                }
                                .pro-price{

                                }
                                &:before{//此时的伪类仅仅是一个空元素，不加占位会有问题
                                content: ' ';
                                position: absolute;//必须在其父元素product上加上绝对定位，否则就相对于container进行定位了
                                top: 28px;
                                right: 0;
                                border-left:1px solid $colorF;
                                height: 100px;
                                width: 1px;
                                }
                                &:last-child:before{
                                    display: none;
                                }
                            }
                        }
                    }
                }
                .header-search{
                    width: 319px;
                    .wrapper{
                        height: 50px;
                        border:1px solid #e0e0e0;
                        display: flex;//flex布局可以调节图标保证居中
                        align-items: center;
                        input{
                            border: none;
                            box-sizing:border-box;//这个和模型会将padding值计入宽度
                            border-right:1px solid #e0e0e0;
                            width: 264px;
                            height: 50px;
                            padding-right: 14px;
                        }
                        a{
                            
                            @include backgroundimg(54px,18px,'/images/icon-search.png')
                        }
                    }
                }
            }
        }
    }
</style>