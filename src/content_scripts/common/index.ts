import type { Component } from 'vue'
import { createApp } from 'vue'
interface ShadowDocOptionsType {
    document: Document 
    eleId: string 
    component: Component;
    props?: Record<string, any>;
    styleCss?: string
    plugins?: any[]
}

export function createShadowDoc(options: ShadowDocOptionsType) {
    const { document, eleId, component, styleCss, props,plugins = [] } = options

    if (document.getElementById(eleId)) return

    const host = document.createElement('div')
    host.id = eleId

    const shadowRoot = host.attachShadow({ mode: 'open' })

    if (styleCss) {
        const style = document.createElement('style')
        style.textContent = styleCss
        shadowRoot.appendChild(style)
    }

    const appRoot = document.createElement('div')
    shadowRoot.appendChild(appRoot)
    const app = createApp(component, props)
    plugins.forEach(p => app.use(p))
    app.mount(appRoot)

    document.body.appendChild(host)
}
