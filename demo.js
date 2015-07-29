var http=require('http');

var body = {
 	"data":{
  		"channel" : "aaa",
  		"appkey" : "bbb"
	},
 	"sign" : "22334455",
    "token" : "bb667788"
};

var bodyString = JSON.stringify(body);

var headers = {
  'Content-Type': 'application/json',
  'Content-Length': bodyString.length
};


var options = {
  host: '127.0.0.1',
  port: 3005,
  path: '/Config',
  method: 'POST',
  headers: headers
};

var req=http.request(options,function(res){
	res.setEncoding('utf-8');

  	var responseString = '';

  	res.on('data', function(data) {
    	responseString += data;
  	});

  	res.on('end', function() {
  	//这里接收的参数是字符串形式,需要格式化成json格式使用
    	var resultObject = JSON.parse(responseString);
    	console.log('-----resBody-----',resultObject);
  	});

  	req.on('error', function(e) {
  		// TODO: handle error.
  		console.log('-----error-------',e);
	});
});
req.write(bodyString);
req.end();