<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报修管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.stu_id" placeholder="输入报修人"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.building_id" placeholder="输入楼宇号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.dorm_id" placeholder="输入宿舍号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.time" placeholder="输入服务时间"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.state" placeholder="输入当前状态"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="false" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="120">
      </el-table-column>
      <el-table-column sortable prop="id" label="报修编号" width="120">
      </el-table-column>
      <el-table-column sortable prop="stu_id" label="报修人" width="120">
      </el-table-column>
      <el-table-column sortable prop="building_id" label="楼宇号" width="120">
      </el-table-column>
      <el-table-column sortable prop="dorm_id" label="宿舍号" width="120">
      </el-table-column>
      <el-table-column sortable prop="time" label="服务时间" width="120">
      </el-table-column>
      <el-table-column sortable prop="content" label="具体内容" width="200">
      </el-table-column>
      <el-table-column align="center" label="状态" min-width="100">
        <template slot-scope="scope">
          <el-switch prop="state" active-color="#13ce66"
            active-text='已解决'  inactive-text='未处理'
            :value="Boolean(scope.row.state)"
            @change="update(scope.$index, scope.row)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="father"></Pagination>
    <!-- 编辑界面 -->
  </div>
</template>

<script>
import {baoxiuList,baoxiuUpdate} from '../../api/baoxiu.js' 
import Pagination from '../../components/pagination'
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
      listData:[],
      moduleData:[],
      loading:false,
      switchValue:false,
      formInline: {
        stu_id: '',
        building_id: '',
        dorm_id:'',
        time:'',
        state:'',
      },
    };
  },
  created(){
    this.getData(this.formInline)
  },
  methods: {
    getData(parameter){
      console.log(parameter)
      this.loading = true
      console.log("进入getData")
      baoxiuList(parameter)
        .then(res => {
          this.loading = false
          if (res.status == 200) {
            let data = res.data
            data.forEach(arr=>{
              arr.state = Boolean(arr.state)
            })
            this.moduleData = data
            this.show()
            this.loading = false
            // 分页赋值
            // this.pageparm.currentPage = this.formInline.page
            // this.pageparm.pageSize = this.formInline.limit
            this.pageparm.total = data.length
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
    update(index,row){
      let parameter = {}
      parameter.id = row.id
      parameter.state = !row.state
      baoxiuUpdate(parameter)
      .then(res=>{
        console.log(res.status)
        if(res.status == 200){
          row.state= !row.state
          this.$message({
          showClose: true,
          message: '操作成功',
          type: 'success'
        });
        }else{
          this.$message({
          showClose: true,
          message: '操作失败，请重试',
          type: 'error'
        });
        }
      })
    }
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