
<template>
    <div class="app-home">
        <SubtitleMaskerSwitch />
        <SelectVocaSaveNode :chapterId="chapterId"/>
        <CollectWordsSwitch v-if="chapterId" />
        <ReviewPageVocabulary/>
    </div>
</template>

<script setup lang="ts">
import CollectWordsSwitch from './components/collect-words-switch.vue';
import SubtitleMaskerSwitch from './components/subtitle-masker-switch.vue';
import { ref } from 'vue';
import ReviewPageVocabulary from './components/review-page-vocabulary.vue';
import SelectVocaSaveNode from './components/select-voca-save-node.vue';

const chapterId = ref('')

</script>

<style lang="scss">
.app-home {
    padding: 10px 15px;
    
}
</style>