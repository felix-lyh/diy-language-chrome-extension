import { createShadowDoc } from './common/index'
import CollectOverlay from './components/collect-overlay.vue';
import i18n from '@/i18n'
import styleCss from './style/collect-overlay.module.scss?inline'
const ID = 'diy-collect-overlay'
async function collectStart() {
    const { collectEnabled, collectCurrentPage } = await chrome.storage.sync.get(['collectEnabled', 'collectCurrentPage']);
    if (location.href !== collectCurrentPage) {
        return;
    }
    if (collectEnabled) {
        createShadowDoc({document:document,eleId:ID,component:CollectOverlay,styleCss,plugins:[i18n]})
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
collectStart()