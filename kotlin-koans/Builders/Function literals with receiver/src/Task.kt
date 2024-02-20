fun task(): List<Boolean> {
    // this と it の違いに注意
    // this：関数の呼び出し元となるオブジェクト
    // it：関数の引数（引数が 1 つの場合）
    // this.someFunction(it) という関係
    val isEven: Int.() -> Boolean = { this % 2 == 0 }
    val isOdd: Int.() -> Boolean = { this % 2 != 0 }

    return listOf(42.isOdd(), 239.isOdd(), 294823098.isEven())
}
