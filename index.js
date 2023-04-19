'use strict';
// socket.io server

require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');

const cors = require('cors');
app.use(cors);

const server = http.createServer(app);

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

const io = new Server(server);

server.listen(PORT, () => {
  console.log(`express listening on ${PORT}`);
});


// start server
io.on('connection', (socket) => {
  console.log('client has connected to server', socket.id);

	// accessible emitters:
  // socket.on('event', (payload) => {

  // emit back to same client that emitted event
  // socket.emit('event', payload);

  // notify entire server, including original emitter
  // io.emit('event', payload);

  // event broadcast syntax
  // emits to all clients except original emitter
  // socket.broadcast.emit('event', payload);

  // });
});


// hub logger function
const logEvent = (eventName, payload) => {
  console.log(
      `EVENT: {
      event: ${eventName},
      time: ${new Date()},
      payload: `, payload
  );
};

// create namespace for CAPS
let capsServer = io.of('/caps');

// turn on the namespace
capsServer.on('connection', (socket) => {
  // console.log('client connected to CAPS namespace ', socket.id);

  socket.on('join-room', (payload) => {
    socket.join(payload.roomId);
  });

  socket.on('pickup', (payload) => {
    logEvent('pickup', payload);
    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    logEvent('in-transit', payload);
    socket.broadcast.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    logEvent('delivered', payload);
    socket.broadcast.emit('delivered', payload);
  });

  // capsServer.to('room-Id').emit('pickup', payload);

});