package jp.ne.opt.visopt

import com.google.cloud.functions.HttpFunction
import com.google.cloud.functions.HttpRequest
import com.google.cloud.functions.HttpResponse
import jp.ne.opt.visopt.esa.ApiCaller

class App : HttpFunction {
    override fun service(request: HttpRequest, response: HttpResponse) {
        response.setContentType("application/jsonl; charset=utf-8")

        val posts = ApiCaller.fetchPosts()
        val postsString = posts.joinToString("\n")
        response.writer.write(postsString)
    }
}
