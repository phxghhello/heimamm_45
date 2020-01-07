// 导入 axios
import axios from "axios";
//导入token
import {getToken} from '../utils/token.js'

//企业列表
export function getEnterpriseList(params) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/enterprise/list",
        method: "get",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        params,
    })
}

//企业添加
export function addEnterprise(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/enterprise/add",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}

//企业状态设置
export function setEnterpriseStatus(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/enterprise/status",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}

//企业删除
export function removeEnterprise(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/enterprise/remove",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}

//企业编辑
export function editEnterprise(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/enterprise/edit",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}