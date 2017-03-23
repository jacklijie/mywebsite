var indexReady = function() {
  Q_UTILS.CONSTANTS.RD_SESSION = localStorage.getItem("q_rd_session");
  var indexApp = new Vue({
    el: ".index-app",
    data: {
      showIndex: 0,
      fmSubList: ["test"]
    },
    created: function() {
      var req = {
        action: 'FM300Programme',
        rd_session: Q_UTILS.CONSTANTS.RD_SESSION,
        WX_flag: 5,
        fromplace: "",
        shareID: ""
      }
      var _form = localStorage.getItem("_form");
      if (_form != null) {
        request3.para = _form;
      }
      var self = this;
      console.log(this.fmSubList);
      $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify(req), function(res) {
        res = JSON.parse(res);
        if (res.result == "OK") {
          res.ProgrammeInfo.splice(0, 1);
          self.fmSubList = res.ProgrammeInfo;
          console.log(self.fmSubList);
          self.init();
        }
      })
    },
    methods: {
      init: function() {
        var self = this;
        $("body").on("swipeLeft", function() {
          self.showIndex++;
          if (self.showIndex == 3) {
            location.href = "will.html";
          }
        })
        $("body").on("swipeRight", function() {
          if (self.showIndex == 0) return;
          self.showIndex--;
        })
      }
    }
  });
};
