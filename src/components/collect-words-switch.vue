<template>
    <div class="collect-words">
        <span class="label">{{ $t('collect_words') }}</span>
        <el-switch v-model="isActive" @change="handleChange" />
        <el-popover :content="$t('collect-words.tips')" placement="top" width="200px">
            <template #reference>
                <Info width="30px" height="30px"></Info>
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
    width: 80%;
    justify-content: space-between;

    .label {
        margin-right: auto;
    }
    .svg-icon{
        cursor: pointer;
    }
}
</style>
