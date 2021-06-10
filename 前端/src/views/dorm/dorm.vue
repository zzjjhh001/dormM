<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>宿舍管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.dormId" placeholder="输入宿舍号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.dormBuildingId" placeholder="输入楼宇号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.dormRs" placeholder="输入宿舍人数"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" v-if="role" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="false" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="120">
      </el-table-column>
      <el-table-column sortable prop="dorm_id" label="宿舍号" width="200">
      </el-table-column>
      <el-table-column sortable prop="dorm_building_id" label="楼宇号" width="200">
      </el-table-column>
      <el-table-column sortable prop="dorm_rs" label="宿舍人数" width="200">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" v-if="role" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="father"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="宿舍号" prop="dormId">
          <el-input size="small" v-model="editForm.dormId" auto-complete="off"  placeholder="请输入宿舍号"></el-input>
        </el-form-item>
        <el-form-item label="楼宇号" prop="dormBuildingId">
          <el-input size="small" v-model="editForm.dormBuildingId" auto-complete="off" placeholder="请输入楼宇号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {dormList,dormdelete,dormadd} from '../../api/dorm.js' 
import Pagination from '../../components/pagination.vue'
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      pageparm: {
        currentPage: 1,
        pageSize: 6,
        total: 0,
      },
      role:true,
      listData:[],
      moduleData:[],
      loading:false,
      editFormVisible:false,
      formInline: {
        dormId: '',
        dormBuildingId: '',
        dormRs:'',
      },
      editForm: {
        dormId: '',
        dormBuildingId: '',
        token: localStorage.getItem('logintoken')
      },
      rules: {
        dormId: [
          { required: true, message: '请输入宿舍号', trigger: 'blur' }
        ],
        dormBuildingId: [
          { required: true, message: '请输入楼宇号', trigger: 'blur' }
        ],
      },
    };
  },
  created(){
    console.log("haha")
    this.getData(this.formInline)
    this.role=!(JSON.parse(localStorage.getItem('user')).role == 'student')
    console.log(this.role)
  },
  methods: {
    getData(parameter){
      console.log(parameter)
      this.loading = true
      console.log("进入getData")
      dormList(parameter)
        .then(res => {
          this.loading = false
          if (res.status == 200) {
            console.log(res)
            console.log(res.data)
            this.moduleData = res.data
            this.show()
            this.loading = false
            // 分页赋值
            // this.pageparm.currentPage = this.formInline.currentPage
            // this.pageparm.pageSize = this.formInline.pageSize
            this.pageparm.total = res.data.length
          }else if(res.status == 205){
            console.log("没有token")
            this.$alert('没有登录不能操作', '操作失败', {confirmButtonText: '确定',});
            this.$router.push('../login')
          }else if(res.status == 206){
            console.log("token验证不通过")
            this.$alert('没有登录不能操作，失败原因：token验证不通过', '操作失败', {confirmButtonText: '确定',});
            this.$router.push('../login')
          }
        })
        .catch(err => {
          this.loading = false
          console.log(err)
          this.$message.error('宿舍信息加载失败，请稍后再试！')
        })
    },
    show(){
      let begin = (this.pageparm.currentPage-1)*this.pageparm.pageSize
      this.listData = this.moduleData.slice(begin,
        this.pageparm.pageSize+begin)
    },
    father(parm) {
      this.pageparm.currentPage = parm.currentPage
      this.pageparm.pageSize = parm.pageSize
      this.show()
    },
    search(){
      this.getData(this.formInline)
    },
    deleteUser(index,row){
      this.$confirm('将会删除此宿舍下所有学生的信息，确定要删除吗?', '危险操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        console.log(row.dorm_id)
        dormdelete(row.dorm_id)
        .then(res =>{
          if(res.status == 200){
            this.$message({
                  type: 'success',
                  message: '宿舍信息已删除!'
                })
          }else{
            this.$message({
                  type: 'info',
                  message: '删除失败，可能是该信息已删除'
            })
          }
          this.getData(this.formInline)
        })
      })
      
    },
    handleEdit(){
      this.editFormVisible = true
      this.editForm.dormId =''
      this.editForm.dormBuildingId = ''
    },
    submitForm(){
      dormadd(this.editForm)
      .then(res=>{
        if(res.status == 200){
          console.log("添加成功")
          this.editFormVisible = false 
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        }else{
          console.log('添加失败')
          this.$message({
            type: 'info',
            message: '添加失败，请重试'
          })
        }
        this.search()
      })
    },
    //关闭编辑，添加界面
    closeDialog(){
      this.editFormVisible = false
    },
    callFather(){}
  },
  beforeCreate() {
    
  }, 
}
</script>
<style  scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>