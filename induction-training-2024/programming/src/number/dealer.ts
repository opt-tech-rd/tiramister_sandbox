import rl from "node:readline/promises";
import { stdin } from "node:process";
import { setTimeout } from "node:timers/promises";
import { getRandomInteger } from "../util.js";

function decideAnswer(): number {
  return getRandomInteger(1, 99);
}

/**
 * プレイヤーが予想した数を、標準入力から読み取る。
 */
async function readGuess(readline: rl.Interface): Promise<number> {
  while (true) {
    console.error("");
    console.error("Guess: ");
    const input = await readline.question("");
    return Number(input);
  }
}

const results = ["correct", "small", "large"] as const;
type Result = (typeof results)[number];

const responses: Map<Result, string> = new Map([
  ["correct", "="],
  ["small", "<"],
  ["large", ">"],
]);

function judge(answer: number, guess: number): Result {
  if (guess === answer) {
    return "correct";
  } else if (guess < answer) {
    return "small";
  } else {
    return "large";
  }
}

async function main() {
  const readline = rl.createInterface({ input: stdin });

  const answer = decideAnswer();

  let turnCount = 0;
  while (true) {
    turnCount++;

    const guess = await readGuess(readline);

    const result = judge(answer, guess);

    // 相手が入力待ちになってから出力したいので、少し待つ
    await setTimeout(100);
    console.log(responses.get(result));
    console.error(`${guess} ${responses.get(result)} X`);

    if (result === "correct") break;
  }

  console.error(`ターン数：${turnCount}`);

  readline.close();
}

main();
