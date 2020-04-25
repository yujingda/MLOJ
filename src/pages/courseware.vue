<template>
    <div class="course-ware">
        <div class="container">
            <div class="ware-header">
                <div class="orangebar"></div>
                  <h4>课件清单</h4>
                  <div class="cwbutten">
                    <el-button class="newcourseware" type="primary" v-if="is_admin" @click="newCourseWare()">上传课件</el-button>
                    <el-button class="newcourseware" type="primary" v-if="is_admin" @click="deleteCourseWare()">删除课件</el-button>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="ware-body">
                <div class="ware-item">
                    <ul class="">
                            <li class="product" v-for="(item,index) in cwList" :key="index" >
                            <a v-bind:href="'http://101.201.101.186/api/courseware?cwid='+item.cwid" class="oneware">
                            <!-- <div class="oneware"> -->
                            <div class="ware-icon">
                                <i class="el-icon-download"></i>
                            </div>
                            <div class="ware-name">
                                <h4>{{item.courseware_name}}</h4>
                            </div>
                            <div class="ware-uptime">
                                <p class="uptext">上传时间：2020/3/1</p>
                            </div>
                            <!-- </div> -->
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <modal title="提示" sureText="提交" cancelText="取消" btnType="2" modalType="large" 
         v-bind:showModal="showModalNewWare" v-on:cancel="showModalNewWare=false">
        <!-- 插槽的用法 -->
        <template v-slot:body>
            <div class="create-ware-form">
          <el-upload
            class="upload-demo"
            action="1"
            :http-request="uploadSectionFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="20"
            :on-exceed="handleExceed"
            :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，还有，取消键除了关闭这个弹窗没有任何作用</div>
</el-upload>
        </div>
        </template>
        </modal>
        <modal title="提示" sureText="完成" cancelText="取消" btnType="1" modalType="large" 
         v-bind:showModal="showModalDeleteWare" v-on:submit = "showModalDeleteWare=false">
        <!-- 插槽的用法 -->
        <template v-slot:body>
            <ul>
                <li class="del-modal-list" v-for="(item,index) in cwListcomp" :key="index">
                    <div class="pro-name">
                        {{item.courseware_name}}
                    </div>
                    <div class="del-modal-but-group">
                        <el-button class="del-modal-button" type="primary" size="mini" @click="deleteOneWare(item.cwid)">删除</el-button>
                    </div>
                </li>
            </ul>
        </template>
        </modal>
    </div>
</template>
<script>
// import CourseHeader from './../components/CourseHeader'
// import ProductParam from './../components/ProductParam'
import Modal from './../components/Modal';
// import url from '@/http/http'
export default {
    name:'course-ware',
    components:{
        //看来我不懂vue的命名规则，上边的标签可以自动读取下方，原理未知
        Modal,
        // ProductParam
    },
    data(){
        return {
            cwList:{},
            showModalNewWare:false,
            showModalDeleteWare:false,
            fileList: [],
        }
    },
    computed:{
    is_admin(){return this.$store.state.is_admin;},
    cwListcomp(){return this.cwList;}
    },
    mounted(){
        this.getCourseWareList();
    },
    methods:{
        getCourseWareList(){
            this.axios.get(`/coursewares`).then((res)=>{
            this.cwList = res.coursewares;
            // this.fileList = this.cwList.files;
            })
        },
        deleteCourseWare(){
            this.showModalDeleteWare=true;
        },
        newCourseWare(){
            this.showModalNewWare=true;
        },
        deleteOneWare(cwid)
        {
            this.axios.delete(`/courseware?cwid=${cwid}`);
            this.getCourseWareList();
            this.$forceUpdate();
        },
        //这里暂时使用了自定义的上传方法，但是当前后端部署到同一服务器时，可以用回action
uploadSectionFile(params) {
          const file = params.file;
          // 根据后台需求数据格式
          const form = new FormData();
          // 文件对象
          form.append("file", file);
          // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
        //   form.append("clientType", 'xxx');
          // 项目封装的请求方法，下面做简单介绍
          this.imageUpload(form).then(res=>{
              this.cwList.push(res.courseware);
              this.$forceUpdate();
          });
        },
        imageUpload(param){
    // 根据后台需求的数据格式确定headers
        return this.axios.post('/coursewares', param, { 
        headers: {"content-type": "multipart/form-data"}
        })
        },
        handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
          console.log(fileList);
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
}
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
// @import '../assets/scss/reset.scss';
.course-ware{
    .del-modal-list{
        @include flex();
        margin-top: 8px;
        padding-bottom: 2px;
        border-bottom: 1px solid #e5e5e5;
        height: 30px;
        .del-modal-button{
            background-color: $colorA;
        }
    }
    .container{
        @include flex();
        .ware-header{
                display: flex;
            font-size:28px;
            padding-top:10px;
            padding-bottom:16px;
            height: 28px;
            border-bottom: 2px solid $colorA;
            margin-bottom: 10px;
            width: 100%;
            .cwbutten{
            width:250px;
            height: 40px;
            margin-left: 66%;
            margin-bottom: 3px;
            .newcourseware{
                background-color: $colorA;
                margin-left: 18px;
            }
        }
        }
        .orangebar{
        @include bluebar();
        margin-top: 7px;
        margin-right: 10px;
        }
        .ware-body{
            .ware-item{
                .oneware{
                    height: 40px;
                    width: 1226px;
                    border: 1px solid $colorH;
                    @include flex();
                    text-decoration: none;
                    color: #333333;
                    background-color: $colorH;
                    margin-bottom: 15px;
                    .ware-icon {
                        width: 30px;
                        height: 30px;
                        font-size: 25px;
                        margin-left: 15px;
                    }
                    .ware-name{
                        margin-left: 10px;
                        // width: 1226px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        font-size: 16px;
                    }
                    .ware-uptime{
                        margin-right: 20px;
                        font-size: 15px;
                    }
                    &:hover{
                    background-color: $colorG;
                }
                }
                
            }
        }
        }
}
</style>