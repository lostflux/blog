---
title: fundamental theorem of software engineering
category:
  - aphorisms
draft: false
layout: article
date: 2023-07-26 23:00:00
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

:::square
---
margin: 35%
---

We can solve any problem by introducing an extra level of indirection.[^indirection]

::right
  &ndash; [David Wheeler][david-wheeler], [Andrew Koenig][koenig]
::

::left
---
style: "margin: 100px 0"
---
_...except the problem of too much indirection_.[^too-much-indirection]  
And [too much indirection][semantic-compression] is the third root of all evil.[^roots-of-evil]
::
:::

[david-wheeler]:          https://www.forbes.com/sites/forbestechcouncil/2020/08/20/indirection-the-unsung-hero-of-software-engineering
[koenig]:                 https://en.wikipedia.org/wiki/Andrew_Koenig_(programmer)
[semantic-compression]:   https://caseymuratori.com/blog_0015
[premature-optimization]: https://wiki.c2.com/?PrematureOptimization
[naming-things]:          https://www.goodreads.com/quotes/6341736-any-fool-can-write-code-that-a-computer-can-understand
[off-by-one]:             https://wiki.c2.com/?OffByOne
[load-balancer]:          https://www.f5.com/glossary/load-balancer
[caching]:                https://computer.howstuffworks.com/cache.htm
[api]:                    https://www.mulesoft.com/resources/api/what-is-an-api
[compiler]:               https://www.webopedia.com/definitions/compilier/
[real-programmers]:       https://users.cs.utah.edu/~elb/folklore/mel.html
[distributed-systems]:    https://cloudian.com/guides/data-backup/distributed-storage/#:~:text=A%20distributed%20storage%20system%20is,and%20coordination%20between%20cluster%20nodes.
[parallel-systems]:       https://www.techtarget.com/searchstorage/definition/parallel-file-system?Offer=abt_pubpro_AI-Insider

[^indirection]:           Indirection refers to dispatch of communications via an intermediary.
  The intermediary is the cause of indirection, and is (strictly) an entity capable of examining a message
  and making a decision regarding it (e.g. on whether to forward it or answer it, or on where to forward it, etc.).
  There may be a chain of such intermediaries along a communications path, each constituting one level of indirection.

[^too-much-indirection]:   For instance, to fix a slow storage system, one may reckon:  
      - To add [caching][caching], an indirection of access. On each request, the cache manager decides whether to
        serve the request from the cache or to forward it to the storage system.
      - To [parallelize][parallel-systems] and [distribute][distributed-systems] access, an indirection over a [_load balancer_][load-balancer].
        On each request, the load balancer decides which storage node to forward the request to.
      - To reduce iterated strength[^3] &mdash; such as by refactoring logic out of loops or functions when computed effects
        can be shared across iterations or function calls (a sort of caching?).
      - At this scale of complexity, one perhaps needs yet another indirection in the form of a [compiler][compiler]
        (even [real programmers][real-programmers] need a compiler!).

    As the system complexity explodes, one reckons the collective ought to be refactored into smaller,
    _"atomic"_ components, each abstracting away specific complexities and exposing a reasonable [API][api]
    for the next level of indirection to consume.
    But the complexity of each subsystem soon matches that of the original system.
    **Voilà: the original pain is rediscovered, and recursion[^too-much-indirection] beckons.**

[^roots-of-evil]:                     The first two are _[premature optimization][premature-optimization]_, [_atrocious naming_][naming-things],
                          and [_off-by-one errors_][off-by-one].

[^3]:                     Made up our own terminology, have we?
