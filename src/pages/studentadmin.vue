<template>
    <div class="student-admin">
        <div class="container">
            <div class="see-all-student">
              <div class="sas-title">
                  <div class="orangebar"></div>
                  <h4>全部学生</h4>
              </div>
              <div class="sas-body">
                  <ul class="all-stu-table">
                      <li class="all-stu-item" v-for="(item,index) in stulist" :key="index">
                          <div class="stu-name">{{item.username}}</div>
                      </li>
                  </ul>
              </div>
          </div>
        </div>
        <modal></modal>
    </div>
</template>
<script>
// import CourseHeader from './../components/CourseHeader'
// import ProductParam from './../components/ProductParam'
import Modal from './../components/Modal'
export default {
    name:'student-admin',
    components:{
        Modal,
    },
    data(){
        return {
            stulist:[],
        }
    },
    mounted(){
        this.getAllStudentList();
    },
    methods:{
        getAllStudentList(){
            this.axios.get('/user/getall',{
            }).then((res)=>{//他所回传的res是整个包，包括头和回复
                this.stulist=res.users;
            })
        },
    }
}
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
// @import '../assets/scss/reset.scss';
.student-admin{
    .see-all-student{
        width: 1226px;
        .sas-title{
            border-top: 1px solid $colorF;
            display: flex;
          font-size:25px;
          padding-top:10px;
          padding-bottom:16px;
          height: 26px;
          border-bottom: 2px solid $colorA;
          margin-bottom: 10px;
        }
    }
    .orangebar{
              @include bluebar();
              margin-top: 7px;
              margin-right: 10px;
          }
    .sas-body{
        .all-stu-item{
            @include flex();
            width: 100%;
            height: 20px;
            margin-bottom: 5px;
            .stu-name{
                font-size: 15px;
            }
        }
    }
}
</style>