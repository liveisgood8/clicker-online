import { Server } from 'http';
import express from 'express';
import { resolve } from 'path';
import io from 'socket.io';
import { initializeSocketHandler } from './game/socket-handler';

const app = express();
const server = new Server(app);
const socketServer = io(server);

const port = process.env.PORT || 8080;

const root = resolve('ui', 'build');
app.use(express.static(root));
app.use('*', (req, res) => {
  res.sendFile('index.html', { root });
});

socketServer.on('connection', (socket: SocketIO.Socket) => {
  initializeSocketHandler(socket);
});

server.listen(port, () => {
  console.log('server listening on port', port);
});

