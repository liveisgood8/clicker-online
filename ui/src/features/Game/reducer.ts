import { createReducer } from '@reduxjs/toolkit';
import {
  connectedAction,
  turnNowAction,
  turnDoneAction,
  gameFinishedAction,
  createRoomAction,
  connectToRoomAction,
  enemyDisconnectedAction,
  gameStartedAction,
  repeatGameAction,
  roomNotExistAction,
} from './actions';
import { IGameState } from './types';

const initialState: IGameState = {
  roomId: 0,
  fieldSize: 0,
  isTurnTime: false,
  clickedCells: [],
  isGameFinished: false,
  isEnemyDisconnected: false,
  isWaitingEnemy: true,
  isRoomNotExist: false,
}

export const gameReducer = createReducer<IGameState>(initialState, (builder) => {
  builder
    .addCase(roomNotExistAction, (state) => ({
      ...state,
      isRoomNotExist: true,
    }))
    .addCase(connectedAction, (state, action) => ({
      ...state,
      roomId: action.payload.roomId,
      fieldSize: action.payload.fieldSize,
    }))
    .addCase(createRoomAction, () => initialState)
    .addCase(connectToRoomAction, () => initialState)
    .addCase(gameStartedAction, (state) => ({
      ...initialState,
      roomId: state.roomId,
      fieldSize: state.fieldSize,
      isWaitingEnemy: false,
    }))
    .addCase(gameFinishedAction, (state, action) => ({
      ...state,
      winner: action.payload.winner,
      isGameFinished: true,
      isTurnTime: false,
    }))
    .addCase(repeatGameAction, (state) => ({
      ...state,
      isGameFinished: false,
      isWaitingEnemy: true,
    }))
    .addCase(turnNowAction, (state, action) => {
      const updatedClickedCells = action.payload.enemyTurnIndex != null ? 
        state.clickedCells.concat(action.payload.enemyTurnIndex) :
        state.clickedCells;

      return {
        ...state,
        isTurnTime: true,
        clickedCells: updatedClickedCells,
      }
    })
    .addCase(turnDoneAction, (state, action) => ({
      ...state,
      isTurnTime: false,
      clickedCells: state.clickedCells.concat(action.payload),
    }))
    .addCase(enemyDisconnectedAction, (state) => ({
      ...state,
      isEnemyDisconnected: true,
    }));
});