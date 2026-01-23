<script setup lang="ts">
import { onMounted, ref } from 'vue';

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
onMounted(async ()=>{
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }) as any;
    const { collectEnabled, collectCurrentPage } = await chrome.storage.sync.get(['collectEnabled', 'collectCurrentPage']);
    if(collectEnabled && collectCurrentPage === tab.url){
        isActive.value = true
    }
})
</script>

<template>
    <div class="flex items-center">
        <span>{{ $t('collect_words') }}</span>
        <el-switch v-model="isActive" @change="handleChange"/>
        <Info width="30px" height="30px"></Info>
    </div>
</template>
