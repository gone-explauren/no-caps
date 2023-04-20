'use strict';

const Chance = require('chance');
const chance = new Chance();

function generatePayload() {
  return {
    "store": chance.company(),
    "orderId": chance.guid(),
    "customer": chance.name(),
    "address": chance.address()
  }
}

// const payload = {
//   store: '1-206-flowers',
//   orderId: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
//   customer: 'Jamal Braun',
//   address: 'Schmittfort, LA',
// }

// function sendPickup(socket, payload) {
// 	// console.log(emit)
// 	socket.emit('pickup', payload)
// }

function handleDelivered(payload) {
  console.log(`VENDOR: Thank you for delivering order ${payload.orderId} to ${payload.customer}`);
}

module.exports = {
  generatePayload,
  handleDelivered
};