<template>
    <div class="index">
        <div class="container">
        <div class="desctext">
                <div class="bluebar"></div>
                <div class="dtext">课程详情</div>
                <div class="newbutten">
                    <el-button class="newcourse" type="primary" v-if="isAdmin">新建课程</el-button>
                </div>
            </div>
            </div>
        <div class="container">
        <div class="children">
            <ul>
                <!-- <li class="product" v-for="(item,index) in phoneList" :key="index">
                    <a v-bind:href="'/#/product/'+item.id" target="_blank">
                        <div class="pro-img">
                            <img src="itme.mainImage">
                        </div>
                    <div class="pro-name">
                                            {{item.name}}
                    </div>
                    <div class="pro-price">
                        {{item.price | currency}}
                    </div>
                    </a>
                </li> -->
                <li class="product" v-for="(item,index) in phoneList" :key="index">
                    <a v-bind:href="'/#/product/'+item.id" target="_blank">
                        <div class="pro-img">
                            <img src="/images/mlpic.jpg">
                        </div>
                    <div class="pro-name">
                        <!-- {{item.name}} -->
                        机器学习第一周
                    </div>
                    <div class="pro-price">
                        任课教师
                        <!-- {{item.price | currency}} -->
                    </div>
                    </a>
                </li>
            </ul>
        </div>
        </div>
    </div>
</template>
<script>

export default {
    name:'index',
    data(){
        return{
            username:'jack',
            phoneList:[],
            isAdmin:false
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
    .desctext{
        display:flex;
        margin-bottom: 15px;
        border-bottom: 2px solid $colorA;
        width:1526px;
        @include flex();
        .bluebar{
        height: 25px;
        width: 8px;
        background-color: $colorA;
        }
        .dtext{
            font-size: 18px;
            margin-left: 10px;
            font-weight: bold;
            width: 1000px;
        }
        .newbutten{
            width:150px;
            height: 40px;
            margin-bottom: 3px;
            .newcourse{
                background-color: $colorA;
            }
        }
    }
.container{
    @include flex();
    margin-top: 5px;
.children{//通过将高度设置成0来将其隐藏
            left: 0;
            width: 1226px;
            //overflow: hidden;
            border-top:1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0,0,0,0.11);
            background-color: #ffffff;
            z-index: 10px;
            .product{
                position: relative;
                font-size: 15px;
                line-height: 12px;
                float: left;
                width: 25%;
                height: 300px;
                text-align: center;
                .a{
                    display: inline-block;
                }
                img{
                    width: auto;
                    height: 175px;
                    margin-top: 20px;
                }
                .pro-img{
                    height: 187px;
                }
                .pro-name{
                    font-weight: bold;
                margin-top: 19px;
                    margin-bottom: 8px;
                    color:$colorB
                }

                &:before{//此时的伪类仅仅是一个空元素，不加占位会有问题
                    content: ' ';
                    position: absolute;//必须在其父元素product上加上绝对定位，否则就相对于container进行定位了
                    top: 28px;
                    right: 0;
                    border-left:1px solid $colorF;
                    height: 200px;
                    width: 1px;
                    }
                 &:last-child:before{
                    display: none;
                }
            }
        }
}
</style>