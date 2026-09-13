
<template>
    <div class="app-home">
        <header class="app-header">
            <img class="app-logo" src="/logo.png" alt="logo" />
            <el-tooltip :content="appDescription" placement="bottom" :show-after="300">
                <span class="app-title">{{ appTitle }}</span>
            </el-tooltip>
        </header>

        <section class="feature-card">
            <SubtitleMaskerSwitch />
        </section>

        <section class="feature-card">
            <div class="collect-to">
                <span class="label">
                    {{ $t('collect_words_to') }}<span class="req-dot">*</span>
                </span>
                <el-select
                    @change="handleChange"
                    v-model="bookId"
                    :placeholder="$t('collect_words_to.ph')"
                    class="book-select"
                >
                    <el-option v-for="item in options" :key="item.bookId" :label="item.bookName" :value="item.bookId" />
                </el-select>
                <el-popover :content="$t('collect-words-to.tips')" placement="top" width="200px">
                    <template #reference>
                        <Info class="info-icon" width="16px" height="16px"></Info>
                    </template>
                </el-popover>
            </div>

            <hr v-if="bookId" class="card-divider" />

            <CollectWordsSwitch v-if="bookId" />
            <p v-else class="empty-hint">{{ $t('add_vocabulary.emptyBook') }}</p>

            <hr class="card-divider" />

            <ReviewPageVocabulary />
        </section>
    </div>
</template>

<script setup lang="ts">
import CollectWordsSwitch from './components/collect-words-switch.vue';
import SubtitleMaskerSwitch from './components/subtitle-masker-switch.vue';
import ReviewPageVocabulary from './components/review-page-vocabulary.vue';
import Info from '@/icon/info.vue';
import { onMounted, ref } from 'vue';
import { getBookList } from '@/api/book';

const bookId = ref('')
const options = ref<{ bookId: string; bookName: string }[]>([])
const appTitle = chrome.i18n.getMessage('application_title') || 'DIY Language'
const appDescription = chrome.i18n.getMessage('application_description') || appTitle

const handleChange = (value: string) => {
    chrome.storage.sync.set({ bookId: value });
}

const getBookListFun = () => {
    getBookList({ page: 1, limit: 10 }).then(async (res) => {
        options.value = res.payload || []
        const result = await chrome.storage.sync.get('bookId');
        bookId.value = result.bookId as string || '';
    })
}

onMounted(() => {
    getBookListFun()
})
</script>

<style lang="scss">
html,
body {
    min-width: 360px;
}

*:focus-visible {
    outline: 2px solid rgba($primary-color, 0.6);
    outline-offset: 2px;
    border-radius: 4px;
}

.app-home {
    width: 100%;
    padding: 12px;
    background-color: #f7f8fa;

    .app-header {
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        .app-logo {
            width: 24px;
            height: 24px;
            margin-right: 8px;
            border-radius: 6px;
            cursor: pointer;
            transition: transform 0.2s ease;

            &:hover {
                transform: scale(1.1) rotate(-4deg);
            }
        }

        .app-title {
            font-size: 15px;
            font-weight: 600;
            color: $theme-text-color;
            cursor: help;
        }
    }

    .feature-card {
        background-color: $theme-bg-color;
        border: 1px solid #eef0f3;
        border-radius: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
        padding: 12px 14px;
        margin-bottom: 12px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

        &:hover {
            border-color: rgba($primary-color, 0.4);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transform: translateY(-1px);
        }

        &:last-child {
            margin-bottom: 0;
        }
    }

    .collect-to {
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 6px;
        padding: 4px 6px;
        margin: 0 -6px;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: #f5f7fa;
        }

        .label {
            flex-shrink: 0;
        }

        .book-select {
            flex: 1;
            width: 100%;
        }

        .req-dot {
            color: #f56c6c;
            margin-left: 2px;
            display: inline-block;
            animation: dot-pulse 2.5s ease-in-out infinite;
        }
    }

    .card-divider {
        border: 0;
        border-top: 1px solid #f0f2f5;
        margin: 10px 0;
    }

    .empty-hint {
        color: #909399;
        font-size: 12px;
        line-height: 1.5;
        padding: 4px 6px;
        margin: 0 -6px;
        border-radius: 6px;
        transition: color 0.2s ease;

        &:hover {
            color: $primary-color;
        }
    }
}

// Shared info-icon affordance (global, used across child components)
.info-icon {
    flex-shrink: 0;
    cursor: pointer;
    color: #c0c4cc;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
        color: $primary-color;
        transform: scale(1.15);
    }
}

@keyframes dot-pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.45;
    }
}
</style>
