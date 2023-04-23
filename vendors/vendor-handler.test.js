'use strict';

const { newWidgetOrder, confirmedWidgetDelivery } = require('./widget-handler');
const { newFlowerOrder, confirmedFlowerDelivery } = require('./flower-handler');
const socket = require('../clients');

const payload = {
  event: 'pickup',
  time: new Date(),
  payload: {
    store: 'Plant Heaven',
    orderId: '2468',
    customer: 'Laurel Perkins',
    address: '666 Hell Way'
  }
}

console.log = jest.fn();

describe('Testing widget vendor events', () => {
  test('Confirmed delivery', () => {
    confirmedWidgetDelivery(payload);

    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith('Order Number: 2468 has been delivered!')
    }, 2500);
  });
})

describe('Testing flower vendor events', () => {
  test('Confirmed delivery', () => {
    confirmedFlowerDelivery(payload);

    setTimeout(() => {
      expect(console.log).toHaveBeenCalledWith('Order Number: 2468 has been delivered!')
    }, 2500);
  });
})