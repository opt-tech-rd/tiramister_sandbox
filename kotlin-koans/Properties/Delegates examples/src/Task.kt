// 多分 Groovy の Delegates と同じような機能
// 可読性下がりそうなので、使うとしても lazy だけにしたい
class LazyProperty(val initializer: () -> Int) {
    val lazyValue: Int by lazy {
        initializer()
    }
}
