$(document).ready(function(){
	//makes a call and searches streams api to see if channel is online
	var onlineOffline = 0;
	function checkIfOnline(targetDiv){
		//we pass in variable from outside
		$.ajax({
			type: 'GET',
			url: "https://api.twitch.tv/kraken/streams/"+search+"",
			headers: {
				'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
			},
			success: function(data) {
				if (data['stream'] == null){
					return onlineOffline = "offline";
					
				}else {
					return onlineOffline =  "Online";
				}
			},

		});	
	}

	$.ajax({
		type: 'GET',
		url: "https://api.twitch.tv/kraken/channels/freecodecamp",
		headers: {
			'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
		},
		error: function(){
			//test set only for brunofin channel
			$('#featured').append($('<div id="stream" class="stream0"><p>brunofin</p><p id="notExist">Stream doesnt exist</p><div>'));
		},
		success: function(data) {
			console.log(data);
			var targetDiv = "#featured"
			var channeLink = data['url'];
			var status = data['status'];
			var logo = data['logo']
			var channelName = data['display_name'];
			$("#streamFCC").append($('<a href='+channeLink+' target="_blank" <div id="stream" class="stream0"><img src="'+logo+'"><p id="name">'+channelName+'</p><p id="status">'+status+'</p></div></a>'));
			
		$.ajax({
			type: 'GET',
			url: "https://api.twitch.tv/kraken/streams/freecodecamp",
			headers: {
				'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
			},
			success: function(data) {
				if (data['stream'] == null){
					$(".stream0").append($('<p id="onlineOffline">'+ "Offline" +'</p>'));
					
				}else {
					$(".stream0").append($('<p id="onlineOffline">'+ "Online" +'</p>'));
				}
			},

		});	
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
			for(i=0; i<5; i++){

			var channeLink = data['featured'][i]['stream']['channel']['url'];
			var status = data['featured'][i]['stream']['channel']['status'];
			var logo = data['featured'][i]['stream']['channel']['logo']
			var channelName = data['featured'][i]['stream']['channel']['display_name'];
			//creating stream containers and giving them a class number so i can modify them on the fly in future (i+1)
			$("#featured").append($('<a href='+channeLink+' target="_blank" <div id="stream" class="stream'+(i+1)+'"><img src="'+logo+'"><p id="name">'+channelName+'</p><p id="status">'+status+'</p></div></a>'));
			//$("#streamContainer").append($('<div id="stream"><img src="'+logo+'"><p>'+channelName+'</p><p>'+status+'</p></div>'));
			}
		}
	});		
	//searchbox 
	$("#button").on("click", function(){
		$("#result").empty();
		var search = $("#search").val();

		$.ajax({
			type: 'GET',
			url: "https://api.twitch.tv/kraken/channels/"+search+"",
			headers: {
				'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
			},
			success: function(data) {
				var targetDiv = "#result";
				console.log(data);
				var channeLink = data['url'];
				var status = data['status'];
				var logo = data['logo']
				var channelName = data['display_name'];
				$(targetDiv).append($('<a href='+channeLink+' target="_blank" <div id="stream" class="target"><img src="'+logo+'"><p id="name">'+channelName+'</p><p id="status">'+status+'</p></div></a>'));
				checkIfOnline()
				
				$(".target").append($('<p id="onlineOffline">'+ onlineOffline +'</p>'));

			},
			error: function(data){
				var targetDiv = "#result";
				$(targetDiv).append($('<div id="stream" class="target"><p>'+search+'</p><p id="notExist">Stream doesnt exist</p><div>'));
			},


		});
	});
});
