/*/////////////////////////////////////////////////
Dx2 Devil Fusion Emulator
Author: Robin Chiu
E-mail: oceanxdds@gmail.com
Github: https://github.com/oceanxdds/dx2_fusion
Publish: https://oceanxdds.github.io/dx2_fusion/
//////////////////////////////////////////////////*/

import '@babel/polyfill/dist/polyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import store from './utility/store'
import i18n from './utility/i18n'
import App from './app.vue'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

i18n.defaultLocale = 'ja'

new Vue({
    el:'#app',
    i18n,
    store,
    render: createElement => createElement( App )
});