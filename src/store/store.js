import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
//创建仓库
const store = new Vuex.Store({
    // ...
    state:{
        userInfo:undefined,
    },
    mutations:{
        SETINFO(state,info){
            state.userInfo = info;
        }
    }
})

//暴露出去
export default store;