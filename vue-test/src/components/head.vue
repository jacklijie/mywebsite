<template>
    <header class="app-head" :class="{'ios-head':isIos}">
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
        isIos(){
            return !window.androidApi;
        }
    },
    methods: {
        go() {
            console.log(this.$router.path);
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
    display: flex;
    &.ios-head{
        padding-top:20px;
    }
    .back {
        background: url(../assets/images/back.png) no-repeat center;
        background-size: auto 24px;
        width: 44px;
        height: 44px;
    }
    .title {
        flex: 1;
        height: 44px;
        line-height: 44px;
        color: #fff;
        font-size: 18px;
        text-align: center;
    }
    .menu {
        width: 44px;
        height: 44px;
    }
}
</style>
