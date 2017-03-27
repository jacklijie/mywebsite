var mineReady = function() {
  Q_UTILS.CONSTANTS.RD_SESSION = localStorage.getItem("q_rd_session");
  var mineApp = new Vue({
    el: ".mine-app",
    data: {
      myInfo: {}
    },
    created: function() {
      Q_UTILS.SHOW_SLOGAN();
      var req = {
        action: "CustomerRights",
        WX_flag: 5,
        rd_session: Q_UTILS.CONSTANTS.RD_SESSION,
        fromplace: "",
        shareID: ""
      };
      var self = this;
      var _form = localStorage.getItem("_form");
      if (_form != null) {
        req.fromplace = _form;
      }
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
