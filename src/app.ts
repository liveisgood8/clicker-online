import { Server } from 'http';
import io from 'socket.io';
import { initializeSocketHandler } from './game/socket-handler';

const server = new Server();
const socketServer = io(server);

const port = process.env.PORT || 8080;

socketServer.on('connection', (socket: SocketIO.Socket) => {
  initializeSocketHandler(socket);
});

server.listen(port, () => {
  console.log('server listening on port', port);
});
