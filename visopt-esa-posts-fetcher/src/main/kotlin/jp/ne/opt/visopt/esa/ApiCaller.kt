package jp.ne.opt.visopt.esa

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.intOrNull
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

class ApiCaller {
    companion object ApiCaller {
        private val KEYS = listOf("number", "name", "created_at", "created_by", "wip")
        private const val POSTS_ENDPOINT = "https://api.esa.io/v1/teams/opt-technologies/posts?per_page=100"
        private val ACCESS_TOKEN = System.getenv("ESA_ACCESS_TOKEN")

        fun fetchPosts(): List<String> {
            val client = HttpClient.newHttpClient()

            val allPosts = mutableListOf<String>()
            var page: Int? = 1
            while (page != null) {
                val uri = URI.create("$POSTS_ENDPOINT&page=$page")
                val request = HttpRequest.newBuilder(uri).header(
                    "Authorization",
                    "Bearer $ACCESS_TOKEN"
                ).GET().build()

                val response = client.send(request, HttpResponse.BodyHandlers.ofString())
                val responseObject = Json.parseToJsonElement(response.body()).jsonObject

                val posts = responseObject["posts"]!!.jsonArray
                val postList = posts.toList().map {
                    val filteredMap = it.jsonObject.filterKeys(KEYS::contains).toMutableMap()

                    // created_by は name のみ抽出
                    filteredMap["created_by"] = filteredMap["created_by"]!!.jsonObject["name"]!!

                    JsonObject(filteredMap).toString()
                }
                allPosts.addAll(postList)

                page = responseObject["next_page"]!!.jsonPrimitive.intOrNull
            }

            return allPosts
        }
    }
}
