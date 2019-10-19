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
/*
import TabsPlugin from 'node_modules/bootstrap-vue/es/components/tabs';
import NavbarPlugin from 'bootstrap-vue/es/components/navbar';
import ModalPlugin from 'bootstrap-vue/es/components/modal';
import ListGroupPlugin from 'bootstrap-vue/es/components/list-group';
import FormInputPlugin from 'bootstrap-vue/es/components/form-input';
import FormRadioPlugin from 'bootstrap-vue/es/components/form-radio';
import CollapsePlugin from 'bootstrap-vue/es/components/collapse';
import CardPlugin from 'bootstrap-vue/es/components/card';
import ButtonPlugin from 'bootstrap-vue/es/components/button';
import BadgePlugin from 'bootstrap-vue/es/components/badge';
import PopoverPlugin from 'bootstrap-vue/es/components/popover';

Vue.use(TabsPlugin);
Vue.use(NavbarPlugin);
Vue.use(ModalPlugin);
Vue.use(ListGroupPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormRadioPlugin);
Vue.use(CollapsePlugin);
Vue.use(CardPlugin);
Vue.use(ButtonPlugin);
Vue.use(BadgePlugin);
Vue.use(PopoverPlugin);
*/
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