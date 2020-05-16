export interface IGameState {
  roomId: number;
  fieldSize: number;
  isTurnTime: boolean;
  isGameFinished: boolean;
  clickedCells: number[];
  isEnemyDisconnected: boolean,
  isWaitingEnemy: boolean,
  isRoomNotExist: boolean,
  winner?: string;
}