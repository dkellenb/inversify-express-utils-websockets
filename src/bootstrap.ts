import 'reflect-metadata';
import { interfaces, Controller, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import { Kernel } from 'inversify';
import * as bodyParser from 'body-parser';
import TYPES from './constant/types';
import TAGS from './constant/tags';
import { HomeController } from './controller/home';
import { UserController } from './controller/user';
import { UserService } from './service/user';
import * as socketIo from 'socket.io';

// load everything needed to the kernel
let kernel = new Kernel();

kernel.bind<interfaces.Controller>(TYPE.Controller).to(HomeController).whenTargetNamed(TAGS.HomeController);
kernel.bind<interfaces.Controller>(TYPE.Controller).to(UserController).whenTargetNamed(TAGS.UserController);
kernel.bind<UserService>(TYPES.UserService).to(UserService);

// start the server
let server = new InversifyExpressServer(kernel);
server.setConfig((app) => {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

// server.build() actually returns an Express.Application instance
let app = server.build();
app.listen(3000);
console.log('Server started on port 3000 :)');

// socket.io expects an http.Server versus a InversifyExpressServer
// see http://socket.io/docs/#using-with-express-3/4
let httpServer = require('http').createServer(app);
let io = socketIo(httpServer);
io.on('connection', (client) => {
  console.log('Client connection opened');

  // Success!  Now listen to messages to be received
  client.on('message', (event) => console.log('Received message from client!', event));
  client.on('disconnect', (event) => console.log('Client has disconnected'));

});