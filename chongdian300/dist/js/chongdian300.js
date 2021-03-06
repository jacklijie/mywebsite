/**
 * Created by Administrator on 2017/2/11.
 */
Date.prototype.format = function(format) {
  var o = {
    "M+": this.getMonth() + 1,
    // month
    "d+": this.getDate(),
    // day
    "h+": this.getHours(),
    // hour
    "m+": this.getMinutes(),
    // minute
    "s+": this.getSeconds(),
    // second
    "q+": Math.floor((this.getMonth() + 3) / 3),
    // quarter
    "S": this.getMilliseconds()
  // millisecond
  };
  if (/(y+)/.test(format) || /(Y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};
var COMMON_UTILS = {
  "isStrEmpty": function(str) {
    if (str == "" || str == undefined || str == null)
      return true;
    return false;
  },
  "isAndroid": function() {
    if (/(Android)/i.test(navigator.userAgent)) {
      return true;
    }
    return false;
  },
  "isIOS": function() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      return true;
    }
    return false;
  },
  "dateFormat": function(timestamp, format) {
    if (this.isStrEmpty(format)) {
      format = "yyyy-MM-dd hh:mm:ss";
    }
    return new Date(timestamp).format(format);
  },
  "isCardNo": function(card) {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(card);
  },
  "isMobile": function(mobileNumber) {
    if (!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(mobileNumber)) {
      return false;
    }
    return true;
  },
  "isEmail": function(email) {
    var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return emailReg.test(email);
  },
  "isStrInRange": function(str, min, max) {
    var result = false;
    if (str.length < min || str.length > max) {
      result = false;
    } else {
      result = true;
    }
    return result;
  },
  "isNum": function(s) {
    if (!this.isStrEmpty(s)) {
      var r,
        re;
      re = /\d*/i; //\d表示数字,*表示匹配多个数字
      r = s.match(re);
      return (r == s);
    }
    return false;
  },
  "isPCBrowser": function() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    //document.writeln("您的浏览设备为：");
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      return false;
    } else {
      return true;
    }
  },
  //获取url中的参数
  "getUrlParam": function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return ''; //返回参数值
  },
  "setCookie": function(c_name, value) {
    var exdate = new Date();
    /*设置cookie过期30分钟,UTC时间与北京时间相差8小时，所以要+8*/
    exdate.setHours(exdate.getHours() + 8);
    exdate.setMinutes(exdate.getMinutes() + 1);
    exdate.setTime(exdate.getTime() + (1 * 1 * 1 * 60 * 1000))
    document.cookie = c_name + "=" + encodeURI(value) + ";expires=" + exdate.toUTCString();
  },
  "getCookie": function(c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        var c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1)
          c_end = document.cookie.length;
        return decodeURI(document.cookie.substring(c_start, c_end))
      }
    }
    return "";
  },
  /*动态加载js*/
  'dynamicLoadScript': function(uri, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) { //IE
      script.onreadystatechange = function() {
        var _readyState = script.readyState;
        if (_readyState == 'loaded' || _readyState == 'complete') {
          script.onreadystatechange = null;
          if (callback != undefined) {
            callback();
          }
        }
      }
    } else {
      script.onload = function() {
        if (callback != undefined) {
          callback();
        }
      }
    }
    script.src = uri;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

};

/**
 * Created by Administrator on 2017/2/13.
 */
var getCodeReady = function() {
  //部署到对方服务器后将这里注释打开
  if (!Q_UTILS.IS_DEV) {
    var code = COMMON_UTILS.getUrlParam("code");
    Q_UTILS.CONSTANTS.INIT();
    if (Q_UTILS.CONSTANTS.RD_SESSION == null || Q_UTILS.CONSTANTS.RD_SESSION == 'undefined') {
      $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify({
        action: 'getrd_session',
        code: code,
        WX_flag: Q_UTILS.CONSTANTS.WX_FLAG,
        fromplace: Q_UTILS.CONSTANTS.URL.FROMPLACE,
        shareID: Q_UTILS.CONSTANTS.URL.SHAREID
      }), function(res) {
        // console.log(res.rd_session);
        res = JSON.parse(res);
        // Q_UTILS.CONSTANTS.RD_SESSION = res.rd_session;
        localStorage.setItem('q_rd_session', res.rd_session);
        window.location.reload();
      });
    } else {
      // Q_UTILS.CONSTANTS.RD_SESSION = localRdSession;
      window.location.href = 'index.html';
    }
  } else {
    localStorage.setItem('q_rd_session', 'np3p32s5f7n2zf3bhr8el42p1x1ysa3q');
    localStorage.setItem("_from", "test");
    localStorage.setItem("_shareId", "118");
    localStorage.setItem("WX_flag", "5");
    window.location.href = 'index.html';
  }
};

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

