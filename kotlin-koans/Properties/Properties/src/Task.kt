class PropertyExample() {
    var counter = 0
    var propertyWithCounter: Int? = null
        set(value) {
            // propertyWithCounter = value
            // だと無限再帰になるので、field を使う
            field = value
            counter++
        }
}
