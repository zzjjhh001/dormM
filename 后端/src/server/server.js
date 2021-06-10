const db = require('../db/index')
const jwt = require('jsonwebtoken')
const SERCET_KEY = require('../key/index')

//学生管理
//查询
exports.studentSelect = function(req,res){
  let w = ['id','name','sex','phone','college','class','building_id','dorm_id']
  let main = req.body
  console.log(req.params)
  console.log(req.query)
  console.log(main)
  let s = (main.stuId==''?"1=1":("id='"+main.stuId+"'"))
        +" AND "+(main.stuName==''?"1=1":("name='"+main.stuName+"'"))
        +" AND "+(main.stuSex==''?"1=1":("sex='"+main.stuSex+"'"))
        +" AND "+(main.stuClass==''?"1=1":("class='"+main.stuClass+"'"))
        +" AND "+(main.stuCollege==''?"1=1":("college='"+main.stuCollege+"'"))
        +" AND "+(main.stuDorm==''?"1=1":("dorm_id='"+main.stuDorm+"'"))
        +" AND "+(main.stuBuilding==''?"1=1":("building_id='"+main.stuBuilding+"'"))
        +" AND "+(main.stuPhone==''?"1=1":("phone='"+main.stuPhone+"'"))
        
  var sql = `SELECT * FROM STUDENTS WHERE ${s}`
  console.log(sql)
  db.base(sql,null,(result)=>{
    console.log(result+"server 22")
    res.jsonp(result)
  })
}
//删除
exports.studentDelete = function(req,res){
  var id = req.params.id
  console.log(req.body)
  var sql = `DELETE FROM STUDENTS WHERE ID=${id}`
  db.base(sql,null,(result)=>{
    console.log(result)
    if(result.affectedRows == 1){
      res.status(200).end()
    }else{
      res.status(204).end()
    }
  })
}
//添加,修改
exports.studentAdd = function(req,res){
  let main = {}
  main.title=req.body.title;
  main.id = req.body.stuId;
  main.name = req.body.stuName;
  main.sex = req.body.stuSex;
  main.phone = req.body.stuPhone;
  main.class = req.body.stuClass;
  main.college = req.body.stuCollege;
  main.building_id = req.body.stuBuilding;
  main.dorm_id = req.body.stuDorm;
  console.log(main)
  console.log(main.id)
  console.log('title'+main.title)
  let sql = `SELECT * FROM DORM WHERE dorm_id=${main.dorm_id} AND dorm_building_id=${main.building_id}`
  db.base(sql,null,result=>{
    console.log(result)
    if(result.length){
      if(main.title == "添加"){
        let sql = `INSERT INTO STUDENTS(id,name,sex,phone,class,college,building_id,dorm_id)
          VALUES ('${main.id}','${main.name}','${main.sex}','${main.phone}','${main.class}','${main.college}',
        '${main.building_id}','${main.dorm_id}')`
        console.log(sql)
        db.base(sql,null,(result)=>{
          console.log(result)
          if(result != undefined && result.affectedRows == 1){
            res.status(200).end()
          }else{
            res.status(204).end()
          }
        })
      }else{
        var sql = `UPDATE  STUDENTS SET name='${main.name}', sex='${main.sex}', phone='${main.phone}',
          class='${main.class}', college='${main.college}', building_id='${main.building_id}',
          dorm_id='${main.dorm_id}' WHERE id = '${main.id}'`
        console.log(sql)
        db.base(sql,null,(result)=>{
          // console.log(result)
          if(result != undefined && result.affectedRows == 1){
            res.status(200).end()
          }else{
            res.status(204).end()
          }
        })
      }
    }else{
      res.status(205).end()
    }
  })
}

