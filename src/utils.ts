export function emitAction(socket: SocketIO.Socket, action: { type: string; payload?: any }) {
  socket.emit('action', action);
}