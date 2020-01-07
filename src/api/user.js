// 导入 axios
import axios from "axios";
//导入token
import {getToken} from '../utils/token.js'
//注册接口
export function userInfo() {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/info",
        method: "get",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        }
    })
}

//退出登录
export function logout() {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/logout",
        method: "get",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        }
    })
}

//-----------------------以下是用户列表的接口----------------------------------------
//获取用户列表
export function getUserList(params) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/user/list",
        method: "get",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        params,
    })
}
//创建用户
export function addUser(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/user/add",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}
//设置用户状态
export function setUserStatus(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/user/status",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}

//删除用户
export function removeUser(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/user/remove",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}
//编辑用户
export function editUser(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/user/edit",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}