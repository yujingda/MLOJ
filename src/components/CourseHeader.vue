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
                    <a href="/#/selectCourse"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>已发布课程</span>
                    </div>
                    <div class="item-menu">
                        <span>本课资料</span>
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
    name:'nav-course-header',//接下来实现交互额的部分 
    data(){
        return{
            username:'',
            phoneList:[]
        }
    },
    mounted(){

    },
    methods:{
        login(){
            this.$router.push('login')
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