'use strict';

const { reportInTransit, reportDelivered } = require('./handler.js');

describe('Testing driver functions', () => {

  test('Can report order in transit', () => {
    let payload = {};
    console.log = jest.fn();
    reportInTransit(payload);
    expect(console.log).toHaveBeenCalled();
  });


  test('Can report order delivered', () => {
    let payload = {};
    console.log = jest.fn();
    reportDelivered(payload);
    expect(console.log).toHaveBeenCalled();
  });

});