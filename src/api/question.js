// 导入 axios
import axios from "axios";
//导入token
import {getToken} from '../utils/token.js'

//发布题目
export function addQuestion(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/question/add",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}

//获取题目信息
export function getOneQuestion(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/question/one",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}

//设置题目状态
export function setQuestionStatus(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/question/status",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}

//删除题目
export function removeQuestion(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/question/remove",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}

//编辑题目
export function editQuestion(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/question/edit",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}

//题目列表
export function getQuestionList(params) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/question/list",
        method: "get",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        params,
    })
}