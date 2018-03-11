// Make connection
var socket = io.connect('http://localhost:4000');

/*//var content = document.getElementById('content'),
  //    show = document.getElementById('show');


show.addEventListener('click',function(){
  //emits an event
  socket.emit('show', {
      elements:"hello"
  });
});

socket.on('show', function(data){
    content.innerHTML+=  data.elements ;
});*/
var a = [];
socket.on('click', function(data){
  console.log(socket.id);
  if(data._count%2==0)
  {
    a[data._id]="blue";
    $("#"+data._id).attr("style","background-color:blue;pointer-events:none");
  }
  else {
    a[data._id]="red";
    $("#"+data._id).attr("style","background-color:red;pointer-events:none");
  }
isGameOver();
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

function isGameOver()
{
  if(a[4]!=undefined &&((a[0]==a[4] && a[0]==a[8])||(a[2]==a[4]&&a[4]==a[6])))
  {
    setTimeout(function () {
        alert("gameover");
      }, 200);
$("button").attr("disabled","true");
  }
  var x=0;
  for(var i=0;i<=2;i++)
  {
  if((a[i]!=undefined && a[i+x]!=undefined) && ((a[i+x]==a[i+x+1] && a[i+x]==a[i+x+2]) ||(a[i]==a[i+3] && a[i]==a[i+6])))
  {
    setTimeout(function () {
        alert("gameover");
      }, 200);
      $("button").attr("disabled","true");
  }
  x+=2;
}
}
