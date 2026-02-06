<template>
    <GlassOverlay :styles="styles">
        <form :id="styles['diy-collect-words-form']" autocomplete="off" @submit.prevent="onSubmit">
            <div :class="styles['diy-form-item']">
                <label :class="styles['diy-form-item-label']">{{ $t('collect_words.vocabulary') }}</label>
                <input v-model="formData.vocabulary" :class="styles['diy-input']" :placeholder="$t('common.ph')" name="vocabulary" />
            </div>
            {{ formData.vocabulary }}
            <div :class="styles['diy-form-item']">
                <label :class="styles['diy-form-item-label']">{{ $t('collect_words.translation') }}</label>
                <input v-model="formData.translations" :class="styles['diy-input']" :placeholder="$t('collect_words.translation_ph')" name="translations" />
            </div>
            <div :class="styles['diy-form-item']">
                <label :class="styles['diy-form-item-label']">{{ $t('collect_words.examples') }}</label>
                <input v-model="formData.examples" :class="styles['diy-input']" :placeholder="$t('collect_words.examples_ph')" name="examples" />
            </div>
            <div style="display: flex;justify-content: space-between;align-items: center;">
                <span :class="styles[`submit-${stateTips}`]">
                    {{ stateTips && $t(`add_vocabulary.${stateTips}`) }}
                </span>
                <button :class="styles['diy-confirm-btn']" type="submit">{{ $t('common.confirm') }}</button>
            </div>
        </form>
    </GlassOverlay>
</template>

<script setup lang="ts">
import GlassOverlay from './glassOverlay.vue';
import styles from '../style/collect-overlay.module.scss'
import { ref } from 'vue'
import type { VocabularyType } from '@/types/collect-words';
import { addVocabulary } from '@/api/vocabulary'

const formData = ref<VocabularyType>({
    vocabulary:'',
    translations:'',
    examples:''
})
const stateTips = ref('') // '' successful failure
const resetState = ()=>{
    let timer = setTimeout(() => {
        stateTips.value = ''
        clearTimeout(timer)
    }, 2000);
}
const onSubmit = () => {
    addVocabulary(formData.value).then(()=>{
        formData.value = {
            vocabulary:'',
            translations:'',
            examples:''
        }
        stateTips.value = 'successful'
        resetState()
    }).catch((err)=>{
        console.error(err)
        stateTips.value = 'failure'
        resetState()
    })

}
</script>