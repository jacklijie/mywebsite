<template>
    <div class="contract-box">
        <head-b title="劳动合同">
            <span class="back" @click="goBack"></span>
        </head-b>
        <section class="con" id="scrollObj" :class="{'ios-con':isIos,'plus':!isplus}">
            <div class="img-box" :style="frameBoxStyle">
                <iframe class="img-list" :src="frameUrl" :style="frameStyle"></iframe>
            </div>
            <span v-if="isSign" class="sign" @click="signStart"></span>
            <span v-else class="down" @click="download"></span>
            <span v-if="isplus" class="plus" @click="plus"></span>
            <span v-else class="plus-off" @click="plusOff"></span>
        </section>
        <footer>
            <div class="foot-box" :class="{'avg':contractInfoList.length<=2}">
                <span v-for="(item,index) in contractInfoList" :key="index" @click="initToken(item.cloudcontractId)" v-text="item.contractName"></span>
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
            signTip: "",
            frameStyle: {},
            frameBoxStyle:{},
            currentContractId: "",
            currentToken: "",
            scale: 1,
            isplus: true
        }
    },
    computed: {
        isIos() {
            return navigator.userAgent.indexOf('iPhone') != -1;
        }
    },
    mounted() {
        let _this = this, params = this.$route.params, query = this.$route.query;
        if (params.type == "do") {//代办合同进入
            this.isSign = true;
            this.contractInfoList = this.$store.state.contract.daiban.cloudList;
            _this.contractInfoList.forEach(cli => {
                _this.signTip += cli.contractName + "、";
            }, _this);
            _this.signTip = _this.signTip.substring(0, _this.signTip.length - 1);
            if (!!query.isSign) {
                modal.loading(this, true);
                ajax.post(link.getSign, {
                    contractId: params.contractid
                }).then(res => {
                    modal.loading(this, false);
                    if (res.data && res.data.response && res.data.response.result) {
                        if (res.data.response.result == "0") {
                            _this.isSign = false;
                            YHT.init("AppID", obj => {
                                YHT.setToken(res.data.response.token);//res.data.response.token);//重新设置token
                                YHT.do(obj);//调用此方法，会继续执行上次未完成的操作
                            });
                            _this.previewContract(_this.contractInfoList[0].cloudcontractId, res.data.response.token);
                        } else {
                            modal.valert(_this, res.data.response.reason);
                            _this.initToken(_this.contractInfoList[0].cloudcontractId);
                            // _this.isSign = false;
                            console.info("===debug", res.data.response.reason);
                        }
                    } else {
                        // _this.isSign = false;
                        console.info("===debug", res.data.message);
                    }
                }).catch(err => {
                    // _this.isSign = false;
                    modal.loading(this, false);
                    console.info("===debug", "服务异常，请联系系统管理员");
                })
            } else {
                _this.initToken(_this.contractInfoList[0].cloudcontractId);
            }
        } else {//历史合同进入
            modal.loading(this, true);
            ajax.post(link.queryToken, {
                contractId: _this.$route.params.contractid
            }).then(res => {
                modal.loading(this, false);
                if (res.data && res.data.response) {
                    _this.contractInfoList = res.data.response.cloudList;
                    _this.contractInfoList.forEach(cli => {
                        _this.signTip += cli.contractName + "、";
                    }, _this);
                    _this.signTip = _this.signTip.substring(0, _this.signTip.length - 1);
                    YHT.init("AppID", obj => {
                        YHT.setToken(res.data.response.cloudList[0].token);//res.data.response.token);//重新设置token
                        YHT.do(obj);//调用此方法，会继续执行上次未完成的操作
                    });
                    _this.previewContract(_this.contractInfoList[0].cloudcontractId, res.data.response.cloudList[0].token);
                } else {
                    modal.valert(_this, res.data.message);
                }
            }).catch(err => {
                modal.loading(this, false);
                console.log(err);
                modal.valert(_this, "服务异常，请联系系统管理员");
            })
        }
        setTimeout(() => {
            let scaleDpi = window.innerWidth / 900;
            this.frameStyle = {
                height: window.innerHeight / scaleDpi - 84 + "px"
            }
            this.frameBoxStyle = {
                height: window.innerHeight / scaleDpi - 84 + "px",
                transform: "scale(" + scaleDpi + ") translateZ(0)",
                '-webkit-transform': "scale(" + scaleDpi + ")"
            }
            // document.getElementById("scrollObj").scrollLeft = 450 - (document.body.clientWidth / 2);
        }, 500);
    },
    methods: {
        // scrollEvent(e){
        //     console.log(e.target.scrollTop);
        //     if(e.target.scrollTop>10){
        //         document.getElementById("scrollObj").scrollTop = 5;
        //     }
        //     return false;
        // },
        plus() {
            let scaleDpi = window.innerWidth / 900;
            this.frameBoxStyle = {
                height: window.innerHeight / scaleDpi - 84 + "px",
                transform: "scale(1) translateZ(0)",
                '-webkit-transform': "scale(1) translateZ(0)"
            }
            // this.frameBoxStyle.transform = "scale(1)";
            setTimeout(() => {
                this.isplus = false;
            }, 300);
        },
        plusOff() {
            let scaleDpi = window.innerWidth / 900;
            console.log("plusOff", scaleDpi);
            this.frameBoxStyle = {
                height: window.innerHeight / scaleDpi - 84 + "px",
                transform: "scale(" + scaleDpi + ") translateZ(0)",
                '-webkit-transform': "scale(" + scaleDpi + ")"
            }
            setTimeout(() => {
                document.getElementById("scrollObj").scrollTop = 0;
                document.getElementById("scrollObj").scrollLeft = 0;
                this.isplus = true;
            }, 300);
        },
        download() {
            window.open("https://sdk.yunhetong.com/sdk/contract/download?token=" + this.currentToken + "&contractId=" + this.currentContractId, "_blank");
        },
        goBack() {
            if (!this.isSign) {
                this.$store.commit("CLEAR_DAIBAN_STATE", {});
            }
            this.$router.push({ name: "mycontract" });
        },
        signStart() {
            this.showModal = true;
        },
        signOK() {
            this.showModal = false;
            let _this = this;
            modal.loading(this, true);
            ajax.post(link.getSign, {
                contractId: _this.$store.state.contract.daiban.cloudcontractId
            }).then(res => {
                modal.loading(this, false);
                if (res.data && res.data.response && res.data.response.result) {
                    if (res.data.response.result == "0") {
                        _this.isSign = false;
                        modal.valert(_this, res.data.response.reason);
                    } else if (res.data.response.result == "1") {
                        _this.$router.push({
                            name: "sign", query: {
                                type: _this.$route.params.type,
                                id: _this.$route.params.contractid,
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
                modal.loading(this, false);
                console.log(err);
                modal.valert(_this, "服务异常，请联系系统管理员");
            })
        },
        signCancel() {
            this.showModal = false;
        },
        initToken(contractId) {
            let _this = this;
            modal.loading(this, true);
            ajax.post(link.queryToken, {
                contractId: _this.$route.params.contractid
            }).then(res => {
                modal.loading(this, false);
                if (res.data && res.data.response) {
                    console.info("token", res.data.response.cloudList[0].token);
                    YHT.init("AppID", obj => {
                        YHT.setToken(res.data.response.cloudList[0].token);//res.data.response.token);//重新设置token
                        YHT.do(obj);//调用此方法，会继续执行上次未完成的操作
                    });
                    _this.previewContract(contractId, res.data.response.cloudList[0].token);
                } else {
                    modal.valert(_this, res.data.message);
                }
            }).catch(err => {
                modal.loading(this, false);
                console.log(err);
                modal.valert(_this, "服务异常，请联系系统管理员");
            })
        },
        previewContract(contractId, token) {
            let backUrl = '', noticeParams = '', _this = this;
            this.currentContractId = contractId;
            this.currentToken = token;
            YHT.queryContract(
                function successFun(url) {
                    _this.frameUrl = url;//"https://sdk.yunhetong.com/sdk/contract/hView?contractId=" + contractId + "&token=" + token;
                    YHT.setToken("");//res.data.response.token);//重新设置token
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
        overflow: hidden;
        position: relative;
        &.ios-con {
            overflow-x: hidden;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            &.plus {
                overflow-x: scroll;
                overflow-y: scroll;
            }
        }
        &.plus {
            overflow: scroll;
        }
        .img-box {
            width: 900px;
            height: 100%;
            left: 0px;
            top: 44px;
            transform-origin: left top;
        }
        .img-list {
            width: 900px;
            height: 100%;
            left: 0px;
            top: 0px;
            // transform-origin: left top;
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
            background: url(../../assets/images/edit.png) no-repeat center center;
            padding: 15px;
            background-size: 50%;
        }
        .down {
            position: fixed;
            top: 20%;
            right: 20px;
            width: 31px;
            height: 32px;
            background: url(../../assets/images/download-icon.png) no-repeat center center;
            padding: 15px;
            background-size: 50%;
        }
        .plus {
            position: fixed;
            bottom: 10%;
            right: 20px;
            width: 31px;
            height: 32px;
            background: url(../../assets/images/plus.png) no-repeat center center;
            padding: 15px;
            background-size: 50%;
        }
        .plus-off {
            position: fixed;
            bottom: 10%;
            right: 20px;
            width: 31px;
            height: 32px;
            background: url(../../assets/images/plus-off.png) no-repeat center center;
            padding: 15px;
            background-size: 50%;
        }
    }
    footer {
        width: 100%;
        height: 40px;
        overflow: auto;
        position: relative;
        -webkit-overflow-scrolling: touch;
        .foot-box {
            min-width: 100%;
            height: 40px;
            line-height: 40px;
            overflow-x: auto;
            position: relative;
            -webkit-overflow-scrolling: touch;
            white-space: nowrap;
            border-top: 1px solid #ccc;
            &.avg {
                display: flex;
                justify-content: flex-start;
                span {
                    flex: 1;
                }
            }
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
