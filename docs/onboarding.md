# Lab onboarding

The everyday Git workflow for an SDF monorepo, minus WebStorm and NetSuite.

## A. First time
1. Clone to a standard path: `cd ~/Projects`, then `gh repo clone OWNER/netsuite-git-lab`
2. `git config --global user.name` / `user.email` if this machine is new.

## B. Starting a piece of work
1. `git switch main`, then `git pull`
2. `git switch -c <prefix>/<package>-<thing>`, using one of these prefixes:
   `feature/`, `bug/`, `docs/` or `chore/` (e.g. `feat/demo-priority`)
3. Small commits, `<package>: <what changed>` messages.
4. Stay current: on your branch, `git fetch`, then `git merge origin/main`.
5. Finish: `git push -u origin HEAD`, open a PR, and after merge
   `git switch main`, `git pull`, then `git branch -d <branch>`.

## C. Multiple people
- Everyone has their own clone. `main` moves when a PR merges.
- Conflicts only happen when two branches edit the same file.
- Git can't see your NetSuite sandbox: tell your team which package you're deploying.
