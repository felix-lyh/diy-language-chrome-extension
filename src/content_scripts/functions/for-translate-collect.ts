import { t } from '@/utils'
import type { VocabularyType } from '@/types/collect-words'
export function getXPath(element: any) {
    if (element.id) {
        return `//*[@id="${element.id}"]`;
    }

    const parts = [];

    while (element && element.nodeType === Node.ELEMENT_NODE) {
        if (element.id) {
            parts.unshift(`//*[@id="${element.id}"]`);
            break;
        }

        let index = 1;
        let sibling = element.previousElementSibling;

        while (sibling) {
            if (sibling.tagName === element.tagName) index++;
            sibling = sibling.previousElementSibling;
        }

        parts.unshift(`${element.tagName.toLowerCase()}[${index}]`);
        element = element.parentNode;
    }

    return parts.join("/");
}

export function getElementByXPath(xpath: string, vocabulary: string,isOpen:boolean,vocabularyData?:VocabularyType) {
    if (!xpath) {
        return
    }
    const element = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue as HTMLElement;
    replaceWord({...(vocabularyData || {}) , element, vocabulary,isOpen });
}

export function replaceWord({ element, vocabulary, translations = '', examples = '', isOpen = false}: { element: HTMLElement, vocabulary: string, translations?: string, examples?: string, isOpen?: boolean }) {
    console.log('vocabulary11',vocabulary)
    element.innerHTML = element.innerHTML.replaceAll(
        vocabulary,
        `
            <span class="diy-popover-word">
                <details ${isOpen ? 'open' : ''}>
                    <summary>${vocabulary}</summary>
                    <form class="diy-popover-box">
                        <input class="translations" value="${translations}" placeholder="${t('collect_words.translation_ph')}"/>
                        <input class="examples" value="${examples}" placeholder="${t('collect_words.examples_ph')}"/>
                        <button style='display: none;' type="submit">Submit</button>
                        <span style="color: #fff;font-size: 13px;"><b style="color: #ff0000;">*</b>${t('collect_words.submit')}</span>
                    </form>
                </details>
            </span>
        `
    );
    element.querySelectorAll('.diy-popover-word').forEach((box) => {
        const form = box.querySelector('.diy-popover-box');
        const details = box.querySelector('details');

        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const translations = ((e.target as HTMLFormElement).querySelector('.translations') as HTMLInputElement).value;
            const examples = ((e.target as HTMLFormElement).querySelector('.examples') as HTMLInputElement).value;
            console.log('translations', translations)
            console.log('examples', examples)
            if (details) {
                details.open = false;
            }
        });
    })
}

export function setStyle() {
    let style = document.getElementById('diy-style') as HTMLStyleElement;

    if (!style) {
        style = document.createElement('style');
        style.id = 'diy-popover-style';
        document.head.appendChild(style);
    }
    style.textContent = `
        .diy-popover-word {
            position: relative;
            display: inline-block;
            background: #1ABC9C;
            border-radius: 4px;
            padding: 2px 4px;
            color: #333;
        }
        .diy-popover-word details {
            background: #1ABC9C;
            padding:0 !important;
            margin:0 !important;
        }
        .diy-popover-word summary {
            list-style: none; /* hide the default arrow */
            cursor: pointer;
            padding:0 !important;
            margin:0 !important;
        }

        .diy-popover-word summary::-webkit-details-marker {
            display: none; /* hide arrow in Chrome/Safari */
        }

        .diy-popover-box {
            min-width: 150px;
            width:95%;
            visibility: visible;
            opacity: 0;
            position: absolute;
            bottom: 120%;
            left: 50%;
            transform: translateX(-50%);
            color: #333;
            padding: 5px 8px;
            border-radius: 6px;
            white-space: nowrap;
            z-index: 10;
            pointer-events: none;
            transition: opacity 0.2s;
            background: rgba(26, 188, 156, 0.8);
        }
        .diy-popover-box input{
            display: block;
            width: auto;
            margin-bottom: 5px;
            padding: 4px;
        }
        .diy-popover-word .diy-popover-box {
            visibility: visible;
            opacity: 1;
            pointer-events: auto;
        }
    `;
}

export function clickOutside() {
    document.addEventListener('click', (e: MouseEvent) => {
        const boxes = document.querySelectorAll('.diy-popover-word');
        boxes.forEach((box) => {
            if (!box.contains(e.target as Node)) {
                const details = box.querySelector('details');
                if (details) {
                    details.open = false;
                }
            }
        });
    });
}

