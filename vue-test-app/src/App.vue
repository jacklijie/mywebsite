<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
    <loading v-show="showLoading" :text="loadingText"></loading>
    <valert v-show="showAlert" :text="alertText"></valert>
  </div>
</template>

<script>
import Vue from 'vue'
import home from './views/home/home.vue'
import Util from './util/util'
import Store from './assets/js/storage.js'

export default {
  name: 'app',
  data() {
    return {
      // showLoading: false
    }
  },
  computed: {
    showLoading() {
      return this.$store.state.loading.show
    },
    loadingText(){
      return this.$store.state.loading.text
    },
    showAlert() {
      return this.$store.state.valert.show
    },
    alertText(){
      return this.$store.state.valert.text
    }
  },
  mounted: function () {
    // 测试localStorage是否可用
    this.checkLocalStorageEnabled();
    // this.$on("loading", function (loadingText) {
    //   this.showLoading = true;
    //   this.$store.commit("LOADING_TEXT", { loadingText: loadingText });
    // });
    // 刷新进行路由检测跳转 
    // this.$store.commit('ROUTE_CHANGE',{activeRoute: this.activeRoute})

    // 验证是否登录
    // window.onload = function(){
    //   this.checkLogin();
    // }.bind(this)
  },
  methods: {
    checkLocalStorageEnabled() {
      if (!Store.enabled) {
        alert('您的浏览器不支持localStorage，可能会影响体验')
      }
    },
    checkLogin() {
      // if(Util.isCurrentUser()){
      //   console.log("处于登录状态");
      //   if(this.$route.name === 'login') this.$router.push({name:'movie'});
      // }else{
      //   console.log(this.$router.name);
      //   if(this.$route.name === 'regist') return;
      //   this.$router.push({name:'login'});
      // }
    },
    redirect() {
      setTimeout(function () {
        this.$router.push({ name: 'login' })
      }.bind(this), 5000)
    },
    formatTime(val) {
      var m = Math.floor(val / 60).toString();
      var s = Math.round(val % 60).toString();
      m = (m.length == 1) ? 0 + m : m;
      s = (s.length == 1) ? 0 + s : s;
      return m + ":" + s;
      // },
      // getPercent(curTime){
      //   return ((curTime / (this.audioDuration/1000)).toFixed(2)) * 100 +'%'
    }
  }
}
</script>

<style lang="scss">
@import 'assets/sass/base';

#app {
  width: 100%;
  height: 100%;
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