//生活服务
//校园卡充值
exports.card = function(req,res){
  let did = req.body.stuId
  let cid = req.body.cstuId
  let number = req.body.number
  let sql = `INSERT INTO CARD(cstu_id,dstu_id,number) VALUES(${cid},${did},${number}) `
  console.log(sql)
  db.base(sql,null,result=>{console.log(result)})
  sql = `UPDATE STUDENTS SET card =card+${number}  WHERE id=${did}`
  console.log(sql)
  db.base(sql,null,result=>{
    console.log(result)
    if(result.affectedRows == 1){
      res.status(200).end()
    }else{
      res.status(204).end()
    }
  })
}
//电费充值
exports.elec = function(req,res){
  let buildingId = req.body.buildingId
  let dormId = req.body.dormId
  let number = req.body.number
  let stuId = req.body.stuId
  let sql = `INSERT INTO ELEC(dorm_id,building_id,cstu_id,number) 
  VALUES(${dormId},${buildingId},${stuId},${number})`
  console.log(sql)
  db.base(sql,null,result=>{ console.log(result)})
  sql = `UPDATE DORM SET dorm_elec =dorm_elec+${number} 
  WHERE dorm_id=${dormId} AND dorm_building_id=${buildingId}`
  console.log(sql)
  db.base(sql,null,result=>{
    console.log(result)
    if(result.affectedRows == 1){
      res.status(200).end()
    }else{
      res.status(204).end()
    }
  })
}
//查询校园卡充值记录
exports.cardrecord = function(req,res){
  let main = req.body
  console.log(main)
  let s = (main.cstuId==''?"1=1":("cstu_id='"+main.cstuId+"'"))
        +" AND "+(main.dstuId==''?"1=1":("dstu_id='"+main.dstuId+"'"))
        +" AND "+(main.number==''?"1=1":("number='"+main.number+"'"))
  var sql = `SELECT * FROM CARD WHERE ${s}`
  console.log(sql)
  db.base(sql,null,(result)=>{
    console.log(result+"server 22")
    res.jsonp(result)
  })
}
//查询电费充值记录
exports.elecrecord = function(req,res){
  let main = req.body
  console.log(main)
  let s = (main.buildingId==''?"1=1":("building_id='"+main.buildingId+"'"))
        +" AND "+(main.dormId==''?"1=1":("dorm_id='"+main.dormId+"'"))
        +" AND "+(main.cstuId==''?"1=1":("cstu_id='"+main.cstuId+"'"))
        +" AND "+(main.number==''?"1=1":("number='"+main.number+"'"))
  var sql = `SELECT * FROM ELEC WHERE ${s}`
  console.log(sql)
  db.base(sql,null,(result)=>{
    console.log(result+"server 22")
    res.jsonp(result)
  })
}

//报修列表操作
//查询
exports.baoxiuSelect = function(req,res){
  let main = req.body
  console.log(req.params)
  console.log(req.query)
  console.log(main)
  let s = (main.stu_id==''?"1=1":("stu_id='"+main.stu_id+"'"))
        +" AND "+(main.building_id==''?"1=1":("building_id='"+main.building_id+"'"))
        +" AND "+(main.dorm_id==''?"1=1":("dorm_id='"+main.dorm_id+"'"))
        +" AND "+(main.time==''?"1=1":("time='"+main.time+"'"))
        +" AND "+(main.state==''?"1=1":("state='"+main.state+"'"))
  var sql = `SELECT * FROM BAOXIU WHERE ${s}`
  console.log(sql)
  db.base(sql,null,(result)=>{
    console.log(result+"server 22")
    res.jsonp(result)
  })
}
//更新状态
exports.baoxiuUpdate = function(req,res){
  console.log(req.body)
  var id = req.body.id
  let state = req.body.state
  let sql = `UPDATE BAOXIU SET state = ${state}  WHERE id=${id}`
  console.log(sql)
  db.base(sql,null,result=>{
    if(result.affectedRows == 1){
      res.status(200).end()
    }else{
      res.status(204).end()
    }
  })
}
//添加
exports.baoxiuAdd = function(req,res){
  let main = {}
  main=req.body;
  let sql = `INSERT INTO BAOXIU(stu_id,building_id,dorm_id,time,content) 
  VALUES (${main.stu_id},${main.buildingId},${main.dormId},${main.time},'${main.content}')`
  console.log(sql)
  db.base(sql,null,(result)=>{
    console.log(result)
    if(result != undefined && result.affectedRows == 1){
      res.status(200).end()
    }else{
      res.status(204).end()
    }
  })
}

//楼宇管理
//查询
exports.buildingSelect = function(req,res){
  let main = req.body
  console.log(req.params)
  console.log(req.query)
  console.log(main)
  let s = (main.buildingId==''?"1=1":("building_id='"+main.buildingId+"'"))
        +" AND "+(main.buildingSss==''?"1=1":("building_sss='"+main.buildingSss+"'"))
        +" AND "+(main.buildingRs==''?"1=1":("building_rs='"+main.buildingRs+"'"))
  var sql = `SELECT * FROM BUILDING WHERE ${s}`
  console.log(sql)
  db.base(sql,null,(result)=>{
    console.log(result+"server 22")
    res.jsonp(result)
  })
}
//删除
exports.buildingDelete = function(req,res){
  console.log(req.params)
  var id = req.params.id
  console.log(req.body)
  let sql = `DELETE FROM STUDENTS WHERE building_id=${id}`
  console.log(sql)
  db.base(sql,null,(result)=>{
    let sql = `DELETE FROM DORM WHERE dorm_building_id=${id}`
    db.base(sql,null,result=>{
      let sql = `DELETE FROM BUILDING WHERE building_id=${id}`
      db.base(sql,null,result=>{
        if(result.affectedRows == 1){
          res.status(200).end()
        }else{
          res.status(204).end()
        }
      })
    })
    
  })
}
//添加
exports.buildingAdd = function(req,res){
  let main = {}
  main.building_id=req.body.buildingId;
  console.log(main)
  console.log(main.id)
  let sql = `INSERT INTO BUILDING(building_id) VALUES (${main.building_id})`
  console.log(sql)
  db.base(sql,null,(result)=>{
    console.log(result)
    if(result != undefined && result.affectedRows == 1){
      res.status(200).end()
    }else{
      res.status(204).end()
    }
  })
}

