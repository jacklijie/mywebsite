<template>
    <div class="contract-box">
        <head-b title="劳动合同"></head-b>
        <section class="con">
            <div class="img-list">
                <img src="../../assets/images/zheng-big.png">
            </div>
            <span class="sign" @click="signStart"></span>
        </section>
        <footer>
            <div class="foot-box">
                <span>劳动合同</span>
                <span>员工借调单</span>
                <span>变更劳动合同协议书</span>
                <span>变更劳动合同协议书</span>
                <span>变更劳动合同协议书</span>
            </div>
        </footer>
        <modal-panel v-show="showModal">
            <p>本次合同文档有劳动合同、员工借调蛋，已经全部阅读并确认完毕，确认签字，签署确认后无法修改
            </p>
            <div class="buttons">
                <button @click="signOK">确认</button>
                <button @click="signCancel">取消</button>
            </div>
        </modal-panel>
    </div>
</template>
<script>
import headB from "../../components/head.vue"
import modalPanel from "../../components/modal.vue"
export default {
    name: "detail",
    data() {
        return {
            contractList: [],
            showModal: false
        }
    },
    mounted() {

    },
    methods: {
        signStart() {
            this.showModal = true;
        },
        signOK() {

        },
        signCancel() {
            this.showModal = false;
        },
        checkContract() {

        }
    },
    components: {
        headB,
        modalPanel
    }
}
</script>
<style lang="scss">
.contract-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .con {
        flex: 1;
        .img-list {
            width: 100%;
            height: 100%;
            img {
                width: 100%;
            }
        }
        .sign {
            position: fixed;
            top: 20%;
            right: 20px;
            width: 31px;
            height: 32px;
            background: url(../../assets/images/edit.png) no-repeat;
            background-size: 100%;
        }
    }
    footer {
        width: 100%;
        overflow: auto;
        .foot-box {
            min-width: 100%;
            height: 40px;
            line-height: 40px;
            overflow-x: auto;
            display: flex;
            justify-content: space-around;
            border-top: 1px solid #ccc;
            span {
                display: inline-block;
                padding: 0 10px;
                height: 40px;
                white-space: nowrap;
                border-right: 1px solid #ccc;
                box-sizing: border-box;
                &:last-of-type {
                    border-right: none;
                }
            }
        }
    }
    .modal .modal-bg .box {
        flex-direction: column;
        p {
            margin: 10px;
        }
        .buttons {
            display: flex;
            justify-content: space-around;
            button {
                padding: 5px 10px;
            }
        }
    }
}
</style>
