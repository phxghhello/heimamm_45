// 导入 axios
import axios from "axios";

export function login(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/login",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        data,
    })
}

export function sendsms(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/sendsms",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        data,
    })
}

//注册接口
export function register(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/register",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        data,
    })
}