<template>
    <div class="regist-box">
    
        <headBack :title="title"></headBack>
        <div class="con">
            <span class="tip">
                *请先注册
                <samp v-show="!showNotice" class="help-tip" @click="show_notice_event"></samp>
            </span>
            <div class="form-box">
                <div class="row">
                    <input type="text" v-model="uinfo.name" placeholder="请输入姓名">
                </div>
                <div class="row">
                    <input type="text" v-model="uinfo.codeId" maxlength="18" placeholder="请输入身份证号">
                </div>
                <div class="row">
                    <input type="text" v-model="uinfo.registAddress" placeholder="请输入户籍地址">
                </div>
                <div class="row">
                    <input type="text" v-model="uinfo.postcode" maxlength="6" placeholder="请输入邮编">
                </div>
                <div class="row">
                    <input type="text" v-model="uinfo.mobile" maxlength="11" placeholder="请输入手机号码">
                </div>
                <div class="row box-foot">
                    <input type="text" v-model="uinfo.vcode" maxlength="8" placeholder="请输入短信验证码">
                    <!--<span class="btn" :class="{'disable':msg.hasSend}" v-text="msg.sendText" @click="sendMsgCode"></span>-->
                </div>
            </div>
            <footer class="footer">
                <button class="button" style="margin-right:4%;" @click="submit">确认</button>
                <button class="button" @click="reset">重置</button>
            </footer>
        </div>
        <notice-m v-show="showNotice" type="1"></notice-m>
    </div>
</template>
<script>
import headBack from '../../components/head.vue';
import noticeM from '../../components/notice/notice.vue';
import ajax from "../../util/ajax";
import url from "../../util/urlService";
import link from "../../util/link";
import modal from "../../util/modal"

export default {
    name: 'regist',
    data() {
        return {
            title: '注册',
            uinfo: {
                name: "",
                codeId: "",
                registAddress: "",
                postcode: "",
                mobile: "",
                vcode: ""
            }
        }
    },
    computed: {
        showNotice() {
            return this.$store.state.notice.show
        }
    },
    mounted() {
        this.show_notice_event();
    },
    methods: {
        show_notice_event() {
            this.$store.commit("NOTICE_STATE", {
                showNotice: true
            })
        },
        submit() {
            let _this = this;
            if (this.uinfo.name == "") {
                modal.valert(_this, "姓名不能为空");
                return;
            } else if (_this.uinfo.codeId == "" || !/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(_this.uinfo.codeId)) {
                modal.valert(_this, "身份证信息格式不正确");
                return;
            } else if (_this.uinfo.registAddress == "") {
                modal.valert(_this, "户籍地址不能为空");
                return;
            } else if (_this.uinfo.postcode == "" || !/^[0-9][0-9]{5}$/.test(_this.uinfo.postcode)) {
                modal.valert(_this, "邮政编码格式不正确");
                return;
            } else if (_this.uinfo.mobile == "" || !/^1[34578]\d{9}$/.test(this.uinfo.mobile)) {
                modal.valert(_this, "手机号码格式不正确");
                return;
            } else if (_this.uinfo.vcode == "") {
                modal.valert(_this, "验证码不能为空");
                return;
            } else {
                modal.loading(_this, true, "提交中");
                ajax.post(link.cloudRegistration, {
                    psnName: _this.uinfo.name,
                    idCard: _this.uinfo.codeId,
                    cellPhone: _this.uinfo.mobile,
                    checkCode: _this.uinfo.vcode//验证码(pc端提前生成)
                }).then(function (res) {
                    if (res.data && res.data.response && res.data.response.result) {
                        if (res.data.response.result == "0") {
                            _this.$store.commit("IDCARD_STATE", {
                                idCard: _this.uinfo.codeId
                            })
                            if (res.data.response.contractInfo) {
                                if (res.data.response.contractInfo.contractState == "2") {
                                    modal.loading(_this, false);
                                    _this.$router.push("/contract/list");
                                } else {
                                    ajax.post(link.supplement, {
                                        idCard: _this.uinfo.codeId,
                                        cellPhone: _this.uinfo.mobile,
                                        address: _this.uinfo.registAddress,
                                        postalCode: _this.uinfo.postcode
                                    }).then(function (resp) {
                                        modal.loading(_this, false);
                                        if (resp.data && resp.data.response && resp.data.response.result) {
                                            if (resp.data.response.result == "0") {
                                                console.log(resp);
                                                _this.$router.push("/contract/list");
                                            } else {
                                                modal.valert(_this, resp.data.response.reason);
                                            }
                                        } else {
                                            modal.loading(_this, false);
                                            modal.valert(_this, res.data.message);
                                        }
                                    }).catch((err) => {
                                        modal.loading(_this, false);
                                        modal.valert(_this, "补充信息接口异常，请联系系统管理员");
                                    })
                                }
                            } else {
                                modal.loading(_this, false);
                                _this.$router.push("/contract/list");
                            }
                        } else {
                            modal.loading(_this, false);
                            modal.valert(_this, res.data.response.reason);
                        }
                    } else {
                        modal.loading(_this, false);
                        modal.valert(_this, res.data.message);
                    }
                }).catch(function (err) {
                    modal.loading(_this, false);
                    modal.valert(_this, "注册接口异常，请联系系统管理员");
                })
            }
        },
        reset() {
            this.uinfo = {
                name: "",
                codeId: "",
                registAddress: "",
                postcode: "",
                mobile: "",
                vcode: ""
            };
        }
    },
    components: {
        headBack,
        noticeM
    }
}
</script>
<style lang="scss">
@import '../../assets/sass/common';
.regist-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .con {
        flex: 1;
        padding: 0 10px;
        .tip {
            line-height: 40px;
            text-align: left;
            display: block;
            &.error {
                color: red;
            }
            .help-tip {
                color: #fff;
                background-color: $blue;
                width: 24px;
                height: 24px;
                margin-top: 8px;
                border-radius: 100%;
                line-height: 30px;
                float: right;
                text-align: center;
                background: url(../../assets/images/help-icon.png);
                background-size: 100%;
            }
        }
        .form-box {
            line-height: 40px;
            background-color: #fff;
            border-radius: 5px;
            padding: 0 10px;
            margin-bottom: 15px;
            .row {
                border-bottom: 1px solid #ddd;
                display: flex;
                &.box-foot {
                    border-bottom: 0;
                }
                input {
                    flex: 1;
                    border: none;
                    height: 40px;
                    transition: padding .3s;
                    &:focus {
                        outline: $blue;
                        padding: 0 10px;
                    }
                }
                span.btn {
                    height: 30px;
                    line-height: 30px;
                    width: 80px;
                    color: #fff;
                    margin-top: 5px;
                    display: inline-block;
                    background-color: $blue;
                    border-radius: 15px;
                    &.disable {
                        background-color: #ddd;
                        color: #888;
                    }
                }
            }
        }
        .footer {
            width: 100%;
            height: 40px;
            margin-top: 40px;
            .button {
                width: 48%;
                float: left;
                color: #fff;
                height: 40px;
                line-height: 40px;
                border-radius: 5px;
                background-color: $blue;
            }
        }
    }
}
</style>

