import java.util.*
import java.util.function.Predicate

fun <T> Iterable<T>.partitionTo(trues: MutableCollection<T>, falses: MutableCollection<T>, predicate: (T) -> Boolean): Pair<Collection<T>, Collection<T>> {
    forEach {
        if (predicate(it)) {
            trues.add(it)
        } else {
            falses.add(it)
        }
    }
    return Pair(trues, falses)
}

fun partitionWordsAndLines() {
    val (words, lines) = listOf("a", "a b", "c", "d e")
            .partitionTo(ArrayList(), ArrayList()) { s -> !s.contains(" ") }
    check(words == listOf("a", "c"))
    check(lines == listOf("a b", "d e"))
}

fun partitionLettersAndOtherSymbols() {
    val (letters, other) = setOf('a', '%', 'r', '}')
            .partitionTo(HashSet(), HashSet()) { c -> c in 'a'..'z' || c in 'A'..'Z' }
    check(letters == setOf('a', 'r'))
    check(other == setOf('%', '}'))
}
