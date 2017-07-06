var indexReady = function() {
  var indexApp = new Vue({
    el: "#index-app",
    data: {
      oldIndex: 0,
      showIndex: 0,
      listenRecordMax: 0,
      fmSubList: [],
      ISAccount: "N",
      curBar: {
        sx: 0,
        mx: 0
      },
      dragging: false,
      curState: "pause"
    },
    created: function() {
      var req = {
        action: 'FM300Programme',
        rd_session: Q_UTILS.CONSTANTS.RD_SESSION,
        WX_flag: Q_UTILS.CONSTANTS.WX_FLAG,
        fromplace: Q_UTILS.CONSTANTS.URL.FROMPLACE,
        shareID: Q_UTILS.CONSTANTS.URL.SHAREID
      }
      var self = this;
      var initIndex = localStorage.getItem("listenHistoryIndex");
      var listenMax = localStorage.getItem("listenRecordMax");
      if (initIndex) {
        self.showIndex = parseInt(initIndex);
      } else {
        localStorage.setItem("listenHistoryIndex", 0);
      }
      if (listenMax) {
        self.listenRecordMax = listenMax;
      }
      $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify(req), function(res) {
        res = JSON.parse(res);
        if (res.result == "OK") {
          self.fmSubList = res.ProgrammeInfo;
          self.ISAccount = res.CustomerRightsText[0].ISAccount;
          if (self.fmSubList.length > 0) {
            for (var i = 0; i < self.fmSubList.length; i++) {
              self.fmSubList[i]["status"] = "pause";
              self.fmSubList[i]["HourLong"] = -1;
            }
            if (self.showIndex >= self.fmSubList.length) {
              self.showIndex = 0;
              localStorage.setItem("listenHistoryIndex", 0);
            }
            localStorage.setItem("Payment", JSON.stringify(res.Payment));
            localStorage.setItem("slogan", JSON.stringify(res.Slogan));
            Q_UTILS.SHOW_SLOGAN();
            self.saveListen();
            setTimeout(function() {
              self.initSwiper();
            }, 120)
          }
        }
      })
    },
    methods: {
      timeUpdate: function() {
        var self = this,
          _this = document.getElementById("audio_" + self.showIndex);
        if (!self.dragging) {
          if (_this.readyState != 4) {
            if (!_this.paused)
              self.curState = "loading";
          } else {
            if (_this.paused) {
              self.curState = "pause";
            } else {
              self.curState = "play";
            }
          }
          self.fmSubList[self.showIndex].HourLong = ((215 / _this.duration) * _this.currentTime).toFixed(2);
          console.log(self.curState);
        }
      },
      ended: function() {
        this.fmSubList[this.showIndex].progress = 0;
        this.fmSubList[this.showIndex].status = "pause";
      },
      canplay: function() {
        this.fmSubList[this.showIndex].progress = 0;
      },
      initSwiper: function() {
        var self = this;
        var swiper = new Swiper('#index-app', {
          initialSlide: self.showIndex,
          threshold: 30,
          touchMoveStopPropagation: false,
          iOSEdgeSwipeDetection: true,
          passiveListeners: false,
          onTouchStart: function(swiper, event) {
            event.preventDefault();
            return;
          },
          onTouchEnd: function(swiper, event) {
            self.oldIndex = swiper.activeIndex;
          },
          onTouchMove: function(swiper, evt) {
            if (swiper.touches.diff <= -10 && self.showIndex == self.fmSubList.length - 1 && self.ISAccount == "N") {
              window.location.href = "will.html";
            }
          },
          onSlideChangeStart: function(swiper) {
            self.dragging = true;
          },
          onSlideChangeEnd: function(swiper) {
            self.showIndex = swiper.activeIndex;
            localStorage.setItem("listenHistoryIndex", self.showIndex);
            if (self.listenRecordMax < self.showIndex) {
              self.listenRecordMax = self.showIndex;
              localStorage.setItem("listenRecordMax", self.showIndex);
              self.saveListen();
            }
            self.changeIndex();
            Q_UTILS.SHOW_SLOGAN();
          }
        });
      },
      changeIndex: function() {
        document.getElementById("audio_" + this.oldIndex).pause();
        this.curState = "pause";
        this.dragging = false;
      },
      playClick: function(sub) {
        var audio = document.getElementById("audio_" + this.showIndex);
        if (audio) {

        } else {
          alert("audio is null");
          audio.pause();
        }
        if (audio.paused) {
          this.curState = "loading";
          audio.play();
        } else {
          this.curState = "pause";
          audio.pause();
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
        var move = parseFloat(this.fmSubList[this.showIndex].HourLong) + (t.pageX - this.curBar.mx);
        this.curBar.mx = t.pageX;
        if (move > 0 && move < 215)
          this.fmSubList[this.showIndex].HourLong = move;
      },
      barTouchEnd: function() {
        var audio = document.getElementById("audio_" + this.showIndex);
        audio.currentTime = this.fmSubList[this.showIndex].HourLong / 215 * audio.duration;
        this.curState = "loading";
        this.dragging = false;
      },
      progresClick: function(evt) {
        var t = evt.target;
        var audio = document.getElementById("audio_" + this.showIndex);
        if (t.nodeName == "DIV" || t.className == "had") {
          var offsetLeft = t.className == "had" ? t.parentElement.offsetLeft : t.offsetLeft;
          this.curState = "loading";
          audio.currentTime = (evt.touches[0].pageX - offsetLeft) / 215 * audio.duration;
        }
      },
      saveListen: function() {
        var req = {
          action: 'FM300SaveListenRecord',
          rd_session: Q_UTILS.CONSTANTS.RD_SESSION,
          para: this.fmSubList[this.showIndex].ProgrammeID,
          WX_flag: Q_UTILS.CONSTANTS.WX_FLAG,
          fromplace: Q_UTILS.CONSTANTS.URL.FROMPLACE,
          shareID: Q_UTILS.CONSTANTS.URL.SHAREID
        }
        var self = this;
        $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify(req), function(res) {
          res = JSON.parse(res);
          if (res.result == "OK") {
            // console.log("FM300SaveListenRecord==success");
          }
        })
      },
      likeClick: function() {
        var curPraiseValue = this.fmSubList[this.showIndex].PraiseValue;
        var req = {
          action: curPraiseValue == 'N' ? 'FM300SavePraise' : 'FM300CancelPraise',
          rd_session: Q_UTILS.CONSTANTS.RD_SESSION,
          WX_flag: Q_UTILS.CONSTANTS.WX_FLAG,
          fromplace: Q_UTILS.CONSTANTS.URL.FROMPLACE,
          shareID: Q_UTILS.CONSTANTS.URL.SHAREID,
          para: this.fmSubList[this.showIndex].ProgrammeID
        }
        var self = this;
        $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify(req), function(res) {
          res = JSON.parse(res);
          if (res.result == "OK") {
            self.fmSubList[self.showIndex].PraiseValue = curPraiseValue == 'N' ? 'Y' : 'N';
          }
        })
      }
    },
    filters: {
      timer: function(progress, index) {
        if (progress == -1 || progress == "NaN") return "00:00";
        var minute = "",
          second = "",
          audio = document.getElementById("audio_" + index);
        var template = audio.duration - audio.duration * (progress / 215);
        minute = Math.floor(template / 60);
        second = (template % 60).toFixed(0);
        return (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second);
      }
    }
  });
};
