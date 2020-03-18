<template>
    <div>
        <div class="index">
            <div class="container">
                <!-- 为了防止命名冲突 -->
                <div class="swiper-box">
                    <!-- 菜单的父容器是wbox，因为他是覆盖在之上而不是完全无关的两部分 -->
                    <!-- 初始时是一个块级元素 -->
                    <div class="nav-menu">
                        <ul class="menu-wrap">
                            <li class="menu-item">
                                <a href="javascript:;">手机/电话卡</a>
                                <div class="children">
                                    <ul v-for="(item,i) in menuList" v-bind:key="i">
                                        <li v-for="(sub,j) in item" v-bind:key="j">
                                            <a v-bind:href="sub?'/#/product/'+sub.id:''">
                                            <img v-bind:src="sub?sub.img:'/images/item-box-1.png'" alt="">
                                            {{sub?sub.name:'小米999'}}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="menu-item">
                                <a href="javascript:;">电视/盒子</a>
                                <div class="children">

                                </div>
                            </li>
                            <li class="menu-item">
                                <a href="javascript:;">笔记本/平板</a>
                                <div class="children">

                                </div>
                            </li>
                            <li class="menu-item">
                                <a href="javascript:;">家电下乡</a>
                                <div class="children">

                                </div>
                            </li>
                            <li class="menu-item">
                                <a href="javascript:;">出行/穿戴</a>
                                <div class="children">

                                </div>
                            </li>
                            <li class="menu-item">
                                <a href="javascript:;">电视/盒子2</a>
                                <div class="children">

                                </div>
                            </li>
                            <li class="menu-item">
                                <a href="javascript:;">电视/盒子3</a>
                                <div class="children">

                                </div>
                            </li>
                            <li class="menu-item">
                                <a href="javascript:;">电视/盒子4</a>
                                <div class="children">

                                </div>
                            </li>
                        </ul>
                    </div>
                    <swiper v-bind:options="swiperOption">
                        <!-- 下边是轮播，需要循环取数据，想获得循环索引就加index， -->
                        <swiper-slide v-for="(item,index) in slideList" v-bind:key="index">
                            <!-- 由于使用指令，对于字符串要用单引号括起来 -->
                            <a v-bind:href="'/#/product/'+item.id">
                            <img v-bind:src="item.img" alt=""></a>
                        </swiper-slide>
                        <div class="swiper-pagination"  slot="pagination"></div>
                        <div class="swiper-button-prev" slot="button-prev"></div>
                        <div class="swiper-button-next" slot="button-next"></div>
                    </swiper>
                </div>
                <div class="ads-box">

                </div>
                <div class="banner"></div>
                <div class="product-box"></div>
            </div>
        </div>
        <service-bar></service-bar>
    </div>
</template>
<script>
/*swiper的使用：先引入，而后根据demo加各种标签，将option的设置数据传入*/
import ServiceBar from './../components/ServiceBar'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'//插件和样式通常在一起，样式一般放在dist文件夹里
export default {
    name:'nav-index',
    components:{
        //看来我不懂vue的命名规则，上边的标签可以自动读取下方，原理未知
        ServiceBar,
        swiper,
        swiperSlide
    },
    data(){
        return{
            swiperOption:{
                autoplay:true,
                loop:true,
                effect:'cube',
                cubeEffect: {
                    slideShadows: true,
                    shadow: true,
                    shadowOffset: 100,
                    shadowScale: 0.6
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable:true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    }
            },
            slideList:[
                {
                id:'42',
                img:'/images/slider/slide-1.jpg'
            },
            {
                id:'45',
                img:'/images/slider/slide-2.jpg'
            },
            {
                id:'46',
                img:'/images/slider/slide-3.jpg'
            },
            {
                id:'42',
                img:'/images/slider/slide-4.jpg'
            },
            {
                id:'42',
                img:'/images/slider/slide-5.jpg'
            }
            ],
            menuList:[
                [
                    {
                        id:30,
                        img:'/images/item-box-1.png',
                        name:'小米CC9',
                    },
                    {
                        id:31,
                        img:'/images/item-box-2.png',
                        name:'小米CC9',
                    },
                    {
                        id:32,
                        img:'/images/item-box-3.png',
                        name:'小米CC9',
                    },
                    {
                        id:33,
                        img:'/images/item-box-4.png',
                        name:'小米CC9',
                    },
                ],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
            ]
        }
    }
}
</script>

<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.index{//逐层调用，是为了防止相同的标签污染了其他的样式
    .swiper-box{
        .nav-menu{
            position: absolute;//而后要指出相对于什么定位，否则会脱离文档流
            width: 264px;
            height: 451px;
            // 此时他会被swiper盖住，因此设置z-index使其浮出
            z-index: 9;
            padding: 26px 0;
            //如果采用opcity来调节透明度，岂会改变所有元素的透明度，而这里只想改变图片，因此利用一种颜色控制
            background-color: #55585A7A;
            //由于此时高度超过swipbar，因此改变其盒模型，使得padding也计入到高度之中，原本pad不计入总高度
            box-sizing: border-box;
            .menu-wrap{
                .menu-item{
                    height: 50px;
                    line-height: 50px;

                    a{
                        display: block;
                        position: relative;//框住下层标签的定位区域
                        font-size: 16px;
                        color: #ffffff;
                        padding-left: 30px;
                        //这个伪类是用于实现右边的箭头
                        &:after{
                            position: absolute;
                            right: 30px;
                            top: 17.5px;
                            content: ' ';//用于占位
                            @include backgroundimg(10px,15px,'/images/icon-arrow.png');
                        }
                    }
                    &:hover{
                        background-color: $colorA;
                        .children{
                            display: block;
                        }
                    }
                    .children{
                        display: none;
                        width:962px;
                        height: 451px;
                        background-color: $colorG;
                        position: absolute;
                        top: 0;
                        left: 264px;
                        border: 1px solid $colorH;
                        ul{
                            display: flex;
                            justify-content: space-between;
                            height: 75px;
                            li{
                                height: 75px;
                                line-height: 75px;
                                flex: 1;
                                padding-left: 23px;
                            }
                            a{
                                font-size: 14px;
                                color: $colorB;
                            }
                            img{
                                width: 42px;
                                height: 35px;
                                vertical-align: middle;
                                margin-right: 15px;
                            }
                        }
                    }
                }
            }
        }
        .swiper-container{
            height: 451px;
            .swiper-button-prev{
                left: 274px;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}

</style>