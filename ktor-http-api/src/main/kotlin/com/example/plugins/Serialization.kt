package com.example.plugins

import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.response.*

fun Application.configureSerialization() {
    // ContentNegotiation：リクエストの Accept ヘッダー（application/json など）を見て直列化する
    install(ContentNegotiation) {
        json()
    }
}
