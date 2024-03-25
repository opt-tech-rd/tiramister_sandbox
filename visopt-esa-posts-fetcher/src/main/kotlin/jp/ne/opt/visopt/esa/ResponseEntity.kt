package jp.ne.opt.visopt.esa

import kotlinx.serialization.Serializable

@Serializable
data class ResponseEntity(val posts: List<PostEntity>)
