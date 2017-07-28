<template>
    <header class="app-head">
        <slot>
            <span class="back" @click="go"></span>
        </slot>
        <span class="title" v-text="title"></span>
        <span class="menu"></span>
    </header>
</template>
<script>
export default {
    mounted: function () {
    },
    data() {
        return {

        }
    },
    props: ['title'],
    computed: {
    },
    methods: {
        go() {
            history.go(-1);
        }

    }
}
</script>
<style lang="scss" scoped>
@import "../assets/sass/common";

header.app-head {
    background: $blue;
    height: 44px;
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    .back {
        background: url(../assets/images/back.png) no-repeat center;
        background-size: auto 24px;
        width: 44px;
        height: 44px;
        position: absolute;
        left: 0;
        bottom:0;
    }
    .title {
        height: 44px;
        line-height: 44px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: block;
        width: 0%;
    }
    .menu {
        width: 44px;
        height: 44px;
    }
}
</style>
