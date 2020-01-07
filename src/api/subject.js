// 导入 axios
import axios from "axios";
//导入token
import {getToken} from '../utils/token.js'

//学科列表
export function getSubjectList(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/subject/list",
        method: "get",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}

// 学科状态设置
export function setSubjectStatus(id) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/subject/status",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data: { id:id},
    })
}

//学科删除
export function removeSubject(id) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/subject/remove",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data: id,
    })
}

//编辑学科
export function editSubject(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/subject/edit",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}

//新增学科
export function addSubject(data) {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/subject/add",
        method: "post",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:getToken()
        },
        data,
    })
}