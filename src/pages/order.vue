<template>
    <div>
        <order-header></order-header>
        <router-view></router-view>
        <nav-footer></nav-footer>
<!-- 这是每个页面的基础结构 -->
    </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import NavFooter from './../components/NavFooter'
export default {
    name:'order',
    components:{//组件加载
        OrderHeader,
        NavFooter
    }
}
</script>