var indexReady = function() {
  Q_UTILS.CONSTANTS.RD_SESSION = localStorage.getItem("q_rd_session");
  var indexApp = new Vue({
    el: "#index-app",
    data: {
      oldIndex: 0,
      showIndex: 0,
      listenRecordMax: 0,
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
          if (self.fmSubList.length > 0) {
            for (var i = 0; i < self.fmSubList.length; i++) {
              self.audioList.push({
                // obj: null,
                status: "pause",
                progress: 0
              })
            }
            if (self.showIndex >= self.fmSubList.length) {
              self.showIndex = 0;
              localStorage.setItem("listenHistoryIndex", 0);
            }
            // localStorage.setItem("myinfo", JSON.stringify(res.CustomerRightsText[0]));
            localStorage.setItem("Payment", JSON.stringify(res.Payment));
            localStorage.setItem("slogan", JSON.stringify(res.Slogan));
            Q_UTILS.SHOW_SLOGAN();
            self.initAudio(self.showIndex, true);
            self.saveListen();
            setTimeout(function() {
              self.initSwiper();
              if (self.showIndex + 1 < self.fmSubList.length) self.initAudio(self.showIndex + 1);
              if (self.showIndex > 0) self.initAudio(self.showIndex - 1);
            }, 120)
          }
        }
      })
    },
    methods: {
      initAudio: function(i, autoplay) {
        var self = this;
        if (!this.audioList[i].obj) {
          var audio = document.createElement("audio");
          audio.src = self.fmSubList[i].Url;
          audio.preload = "auto";
          // if (autoplay) {
          // audio.autoplay = "autoplay";
          // self.audioList[i].status = "play";
          // }
          audio.addEventListener("timeupdate", function() {
            if (!self.dragging) {
              self.audioList[self.showIndex].progress = ((215 / this.duration) * this.currentTime).toFixed(2);
            }
          });
          audio.addEventListener("ended", function() {
            self.audioList[self.showIndex].progress = 1;
            self.audioList[self.showIndex].status = "pause";
          });
          (function(a) {
            audio.addEventListener("canplay", function() {
              self.audioList[a].progress = 1;
              if (autoplay) {
                self.audioList[a].obj.play();
                self.audioList[a].status = "play";
              }
            })
          })(i)
          self.audioList[i].obj = audio;
        }
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
            if (swiper.touches.diff <= -100 && self.showIndex == self.audioList.length - 1) {
              window.location.href = "will.html";
            }
          },
          onSlideChangeStart: function(swiper) {
            self.dragging = true;
          },
          onSlideChangeEnd: function(swiper) {
            self.showIndex = swiper.activeIndex;
            if (self.showIndex + 1 < self.fmSubList.length) self.initAudio(self.showIndex + 1);
            if (self.showIndex > 0) self.initAudio(self.showIndex - 1);
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
        var self = this;
        if (this.audioList[this.oldIndex].obj) {
          this.audioList[this.oldIndex].obj.pause();
          this.audioList[this.oldIndex].status = "pause";
        }
        setTimeout(function() {
          self.dragging = false;
          self.audioList[self.showIndex].obj.play();
          self.audioList[self.showIndex].status = "play";
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
          var offsetLeft = t.className == "had" ? t.parentElement.offsetLeft : t.offsetLeft;
          this.audioList[this.showIndex].obj.currentTime = (evt.touches[0].pageX - offsetLeft) / 215 * this.audioList[this.showIndex].obj.duration;
        }
      },
      saveListen: function() {
        var req = {
          action: 'FM300SaveListenRecord',
          rd_session: Q_UTILS.CONSTANTS.RD_SESSION,
          WX_flag: 5,
          para: this.fmSubList[this.showIndex].ProgrammeID,
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
            console.log("FM300SaveListenRecord==success");
          }
        })
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
