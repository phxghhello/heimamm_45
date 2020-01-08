// 导入 axios
import axios from "axios";
//导入token
import {getToken} from '../utils/token.js'

//面板数据接口
export function chatTitle() {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/data/title",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
    })
}

//企业题目数据统计
export function enterpriseData() {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/data/statistics",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
    })
}

//热门城市题目统计
export function dataCities() {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/data/hot_cities",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
    })
}
