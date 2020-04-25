<template>
    <div class="product">
        <product-param v-bind:title="product.name">
            <template v-slot:buy>
                <button class="btn" @click="buy">
                    lli及购买
                </button>
            </template>
        </product-param>
        <div class="container">
    <div class="item-video">
        <div class="video-bg">
        </div>
        <div class="overlay">
        </div>
        <div class="video">
            <video src="/images/product/video.mp4" controls="controls"></video>
        </div>
    </div>
<!-- 这是每个页面的基础结构 -->
    </div>
    </div>
</template>
<script>
import ProductParam from'./../components/ProductParam'
export default {
    name:'product',
    data(){
        return{
            product:{}
        }
    },
    mounted(){
        this.getProductInfo();
    },
    methods:{
        getProductInfo(){
            console.log(this.$route.param);
            //加r是路由，这里是获取跳转方法
            let id=this.$route.params.id;
            console.log(this.$route.param);
            this.axios.get(`/products/${id}`).then((res)=>{
                this.product = res;
            })
        },
        buy(){
            let id = this.$route.params.id;
            this.$router.push(`/detail/${id}`);
        }
    },
    components:{
        ProductParam
    }
}
</script>

<style lang="scss">
@import './../assets/scss/mixin.scss';
// /**吸顶的原理，读取滚动条的高度，当发现滚动条的高度等于组件预订部的高度，设置组件的绝对定位
// 设置fix固定定位，固定在头部，关闭页面时，时间消除 */
    .product{
        h1{
            height: 90px;
            width: 100px;
        }
        button{
            margin-left: 10px;
        }
        .item-video{
            height: 1044px;
            background-color: #070708;
            margin-bottom: 76px;
            color: #ffffff;
            text-align: center;
            video{
                height: 660px;
            width: 800px;
            }
            .video-box{
                .overlay{
                    @include position(fixed);
                    background-color: #333333;
                    opacity: .5;
                }
                .video{
                    // fixed相对于整个窗口进行定位，而不是整个文档
                    // 居中：用top left 或者用translate
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                }
            }
        }
    }
</style>