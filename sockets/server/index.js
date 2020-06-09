const WebSocket = require('ws')
 
const wss = new WebSocket.Server({ port: 8000 });
 
wss.on('connection', connection => {
  connection.on('message', message => {
    wss.clients.forEach(client => {
      client.send(message);
    })
  });
})
