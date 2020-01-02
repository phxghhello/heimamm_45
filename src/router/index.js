import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import login from '@/views/login/login.vue'
import index from '@/views/index/index.vue'

// const routes= []

const router = new VueRouter({
    routes: [
        {
            path:'/',
            redirect:'/login'
        },
        {
            path:'/login',
            component:login
        },
        {
            path:'/index',
            component:index
        },
    ]
})

export default router;