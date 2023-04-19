'use strict';

require('dotenv').config();

const { io } = require('socket.io-client');
const { reportInTransit, reportDelivered } = require('./handler.js');
// const SERVER_URL = 'https://caps-awvp.onrender.com' || process.env.SERVER_URL /*|| 'http://localhost:3001'*/;

const SERVER_URL = /*'https://caps-awvp.onrender.com' || process.env.SERVER_URL /*||*/ 'http://localhost:3001';


let capsSocket = io(SERVER_URL + '/caps');

// respond to pickup
capsSocket.on('pickup', (payload) => {
  capsSocket.emit('join-room', payload);
  console.log(`driver connected to ${payload.store} room`);
});

// report moving
capsSocket.on('pickup', (payload) => {
  reportInTransit(payload);
  capsSocket.timeout(10000).emit('in-transit', payload);
  reportDelivered(payload);
  capsSocket.timeout(20000).emit('delivered', payload);
});