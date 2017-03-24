var mineReady = function() {
  var mineApp = new Vue({
    el: ".mine-app",
    data: {
      myInfo: {}
    },
    created: function() {
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
