<template>
    <div class="service">
        <div class="container">
            <ul>
                <li><span class="icon-setting"></span>预约维修服务</li>
                <li><span class="icon-7day"></span>7天无理由</li>
                <li><span class="icon-15day"></span>15天免费维修</li>
                <li><span class="icon-post"></span>包邮包邮我们包邮</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
@import './../assets/scss/mixin.scss';
    .service{
        padding: 33px 0;
        color:#666666;
        font-size: 16px;
        li{
            display: inline-block;
            width: 24.9%;//为了防止浏览器差异，不用25%
            text-align: center;
            border-right: 1px solid #e5e5e5;
            span{
                display: inline-block;
                width: 20px;
                height: 20px;
                vertical-align: middle;//为了保证图片能够居中
                margin-right: 8px;
            }
            .icon-setting{
                @include backgroundimg(20px,20px,'/images/icon-setting.png')
            }
            .icon-7day{
                @include backgroundimg(20px,20px,'/images/icon-7day.png')
            }
            .icon-15day{
                @include backgroundimg(20px,20px,'/images/icon-15day.png')
            }
            .icon-post{
                @include backgroundimg(20px,20px,'/images/icon-post.png')
            }
        }
    }
</style>
