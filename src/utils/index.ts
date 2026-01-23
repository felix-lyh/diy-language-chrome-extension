import i18n from '@/i18n'
// export function getI18nMessage(eleId:string, msgName:string) {
//     document.getElementById(eleId).innerHTML = chrome.i18n.getMessage(msgName);
// }


export const t = (msg: string) => {
    return i18n.global.t(msg)
}