import { Player } from './player';
import { createRoom, getRoom } from './rooms';
import { fieldSize } from '../config';
import { emitAction } from '../utils';
import { IncomeCommands, OutcomeCommands } from './commands';

interface ConnectionRequest {
  roomId: number;
  name: string;
}

function onRoomCreate(socket: SocketIO.Socket, playerName: string) {
  const player = new Player(playerName, socket);

  const room = createRoom();
  room.setFirstPlayer(player);

  emitAction(socket, {
    type: OutcomeCommands.ROOM_CONNECTED,
    payload: {
      roomId: room.id,
      fieldSize,
    }
  });
}

function onConnectToRoom(socket: SocketIO.Socket, request: ConnectionRequest) {
  const { roomId, name } = request;

  const room = getRoom(roomId);
  if (!room) {
    emitAction(socket, {
      type: OutcomeCommands.ROOM_NOT_EXIST,
      payload: {
        roomId: roomId,
      }
    });
    return;
  }

  const player = new Player(name, socket);
  room.setSecondPlayer(player);

  emitAction(socket, {
    type: OutcomeCommands.ROOM_CONNECTED,
    payload: {
      roomId: room.id,
      fieldSize,
    }
  });
}

export function initializeSocketHandler(socket: SocketIO.Socket): void {
  socket.on('action', (data: { type: string; payload?: any }) => {
    console.log(data);
    switch (data.type) {
      case IncomeCommands.CREATE_ROOM:
        onRoomCreate(socket, data.payload);
        break;
      case IncomeCommands.CONNECT_TO_ROOM:
        onConnectToRoom(socket, data.payload);
        break;
    }
  });
}
