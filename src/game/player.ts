import { emitAction } from '../utils';
import { socketCriteria } from '../config';

export class Player {
  private handlers: Array<{ type: string; handler: (...args: any[]) => void }> = [];

  constructor(
    public name: string,
    private internalSocket: SocketIO.Socket,
    public isTurnNow: boolean = false,
  ) {
    this.internalSocket.on('action', (action) => {
      console.log('[player]: name:', this.name, 'receive:', action);
      this.handlers.forEach((e) => {
        if (action.type === e.type) {
          e.handler(action.payload);
        }
      });
    });
  }

  on(actionType: string, listener: (...args: any[]) => void): void {
    this.handlers.push({
      type: actionType,
      handler: listener,
    });
  };

  onDisconnect(listener: () => void) {
    this.internalSocket.on('disconnect', listener);
  }

  emit(action: string, payload?: any) {
    console.log('[player]: name:', this.name, 'send:', { action, payload });
    emitAction(this.internalSocket, {
      type: action,
      payload,
    });
  }

  isConnected() {
    return this.internalSocket.connected;
  }
}