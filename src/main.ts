import { createApp } from 'vue'
import i18n from './i18n'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import router from './router'
import './theme/index.scss'

const app = createApp(App)

// app.use(createPinia())
// app.use(router)
app.use(ElementPlus)
app.use(i18n)

app.mount('#app')
