<template>
    <div class="login-box">
        <div class="con">
            <div class="row" style="padding: 0 15px;">
                <label>薪酬福利密码：</label>
                <input type="password" v-model="pwd">
            </div>
            <div class="row">
                <button @click="submit">验证</button>
            </div>
        </div>
    </div>
</template>
<script>
import ajax from "../../util/ajax";
import url from "../../util/urlService";
import link from "../../util/link";
import modal from "../../util/modal";
import util from "../../util/util"

export default {
    name: 'home',
    data() {
        return {
            pwd: 'qqqqqq'//上线后清空
        }
    },
    mounted() {
    },
    methods: {
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
    }
}
</script>

<style lang="scss">
@import "../../assets/sass/common";

.login-box {
    height: 100%;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .con {
        width: 100%;
        height: auto;
        .row {
            display: flex;
            font-size: 16px; // width: 100%;
            height: 50px;
            line-height: 50px;
            margin-bottom: 20px;
            label {
                // padding-left: 15px;
                white-space: nowrap;
            }
            input {
                flex: 1;
                height: 40px;
                line-height: 40px;
                margin: 5px 0;
                padding: 0 10px;
                border-radius: 5px;
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