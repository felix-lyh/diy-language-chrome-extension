<template>
    <svg :class="`svg-icon ${className}`" :style="{ color: color, width, height }" :width="width" :height="height"
        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4874">
        <path d="M512 0a512 512 0 0 1 512 512h-64a448 448 0 0 0-448-448V0z" fill="#5C9DF5" p-id="4875"></path>
    </svg>
</template>

<script setup lang="ts">
const props = defineProps({
    color: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: '1em',
    },
    height: {
        type: String,
        default: '1em',
    },
    className: {
        type: String,
        default: '',
    },
});

</script>