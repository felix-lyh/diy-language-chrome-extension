// import TranslateCollectPopup from './components/translate-collect-popup.vue';
import i18n from '@/i18n'
import type { VocabularyType } from '@/types/collect-words'
// import styleCss from './style/translate-collect-popup.module.scss?inline';
import { createShadowDoc } from './common/index'
// const ID = 'diy-translate-collect'
import NotificationBox from './components/notification-box.vue'
import NBstyleCss from './style/notification-box.module.scss?inline'
import { addVocabulary, getVocabularyList } from '@/api/vocabulary'
import { getXPath, getElementByXPath, setStyle, clickOutside } from './functions/for-translate-collect'
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
let isStart = false
document.addEventListener("contextmenu", (event) => {
    lastElement = event.target || null;
});
function startFun() {
    if (isStart) return;
    
    let timer: ReturnType<typeof setTimeout> | null = null
    timer = setTimeout(() => {
        isStart = true;
        setStyle();
        clickOutside();
        const vocabularySourceWeb = decodeURIComponent(location.href.toString())
        getVocabularyList({ vocabularySourceWeb }).then((res) => {
            let list = res.data || []
            list.forEach((item: { vocabulary: string, XPath: string }) => {
                getElementByXPath(item.XPath, item.vocabulary, false, item as VocabularyType)
            })
        })
        clearTimeout(timer!)
        timer = null
    }, 1000);
}
window.addEventListener("load", () => {
    startFun()
})

if (document.readyState === 'complete') {
    console.log('readyState')
    startFun()
}
chrome.runtime.onMessage.addListener(async (message) => {
    if (message.action === "translate-collect") {
        console.log('message', message)
        const selectedText = message.text;
        const result = await chrome.storage.sync.get('bookId');
        let bookId = result.bookId as string || ""
        if (!bookId) {
            notificationFun('emptyBook')
            return
        }
        if (!selectedText.trim()) return
        let XPath = getXPath(lastElement)
        getElementByXPath(XPath, selectedText, true)
        addVocabulary({
            bookId,
            vocabulary: selectedText,
            translations: '',
            examples: '',
            vocabularySourceWeb: decodeURIComponent(location.href.toString()),
            XPath
        }).then(() => {
            notificationFun('successful')
        }).catch(() => {
            notificationFun('failure')
        })
    }
});
