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
    var localRdSession = localStorage.getItem("q_rd_session");
    console.log(localRdSession);
    if (localRdSession == null || localRdSession == 'undefined') {
      $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify({
        action: 'getrd_session',
        code: code,
        WX_flag: 5
      }), function(res) {
        res = JSON.parse(res);
        Q_UTILS.CONSTANTS.RD_SESSION = res.rd_session;
        localStorage.setItem('q_rd_session', res.rd_session);
        window.location.reload();
      });
    } else {
      Q_UTILS.CONSTANTS.RD_SESSION = localRdSession;
      window.location.href = 'index.html';
    // $.post(Q_UTILS.CONSTANTS.URL.OAUTH, JSON.stringify({
    //   action: 'FMGameLastResult',
    //   rd_session: localRdSession,
    //   WX_flag: 4
    // }), function(res) {
    //   res = JSON.parse(res);
    //   console.log(res);
    //   if (res.IsFirst) {
    //     window.location.href = 'index.html';
    //   } else {
    //     var scores = res.textResult;
    //     scores.sort(function(a, b) {
    //       return a.TypeScores - b.TypeScores;
    //     });
    //     console.log(scores);
    //     res.maxAblilty = scores[scores.length - 1];
    //     res.minAblilty = scores[0];
    //     localStorage.setItem("test_result", JSON.stringify(res));
    //     window.location.href = 'chart.html';
    //   }
    // });
    }
  } else {
    localStorage.setItem('q_rd_session', 'ae2kol0bpojx44h9h33d374btwp0xeeq');
    Q_UTILS.CONSTANTS.RD_SESSION = 'ae2kol0bpojx44h9h33d374btwp0xeeq';
    window.location.href = 'index.html';
  }
};

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
  },
  RD_SESSION: ''
};
Q_UTILS.IS_DEV = true;
Q_UTILS.WX_SHARE = {
  wxConfig: {
    jsApiList: [
      'checkJsApi',
      'chooseImage',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
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
        var configJson = {};
        try {
          configResponse = JSON.parse(configResponse);
        } catch (e) {}
        configJson = configResponse.Config[0];
        console.log(configJson);
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
        //                alert('分享失败');
        }
      });

      wx.onMenuShareAppMessage({
        title: self.shareObj.friendTitle, // 分享标题
        desc: self.shareObj.desc, // 分享描述
        link: self.shareObj.shareLink, // 分享链接
        imgUrl: self.shareObj.shareImg, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        //            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function() {
          // 用户确认分享后执行的回调函数
          self.shareObj.shareSuccess();
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
          self.shareObj.shareCancel();
        }
      });

      wx.onMenuShareQQ({
        title: self.shareObj.title, // 分享标题
        desc: self.shareObj.desc, // 分享描述
        link: self.shareObj.shareImg, // 分享链接
        imgUrl: self.shareObj.shareImg, // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
          self.shareObj.shareSuccess();
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
          self.shareObj.shareCancel();
        }
      });
    }

  }
};
