var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));
var waitingForPartner = null;
var count=0;
// Socket setup & pass server
var io = socket(server);
io.on('connection', (socket) => {

console.log(socket);
    if(!waitingForPartner)
    {
      waitingForPartner = socket
    }
    console.log('made socket connection ', socket.id);

   // Handle show event
    socket.on('show', function(data){
        io.sockets.emit('show', data);
    });

    //Handle click event
    socket.on('click', function(id){
    //  console.log(id);
      var data ={_id:id._id,_count:count,_socketId:id._socketId};
      console.log(data);
      io.sockets.emit('click', data);
      socket.broadcast.emit('enable');
      count++;
    });
/*    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });*/

    socket.on('disconnect', function(){
       console.log('user disconnected');
     });
});
