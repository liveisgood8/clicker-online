import { History } from 'history';
import { connectRouter } from 'connected-react-router'
import { combineReducers } from '@reduxjs/toolkit';
import { gameReducer } from '../features/Game/reducer';

export const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  game: gameReducer,
});

