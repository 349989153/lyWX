var http = require("http");
var fs = require("fs");

function readJSONFile(){
	var jsonResult = {};
	var filePath = "custMenu.json";
	var str = fs.readFileSync(filePath,"utf-8");
	jsonResult = JSON.parse(str);
	console.log(jsonResult);
}