import { Board } from "./board.js";
import { Play } from "./play.js";

/**
 * 最適解を求める。
 *
 * @param board
 * @returns 手数が最小の手順。null なら解けない。
 */
export function solve(board: Board): Array<Play> | null {
  const size = board.size;

  let bestPlays: Array<Play> | null = null;
  for (let bits = 0; bits < 1 << size; ++bits) {
    const plays = new Array<Play>();
    const currentBoard = board.clone();

    // 1 行目は全探索
    for (let y = 0; y < size; ++y) {
      if (((bits >> y) & 1) !== 0) {
        plays.push(new Play(0, y));
        currentBoard.flip(0, y);
      }
    }

    // 2 行目以降は、押すべきか否かが上のマスから決まる
    for (let x = 1; x < size; ++x) {
      for (let y = 0; y < size; ++y) {
        if (!currentBoard.getCell(x - 1, y)) {
          plays.push(new Play(x, y));
          currentBoard.flip(x, y);
        }
      }
    }

    if (!currentBoard.isAllOff()) continue;

    const shortest: number = bestPlays?.length ?? Infinity;
    if (plays.length < shortest) bestPlays = plays;
  }

  return bestPlays;
}
