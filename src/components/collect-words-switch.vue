<template>
    <div class="collect-words">
        <span class="label">{{ $t('collect_words') }}</span>
        <el-switch v-model="isActive" @change="handleChange" style="--el-switch-on-color: #1ABC9C;"/>
        <el-popover :content="$t('collect-words.tips')" placement="top" width="200px">
            <template #reference>
                <Info class="info-icon" width="16px" height="16px"></Info>
            </template>
        </el-popover>
    </div>
</template>


<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import Info from '@/icon/info.vue'
const isActive = ref(false)
const handleChange = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }) as any;
    const collectCurrentPage = tab.url;
    chrome.storage.sync.set({ collectEnabled: isActive.value, collectCurrentPage });
    chrome.tabs.sendMessage(tab?.id, {
        type: 'collect',
        enabled: isActive.value
    });
}
function onKeydown(e: KeyboardEvent) {
    // macOS: Command + S
    if (e.metaKey && e.key.toLowerCase() === 'z') {
        e.preventDefault() // prevent browser save dialog
        isActive.value = !isActive.value
        handleChange()
    }
}
onMounted(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }) as any;
    const { collectEnabled, collectCurrentPage } = await chrome.storage.sync.get(['collectEnabled', 'collectCurrentPage']);
    if (collectEnabled && collectCurrentPage === tab.url) {
        isActive.value = true
    }
    window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
})
</script>

<style lang="scss">
.collect-words {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
    border-radius: 6px;
    padding: 4px 6px;
    margin: 0 -6px;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #f5f7fa;
    }

    .label {
        margin-right: auto;
    }
}
</style>
