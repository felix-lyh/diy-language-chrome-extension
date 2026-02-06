<template>
    <div :id="styles['translate-collect-popup']" draggable>
        <ul :class="styles['translate-type-tab']">
            <li :class="[styles['tab-item'], { [styles.active]: translateType === 'English' }]"
                @click="translateFun('English')">English</li>
            <li :class="[styles['tab-item'], { [styles.active]: translateType === 'Chinese' }]"
                @click="translateFun('Chinese')">简中</li>
        </ul>
        <div :class="styles['save-btn']">
            <CollectBtn @click.native="saveBtn" width="25px" height="25px"></CollectBtn>
        </div>
        <div :class="styles['selected-text']">
            {{ selectedText }}
        </div>
        <div :class="styles['translated-text']">
            <div v-show="loading" :class="styles['loading-box']">
                <Loading :class="styles['loader']" width="35px" height="35px"></Loading>
            </div>
            <div v-show="!loading">
                <div v-show="translateType === 'Chinese'">
                    {{ translatedText }}
                </div>
                <ul :class="styles['definitions']" v-show="translateType === 'English'">
                    <li :class="styles['definition-item']" v-for="(item, index) in definitions" :key="index">
                       {{ index+1 }} .{{ item }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CollectBtn from '@/icon/collect-btn.vue';
import styles from '../style/translate-collect-popup.module.scss'
import Loading from '@/icon/loading.vue';
import { onMounted, ref } from 'vue';
import { t } from '@/utils/index'

const props = defineProps<{
    selectedText: string
}>()
const translateType = ref<'English'|'Chinese'>('English')
const translatedText = ref<string>('')
const definitions = ref<Array<any>>([])
const loading = ref(true)


const getChineseTranslate = (text:string) => {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-CN&dt=t&q=${encodeURIComponent(text)}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            loading.value = false
            const translated = data?.[0]?.map((part:any) => part[0]).join("");
            translatedText.value = translated || t('translate_error')
        })
        .catch(() => {
            loading.value = false
            translatedText.value = t('translate_error')
        });
}

const getEnglishExplain = (text:string)=>{
    if(!/^[A-Za-z]+$/.test(text)){
        loading.value = false
        definitions.value = [t('translate_error.english_just_word')]
        return
    }
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            try {
                console.log('data',data)
                let meanings = data[0]?.meanings
                let definitions:any = []
                meanings.forEach((item:any)=>{
                    item.definitions.forEach((definition:any)=>{
                        definitions = [...definitions,definition.definition]
                    })
                })
                loading.value = false
                definitions.value = definitions 
            } catch (error) {
                definitions.value = [t('translate_error')]
            }
        })
        .catch(() => {
            loading.value = false
            definitions.value = [t('translate_error')]
        });
}
const translateFun = (type:'English'|'Chinese')=>{
    translateType.value = type
    let text = props.selectedText.trim()
    if(!text){
        loading.value = false
        translatedText.value = t('translate_error.no_content')
        return
    }
    if(type === 'English'){
        getEnglishExplain(text)
    }else{
        getChineseTranslate(text)
    }
}
const saveBtn = ()=>{
    location.href
    
}

onMounted(()=>{
    translateFun(translateType.value)
})
</script>