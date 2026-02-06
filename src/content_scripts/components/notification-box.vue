<template>
    <div v-show="isShow" :id="styles['notification-box']">
        <h3 v-show="notificationType === 'successful'" :class="styles['successful']">{{ $t('add_vocabulary.successful') }}</h3>
        <h3 v-show="notificationType === 'failure'" :class="styles['failure']">{{ $t('add_vocabulary.failure') }}</h3>
        <span @click="isShow = false" :class="styles['cancel-icon']">
            <CancelIcon width="25px" height="25px"/>
        </span>
    </div>
</template>

<script setup lang="ts">
import CancelIcon from '@/icon/cancel-icon.vue';
import styles from '../style/notification-box.module.scss';
import { ref } from 'vue'
const props = defineProps<{
    notificationType: 'successful'| 'failure'
}>()

const isShow = ref(true)
</script>

<style lang="scss">

</style>