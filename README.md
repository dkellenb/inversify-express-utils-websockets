# inversify-express-utils-websockets

This code report has the goal to show how inversify-express-utils can work with socket.io. Example code taken from https://github.com/inversify/inversify-express-example/tree/master/Basic .

1. `npm install`
2. `npm install ts-node -g`
3. `ts-node src/bootstrap.ts`

Now use web socket client (for example chrome plugin https://chrome.google.com/webstore/detail/dark-websocket-terminal/dmogdjmcpfaibncngoolgljgocdabhke to test it) with following connection string:

`ws://localhost:3000/socket.io/?EIO=3&transport=websocket`