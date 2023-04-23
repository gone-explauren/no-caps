'use strict';

const socket = require('../clients');

function pickupOrder() {
  socket.on('pickup', (payload) => {
    setTimeout(() => {
      console.log(`Order Number: ${payload.orderId} picked up.`)
      socket.emit('join', payload);
      socket.emit('received', payload);
      socket.emit('in-transit', payload);
    }, 2000)
  })
}

function droppedOff() {
  socket.on('in-transit', (payload) => {
    getAll();
    setTimeout(() => {
      console.log(`Order Number: ${payload.orderId} delivered.`)
      socket.emit('delivered', payload);
    }, 2000)
  })
}

function getAll() {
  socket.emit('getAll', { queue: 'driveredQueue' } )
}

module.exports = {
  pickupOrder,
  droppedOff,
  getAll
}