const express = require('express')
const jwt = require('jsonwebtoken')
const SERCET_KEY = require('../key/index')
const tokenVerify = function(req,res,next){
  let s = ["/stuloginverify","/","/adminloginverify"]
  console.log(req.originalUrl)
  if(s.indexOf(req.originalUrl) != -1){
    
    console.log("路由是login或/")
    next()
  }else{
    console.log("进入验证token")
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['token'];
  //得到验证结果，如果出错会直接报错，所以加一个trycatch
    //不输入token，那么token是String
    console.log(token)
  try{
    if(token != "null"){
      let result = jwt.verify(token,SERCET_KEY);
      console.log("token存在"+result)
      if(result){
        console.log("验证通过")
        next()
      }
      // else{
      //   console.log("token 验证失败")
      //   res.status(205).end()
      // }
    }else{
      console.log('没有token')
      res.status(205).end()
    }
    }
    catch(err){
      if(err.message == 'invalid token'){
        res.status(206).end()
      }
      console.log(err.message);
    }
  }
}

module.exports = tokenVerify;