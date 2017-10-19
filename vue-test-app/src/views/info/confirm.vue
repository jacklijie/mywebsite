<template>
    <div class="regist-box">
    
        <headBack :title="title"></headBack>
        <div class="con">
            <span class="tip">
                *请确认补充信息
                <samp v-show="!showNotice" class="help-tip" @click="show_notice_event"></samp>
            </span>
            <div class="form-box">
                <div class="row">
                    <input type="text" v-model="uinfo.postcode" maxlength="6" placeholder="请输入邮编">
                </div>
                <div class="row">
                    <input type="text" v-model="uinfo.registAddress" placeholder="请输入户籍地址">
                </div>
                <div class="row box-foot">
                    <input type="text" v-model="uinfo.mobile" maxlength="11" placeholder="请输入手机号码">
                </div>
            </div>
            <footer>
                <button style="margin-right:10px;" @click="submit">确认</button>
            </footer>
        </div>
        <notice-m v-show="showNotice" type="2"></notice-m>
    </div>
</template>
<script>
import headBack from '../../components/head.vue';
import noticeM from '../../components/notice/notice.vue';
import ajax from "../../util/ajax";
import url from "../../util/urlService";
import link from "../../util/link";
import modal from "../../util/modal";

export default {
    name: 'confirm',
    data() {
        return {
            title: '补充信息确认',
            uinfo: {
                registAddress: "",
                postcode: "",
                mobile: ""
            }
        }
    },
    computed: {
        showNotice() {
            return this.$store.state.notice.show
        }
    },
    mounted() {
        this.uinfo.registAddress = this.$store.state.userInfo.address;
        this.uinfo.mobile = this.$store.state.userInfo.mobile;
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
            if (_this.uinfo.postcode == "" || !/^[0-9][0-9]{5}$/.test(_this.uinfo.postcode)) {
                modal.valert(_this, "邮政编码格式不正确");
                return;
            } else if (_this.uinfo.registAddress == "") {
                modal.valert(_this, "户籍地址不能为空");
                return;
            } else if (_this.uinfo.mobile == "" || !/^1[34578]\d{9}$/.test(this.uinfo.mobile)) {
                modal.valert(_this, "手机号码格式不正确");
                return;
            } else {
                modal.loading(this, true);
                ajax.post(link.supplement, {
                    idCard: _this.$store.state.userInfo.idCard,
                    cellPhone: _this.uinfo.mobile,
                    address: _this.uinfo.registAddress,
                    postalCode: _this.uinfo.postcode
                }).then((resp) => {
                    modal.loading(this, false);
                    if (resp.data && resp.data.response && resp.data.response.result) {
                        if (resp.data.response.result == "0") {
                            _this.$router.push("/opentype");
                        } else if (resp.data.response.result == "2") {
                            _this.$router.push("/opentype");
                        } else {
                            modal.valert(_this, resp.data.response.reason);
                        }
                    } else {
                        modal.valert(_this, res.data.response.reason);
                    }
                }).catch((err) => {
                    modal.loading(this, false);
                    modal.valert(_this, "补充信息接口异常，请联系系统管理员");
                })
            }
        }
    },
    components: {
        headBack, noticeM
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
                }
            }
        }
        footer {
            display: flex;
            margin-top: 40px;
            justify-content: center;
            button {
                flex: .9;
                color: #fff;
                height: 40px;
                border-radius: 5px;
                background-color: $blue;
            }
        }
    }
}
</style>

