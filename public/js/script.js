$(document).ready(function(){
	// Init socket io
	var socket = io.connect();
	
	var user = window.prompt("Enter username:");
	$("#uname").val(user);
	socket.emit('newUser', user);

	$("#frmmsg").submit(function(){
		var msg = $("#msg").val();
		//console.log(msg);
		socket.emit('newMessage', {"msg" : msg, "to" : $("#to").val(), "from": $("#uid").val()});
		$("#msg").val('');
		return false;
	});

	socket.on('newMessage', function(obj){
		console.log(obj);
		$(".msglist").append('<div>'+obj.msg+'</div>');
	});

});