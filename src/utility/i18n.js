import { createI18n } from 'vue-i18n'
import lang_en from '../lang/en'
import lang_ja from '../lang/ja'
import lang_tw from '../lang/tw'

const i18n = createI18n({
    locale: 'ja',
    fallbackLocale: 'ja',
    legacy: false,
    globalInjection: true,
    messages: {
        en: lang_en,
        ja: lang_ja,
        tw: lang_tw
    }
});

const getLocaleValue = locale => {
    if (typeof locale === 'object' && locale !== null && 'value' in locale) {
        return locale.value;
    }
    return locale;
};

const setGlobalLocaleValue = locale => {
    if (typeof i18n.global.locale === 'object' && i18n.global.locale !== null && 'value' in i18n.global.locale) {
        i18n.global.locale.value = locale;
    }
    else {
        i18n.global.locale = locale;
    }
};

export const i18nLocale = () => getLocaleValue(i18n.global.locale);
export const i18nDefaultLocale = () => getLocaleValue(i18n.global.fallbackLocale);
export const setI18nLocale = locale => {
    locale = getLocaleValue(locale);
    const supportedLocales = ['en', 'ja', 'tw'];

    if (supportedLocales.includes(locale)) {
        setGlobalLocaleValue(locale);
    }
};

export default i18n;