/*/////////////////////////////////////////////////
Dx2 Devil Fusion Emulator
Author: Robin Chiu
E-mail: oceanxdds@gmail.com
Github: https://github.com/oceanxdds/dx2_fusion
Publish: https://oceanxdds.github.io/dx2_fusion/
//////////////////////////////////////////////////*/

import '@babel/polyfill/dist/polyfill';
import Vue from 'vue';

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

import store from './store'
import i18n from './lang';
import App from './app.vue';

new Vue({
    el:'#app',
    i18n,
    store,
    render: createElement => createElement( App )
});