// 导入Vue
import Vue from "vue";
// 导入路由
import VueRouter from "vue-router";

// 导入 组件
import login from "../views/login/login.vue";
import index from "../views/index/index.vue";

import {
  Message
} from 'element-ui'
import store from '../store/store.js'

import {userInfo} from '../api/user.js'

// 注册
Vue.use(VueRouter);

// 创建路由对象
const router = new VueRouter({
  routes: [{
      path: "/",
      redirect: '/login'
    },
    {
      path: "/login",
      component: login
    },
    {
      path: "/index",
      component: index
    }
  ]
});

//地址白名单
const whitePaths = ['/login']
//增加导航守卫
router.beforeEach((to, from, next) => {
  //除了登录页以外的页面需要token
  if (!whitePaths.includes(to.path)) {
    //本地token的有无
    if (!window.localStorage.getItem("mmtoken")) {
      Message.error("必须登录才可以访问首页");
      return next("/login")
    }
    //如果没有用户信息,就调用接口
    if (!store.state.userInfo) {
      //校验token的正确与否
      userInfo().then(res => {
        if (res.data.code == 206) {
          Message.error("登录状态有误,请重新登录")
          window.localStorage.removeItem("mmtoken")
          next('/login')
        } else {
          store.commit("SETINFO", res.data);
          next();
        }
      })
    } else {
      //如果有用户信息,就判断是否允许访问
      if (to.meta.roles.includes(store.state.userInfo.role)) {
        next()
      } else {
        //不允许访问
        Message.warning("您没有访问的权限")
      }
    }

  } else {
    next();
  }
})

// 暴露出去
export default router;