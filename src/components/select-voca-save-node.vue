<template>
    <div class="select-voca-save-node">
        <span class="label">{{ $t('collect_words_to') }}</span>
        <!-- <el-select @change="handleChange" v-model="bookId" :placeholder="$t('collect_words_to.ph')"
            style="width: 240px">
            <el-option v-for="item in options" :key="item.bookId" :label="item.bookName" :value="item.bookId" />
        </el-select> -->
        <el-cascader v-model="bookChapterId" :props="props" @change="handleChange" />
        <el-popover :content="$t('collect-words-to.tips')" placement="top" width="200px">
            <template #reference>
                <Info width="30px" height="30px"></Info>
            </template>
        </el-popover>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getBookList, getChapters } from '@/api/vocabulary';
import type { CascaderProps } from 'element-plus';
import type { BookType } from '@/types/vocabulary';
import Info from '@/icon/info.vue';
const bookChapterId = ref<string[]>([])

const props: CascaderProps = {
    lazy: true,
    lazyLoad(node, resolve) {
        const { level } = node
        console.log('level', level)
        if (level === 0) {
            getBookList({ page: 1, limit: 0 }).then(async (res: any) => {
                let options = res.payload || []
                const nodes = options.map((item: BookType) => ({
                    value: item.bookId,
                    label: item.bookName,
                    leaf: false,
                    level: 1
                }))
                resolve(nodes)
            }).catch((err) => {
                console.log('err', err)
                resolve([])
            })
        } else if (level === 1) {
            const parentValue = node.value as string
            getChapters({ bookId: parentValue, limit: 0, page: 1 }).then(async (res: any) => {
                let options = res.payload || []
                const nodes = options.map((item: any) => ({
                    value: item.chapterId,
                    label: item.chapterName,
                    leaf: true,
                    level: 2
                }))
                resolve(nodes)
            }).catch((err) => {
                console.log('err', err)
                resolve([])
            })
        }
    },
}
const getBookChapterId = async () => {
    const result = await chrome.storage.sync.get('bookChapterId') as object & { bookChapterId: string };
    console.log('result', result)
    const bookChapterIdData = JSON.parse(result.bookChapterId) as any[]

    bookChapterId.value = [bookChapterIdData[0], bookChapterIdData[1]]
    
}
const handleChange = (value: string[]) => {
    console.log('value', value)
    chrome.storage.sync.set({ bookChapterId: JSON.stringify(value) }, () => {
        console.log('bookChapterId saved:', value);
    });
}
onMounted(() => {
    getBookChapterId()
})

</script>

<style lang="scss">
.select-voca-save-node {
    margin-top: 5px;
    display: flex;
    align-items: center;

    .label {
        margin-right: 15px;
    }

    &::before {
        content: '*';
        color: #f00;
    }
}
</style>