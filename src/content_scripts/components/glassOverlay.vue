<template>
    <div :class="styles.glass" :style="{ left: x + 'px', top: y + 'px' }">
        <div :class="styles.handle" @mousedown="startDrag"></div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import moduleScss from '../style/glassOverlay.module.scss'
const props = defineProps({
    styles:{
        type:Object,
        default:moduleScss
    }
})
const x = ref(100)
const y = ref(100)
let dragging = false
let offsetX = 0
let offsetY = 0

const startDrag = (e: MouseEvent) => {
    dragging = true
    offsetX = e.clientX - x.value
    offsetY = e.clientY - y.value
}

const move = (e: MouseEvent) => {
    if (!dragging) return
    x.value = e.clientX - offsetX
    y.value = e.clientY - offsetY
}

const stop = () => {
    dragging = false
}

onMounted(() => {
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', stop)
})

onBeforeUnmount(() => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', stop)
})
</script>

<!-- <style lang="scss" scoped>
.glass {
    position: fixed;
    width: 200px;
    height: 150px;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    resize: both;
    overflow: auto;
    z-index: 99999;

    .handle {
        position: absolute;
        top: 0;
        left: 0;
        z-index:100000;
        width: 100%;
        height: 20px;
        cursor: move;
        background: rgba(17, 174, 236, 0.4);
        opacity: 0;
    }

    &:hover {
        .handle {
            opacity: 1;
        }
    }
}
</style> -->
