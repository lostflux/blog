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

Wordle and Grep replicas implemented in Haskell, a purely functional programming language.

[Wordle](https://www.nytimes.com/games/wordle/index.html)
is a program that takes a text corpus and picks a random word, then lets
you guess the word. Letters in the word are revealed as
<span style="color:green">green</span> when guessed correctly,
<span style="color:red">red</span> when guessed incorrectly, and
<span style="color:yellow">yellow</span> when the letter is in the word
but not at the current position. The game ends at $5$ tries,
although my version allows the user play in infinite mode. 

[Grep](https://www.gnu.org/software/grep/manual/grep.html) is a program that takes a string prompt and prints matches in a text-stream
or set of files that it was pointed to.
