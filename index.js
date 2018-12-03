var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('../app/index');
});


var server = app.listen(process.env.PORT ||4000, function(){
    console.log('listening for requests on port 4000,');
});


//Color palette temporary
var Colors = ["#ff0000","#00ffff","#f0ffff","#00ffff","#f0ffff","#00ffff","#f0ffff","#00ffff","#f0ffff","#00ffff","#f0ffff"];

var waiting_rooms = [];
var connected_rooms = [];
var CONST_ROOM_PREFIX = "lobby_";
var room_suffix = 0;
// Static files
app.use(express.static('app'));
app.use(express.static('assets'));
// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

  var room_name = ""

    socket.color = Colors.pop();

    console.log('made socket connection ', socket.id);

    if(waiting_rooms.length == 0){
      room_name = CONST_ROOM_PREFIX+room_suffix;
      waiting_rooms.push(room_name);
      room_suffix++;
      console.log(room_name);
    }
    else{
      room_name = waiting_rooms.pop()
      connected_rooms.push(room_name);
      console.log(room_name);
    }

    socket.join(room_name);
    socket.room  = room_name;
    //Handle click event
    socket.on('click', function(id){
      var data ={_id:id._id,_socketId:id._socketId,room:socket.room,color:socket.color};
      console.log(data);
      io.sockets.to(socket.room).emit('click', data);
      socket.broadcast.to(socket.room).emit('enable');
    });
    socket.on('disconnect', function(){
       console.log('user disconnected');
     });

    socket.on('user_set', function(id){
      var data ={_id:id._id,_socketId:id._socketId,room:socket.room,color:socket.color,user_name:id.user_name};
      console.log(data);
      io.sockets.to(socket.room).emit('click', data);
      socket.broadcast.to(socket.room).emit('enable');
    });
});
