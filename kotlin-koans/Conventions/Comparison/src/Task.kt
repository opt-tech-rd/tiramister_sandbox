data class MyDate(val year: Int, val month: Int, val dayOfMonth: Int) : Comparable<MyDate> {
    /*
    override fun compareTo(other: MyDate): Int {
        return if (year != other.year) {
            if (year < other.year) -1 else 1
        } else if (month != other.month) {
            if (month < other.month) -1 else 1
        } else if (dayOfMonth != other.dayOfMonth) {
            if (dayOfMonth < other.dayOfMonth) -1 else 1
        } else {
            0
        }
    }
    */

    override fun compareTo(other: MyDate) = when {
        year != other.year -> year - other.year
        month != other.month -> month - other.month
        else -> dayOfMonth - other.dayOfMonth
    }
}

fun test(date1: MyDate, date2: MyDate) {
    // this code should compile:
    println(date1 < date2)
}
