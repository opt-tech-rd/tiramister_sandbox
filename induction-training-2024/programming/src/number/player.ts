import rl from "node:readline/promises";
import { stdin, stderr, stdout } from "node:process";
import { setTimeout } from "node:timers/promises";

const results = ["correct", "small", "large"] as const;
type Result = (typeof results)[number];

const responses: Map<Result, string> = new Map([
  ["correct", "="],
  ["small", "<"],
  ["large", ">"],
]);

/**
 * 数を予想した結果を、標準入力から読む。
 */
async function readResult(
  readline: rl.Interface,
  guess: number
): Promise<Result> {
  // 相手が入力待ちになってから出力したいので、少し待つ
  await setTimeout(100);
  console.log(guess);

  // プロンプト
  console.error("");
  console.error(`${guess} ? X (<, =, or >): `);

  while (true) {
    const input = await readline.question("");

    for (const [result, message] of responses.entries()) {
      if (input === message) {
        return result;
      }
    }
    console.error(`<, =, > のいずれかを入力してください (入力：${input})`);
  }
}

async function main() {
  const readline = rl.createInterface({ input: stdin });

  let turnCount = 0;

  // 半開区間 [lower, upper) に解がある
  let lower = 1;
  let upper = 100;

  let accepted = false;
  while (!accepted) {
    turnCount++;

    const guess = Math.floor((lower + upper) / 2);

    const result = await readResult(readline, guess);
    switch (result) {
      case "correct":
        accepted = true;
        break;
      case "small":
        // [guess + 1, large)
        lower = guess + 1;
        break;
      case "large":
        // [lower, guess)
        upper = guess;
        break;
    }
  }

  console.error(`ターン数：${turnCount}`);

  readline.close();
}

main();
