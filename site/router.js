/**
 * Created by Jack on 2015/9/30.
 */
function route(handle,pathname){
    console.log("About to route a request for "+pathname);
    if(typeof handle[pathname] === 'function'){
        return handle[pathname]();
    }else{
        console.log("No request handler found for " + pathname);
        return "404 Not found";
    }
}

exports.route = route;