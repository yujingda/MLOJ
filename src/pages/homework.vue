<template>
  <div class="homework">
      <product-param :title="homework_list.homeworkname">
        <template v-slot:buy>
                <el-button class="chbutton" type="primary" @click="changeCourse()" size="small" v-if="is_admin">修改课程</el-button>
                <el-button class="chbutton" type="primary" @click="updateData()" size="small" v-if="is_admin">上传数据集</el-button>
                <el-button class="chbutton" type="primary" @click="deleteData()" size="small" v-if="is_admin">删除数据集</el-button>
                <el-button class="chbutton" type="primary" @click="lookPoint()" size="small" v-if="!is_admin">查看分数</el-button>
            </template>
      </product-param>
      <div class="container">
          <div class="hw-introduce">
              <div class="intr-title">
                  <div class="orangebar"></div>
                  <h4>作业详情</h4>
              </div>
              <div class="intr-message">
                <pre>{{hwdesc}}</pre>
              </div>
          </div>
      </div>
      <div class="container">
          <div class="dl-data">
              <div class="dl-title">
                  <div class="orangebar"></div>
                  <h4>数据集下载</h4>
              </div>
              <div class="dl-body">
                  <el-row>
                    <el-button class="dlbutton" type="primary" v-for="(item,index) in file_list" :key="index" @click="downloaddb(item.fid)">
                      <span v-if="item.ftype==0">下载训练集</span><span v-if="item.ftype==1">下载测试集</span><span v-if="item.ftype==-1">下载答案集</span>{{item.filename}}</el-button>
                </el-row>
              </div>
          </div>
          </div>
          <div class="container" v-if="!is_admin">
          <div class="up-answer">
              <div class="up-title">
                  <div class="orangebar"></div>
                  <h4>作业上传</h4>
              </div>
                <div class="up-body">
                 <el-row>
                    <el-button class="dlbutton" type="primary" v-if="hwtype&&!is_admin" @click="uphtml">上传html文件</el-button>
                    <el-button class="dlbutton" type="primary" v-if="!hwtype&&!is_admin" @click="uppy">上传py文件</el-button>
                    <el-button class="dlbutton" type="primary" v-if="!hwtype&&!is_admin" @click="upexcel">上传excel文件</el-button>
                </el-row>
              </div>
          </div>
      </div>
      <div class="container" v-if="is_admin">
        <div class="all-stu-sub">
          <div class="all-sub-title">
            <div class="orangebar"></div>
                  <h4>已提交学生</h4>
          </div>
          <div class="all-sub-body">
            <ul>
              <li class="sub-list">
                <div class="sub-stu-sid">
                        学生学号
                    </div>
                    <div class="sub-stu-score">
                        学生当前分数
                    </div>
                    <div class="sub-stu-submit_time">
                        学生提交时间
                    </div>
                    <div class="del-modal-but-group">
                        是否评分
                    </div>
              </li>
              <li class="sub-list" v-for="(item,index) in stu_sub_list" :key="index">
                    <div class="sub-stu-sid">
                        {{item.uid}}
                    </div>
                    <div class="sub-stu-score">
                        {{item.score}}
                    </div>
                    <div class="sub-stu-submit_time">
                        {{item.submit_time}}
                    </div>
                    <div class="del-modal-but-group">
                        <el-button class="del-modal-button" type="primary" size="mini" @click="giveScore(item.hid,item.uid,item.score)">评分</el-button>
                    </div>
                </li>
            </ul>
          </div>
        </div>
      </div>
      <modal title="提示" sureText="提交" cancelText="取消" btnType="3" modalType="large" 
         v-bind:showModal="showChangeModal" v-on:submit = "changethisCourse()" v-on:cancel="showChangeModal=false">
        <!-- 插槽的用法 -->
        <template v-slot:body>
            <div class="change-course-form">
          <h3>
            <p class="checked">改变作业</p>
          </h3>
          <div class="hw-input-cname">
            <el-input v-model="hwchname" placeholder="请输入作业名称"></el-input>
          </div>
          <div class="hw-input-cdesc">
            <el-input type="textarea" :rows="4" placeholder="请输入作业详情" v-model="hwchdesc"></el-input>
          </div>
          <div class="hw-ctype">
                <el-radio v-model="hwchtype" label="0">需要提交.html的作业</el-radio>
                <el-radio v-model="hwchtype" label="1">需要提交.py和.excel的作业</el-radio>
          </div>
          <div class="hw-ctype">
                <el-radio v-model="chpublish_rank" label="0">允许学生查看排名</el-radio>
                <el-radio v-model="chpublish_rank" label="1">不允许学生查看排名</el-radio>
          </div>
          <div class="hw-weight">
              <el-table
              height="190"
                ref="singleTable"
                :data="weightData"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%">
                <el-table-column type="index">
                </el-table-column>
                <el-table-column v-bind:property="item" v-bind:label="item" v-for="(item,index) in weightName" :key="index">
                </el-table-column>
              </el-table>
          </div>
          <div class="hw-input-cname">
              <el-input v-model="chend_time" placeholder="请输入作业时限，以天为单位"></el-input>
          </div>
        </div>
        </template>
        </modal>
        <modal title="提示" sureText="完成" cancelText="取消" btnType="1" modalType="large" 
         v-bind:showModal="showModalDeleteData" v-on:submit = "showModalDeleteData=false">
        <!-- 插槽的用法 -->
        <template v-slot:body>
            <ul>
                <li class="del-modal-list" v-for="(item,index) in file_list" :key="index">
                    <div class="pro-name">
                        {{item.filename}}
                    </div>
                    <div class="del-modal-but-group">
                        <el-button class="del-modal-button" type="primary" size="mini" @click="deleteOneData(item.fid)">删除</el-button>
                    </div>
                </li>
            </ul>
        </template>
        </modal>
        <modal title="提示" sureText="提交" cancelText="取消" btnType="2" modalType="large" 
         v-bind:showModal="showModalNewData" v-on:cancel="showModalNewData=false">
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
        <div class="hw-ctype">
                <el-radio v-model="thisfiletype" label="0">训练集</el-radio>
                <el-radio v-model="thisfiletype" label="1">测试集</el-radio>
                <el-radio v-model="thisfiletype" label="-1">答案集</el-radio>
          </div>
        </template>
        </modal>
                <modal title="提示" sureText="提交" cancelText="取消" btnType="2" modalType="large" 
         v-bind:showModal="showModalupHWfile" v-on:cancel="showModalupHWfile=false">
        <template v-slot:body>
            <div class="create-ware-form">
          <el-upload
            class="upload-demo"
            action="1"
            :http-request="uploadHomeworkFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="20"
            :on-exceed="handleExceed"
            :file-list="fileListHW">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传html/py文件，还有，取消键除了关闭这个弹窗没有任何作用</div>
