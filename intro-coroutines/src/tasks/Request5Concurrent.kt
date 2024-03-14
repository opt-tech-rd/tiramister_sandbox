package tasks

import contributors.*
import kotlinx.coroutines.*

suspend fun loadContributorsConcurrent(service: GitHubService, req: RequestData): List<User> =
    // coroutineScope 内でしか async は呼べない
    coroutineScope {
        val repos = service.getOrgRepos(req.org)
            .also { logRepos(req, it) }
            .bodyList()

        val deferreds = repos.map { repo ->
            async {
                log("starting loading for ${repo.name}")
                service
                    .getRepoContributors(req.org, repo.name)
                    .also { logUsers(repo, it) }
                    .bodyList()
            }
        }

        deferreds.awaitAll().flatten().aggregate()
    }