<template>
    <div class="contracts-box">
        <head-b title="我的合同"></head-b>
        <div class="con">
            <div class="list-box">
                <span class="c-head">代办合同(1)</span>
                <div class="c-body">
                    <div class="c-body-left">
                        <span>上海精准德邦物流有限公司</span>
                        <samp>2015.01.01~2017.01.01</samp>
                    </div>
                    <div class="c-body-right">
                        <span>办理</span>
                    </div>
                </div>
            </div>
            <div class="list-box">
                <span class="c-head">历史合同(0)</span>
                <div class="c-body-none">
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

export default {
    name: 'mycontract',
    data() {
        return {

        }
    },
    mounted() {
        let _this = this;
        ajax.post(link.queryContract, {
            idCard: _this.$store.state.userInfo.idCard
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
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
                display: flex;
                justify-content: space-between;
                align-items: center;
                .c-body-left {
                    text-align: left;
                    padding: 10px;
                    span {
                        font-size: 16px;
                    }
                    samp {
                        color: #999;
                    }
                }
                .c-body-right {
                    width: 80px;
                    margin-right: 10px;
                    span {
                        background-color: #33b5e6;
                        color: #fff;
                        font-size: 16px;
                        display: block;
                        padding: 5px 0;
                        border-radius: 8px;
                    }
                }
            }
            .c-body-none{
                padding: 5px 0;
                line-height: 30px;
                font-size: 16px;
                color: #999;
            }
        }
    }
}
</style>
