# Code Academy Postal Service

##  Lab-11: Event Driven Applications
* CAPS Phase 1: Begin the build of an application for a product called CAPS - The Code Academy Parcel Service. In this sprint, we’ll build out a system that emulates a real world supply chain. CAPS will simulate a delivery service where vendors (such a flower shops) will ship products using our delivery service and when our drivers deliver them, each vendor will be notified that their customers received what they purchased.

* This will be an event driven application that “distributes” the responsibility for logging to separate modules, using only events to trigger logging based on activity.

* The following user/developer stories detail the major functionality for this phase of the project.
  * As a vendor, I want to alert the system when I have a package to be picked up.
  * As a driver, I want to be notified when there is a package to be delivered.
  * As a driver, I want to alert the system when I have picked up a package and it is in transit.
  * As a driver, I want to alert the system when a package has been delivered.
  * As a vendor, I want to be notified when my package has been delivered.
  
* And as developers, here are some of the development stories that are relevant to the above.
  * As a developer, I want to use industry standards for managing the state of each package.
  * As a developer, I want to create an event driven system so that I can write code that happens in response to events, in real time.

### UML
* ![events-uml](https://user-images.githubusercontent.com/123340286/233728468-072d8321-c484-43a2-82a8-cd10e04966bf.png)

## Lab-12: Socket.IO
* CAPS Phase 2: Continue working on a multi-day build of our delivery tracking system, creating an event observable over a network with Socket.io.

* In this phase, we’ll be moving away from using Node Events for managing a pool of events, instead refactoring to using the Socket.io libraries. This allows communication between Server and Client applications.

* The intent here is to build the data services that would drive a suite of applications where we can see pickups and deliveries in real-time.

* The core functionality we’ve already built remains the same. The difference in this phase is that we’ll be creating a networking layer. As such, the user stories that speak to application functionality remain unchanged, but our developer story changes to reflect the work needed for refactoring.
  * As a vendor, I want to alert the system when I have a package to be picked up.
  * As a driver, I want to be notified when there is a package to be delivered.
  * As a driver, I want to alert the system when I have picked up a package and it is in transit.
  * As a driver, I want to alert the system when a package has been delivered.
  * As a vendor, I want to be notified when my package has been delivered.
 
* And as developers, here is our updated story relevant to the above.
  * As a developer, I want to create network event driven system using Socket.io so that I can write code that responds to events originating from both servers and client applications
 
 ### UML
* ![socket-io-uml](https://user-images.githubusercontent.com/123340286/233728512-297cad73-557d-48d7-a5e2-d04647254b7a.png)

 ## Message Queues
* CAPS Phase 3: Complete work on a multi-day build of our delivery tracking system, adding queued delivery.

* In this phase, we are going to implement a system to guarantee that notification payloads are read by their intended subscriber. Rather than just triggering an event notification and hope that client applications respond, we’re going to implement a “Queue” system so that nothing gets lost. Every event sent will be logged and held onto by the server until the intended recipient acknowledges that they received the message. At any time, a subscriber can get all of the messages they might have missed.

* In this final phase, we’ll be implementing a “Queue” feature on the Server, allowing Driver and Vendor clients to subscribe to messages added for pickup and delivered events within their respective client queues.

* Here are the high level stories related to this new set of requirements.
  * As a vendor, I want to “subscribe” to “delivered” notifications so that I know when my packages are delivered.
  * As a vendor, I want to “catch up” on any “delivered” notifications that I might have missed so that I can see a complete log.
  * As a driver, I want to “subscribe” to “pickup” notifications so that I know what packages to deliver.
  * As a driver, I want to “catch up” on any “pickup” notifications I may have missed so that I can deliver everything.
  * As a driver, I want a way to “scan” a delivery so that the vendors know when a package has been delivered.

* And as developers, here are some of the development stories that are newly relevant to the above.
  * As a developer, I want to create a system of tracking who is subscribing to each event.
  * As a developer, I want to place all inbound messages into a “queue” so that my application knows what events are to be delivered.
  * As a developer, I want to create a system for communicating when events have been delivered and received by subscribers.
  * As a developer, I want to delete messages from the queue after they’ve been received by a subscriber, so that I don’t re-send them.
  * As a developer, I want to create a system for allowing subscribers to retrieve all undelivered messages in their queue.
 
### UML
* ![message-queue-uml](https://user-images.githubusercontent.com/123340286/233728572-c9c15a8f-d0b8-4290-9a46-340624df8e51.png)
