---
title: Efficient Multiple Discovery
description: Given an arbitrary set of numbers, how do we most-efficiently find their smallest common multiple?
category:
  - featured
  - exposition
draft: false
featured: true
imageUrl: ../cover.gif
caption: |
  If life transcends death <br/>
  Then I will seek for you there. <br/>
  If not, then there too.
layout: article
date: 2023-06-21 00:00:00
navigation: true

head:
  meta:
    - name: 'description'
      content: Given an arbitrary set of numbers, how do we most-efficiently find their smallest common multiple?
    - name: 'keywords'
      content: 'functional programming, lazy evaluation, tail recursion, generators, haskell, project euler'
    - name: 'robots'
      content: 'index, follow'
    - name: 'author'
      content: 'Amittai'
    - name: 'copyright'
      content: 'Amittai'
    - property: 'og:title'
      content: 'Efficient Multiple Discovery'
    - property: 'og:description'
      content: Problem-solving with Functional Programming Patterns.
    - property: 'og:image'
      content: /_ipx/_/writing/computing/exposition/cover.gif
    - property: 'og:url'
      content: 'https://amitt.ai/writing/computing/exposition/001-multiples-sum'
    - name: 'twitter:card'
      content: summary_large_image
---

# Project Euler, Problem 1

If we list all the natural numbers below 10 that are multiples of $3$ or $5$,
we get $3$, $5$, $6$ and $9$. The sum of these multiples is $23$.

Find the sum of all the multiples of $3$ and $5$ below $1000$.

<!--more-->

::inline-flex

