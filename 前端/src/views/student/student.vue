/**
 * 基础菜单 商品管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.stuName" placeholder="输入学生姓名"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.stuId" placeholder="输入学生学号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.stuClass" placeholder="输入班级"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.stuBuilding" placeholder="输入楼宇号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.stuDorm" placeholder="输入宿舍号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.stuPhone" placeholder="输入联系方式"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="formInline.stuSex"clearable placeholder="请选择性别">
            <el-option value="1" label="男"></el-option>
            <el-option value="0" label="女"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.stuCollege" placeholder="输入学院"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="false" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="id" label="学号" width="100">
      </el-table-column>
      <el-table-column sortable prop="name" label="姓名" width="100">
      </el-table-column>
      <el-table-column sortable prop="sex"  label="性别" width="100">
        <template slot-scope="scope">
        <span >{{ scope.row.sex==1?"男":"女" }}</span>
      </template>
      </el-table-column>
      <el-table-column sortable prop="phone" label="联系方式" width="200">
      </el-table-column>
      <el-table-column sortable prop="class" label="班级" width="100">
      </el-table-column>
      <el-table-column sortable prop="college" label="学院" width="100">
      </el-table-column>
      <el-table-column sortable prop="building_id" label="楼宇号" width="100">
      </el-table-column>
      <el-table-column sortable prop="dorm_id" label="宿舍号" width="100">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="father"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="学生学号" prop="stuId">
          <el-input size="small" v-model="editForm.stuId" auto-complete="off" :disabled="(this.title=='修改')?true:false" placeholder="请输入学生学号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="stuName">
          <el-input size="small" v-model="editForm.stuName" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="stuSex">
          <el-select v-model="editForm.stuSex"  placeholder="请选择">
            <el-option value="1" label="男"></el-option>
            <el-option value="0" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生楼宇号" prop="stuBuilding">
          <el-input size="small" v-model="editForm.stuBuilding" auto-complete="off" placeholder="请输入学生的楼宇号"></el-input>
        </el-form-item>
        <el-form-item label="宿舍号" prop="stuDorm">
          <el-input size="small" v-model="editForm.stuDorm" auto-complete="off" placeholder="请输入宿舍号"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="stuPhone">
          <el-input size="small" v-model="editForm.stuPhone" auto-complete="off" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="班级号" prop="stuClass">
          <el-input size="small" v-model="editForm.stuClass" auto-complete="off" placeholder="请输入班级号"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="stuCollege">
          <el-input size="small" v-model="editForm.stuCollege" auto-complete="off" placeholder="请输入学院"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deptList,deptDelete,deptSave} from '../../api/studentMG'
import Pagination from '../../components/pagination'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      editForm: {
        stuId: '',
        stuName: '',
        stuSex:'',
        stuPhone:'',
        stuClass:'',
        stuCollege:'',
        stuBuilding:'',
        stuDorm:'',
        token: localStorage.getItem('logintoken')
      },
      // rules表单验证
      rules: {
        stuName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        stuId: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        stuSex: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        stuPhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        stuClass: [
          { required: true, message: '请输入班级', trigger: 'blur' }
        ],
        stuCollege: [
          { required: true, message: '请输入学院', trigger: 'blur' }
        ],
        stuBuilding: [
          { required: true, message: '请输入楼宇号', trigger: 'blur' }
        ],
        stuDorm: [
          { required: true, message: '请输入宿舍号', trigger: 'blur' }
        ],
        },
      formInline: {
        stuId: '',
        stuName: '',
        stuSex:'',
        stuPhone:'',
        stuClass:'',
        stuCollege:'',
        stuBuilding:'',
        stuDorm:'',
      },
      // 删除
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      moduleData:[],
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 6,
        total: 0,
      }
    }
  },
  // 注册组件
  components: {
    Pagination,
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline)
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取公司列表ok
    getdata(parameter) {
      this.loading = true
      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      deptList(parameter)
        .then(res => {
          console.log(res)
          this.loading = false
          console.log(res.status)
          if (res.status == 200) {
            console.log(res)
            console.log(res.data)
            this.moduleData = res.data
            this.show()
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
          this.$message.error('菜单加载失败，请稍后再试！')
        })
    },
    // 搜索事件
    search() {
      this.getdata(this.formInline)
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
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      console.log(row)
      if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.editForm.title = this.title
        this.editForm.stuId = row.id
        this.editForm.stuName = row.name
        this.editForm.stuSex = row.sex
        this.editForm.stuPhone = row.phone
        this.editForm.stuClass = row.class
        this.editForm.stuCollege = row.college
        this.editForm.stuBuilding = row.building_id
        this.editForm.stuDorm = row.dorm_id

      } else {
        this.title = '添加'
        this.editForm.title = this.title
        this.editForm.stuId = ''
        this.editForm.stuName = ''
        this.editForm.stuSex = ''
        this.editForm.stuPhone = ''
        this.editForm.stuClass = ''
        this.editForm.stuCollege = ''
        this.editForm.stuBuilding = ''
        this.editForm.stuDorm = ''
      }
    },
    // 编辑、增加页面保存方法ok
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
            deptSave(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              console.log(res)
              if (res.status == 200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '学生保存成功！'
                })
              } else if(res.status = 205){
                this.$message({
                  type: 'info',
                  message: "不存在这个宿舍楼，或者宿舍楼里没有这个宿舍"
                })
              }else {
                this.$message({
                  type: 'info',
                  message: "已存在重复的数据或数据未更改"
                })
              }
            })
            .catch(err => {
              console.log(err)
              this.editFormVisible = false
              this.loading = false
              this.$message.error('学生保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 删除学生ok
    deleteUser(index, row) {
      console.log(row)
      console.log(row.id)
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log('进入then')
          console.log(row.id)
          deptDelete(row.id)
            .then(res => {
              console.log("success 进入then")
              if (res.status == 200) {
                this.$message({
                  type: 'success',
                  message: '学生信息已删除!'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: '删除失败，可能是该信息已删除'
                })
              }
              this.getdata(this.formInline)
            })
            .catch(err => {
              this.loading = false
              this.$message.error('学生信息删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false
    },
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>

 
 