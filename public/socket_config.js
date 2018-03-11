// Make connection
var socket = io.connect('http://localhost:4000');
//User JSON
var user_json={}

 socket.on('connect', function(data) { 
    //console.log(data);
 });

socket.on('click', function(data){
  $("#"+data._id).attr("style",("background-color:"+data.color));
  board_hash[this.id]=socket.id;
  checkGame(this.id,socket.id)
$("button").attr("disabled","true");

});

socket.on('enable',function(){
  $("button").removeAttr("disabled");
});

$(document).ready(function(){

  $(".box").click(function(){
    var id ={_id:this.id, _socketId:socket.id};
    //console.log(id);
    socket.emit('click',id);
  });
});

