<template>
    <div class="regist-box">
    
        <headBack :title="title"></headBack>
        <div class="con">
            <span class="tip">
                *请先注册
            </span>
            <div class="form-box">
                <div class="row">
                    <input type="text" v-model="uinfo.name" :disabled="!isEdit" placeholder="请输入姓名">
                </div>
                <div class="row">
                    <input type="text" v-model="uinfo.codeId" :disabled="!isEdit" placeholder="请输入身份证号">
                </div>
                <div class="row">
                    <input type="text" v-model="uinfo.registAddress" :disabled="!isEdit" placeholder="请输入户籍地址">
                </div>
                <div class="row box-foot">
                    <input type="text" v-model="uinfo.postcode" :disabled="!isEdit" placeholder="请输入邮编">
                </div>
            </div>
            <div class="form-box">
                <div class="row">
                    <input type="text" v-model="uinfo.mobile" :disabled="!isEdit" placeholder="请输入手机号码">
                </div>
                <div class="row box-foot" v-show="isEdit">
                    <input type="text" v-model="uinfo.vcode" placeholder="请输入手机验证码">
                    <span class="btn">获取</span>
                </div>
            </div>
            <footer v-show="!isEdit">
                <button style="margin-right:10px;">确认</button>
                <button>编辑</button>
            </footer>
            <footer v-show="isEdit">
                <button style="margin-right:10px;">提交</button>
                <button>取消</button>
            </footer>
        </div>
    </div>
</template>
<script>
import headBack from '../../components/head.vue';
import ajax from "../../util/ajax";
import url from "../../util/urlService";

export default {
    name: 'confirm',
    data() {
        return {
            title: '注册确认',
            uinfo: {
                name: "",
                codeId: "",
                registAddress: "",
                postcode: "",
                mobile: "",
                vcode: ""
            },
            isEdit: false
        }
    },
    mounted() {

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

