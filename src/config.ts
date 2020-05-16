export const fieldSize = 5;

export const socketCriteria = 'game-socket/';
export function eventWithCriteria(name: string) {
  return socketCriteria + name;
}