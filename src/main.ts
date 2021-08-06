import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import axios from './http'
import naive from 'naive-ui'

const app = createApp(App)

app.config.globalProperties.$axios = axios;

app.use(store).use(router).use(naive).use(ElementPlus).mount('#app')

