import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import { Card } from 'element-ui'

import building from '@/views/building/building'
import dorm from '@/views/dorm/dorm'
import baoxiu from '@/views/houqin/baoxiu'
import liebiao from '@/views/houqin/liebiao'
import card from '@/views/life/card'
import elec from '@/views/life/elec'
import elecrecord from '@/views/life/elecrecord'
import cardrecord from '@/views/life/cardrecord'
import personal from '@/views/personal/personal'
import statistics from '@/views/statistics/statistics'
import score from '@/views/statistics/score'
import evaluate from '@/views/statistics/evaluate'
import student from '@/views/student/student'
import not from '@/views/not/not'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '登录',
      component: login,
    },{
      path: '/login',
      name: '登录',
      component: login,
    },{
      path: '/index',
      name: '首页',
      component: index,
      children:[
        {
          path: '/building/building',
          name: '楼宇管理',
          component: building,
          meta: {
              role:['student','admin']
          }
        },{
          path: '/dorm/dorm',
          name: '宿舍管理',
          component: dorm,
          meta: {
              role:['student','admin']
          }
        },{
          path: '/life/card',
          name: '校园卡充值',
          component: card,
          meta: {
              role:['student']
          }
        },{
          path: '/life/elec',
          name: '电费充值',
          component: elec,
          meta: {
              role:['student']
          }
        },{
          path: '/life/cardrecord',
          name: '校园卡充值记录',
          component: cardrecord,
          meta: {
              role:['admin']
          }
        },{
          path: '/life/elecrecord',
          name: '电费充值记录',
          component: elecrecord,
          meta: {
              role:['admin']
          }
        },{
          path: '/personal/personal',
          name: '个人管理',
          component: personal,
          meta: {
              role:['student']
          }
        },{
          path: '/statistics/score',
          name: '宿舍评分',
          component: score,
          meta: {
              role:['student','admin']
          }
        },{
          path: '/statistics/evaluate',
          name: '楼管评价',
          component: evaluate,
          meta: {
              role:['student','admin']
          }
        },{
          path: '/houqin/baoxiu',
          name: '损坏报修',
          component: baoxiu,
          meta: {
              role:['student']
          }
        },{
          path: '/student/student',
          name: '学生管理',
          component: student,
          meta: {
              role:['admin']
          }
        },{
          path: '/statistics/statistics',
          name: '报修统计',
          component: statistics,
          meta: {
              role:['admin']
          }
        },{
          path: '/houqin/liebiao',
          name: '报修列表',
          component: liebiao,
          meta: {
              role:['admin']
          }
        }
      ]
    },{
      path: '*',
      component: not,
      hidden: true
    }
  ]
})
//使用路由守卫设置动态路由失败，有时间再弄
// router.beforeEach((to,from,next)=>{
//   if(to.path == '/login' || to.path== '/'){
//     console.log("进入login")
//     next()
//   }else if(localStorage.getItem("router") == 0){
//     console.log('进入设置路由')
//     if(JSON.parse(localStorage.getItem("user")).role == 'student'){
//       console.log("进入设置学生路由")
//       router.addRoutes(stuRoute)
//     }else{
//       console.log("进入设置管理员路由")
//       router.addRoutes(adminRoute)
//     }
//     localStorage.setItem("router",1)
//     console.log(router)
//     next(to.path)
//   }else{
//     console.log(localStorage.getItem('router'))
//     console.log("识别到有路由")
//     next()
//   }
// })

export default router
