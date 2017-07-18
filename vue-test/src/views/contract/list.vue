<template>
    <div class="contracts-box">
        <head-b title="我的合同"></head-b>
        <div class="con">
            <div class="list-box">
                <span class="c-head" v-text="'代办合同('+(!!daiban&&!!daiban.contractSubject?1:0)+')'"></span>
                <div class="c-body" v-if="!!daiban&&!!daiban.contractSubject">
                    <div class="c-body-left">
                        <span v-text="daiban.contractSubject"></span>
                        <samp v-text="daiban.contractBeginDate+'~'+daiban.contractEndDate"></samp>
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
                            <samp v-text="his.contractBeginDate+'~'+his.contractEndDate"></samp>
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
            daiban: this.$store.state.contract.daiban /* {
                cloudcontractId: '',
                contractSubject: '',
                contractBeginDate: '',
                contractEndDate: ''
            } */,
            historyList: this.$store.state.contract.historyList
        }
    },
    mounted() {
        /* let _this = this;
        ajax.post(link.queryContract, {
            idCard: _this.$store.state.userInfo.idCard
        }).then((res) => {
            if (res.data && res.data.response && res.data.response.result) {
                if (res.data.response.result == "0") {
                    if (!!res.data.response.contractInfo) {
                        _this.daiban.cloudcontractId = res.data.response.contractInfo.cloudcontractId;
                        _this.daiban.contractSubject = res.data.response.contractInfo.contractSubject;
                        _this.daiban.contractBeginDate = res.data.response.contractInfo.contractBeginDate;
                        _this.daiban.contractEndDate = res.data.response.contractInfo.contractEndDate;
                    }
                    // console.log(res.data.response.contractInfo);
                    if (res.data.response.cloudList.length > 0) {
                        _this.historyList = res.data.response.cloudList;
                    }
                } else {
                    modal.valert(_this, res.data.response.reason);
                }
            } else {
                modal.valert(_this, res.data.message);
            }
        }).catch((err) => {
            console.log(err);
            modal.valert(_this, "服务异常，请联系系统管理员");
        }) */
    },
    methods: {
        doDetail() {
            let _this = this;
            ajax.post(link.contractGenerateCheck, {
                contractId: _this.daiban.cloudcontractId
            }).then(res => {
                if (res.data && res.data.response && res.data.response.result) {
                    if (res.data.response.result == "0") {
                        console.log(res.data.response);
                        _this.$router.push("/contract/detail/do/" + _this.daiban.cloudcontractId);
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
        checkDetail(id) {
            _this.$router.push("/contract/detail/undo/" + id);
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
