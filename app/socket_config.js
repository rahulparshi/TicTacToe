// Make connection
var socket = io.connect('http://localhost:4000');
//User JSON
var user_json={}


socket.on('click', function(data){
  console.log(data);
  $("#"+data._id).attr("style",("background-color:"+data.color));
  board_hash[data._id]=socket.id;
  checkGame(data._id,socket.id);
  $("button").attr("disabled","true");
});

socket.on('enable',function(){
  $("button").removeAttr("disabled");
});

$(document).ready(function(){
  $( ".game_entity" ).click(function() {
    var id ={_id:this.id, _socketId:socket.id};
    socket.emit('click',id);
  });
});
