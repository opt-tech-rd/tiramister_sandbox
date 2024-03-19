package tasks

import contributors.*

suspend fun loadContributorsProgress(
    service: GitHubService,
    req: RequestData,
    updateResults: suspend (List<User>, completed: Boolean) -> Unit
) {
    val repos = service.getOrgRepos(req.org)
        .also { logRepos(req, it) }
        .bodyList()

    val allUsers = repos.foldIndexed(emptyList<User>()) { index, accUsers, repo ->
        val users = service
            .getRepoContributors(req.org, repo.name)
            .also { logUsers(repo, it) }
            .bodyList()

        val nextAccUsers = (accUsers + users).aggregate()
        updateResults(nextAccUsers, index == repos.lastIndex)
        nextAccUsers
    }
}
