<template>
    <div class="contracts-box">
        <head-b title="我的合同"></head-b>
        <div class="con">
            <div class="list-box">
                <span class="c-head" v-text="'代办合同('+(!!daiban&&!!daiban.contractSubject?1:0)+')'"></span>
                <div class="c-body" v-if="!!daiban&&!!daiban.contractSubject">
                    <div class="row head">
                        <span>合同类型</span>
                        <span>签订人</span>
                        <span>岗位类别</span>
                        <span>操作</span>
                    </div>
                    <div class="row">
                        <span v-text="daiban.contractType"></span>
                        <span v-text="daiban.psnName"></span>
                        <span v-text="daiban.positionName"></span>
                        <span>
                            <a @click="doDetail">点击开始签署</a>
                        </span>
                    </div>
                </div>
                <div class="c-body-none" v-else>
                    暂无
                </div>
            </div>
            <div class="list-box">
                <span class="c-head" v-text="'历史合同('+historyList.length+')'"></span>
                <div class="c-body" v-if="historyList.length>0">
                    <div class="row head">
                        <span>合同类型</span>
                        <span>签订人</span>
                        <span>岗位类别</span>
                        <span>操作</span>
                    </div>
                    <div class="row" v-for="his in historyList" :key="his.cloudcontractId">
                        <span v-text="his.contractType"></span>
                        <span v-text="his.psnName"></span>
                        <span v-text="his.positionName"></span>
                        <span>
                            <a @click="checkDetail(his.cloudcontractId)">查看</a>
                        </span>
                    </div>
                </div>
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
            daiban: [],
            historyList: []
        }
    },
    mounted() {
        let _this = this;
        ajax.post(link.queryContract, {
            idCard: _this.$store.state.userInfo.idCard,
            psncl: _this.$store.state.userInfo.psncl
        }).then((res) => {
            if (res.data && res.data.response && res.data.response.result) {
                if (res.data.response.result == "0") {
                    if (res.data.response.contractInfo) {
                        this.daiban = res.data.response.contractInfo;
                        _this.$store.commit("CONTRACT_STATE", {
                            daiban: res.data.response.contractInfo
                        });
                    }
                    if (res.data.response.cloudList && res.data.response.cloudList.length > 0) {
                        this.historyList = res.data.response.cloudList;
                        _this.$store.commit("CONTRACT_STATE", {
                            historyList: res.data.response.cloudList
                        })
                    }
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
    methods: {
        doDetail() {
            let _this = this;
            ajax.post(link.contractGenerateCheck, {
                idCard: _this.$store.state.userInfo.idCard,
                contractId: _this.daiban.cloudcontractId
            }).then(res => {
                if (res.data && res.data.response && res.data.response.result) {
                    if (res.data.response.result == "0") {
                        console.log(res.data.response);
                        _this.$store.commit("CONTRACT_STATE", {
                            token: res.data.response.token
                        });
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
            let _this = this;
            ajax.post(link.queryToken, {
                contractId: id
            }).then(res => {
                if (res.data && res.data.response) {
                    _this.$store.commit("CONTRACT_STATE", {
                        token: res.data.response.cloudList[0].token,
                        cloudList: res.data.response.cloudList
                    });
                    _this.$router.push("/contract/detail/undo/" + id);
                } else {
                    modal.valert(_this, res.data.message);
                }
            }).catch(err => {
                console.log(err);
                modal.valert(_this, "服务异常，请联系系统管理员");
            })
            // this.$router.push("/contract/detail/undo/" + id);
        },
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
                padding: 5px;
                .row {
                    display: flex;
                    line-height: 30px;
                    justify-content: center;
                    &.head {
                        color: #999;
                    }
                    span {
                        flex: 1;
                        a {
                            color: #33b5e6;
                            text-decoration: underline;
                        }
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
