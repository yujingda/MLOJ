<template>
<!-- 添加动画 -->
<transition name="slide">
    <div class="modal" v-show="showModal">
        <div class="mask"></div>
            <div class="modal-dialog">
                <div class="modal-header">
                    <span>{{title}}</span>
                    <a href="javascript:;" class="icon-close" v-on:click="$emit('cancel')"></a>
                </div>
                <div class="modal-body">
                    <!-- 通过插槽方式实现动态效果 -->
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <!-- 这里绑定的submit和cancel事件都是在父组件中定义的事件 -->
                    <!-- 通过emit将点击按钮的事件传递给submit这个自定义的方法 -->
                    <a href="javascript:;" class="btn" v-if="btnType==1" v-on:click="$emit('submit')">{{sureText}}</a>
                     <a href="javascript:;" class="btn" v-if="btnType==2" v-on:click="$emit('cancel')">{{cancelText}}</a>
                    <div class="btn-group" v-if="btnType==3">
                    <a href="javascript:;" class="btn" v-on:click="$emit('submit')">{{sureText}}</a>
                    <a href="javascript:;" class="btn btn-default" v-on:click="$emit('cancel')">{{cancelText}}</a>
                    </div>
                </div>
            </div>
    </div>
</transition>
</template>

<script>
export default {
    name:'modal',
    props:{
        //弹窗分为小small中middle大large
        modalType:{
            type:String,
            default:'form'
        },
        //弹窗标题
        title:String,
        //按钮类型：1确定 2取消 3两个都有
        btnType:String,
        sureText:{
            type:String,
            default:'确定'
        },
        cancelText:{
            type:String,
            default:'取消'
        },
        showModal:Boolean
    }
}
</script>

<style lang="scss">
@import './../assets/scss/mixin.scss';
@import './../assets/scss/modal.scss';
@import './../assets/scss/config.scss';
</style>