var payReady = function() {
  Q_UTILS.CONSTANTS.INIT();
  var payApp = new Vue({
    el: ".pay-app",
    data: {
      payIndex: -1,
      payment: []
    },
    created: function() {
      Q_UTILS.SHOW_SLOGAN();
      var self = this;
      var payList = localStorage.getItem("Payment");
      if (payList) {
        self.payment = JSON.parse(payList);
        Q_UTILS.CONSTANTS.RD_SESSION = localStorage.getItem("q_rd_session");
      }
    },
    methods: {
      payClick: function() {
        if (this.payIndex != -1) {
          var req = {
            action: 'FM300creatConsume',
            rd_session: Q_UTILS.CONSTANTS.RD_SESSION,
            WX_flag: Q_UTILS.CONSTANTS.WX_FLAG,
            fromplace: Q_UTILS.CONSTANTS.URL.FROMPLACE,
            shareID: Q_UTILS.CONSTANTS.URL.SHAREID,
            para: this.payment[this.payIndex].substance
          }
          var _form = localStorage.getItem("_form");
          if (_form != null) {
            req.fromplace = _form;
          }
          var self = this;
          $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify(req), function(res) {
            res = JSON.parse(res);
            if (res.result == "OK") {
              localStorage.setItem("payParams", JSON.stringify(res.pay));
              window.location.href = "paying.html";
            }
          })
        }
      }
    }
  })
}

/**
 * Created by Administrator on 2017/2/8.
 */
var Q_UTILS = {};
/**
 * 生产30位随机数，最大值为max
 * @param max number
 * @constructor
 */
Q_UTILS.GET_30_RANDOM_NUMBER = function(max) {
  var array = [],
    fakeHashMap = Q_UTILS.MAP.createHashMap();
  var generateNotSameRandomNumber = function(max) {
    var tempNumber = Math.ceil(Math.random() * max);
    while (fakeHashMap.get('n' + tempNumber) != undefined) {
      tempNumber = Math.ceil(Math.random() * max);
    }
    fakeHashMap.put('n' + tempNumber, tempNumber);
    return tempNumber;
  };

  for (var i = 0; i < 30; i++) {
    var tempNumber = generateNotSameRandomNumber(max);
    if (tempNumber == 0) {
      array.push(tempNumber);
    } else {
      array.push((tempNumber - 1));
    }
  }
  return array.sort(function(a, b) {
    return a - b;
  });
};
Q_UTILS.SHOW_SLOGAN = function() {
  var slogan = localStorage.getItem("slogan"),
    sloganIndex = localStorage.getItem("sloganIndex");
  if (slogan && JSON.parse(slogan).length > 0) {
    slogan = JSON.parse(slogan);
    if (sloganIndex || sloganIndex == 0) {
      if (sloganIndex < slogan.length - 1) {
        sloganIndex++;
      } else {
        sloganIndex = 0;
      }
    } else {
      sloganIndex = 0;
    }
    localStorage.setItem("sloganIndex", sloganIndex);
    $(".app-footer span").text(slogan[sloganIndex].Slogan);
  }
};

