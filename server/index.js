'use strict';
// socket.io server

const Queue = require('./lib/queue');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const io = new Server(PORT);

let pickupInbox = new MessageQueue();
let deliveredInbox = new MessageQueue();

let caps = io.of('/caps');

// start server
caps.on('connection', (socket) => {
  //console.log('client has connected to server', socket.id);

  socket.on('join-group', (payload) => {
    socket.join(payload.store)
    caps.to(payload.store).emit('join-room', 'Client joined room! ' + socket.id);
  });

  socket.on('pickup', (payload) => {
    logEvent('pickup', payload);
    let storeQueue = pickupInbox.read(payload.store);
    if (storeQueue) {
      storeQueue.store(payload.orderId, payload);
    } else {
      let storeQueue = new MessageQueue();
      storeQueue.store(payload.orderId, payload);
      pickupInbox.store(payload.store, storeQueue);
    }
    console.log(util.inspect(pickupInbox, false, null));
    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    logEvent(payload.store).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    logEvent('delivered', payload);
    caps.to(payload.store).emit('delivered', payload)
  });

  socket.on('received', () => { 
    console.log("Pickup Inbox BEFORE: ", pickupInbox);
    console.log("Delivered Inbox BEFORE: ", deliveredInbox);
    
    let removeDelivered = deliveredInbox.data[payload.store].remove(payload.orderId);
    let vendorDeliveredQueue = vendorQueue.read(removeDevlivered.clientId);

    if(vendorDeliveredQueue) {
      vendorDeliveredQueue.store(removeDelivered.messageId, removeDelivered);
    } else {
      vendorDeliveredQueue = new Queue();
      vendorDeliveredQueue.store(removeDelivered.messageId, removeDelivered);
      vendorQueue.store(payload.store, vendorDeliveredQueue);
    }

    console.log("Pickup Inbox AFTER: ",pickupInox);
    console.log("Delivered Inbox AFTER: ", deliveredInbox);
    
    caps.to(payload.store).emit('received', generateOrder('received', payload))
   })

  // the driver is checking for any pickups that they missed
  socket.on('catchup-pickup', (payload) => {
    // store dependant
    let storePickups = pickupInbox.read(payload.store);
    Object.values(storePickups.data).forEach(order => {
      socket.emit('pickup', order);
    });
  });

  // socket.on('getAll', (payload) => {
  //   if (payload.queue === 'deliveredInbox') {
  //     Object.keys(deliveredInbox.data).forEach(store => {
  //       Object.keys(deliveredInbox.read(store).data).forEach(newPayload => {
  //         socket.emit('pickup', deliveredInbox.data[store].data[newPayload].order);
  //       })
  //     });
  //   } else if (payload.queue = 'pickupInbox') {
  //     Object.keys(pickupInbox.data).forEach(store => {
  //       Object.keys(pickupInbox.read(store).data).forEach(newPayload => {
  //         socket.emit('delivered', pickupInbox.data[store].data[newPayload].order);
  //       })
  //     });
  //   }
  // });
});

function logEvent(eventName, payload) {
  let log = {
    event: eventName,
    time: new Date(),
    payload: payload
  }

  console.log("EVENT:", log);
}

function generateOrder(event, payload) {
  let newPayload = {
    event: event,
    messageId: payload.orderId,
    clientId: payload.store,
    order: payload
  }

  return newPayload;
}