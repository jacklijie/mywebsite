<template>
    <div class="contract-box">
        <head-b title="劳动合同">
            <span class="back" @click="goBack"></span>
        </head-b>
        <section class="con">
            <iframe class="img-list" :src="frameUrl"></iframe>
            <span v-if="isSign" class="sign" @click="signStart"></span>
        </section>
        <footer>
            <div class="foot-box">
                <span v-for="(item,index) in contractInfoList" :key="index" :class="{'avg':contractInfoList.length<=2}" @click="previewContract(item.cloudcontractId)" v-text="item.contractName"></span>
            </div>
        </footer>
        <modal-panel v-show="showModal">
            <p>本次合同文档有{{signTip}}，已经全部阅读并确认完毕，确认签字，签署确认后无法修改
            </p>
            <div class="buttons">
                <button @click="signOK">确认</button>
                <button @click="signCancel">取消</button>
            </div>
        </modal-panel>
    </div>
</template>
<script>
import ajax from "../../util/ajax"
import link from "../../util/link"
import modal from "../../util/modal"
import headB from "../../components/head.vue"
import modalPanel from "../../components/modal.vue"
export default {
    name: "detail",
    data() {
        return {
            contractInfoList: [],
            showModal: false,
            isSign: false,
            frameUrl: "",
            signTip: ""
        }
    },
    mounted() {
        let _this = this, params = this.$route.params, query = this.$route.query;
        if (params.type == "do") {//代办合同进入
            this.isSign = true;
            if (!!query.isSign) {
                let _this = this;
                ajax.post(link.getSign, {
                    contractId: _this.$store.state.contract.daiban.cloudcontractId
                }).then(res => {
                    if (res.data && res.data.response && res.data.response.result) {
                        if (res.data.response.result == "0") {
                            _this.isSign = false;
                        } else {
                            console.info("===debug", res.data.response.reason);
                        }
                    } else {
                        console.info("===debug", res.data.message);
                    }
                }).catch(err => {
                    console.info("===debug", "服务异常，请联系系统管理员");
                })
            }
            this.contractInfoList = this.$store.state.contract.daiban.cloudList;
        } else {//历史合同进入
            _this.contractInfoList = this.$store.state.contract.cloudList
        }
        this.contractInfoList.forEach(cli => {
            this.signTip += cli.contractName + "、";
        }, this);
        this.signTip.substring(0, this.signTip.length - 1);
        YHT.init("AppID", obj => {
            YHT.setToken(_this.$store.state.contract.token);//res.data.response.token);//重新设置token
            YHT.do(obj);//调用此方法，会继续执行上次未完成的操作
        });
        this.previewContract(this.contractInfoList[0].cloudcontractId);
    },
    methods: {
        goBack() {
            this.$router.push({ name: "mycontract" });
        },
        signStart() {
            this.showModal = true;
        },
        signOK() {
            this.showModal = false;
            let _this = this;
            ajax.post(link.getSign, {
                contractId: _this.$store.state.contract.daiban.cloudcontractId
            }).then(res => {
                if (res.data && res.data.response && res.data.response.result) {
                    if (res.data.response.result == "0") {
                        _this.isSign = false;
                        modal.valert(_this, res.data.response.reason);
                    } else if (res.data.response.result == "1") {
                        _this.$router.push({
                            name: "sign", query: {
                                type: _this.$route.params.type,
                                id: _this.$route.params.contractId,
                                token: res.data.response.token
                            }
                        });
                    } else {
                        modal.valert(_this, res.data.response.reason);
                    }
                } else {
                    modal.valert(_this, res.data.message);
                }
            }).catch(err => {
                console.log(err);
                modal.valert(_this, "服务异常，请联系系统管理员");
            })
        },
        signCancel() {
            this.showModal = false;
        },
        previewContract(contractId) {
            let backUrl = '', noticeParams = '', _this = this;
            YHT.queryContract(
                function successFun(url) {
                    _this.frameUrl = "https://sdk.yunhetong.com/sdk/contract/hView?contractId=" + contractId + "&token=" + _this.$store.state.contract.token;
                },
                function failFun(data) {
                    modal.valert(_this, data);
                },
                contractId,
                backUrl,
                noticeParams
            );
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
        overflow: auto;
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
                &.avg {
                    flex: 1;
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
