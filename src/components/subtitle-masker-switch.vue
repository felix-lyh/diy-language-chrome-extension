<template>
    <div class="subtitle-masker">
        <span class="label">{{ $t('subtitle_masker') }}</span>
        <el-switch v-model="isActive" @change="handleChange"/>
        <el-popover :content="$t('subtitle-masker.tips')" placement="top" width="200px">
            <template #reference>
                <Info width="30px" height="30px"></Info>
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
    width: 80%;
    justify-content: space-between;
    .label{
        margin-right: auto;
    }
    .svg-icon{
        cursor: pointer;
    }
}
</style>