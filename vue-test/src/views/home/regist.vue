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
                    <span class="btn">获取</span>
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
    methods:{
        submit(){
            let _this = this;
            let postUrl = url.host + "/nhr/elcontract/queryRecord.action?" + url.getUrlStr();
            ajax.post(postUrl, {
                request: {
                    psnCode: url.getUrlObj()["userId"],
                    passWord: _this.pwd
                }
            }).then(function (res) {
                if (res.data && res.data.response && res.data.response.result) {
                    if (res.data.response.result == "0") {
                        _this.$router.push("/confirm");
                    } else if (res.data.response.result == "2") {
                        _this.$router.push("/regist");
                    } else {
                        alert("密码错误");
                    }
                }
            }).catch(function (err) {
                console.log(err);
                alert("服务异常，请联系系统管理员");
            })
        },
        reset(){
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

