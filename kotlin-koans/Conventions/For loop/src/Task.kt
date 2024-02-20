// Iterator の実装方法を調べないと無理
// https://www.baeldung.com/kotlin/custom-range-iterator#color_iterator
class DateRange(val start: MyDate, val end: MyDate): Iterable<MyDate> {
    override fun iterator(): Iterator<MyDate> = object : Iterator<MyDate> {
        var date = start
        override fun hasNext(): Boolean = date <= end
        override fun next(): MyDate {
            val currentDate = date.copy()
            date = date.followingDate()
            return currentDate
        }
    }
}

fun iterateOverDateRange(firstDate: MyDate, secondDate: MyDate, handler: (MyDate) -> Unit) {
    for (date in firstDate..secondDate) {
        handler(date)
    }
}