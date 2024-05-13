/**
 * ゲームの手、つまりどのライトを押すかを表すクラス。
 */
export class Play {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static fromString(s: string, size?: number): Play {
    const x = s.charCodeAt(0) - "A".charCodeAt(0);
    const y = s.charCodeAt(1) - "1".charCodeAt(0);

    if (typeof x !== "number" || typeof y !== "number") {
      throw new Error(`不正な形式です（${s}）`);
    }

    if (x < 0 || (size !== undefined && size <= x)) {
      console.log(`行番号が範囲外です（${s.at(0)}）`);
    }
    if (y < 0 || (size !== undefined && size <= y)) {
      console.log(`列番号が範囲外です（入力：${s.at(1)}）`);
    }
    return new Play(x, y);
  }

  toString(): string {
    const rowId = String.fromCharCode("A".charCodeAt(0) + this.x);
    const columnId = String.fromCharCode("1".charCodeAt(0) + this.y);
    return `${rowId}${columnId}`;
  }
}
