import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from '../package.json'

export default defineManifest({
    "name": "__MSG_application_title__",
    "description": "__MSG_application_description__",
    "manifest_version": 3,
    "version": packageJson.version,
    "permissions": [
        "storage",
        "notifications",
        "scripting",
        "tabs",
        "contextMenus"
    ],
    "default_locale": "zh_TW",
    "icons": {
        "16": "logo.png",
        "32": "logo.png",
        "48": "logo.png",
        "128": "logo.png"
    },
    "action": {
        "default_icon": "logo.png",
        "default_popup": "index.html"
    },
    "content_scripts": [
        {
            "js": [
                "src/content_scripts/content-youdao.js"
            ],
            "matches": [
                "https://fanyi.youdao.com/*"
            ],
            "all_frames": true
        },
        {
            "js": [
                "src/content_scripts/content-video-key.js",
                "src/content_scripts/content-blocker.ts",
                "src/content_scripts/collect-online-dictionary.ts",
                "src/content_scripts/skip-opening-ending.js",
                "src/content_scripts/translate-collect.ts"
            ],
            "matches": [
                "<all_urls>"
            ]
        },
        // {
        //     "js": [
        //         // "src/content_scripts/translateBoard.js"
        //     ],
        //     "matches": [
        //         "<all_urls>"
        //     ]
        // }
    ],
    "background": {
        "service_worker": "src/background/index.ts",
        "type": "module"
    },
    "host_permissions": [
        "<all_urls>"
    ],
    "commands": {
        "_execute_action": {
            "suggested_key": {
                "default": "Ctrl+B",
                "mac": "Command+B"
            }
        }
    }

})
