/*/////////////////////////////////////////////////
Dx2 Devil Fusion Emulator
Author: Robin Chiu
E-mail: oceanxdds@gmail.com
Github: https://github.com/oceanxdds/dx2_fusion
Publish: https://oceanxdds.github.io/dx2_fusion/
//////////////////////////////////////////////////*/

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/app.scss'
import { useMainStore } from './stores/main'
import i18n, { setI18nLocale } from './utility/i18n'
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(i18n)
app.use(router)

setI18nLocale(useMainStore().lang_value)

app.mount('#app')