[more information](https://projecteuler.net/archives){fancy}

[code repository](https://github.com/siavava/epsilon/tree/main){fancy}

::

## Utility Functions

Here, we just take a number $n$ and a list of divisors then check if any of the divisors divides $n$.

```haskell
-- | Check if any of the divisors divide the number n.
anyDivisor :: (Foldable c, Integral a) => a -> c a -> Bool
anyDivisor n divisors =
  any (\x -> n `mod` x == 0) divisors
  -- ^ NOTE: this short-circuits,
  --   i.e. stops as soon as it finds a single divisor.
```

## Approach 1: Exploiting Laziness

Generate a list of all the numbers below $1000$ that are multiples of $3$ or
$5$, then sum them.

```haskell
solve1 :: (Foldable c, Integral a) => a -> c a -> a
solve1 bound divisors =
  sum $ filter (`anyDivisor` divisors) [1..bound-1]
  -- ^ sum the list of elements in the range [1..bound-1]
  --   that are divisible by any of the divisors

-- >>> solve1 1000 [3,5]
-- 233168
```

[Haskell](https://www.haskell.org/) is a lazy language.
Instead of explicitly generating the entire list of values,
it keeps the specification at hand
and generates the values on-demand,
then discards each value as soon as it is no longer needed and
it is efficient to discard it.

::alert
---
type: info
---
Haskell's list mechanics are more in line with [generators](https://en.wikipedia.org/wiki/Generator_(computer_programming))
in other programming languages, such as [`range`](https://docs.python.org/3/library/stdtypes.html#range) in Python
and [`std::iota`](https://en.cppreference.com/w/cpp/algorithm/iota) in C++.  
If you create an infinite `list` in Python, **your program will crash**.
::

## Approach 2: Tail Recursion

[Approach 1](#approach-1-exploiting-laziness) is only efficient because Haskell is lazy by design.
Otherwise, generating a list of all values divisible by $3$ and $5$ when we are only interested in their sum is wasteful
and would not scale to larger bounds.
A _generally_ better approach is to generate one number at an instance, add it to our running sum,
generate the next, and so on. That way, we only need to keep memory for a single variable at a time.

### Motivation for Tail Recursion

However, most functional programming languages bar explicit iteration &mdash;
much of iterative computing involves state/value mutation,
and breaking functional purity.
Most functional languages prefer recursion over iteration,
since computing with explicit iteration _usually_ involves mutating
some state that lives across the iterations.

However, recursion is not a straight-up replacement for iteration.
Take, for instance, a simple recursive solution to the factorial function:

```python
def factorial(bound):
  acc = 1
  for i in range(1, bound+1):  # what happens if we start at 0?
    acc *= i                   # mutating the accumulator
  return acc
```

Here's a naive recursive solution in Haskell:

```haskell
factorial :: Integer -> Integer
factorial n
  | n == 0    = 1
  | otherwise = n * factorial (n - 1)
```

What happens at runtime?
First, recursive calls require a stack frame on each call,
meaning each call to `factorial` allocates memory for the call's context,
and that memory must not be freed **_until_** the call returns.
In contrast to iteration, the recursive call must perform two iterations:
one "forward" iteration setting up the nested recursive calls needed to compute the result,
and one "backward" iteration to unwind the stack and compile the final result from the nested calls.

For example, a call to `factorial 5` would result in the following stack trace.

```haskell
factorial 5                                   -- call 1
5 * (factorial 4)                             -- call 2
5 * (4 * (factorial 3))                       -- call 3
5 * (4 * (3 * (factorial 2)))                 -- call 4
5 * (4 * (3 * (2 * (factorial 1))))           -- call 5
5 * (4 * (3 * (2 * (1 * (factorial 0)))))     -- call 6
5 * (4 * (3 * (2 * (1 * 1))))                 -- unwind 6
5 * (4 * (3 * (2 * 1)))                       -- unwind 5
5 * (4 * (3 * 2))                             -- unwind 4
5 * (4 * 6)                                   -- unwind 3
5 * 24                                        -- unwind 2
120                                           -- unwind 1 (final return)
```

The real problem is that memory allocated for any specific recursive call's stack frame
in the forward iteration may not be freed until the backward iteration reaches the specific
call and the specific recursive call completes execution and returns.
We effectively use $\Theta(n)$ memory.

If we can do better, shouldn't we?

If a non-branching recursive call is the last computation in a function,
why not pass the context forward and avoid setting up a new stack frame for the recursive call?
This is the main idea behind [tail recursion](https://en.wikipedia.org/wiki/Tail_call)
&mdash; eventually, the terminating call (i.e. _base case_) returns the solution back to the original caller.

```python
def factorial(n: int, acc=1):
  if n == 0:
    return acc
  return factorial(n - 1, acc * n)
```

A similar solution in Haskell:
  
```haskell
factorial :: Integer -> Integer
factorial n = iter n 1
  where
    iter :: Integer -> Integer -> Integer
    iter n acc
      | n == 0 = acc
      | otherwise = iter (n - 1) (acc * n)
```

Now, our stack trace is much simpler, and we only use $O(1)$ memory:

```haskell
factorial 5     -- call 
iter 5 1        -- subroutine call 1 
iter 4 5        -- subroutine call 2 
iter 3 20       -- subroutine call 3 
iter 2 60       -- subroutine call 4 
iter 1 120      -- subroutine call 5 
iter 0 120      -- subroutine call 6 
120             -- final return 
```

::alert
---
type: info
---

The canon Haskell compiler, [GHC](https://www.haskell.org/ghc/),
guarantees tail call elimination for tail recursive functions.  
As [Peter Deutsch](https://en.wikipedia.org/wiki/L._Peter_Deutsch) once said:
**To iterate is human, to recur, divine.** Be careful with your recursion, though!

::

### A Tail Recursive Solution

[Please remember to solve your original problem.](https://www.youtube.com/watch?v=XKu_SEDAykw)

```haskell
solve2 :: (Foldable c, Integral a) => a -> c a -> a
solve2 bound divisors = iter 0 0
  where
    iter acc curr
      | curr == bound             = acc
      | anyDivisor curr divisors  = iter (acc + curr) (curr + 1)
      | otherwise                 = iter acc (curr + 1)

-- >>> solve2 1000 [3,5]
-- 233168
```

### #2, Explained

With tail recursion, we effectively iterate (recursively!) through all values in the range
and, when a value is a multiple of any of the divisors, we adjust[^1] the value of the accumulator
that is passed forward to the next recursive call.

[^1]: We adjust the value passed to the next recursive call, but we do not
      mutate the accumulator directly in the current call! The function
      is still pure and referentially transparent.

## Approach 3: Monadic State Management

Tail recursion emulates iteration with recursion.
But can we _explicitly_ iterate?

Yes, yes we can.

Albeit without some of the safety guarantees that functional
programming gives us when our functions are pure.

```haskell
solve3 :: (Foldable c, Integral a) => a -> c a -> a
solve3 bound divisors =
  runST $ newSTRef 0 >>= compute
  where
    compute total = do
      for [1..bound-1] $ \curr -> do
        when (curr `anyDivisor` divisors) $ do
          modifySTRef total (+ curr)
      readSTRef total

-- >>> solve3 1000 [3,5]
-- 233168
```

### #3, Explained

Instead of a tail recursion (which is unrolled into a loop by [GHC](https://www.haskell.org/ghc/)) anyway,
use the state monad to maintain the accumulator, and an explicit loop to check multiples
and sum up values in the accumulator.

::alert
---
type: warning
title: disclaimer
---
Haskell uses [**monads**](http://learnyouahaskell.com/a-fistful-of-monads)
to manage [_side effects_](https://en.wikipedia.org/wiki/Side_effect_(computer_science)).

This approach is the closest to imperative code that we can get in Haskell, syntactically.
However, since tail recursions are usually unrolled into loops by the compiler anyway,
they are the preferred programming pattern in most functional programming languages.
::
