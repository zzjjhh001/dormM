<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>电费充值记录</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.buildingId" placeholder="输入楼宇号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.dormId" placeholder="输入宿舍号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.cstuId" placeholder="输入充值人的学号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.number" placeholder="输入金额"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="false" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="120">
      </el-table-column>
      <el-table-column sortable prop="elec_id" label="编号" width="200">
      </el-table-column>
      <el-table-column sortable prop="building_id" label="楼宇号" width="200">
      </el-table-column>
      <el-table-column sortable prop="dorm_id" label="宿舍号" width="200">
      </el-table-column>
      <el-table-column sortable prop="cstu_id" label="充值人学号" width="200">
      </el-table-column>
      <el-table-column sortable prop="number" label="金额" width="200">
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="father"></Pagination>
    <!-- 编辑界面 -->
  </div>
</template>

<script>
import {elecList} from '../../api/life.js' 
import Pagination from '../../components/pagination'
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      role:true,
      listData:[],
      moduleData:[],
      loading:false,
      formInline: {
        buildingId: '',
        dormId: '',
        cstuId:'',
        number:'',
      },
      pageparm: {
        currentPage: 1,
        pageSize: 6,
        total: 0,
      },
    };
  },
  created(){
    this.getData(this.formInline)
    this.role=!(JSON.parse(localStorage.getItem('user')).role == 'student')
  },
  methods: {
    getData(parameter){
      console.log(parameter)
      this.loading = true
      console.log("进入getData")
      elecList(parameter)
        .then(res => {
          this.loading = false
          if (res.status == 200) {
            console.log(res)
            console.log(res.data)
            this.moduleData = res.data
            this.show()
            this.loading = false
            // 分页赋值
            // this.pageparm.currentPage = this.formInline.page
            // this.pageparm.pageSize = this.formInline.limit
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
          this.$message.error('楼宇信息加载失败，请稍后再试！')
        })
    },
    search(){
      this.getData(this.formInline)
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