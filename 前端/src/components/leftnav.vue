/**
* 左边菜单
*/ 
<template>
  <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
    <div class="logobox">
      <img class="logoimg" src="../assets/img/fc.png" alt="">
    </div>
    <el-submenu v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{menu.menuname}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
          <!-- <i class="iconfont" :class="chmenu.icon"></i> -->
          <span>{{chmenu.menuname}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
// import { menu } from '../api/userMG'
export default {
  name: 'leftnav',
  data() {
    return {
      collapsed: false,
      allmenu: []
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    // 路由生成
    if(JSON.parse(localStorage.getItem('user')).role != 'student' ){
      console.log("admin")
      var res = {
      success: true,
      data: [
        {
          menuid: 33,
          icon: 'el-icon-zhaozhinenglouyu',
          menuname: '楼宇管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 34,
              // icon: 'icon-order-manage',
              menuname: '楼宇列表',
              hasThird: 'N',
              url: 'building/building',
              menus: null
            }
          ]
        },
        {
          menuid: 71,
          icon: 'el-icon-zhaosushe',
          menuname: '宿舍管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 72,
              // icon: 'icon-cus-manage',
              menuname: '宿舍列表',
              hasThird: 'N',
              url: 'dorm/dorm',
              menus: null
            },
          ]
        },
        {
          menuid: 150,
          icon: 'el-icon-zhaoxuesheng',
          menuname: '学生管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 159,
              // icon: 'icon-provider-manage',
              menuname: '学生列表',
              hasThird: 'N',
              url: 'student/student',
              menus: null
            }
          ]
        },
        {
          menuid: 178,
          icon: 'el-icon-zhaohouqin',
          menuname: '后勤服务',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 180,
              // icon: 'icon-provider-manage',
              menuname: '报修列表',
              hasThird: 'N',
              url: 'houqin/liebiao',
              menus: null
            },
          ]
        },
        {
          menuid: 148,
          icon: 'el-icon-zhaoicon-test',
          menuname: '生活服务',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 152,
              // icon: 'icon-provider-manage',
              menuname: '电费充值记录',
              hasThird: 'N',
              url: 'life/elecrecord',
              menus: null
            },
            {
              menuid: 153,
              // icon: 'icon-provider-manage',
              menuname: '校园卡充值记录',
              hasThird: 'N',
              url: 'life/cardrecord',
              menus: null
            },
            
            
          ]
        },
        //暂时删除统计功能
        // {
        //   menuid: 118,
        //   icon: 'el-icon-zhaotongji',
        //   menuname: '统计中心',
        //   hasThird: null,
        //   url: null,
        //   menus: [
        //     {
        //       menuid: 119,
        //       // icon: 'icon-provider-manage',
        //       menuname: '宿舍评分',
        //       hasThird: 'N',
        //       url: 'statistics/score',
        //       menus: null
        //     },
        //     {
        //       menuid: 120,
        //       // icon: 'icon-provider-manage',
        //       menuname: '报修统计',
        //       hasThird: 'N',
        //       url: 'statistics/statistics',
        //       menus: null
        //     },
        //     {
        //       menuid: 121,
        //       // icon: 'icon-provider-manage',
        //       menuname: '楼管评价',
        //       hasThird: 'N',
        //       url: 'statistics/evaluate',
        //       menus: null
        //     },
        //   ]
        // },
      ],
      msg: 'success'
      }
    }else{
      console.log("student")
      var res = {
      success: true,
      data: [
        {
          menuid: 1,
          icon: 'el-icon-zhaogerenzhongxin',
          menuname: '个人中心',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 2,
              // icon: 'icon-cat-skuQuery',
              menuname: '个人信息',
              hasThird: 'N',
              url: 'personal/personal',
              menus: null
            }
          ]
        },
        {
          menuid: 33,
          icon: 'el-icon-zhaozhinenglouyu',
          menuname: '楼宇管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 34,
              // icon: 'icon-order-manage',
              menuname: '楼宇列表',
              hasThird: 'N',
              url: 'building/building',
              menus: null
            }
          ]
        },
        {
          menuid: 71,
          icon: 'el-icon-zhaosushe',
          menuname: '宿舍管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 72,
              // icon: 'icon-cus-manage',
              menuname: '宿舍列表',
              hasThird: 'N',
              url: 'dorm/dorm',
              menus: null
            },
          ]
        },
        {
          menuid: 178,
          icon: 'el-icon-zhaohouqin',
          menuname: '后勤服务',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 179,
              // icon: 'icon-provider-manage',
              menuname: '损坏报修',
              hasThird: 'N',
              url: 'houqin/baoxiu',
              menus: null
            },
          ]
        },
        {
          menuid: 148,
          icon: 'el-icon-zhaoicon-test',
          menuname: '生活服务',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 149,
              // icon: 'icon-provider-manage',
              menuname: '电费充值',
              hasThird: 'N',
              url: 'life/elec',
              menus: null
            },
            {
              menuid: 151,
              // icon: 'icon-provider-manage',
              menuname: '校园一卡通',
              hasThird: 'N',
              url: 'life/card',
              menus: null
            },
          ]
        },
        // {
        //   menuid: 118,
        //   icon: 'el-icon-zhaotongji',
        //   menuname: '统计中心',
        //   hasThird: null,
        //   url: null,
        //   menus: [
        //     {
        //       menuid: 119,
        //       // icon: 'icon-provider-manage',
        //       menuname: '宿舍评分',
        //       hasThird: 'N',
        //       url: 'statistics/score',
        //       menus: null
        //     },
        //     {
        //       menuid: 120,
        //       // icon: 'icon-provider-manage',
        //       menuname: '报修统计',
        //       hasThird: 'N',
        //       url: 'statistics/statistics',
        //       menus: null
        //     },
        //     {
        //       menuid: 121,
        //       // icon: 'icon-provider-manage',
        //       menuname: '楼管评价',
        //       hasThird: 'N',
        //       url: 'statistics/evaluate',
        //       menus: null
        //     },
        //   ]
        // },
      ],
      msg: 'success'
      }
    }
    this.allmenu = res.data
    
    // menu(localStorage.getItem('logintoken'))
    //   .then(res => {
    //     console.log(JSON.stringify(res))
    //     if (res.success) {
    //       this.allmenu = res.data
    //     } else {
    //       this.$message.error(res.msg)
    //       return false
    //     }
    //   })
    //   .catch(err => {
    //     this.$message.error('菜单加载失败，请稍后再试！')
    //   })

    // 监听
    this.$root.Bus.$on('toggle', value => {
      this.collapsed = !value
    })
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
</style>