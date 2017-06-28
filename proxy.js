/**
 * Created by jabbar on 12/29/16.
 */
var fs  = require("fs"),
    img = fs.readFileSync("dist/assets/logo.png");

module.exports = {
    // shouldUseLocalResponse : function(req,reqBody){
    //     if(/\.(png|gif|jpg|jpeg)$/.test(req.url)){
    //         req.replaceLocalFile = true;
    //         return true;
    //     }else{
    //         return false;
    //     }
    // },
    //
    // dealLocalResponse : function(req,reqBody,callback){
    //     if(req.replaceLocalFile){
    //         callback(200, {"content-type":"image/png"},img );
    //     }
    // },
    replaceRequestOption : function(req,option){
        var newOption = option;
        if(newOption.headers.host == "daas.wifipix.com"){
            newOption.hostname = "localhost";
            newOption.port     = "8081";
        }

        return newOption;
    }
};
