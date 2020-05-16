import { socketReduxCriteria } from '../config';

export const OutcomeCommands = {
  CREATE_ROOM: socketReduxCriteria + 'create-room',
  CONNECT_TO_ROOM: socketReduxCriteria + 'connect-to-room',
  ROOM_TURN: socketReduxCriteria + 'turn',
  ROOM_REPEAT_GAME: socketReduxCriteria + 'room-repeat-game',
  ROOM_LEAVE: socketReduxCriteria  + 'room-leave',
};

export const IncomeCommands = {
  ROOM_NOT_EXIST: 'room-not-exist',
  ROOM_CONNECTED: 'room-connected',
  ROOM_GAME_STARTED: 'room-game-started',
  ROOM_GAME_FINISHED: 'room-game-finished',
  ROOM_ENEMY_TURN_NOW: 'room-enemy-turn-now',
  ROOM_TURN_NOW: 'room-turn-now',
  ROOM_ENEMY_NOT_CONNECTED: 'room-enemy-not-connected',
  ROOM_ENEMY_DISCONNECTED: 'room-enemy-disconnected',
};
