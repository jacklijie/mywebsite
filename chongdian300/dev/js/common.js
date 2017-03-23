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
