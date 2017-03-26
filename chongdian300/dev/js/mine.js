var mineReady = function() {
  Q_UTILS.CONSTANTS.RD_SESSION = localStorage.getItem("q_rd_session");
  var mineApp = new Vue({
    el: ".mine-app",
    data: {
      myInfo: {}
    },
    created: function() {
      Q_UTILS.SHOW_SLOGAN();
      var myInfo = localStorage.getItem("myinfo");
      if (myInfo) {
        this.myInfo = JSON.parse(myInfo);
      }
    },
    methods: {
      back: function() {
        location.href = "index.html";
      }
    }
  })
};
