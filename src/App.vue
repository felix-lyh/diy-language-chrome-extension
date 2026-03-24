
<template>
    <div class="app-home">
        <SubtitleMaskerSwitch />
        <div class="collect-words-to">
            <span class="label">{{ $t('collect_words_to') }}</span>
            <el-select @change="handleChange" v-model="bookId" :placeholder="$t('collect_words_to.ph')" style="width: 240px">
                <el-option v-for="item in options" :key="item.bookId" :label="item.bookName" :value="item.bookId" />
            </el-select>
            <el-popover :content="$t('collect-words-to.tips')" placement="top" width="200px">
                <template #reference>
                    <Info width="30px" height="30px"></Info>
                </template>
            </el-popover>
        </div>
        <CollectWordsSwitch v-if="bookId" />
        <ReviewPageVocabulary/>
    </div>
</template>

<script setup lang="ts">
import CollectWordsSwitch from './components/collect-words-switch.vue';
import SubtitleMaskerSwitch from './components/subtitle-masker-switch.vue';
import Info from '@/icon/info.vue';
import { onMounted, ref } from 'vue';
import { getBookList } from '@/api/book';
import ReviewPageVocabulary from './components/review-page-vocabulary.vue';

const bookId = ref('')
const options = ref<{bookId:string;bookName:string}[]>([])

const handleChange = (value:string)=>{
    chrome.storage.sync.set({ bookId: value });
}

const getBookListFun = ()=>{
    getBookList({page:1,limit:10}).then(async (res)=>{
        options.value = res.data || []
        const result = await chrome.storage.sync.get('bookId');
        bookId.value = result.bookId as string || '';
    })
}

onMounted(()=>{
    getBookListFun()
})
</script>

<style lang="scss">
.app-home {
    padding: 10px 15px;
    .collect-words-to{
        margin-top: 5px;
        display: flex;
        align-items: center;
        .label{
            margin-right: 15px;
        }
        &::before{
            content: '*';
            color: #f00;
        }
    }
}
</style>