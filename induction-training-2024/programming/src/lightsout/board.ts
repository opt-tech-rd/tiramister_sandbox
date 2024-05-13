import { gacha, iota } from "../util.js";

/**
 * ゲームの盤面を表すクラス。
 */
export class Board {
  readonly size: number;
  // true なら消えている
  private board: Array<Array<boolean>>;

  private static adjacents = [
    [0, 0],
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  constructor(size: number, board?: Array<Array<boolean>>) {
    this.size = size;
    this.board = board
      ? structuredClone(board)
      : Array.from(new Array(size), () => new Array(size).fill(true));
  }

  clone(): Board {
    return new Board(this.size, this.board);
  }

  getCell(x: number, y: number): boolean {
    return this.board[x][y];
  }

  /**
   * ボードを初期化する。解けるものを必ず生成する。
   */
  initialize(): void {
    this.board = Array.from(new Array(this.size), () =>
      new Array(this.size).fill(true)
    );

    for (let x = 0; x < this.size; ++x) {
      for (let y = 0; y < this.size; ++y) {
        if (gacha(0.2)) this.flip(x, y);
      }
    }
  }

  /**
   * 指定したライトの周囲を反転させる。
   * @param x 行番号
   * @param y 列番号
   */
  flip(x: number, y: number): void {
    for (const [dx, dy] of Board.adjacents) {
      const nx = x + dx;
      const ny = y + dy;
      if (0 <= nx && nx < this.size && 0 <= ny && ny < this.size) {
        this.board[nx][ny] = !this.board[nx][ny];
      }
    }
  }

  /**
   * 全て消えている、すなわちクリアしているか。
   */
  isAllOff(): boolean {
    return this.board.every((row) => row.every((cell) => cell));
  }

  /**
   * 人が読みやすいよう、行番号と列番号付きで文字列に変換する。
   */
  toString(): string {
    const rows = new Array<string>();

    // 1 行目
    const columnIds = iota(this.size)
      .map((i) => ++i)
      .join("");
    rows.push(` |${columnIds}`);

    // 2 行目
    rows.push(`-+${"-".repeat(this.size)}`);

    for (const [index, row] of this.board.entries()) {
      const rowId = String.fromCharCode("A".charCodeAt(0) + index);
      const rowString = row.map((cell) => (cell ? "." : "O")).join("");
      rows.push(`${rowId}|${rowString}`);
    }

    return rows.join("\n");
  }
}
