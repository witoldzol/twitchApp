$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: "https://api.twitch.tv/kraken/channels/freecodecamp",
		//url: "https://api.twitch.tv/kraken/channels/brunofin",
		headers: {
			'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
		},
		error: function(){
			$('#streamContainer').append($('<div id="stream" class="stream0"><p id="notExist">Stream doesnt exist</p><div>'));
		},
		success: function(data) {
			console.log(data);

			var channeLink = data['url'];
			var status = data['status'];
			var logo = data['logo']
			var channelName = data['display_name'];
			$("#streamContainer").append($('<a href='+channeLink+' target="_blank" <div id="stream" class="stream0"><img src="'+logo+'"><p id="name">'+channelName+'</p><p id="status">'+status+'</p></div></a>'));
			function onOff(){
				$.ajax({
					type: 'GET',
					url: "https://api.twitch.tv/kraken/streams/freecodecamp",
					headers: {
						'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
					},
					success: function(data) {

						if (data['stream'] == null){
							$("#status").append($('<p id="offline">Offline</p>'));
						}else {
							$("#status").append($('<p id="online">Online</p>'));
						}
					},
				});	
			}
			onOff();
		}
	});	

	
	$.ajax({
		type: 'GET',
		url: "https://api.twitch.tv/kraken/streams/featured",
		headers: {
			'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
		},
		success: function(data) {
			console.log(data);
			//array variable, we have to break the path to final objects in order to loop them

			//var image = data['featured'][0]['image'];
			console.log(channeLink);
			console.log(logo);
			console.log(data['featured'].length);
			for(i=0; i<10; i++){

			var channeLink = data['featured'][i]['stream']['channel']['url'];
			var status = data['featured'][i]['stream']['channel']['status'];
			var logo = data['featured'][i]['stream']['channel']['logo']
			var channelName = data['featured'][i]['stream']['channel']['display_name'];
			//creating stream containers and giving them a class number so i can modify them on the fly in future (i+1)
			$("#streamContainer").append($('<a href='+channeLink+' target="_blank" <div id="stream" class="stream'+(i+1)+'"><img src="'+logo+'"><p id="name">'+channelName+'</p><p id="status">'+status+'</p></div></a>'));
			//$("#streamContainer").append($('<div id="stream"><img src="'+logo+'"><p>'+channelName+'</p><p>'+status+'</p></div>'));
			}
		}


	});		
});
