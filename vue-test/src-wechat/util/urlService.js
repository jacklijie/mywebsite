export default {
    host: location.origin,//"http://10.224.198.111:8081",//"http://10.230.28.200:8080",//
    getObjByStr: function (urlStr) {
        var theRequest = new Object();
        var strs = urlStr.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].substr(strs[i].indexOf('=') + 1));
        }
        return theRequest;
    },
    getUrlStr: function () {
        var url = location.search,
            str = "";
        if (url.indexOf("?") != -1) {
            str = url.substr(1);
            var strObj = this.getObjByStr(str);
            str = "userId=" + strObj.userId;
        }
        return str;
    },
    getUrlObj: function () {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            let strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = (strs[i].substr(strs[i].indexOf('=') + 1));
            }
        }
        return theRequest;
    }
}