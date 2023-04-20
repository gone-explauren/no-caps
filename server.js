'use strict';
// socket.io server

require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http');
const MessageQueue = require('./MessageQueue');

const cors = require('cors');
app.use(cors);

const server = http.createServer(app);

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;

const io = new Server(server);

let pickupInbox = new MessageQueue();
let deliveredInbox = new MessageQueue();

// server.listen(PORT, () => {
//   console.log(`express listening on ${PORT}`);
// });

// start server
io.on('connection', (socket) => {
  console.log('client has connected to server', socket.id);

  // socket.on('join-group', (payload)=>{
  // 	// console.log('room joined!', payload);
  // 	socket.join(payload['store'])
  // });

  // // accessible emitters:
  // socket.on('event', payload) => {

  // // emit back to same client that emitted event
  // socket.emit('event', payload);

  // // notify entire server, including original emitter
  // io.emit('event', payload);

  // // event broadcast syntax
  // // emits to all clients except original emitter
  // socket.broadcast.emit('event', payload);
});


// hub logger function
const logEvent = (eventName, payload) => {
  console.log(
    `EVENT: {
      event: ${eventName},
      time: ${new Date()},
      payload: `, payload
  );
};

// create namespace for CAPS
let capsServer = io.of('/caps');


// turn on the namespace
capsServer.on('connection', (socket) => {
  // console.log('client connected to CAPS namespace ', socket.id);

  socket.on('join-room', (payload) => {
    socket.join(payload.store);

    // emit to the entire room
    capsServer.to(payload.store).emit('join-room', 'Client joined room! ' + socket.id);
  });


  socket.on('pickup', (payload) => {
    // check if there is any queue in pickups for this store
    let storeQueue = pickupInbox.read(payload.store);
    if (storeQueue) {
      storeQueue.store(payload.order, payload)

    // if no, then create one and add this payload to it
    } else {
      let newStoreQueue = new MessageQueue();
      newStoreQueue.store(payload.orderId, payload);
      pickupInbox.store(payload.store, newStoreQueue);
    }

    console.log(util.inspect(pickupInbox, false, null));

    // emit to everone EXCEPT the person who emitted the message
    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    capsServer.to(payload.store).emit('in-transit', payload);
  });


  socket.on('delivered', (payload) => {
    capsServer.to(payload.store).emit('delivered', payload);

    // move payload out of pickup queue and into delivered queue
    let storeQueue = pickupInbox.read(payload.store);

    // look at the nested object to find the order ID, then remove it
    let order = storeQueue.remove(payload.oderId);

    // do we have a queue in the delivered inbox?
    let storeDelivered = deliveredInbox.read(payload.store);
    if (storeDelivered) {
    
      // yes? add this payload to the queue
      storeDelivered.store(order.orderId, order)
    } else {

      // no? create a queue and add this payload to it
      let newStoreDelivered = new MessageQueue();
      newStoreDelivered.store(payload.orderId, order)
      deliveredInbox.store(payload.store, newStoreDelivered)
    }
    capsServer.to(payload.store).emit('delivered', payload);
  });


  socket.on('recieved', (payload) => {
    capsServer.to(payload.store).emit('recieved', payload);
  });


  // driver is checking for any pickups they missed
  socket.on('catchUp-pickUps', (payload) => {

    // store dependent, must be triggered with a store (see driver.js)
    // to be store agnostic, we could use a nested loop to go through all the orders for all stores
    // but that sounds hard so nah
    let stroePickUps = pickupInbox.read(payload.store);

    Object.values(stroePickUps.data).forEach(order => {
      socket.emit('pickup', order)
    })
  });
});

messages.on('connection', (socket) => {

  // client send a message
  socket.on('send', (payload) => {
    let recipientMessages = inbox.read(payload.recipientId);
    if (recipientMessages) {
      recipientMessages.store(payload.messageId, payload);
    } else {
      let recipientMessages = new MessageQueue();
      recipientMessages.store(payload.messageId, payload);
      inbox.store(payload.recipientId, recipientMessages);
    }
    console.log(inbox);
    messages.emit('send', payload);
  });

  socket.on('getMessages', (payload) => {
    let message = pickupInbox.read(payload.recipientId);
    // send notification
    socket.emit('getMessages', message);
  });

  socket.on('received', (payload) => {
    try {
      let recipientMessages = deliveredInbox.read(payload.recipientId);
      let message = recipientMessages.remove(payload.messageId);
      console.log(message);
      socket.emit('confirm-received', message);
    } catch (e) {
      socket.emit('received-error', 'Could not remove message');
    }
  });

});