


var socket = io();
var counter = 0;


console.log("Hi");


socket.on('think_stream', function(data){
	console.log("Got stream",data)
	$("#add").append($('<li>').text(data));
});


/*$("#merp").on('click',function(){
	console.log("click")
	console.log(counter)
	socket.emit('think_stream', counter++);
});*/