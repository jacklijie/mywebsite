<template>
    <div class="regist-box">
    
        <headBack :title="title"></headBack>
        <div class="con">
            <span class="tip">
                *请先注册
            </span>
            <div class="form-box">
                <div class="row">
                    <input type="text" v-model="uinfo.name" placeholder="请输入姓名">
                </div>
                <div class="row">
                    <input type="text" v-model="uinfo.codeId" placeholder="请输入身份证号">
                </div>
                <div class="row">
                    <input type="text" v-model="uinfo.registAddress" placeholder="请输入户籍地址">
                </div>
                <div class="row box-foot">
                    <input type="text" v-model="uinfo.postcode" placeholder="请输入邮编">
                </div>
            </div>
            <div class="form-box">
                <div class="row">
                    <input type="text" v-model="uinfo.mobile" placeholder="请输入手机号码">
                </div>
                <div class="row box-foot">
                    <input type="text" v-model="uinfo.vcode" placeholder="请输入手机验证码">
                    <span class="btn" :class="{'disable':msg.hasSend}" v-text="msg.sendText" @click="sendMsgCode"></span>
                </div>
            </div>
            <footer>
                <button style="margin-right:10px;" @click="submit">确认</button>
                <button @click="reset">重置</button>
            </footer>
        </div>
    </div>
</template>
<script>
import headBack from '../../components/head.vue';
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
                name: "庞清秀",
                codeId: "452528197202194861",
                registAddress: "啊是科技发达；啊口角是非；",
                postcode: "643204",
                mobile: "15000334505",
                vcode: "636824"
            },
            msg: {
                sendText: "获取",
                hasSend: false,
                responseVCode: "636824"
            },
            hasRegist: true
        }
    },
    /*computed:{
        hasRegisted(){
            return this.$store.state.userInfo.hasRegisted;
        }
    },*/
    methods: {
        sendMsgCode() {
            let _this = this;
            if (_this.msg.hasSend) {
                return;
            } else if (this.uinfo.mobile == "") {
                modal.valert(_this, "手机号不能为空");
                return;
            } else if (!/^1[34578]\d{9}$/.test(this.uinfo.mobile)) {
                modal.valert(_this, "手机号码有误");
                return;
            } else {
                let timer, count = 120; _this.msg.hasSend = true;
                timer = setInterval(() => { count--; _this.msg.sendText = "获取(" + count + ")"; if (count == 0) { clearInterval(timer); _this.msg.hasSend = false; _this.msg.sendText = "获取" } }, 1000);
                ajax.post(link.sendMsg, {
                    cellPhone: _this.uinfo.mobile
                }).then(function (res) {
                    if (res.data && res.data.response && res.data.response.result) {
                        if (res.data.response.result == "0") {
                            _this.msg.responseVCode = res.data.response.randomCode;
                        } else {
                            modal.valert(_this, res.data.response.reason);
                        }
                    } else {
                        modal.valert(_this, res.message);
                    }
                }).catch(function (err) {
                    console.log(err);
                    modal.valert(_this, "服务异常，请联系系统管理员");
                })
            }
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
            } else if (_this.uinfo.postcode == "" || !/^[1-9][0-9]{5}$/.test(_this.uinfo.postcode)) {
                modal.valert(_this, "邮政编码格式不正确");
                return;
            } else if (_this.uinfo.mobile == "" || !/^1[34578]\d{9}$/.test(this.uinfo.mobile)) {
                modal.valert(_this, "手机号码格式不正确");
                return;
            } else if (_this.uinfo.vcode == "" || _this.uinfo.vcode != _this.msg.responseVCode) {
                modal.valert(_this, "手机验证码不正确");
                return;
            } else {
                if (!_this.hasRegist) {
                    ajax.post(link.cloudRegistration, {
                        psnCode: url.getUrlObj()["userId"],
                        psnName: _this.uinfo.name,
                        idCard: _this.uinfo.codeId,
                        cellPhone: _this.uinfo.mobile
                    }).then(function (res) {
                        if (res.data && res.data.response && res.data.response.result) {
                            if (res.data.response.result == "0") {
                                _this.hasRegist = true;
                            } else {
                                modal.valert(_this, res.data.response.reason);
                            }
                        }
                    }).catch(function (err) {
                        console.log(err);
                        modal.valert(_this, "注册接口异常，请联系系统管理员");
                    })
                } else {
                    ajax.post(link.supplement, {
                        idCard: _this.uinfo.codeId,
                        cellPhone: _this.uinfo.mobile,
                        address: _this.uinfo.registAddress,
                        postalCode: _this.uinfo.postcode
                    }).then(function (resp) {
                        if (resp.data && resp.data.response && resp.data.response.result) {
                            if (resp.data.response.result == "0") {
                                console.log(resp);
                            } else {
                                modal.valert(_this, resp.data.response.reason);
                            }
                        }
                    }).catch((err) => {
                        modal.valert(_this, "补充信息接口异常，请联系系统管理员");
                    })
                }
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
        headBack
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

