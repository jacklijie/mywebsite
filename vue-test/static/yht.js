"use strict";
(function(){
    var ishttps = "https:" == document.location.protocol ? true: false;
    if(ishttps){
        var HOST = "https://sdklink.yunhetong.com/sdk/";
    }else{
        var HOST = "http://sdklink.yunhetong.com/sdk/";
    }
    var t = new Date();
    var year = t.getFullYear();
    var month = t.getMonth()+1;
    var date = t.getDate();
    if(month<10){
        month = "0" + month;
    }
    if(date<10){
        date = "0" + date;
    }
    t = year+month+date;
    document.write("<script type='text/javascript' src='"+ HOST +"api/m/yhtapi.js?t=" + t + "'></script>");
})();
