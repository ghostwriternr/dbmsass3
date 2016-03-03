## DBMS Assignment 3
### Course Management System

### Studious | STUDY + DISCOVER

#### Functionality
- Supports 4 types of users, _student_, _faculty_, _parent_ and _administrator_. New account can be created only for the first 3.
- *Student*s can register, view, and access courses, and send/receive messages from faculty.
- *Faculty* can create, access and edit courses on the fly.
- *Parent*s have to be approved by the _student_ and will have access to their wards' performance and course completion repirts.
- *Admin* is the system administrator and has superuser access to various corners of the system.

#### Key Features
- The site takes full advantage of [Twitter Bootstrap](http://getbootstrap.com/) and is fully responsive.
- The core functionality is built upon the MEAN Stack ([mongoDB](https://www.mongodb.org/), [Express](http://expressjs.com/), [AngularJS](https://angularjs.org/) and [Node.js](https://nodejs.org/en/)).
- Messages and Notifications are updated in real-time using [socket.io](http://socket.io/).

#### Steps to run:
- After cloning into the repository, use `npm install` to install all the dependencies.
- Run `mongod`, if it isn't already.
- Start the app with `node server.js`.
- The app should now be running on `http://localhost:3008`.