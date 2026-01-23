chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "custom-option-collect",
        title: chrome.i18n.getMessage('custom_contextMenu_collect'),
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab:any) => {
    if (info.menuItemId === "custom-option-collect") {
        // inject a piece of code into the current page
        chrome.tabs.sendMessage(tab?.id, {
            action: "translate-collect",
            text: info.selectionText
        });
    }
});