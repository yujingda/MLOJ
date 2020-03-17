<template>
<!-- 一个模板下边只能有一个根结构 -->
    <div class="footer">
        <div class="footer-logo">
            <img src="/images/dut_footer.jpeg" alt="">
            <p>大工软院机器学习评测系统</p>
        </div>
        <div class="footer-link">
            <a href="">大连理工大学软件学院</a><span>|</span>
            <a href="">大连理工大学</a><span>|</span>
            <a href="">大连理工大学教务处</a><span>|</span>
        </div>
        <div class="copyright">Copyright 2019 All Rights Reference</div>
    </div>
</template>

<script>
export default {
    name:'nav-footer',
}
</script>

<style lang="scss">
.footer{
    height: 264px;
    border-top:4px solid #FF6600;
    background-color: #333333;
    color: #999999;
    font-size: 16px;
    text-align: center;
    .footer-logo{
        margin-top: 46px;
        margin-bottom: 31px;
        img{
            width: 65px;
            height: 65px;
            margin-bottom: 13px;
        }
    }
    .footer-link{
        a{
            color: #999999;//a元素的优先级大于父级元素的定义，所以要专门定义
            display: inline-block;
        }
        span{
            margin: 0 10px;
        }
        margin-bottom: 13px;
    }
    .copyright{

    }
}
</style>