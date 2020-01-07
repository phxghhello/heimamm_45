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
