import { Player } from './player';
import { deleteRoom } from './rooms';
import { GameField } from './game-field';
import { IncomeCommands, OutcomeCommands } from './commands';

export class GameRoom {
  private firstPlayer: Player;
  private secondPlayer: Player;
  private field = new GameField();
  private repeatVotesNumber = 0;
  private isGameDone = false;

  constructor(public readonly id: number) {}

  setFirstPlayer(player: Player): void {
    this.firstPlayer = player;
    this.setPlayerHandlers(true);
  }

  setSecondPlayer(player: Player): void {
    this.secondPlayer = player;
    this.setPlayerHandlers(false);
  }

  private setPlayerHandlers(isFirstPlayer: boolean) {
    const first = isFirstPlayer ? this.firstPlayer : this.secondPlayer;

    first.on(IncomeCommands.ROOM_REPEAT_GAME, () => {
      this.repeatVotesNumber++;
      this.repeatIfPlayersVote();
    });

    first.on(IncomeCommands.ROOM_LEAVE, () => {
      this.onPlayerLeave(isFirstPlayer);
    });

    first.on(IncomeCommands.ROOM_TURN, (index: number) => {
      const second = isFirstPlayer ? this.secondPlayer : this.firstPlayer;

      if (!first.isTurnNow) {
        first.emit(OutcomeCommands.ROOM_ENEMY_TURN_NOW);
      }
      if (this.field.isVictoryTurn(index)) {
        this.onGameFinished();
        return;
      }
      if (!second) {
        first.emit(OutcomeCommands.ROOM_ENEMY_NOT_CONNECTED);
        return;
      }

      first.isTurnNow = false;
      second.isTurnNow = true;

      second.emit(OutcomeCommands.ROOM_TURN_NOW, {
        enemyTurnIndex: index,
      });
    });
    first.onDisconnect(() => {
      console.log('[room]: player disconnect:', first.name);
      this.onPlayerDisconnect();
    });
    this.checkPlayers();
  } 

  onPlayerDisconnect() {
    console.log('[room]: some player disconnected');
    if (this.firstPlayer && this.secondPlayer) {
      if (!this.firstPlayer.isConnected() && this.secondPlayer.isConnected()) {
        this.secondPlayer.emit(OutcomeCommands.ROOM_ENEMY_DISCONNECTED);
      } else if (!this.secondPlayer.isConnected() && this.firstPlayer.isConnected()) {
        this.firstPlayer.emit(OutcomeCommands.ROOM_ENEMY_DISCONNECTED);
      }
    }
    deleteRoom(this.id);
  }

  onPlayerLeave(isFirstPlayer: boolean) {
    if (isFirstPlayer) {
      this.secondPlayer.emit(OutcomeCommands.ROOM_ENEMY_DISCONNECTED);
    } else {
      this.firstPlayer.emit(OutcomeCommands.ROOM_ENEMY_DISCONNECTED);
    }
    deleteRoom(this.id);
  }

  checkPlayers() {
    if (this.firstPlayer && this.secondPlayer &&
      this.firstPlayer.isConnected() && this.secondPlayer.isConnected()
    ) {
      this.onGameStarted();
    }
  }

  repeatIfPlayersVote() {
    if (this.repeatVotesNumber === 2) {
      this.repeatVotesNumber = 0;
      this.field = new GameField();

      this.onGameStarted();
    }
  }

  broadcast(event: string, ...args: any[]) {
    this.firstPlayer.emit(event, ...args);
    this.secondPlayer.emit(event, ...args);
  }

  onGameStarted() {
    console.log(`[room-${this.id}]: started, win index:`, this.field.winningCellIndex);

    this.firstPlayer.isTurnNow = true;
    this.secondPlayer.isTurnNow = false;
    this.isGameDone = false;

    this.broadcast(OutcomeCommands.ROOM_GAME_STARTED);
    this.firstPlayer.emit(OutcomeCommands.ROOM_TURN_NOW, {
      enemyTurnIndex: null,
    });
  }

  onGameFinished() {
    this.broadcast(OutcomeCommands.ROOM_GAME_FINISHED, {
      winner: this.firstPlayer.isTurnNow ? this.firstPlayer.name : this.secondPlayer.name,
    });
    this.isGameDone = true;
    setTimeout(() => {
      if (this.isGameDone) {
        deleteRoom(this.id);
      }
    }, 15000);
  }
}
