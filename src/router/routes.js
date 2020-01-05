// 导入 组件
import login from "../views/login/login.vue";
import index from "../views/index/index.vue";



// 暴露出去
export default [
    {
        path: "/",
        redirect: '/login'
    },
    {
        path: "/login",
        component: login,
        meta: {
            roles: ["超级管理员", "管理员", "老师", "学生"]
        }
    },
    {
        path: "/index",
        component: index,
        // 嵌套路由
        children: [{
                path: "chart",
                // component: chart,
                meta: {
                    title: "数据概览",
                    fullPath: "/index/chart",
                    icon: "el-icon-pie-chart",
                    roles: ["超级管理员", "管理员", "老师"]
                }
            },
            {
                path: "user",
                // component: user,
                meta: {
                    title: "用户列表",
                    fullPath: "/index/user",
                    icon: "el-icon-user",
                    roles: ["超级管理员", "管理员"]
                }
            },
            {
                path: "question",
                // component: question,
                meta: {
                    title: "题库列表",
                    fullPath: "/index/question",
                    icon: "el-icon-edit-outline",
                    roles: ["超级管理员", "管理员", "老师", "学生"]
                }
            },

            {
                path: "enterprise",
                // component: enterprise,
                meta: {
                    title: "企业列表",
                    fullPath: "/index/enterprise",
                    icon: "el-icon-notebook-2",
                    roles: ["超级管理员", "管理员", "老师"]
                }
            },
            {
                path: "subject",
                // component: subject,
                meta: {
                    title: "学科列表",
                    fullPath: "/index/subject",
                    icon: "el-icon-office-building",
                    roles: ["超级管理员", "管理员", "老师"]
                }
            }
        ]
    }
];