/**
 * Created by Jack on 2015/9/30.
 */
var http = require("http");
var url = require("url");
var fs = require("fs");

function start(route,handle){
    function onRequest(request,response){
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received");
        var content = route(handle,pathname);
        if(content=="404"){
          response.writeHead(404,{"Content-Type":"text/plain"});
        }else{
          console.log(content);
        response.writeHead(200,{"Content-Type":"text/plain"});
        //  route(handle,pathname);
        response.write(content);
      }
        response.end();
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}
exports.start = start;
