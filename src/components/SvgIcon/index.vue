<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconClassName" :fill="color">
            <!-- <title v-if="svgTitle">{{ svgTitle }}</title> -->
        </use>
    </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    // 添加自定义类名
    className: {
        type: String,
        default: null
    },
    // iconfont中的名字
    iconName: {
        type: String,
        required: true
    },
    // 填充颜色
    color: {
        type: String,
        default: null
    },
    // 标题提示【提示不灵敏，偶尔有提示】
    svgTitle: {
        type: String,
        default: null
    },
});

const svgClass = computed(() => {
    if (props.className) {
        return `svg-icon ${props.className}`
    } else {
        return 'svg-icon'
    }
});
const iconClassName = computed(() => {
    if (props.iconName.startsWith('icon-')) {
        return `#${props.iconName}`
    } else {
        return `#icon-${props.iconName}`
    }
});
</script>

<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    position: relative;
    fill: currentColor;
    vertical-align: -2px;
}
</style>