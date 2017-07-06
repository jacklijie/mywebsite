<template>
    <modal>
        <div class="loading-box">
            <span v-text="text"></span>
        </div>
    </modal>
</template>
<script>
import modal from "../modal";

export default {
    name: 'loading',
    data() {
        return {};
    },
    props:['text'],
    components: {
        modal
    }
}
</script>
<style lang="scss">
@keyframes loadAnimate {
    0% {
        content: '.';
    }
    50% {
        content: '..';
    }
    100% {
        content: '...';
    }
}

.loading-box {
    align-self: center;
    font-size: 18px;
    span {
        &::after {
            content: '...';
            animation: loadAnimate linear 1s infinite;
        }
    }
}
</style>
