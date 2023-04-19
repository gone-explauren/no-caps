'use strict';

require('dotenv').config();

const { io } = require('socket.io-client');
const { reportInTransit, reportDelivered } = require('./driver-handler.js');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';

let capsSocket = io(SERVER_URL + '/caps');

// respond to pickup
capsSocket.on('pickup', (payload) => {
  reportInTransit(payload);
  capsSocket.emit('in-transit', payload);
  reportDelivered(payload);
  capsSocket.emit('delivered', payload);
});