<template>
    <div class="text-box">
        <v-touch class="touch-box" v-on:pinch="onPanStart">
            <h3 v-text="changeObj"></h3>
            <h3 v-text="changeObj1"></h3>
            <div class="img-list" :style="boxstyle">
                <span>
                    <img src="../../assets/images/download-icon.png">
                </span>
            </div>
        </v-touch>
    </div>
</template>

<script>
export default {
    data() {
        return {
            changeObj: "",
            changeObj1: "",
            boxstyle: {},
            scale: 1
        }
    }, methods: {
        onPanStart(e) {
            this.changeObj = "变：" + e.scale;
            this.changeObj1 = "变1：" + this.scale;
            let scale = this.scale * Math.pow(e.scale,1/5);
            this.boxstyle.transform = "scale(" + scale + ")";
            this.scale = scale;
        }
    }
}
</script>

<style lang="scss" scoped>
.text-box {
    .touch-box {
        width: 320px;
        height: 320px;
        background-color: #def;
        position: relative;
        h3 {
            line-height: 36px;
            font-size: 16px;
        }
        .img-list {
            position: absolute;
            left: 0;
            top: 100px;
            width: 100%; // transition: all .1s;
            span {
                font-size: 2rem;
                width: 100%;
                display: block;
                margin-bottom: 20px;
                box-shadow: 0 -1px 16px #ddd, 0 1px 16px #ddd;
                img {
                    width: 100%;
                }
            }
        }
    }
}
</style>
