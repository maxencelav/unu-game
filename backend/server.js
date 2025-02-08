require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const WEBSOCKET_URL = process.env.WEBSOCKET_URL || 'ws://localhost:3000';

const WebSocket = require('ws');
const port = process.env.WS_PORT || 8080;
const server = new WebSocket.Server({ port });

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

http.listen(3000, () => {
  console.log(`Server is running on ${WEBSOCKET_URL}`);
});
