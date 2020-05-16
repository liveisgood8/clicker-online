import { GameRoom } from './game-room';

let currentRoomIndex = 1;
const rooms: { [id: number]: GameRoom } = {};

export function createRoom() {
  const id = currentRoomIndex++;
  console.log('[rooms]: created, id:', id);

  const room = new GameRoom(id);
  rooms[id] = room;

  return room;
}

export function getRoom(id: number) {
  return rooms[id];
}

export function deleteRoom(id: number) {
  console.log('[rooms]: deleted, id:', id);
  delete rooms[id];
}
