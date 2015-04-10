var fs = require('fs');

var write_to_file = function(data){
	fs.appendFile("neurosky_data", data, function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("Successfully saved data");
		}
	})
}


var data_stream = function(data){
	if( data.poorSignalLevel == 0){
		var data_to_write = data.eSense.attention+","+data.eSense.meditation
		write_to_file( data_to_write+"\n" )
		counter+=1;
	}
	console.log(data.poorSignalLevel, counter);
}

exports.data_stream = data_stream;
exports.write_to_file = write_to_file;