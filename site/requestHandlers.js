/**
 * Created by Jack on 2015/9/30.
 */
function start(){
    console.log("Request handler 'start' was called.");

    function sleep(milliSeconds){
        var startTime = new Date().getTime();
        while(new Date().getTime() < startTime + milliSeconds);
    }
    sleep(1000);
    return "Hello start";
}

function upload(){
    console.log("Request handler 'upload' was called.");
    return "Hello upload";
}

exports.start = start;
exports.upload = upload;