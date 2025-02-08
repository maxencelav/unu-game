require('dotenv').config();

const WebSocket = require('ws');
const port = process.env.WS_PORT || 8080;
const server = new WebSocket.Server({ port: port });

server.on('connection', socket => {
  console.log('Client connected');
  socket.on('message', message => {
    console.log(`Received: ${message}`);
    // Broadcast the message to all clients
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
console.log('WebSocket server is running on port', port);