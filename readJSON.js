var http = require("http");
var fs = require("fs");

function readJSONFile(){
	var jsonResult = {};
	var filePath = "custMenu.json";
	var str = fs.readFileSync(filePath,"utf-8");
	jsonResult = JSON.parse(str);
	if(str == null || str == ""){
		console.log("Error!Did not read the file");
	}else {
		console.log(jsonResult);
	}
}

readJSONFile();