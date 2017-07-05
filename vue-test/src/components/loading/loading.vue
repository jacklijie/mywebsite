<template>
  <modal>
      <div class="loading-box">
          <span>加载中。。。</span>
      </div>
  </modal>
</template>
<script>
    import modal from "../modal"

    export default {
        name: 'loading',
        data(){

        },
        components:{
            modal
        }
    }
</script>
<style lang="scss">
@keyframes loadAnimate{
    0%{
        content: '。';
    }
    50%{
        content: '。。';
    }
}
.loading-box{
    span{
        &::after{
            content: '。。。';
            animation: loadAnimate infinite;
        }
    }
}
</style>
