<template>
    <div class="login-box">
        <head-back title="登录">
            <span class="back" @click="goBack"></span>
        </head-back>
        <div class="con">
            <!-- <div class="flex-box-out"> -->
            <div class="flex-box">
                <div class="row">
                    <div class="label_pwd">薪酬福利密码：</div>
                    <div class="pwd">
                        <input type="password" v-model="pwd">
                    </div>
                </div>
                <div class="row">
                    <button @click="submit">验证</button>
                </div>
                <div class="row">
                    <p style="margin: 20px 10px;font-size: 14px;line-height: 1.5;color: #aaadaf;">提示：<span style="color:red;">目前仅支持签订过电子版劳动合同人员查看</span>，如有其它疑问，请邮件发至人力资源研发部。</p>
                </div>
            </div>
            <!-- </div> -->
        </div>
    </div>
</template>
<script>
import headBack from '../../components/head.vue';
import ajax from "../../util/ajax";
import url from "../../util/urlService";
import link from "../../util/link";
import modal from "../../util/modal";
import util from "../../util/util"

export default {
    name: 'home',
    data() {
        return {
            pwd: ''//上线后清空
        }
    },
    mounted() {
    },
    methods: {
        goBack() {
            util.back();
        },
        submit() {
            let _this = this;
            modal.loading(_this, true, "登录中");
            ajax.post(link.queryRecord, {
                psnCode: url.getUrlObj()["userId"],
                passWord: _this.pwd
            }).then(function (res) {
                modal.loading(_this, false);
                if (res.data && res.data.response && res.data.response.result) {
                    if (res.data.response.result == "0") {
                        if (res.data.response.contractInfo && res.data.response.contractInfo.contractState == "1" && res.data.response.complement == "Y") {
                            _this.$store.commit("CONFIRM_STATE", {
                                idCard: res.data.response.contractInfo.idCard,
                                address: res.data.response.contractInfo.address,
                                mobile: res.data.response.contractInfo.cellPhone
                            })
                            _this.$router.push("/confirm");
                        } else {
                            _this.$store.commit("IDCARD_STATE", {
                                idCard: res.data.response.contractInfo.idCard
                            })
                            _this.$router.push("/opentype");
                        }
                    } else if (res.data.response.result == "2") {
                        _this.$store.commit("IDCARD_STATE", {
                            idCard: res.data.response.contractInfo.idCard
                        })
                        _this.$router.push("/regist");
                    } else {
                        modal.valert(_this, res.data.response.reason);
                        if (res.data.response.exist == "1") {
                            setTimeout(() => {
                                util.back();
                                console.log("back")
                            }, 1000);
                        }
                    }
                } else {
                    modal.valert(_this, res.data.message);
                }
            }).catch(function (err) {
                modal.loading(_this, false);
                console.log(err);
                modal.valert(_this, "服务异常，请联系系统管理员");
            })
        }
    },
    components: { headBack }
}
</script>

<style lang="scss">
@import "../../assets/sass/common";

.login-box {
    height: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    flex-direction: column;
    -webkit-flex-direction: column;
    .con {
        width: 100%;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: block; // width: 0%;
        padding: 0 10px;
        box-sizing: border-box; // .flex-box-out {
        //     width: 100%;
        //     height: 100%;
        //     display: block;
        position: relative;
        .flex-box {
            // width: 100%;
            right: 10px;
            left: 10px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            flex-direction: column;
            -webkit-flex-direction: column;
        } // }
        .row {
            display: flex;
            width: 100%;
            box-sizing: border-box;
            font-size: 16px; // width: 100%;
            height: 50px;
            line-height: 50px;
            margin-bottom: 20px;
            .label_pwd {
                // padding-left: 15px;
                // white-space: nowrap;
                width: 112px; // display: inline-block;
            }
            .pwd {
                flex: 1;
            }
            input {
                width: 100%;
                height: 40px;
                line-height: 40px;
                margin: 5px 0;
                padding: 0 10px;
                border-radius: 5px;
                box-sizing: border-box;
            }
            button {
                width: 100%;
                color: #fff;
                font-size: 16px;
                background: $blue; // background:red;
                border-radius: 5px;
            }
        }
    }
}
</style>