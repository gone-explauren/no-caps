'use strict';

const Chance = require('chance');
const chance = new Chance();

const { subscribe, trigger } = require('../clients');
const vendor = require('./flower-handler');

subscribe('join-room', console.log);
subscribe('in-transit', (payload) => {
  console.log('Your order is on the way, '+ payload.customer + '!');
});

trigger('join-room', payload);
trigger('pickup', payload);
subscribe('delivered', console.log);

vendor.getAll();
vendor.newOrder('flowers');
vendor.newOrder('flowers');
vendor.confirmedDelivery();