'use strict';

const { handleDelivered, generatePayload } = require('./handler');

let payload = null;

describe('Testing vendor functions', () => {
  test('Can generate a valid payload object', () => {
    payload = generatePayload();
    expect(payload.orderId).toBeTruthy();
  });

  test('Can handle a delivery', () => {
    console.log = jest.fn();
    handleDelivered(payload);
    expect(console.log).toHaveBeenCalled();
  });
});