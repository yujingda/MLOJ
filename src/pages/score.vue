<template>
    <div class="score">
        <div class="container">
            <div class="showAnswer">

            </div>

            <div class="givepoint">
                <div class="inputscore">
                    <el-input v-model="score" placeholder="请输入从0~100范围内的整数" max="100" min="0"></el-input>
                </div>
                <div class="sub-button">
                     <el-button size="medium" type="primary" @click="submitScore()">提交评分</el-button>
                </div>
            </div>
        </div>
        <modal></modal>
    </div>
</template>

<script>
import Modal from './../components/Modal'
export default {
    name:'score',
    components:{
        Modal,
    },
    data(){
        return {
            AnswerList:[],
            hid:0,
            uid:0,
            score:0,
        }
    },
    mounted(){
        this.getAnswerList();
    },
    methods:{
        getAnswerList(){
            this.hid = this.$route.params.hid;
            this.uid = this.$route.params.uid;
            this.score = this.$route.params.score;
            this.axios.get('',{
            }).then((res)=>{
                console.log(res);
                // this.stulist=res.users;
            })
        },
        submitScore(){
            this.axios.post('/homework/score',{
                hid:this.hid,
                uid:this.uid,
                score:this.score
            })
        }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
// @import '../assets/scss/reset.scss';
.score{
    .container{
        @include flex();
        .showAnswer{
            width: 50%;
            height: 890px;
            border: 2px solid red;
        }
        .givepoint{
             width: 50%;
             height: 300px;
             border: 2px solid red;
             justify-content: center;//两边对齐,有时候会用center
             align-items: center;//垂直居中
             .inputscore{
                 width: 304.5px;
                 margin-top: 18%;
                 margin-left: 26%;
             }
             .sub-button{
                 width: 609px;
                 margin-left: 43%;
                 margin-top: 15px;
             }
        }
    }
}
</style>