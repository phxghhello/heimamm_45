//定义key值
const key = "mmtoken"

//保存token
export function saveToken(token){
    window.localStorage.setItem(key,token)
}

//获取token
export function getToken(){
    return window.localStorage.getItem(key)
}

//删除token
export function removeToken(){
    window.localStorage.removeItem(key)
}