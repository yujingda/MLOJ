<template>
    <div class="index">
        <div class="container">
        <div class="desctext">
                <div class="bluebar"></div>
                <div class="dtext">练习详情</div>
                <div class="newbutten">
                    <el-button class="newcourse" type="primary" v-if="is_admin" @click="newCourse()">新建练习</el-button>
                    <el-button class="newcourse" type="primary" v-if="is_admin" @click="deleteCourse()">删除练习</el-button>
                </div>
            </div>
            </div>
        <div class="container">
        <div class="children">
            <ul>
                <li class="product" v-for="(item,index) in hwlist" :key="index">
                    <!-- <a v-bind:href="'/#/product/'+item.id" target="_blank" @click="gotoCourse(item.id)"> -->
                    <a @click="gotoCourse(item.hid)">    
                        <div class="pro-img">
                            <img v-lazy="'/images/mlpic.jpg'">
                            <span class="pro-img-text">({{item.hid}})</span>
                            <!-- <div class="img">{{item.hid}}</div> -->
                        </div>
                    <div class="pro-name">
                        {{item.homeworkname}}
                    </div>
                    <div class="pro-price">
                        任课教师:路坤
                    </div>
                    </a>
                </li>
            </ul>
        </div>
        </div>
        <modal title="提示" sureText="点此登录或注册" cancelText="取消" btnType="3" modalType="middle" 
         v-bind:showModal="showModal" v-on:submit = "gotologin()" v-on:cancel="showModal=false">
        <!-- 插槽的用法 -->
        <template v-slot:body>
            <p>抱歉，您还没有登录，请您先登陆后查看课程内容或者提交作业^_^</p>
        </template>
        </modal>
        <modal title="提示" sureText="提交" cancelText="取消" btnType="3" modalType="large" 
         v-bind:showModal="showModalNewCourse" v-on:submit = "submitCourse()" v-on:cancel="showModalNewCourse=false">
        <!-- 插槽的用法 -->
        <template v-slot:body>
            <div class="create-course-form">
          <h3>
            <p class="checked">创建练习</p>
          </h3>
          <div class="hw-input-cname">
            <el-input v-model="hwname" placeholder="请输入作业名称"></el-input>
          </div>
          <div class="hw-input-cdesc">
            <el-input type="textarea" :rows="4" placeholder="请输入作业详情" v-model="hwdesc"></el-input>
          </div>
          <div class="hw-type">
                <el-radio v-model="hwtype" label="0">需要提交.html的作业</el-radio>
                <el-radio v-model="hwtype" label="1">需要提交.py和.excel的作业</el-radio>
          </div>
          <div class="hw-type">
                <el-radio v-model="publish_rank" label="0">允许学生查看排名</el-radio>
                <el-radio v-model="publish_rank" label="1">不允许学生查看排名</el-radio>
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
                <el-table-column
                    align="right">
                    <template slot="newweighttheader" slot-scope="scope">
                         <el-button size="mini" @click="newweight(scope)">新建权重</el-button>
                    </template>
                </el-table-column>
                </el-table>
          </div>
          <div class="hw-input-cname">
              <el-input v-model="end_time" placeholder="请输入作业时限，以天为单位"></el-input>
          </div>
        </div>
        </template>
        </modal>
        <modal title="提示" sureText="完成" cancelText="取消" btnType="1" modalType="large" 
         v-bind:showModal="showModalDeleteCourse" v-on:submit = "showModalDeleteCourse=false">
        <!-- 插槽的用法 -->
        <template v-slot:body>
            <ul>
                <li class="del-modal-list" v-for="(item,index) in hwlist" :key="index">
                    <div class="pro-name">
                        {{item.homeworkname}}
                    </div>
                    <div class="del-modal-but-group">
                        <el-button class="del-modal-button" type="primary" size="mini" @click="deleteOneCourse(item.hid)">删除</el-button>
                    </div>
                </li>
            </ul>
        </template>
        </modal>
    </div>
</template>
<script>
import Modal from './../components/Modal'
export default {
    name:'index',
    components:{
        Modal
    },
    data(){
        return{
            username:'',
            hwlist:[],
            showModal:false,
            showModalNewCourse:false,
            showModalDeleteCourse:false,
            hwdesc:'',
            hwname:'',
            hwtype:3,
            publish_rank:4,
            end_time:'',
            weightData:[],
            weightName:[],
            currentWeight: null,
        }
    },
    computed:{
        is_admin(){return this.$store.state.is_admin;}
    },
    mounted(){
        this.getProductList();
        this.getWeight();
    },
    methods:{
        login(){
            this.$router.push('/login')
        },
        getProductList(){
            this.axios.get('/homeworks',{
                // params:{//get传参使用params，post直接写
                //     categoryId:100012
                // }
            }).then((res)=>{//他所回传的res是整个包，包括头和回复
                this.hwlist=res.homeworks;
            })
        },
        gotologin(){
            this.$router.push('/login')//闭路由跳转，同时传参
        },
        gotoCourse(id){
            // if(username!='')
            if(this.username!=''){
            this.showModal = true;
            }
            else{
                this.$router.push(`/homework/${id}`);
            }
        },
        newCourse(){
            this.showModalNewCourse=true;
        },
        submitCourse(){
            this.axios.post('/homeworks',{
                homeworkname:this.hwname,
                desc:this.hwdesc,
                type:this.hwtype,
                publish_rank:this.publish_rank,
                end_time:this.end_time,
                weightid:this.currentWeight
            }).then(res=>{
                console.log(res);
                this.getProductList();
            })
            .catch(res=>{
                console.log(res);
                this.showModalNewCourse=false;
                this.getProductList();
            });
            this.showModalNewCourse=false;
            
        },
        newweight(scope){
            console.log(scope.id);
            
        },
        handleCurrentChange(val) {
            this.currentWeight = val.weightid;
        },
        deleteOneCourse(hid)
        {
            this.axios.delete(`/homework?hid=${hid}`);
            this.getProductList();
        },
        deleteCourse(){
            this.showModalDeleteCourse = true;
        },
        getWeight(){
            this.axios.get(`/indexnames`).then(res=>{
                this.weightName=res.names;
            });
            this.axios.get(`/weight`).then(res=>{
                this.weightData = res.weights;
            })
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
            width: 900px;
        }
        .newbutten{
            width:250px;
            height: 40px;
            margin-bottom: 3px;
            .newcourse{
                background-color: $colorA;
            }
        }
    }
.index{
    .create-course-form{
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
                    cursor: pointer;
                    // background: url('/images/mlpic.jpg') no-repeat center;
                    // background-size: contain;
                    // color: white;
                    // position: absolute;
                    // top: 0;
                    // left: 0;
                }
                .pro-img{
                    height: 187px;
                    position: relative;
                    .pro-img-text{
                        position: absolute; 
                        top: 135px; 
                        left: 100px;
                        font-size: 20px;
                        color: white;
                        z-index: 10;
                    }
                }
                .pro-name{
                    font-weight: bold;
                margin-top: 19px;
                    margin-bottom: 8px;
                    color:$colorB;
                    cursor: pointer;
                }
                .pro-price{
                    cursor: pointer;
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
}
</style>