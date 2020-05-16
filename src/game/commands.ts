import { eventWithCriteria } from '../config';

export const IncomeCommands = {
  CREATE_ROOM: eventWithCriteria('create-room'),
  CONNECT_TO_ROOM: eventWithCriteria('connect-to-room'),
  ROOM_TURN: eventWithCriteria('turn'),
  ROOM_REPEAT_GAME: eventWithCriteria('room-repeat-game'),
  ROOM_LEAVE: eventWithCriteria('room-leave'),
};

export const OutcomeCommands = {
  ROOM_NOT_EXIST: 'room-not-exist',
  ROOM_CONNECTED: 'room-connected',
  ROOM_GAME_STARTED: 'room-game-started',
  ROOM_GAME_FINISHED: 'room-game-finished',
  ROOM_ENEMY_TURN_NOW: 'room-enemy-turn-now',
  ROOM_TURN_NOW: 'room-turn-now',
  ROOM_ENEMY_NOT_CONNECTED: 'room-enemy-not-connected',
  ROOM_ENEMY_DISCONNECTED: 'room-enemy-disconnected',
};
