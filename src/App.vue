
<template>
    <div class="app-home">
        <div class="app-section app-section--settings">
            <SubtitleMaskerSwitch />
            <SelectVocaSaveNode ref="savePosition" />
            <Transition name="cw-fade">
                <CollectWordsSwitch v-if="hasSavePosition" />
            </Transition>
        </div>
        <div class="app-section app-section--action">
            <ReviewPageVocabulary />
        </div>
    </div>
</template>

<script setup lang="ts">
import CollectWordsSwitch from './components/collect-words-switch.vue';
import SubtitleMaskerSwitch from './components/subtitle-masker-switch.vue';
import { computed, ref } from 'vue';
import ReviewPageVocabulary from './components/review-page-vocabulary.vue';
import SelectVocaSaveNode from './components/select-voca-save-node.vue';


const savePosition = ref<any>(null)
const hasSavePosition = computed(() => savePosition.value?.bookChapterId?.length > 0)
</script>

<style lang="scss">
.app-home {
    display: flex;
    flex-direction: column;
    padding: 14px 16px 12px;

    .app-section {
        display: flex;
        flex-direction: column;
    }

    .app-section--settings {
        gap: 6px;
    }

    .app-section--action {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid #ececec;
    }

    .cw-fade-enter-active,
    .cw-fade-leave-active {
        transition: opacity 0.25s ease, transform 0.25s ease;
    }

    .cw-fade-enter-from,
    .cw-fade-leave-to {
        opacity: 0;
        transform: translateY(-4px);
    }
}
</style>