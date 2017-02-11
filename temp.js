//makes a call and searches streams api to see if channel is online
var test ='';
function checkIfOnline(searchChannel){
	var search = $("#search").val();
	$.ajax({
		type: 'GET',
		url: "https://api.twitch.tv/kraken/streams/"+search+"",
		headers: {
			'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
		},
		success: function(data) {
			if (data['stream'] == null){
				
				test = "Offline";
				searchChannel();
				
			}else {
				test = "Online";
				searchChannel();
			}
		}
	
	});	
}
$("#button").on("click", function(){
	$("#result").empty();

	var search = $("#search").val();

	//call for a searched channel
	$.ajax({
		type: 'GET',
		url: "https://api.twitch.tv/kraken/channels/"+search+"",
		headers: {
			'Client-ID': "4rbydljvsruh725vzyflpl3dpurhpa"
		},
		success: function(data) {
			var search = $("#search").val();
			var targetDiv = "#result";
			var channeLink = data['url'];
			var status = data['status'];
			var logo = data['logo']
			var channelName = data['display_name'];
			$(targetDiv).append($('<p id="name" class="container-fluid"><img class="img-thumbnail" src="'+logo+'">'+channelName+'<br>'+status+'<br><br>'+test+'</p>'));
		
			
		//fix this
		},
		error: function(data){
			var targetDiv = "#result";
			$(targetDiv).append($('<div id="stream" class="target"><p>'+search+'</p><p id="notExist">Stream doesnt exist</p><div>'));
		},


	});
});
