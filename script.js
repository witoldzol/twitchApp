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
			var channeLink = {};
			var channeLink = data['featured'][0]['stream']['channel']['url'];
			var status = data['featured'][0]['stream']['channel']['status'];
			var logo = data['featured'][0]['image'];
			//var link = JSON.parse(JSON.stringify(channeLink));
			//var link = JSON.stringify(channeLink);
			console.log(channeLink);
			console.log(logo);
			console.log(status);

		}
	});

	$.ajax({
		type: 'GET',
		url: "https://api.twitch.tv/kraken/streams/ddrjake",
		headers: {
			'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
		},
		success: function(data) {
			if(data['stream'] === null){
				console.log('ddrjake is offline');
			}
		}

	});		
});
