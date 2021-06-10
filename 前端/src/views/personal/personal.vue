<template>
  <div class=''>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-position="left" label-width="80px" style="width:50%; margin-top:20px;" :model="formLabelAlign">
      <el-form-item label="学号">
        <el-input v-model="formLabelAlign.id" disabled ></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formLabelAlign.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="formLabelAlign.sex?'男':'女'" disabled></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="formLabelAlign.phone" disabled></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-input v-model="formLabelAlign.class" disabled></el-input>
      </el-form-item>
      <el-form-item label="学院">
        <el-input v-model="formLabelAlign.college" disabled></el-input>
      </el-form-item>
      <el-form-item label="楼宇号">
        <el-input v-model="formLabelAlign.building_id" disabled></el-input>
      </el-form-item>
      <el-form-item label="宿舍号">
        <el-input v-model="formLabelAlign.dorm_id" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-button @click="handleEdit">修改密码</el-button>
      </el-form-item>
    </el-form>
    <!-- 修改密码界面 -->
    <el-dialog title="修改密码" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="原始密码" prop="stupwd" >
          <el-input size="small" type='password' v-model="editForm.stupwd" auto-complete="off" placeholder="请输入原始密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="stupwd1">
          <el-input size="small" type='password' v-model="editForm.stupwd1"  auto-complete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="stupwd2">
          <el-input size="small" type='password' v-model="editForm.stupwd2" auto-complete="off" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" class="title" @click="submitForm">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {personalList,updatepwd} from '../../api/personal.js'
export default {
  
  components: {
    
  },
  data() {
    return {
        formLabelAlign: {
          id:'',
          name: '',
          sex:'',
          phone:'',
          class:'',
          college:'',
          building_id:'',
          dorm_id:'',
        },
        editFormVisible: false, //控制修改密码页面显示与隐藏
        editForm:{
          stupwd:'',
          stupwd1:'',
          stupwd2:'',
        },
        rules: {
        stupwd: [
          { required: true, message: '请输入原始密码', trigger: 'blur' }
        ],
        stupwd1: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        stupwd2: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' }
        ],
        }
    };
  },
  computed: {
    
  },
  watch: {
    
  },
  methods: {
    closeDialog(){
      this.editFormVisible = false
    },
    handleEdit(){
      this.editFormVisible = true
      console.log(this.editFormVisible)
    },
    submitForm(){
      console.log(this.editForm)
      if(this.editForm.stupwd1 === this.editForm.stupwd2){
        if(this.editForm.stupwd != this.editForm.stupwd1){
          //发请求
          let params = this.editForm
          params.id = JSON.parse(localStorage.getItem('user')).id
          updatepwd(params)
          .then(res=>{
            if(res.status == 200){
              this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.editForm.stupwd1 = ''
            this.editForm.stupwd2 = ''
            this.editForm.stupwd = ''
            this.editFormVisible = false
            }else if(res.status == 204){
              this.$alert('原密码输入不正确，请重新输入', '修改失败', {confirmButtonText: '确定',});
            }else{
              this.$alert('未知原因修改失败，请重新操作', '修改失败', {confirmButtonText: '确定',});
            }
          })
          
        }else{
          //原密码和新密码一样
          this.$alert('请修改密码', '密码一致', {confirmButtonText: '确定',});
          this.editForm.stupwd1 = ''
          this.editForm.stupwd2 = ''
        }
      }else{
        //两次输入密码不一致，重新输入
        this.$alert('请修改密码', '确认密码和原密码不一致', {confirmButtonText: '确定',});
          this.editForm.stupwd1 = ''
          this.editForm.stupwd2 = ''
      }
    }
    
      // this.$refs.editForm.stupwd1 === this.$refs.editForm.stupwd2
  },
  created() {
    let params = { id:JSON.parse(localStorage.getItem('user')).id }
    personalList(params).then(res=>{
      if(res.status == 200){
        this.formLabelAlign = res.data
      }
    })
  },
  mounted() {
    
  },
  beforeCreate() {
    
  }, 
  beforeMount() {
    
  }, 
  beforeUpdate() {
    
  }, 
  updated() {
    
  }, 
  beforeDestroy() {
    
  }, 
  destroyed() {
    
  }, 
  activated() {
    
  }, 
}
</script>
<style  scoped>
el-form el-form-item el-input{
  width: 200px;
}
</style>