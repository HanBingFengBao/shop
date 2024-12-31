import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 引入路由

import ElementPlus from 'element-plus'; //ElementUI组件库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'  // 引入所有图标
import 'element-plus/dist/index.css';

const app = createApp(App);

// 全局注册所有 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


// 注册路由
app.use(router);

// 注册 ElementPlus
app.use(ElementPlus);

// 挂载到 DOM 上
app.mount('#app');


