<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Info from '@/icon/info.vue'
const isActive = ref(true)
const handleChange = async (value:boolean) => {
    isActive.value = value
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }) as any;
    const glassCurrentPage = tab.url;
    chrome.storage.sync.set({ glassEnabled: value, glassCurrentPage });
    chrome.tabs.sendMessage(tab?.id, {
        type: 'glass',
        enabled: value
    });
}
onMounted(async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }) as any;
    const { glassEnabled, glassCurrentPage } = await chrome.storage.sync.get(['glassEnabled', 'glassCurrentPage']);
    if (glassEnabled && glassCurrentPage === tab.url) {
        isActive.value = true
    }
})
</script>

<template>
    <div class="flex items-center">
        <span>{{ $t('subtitle_masker') }}</span>
        <el-switch v-model="isActive" @change="handleChange"/>
        <Info width="30px" height="30px"></Info>
    </div>
</template>
