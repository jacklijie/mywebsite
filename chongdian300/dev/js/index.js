var indexReady = function() {
  Q_UTILS.CONSTANTS.RD_SESSION = localStorage.getItem("q_rd_session");
  var indexApp = new Vue({
    el: ".index-app",
    data: {
      showIndex: 0,
      fmSubList: [],
      audioList: []
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
      $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify(req), function(res) {
        res = JSON.parse(res);
        if (res.result == "OK") {
          res.ProgrammeInfo.splice(0, 1);
          self.fmSubList = res.ProgrammeInfo;
          console.log(self.fmSubList);
          setTimeout(function() {
            self.init();
          }, 120)
        }
      })
    },
    methods: {
      init: function() {
        var self = this;
        var swiper = new Swiper('.index-app', {
          onTouchMove: function(swiper) {
            console.log(swiper.touches.diff);
            if (swiper.touches.diff <= -150 && self.showIndex == 2) {
              window.location.href = "will.html";
            }
          },
          onSlideChangeEnd: function(swiper) {
            self.showIndex = swiper.activeIndex;
            self.changeIndex();
          }
        });
      },
      changeIndex: function() {}
    }
  });
};
