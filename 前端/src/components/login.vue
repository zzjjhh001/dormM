<template>
  <div class="login-wrap" ref="one">
    <el-form  class="demo-ruleForm login-container" style="background: #e9e7ef">
      <el-form-item style="text-align:center">
        <img src="../assets/img/fc.png" style="width: 100px; height: 100px;" ></img>
      </el-form-item>
      <el-form-item prop="username">
        <el-input type="text"  v-model="id" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="pwd"  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="stuLogin"  >学生登录</el-button>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="adminLogin"  >管理员登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import  axios from 'axios'
import {loginreq } from '../api/axiosFun'
  export default {
    data() {
      return{
        id:"",
        pwd:"",
      }
    },
    methods:{
      adminLogin(){
        console.log(this.id+"pwd"+this.pwd)
        let params = {'id':this.id,"pwd":this.pwd}
        loginreq("post",'http://localhost:8081/adminloginverify',params)
        .then(res =>{
          console.log(res)
          if(res.status == 204){
            this.$alert('账号或密码错误', '失败', {
            confirmButtonText: '确定',
            // callback: 
            // action => {
            //   this.$message({
            //     type: 'info',
            //     message: `action: ${ action }`
            //   });
            // }
          });
          }else if(res.status == 200){
            //把token写入localStorge
            let user = res.data
            user.role = 'admin'
            console.log(user)
            localStorage.setItem("user",JSON.stringify(user))
            this.$root.role = 'admin'
            console.log(this.$root.role)
            this.$router.push("index")
          }
        })
        /*
        console.log(this.id+"pwd"+this.pwd)
        let params = {'id':this.id,"pwd":this.pwd}
        axios.post('http://localhost:8081/login',params)
        .then(res =>{
          console.log(res)
          if(res.status == 204){
            this.$alert('登录失败', '失败', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
          }else if(res.status == 200){
            this.$router.push("index")
          }
        })
        */

      },
      stuLogin(){
        console.log(this.id+"pwd"+this.pwd)
        let params = {'id':this.id,"pwd":this.pwd}
        loginreq("post",'http://localhost:8081/stuloginverify',params)
        .then(res =>{
          console.log(res)
          if(res.status == 204){
            this.$alert('账号或密码错误', '失败', {
            confirmButtonText: '确定',
          });
          }else if(res.status == 200){
            //把token写入localStorge
            let user = res.data
            user.role = 'student'
            localStorage.setItem("user",JSON.stringify(user))
            this.$root.role = 'student'
            this.$router.push("index").catch(err => { console.log(err) })
          }
        })
      }
    }
  };
</script>
<style  scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  background-image: url(../assets/img/bz.jpg);
  /* background-repeat: no-repeat; */
  background-position: center right;
  background-size: 100%;}
.login-container {
  top:20px;
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
}
.code-box {
  text-align: right;
}
.codeimg {
  height: 40px;
}
</style>