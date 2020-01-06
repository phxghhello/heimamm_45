// 导入 axios
import axios from "axios";

export function getSubjectList() {
    // 调用接口
    return axios({
        url: process.env.VUE_APP_BASEURL + "/subject/list",
        method: "get",
        // 跨域 是否携带 cookie
        withCredentials: true,
        headers:{
            token:window.localStorage.getItem("mmtoken")
        }
    })
}