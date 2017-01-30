$(document).ready(function(){

	$.ajax({
		type: 'GET',
		url: "https://api.twitch.tv/kraken/streams/featured",
		//url: "https://api.twitch.tv/kraken/streams?game=dota",
		headers: {
			'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
		},
		success: function(data) {
			console.log(data);
			//array variable, we have to break the path to final objects in order to loop them
			var arr = data['featured'];
			var channel = ['stream']['channel'];

			var channelName = data['featured'][0]['stream']['channel']['display_name'];
			var channeLink = data['featured'][0]['stream']['channel']['url'];
			var status = data['featured'][0]['stream']['channel']['status'];
			//var image = data['featured'][0]['image'];
			var logo = data['featured'][0]['stream']['channel']['logo']
			//var link = JSON.parse(JSON.stringify(channeLink));
			//var link = JSON.stringify(channeLink);
			console.log(channeLink);
			console.log(logo);
			console.log(status);
			for(i=0; i<data['featured'].length; i++){

			$("#streamContainer").append($('<div id="stream"><img src="'+arr[i]+'["stream"]["channel"]"><p>'+channelName+'</p><p>'+status+'</p></div>'));
			//$("#streamContainer").append($('<div id="stream"><img src="'+logo+'"><p>'+channelName+'</p><p>'+status+'</p></div>'));
			}
		}


	});		
});
