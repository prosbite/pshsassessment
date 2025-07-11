<template>
    <div class="box z-[999]">
        <div class="ribbon" :class="`before:border-${ribbonColor}-600 ribbon-${props.position}`">
            <span :class="`bg-green-500`">{{ ucWords(props.status) }}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ucWords } from '@/composables/questions'
const props = defineProps({
    position: {
        type: String,
        default: "top-left"
    },
    status: {
        type: String,
        default: "pending"
    },
    type: {
        type: String,
        default: "error"
    }
})
const ribbonColor = computed(() => {
    const colors = {
        info: "blue",
        warning: "yellow",
        success: "green",
        error: "red",
        pending: "gray",
        void: "purple"
    }
    return colors[props.type]
})
</script>

<style scoped>
    .ribbon {
        z-index: 100;
        width: 150px;
        height: 150px;
        overflow: hidden;
        position: absolute;
    }
    .ribbon::before,
    .ribbon::after {
        position: absolute;
        z-index: -1;
        content: '';
        display: block;
        border: 5px solid #777;
    }
    .ribbon span {
        position: absolute;
        display: block;
        width: 225px;
        padding: 15px 0;
        box-shadow: 0 5px 10px rgba(0,0,0,.1);
        color: #fff;
        font: 700 18px/1 'Lato', sans-serif;
        text-shadow: 0 1px 1px rgba(0,0,0,.2);
        text-transform: uppercase;
        text-align: center;
    }

    /* top left*/
    .ribbon-top-left {
        top: -10px;
        left: -10px;
    }
    .ribbon-top-left::before,
    .ribbon-top-left::after {
        border-top-color: transparent;
        border-left-color: transparent;
    }
    .ribbon-top-left::before {
        top: 0;
        right: 0;
    }
    .ribbon-top-left::after {
        bottom: 0;
        left: 0;
    }
    .ribbon-top-left span {
        right: -25px;
        top: 30px;
        transform: rotate(-45deg);
    }

    /* top right*/
    .ribbon-top-right {
        top: -10px;
        right: -10px;
    }
    .ribbon-top-right::before,
    .ribbon-top-right::after {
        border-top-color: transparent;
        border-right-color: transparent;
    }
    .ribbon-top-right::before {
        top: 0;
        left: 0;
    }
    .ribbon-top-right::after {
        bottom: 0;
        right: 0;
    }
    .ribbon-top-right span {
        left: -25px;
        top: 30px;
        transform: rotate(45deg);
    }

    /* bottom left*/
    .ribbon-bottom-left {
        bottom: -10px;
        left: -10px;
    }
    .ribbon-bottom-left::before,
    .ribbon-bottom-left::after {
        border-bottom-color: transparent;
        border-left-color: transparent;
    }
    .ribbon-bottom-left::before {
        bottom: 0;
        right: 0;
    }
    .ribbon-bottom-left::after {
        top: 0;
        left: 0;
    }
    .ribbon-bottom-left span {
        right: -25px;
        bottom: 30px;
        transform: rotate(225deg);
    }

    /* bottom right*/
    .ribbon-bottom-right {
        bottom: -10px;
        right: -10px;
    }
    .ribbon-bottom-right::before,
    .ribbon-bottom-right::after {
        border-bottom-color: transparent;
        border-right-color: transparent;
    }
    .ribbon-bottom-right::before {
        bottom: 0;
        left: 0;
    }
    .ribbon-bottom-right::after {
        top: 0;
        right: 0;
    }
    .ribbon-bottom-right span {
        left: -25px;
        bottom: 30px;
        transform: rotate(-225deg);
    }
</style>
