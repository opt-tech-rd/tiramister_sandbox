import Answer.*

enum class Answer { a, b, c }

// 前の問題のコードはアドホックな構文ではなく、Kotlin の構文から成っているということを伝えたいっぽい
val answers = mapOf<Int, Answer?>(
        1 to c, 2 to b, 3 to b, 4 to c
)
