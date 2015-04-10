

var nodeThinkGear = require('node-thinkgear');
var tgHelpers = require('./js_server/thinkgear');
var tgClient = nodeThinkGear.createClient({
	appName:'NodeThinkGear',
	appKey:'0fc4141b4b45c675cc8d3a765b8d71c5bde9390'
});


datapoints = [];
counter = 0;
//tgHelpers.write_to_file("attention,meditation\n");



var express = require('express');
var app = express();
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')));
var http = require('http').Server(app);

app.get('/', function(req,res){
	res.sendFile(__dirname+'/public/html/socket_test.html');
});


tgClient.connect();


var io = require('socket.io')(http);
io.on('connection', function(socket){
	console.log("User connected");

	socket.on('disconnect', function(){
		console.log("User disconnected");
		counter--;
	})

	io.emit('think_stream', "Connected "+counter++);


	tgClient.on('data', function(data){

		console.log(data.poorSignalLevel,counter);
		counter+=1;
		
		var data_to_write = data.eSense.attention+","+data.eSense.meditation
		io.emit('think_stream', data_to_write);
		
	})
})


http.listen(3000, function(){
	console.log("Server on 3000");
})
