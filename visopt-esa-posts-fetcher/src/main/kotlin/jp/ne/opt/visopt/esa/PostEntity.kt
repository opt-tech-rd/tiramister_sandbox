package jp.ne.opt.visopt.esa

import kotlinx.serialization.Serializable

@Serializable
data class PostEntity(
    val number: ULong,
    val name: String,
    val wip: Boolean,
    val created_at: String,
    val tags: List<String>
)
