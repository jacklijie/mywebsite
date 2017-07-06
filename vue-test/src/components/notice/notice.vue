<template>
    <modal>
        <div class="notive-box">
            <span v-text="title"></span>
            <slot>
                <p>
                    1.姓名；签署本人姓名<br>
                    2.身份证号；认真核对，如有问题，可修改<br>
                    3.邮政编码；请填写户口所在地的邮政编码<br>
                    4.户籍地址；请填写本人家庭地址<br>
                    5.手机号码；请填写本人有效的手机号码<br>
                    6.短信验证码；有效的验证码<br>
                    7.提交后无法修改
                </p>
            </slot>
            <button @click="hideAlert">收起</button>
        </div>
    </modal>
</template>
<script>
import modal from "../modal";

export default {
    name: 'notive',
    data() {
        return {};
    },
    props: ['title'],
    components: {
        modal
    },
    methods: {
        hideAlert() {
            this.$store.commit("NOTICE_STATE", {
                showNotice: false
            });
        }
    }
}
</script>
<style lang="scss">
.notive-box {
    align-self: center;
    span {
        display: block;
        text-align: left;
    }
    p{
        margin-left: 10px;
    }
    button {
        background-color: #ccc;
        border: 1px solid #ddd;
        width: 50px;
        height: 25px;
        margin-top: 20px;
    }
}
</style>
