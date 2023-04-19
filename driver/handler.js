'use strict';

// const eventEmitter = require('../../eventPool');

function reportInTransit(payload) {
  console.log(`DRIVER: picked up order ${payload.orderId}`);
}

function reportDelivered(payload) {
  console.log(`DRIVER: delivered order ${payload.orderId}`);
}

module.exports = {
  reportInTransit,
  reportDelivered
};