$(document).ready(function(){

	$.getJSON("https://api.twitch.tv/kraken/streams?callback=?", function(data){

		console.log(data);


	});
	
});
