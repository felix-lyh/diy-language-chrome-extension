<template>
    <div class="review-page-vocabulary">
        <el-button type="primary">{{ $t('review_vocabulary.btn') }}</el-button>
        <el-popover :content="$t('review_vocabulary.tips')" placement="top" width="200px">
            <template #reference>
                <Info width="30px" height="30px"></Info>
            </template>
        </el-popover>
    </div>
</template>

<script setup lang="ts">
import Info from '@/icon/info.vue'

</script>

<style lang="scss">
.review-page-vocabulary {
    display: flex;
    align-items: center;
    width: 80%;
    justify-content: space-between;
    .svg-icon{
        cursor: pointer;
    }
}
</style>