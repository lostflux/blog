---
order: 10
month: 3
year: 2022
title: 'Huffman Encoding'
cover: 'featured-wordle.gif'
repo: 'https://github.com/siavava/tau'
tech:
  - Java
  - Information Theory
  - Object-Oriented Programming
featured: false
---

A program that encodes text using Huffman encoding, a lossless compression algorithm.
To achieve this, a frequency tree is built from the text, and then the tree is traversed
to assign binary codes to each character.
The most frequent characters are assigned the shortest codes, and the least frequent
characters have the more lengthy codes which increases storage efficiency.
