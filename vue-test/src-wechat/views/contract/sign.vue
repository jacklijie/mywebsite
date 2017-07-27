<template>
    <div class="sign-box">
        <head-b title="开始签署">
            <span class="back" @click="goBack"></span>
        </head-b>
        <div style="padding-bottom:50px; box-sizing:border-box;margin-top:44px;">
            <section class="con">
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
            backParam: {
                type: "",
                id: ""
            },
            frameHeight: '100%'
        }
    },
    computed: {
    },
    mounted() {
        modal.valert(this, "注意：签署完成后需手动点击左上角返回上一页面");
        this.backParam = { type: this.$route.query.type, id: this.$route.query.id };
        setTimeout(() => {
            this.frameHeight = document.body.clientHeight - 44 + "px";
            this.frameUrl = "https://sdk.yunhetong.com/sdk/viewsopen/m/drag_sign.html?token=" + this.$route.query.token;
        }, 500);
    },
    methods: {
        goBack() {
            window.location.href = "detail.action?type=do&isSign=1&contractid=" + this.backParam.id;
            /* this.$router.push({
                name: "detail",
                params: { type: this.backParam.type, contractid: this.backParam.id },
                query: { isSign: "1" }
            }); */
        }
    },
    components: {
        headB
    }
}
</script>

<style lang="scss" scoped>
.sign-box {
    width: 100%;
    height: 100%;
    /* display: flex;
    flex-direction: column; */
    .con {
        // flex: 1;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 44px;
        overflow: auto;
        .img-list {
            width: 100%;
            height: 100%;
            border: none;
        }
    }
}
</style>
