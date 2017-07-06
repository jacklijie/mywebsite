var mineReady = function() {
  Q_UTILS.CONSTANTS.INIT();
  var mineApp = new Vue({
    el: ".mine-app",
    data: {
      myInfo: {}
    },
    created: function() {
      Q_UTILS.SHOW_SLOGAN();
      var req = {
        action: "CustomerRights",
        rd_session: Q_UTILS.CONSTANTS.RD_SESSION,
        WX_flag: Q_UTILS.CONSTANTS.WX_FLAG,
        fromplace: Q_UTILS.CONSTANTS.URL.FROMPLACE,
        shareID: Q_UTILS.CONSTANTS.URL.SHAREID
      };
      var self = this;
      $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify(req), function(res) {
        res = JSON.parse(res);
        if (res.result == "OK") {
          self.myInfo = res.CustomerRightsText[0];
        }
      })
    },
    methods: {
      back: function() {
        location.href = "index.html";
      }
    }
  })
};
