
import { createApp } from 'vue'
import GlassOverlay from './components/glassOverlay.vue'
import styleCss from './style/glassOverlay.module.scss?inline'
const ID = 'diy-glass-overlay'

// when video become fullscreen 
function insertOverlayInto() {
    const fullscreenEl = document.fullscreenElement;
    if (fullscreenEl) {
        // The video has been turned on full screen 
        if (fullscreenEl.querySelector('#diy-glass-overlay')) return;
        const overlayElement = document.getElementById('diy-glass-overlay') as Node
        fullscreenEl.appendChild(overlayElement);
    }
}

async function blockerStart() {
    const { glassEnabled, glassCurrentPage } = await chrome.storage.sync.get(['glassEnabled', 'glassCurrentPage']);
    if (location.href !== glassCurrentPage) {
        return;
    }
    if (glassEnabled) {
        if (document.getElementById(ID)) return

        const host = document.createElement('div')
        host.id = ID
        const shadowRoot = host.attachShadow({ mode: 'open' })
        const style = document.createElement('style')
        style.textContent = styleCss
        shadowRoot.appendChild(style)
        const appRoot = document.createElement('div')
        shadowRoot.appendChild(appRoot)
        createApp(GlassOverlay).mount(appRoot)
        document.body.appendChild(host)
        document.addEventListener('fullscreenchange', insertOverlayInto);
    } else {
        const container = document.getElementById(ID)
        if (container) {
            container.remove()
        }
        document.removeEventListener('fullscreenchange', insertOverlayInto);
    }
}
chrome.runtime.onMessage.addListener(async (message) => {
    if (message.type !== 'glass') return;
    blockerStart()
});
// blockerStart()

