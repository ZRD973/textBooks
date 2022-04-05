import { createApp } from 'vue'
import App from './App.vue'
// 引入路由模块
import router from './router'
// 引入Vuex
import store from './store'
// 引入ElementUI
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
// 引入svg图标组件
import SvgIcon from '@/components/SvgIcon.vue'
// 引入Echarts
import * as echarts from 'echarts'


const app = createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { locale })
  .component('svg-icon', SvgIcon)
  .mount('#app')


app.echarts = echarts
