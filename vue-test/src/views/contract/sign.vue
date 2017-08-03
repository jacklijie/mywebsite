<template>
    <div class="sign-box">
        <head-b title="开始签署">
            <span class="back" @click="goBack"></span>
        </head-b>
        <!-- <section class="con">
                            <iframe class="img-list" :src="frameUrl"></iframe>
                        </section> -->
        <div style="padding-bottom:50px; box-sizing:border-box;" :style="{marginTop:(isIos?'64px':'44px')}">
            <section class="con" :class="{'ios-con':isIos}" :style="{'height':frameHeight}">
                <iframe class="img-list" :src="frameUrl" :style="{'height':frameHeight}"></iframe>
            </section>
        </div>
    </div>
</template>

<script>
import headB from "../../components/head.vue"
import modal from "../../util/modal"
export default {
    data() {
        return {
            frameUrl: "",
            frameHeight: "",
            backParam: {
                type: "",
                id: ""
            }
        }
    },
    computed: {
        isIos() {
            return !window.androidApi;
        }
    },
    mounted() {
        modal.valert(this, "注意：签署完成后需手动点击左上角返回上一页面");
        this.backParam = { type: this.$route.query.type, id: this.$route.query.id };
        setTimeout(() => {
            this.frameHeight = (document.body.clientHeight - (this.isIos ? 64 : 44)) + "px";
            this.frameUrl = "https://sdk.yunhetong.com/sdk/viewsopen/m/drag_sign.html?token=" + this.$route.query.token;
        }, 500);
        // this.frameUrl = "https://sdk.yunhetong.com/sdk/viewsopen/m/drag_sign.html?token=" + this.$route.query.token;
    },
    methods: {
        goBack() {
            if (this.isIos)
                window.location.href = "static/detail/index.html?type=do&isSign=1&contractid=" + this.backParam.id;
            else {
                this.$router.push({
                    name: "detail",
                    params: { type: this.backParam.type, contractid: this.backParam.id },
                    query: { isSign: "1" }
                });
            }
        }
    },
    components: {
        headB
    }
}
</script>

<style lang="scss" scoped>
/* .sign-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .con {
        flex: 1;
        overflow: auto;
        .img-list {
            width: 100%;
            height: 100%;
        }
    }
} */

.sign-box {
    width: 100%;
    height: 100%;
    .con {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 44px;
        overflow: auto;
        &.ios-con {
            top: 64px;
        }
        .img-list {
            width: 100%;
            height: 100%;
            border: none;
        }
    }
}
</style>
