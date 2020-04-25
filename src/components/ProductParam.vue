<template>
    <div class="nav-bar" :class="{'is_fixed':isFixed}">
        <div class="container">
            <div class="pro-title">
                {{title}}
            </div>
            <div class="pro-param">
                <a href="">带拓展</a><span>|</span>
                <a href="">待拓展</a><span>|</span>
                <a href="">还是待拓展</a>
                <!-- 由于这里的按钮可能要动态替换，因此采用插槽的形式 -->
                <!-- 这里定义插槽，在product页面插入 -->
                <slot name="buy"></slot>
            </div>
        </div>
    </div>
</template>
<script>
//这里用于装载各种可复用的组件
export default {
    name:'nav-bar',
    props:{
        title:String
    },
        data(){
        return{
            isFixed:false
        }
    },
    mounted(){
        //遮没写的原因是保证组件销毁之后事件跟着销毁
        window.addEventListener('scroll',this.initHeight)
    },
    methods:{
        initHeight(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            this.isFixed = scrollTop>152?true:false;
        },
        //用冒泡的方式去除？？生命周期？？
        destroyed() {
            window.removeEventListener('scroll',this.initHeight,false)
        },
    }
}
</script>

<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
    .nav-bar{
        height: 70px;
        line-height: 70px;
        border-top: 1px solid $colorH;
        background-color: $colorG;
        z-index: 10;
        &.is_fixed{
            box-shadow: 0 5PX 5PX $colorE;
            position: fixed;
            top: 0;
            width: 100%;
        }
        .container{
            @include flex();
        .pro-title{
            font-size:$fontH;
            color:$colorB;
            font-weight: bold;
        }
        .pro-param{
            font-size: $fontJ;
            color: $colorC;
            span{
                margin: 0 10px;
            }
            a{
                color: $colorC;

            }
        }
        }
    }
</style>