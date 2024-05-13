/**
 * 指定した範囲内の整数を乱択する。
 * @param min 最小値（含む）
 * @param max 最大値（含む）
 */
export function getRandomInteger(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

/**
 * 指定した確率で true を返す。
 * @param probability true を返す確率。
 */
export function gacha(probability: number): boolean {
  return Math.random() < probability;
}

/**
 * 0 から n-1 を含む配列。
 */
export function iota(n: number): Array<number> {
  return Array.from(Array(n).keys());
}
