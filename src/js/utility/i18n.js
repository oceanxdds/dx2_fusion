import lang_en from '../lang/en';
import lang_ja from '../lang/ja';
import lang_tw from '../lang/tw';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default new VueI18n({
    locale: 'ja',
    messages: {
        en: lang_en,
        ja: lang_ja,
        tw: lang_tw
    }
});