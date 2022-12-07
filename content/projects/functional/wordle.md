---
order: 6
month: 3
year: 2022
title: 'Wordle, Grep'
cover: 'featured-wordle.gif'
repo: 'https://github.com/siavava/tau'
tech:
  - Haskell
  - Cabal
  - Functional Programming
category: 'featured-project'
featured: true
---

Wordle and Grep replicas implemented in Haskell,
a purely <highlight> functional </highlight> programming language.

[Wordle](https://www.nytimes.com/games/wordle/index.html)
is a program picks a <highlight> random five-letter word </highlight>
out of a corpus then lets the user <highlight> guess the word</highlight>,
providing <highlight> feedback at every iteration</highlight>.
The game is won when the full word is guessed,
usually in at most 5 tries although my version allows
playing in infinite mode.

[Grep](https://www.gnu.org/software/grep/manual/grep.html)
is a program that <highlight> matches a string prompt to a text-stream</highlight>,
e.g. from files. Basically, it's Google search for your local file contents.
