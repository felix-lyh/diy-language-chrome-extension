import i18n from '@/i18n'

export const t = (msg: string) => {
    return i18n.global.t(msg)
}

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

export function getElementByXPath(xpath: string, vocabulary: string) {
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
    replaceWord(element, vocabulary)
    setStyle()

}

// export function replaceWord(element: HTMLElement, vocabulary: string) {
//     const walker = document.createTreeWalker(
//         element,
//         NodeFilter.SHOW_TEXT,
//         null
//     );
//     const textNodes = [];

//     while (walker.nextNode()) {
//         textNodes.push(walker.currentNode);
//     }

//     textNodes.forEach((node: any) => {
//         if (node?.parentElement.closest(".diy-popover-word")) return;
//         if (node.nodeValue.includes(vocabulary)) {
//             const wrapper = document.createElement("span");

//             wrapper.innerHTML = node.nodeValue.replaceAll(
//                 vocabulary,
//                 `
//                     <span class="diy-popover-word">
//                         ${vocabulary}
//                         <span class="diy-popover-box">${vocabulary}</span>
//                     </span>
//                 `
//             );

//             node.replaceWith(...Array.from(wrapper.childNodes));
//         }
//     });
// }

export function replaceWord(element: HTMLElement, vocabulary: string) {
    console.log('element.innerHTML', element)
    console.log('vocabulary', vocabulary)
    element.innerHTML = element.innerHTML.replaceAll(
        vocabulary,
        `
            <span class="diy-popover-word">
                <details>
                    <summary>${vocabulary}</summary>
                    <span class="diy-popover-box"><input value="${vocabulary}"/></span>
                </details>
            </span>
        `
    );
}

function setStyle() {
    const style = document.createElement("style");
    style.textContent = `
        .diy-popover-word {
            position: relative;
            display: inline-block;
            background: #1ABC9C;
        }

        .diy-popover-word summary {
            list-style: none; /* hide the default arrow */
            cursor: pointer;
        }

        .diy-popover-word summary::-webkit-details-marker {
            display: none; /* hide arrow in Chrome/Safari */
        }

        .diy-popover-box {
            visibility: hidden;
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

        }
        .diy-popover-word .diy-popover-box {
            visibility: visible;
            opacity: 1;
            pointer-events: auto;
        }
    `;
    document.head.appendChild(style);
}

// function setStyle() {
//     const style = document.createElement("style");

//     style.textContent = `
//     .diy-popover-word {
//         position: relative;
//         cursor: pointer;
//         color: #333;
//         background: #1ABC9C;
//         padding:3px;
//         border-radius: 3px;
//     }

//     .diy-popover-box {
//         visibility: hidden;
//         position: absolute;
//         bottom: 120%;
//         left: 50%;
//         transform: translateX(-50%);
//         background: rgba(26, 188, 156, 0.8);
//         color: white;
//         padding: 6px 10px;
//         border-radius: 5px;
//         white-space: nowrap;
//     }

//     .diy-popover-word:target .diy-popover-box {
//         visibility: visible;
//     }
//     `;
//     document.head.appendChild(style);
// }