</el-upload>
        </div>
        </template>
        </modal>
  </div>
</template>
<script>
import ProductParam from './../components/ProductParam'
import Modal from './../components/Modal'
export default {
  name: 'homework',
  components:{
    ProductParam,
    Modal
  },
  data(){
    return {
      homework_list:{},
      hwid:0,
      hwtype:0,
      file_list:[],
      hwdesc:'',
      showChangeModal:false,
      hwchname:'',
      hwchdesc:'',
      chpublish_rank:4,
      hwchtype:5,
      chend_time:'',
      showModalDeleteData:false,
      showModalNewData:false,
      thisfiletype:2,
      fileList: [],
      fileListHW: [],
      myscore:0,
      stu_sub_list:[],
      showModalupHWfile:false,
      weightData:[],
      weightName:[],
      currentWeight: null,
    }
  },
  computed:{
    is_admin(){return this.$store.state.is_admin;}
  },
  mounted(){
      this.getHwInfo();
      let id=this.$route.params.id;
      this.getstusublist(id);
      this.getWeight();
  },
  methods:{
    getHwInfo(){
     let id=this.$route.params.id;
    this.axios.get(`/homework?hid=${id}`).then((res)=>{
    this.homework_list = res.homework;
    this.hwid = res.homework.hid;
    this.hwtype = res.homework.htype;
    this.file_list=res.homework.files;
    this.hwdesc = this.homework_list.homework_desc;
    this.hwchdesc = this.homework_list.homework_desc;
    this.hwchname=this.homework_list.homeworkname;
    this.hwchdesc=this.homework_list.homework_desc;
    this.chpublish_rank=this.homework_list.publish_rank;
    this.chend_time=(res.homework.homework_end_time-res.homework.homework_begin_time)/86400;
    this.currentWeight = res.homework.weightid;
    })
    },
    changethisCourse(){
      this.axios.put('/homework',{
        hid: this.hwid,
        homeworkname: this.hwchname,
        desc: this.hwchdesc,
        publish_rank:this.chpublish_rank,
        end_time:this.chend_time,
        weightid:this.currentWeight,
      });
      this.showChangeModal=false;
      this.getHwInfo();
    },
    changeCourse(){
      this.showChangeModal=true;
      this.setCurrent(this.weightData[this.currentWeight-1]);
    },
    downloaddb(id){
        window.location.href=`http://101.201.101.186/api/dataset?fid=${id}`;
    },
    setCurrent(row) {
      console.log(row);
        this.$refs.singleTable.setCurrentRow(row);
      },
    lookPoint(){
      if(this.chpublish_rank==1)
      {
        console.log('/homework/score?hid=hid');
        this.axios.get(`/homework/score?hid=${this.hwid}`).then(res=>{
          this.myscore = res.score;
        });
        this.$message.warning(`您的分数为${this.myscore}`);
      }
      else{
        this.$message.warning(`老师尚未开放查看排名功能，暂时不可查看！`);
      }
    },
    updateData(){
      this.showModalNewData=true;
    },
    deleteData(){
      this.showModalDeleteData=true;
    },
    handleCurrentChange(val) {
            this.currentWeight = val.weightid;
        },
    deleteOneData(fid){
      this.axios.delete(`/homework/submit?hid=${fid}`);
            this.getHwInfo();
            this.$forceUpdate();
    },
    uploadSectionFile(params) {
          const file = params.file;
          // 根据后台需求数据格式
          const form = new FormData();
          // 文件对象
          form.append("file", file);
          // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
        //   form.append("clientType", 'xxx');
          // 项目封装的请求方法，下面做简单介绍
          this.imageUpload(form,this.hwid,this.thisfiletype).then(res=>{
              this.file_list.push(res.file);
              this.$forceUpdate();
          });
        },
        imageUpload(param,hid,ftype){
        return this.axios.post(`/datasets?hid=${hid}&ftype=${ftype}`, param, { 
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
      },
      getstusublist(id){
        this.axios.get(`/homework/students?hid=${id}`).then(res=>{
          this.stu_sub_list = res.users;
        })
      },
      giveScore(hid,uid,score){
        this.$router.push(`/score/${hid}/${uid}/${score}`);
      },
      uploadHomeworkFile(params) {
          const file = params.file;
          // 根据后台需求数据格式
          const form = new FormData();
          // 文件对象
          form.append("file", file);
          // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
        //   form.append("clientType", 'xxx');
          // 项目封装的请求方法，下面做简单介绍
          this.HWUpload(form,this.hwid);
        },
        HWUpload(param,hid){
        return this.axios.post(`/homework/submit?hid=${hid}`, param, { 
        headers: {"content-type": "multipart/form-data"}
        })
        },
    uphtml(){
      this.showModalupHWfile=true;
    },
    uppy(){
      this.showModalupHWfile=true;
    },
    getWeight(){
            this.axios.get(`/indexnames`).then(res=>{
                this.weightName=res.names;
            });
            this.axios.get(`/weight`).then(res=>{
                this.weightData = res.weights;
            })
    },
    upexcel(){
        
    },

  }
}
</script>
<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .homework{
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
    .change-course-form{
        h3{
            width: 100%;
            font-size: 18px;
            @include flex(center,center);
            margin-bottom: 10px;
            .checked{
                text-align: center;
                width: 100%;
            }
        }
        .hw-input-cname{
            @include flex(center,center);
            width: 580px;
            margin-bottom: 10px;
            margin-top: 10px;
        }
        .hw-input-cdesc{
            @include flex(center,center);
            width: 100%;
            margin-bottom: 10px;
        }
        
        .hw-type{
            @include flex(center,center);
            width: 100%;
            margin-top: 10px;
        }
    }
    .chbutton{
      margin-left: 8px;
      background-color: $colorA;
      margin-right: 8px;
    }
    .hw-introduce{
        width: 1226px;
        .intr-title{
            border-top: 1px solid $colorF;
            display: flex;
          font-size:28px;
          padding-top:10px;
          padding-bottom:16px;
          height: 26px;
          border-bottom: 1px solid $colorA;
          margin-bottom: 10px;
        }
        .intr-message{
            background-color: #fafafa;
          padding-top: 10px;
          font-size:14px;
          padding-bottom: 20px;
          padding-left: 10%;
        }
    }
    .orangebar{
              @include bluebar();
              margin-top: 7px;
              margin-right: 10px;
          }
    .dl-data{
        width: 100%;
            .dl-title{
                display: flex;
                font-size:28px;
                padding-top:10px;
                padding-bottom:16px;
                height: 26px;
                border-bottom: 1px solid $colorA;
                margin-bottom: 10px;
            }
        }
        .dlbutton{
            background-color: $colorA;
        }
    .up-answer{
        width: 100%;
        margin-bottom: 15px;
        .up-title{
            display: flex;
            font-size:28px;
            padding-top:10px;
            padding-bottom:16px;
            height: 26px;
            border-bottom: 1px solid $colorA;
            margin-bottom: 10px;
        }
    }
    .all-stu-sub{
      .all-sub-title{
        display: flex;
            font-size:28px;
            padding-top:10px;
            padding-bottom:16px;
            height: 26px;
            border-bottom: 1px solid $colorA;
            margin-bottom: 10px;
      }
      .all-sub-body{
        .sub-list{
          @include flex();
        margin-top: 8px;
        padding-bottom: 2px;
        border-bottom: 1px solid #e5e5e5;
        height: 30px;
        .sub-stu-sid{
          width: 200px;
        }
        .sub-stu-score{
          width: 200px;
        }
        .sub-stu-submit_time{
          width: 200px;
        }
        .del-modal-button{
            background-color: $colorA;
        }
        }
      }
    }
  }
</style>