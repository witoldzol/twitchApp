$(document).ready(function(){

	$("#button").on("click", function(){
		//empty previous element created by search
		$("#result").empty();
		//search bar value
		var search = $("#search").val();

		$.ajax({

			type: 'GET',
			url: "https://api.twitch.tv/kraken/channels/"+search+"",
			headers: {
				'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
			},
			success: function(data) {
				console.log(data);
				var targetDiv = "#result"
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
								$(targetDiv).append($('<p id="name" class="container-fluid"><img class="img-thumbnail" src="'+logo+'">'+channelName+'<br>'+status+'<br><br>Offline</p>'));

						}else {
								$(targetDiv).append($('<p id="name" class="container-fluid"><img class="img-thumbnail" src="'+logo+'">'+channelName+'<br>'+status+'<br><br>Online</p>'));

						}
					},
					

				});	

			},
			error: function(data){
				console.log(data);
				var targetDiv = "#result";
				$(targetDiv).append($('<div id="stream" class="target"><p>'+search+'</p><p id="notExist">Stream doesnt exist</p><div>'));
			},
		});	
	});
	

	
	//CREATES CHANNEL ELEMENT 
	function searchChannel(){
		$.ajax({
			type: 'GET',
			url: "https://api.twitch.tv/kraken/channels/"+search+"",
			headers: {
				'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
			},
			success: function(data) {
				$(targetDiv).append($('<p id="name" class="container-fluid"><img class="img-thumbnail" src="'+logo+'">'+channelName+'<br>'+status+'<br><br>'+test+'</p>'));
			},	
			error: function(data){
				var targetDiv = "#result";
				$(targetDiv).append($('<div id="stream" class="target"><p>'+search+'</p><p id="notExist">Stream doesnt exist</p><div>'));
			},
		});	
	}



	//old-----------


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
							$("#streamFCC").append($('<p id="name" class="container-fluid"><img class="img-thumbnail" src="'+logo+'">'+channelName+'<br>'+status+'<br><br>Offline</p>'));

					}else {
							$("#streamFCC").append($('<p id="name" class="container-fluid"><img class="img-thumbnail" src="'+logo+'">'+channelName+'<br>'+status+'<br><br>Online</p>'));

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
			$("#featured").append($('<p id="name" class="container-fluid"><img class="img-thumbnail" src="'+logo+'">'+channelName+'<br>'+status+'<br><br>Online</p>'));

			}
		}
	});		
	
		
	
});


