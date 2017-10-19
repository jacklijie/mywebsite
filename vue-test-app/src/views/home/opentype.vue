<template>
  <div class="choosetype-box">
  
    <head-b :title="title">
      <span class="back" @click="goBack"></span>
    </head-b>
    <div class="swip-box" :class="{'redirecting':redirecting}" v-if="hastwo">
      <v-touch class="up" v-on:swipeup="toContractListPage('zhengshi')" v-on:tap="toContractListPage('zhengshi')">
        <div class="up-icon">向上滑动选择</div>
        <!-- <img src="../../assets/images/zheng-big.png" alt="zheng-big-icon"> -->
        <p>正式人员合同及相关材料签署</p>
      </v-touch>
      <v-touch class="down" v-on:swipedown="toContractListPage('paiqian')" v-on:tap="toContractListPage('paiqian')">
        <img src="../../assets/images/pai-big.png" alt="pai-big-icon">
        <p>非正式人员合同及相关材料签署</p>
        <div class="down-icon">向下滑动选择</div>
      </v-touch>
    </div>
    <div class="one-box" v-else>
      <div class="row" v-if="isZheng" @click="toContractListPage('zhengshi')">
        <span>正式人员合同及相关材料签署</span>
      </div>
      <div class="row paiqian" v-else @click="toContractListPage('paiqian')">
        <span>非正式人员合同及相关材料签署</span>
      </div>
    </div>
  </div>
</template>
<script>
import headB from '../../components/head.vue'
import util from "../../util/util"
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
    modal.loading(this, true);
    ajax.post(link.queryContract, {
      idCard: sessionStorage.getItem("idcard")
    }).then((res) => {
      modal.loading(this, false);
      if (res.data && res.data.response && res.data.response.result) {
        if (res.data.response.result == "0") {
          let psncl = res.data.response.psncl;
          console.log(psncl);
          if (!!psncl) {
            if (psncl == 3) {
              _this.hastwo = true;
            } else if (psncl == 1) {
              _this.isZheng = false;
            }
          }
        } else {
          modal.valert(_this, res.data.response.reason);
        }
      } else {
        modal.valert(_this, res.data.message);
      }
    }).catch((err) => {
      modal.loading(this, false);
      console.log(err);
      modal.valert(_this, "服务异常，请联系系统管理员");
    })
  },
  methods: {
    toContractListPage(type) {
      this.redirecting = true;
      let _this = this;
      modal.loading(this, true);
      ajax.post(link.queryContract, {
        idCard: sessionStorage.getItem("idcard"),
        psncl: type == "zhengshi" ? "正式人员" : "派遣人员"
      }).then((res) => {
        modal.loading(this, false);
        if (res.data && res.data.response && res.data.response.result) {
          if (res.data.response.result == "0") {
            this.$store.commit("CLEAR_DAIBAN_STATE", {});
            if (!!res.data.response.contractInfo) {
              _this.$store.commit("CONTRACT_STATE", {
                daiban: res.data.response.contractInfo
              });
              sessionStorage.setItem("daiban", JSON.stringify(res.data.response.contractInfo));
            }
            if (res.data.response.cloudList && res.data.response.cloudList.length > 0) {
              _this.$store.commit("CONTRACT_STATE", {
                historyList: res.data.response.cloudList
              })
              sessionStorage.setItem("historyList", JSON.stringify(res.data.response.cloudList));
            }
            _this.$store.commit("USER_TYPE_STATE", {
              psncl: type == "zhengshi" ? 2 : 1
            })
            sessionStorage.setItem("psncl", type == "zhengshi" ? "2" : "1");
            setTimeout(() => { this.$router.push({ name: "mycontract" }); }, 500)
          } else {
            modal.valert(_this, res.data.response.reason);
          }
        } else {
          modal.valert(_this, res.data.message);
        }
      }).catch((err) => {
        modal.loading(this, false);
        console.log(err);
        modal.valert(_this, "服务异常，请联系系统管理员");
      })
    },
    goBack() {
      util.back();
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
      position: relative;
      background: url(../../assets/images/zheng-big.png) $blue center no-repeat;
      background-size: auto 100px;
      // background-color: $blue;
      color: #fff;
      text-align: center;
      padding: 10px 0;
      transition: transform .5s;
      .up-icon {
        background: url(../../assets/images/slide-up.png) no-repeat center top;
        background-size: 30px;
        padding-top: 30px;
        text-align: center;
        font-size: 12px; // width: 50px;
        height: 30px;
      }
      p{
        position: absolute;
        width: 100%;
        bottom: 10px;
        text-align: center;
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
        padding-bottom: 25px;
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

@media (max-width:320px) {
  .choosetype-box {
    .one-box {
      .row {
        height: 70px;
        line-height: 70px;
        &::before {
          content: '';
          width: 50px;
          height: 50px;
          margin: 10px;
          background: url(../../assets/images/zheng.png) no-repeat center;
          background-size: 100%;
        }
        span {
          color: $blue;
          text-align: left;
          font-size: 14px;
          flex: 1;
        }
        &:after {
          content: '';
          position: absolute;
          right: 5px;
          width: 25px;
          height: 50px;
          margin: 10px 0;
          background: url(../../assets/images/slide-right.png) no-repeat center;
          background-size: 100% auto;
        }
      }
    }
  }
}
</style>
