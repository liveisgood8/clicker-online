import { configureStore, ThunkAction, Action, getDefaultMiddleware, Middleware } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { createRootReducer } from './reducer';
import { socketHost, socketReduxCriteria } from './config';

export const history = createBrowserHistory()

export const socket = io(socketHost);
const socketMiddleware = createSocketIoMiddleware(socket, socketReduxCriteria);

export const store = configureStore({
  reducer: createRootReducer(history),
  middleware: [...getDefaultMiddleware(),
    routerMiddleware(history),
    socketMiddleware as Middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
