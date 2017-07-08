<template>
    <div class="contracts-box">
        <head-b title="我的合同"></head-b>
        <div class="con">
            <div class="list-box">
                <span class="c-head">代办合同(1)</span>
                <div class="c-body">
                    <div class="row head">
                        <span>合同类型</span>
                        <span>签订人</span>
                        <span>岗位类别</span>
                        <span>操作</span>
                    </div>
                    <div class="row">
                        <span>新签</span>
                        <span>王小明</span>
                        <span>营业员</span>
                        <span>
                            <a>点击开始签署</a>
                        </span>
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
                padding: 5px;
                .row {
                    display: flex;
                    line-height: 30px;
                    justify-content: center;
                    &.head {
                        color: #999;
                    }
                    span {
                        flex: 1;
                        a {
                            color: #33b5e6;
                            text-decoration: underline;
                        }
                    }
                }
            }
            .c-body-none {
                padding: 5px 0;
                line-height: 30px;
                font-size: 16px;
                color: #999;
            }
        }
    }
}
</style>
