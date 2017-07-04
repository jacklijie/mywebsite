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