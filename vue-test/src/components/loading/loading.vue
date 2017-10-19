<template>
    <div class="modal-light">
        <div class="modal-bg">
            <div class="box">
                <div class="loading-box">
                    <div class="loading">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import modal from "../modal";

export default {
    name: 'loading',
    data() {
        return {};
    },
    props: ['text'],
    components: {
        modal
    }
}
</script>
<style lang="scss" scoped>
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

.modal-light {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    .modal-bg {
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, .3);
        display: flex;
        justify-content: center;
        align-items: center;
        .box {
            width: 80%;
            min-height: 150px; // background-color: #fff;
            border-radius: 5px;
            display: flex;
            justify-content: center;
        }
    }
}

.loading-box {
    align-self: center;
    font-size: 18px;
    .loading {
        width: 150px;
        height: 15px;
        margin: 0 auto; // margin-top: 100px;
        text-align: center;
    }
    .loading span {
        display: inline-block;
        width: 15px;
        height: 100%;
        margin-right: 5px;
        background: lightblue;
        animation: load 1.04s ease infinite;
    }
    .loading span:last-child {
        margin-right: 0px;
    }
    @keyframes load {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    .loading span:nth-child(1) {
        animation-delay: 0.13s;
    }
    .loading span:nth-child(2) {
        animation-delay: 0.26s;
    }
    .loading span:nth-child(3) {
        animation-delay: 0.39s;
    }
    .loading span:nth-child(4) {
        animation-delay: 0.52s;
    }
    .loading span:nth-child(5) {
        animation-delay: 0.65s;
    }
}
</style>
