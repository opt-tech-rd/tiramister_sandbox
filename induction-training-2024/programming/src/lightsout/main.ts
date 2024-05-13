import rl from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { Board } from "./board.js";
import { solve } from "./solve.js";
import { Play } from "./play.js";

/**
 * 標準入力からユーザーの手を読む。
 *
 * @param readline
 * @param size 盤面のサイズ。
 * @returns 入力された手。null なら降参。
 */
async function readPlay(
  readline: rl.Interface,
  size: number
): Promise<Play | null> {
  while (true) {
    const input = await readline.question(
      "反転させるマス（XX でギブアップ）："
    );

    if (input === "XX") return null;

    try {
      return Play.fromString(input, size);
    } catch (error) {
      console.error(error);
    }
  }
}

async function main() {
  const readline = rl.createInterface({ input: stdin, output: stdout });

  // 初期盤面を生成する
  const board = new Board(5);
  board.initialize();

  // 最適解を求める
  // 解けない盤面は生成していない
  const bestPlays = solve(board);
  if (bestPlays === null) {
    throw Error(
      `解なし
      ${board.toString}`
    );
  }

  let turnCount = 0;
  while (!board.isAllOff()) {
    ++turnCount;

    console.log(`ターン ${turnCount}`);
    console.log(board.toString());

    const play = await readPlay(readline, board.size);
    console.log();

    // ギブアップ
    if (play === null) break;

    board.flip(play.x, play.y);
  }

  if (board.isAllOff()) {
    console.log(`クリア！（${turnCount} 手）`);
    console.log(`想定解（${bestPlays.length} 手）：${bestPlays.join(" ")}`);
  } else {
    console.log(`ギブアップ！`);

    // ここからの最適解を求める
    // 途中から解けない盤面になることはない
    const plays = solve(board);
    if (plays === null) {
      throw Error(
        `解なし
        ${board.toString}`
      );
    }

    console.log(`ここからの解答例：${plays.join(" ")}`);
  }

  readline.close();
}

main();
