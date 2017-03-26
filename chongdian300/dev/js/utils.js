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
  },
  RD_SESSION: ''
};
Q_UTILS.IS_DEV = false;
Q_UTILS.WX_SHARE = {
  wxConfig: {
    jsApiList: [
      'checkJsApi',
      'chooseImage' //,
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
