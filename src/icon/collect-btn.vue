<template>
    <svg :class="`svg-icon ${className}`" 
    :style="{ color: color, width, height }" :width="width" :height="height" focusable="false" class="TYVfy NMm5M">
        <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"></path>
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