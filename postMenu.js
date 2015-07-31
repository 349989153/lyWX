var https = require("https");
var fs = require("fs");
var needle = require("needle");

var ACCESS_TOKEN = "cnwr7SYmcWB8NHop80NjsgbvewJQaweqvN8ooms26JdfSMFU8iVia7WChZ_7nfOVLloSUo7FIj4sZSGQYJH5JVu77tNy5zX7azkYt69UHqo";
var filePath = "custMenu.json";
var jsonStr = fs.readFileSync(filePath,"utf-8");


/*
var menu = {
	"button":[
	{
		"name":"video",
		"sub_button":[
		{
			"type":"view",
			"name":"QQ",
			"url":"http://3g.v.qq.com"
		},
		{
			"type":"view",
			"name":"Youku",
			"url":"http://www.youku.com"
		}
		]
	},
	{
		"name":"Dev",
		"sub_button":[
		{
			"type":"view",
			"name":"Transform",
			"url":"http://115.159.31.94:8000/transform.html"
		},
		{
			"type":"view",
			"name":"QQ",
			"url":"http://www.qq.com"
		},
		{
			"type":"view",
			"name":"sina",
			"url":"http://www.sina.com.cn"
		}
		]
	}
	]
};


var param = JSON.stringify(menu);
var options = {};
var url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + ACCESS_TOKEN;
needle.post(url,param,options,function(err,res){
	console.log("Set Menu!");
	console.log(res.body);
});
*/

















var headers = {
	"Content-Type":"application/json",
	"Content-Length":jsonStr.length
};

var options = {
	host:"api.weixin.qq.com",
	path:"/cgi-bin/menu/create?access_token=" + ACCESS_TOKEN,
	method:"POST",
	headers:headers
};

var req = https.request(options,function(res){
	res.setEncoding("utf-8");
	var responseString = "";
	res.on("data",function(chunk){
		responseString += chunk;
	});
	res.on("end",function(){
		var resultObject = JSON.parse(responseString);
		console.log("-----resBody-----",resultObject);
	});
	res.on("error",function(e){
		console.log("-----resError-----",e);
	});
});
req.write(jsonStr);
req.end();


