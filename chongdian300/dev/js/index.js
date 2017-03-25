var indexReady = function() {
  Q_UTILS.CONSTANTS.RD_SESSION = localStorage.getItem("q_rd_session");
  var indexApp = new Vue({
    el: ".index-app",
    data: {
      oldIndex: 0,
      showIndex: 0,
      fmSubList: [],
      audioList: [],
      curBar: {
        sx: 0,
        mx: 0
      },
      dragging: false
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
        req.fromplace = _form;
      }
      var self = this;
      $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify(req), function(res) {
        res = JSON.parse(res);
        if (res.result == "OK") {
          res.ProgrammeInfo.splice(0, 1);
          self.fmSubList = res.ProgrammeInfo;
          localStorage.setItem("myinfo", JSON.stringify(res.CustomerRightsText[0]));
          localStorage.setItem("Payment", JSON.stringify(res.Payment));
          self.init();
          setTimeout(function() {
            self.initSwiper();
          }, 120)
        }
      })
    },
    methods: {
      init: function() {
        var self = this;
        for (var i = 0; i < self.fmSubList.length; i++) {
          var audio = document.createElement("audio");
          audio.src = self.fmSubList[i].Url;
          audio.preload = "load";
          audio.addEventListener("timeupdate", function() {
            if (!self.dragging)
              self.audioList[self.showIndex].progress = ((215 / this.duration) * this.currentTime).toFixed(2);
          });
          audio.addEventListener("ended", function() {
            self.audioList[self.showIndex].progress = 0;
            self.audioList[self.showIndex].status = "pause";
          });
          (function(a) {
            audio.addEventListener("canplay", function() {
              self.audioList[a].progress = 1;
            })
          })(i)
          self.audioList.push({
            obj: audio,
            status: "pause",
            progress: 0
          });
        }
      },
      initSwiper: function() {
        var self = this;
        var swiper = new Swiper('.index-app', {
          onTouchEnd: function(swiper, event) {
            self.oldIndex = swiper.activeIndex;
          },
          onTouchMove: function(swiper, evt) {
            if (swiper.touches.diff <= -150 && self.showIndex == 2) {
              window.location.href = "will.html";
            }
          },
          onSlideChangeStart: function(swiper) {
            self.dragging = true;
          },
          onSlideChangeEnd: function(swiper) {
            self.showIndex = swiper.activeIndex;
            self.changeIndex();
          }
        });
      },
      changeIndex: function() {
        var self = this;
        this.audioList[this.oldIndex].obj.pause();
        this.audioList[this.oldIndex].status = "pause";
        setTimeout(function() {
          self.dragging = false;
        }, 10)
      },
      playClick: function() {
        var audio = this.audioList[this.showIndex];
        if (audio.obj.paused) {
          audio.status = "play";
          audio.obj.play();
        } else {
          audio.status = "pause";
          audio.obj.pause();
        }
      },
      barTouchStart: function(evt) {
        var t = evt.touches[0];
        this.curBar.sx = t.pageX;
        this.curBar.mx = t.pageX;
        this.dragging = true;
      },
      barTouchMove: function(evt) {
        var t = evt.touches[0];
        var move = parseFloat(this.audioList[this.showIndex].progress) + (t.pageX - this.curBar.mx);
        this.curBar.mx = t.pageX;
        if (move > 0 && move < 215)
          this.audioList[this.showIndex].progress = move;
      },
      barTouchEnd: function() {
        this.audioList[this.showIndex].obj.currentTime = this.audioList[this.showIndex].progress / 215 * this.audioList[this.showIndex].obj.duration;
        this.dragging = false;
      },
      progresClick: function(evt) {
        var t = evt.target;
        if (t.nodeName == "DIV" || t.className == "had") {
          this.audioList[this.showIndex].obj.currentTime = evt.offsetX / 215 * this.audioList[this.showIndex].obj.duration;
        }
      },
      likeClick: function() {
        if (this.fmSubList[this.showIndex].PraiseValue != 'Y') {
          var req = {
            action: 'FM300SavePraise',
            rd_session: Q_UTILS.CONSTANTS.RD_SESSION,
            WX_flag: 5,
            fromplace: "",
            shareID: "",
            para: this.fmSubList[this.showIndex].ProgrammeID
          }
          var _form = localStorage.getItem("_form");
          if (_form != null) {
            req.fromplace = _form;
          }
          var self = this;
          $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify(req), function(res) {
            res = JSON.parse(res);
            if (res.result == "OK") {
              self.fmSubList[self.showIndex].PraiseValue = "Y";
            }
          })
        }
      }
    },
    filters: {
      timer: function(data) {
        if (!data.progress) return "00:00";
        var minute = "",
          second = "";
        var template = data.obj.duration - data.obj.duration * (data.progress / 215);
        minute = Math.floor(template / 60);
        second = (template % 60).toFixed(0);
        return (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second);
      }
    }
  });
};
