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

	var chunks = [];
	var size = 0;
	req.on("data",function(chunk){
		chunks.push(chunk);
		size+=chunk.length;
	});

	req.on("end",function(){
		var buffer = Buffer.concat(chunks,size);
		if(!size){
			res.writeHead(404);
			res.end("");
			return;
		}

		var rems = [];

		for(var i = 0,l = buffer.length;i<l;i++){
			var v = buffer[i];
			var v2 = buffer[i+1];
			if(v==13 && v2==10 ){
				rems.push(i);
			}
		}

		var picmsg_1 = buffer.slice(rems[0]+2,rems[1]).toString();
		var filename = picmsg_1.match(/filename=".*"/g)[0].split
	});

}).listen(8000);