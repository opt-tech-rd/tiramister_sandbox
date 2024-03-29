/*
 * This Kotlin source file was generated by the Gradle 'init' task.
 */
package jp.ne.opt.visopt

import jp.ne.opt.visopt.esa.ApiCaller
import kotlin.test.Test

class AppTest {
    @Test fun fetchPostsTest() {
        val posts = ApiCaller.fetchPosts()
        val postsString = posts.joinToString("\n")
        println(postsString)
        println(postsString.toByteArray(Charsets.UTF_8).size)
    }
}
