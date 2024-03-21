package tasks

import contributors.*
import kotlinx.coroutines.async
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch

suspend fun loadContributorsChannels(
    service: GitHubService,
    req: RequestData,
    updateResults: suspend (List<User>, completed: Boolean) -> Unit
) {
    coroutineScope {
        val repos = service.getOrgRepos(req.org)
            .also { logRepos(req, it) }
            .bodyList()

        val usersChannel = Channel<List<User>>()

        // consumer: チャンネルからユーザーを受け取り、画面を更新する
        launch {
            var allUsers = emptyList<User>()
            repeat(repos.size) {
                val users = usersChannel.receive()
                allUsers = (allUsers + users).aggregate()
                updateResults(allUsers, it == repos.lastIndex)
            }
        }

        // receiver: ユーザーを取得し、チャンネルに送る
        for (repo in repos) {
            launch {
                val users = service
                    .getRepoContributors(req.org, repo.name)
                    .also { logUsers(repo, it) }
                    .bodyList()
                usersChannel.send(users)
            }
        }

        // Structured concurrency により、全てのコルーチンが終了するまで待つ
    }
}
