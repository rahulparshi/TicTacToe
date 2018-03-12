socket.on('user_set', function(data){
  console.log("from socket");
  console.log(data);
});

$( "#user-submit" ).click(function() {
	var user_name = $("#user_name").val();
	console.log(user_name);
	var data ={_id:this.id, _socketId:socket.id,user_name:user_name};
	socket.emit('user_set',data);
});