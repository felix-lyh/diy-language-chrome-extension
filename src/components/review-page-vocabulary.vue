<template>
    <div class="review-page-vocabulary">
        <el-button type="primary" class="review-btn">{{ $t('review_vocabulary.btn') }}</el-button>
        <el-popover :content="$t('review_vocabulary.tips')" placement="top" width="200px">
            <template #reference>
                <Info class="info-icon" width="16px" height="16px"></Info>
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
    width: 100%;
    gap: 8px;
    border-radius: 6px;
    padding: 4px 6px;
    margin: 0 -6px;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #f5f7fa;
    }

    .review-btn {
        flex: 1;
        margin-right: auto;
        transition: transform 0.12s ease, filter 0.2s ease;

        &:active {
            transform: scale(0.97);
        }

        &:hover {
            filter: brightness(1.05);
        }
    }
}
</style>
