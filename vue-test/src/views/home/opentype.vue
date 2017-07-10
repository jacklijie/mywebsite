<template>
  <div class="choosetype-box">
  
    <head-b :title="title"></head-b>
    <div class="swip-box" :class="{'redirecting':redirecting}" v-if="hastwo">
      <v-touch class="up" v-on:swipeup="toZhengshiPage" v-on:tap="toZhengshiPage">
        <div class="up-icon">向上滑动选择</div>
        <img src="../../assets/images/zheng-big.png" alt="zheng-big-icon">
        <p>正式人员合同及相关材料签署</p>
      </v-touch>
      <v-touch class="down" v-on:swipedown="toPaiqianPage" v-on:tap="toPaiqianPage">
        <img src="../../assets/images/pai-big.png" alt="pai-big-icon">
        <p>派遣人员合同及相关材料签署</p>
        <div class="down-icon">向下滑动选择</div>
      </v-touch>
    </div>
    <div class="one-box" v-else>
      <div class="row" v-if="isZheng">
        <span>正式人员合同及相关材料签署</span>
      </div>
      <div class="row paiqian" v-else>
        <span>派遣人员合同及相关材料签署</span>
      </div>
    </div>
  </div>
</template>
<script>
import headB from '../../components/head.vue'
import ajax from "../../util/ajax"
import link from "../../util/link"
import modal from "../../util/modal"

export default {
  name: 'openType',
  data() {
    return {
      title: '合同分类',
      hastwo: false,
      redirecting: false,
      isZheng: true
    }
  },
  mounted() {
    let _this = this;
    ajax.post(link.queryContract, {
      idCard: _this.$store.state.userInfo.idCard
    }).then((res) => {
      if (res.data && res.data.response && res.data.response.result) {
        if (res.data.response.result == "0") {
          if (!!res.data.response.contractInfo) {
            _this.$store.commit("CONTRACT_STATE",{
              daiban:res.data.response.contractInfo
            })
            /*_this.daiban.cloudcontractId = res.data.response.contractInfo.cloudcontractId;
            _this.daiban.contractSubject = res.data.response.contractInfo.contractSubject;
            _this.daiban.contractBeginDate = res.data.response.contractInfo.contractBeginDate;
            _this.daiban.contractEndDate = res.data.response.contractInfo.contractEndDate;*/
          }
          // console.log(res.data.response.contractInfo);
          if (res.data.response.cloudList.length > 0) {
            _this.$store.commit("CONTRACT_STATE",{
              historyList:res.data.response.cloudList
            })
            // _this.historyList = res.data.response.cloudList;
          }
        } else {
          modal.valert(_this, res.data.response.reason);
        }
      } else {
        modal.valert(_this, res.data.message);
      }
    }).catch((err) => {
      console.log(err);
      modal.valert(_this, "服务异常，请联系系统管理员");
    })
  },
  methods: {
    toZhengshiPage() {
      console.log("toZhengshiPage");
      this.redirecting = true;
      setTimeout(() => { this.$router.push({ name: "mycontract", params: { type: "zhengshi" } }); }, 500)
    },
    toPaiqianPage() {
      console.log("toPaiqianPage");
      this.redirecting = true;
      setTimeout(() => { this.$router.push({ name: "mycontract", params: { type: "paiqian" } }); }, 500)
    }
  },
  components: {
    headB
  }
}
</script>
<style lang="scss">
@import "../../assets/sass/common";

.choosetype-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .swip-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    .up {
      flex: 1;
      background-color: $blue;
      color: #fff;
      text-align: center;
      padding: 10px 0;
      transition: transform .5s;
      .up-icon {
        background: url(../../assets/images/slide-up.png) no-repeat center top;
        background-size: 30px;
        padding-top: 35px;
        text-align: center;
        font-size: 12px; // width: 50px;
        height: 30px;
      }
    }
    .down {
      flex: 1;
      color: $blue;
      text-align: center;
      padding: 10px 0;
      transition: transform .5s;
      .down-icon {
        background: url(../../assets/images/slide-down.png) no-repeat center bottom;
        background-size: 30px;
        padding-bottom: 35px;
        text-align: center;
        font-size: 12px;
        height: 20px;
        margin-top: 20px;
      }
    }
    &.redirecting {
      .up {
        transform: translate3d(0, -100%, 0);
      }
      .down {
        transform: translate3d(0, 100%, 0);
      }
    }
    img {
      display: inline-block;
      width: 120px;
      margin-top: 20px;
    }
    p {
      margin-top: 20px;
      font-size: 16px;
    }
  }
  .one-box {
    padding: 10px;
    .row {
      height: 80px;
      background-color: #fff;
      border-radius: 5px;
      line-height: 80px;
      position: relative;
      display: flex;
      &::before {
        content: '';
        width: 60px;
        height: 60px;
        margin: 10px;
        background: url(../../assets/images/zheng.png) no-repeat center;
        background-size: 100%;
      }
      span {
        color: $blue;
        text-align: left;
        font-size: 16px;
        flex: 1;
      }
      &:after {
        content: '';
        position: absolute;
        right: 5px;
        width: 30px;
        height: 60px;
        margin: 10px 0;
        background: url(../../assets/images/slide-right.png) no-repeat center;
        background-size: 100% auto;
      }
      &.paiqian {
        &::before {
          background-image: url(../../assets/images/pai.png);
        }
      }
    }
  }
}
</style>
