import { fieldSize } from '../config';

export class GameField {
  public readonly winningCellIndex = this.randomIntFromInterval(1, fieldSize * fieldSize - 1);


  /** Is player turn in winning cell */
  isVictoryTurn(index: number) {
    return this.winningCellIndex === index;
  }

  /** min and max is included */
  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}