---
title: Rewriting Your Git History | Amittai
subtitle: Rewriting History
category:
  - long-form
  - devops
draft: false
layout: article
date: 2023-09-06 23:00:00
navigation: false

head:
  meta:
    - name: 'keywords'
      content: 'writing, poetry, moments, darkness'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Amittai'
---

If you write software, then you should be using version control tools such as `git`.
However, if you follow [`git` best practices][git-best-practices],
you probably often find yourself staring at a git history that looks like this:

```bash
λ> git log --oneline
gshk3j2 (HEAD -> feature-X-branch) update README to document feature X
wxyz123 final clean-up. 
opqrstu fix random other thing (we hope!).
ghijklm refactored, but random other thing broke
k8l9m0n oh I see, I can refactor this into...
g5h6i7j clean up
c2d3e4f ahh it's working now but it's messy
y9z0a1b why is this still broken? try alternate fix
q3r4s5t fix bug edge-case
e4f5g6h fix bug
a1b2c3d add new feature X
```

## What's the Problem?

It is hard to follow along with the history of the project,
especially when several such histories accumulate over a project's lifetime.
All the commits were building toward a single feature,
and it would be nice to have a more coherent history of that feature.

::alert
---
type: info
title: note
---
This is not about whether one should or shouldn't edit and clean up their commit history;
this is about _how one can edit their commit history, if they want to_.
::

## Preparing to Edit

You should be comfortable with [what a rebase is][rebase].
It also helps if you understand [merges][merge] and how
merges and rebases differ.
You should also be comfortable with a console-based text editor
such as [vim][vim] or [emacs][emacs] &mdash; [but if you're not,
don't worry about it][dont-worry-about-it].

## Starting

The idea is to use an interactive rebase to squash _select_ commits
into a single commit. We also need to specify the earliest commit we wish to include
in the interactive rebase.

```bash
λ> git rebase -i <commit>
```

> It is possible to specify a commit by its count from the HEAD, e.g. `HEAD~5`
> for the fifth commit before the current state of the repository.

## Pickin' and Squashin'
Running `git rebase -i` will launch a console text editor with
the specified commit and all commits made after it,
listed in chronological order.
The commits are prefixed with the word `pick`, the default action,
which means that the commit will be included in the rebase.

```bash
pick a1b2c3d add new feature
pick e4f5g6h fix bug
pick q3r4s5t fix bug edge-case
pick y9z0a1b why is this still broken? try alternate fix
pick c2d3e4f ahh it's working now but it's messy
pick g5h6i7j clean up
pick k8l9m0n oh I see, I can refactor this into...
pick ghijklm refactored, but random other thing broke
pick opqrstu fix random other thing (we hope!)
pick wxyz123 final clean-up
pick gshk3j2 update README to document feature X
```

To specify that a commit be squashed into the previous commit,
change the prefixed `pick` to `squash`, or `s` for short.

```bash{1, 11}
pick a1b2c3d add new feature X
squash e4f5g6h fix bug
squash q3r4s5t fix bug edge-case
squash y9z0a1b why is this still broken? try alternate fix
squash c2d3e4f ahh it's working now but it's messy
squash g5h6i7j clean up
squash k8l9m0n oh I see, I can refactor this into...
squash ghijklm refactored, but random other thing broke
squash opqrstu fix random other thing (we hope!)
squash wxyz123 final clean-up
pick gshk3j2 update README to document feature X
```

If working with a lot of commits, you may find it useful to read these references
on [find and replace in `vim`][find-replace-vim]
or [find and replace in `emacs`][find-replace-emacs].

::alert
---
type: warning
title: disclaimer
---
Commits are squashed into the most-recent preceding `pick` commit.  
You must have at least one `pick` commit before any sequence of `squash` commits.
::

## Finishing

Once you have finished editing the list of commits
and specified which to squash,
save the document and exit.
If you find yourself stuck in the editor, [you are not alone.][not-alone-stuck-vim]
- `vim`: press `esc` to enter command mode, then`:wq` followed by `Enter`.
  `w` saves the document ("writes") and `q` closes the document ("quits").
- `emacs`: type `Ctrl-x Ctrl-s` folowed by `Ctrl-x Ctrl-c`.
  `Ctrl-x Ctrl-s` saves the document, and `Ctrl-x Ctrl-c` exits the editor.

After saving and exiting the editor, the rebase will begin.
`git` will revert the state of the repository to the specified starting
commit and walk through each commit in the list, applying it to the repository
then either saving the state as a commit (if `pick`) or skipping it (if `squash`).
After walking through all the commits, `git` will open the text editor
and prompt you to specify a commit message for the new commits where multiple commits
were squashed into one.

The state of the repository is now identical to before the squash,
but the history is much cleaner.

```bash
λ> git log --oneline
gshk3j2 (HEAD -> feature-X-branch) update README to document feature X
ghj23h3 fixes and clean-up (squashed)
a1b2c3d add new feature X
```

## Pushing

Next, we wish to publish our new history to the remote repository.
However, the remote will not accept our new history &mdash;
it's essentially _different_ from its current version of the history.
In other words, the two histories have [diverged][git-history-diverged].
We must tell the upstream repository
that we wish to overwrite its existing history &mdash;
with whatever history we have locally
by running `git push --force`.

::alert
---
type: warning
title: watch out
---
1. If working with teammates, you _really_ shouldn't be working
  on the `main` branch. If you are, you want to avoid overwriting
  new work, if any, that your teammates might have pushed upstream.
  Use `git push --force-with-lease`, instead of `git push --force`.
  This only overwrites the upstream history
  if no new work has been done on the branch.
2. After a `force-push`, existing pull-requests based on the current branch
  in the upstream repository will be orphaned.
  It's a great idea to resolve and merge such PRs **before starting the rebase**.
::

Phew! Your `git` history [is now less cringe][cringe].

[rebase]:               https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase
[merge]:                https://www.atlassian.com/git/tutorials/using-branches/git-merge
[vim]:                  https://www.vim.org/
[emacs]:                https://www.gnu.org/software/emacs/
[dont-worry-about-it]:  https://twitter.com/AndrewYNg/status/1618319086597050369?s=20
[find-replace-vim]:     https://vim.fandom.com/wiki/Search_and_replace
[find-replace-emacs]:   https://www.gnu.org/software/emacs/manual/html_node/emacs/Query-Replace.html
[not-alone-stuck-vim]:  https://twitter.com/iamdevloper/status/1041999624775626752?s=20
[git-history-diverged]: https://stackoverflow.com/questions/2452226/master-branch-and-origin-master-have-diverged-how-to-undiverge-branches
[cringe]:               https://youtu.be/qGx4VtwMnfM?si=bMWl-ST2UgRP1U_P
[git-best-practices]:   https://about.gitlab.com/topics/version-control/version-control-best-practices/
