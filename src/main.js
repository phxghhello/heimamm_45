import Vue from 'vue'
import App from './App.vue'
// 导入路由对象
import router from './router/index.js'
// 导入 饿了么 ui的库
import ElementUI from 'element-ui';
// 导入 饿了么 的css
import 'element-ui/lib/theme-chalk/index.css';
// 导入自己的初始化样式
import './style/base.css'
//导入共享数据
import store from './store/store.js'
//导入过滤器
import './filters/filters.js'
//导入自定义指令
import './directives/directive.js'

// 注册 饿了么 ui
Vue.use(ElementUI);

Vue.config.productionTip = false

// 测试环境变量
// window.console.log(process.env.VUE_APP_BASEURL)

new Vue({
  render: h => h(App),
  // 挂载 注入 Vue实例
  router,
  store
}).$mount('#app')
