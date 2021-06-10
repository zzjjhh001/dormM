<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>校园卡充值</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form" label-width="100px" :rules="rules" style="margin-top:20px;">
      <el-form-item label="学生卡号" prop='stuId'>
        <el-input v-model="form.stuId"></el-input>
      </el-form-item>
      <el-form-item label="充值金额" prop='number'>
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="支付方式" prop="mode">
        <el-select v-model="mode" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即提交</el-button>
        <el-button @click="drop">清除</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { card } from '../../api/life.js'
import Vue from 'vue'
  export default {
    data() {
      return {
        role:'',
        form: {
          stuId: '',
          number: '',
        },
        mode:'',
        rules: {
          stuId: [
            { required: true, message: '请输入充值的学生卡号', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '请选择充值金额', trigger: 'blur' }
          ],
        },
        options: [{
          value: 'zfb',
          label: '支付宝'
        }, {
          value: 'wx',
          label: '微信',
        }, {
          value: 'qq',
          label: 'QQ钱包'
        }, {
          value: 'ysf',
          label: '云闪付'
        }],
      }
    },
    created() {
      this.role
    },
    methods: {
      onSubmit() {
        if(this.mode == ''){
          this.$alert('请选择支付方式','提示',{
            confirmButtonText: '确定'
          })
        }else{
          this.$confirm('即将充值，该操作不可撤回，是否继续?', '提示', {
            confirmButtonText: '继续',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          })
          //唤起支付
          .then(() => {
            console.log("haha")
            this.$confirm(this.$createElement(Vue.compile(`<img src='https://bs-1301623187.cos.ap-nanjing.myqcloud.com/${this.mode}.jpg'/>`)), '扫码支付', {
            confirmButtonText: '已支付',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
            })
            .then(()=>{
              //发请求
              let parameters = this.form
              parameters.cstuId = JSON.parse(localStorage.getItem('user')).id
              card(this.form)
              .then(res=>{
                if(res.status == 200){
                  this.$message({
                    message:'充值成功',
                    type:'success'
                  })
                }else{
                  this.$alert('充值失败，修改信息重试','充值失败',{
                    confirmButtonText:'确定'
                  })
                }
              })
            })
            .catch(()=>{
                this.$message({
                type: 'info',
                message: '已取消充值'
              });
              })
          })
          .catch((err) => {
          this.$message({
            type: 'info',
            message: err
          });          
        });
        }
      },
      drop(){
        this.form.stuId=''
        this.form.number=''
      }
    }
  }
  
</script>
<style  scoped>

</style>