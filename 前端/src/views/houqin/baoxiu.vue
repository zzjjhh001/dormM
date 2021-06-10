<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>故障报修</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="100px" :rules="rules" style="margin-top:20px;">
      <el-form-item label="楼宇号" prop='buildingId'>
        <el-input v-model="form.buildingId"></el-input>
      </el-form-item>
      <el-form-item label="宿舍号" prop='dormId'>
        <el-input v-model="form.dormId"></el-input>
      </el-form-item>
      <el-form-item label="上门时间" prop='time'>
        <el-input v-model="form.time"></el-input>
      </el-form-item>
      <el-form-item label="具体信息" prop='content'>
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即提交</el-button>
        <el-button @click="drop">清除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { baoxiuAdd} from '../../api/baoxiu.js'
  export default {
    data() {
      return {
        form: {
          buildingId: '',
          dormId: '',
          time: '',
          content: '',
        },
        rules: {
          dormId: [
            { required: true, message: '请输入宿舍号', trigger: 'blur' }
          ],
          buildingId: [
            { required: true, message: '请输入楼宇号', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '请输入上门时间', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入具体信息', trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      onSubmit() {
        let a = true
        let parameters = this.form
        console.log(localStorage.getItem('id'))
        parameters.stu_id = JSON.parse(localStorage.getItem('user')).id
        console.log(Object.values(parameters))
        Object.values(this.form).forEach(arr=>{
          if(arr =='') a = false
        })
        if(a){
          baoxiuAdd(this.form)
          .then(res =>{
            if(res.status == 200){
              console.log("上报成功")
              this.$message({
                type: 'success',
                message: '上报成功'
              })
            }else{
              this.$message({
                type: 'error',
                message: '上报失败，修改信息再次上报'
              })
            }
          })
        }else{
          this.$message({
                  type: 'error',
                  message: '信息没有输入完整!'
                })
        }
      },
      drop(){
        this.form.buildingId=''
        this.form.dormId=''
        this.form.time=''
        this.form.content=''
      }
    }
  }
</script>
<style  scoped>

</style>