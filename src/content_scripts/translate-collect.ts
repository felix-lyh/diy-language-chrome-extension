// import TranslateCollectPopup from './components/translate-collect-popup.vue';
import i18n from '@/i18n'
// import styleCss from './style/translate-collect-popup.module.scss?inline';
import { createShadowDoc } from './common/index'
// const ID = 'diy-translate-collect'
import NotificationBox from './components/notification-box.vue'
import NBstyleCss from './style/notification-box.module.scss?inline'
import { addVocabulary } from '@/api/vocabulary'

const NBID = 'diy-notification-box'
let timer: ReturnType<typeof setTimeout>|null = null
const notificationFun = (type:'successful'|'failure') => {
    if(timer){
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
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "translate-collect") {
        const selectedText = message.text;
        if (!selectedText.trim()) return
        addVocabulary({
            vocabulary: selectedText,
            translations: '',
            examples: '',
            vocabularySourceWeb:location.href
        }).then(() => {
            notificationFun('successful')
        }).catch(() => {
            notificationFun('failure')
        })
        //TODO now,there is not free translate api 
        // createShadowDoc({ 
        //     document: document, 
        //     eleId: ID, 
        //     component: TranslateCollectPopup, 
        //     props: {
        //         selectedText
        //     },
        //     styleCss, 
        //     plugins: [i18n] 
        // })
        // function handleOutsideClick(event: any) {
        //     const popupEl = document.getElementById(ID);
        //     if (popupEl && !popupEl.contains(event.target)) {
        //         popupEl.remove();
        //         document.removeEventListener("click", handleOutsideClick); // 清除事件監聽器
        //     }
        // }
        // // Add the event a little later to avoid triggering the close event immediately upon clicking
        // setTimeout(() => {
        //     // document.addEventListener("click", handleOutsideClick);
        // }, 0);
    }
});
