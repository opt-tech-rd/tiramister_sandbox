class LazyProperty(val initializer: () -> Int) {
    var value: Int? = null

    val lazy: Int
        get() {
            // これが想定解なの大分微妙じゃないか
            if (value == null) {
                value = initializer()
            }
            return value!!
        }
}
