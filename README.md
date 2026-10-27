# netsuite-git-lab

> **A practice repo for learning Git and GitHub.** It's shaped like a real NetSuite SuiteCloud (SDF)
> monorepo, but every file is a placeholder or a throwaway demo. Nothing here deploys anywhere
> (every `project.json` points at `LAB-DO-NOT-DEPLOY`). Break things freely.

Replace `YOURNAME` below with your first name, lowercase (e.g. `alex`), and `OWNER` with the
GitHub account that hosts this repo. Every command works in PowerShell and in Git Bash / Linux.

## Before you start

```bash
git --version          # 2.23 or newer (for git switch)
git config --global user.name  "<Your Name>"
git config --global user.email "<you@example.com>"
gh auth login          # sign in to GitHub from the terminal
```

To **push branches and open pull requests** you need to be a collaborator on this repo.
Ask the repo owner for an invite and accept it at https://github.com/notifications.
Anyone can clone and read it, since it's public.

---

## Round 1: Clone and look around

```bash
cd ~/Projects
gh repo clone districtem/netsuite-git-lab     # uses HTTPS or SSH, whichever you picked in gh
cd netsuite-git-lab
git status
git log --oneline
git branch -a
ls packages/apps
```

Notice: a local `main` *and* a remote-tracking `origin/main`. Same commit, for now.

---

## Round 2: Try to push straight to main (it should fail)

```bash
echo "<Your Name> was here" >> README.md
git commit -am "Sneaky edit to main"
git push                          # rejected: main is protected
git reset --hard origin/main      # throw the local commit away (it was never shared)
```

---

## Round 3: The real workflow: branch → commit → push → PR

```bash
git switch -c feat/YOURNAME-list
cp packages/account/src/Objects/customlist_lab_demo_priority.xml packages/apps/demo-notes/src/Objects/customlist_lab_demo_YOURNAME.xml
```

Edit the new file: change `scriptid` to `customlist_lab_demo_<Your Name>` and `<name>` to
something like `<Your Name>'s Snack Ranking`. Then:

```bash
git status
git add packages/apps/demo-notes/src/Objects/customlist_lab_demo_YOURNAME.xml
git commit -m "demo-notes: add <Your Name>'s list"
git push -u origin feat/YOURNAME-list
```

Open a pull request on GitHub. Ask your neighbour to review and approve it.

---

## Round 4: GitHub moved. Your laptop didn't.

Once a few PRs are merged:

```bash
git switch main
git status                        # "up to date"??  (Git only knows what it last fetched)
git fetch
git status                        # now: behind 'origin/main'
git log --oneline main..origin/main   # what's new on GitHub
git pull                          # local main catches up
ls packages/apps/demo-notes/src/Objects/    # everyone's lists appear
```

Lesson: `git status` never asks GitHub. `fetch` updates what Git knows; `pull` brings it into your branch.

---

## Round 5 (bonus): Everyone edits the same line

```bash
git switch main
git pull
git switch -c feat/<Your Name>-title
# edit packages/apps/demo-notes/src/FileCabinet/SuiteScripts/lab-demo-notes/lab_demo_sl.js
# change the TITLE line to: const TITLE = 'Lab Demo Notes: YOURNAME edition';
git commit -am "demo-notes: <Your Name>'s Suitelet title"
git push -u origin feat/YOURNAME-title
```

Open a PR. The facilitator merges ONE. Then everyone else:

```bash
git fetch
git merge origin/main             # CONFLICT in lab_demo_sl.js
git status
```

Open `lab_demo_sl.js`, keep the line you want, delete the `<<<<<<<`, `=======`, `>>>>>>>` markers, then:

```bash
git add -u
git commit --no-edit
git push
```

Your PR now shows no conflicts.

---

## Clean up

```bash
git switch main
git pull
git branch -d feat/<Your Name>-list feat/YOURNAME-title
```

## Escape hatches

| Oops | Fix |
|---|---|
| Which branch am I on? | `git status` (first line) or `git branch` |
| Throw away uncommitted edits | `git restore <file>` |
| Staged something by mistake | `git restore --staged <file>` |
| Mid-merge and want out | `git merge --abort` |
| "Your local changes would be overwritten" | `git stash`, switch/pull, then `git stash pop` |
| Committed on main by mistake (not pushed) | `git branch feat/x` then `git reset --hard origin/main` |
| `git branch -d` refuses | its PR isn't merged yet (or you haven't pulled main) |
| Windows PowerShell rejects `&&` | run the commands on separate lines |

---

## Layout

A typical SDF monorepo: one folder per independently deployable SuiteCloud project.

```
packages/
  apps/
    demo-notes/       small working demo (custom record, User Event, Suitelet)
    exports/          scheduled-script exports (placeholders)
    shift-schedule/   a larger app (placeholders)
  account/            shared, account-wide objects
docs/                 onboarding notes
```
