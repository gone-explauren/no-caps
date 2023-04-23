'use strict';

const socket = require('../clients');
const Chance = require('chance');
const chance = new Chance();

function newWidgetOrder(storeName) {
  let payload = {
    store: storeName,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address()
  }

  socket.emit('join', payload);
  socket.emit('pickup', payload);
}

function confirmedWidgetDelivery() {
  socket.on('delivered', (payload) => {
      console.log(`Order Number: ${payload.orderId} has been delivered!`);
  })
}

function getAllWidgetOrders() {
  socket.emit('getAll', { queue: 'pickupInbox' } )
}

module.exports = {
  newWidgetOrder,
  confirmedWidgetDelivery,
  getAllWidgetOrders
}