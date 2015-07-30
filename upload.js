var http = require("http");
var fs = require("fs");

http.createServer(function(req,res){
	var imaps = req.url.split("/");
	var maps = [];
	imaps.forEach(function(m){
		if(m){
			maps.push(m);
		}
	});

	switch(maps[0]){
		case "index":
			var str = fs.readFileSync("./index.html");
			res.writeHead(200,{"Content-Type":"text/html"});
			res.end(str,"utf-8");
			break;
		case "upl":
			var str = fs.readFileSync("./upload.html");
			res.writeHead(200,{"Content-Type":"text/html"});
			res.end(str,"utf-8");
			break;
		case "upload":
			break;
		default:
			var path = maps.join("/");
			var value = "";
			var filename = maps[maps.length - 1];
			var checkReg = /^.+.(gif|png|jpg|css|js)+$/;
			if(maps[0]=="databox"){
				checkReg = /.*/;
			}

			if(checkReg.test(filename)){
				try{
					value = fs.readFileSync(path);
				}catch(e){}
			}

			if(value){
				res.end(value);
			}else {
				res.writeHead(404);
				res.end("404 Not Found");
			}

			break;
	}
}).listen(8000);