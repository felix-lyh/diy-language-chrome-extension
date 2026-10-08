<template>
    <div class="subtitle-masker">
        <span class="label">{{ $t('subtitle_masker') }}</span>
        <el-switch v-model="isActive" @change="handleChange" style="--el-switch-on-color: #1ABC9C;"/>
        <el-popover :content="$t('subtitle-masker.tips')" placement="top" width="200px">
            <template #reference>
                <Info class="info-icon" width="16px" height="16px"></Info>
            </template>
        </el-popover>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Info from '@/icon/info.vue'
const isActive = ref(false)
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

<style lang="scss">
.subtitle-masker{
    display: flex;
    align-items: center;
    width: 100%;
    gap: 8px;
    border-radius: 6px;
    padding: 4px 6px;
    margin: 0 -6px;
    transition: background-color 0.2s ease;
    &:hover{
        background-color: #f5f7fa;
    }
    .label{
        margin-right: auto;
    }
}
</style>