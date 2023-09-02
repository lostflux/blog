---
title: Symmetric Groups | Amittai
subtitle: Symmetric Groups
description: Just a simple post on symmetric groups.
category:
  - long-form
  - algebra
draft: true
featured: false
imageUrl: ../cover.gif
caption: The Group S4.
layout: article
date: 2023-05-19
---

# Symmetric Groups

A **group** is a set of elements with a binary operation that satisfies certain
mathematical axioms, allowing us to interpret operations between elements in
a more _general_ way.

<!--more-->

## Definition

Given any non-empty set $\Omega$, we define $S_\Omega$ to be the set of all bijections
from $\Omega$ to itself, i.e. all permutations of $\Omega$.
The set $S_\Omega$ is a group under function composition,
$\circ$ since if $\sigma\ \colon\ \Omega \to \Omega$ and
$\tau\ \colon \ \Omega \to \Omega$are both bijections,
then $\sigma \circ \tau$ is also a bijection from $\Omega$ to $\Omega$.

### Axioms

Thus, all the group axioms hold for $(S_\Omega,\ \circ)$.

In the special cases where
$\Omega = \left \{1, 2, \ldots, n \right \} \ \colon \ n \in \mathbb{Z}$,
we refer to $S_\Omega$ as $S_n$.

$$
\int f(x) \, dx = \frac{1}{2} x^2 + C
$$

$$
  \begin{bmatrix}
    1 & 2 \\
    3 & 4
  \end{bmatrix}
$$

For any set $\Omega$, the symmetric group $S_\Omega$ is a superset of all other
maps (functions) from $\Omega$ to $\Omega$, since the symmetric group captures
all possible permutations and each function is a map from one such permutation
to another.

![The Group S4](s4.png)

## Representation

We represent symmetric groups as disjoint cycles, each cycle starting with the
smallest element.

Example of the ${S}_{3}$ group:

::prose-figure
---
alt:  ${S}_3$ Group
---

| Value | Maps |
| -------:| -------------------------------:|
| $1$ | $\{1, 2, 3\} \mapsto \{1, 2, 3\}$ |
| $(1\ 2)$ | $\{1, 2, 3\} \mapsto \{2, 1, 3\}$ |
| $(1\ 3)$ | $\{1, 2, 3\} \mapsto \{3, 2, 1\}$ |
| $(2\ 3)$ | $\{1, 2, 3\} \mapsto \{1, 3, 2\}$ |
| $(1\ 2\ 3)$ | $\{1, 2, 3\} \mapsto \{2, 3, 1\}$ |
| $(1\ 3\ 2)$ | $\{1, 2, 3\} \mapsto \{2, 3, 1\}$ |

::

::prose-figure{alt="Basic table"}

| key | value |
| ---:| -----:|
| $1$ | $\mathbf{one}_{1}$ |
| 2 | two |

::

## Composition of Permutations

::alert
---
title: Composition of Permutations
---

Operations are done _right_ to _left_.  
$\tau \circ \phi$ is the permutation obtained by first doing $\phi$
then doing $\tau$.

::

Conventionally, we avoid writing elements that are fixed by the permutations.
We also order elements each cycle so the smallest element in each cycle starts.

## Order of Permutations

The order of a given permutation is the $\mathbf{lcm}$ of the cycle lengths of
its _disjoint_ elements.
