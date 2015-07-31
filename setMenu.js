var http = require("http");
var https = require("https");

//全局变量
var ACCESS_TOKEN = "";
var EXPIRES = 0;
var APPID = "wx234cbbce5baf418e";
var APPSECRET = "b25c6b5f5a01b271b77db847eccd0868";

function getAccessToken(accessToken,expires,callback){
	var now = new Date().getTime();
	if(accessToken == "" || accessToken == null || now > expires){
		https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+APPID+'&secret='+APPSECRET,function(res){
			console.log("statusCode",res.statusCode);
			res.setEncoding('utf8');
			res.on("data",function(d){
				//console.log(Object.prototype.toString.call(d));
				var result = JSON.parse(d);
				ACCESS_TOKEN = result.access_token;
				EXPIRES = (parseInt(result.expires_in))*1000 + now;
				callback();
			}).on("error",function(e){
				console.error(e);
			});
		});
	}
}



getAccessToken(ACCESS_TOKEN,EXPIRES,function(){
	console.log(ACCESS_TOKEN);
	console.log(EXPIRES);
});