Q_UTILS.MAP = {
  /**
   * HASHMAP
   * @returns {}
   */
  createHashMap: function() {
    var hashMap = {};
    hashMap.__set__ = {};
    hashMap.put = function(key, value) {
      hashMap.__set__[key] = value;
    };
    hashMap.get = function(key) {
      return hashMap.__set__[key];
    };
    return hashMap;
  }
};
Q_UTILS.CONSTANTS = {
  URL: {
    OAUTH: 'https://www.chongdianshijian.com/WebSite1/Handler.ashx',
    FROMPLACE: '',
    SHAREID: ''
  },
  RD_SESSION: '',
  WX_FLAG: '',
  INIT: function() {
    this.RD_SESSION = localStorage.getItem("q_rd_session");
    this.WX_FLAG = localStorage.getItem("WX_flag");
    this.URL.FROMPLACE = localStorage.getItem("_from");
    this.URL.SHAREID = localStorage.getItem("_shareId");
  }
};
Q_UTILS.IS_DEV = false;
Q_UTILS.WX_SHARE = {
  wxConfig: {
    jsApiList: [
      'hideMenuItems',
      'showMenuItems'
    // 'checkJsApi',
    // 'chooseImage',
    // 'onMenuShareTimeline',
    // 'onMenuShareAppMessage',
    // 'onMenuShareQQ',
    // 'onMenuShareWeibo',
    ]
  },
  initParams: {
    url: '',
    params: {},
    method: 'post',
    isStringify: false
  },
  shareObj: {
    timelineTitle: '', //好友圈分享标题
    shareLink: '', //分享链接
    shareBigImg: '', //分享大图标
    friendTitle: '', //微信分享给朋友标题
    desc: '', //微信分享描述
    shareImg: '', //分享图标
    shareSuccess: function() {},
    shareCancel: function() {}
  },
  init: function() {
    var self = this,
      successCallback = function(configResponse) {
        var configJson = {},
          response = {};
        try {
          configResponse = JSON.parse(configResponse);
        } catch (e) {}
        configJson = configResponse.Config[0];
        response = configResponse.WXShareDescr[0];
        //微信分享描述
        self.shareObj.desc = response.descr;
        //好友圈分享标题
        self.shareObj.timelineTitle = response.title;
        //微信分享给朋友标题
        self.shareObj.friendTitle = self.shareObj.timelineTitle;
        //分享链接
        if (response.link != undefined) {
          self.shareObj.shareLink = response.link;
        } else {
          self.shareObj.shareLink = 'https://www.chongdianshijian.com/chongdian300/oauth.html';
        }
        //分享大图标
        self.shareObj.shareBigImg = response.imgUrl;
        //分享图标
        self.shareObj.shareImg = response.imgUrl;

        var jsApiList = configResponse.jsApiList;
        for (var i = 0; i < jsApiList.length; i++) {
          self.wxConfig.jsApiList.push(jsApiList[i].SharejsApiList);
        }
        configJson.debug = false;
        configJson.jsApiList = self.wxConfig.jsApiList;
        configJson.timestamp = parseInt(configJson.timestamp);
        wx.config(configJson);
      };
    self.initParams.params.para = window.location.href;
    if (self.initParams.isStringify) {
      self.initParams.params = JSON.stringify(self.initParams.params);
    }
    if (self.initParams.method.toLocaleLowerCase() == 'post') {
      $.post(self.initParams.url, self.initParams.params, successCallback);
    } else if (self.initParams.method.toLocaleLowerCase() == 'get') {
      $.get(self.initParams.url, self.initParams.params, successCallback);
    }
  },
  onReady: function() {
    var self = this;
    if (wx) {
      self.wxConfig.jsApiList.splice(0, 2);
      var hideMenuList = [],
        apilistStr = self.wxConfig.jsApiList.join(","),
        showMenuList = self.wxConfig.jsApiList;
      if (apilistStr.indexOf("timeline") == -1) {
        hideMenuList.push("menuItem:share:timeline");
      }
      if (apilistStr.indexOf("appmessage") == -1) {
        hideMenuList.push("menuItem:share:appMessage");
      }
      if (apilistStr.indexOf("qq") == -1) {
        hideMenuList.push("menuItem:share:qq");
      }
      if (apilistStr.indexOf("weiboApp") == -1) {
        hideMenuList.push("menuItem:share:weiboApp");
      }
      if (apilistStr.indexOf("QZone") == -1) {
        hideMenuList.push("menuItem:share:QZone");
      }
      wx.hideMenuItems({
        menuList: hideMenuList
      });
      wx.showMenuItems({
        menuList: showMenuList
      });
      wx.onMenuShareTimeline({
        title: self.shareObj.timelineTitle, // 分享标题
        link: self.shareObj.shareLink, // 分享链接
        imgUrl: self.shareObj.shareBigImg, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
          self.shareObj.shareSuccess();
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
          self.shareObj.shareCancel();
        }
      });

      wx.onMenuShareAppMessage({
        title: self.shareObj.friendTitle, // 分享标题
        desc: self.shareObj.desc, // 分享描述
        link: self.shareObj.shareLink, // 分享链接
        imgUrl: self.shareObj.shareImg, // 分享图标
        // type: 'link', // 分享类型,music、video或link，不填默认为link
        //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
          self.shareObj.shareSuccess();
        },
        cancel: function() {
          self.shareObj.shareCancel();
        }
      });

      wx.onMenuShareQQ({
        title: self.shareObj.friendTitle, // 分享标题
        desc: self.shareObj.desc, // 分享描述
        link: self.shareObj.shareLink, // 分享链接
        imgUrl: self.shareObj.shareImg, // 分享图标
        success: function() {
          self.shareObj.shareSuccess();
        },
        cancel: function() {
          self.shareObj.shareCancel();
        }
      });
      wx.onMenuShareWeibo({
        title: self.shareObj.friendTitle, // 分享标题
        desc: self.shareObj.desc, // 分享描述
        link: self.shareObj.shareLink, // 分享链接
        imgUrl: self.shareObj.shareImg, // 分享图标
        success: function() {
          self.shareObj.shareSuccess();
        },
        cancel: function() {
          self.shareObj.shareCancel();
        }
      });
      wx.onMenuShareQZone({
        title: self.shareObj.friendTitle, // 分享标题
        desc: self.shareObj.desc, // 分享描述
        link: self.shareObj.shareLink, // 分享链接
        imgUrl: self.shareObj.shareImg, // 分享图标
        success: function() {
          self.shareObj.shareSuccess();
        },
        cancel: function() {
          self.shareObj.shareCancel();
        }
      });
    }

  }
};
