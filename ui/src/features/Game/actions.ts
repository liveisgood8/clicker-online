import { createAction } from '@reduxjs/toolkit';
import { OutcomeCommands, IncomeCommands } from '../../app/socket/commands';

/** Payload - turn index */
export const turnDoneAction = createAction<number>('app/turn-done');

/** Outcome events */

interface ConnectToRoomRequest {
  roomId: number;
  name: string;
}

/** Payload - player name */
export const createRoomAction = createAction<string>(OutcomeCommands.CREATE_ROOM);
export const connectToRoomAction = createAction<ConnectToRoomRequest>(OutcomeCommands.CONNECT_TO_ROOM);
export const leaveFromRoomAction = createAction(OutcomeCommands.ROOM_LEAVE);
/** Payload - field cell index */
export const sendTurnAction = createAction<number>(OutcomeCommands.ROOM_TURN);
export const repeatGameAction = createAction(OutcomeCommands.ROOM_REPEAT_GAME);

/** Income events */

interface ConnectedAction {
  roomId: number;
  fieldSize: number;
}

interface GameFinishedAction {
  winner: string;
}

interface TurnAction {
  enemyTurnIndex?: number;
}

export const resetRoomExistAction = createAction('@internal/resetRootExist');
export const roomNotExistAction = createAction(IncomeCommands.ROOM_NOT_EXIST);
export const connectedAction = createAction<ConnectedAction>(IncomeCommands.ROOM_CONNECTED);
export const gameStartedAction = createAction(IncomeCommands.ROOM_GAME_STARTED);
export const gameFinishedAction = createAction<GameFinishedAction>(IncomeCommands.ROOM_GAME_FINISHED);
export const turnNowAction = createAction<TurnAction>(IncomeCommands.ROOM_TURN_NOW);
export const enemyTurnNowAction = createAction(IncomeCommands.ROOM_ENEMY_TURN_NOW); /** Not implemented */
export const enemyNotConnectedAction = createAction(IncomeCommands.ROOM_ENEMY_NOT_CONNECTED); /** Not implemented */
export const enemyDisconnectedAction = createAction(IncomeCommands.ROOM_ENEMY_DISCONNECTED);