//宿舍管理
//查询
exports.dormSelect = function(req,res){
  let main = req.body
  main.begin = (main.currentPage-1)*main.pageSize
  console.log(main)
  let s = (main.dormId==''?"1=1":("dorm_id='"+main.dormId+"'"))
        +" AND "+(main.dormBuildingId==''?"1=1":("dorm_building_id='"+main.dormBuildingId+"'"))
        +" AND "+(main.dormRs==''?"1=1":("dorm_rs='"+main.dormRs+"'"))
  let sql = `SELECT * FROM DORM  WHERE ${s}`
  console.log(sql)
  db.base(sql,null,(result)=>{
    console.log(result)
    res.jsonp(result)
    })
}
//删除
exports.dormDelete = function(req,res){
  console.log(req.params)
  var id = req.params.id
  let sql = `DELETE FROM STUDENTS WHERE dorm_id=${id}`
  console.log(sql)
  db.base(sql,null,result1=>{
    console.log(result1)
    let sql = `DELETE FROM DORM WHERE dorm_id=${id}`
    console.log(sql)
    db.base(sql,null,result=>{
      console.log(result)
      if(result.affectedRows == 1){
        res.status(200).end()
      }else{
        res.status(204).end()
      }
    })
  })
  
}
//添加
exports.dormAdd = function(req,res){
  let main = {}
  main.dormId=req.body.dormId;
  main.building_id = req.body.dormBuildingId;
  console.log(main)
  console.log(main.id)
  let sql = `INSERT INTO DORM(dorm_id,dorm_building_id) VALUES (${main.dormId},${main.building_id})`
  console.log(sql)
  db.base(sql,null,(result)=>{
    console.log(result)
    if(result != undefined && result.affectedRows == 1){
      res.status(200).end()
    }else{
      res.status(204).end()
    }
  })
}

//用户管理员登陆
//login操作
exports.adminLogin = function(req,res){
  let id = req.body.id
  let pwd = req.body.pwd
  let sql = `select * from adminlogin where id='${id}' and pwd='${pwd}'`
  console.log(sql)
  db.base(sql,null,(result)=>{
    console.log(result)
    
    if(!result.length){
      res.status(204).send("failure")
      console.log('账号密码错误')
    }else{
      let {id,name} = result[0]
      console.log(id,name)
      res.status(200).json({
        id,
        name,
        token:jwt.sign({id},SERCET_KEY,{
        })
      })
      console.log('账号密码正确')
    }
  })
}
exports.stuLogin = function(req,res){
  let id = req.body.id
  let pwd = req.body.pwd
  let sql = `select * from stulogin where id='${id}' and pwd='${pwd}'`
  console.log(sql)
  db.base(sql,null,(result)=>{
    console.log(result)
    if(!result.length){
      res.status(204).send("failure")
      console.log('账号密码错误')
    }else{
      let {id,name} = result[0]
      res.status(200).json({
        id,
        name,
        token:jwt.sign({id},SERCET_KEY,{
        })
      })
      console.log('账号密码正确')
    }
  })
}

//用户个人信息管理
exports.personalList = function(req,res){
  let id = req.body.id
  let sql = `select * from students where id='${id}'`
  console.log(sql)
  db.base(sql,null,(result)=>{
    console.log(result)
    if(!result.length){
      res.status(204).send("failure")
      console.log('账号密码错误')
    }else{
      let userMG = result[0]
      res.status(200).json(userMG)
      console.log("学生"+userMG)
    }
  })
}
exports.updatepwd = function(req,res){
  let id = req.body.id
  let stupwd = req.body.stupwd
  let stupwd1 = req.body.stupwd1
  console.log(stupwd,stupwd1)
  let sql = `select pwd from stulogin where id='${id}'`
  console.log(sql)
  db.base(sql,null,(result)=>{
    if(result[0].pwd === stupwd){
      let sql = `UPDATE  stulogin SET pwd='${stupwd1}' WHERE id = '${id}'`
      db.base(sql,null,result =>{
        if(result.affectedRows === 1){
          res.status(200).end()
        }else{
          res.status(205).end()
        }
      })
    }else{
      res.status(204).end()
    }
  })
}