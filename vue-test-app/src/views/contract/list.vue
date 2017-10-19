<template>
    <div class="contracts-box">
        <head-b title="我的合同">
            <span class="back" @click="goBack"></span>
        </head-b>
        <div class="con">
            <div class="list-box">
                <span class="c-head" v-text="'待办合同('+(!!daiban&&!!daiban.contractSubject?1:0)+')'"></span>
                <div class="c-body" v-if="!!daiban&&!!daiban.contractSubject">
                    <div class="c-body-left">
                        <span v-text="daiban.contractSubject"></span>
                        <samp v-text="daiban.contractBeginDate+'~'+(daiban.contractEndDate||'无固定期限')"></samp>
                    </div>
                    <div class="c-body-right">
                        <span @click="doDetail">办理</span>
                    </div>
                </div>
                <div class="c-body-none" v-else>
                    暂无
                </div>
            </div>
            <div class="list-box">
                <span class="c-head" v-text="'历史合同('+historyList.length+')'"></span>
                <template v-if="historyList.length>0">
                    <div class="c-body" v-for="his in historyList" v-bind:key="his.cloudcontractId">
                        <div class="c-body-left">
                            <span v-text="his.contractSubject"></span>
                            <samp v-text="his.contractBeginDate+'~'+(his.contractEndDate||'无固定期限')"></samp>
                        </div>
                        <div class="c-body-right">
                            <span @click="checkDetail(his.cloudcontractId)">查看</span>
                        </div>
                    </div>
                </template>
                <div class="c-body-none" v-else>
                    暂无
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import headB from "../../components/head.vue"
import ajax from "../../util/ajax"
import link from "../../util/link"
import modal from "../../util/modal"

export default {
    name: 'mycontract',
    data() {
        return {
            daiban: this.$store.state.contract.daiban,
            historyList: this.$store.state.contract.historyList
        }
    },
    mounted() {
        if (this.$route.query.isSign) {
            let _this = this;
            modal.loading(this, true);
            ajax.post(link.queryContract, {
                idCard: sessionStorage.getItem("idcard"),
                psncl: sessionStorage.getItem("psncl") == 2 ? "正式人员" : "派遣人员"
            }).then((res) => {
                modal.loading(this, false);
                if (res.data && res.data.response && res.data.response.result) {
                    if (res.data.response.result == "0") {
                        if (!!res.data.response.contractInfo) {
                            _this.daiban = res.data.response.contractInfo;
                            _this.$store.commit("CONTRACT_STATE", {
                                daiban: res.data.response.contractInfo
                            });
                            sessionStorage.setItem("daiban", JSON.stringify(res.data.response.contractInfo));
                        }
                        if (res.data.response.cloudList && res.data.response.cloudList.length > 0) {
                            _this.historyList = res.data.response.cloudList;
                            _this.$store.commit("CONTRACT_STATE", {
                                historyList: res.data.response.cloudList
                            })
                            sessionStorage.setItem("historyList", JSON.stringify(res.data.response.cloudList));
                        }
                    } else {
                        modal.valert(_this, res.data.response.reason);
                    }
                } else {
                    modal.valert(_this, res.data.message);
                }
            }).catch((err) => {
                modal.loading(this, false);
                console.log(err);
                modal.valert(_this, "服务异常，请联系系统管理员");
            })
        } else {
            this.daiban = JSON.parse(sessionStorage.getItem("daiban"));
            this.historyList = JSON.parse(sessionStorage.getItem("historyList"));
            if (this.daiban && this.daiban.contractSubject) {
                modal.valert(this, "请务必于" + this.daiban.contractBeginDate + "前完成待办任务");
            }
        }
    },
    methods: {
        doDetail() {
            let _this = this;
            modal.loading(this, true);
            ajax.post(link.contractGenerateCheck, {
                idCard: sessionStorage.getItem("idcard"),
                contractId: _this.daiban.cloudcontractId
            }).then(res => {
                modal.loading(this, false);
                if (res.data && res.data.response && res.data.response.result) {
                    if (res.data.response.result == "0") {
                        console.log(res.data.response);
                        _this.$store.commit("CONTRACT_STATE", {
                            token: res.data.response.token
                        });
                        if (!!window.androidApi)
                            _this.$router.push("/contract/detail/do/" + _this.daiban.cloudcontractId);
                        else {
                            sessionStorage.setItem("urlStr", location.search.substr(0));
                            window.location.href = "static/detail/index.html?type=do&contractid=" + _this.daiban.cloudcontractId;
                        }
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
        checkDetail(id) {
            if (!!window.androidApi)
                this.$router.push("/contract/detail/undo/" + id);
            else {
                sessionStorage.setItem("urlStr", location.search.substr(0));
                window.location.href = "static/detail/index.html?type=undo&contractid=" + id;
            }
        },
        goBack() {
            this.$store.commit("CLEAR_DAIBAN_STATE", {});
            this.$router.push({ name: "opentype" });
        }
    },
    components: {
        headB
    }
}
</script>
<style lang="scss">
.contracts-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .con {
        flex: 1;
        overflow: auto;
        padding: 0 10px;
        .list-box {
            margin-top: 10px;
            border-radius: 5px;
            background-color: #fff;
            .c-head {
                color: #33b5e6;
                font-size: 16px;
                display: block;
                line-height: 40px;
                text-align: left;
                text-indent: 10px;
                border-bottom: 1px solid #ddd;
            }
            .c-body {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .c-body-left {
                    text-align: left;
                    padding: 10px;
                    span {
                        font-size: 16px;
                        display: block;
                    }
                    samp {
                        color: #999;
                    }
                }
                .c-body-right {
                    width: 80px;
                    margin-right: 10px;
                    span {
                        background-color: #33b5e6;
                        color: #fff;
                        font-size: 16px;
                        display: block;
                        padding: 5px 0;
                        border-radius: 8px;
                    }
                }
            }
            .c-body-none {
                padding: 5px 0;
                line-height: 30px;
                font-size: 16px;
                color: #999;
            }
        }
    }
}
</style>
