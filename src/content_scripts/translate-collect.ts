// import TranslateCollectPopup from './components/translate-collect-popup.vue';
import i18n from '@/i18n'
// import styleCss from './style/translate-collect-popup.module.scss?inline';
import { createShadowDoc } from './common/index'
// const ID = 'diy-translate-collect'
import NotificationBox from './components/notification-box.vue'
import NBstyleCss from './style/notification-box.module.scss?inline'
import { addVocabulary } from '@/api/vocabulary'
import { getXPath,getElementByXPath} from '@/utils/index'
const NBID = 'diy-notification-box'
let timer: ReturnType<typeof setTimeout> | null = null
const notificationFun = (type: 'successful' | 'failure' | 'emptyBook') => {
    if (timer) {
        clearTimeout(timer)
    }
    createShadowDoc({
        document: document,
        eleId: NBID,
        component: NotificationBox,
        props: {
            notificationType: type
        },
        styleCss: NBstyleCss,
        plugins: [i18n]
    })
    timer = setTimeout(() => {
        const popupEl = document.getElementById(NBID);
        popupEl?.remove();
        timer = null
    }, 1.5 * 1000);
}
let lastElement: any = null;

document.addEventListener("contextmenu", (event) => {
    lastElement = event.target || null;
});


chrome.runtime.onMessage.addListener(async (message) => {
    if (message.action === "translate-collect") {
        const selectedText = message.text;
        let XPath = getXPath(lastElement)
        getElementByXPath(XPath,selectedText)
        const result = await chrome.storage.sync.get('bookId');
        let bookId = result.bookId as string || ""
        if (!bookId) {
            notificationFun('emptyBook')
            return
        }
        if (!selectedText.trim()) return
        addVocabulary({
            bookId,
            vocabulary: selectedText,
            translations: '',
            examples: '',
            vocabularySourceWeb: location.href,
            XPath
        }).then(() => {
            notificationFun('successful')
        }).catch(() => {
            notificationFun('failure')
        })
    }
});
