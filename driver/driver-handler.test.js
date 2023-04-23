'use strict';

const { pickupOrder, droppedOff } = require('./handler');
const socket = require('../clients');

const payload = {
  event: 'pickup',
  time: new Date(),
  payload: {
    store: 'Bird Toys',
    orderId: '42069',
    customer: 'Laurel Perkins',
    address: '666 Hell Way'
  }
}

describe('Test Driver sockets', () => {
  test('Simulates pickup, emits in-transit', async () => {
    pickupOrder(payload)
    setTimeout(() => {
      expect(socket.emit).toHaveBeenCalledWith('in-transit', payload)
      expect(console.log).toHaveBeenCalledWith(`Order Number: 42069 picked up.`)
    }, 2500);
  })

  test('Simulates delivery, emits delivered', async () => {
    droppedOff(payload)
    setTimeout(() => {
      expect(socket.emit).toHaveBeenCalledWith('delivered', payload)
      expect(console.log).toHaveBeenCalledWith(`Order number: 42069 delivered.`)
    }, 2500);
  })
})