import Vue from 'vue'
import App from './App.vue'

// 导入 Element-ui
import ElementUI from 'element-ui';
// 导入 Element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 导入全局样式
import "@/styles/bass.less";

import router from './router/index'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
