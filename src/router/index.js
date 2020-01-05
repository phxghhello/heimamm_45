// 导入Vue
import Vue from "vue";
// 导入路由
import VueRouter from "vue-router";
import routes from './routes.js'
// 注册
Vue.use(VueRouter);


import {
  Message
} from 'element-ui'
import store from '../store/store.js'

import {userInfo} from '../api/user.js'

const router = new VueRouter({
  routes
});

// 重写push方法 屏蔽 重复跳转错误
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

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
          res.data.data.avatar = process.env.VUE_APP_BASEURL +"/"+res.data.data.avatar
          store.commit("SETINFO", res.data.data);
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

export default router;