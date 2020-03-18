<template>
    <div>
        <nav-header></nav-header>
        <router-view></router-view>
        <nav-footer></nav-footer>
<!-- 这样首页就能直接复用顶部和底部的组件 -->
    </div>
</template>
<script>
// import CourseHeader from './../components/CourseHeader'
import NavHeader from './../components/NavHeader'
import NavFooter from './../components/NavFooter'
export default {
    name:'nav-home',
    components:{
        //看来我不懂vue的命名规则，上边的标签可以自动读取下方，原理未知
        NavHeader,
        NavFooter
    }
}
</script>