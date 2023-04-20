'use strict';

require('dotenv').config();

const { generatePayload, handleDelivered } = require('./flower-handler.js');

const { io } = require('socket.io-client');

// const SERVER_URL = 'https://caps-awvp.onrender.com' || process.env.SERVER_URL /*|| 'http://localhost:3001'*/;
const SERVER_URL = /*'https://caps-awvp.onrender.com' || process.env.SERVER_URL /*||*/ 'http://localhost:3001';


let capsSocket = io(SERVER_URL + '/caps');

// start by generating a payload
// send to entire namespace

// generatePayload();


capsSocket.emit('pickup', generatePayload());

// have the vendor join the room
capsSocket.on('pickup', (payload) => {
  capsSocket.emit('join-room', payload);
  console.log(`vendor connected to ${payload.store} room`);
});

// last thing, say thanks for order
// not complete
capsSocket.on('delivered', (payload) => {
  handleDelivered(payload);
});

// process.exit()
// end node process after order delivered