const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// variables de entorno
const { PORT } = require('./config/index.config');

// routes
app.use(require('./routes/index.routes'));

// init socket
io.on('connection', (socket) => {
    
    console.log('Usuario Conectado Id: ' + socket.id);

    socket.broadcast.emit('idSocket', socket.id); // identificar usuario

    socket.on('newMessage', (msj)=>{
        io.emit('newMessage', msj);
    });

    socket.on('disconnect', function() {
        console.log('Usuario Desconectado ' + socket.id);
    });

});

// init server
http.listen(PORT, () => {console.log(`SERVER RUNING ON PORT ${PORT}`)});