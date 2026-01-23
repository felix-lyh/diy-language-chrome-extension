import { createI18n } from 'vue-i18n';

import zhCN from './lang/zh-CN.json';
import enUS from './lang/en-US.json'
const defaultMessage = enUS
const i18n = createI18n({
    legacy: false, // must be false then can in Vue3 use Composition API
    locale: localStorage.getItem('langCode') || 'zh-CN', // default
    fallbackLocale: 'en-US', // alternative language
    // globalInjection: true, // set this you can use $t() in template
    messages: {
        'en-US': Object.assign({}, defaultMessage),
        'zh-CN': Object.assign({}, defaultMessage, zhCN),
    }
});

export default i18n;
