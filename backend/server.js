require('dotenv').config();
const express = require('express');
const path = require('path');
const WebSocket = require('ws');

const app = express();
const httpPort = process.env.HTTP_PORT || 3000;
const wsPort = process.env.WS_PORT || 8080;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(httpPort, () => {
  console.log(`HTTP server is running on port ${httpPort}`);
});

const wss = new WebSocket.Server({ port: wsPort });

wss.on('connection', socket => {
  console.log('Client connected');
  socket.on('message', message => {
    console.log(`Received: ${message}`);
    // Broadcast the message to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on port', wsPort);