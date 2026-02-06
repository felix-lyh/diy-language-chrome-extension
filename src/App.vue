<script setup lang="ts">
import CollectWordsSwitch from './components/collect-words-switch.vue';
import SubtitleMaskerSwitch from './components/subtitle-masker-switch.vue'
</script>

<template>
    <div class="app-home">
        <SubtitleMaskerSwitch/>
        <CollectWordsSwitch/>
    </div>
</template>
<style lang="scss">
.app-home{
    padding: 10px 15px;
}
</style>