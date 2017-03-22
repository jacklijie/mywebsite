/**
 * Created by Jack on 2015/9/30.
 */
 var fs = require("fs");
function route(handle,pathname){
    console.log("About to route a request for "+pathname);
    if(typeof handle[pathname] === 'function'){
        return handle[pathname]();
    }else{
      console.log(pathname.substr(1));
      fs.readFile(pathname.substr(1),function (err,data) {
        if(err){
          return "404";
        }else{
          return data.toString();
        }
      })
    }
}

exports.route = route;
