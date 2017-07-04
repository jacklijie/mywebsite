<template>
  <div class="choosetype-box">
  
    <head-b :title="title"></head-b>
    <div class="swip-box" v-if="hastwo">
      <v-touch class="up" v-on:swipeup="toZhengshiPage">
        <div class="up-icon">向上滑动选择</div>
        <img src="../../assets/images/zheng-big.png" alt="zheng-big-icon">
        <p>正式人员合同及相关材料签署</p>
      </v-touch>
      <v-touch class="down" v-on:swipeup="toPaiqianPage">
        <img src="../../assets/images/pai-big.png" alt="pai-big-icon">
        <p>派遣人员合同及相关材料签署</p>
        <div class="down-icon">向下滑动选择</div>
      </v-touch>
    </div>
    <div class="one-box" v-else>
      <div class="row">
        <span>正式人员合同及相关材料签署</span>
      </div>
    </div>
  </div>
</template>
<script>
import headB from '../../components/head.vue'

export default {
  name: 'openType',
  data() {
    return {
      title: '合同分类',
      hastwo: false,
      isZheng: true
    }
  },
  mounted() {
    console.log("flasjdfl");
  },
  methods: {
    toZhengshiPage() {

    },
    toPaiqianPage() {

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
    }
  }
}
</style>
