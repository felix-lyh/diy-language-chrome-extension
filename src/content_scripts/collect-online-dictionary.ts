import { createApp } from 'vue'
import CollectOverlay from './components/collect-overlay.vue';
import i18n from '@/i18n'
import styleCss from './style/collect-overlay.module.scss?inline'
import ElementPlus from 'element-plus'
const ID = 'diy-collect-overlay'
async function collectStart() {
    const { collectEnabled, collectCurrentPage } = await chrome.storage.sync.get(['collectEnabled', 'collectCurrentPage']);
    if (location.href !== collectCurrentPage) {
        return;
    }
    if (collectEnabled) {
        if (document.getElementById(ID)) return;
        const host = document.createElement('div')
        host.id = ID
        const shadowRoot = host.attachShadow({ mode: 'open' })
        const style = document.createElement('style')
        style.textContent = styleCss
        shadowRoot.appendChild(style)
        const appRoot = document.createElement('div')
        shadowRoot.appendChild(appRoot)
        createApp(CollectOverlay).use(ElementPlus).use(i18n).mount(appRoot)
        document.body.appendChild(host)
    } else {
        const collectBox = document.getElementById(ID);
        if (collectBox) {
            collectBox.remove();
        }
    }
}
chrome.runtime.onMessage.addListener((message) => {
    if (message.type !== 'collect') return;
    collectStart()
});