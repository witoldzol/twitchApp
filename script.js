$(document).ready(function(){

	$("#button").on("click", function(){
		//empty previous element created by search
		$("#result").empty();
		//search bar value
		var search = $("#search").val();
		var targetDiv = "#result"
		var noStream = "http://santirodriguez.es/wp-content/uploads/2016/04/no-videos.jpg";
		$.ajax({
			type: 'GET',
			url: "https://api.twitch.tv/kraken/channels/"+search+"",
			headers: {
				'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
			},
			success: function(data) {
			var channeLink = data['url'];

			var status = data['status'];

			var logo = data['logo']

			var channelName = data['display_name'];
	
				$.ajax({
					type: 'GET',
					url: "https://api.twitch.tv/kraken/streams/"+search+"",
					headers: {
						'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
					},
					success: function(data) {
						console.log(data);
						if (data['stream'] == null){
								$(targetDiv).append($('<a id="offline" target="_blank" href="'+channeLink+'"><span id="spanOffline">offline</span><p id="name" class="container-fluid"><img class="img-thumbnail" src="'+logo+'"><strong>'+channelName+'</strong><br><br>'+status+'</p></a>'));

						}else {
								$(targetDiv).append($('<a id="online" target="_blank" href="'+channeLink+'"><span id="spanOnline">online</span><p id="name" class="container-fluid"><img class="img-thumbnail" src="'+logo+'"><strong>'+channelName+'</strong><br><br>'+status+'</p></a>'));
						}
					},
				});	
			},
			error: function(data){
				var channeLink = data['url'];

				var status = data['status'];

				var logo = data['logo']


				var chStatus = "Sorry, this channel doesn't exist. Try different name.";
				$(targetDiv).append($('<a id="noChannel" target="_blank" href="'+channeLink+'"><span id="spanOffline">not found</span><p id="name" class="container-fluid"><img class="img-thumbnail" src="http://santirodriguez.es/wp-content/uploads/2016/04/no-videos.jpg"><strong>'+search+'</strong><br><br>'+chStatus+'</p></a>'));
			},
		});	
	});

	//FREE CODE CAMP AJAX
	$.ajax({
		type: 'GET',
		url: "https://api.twitch.tv/kraken/channels/freecodecamp",
		headers: {
			'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
		},
		success: function(data) {
			var targetDiv = "#streamFCC"
			var channeLink = data['url'];
			var status = data['status'];
			var logo = data['logo']
			var channelName = data['display_name'];
			$.ajax({
				type: 'GET',
				url: "https://api.twitch.tv/kraken/streams/freecodecamp",
				headers: {
					'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
				},
				success: function(data) {

					if (data['stream'] == null){
							$("#streamFCC").append($('<a id="offline" target="_blank" href="'+channeLink+'"><span id="spanOffline">offline</span><p id="name" class="container-fluid"><img class="img-thumbnail" src="'+logo+'"><strong>'+channelName+'</strong><br><br>'+status+'</p></a>'));

					}else {
							$("#streamFCC").append($('<a id="online" target="_blank" href="'+channeLink+'"><span id="spanOnline">online</span><p id="name" class="container-fluid"><img class="img-thumbnail" src="'+logo+'"><strong>'+channelName+'</strong><br><br>'+status+'</p></a>'));

					}
				},
			});	

		}
	});	

	//FEATURED CHANNELS AJAX
	
	$.ajax({
		type: 'GET',
		url: "https://api.twitch.tv/kraken/streams/featured",
		headers: {
			'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
		},
		success: function(data) {
			//array variable, we have to break the path to final objects in order to loop them

			//var image = data['featured'][0]['image'];
			for(i=0; i<5; i++){

			var channeLink = data['featured'][i]['stream']['channel']['url'];
			var status = data['featured'][i]['stream']['channel']['status'];
			var logo = data['featured'][i]['stream']['channel']['logo']
			var channelName = data['featured'][i]['stream']['channel']['display_name'];
			//creating stream containers and giving them a class number so i can modify them on the fly in future (i+1)
			$("#featured").append($('<a id="online" target="_blank" href="'+channeLink+'"><span id="spanOnline">online</span><p id="name" class="container-fluid"><img class="img-thumbnail" src="'+logo+'"><strong>'+channelName+'</strong><br><br>'+status+'</p></a>'));

			}
		}
	});		
	
		
	
});


