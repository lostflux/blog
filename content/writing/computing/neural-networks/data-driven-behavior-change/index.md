---
title: Data-driven Behavior Change | Amittai
subtitle: Data-driven Behavior Change
description: How Machine Learning is Transforming other Industries.
category:
  - featured
  - long-form
  - neural networks
draft: false
featured: true
imageUrl: ../cover.gif
layout: article
date: 2021-03-14
navigation: true
---

ChatGPT, AlphaFold, AlphaGo, the list of recent developments in Machine Learning
and AI are endless. Still, AI solutions are causing bigger ripples
in existing industries as existing norms and relevant human roles
and relationships between humans and machines are re-imagined.

This paper explores this context around machine learning and the effects it is having in other industries.

<!--more-->

::inline-flex
:styled-button[read the full paper]{href=https://issuu.com/dartmouthjournalofscience/docs/21w_dujs_print_v1/16}

:styled-button[Project code]{href=https://github.com/siavava/neural}
::

---

## Introduction

What is machine learning and the broader field of artificial intelligence (AI)[^1]
at a high level, and what motivates
solving the kinds of problems as one would with machine learning and AI methods?

## A History of Artificial Intelligence

When describing sophisticated technology, one is left to wonder how the status quo evolved
from the earliest, rudimentary forms to the state of the art.
We study the development of Ai and relevant computers and computational units.

## Machine Learning: Definitions

What exactly is machine learning? How does it differ from other forms of AI,
and more broadly, from other forms of computation?

## Machine Learning in Other Industries

What are some examples of machine learning in action in other industries?

### Entertainment Industry

How do streaming platforms such as Netflix use machine learning to optimize their content
and recommendations for specific users?

### Healthcare Industry

From better-informed decisions to improved efficiency and even automated screenings
for diseases, we take a look at how machine learning is being used in the healthcare industry.

### Education

Educational platforms such as [Khan Academy][khan-academy] use machine learning to understand
a student's performance and tailor their practice and study material to their weaker sections.
How is this done? 

### Agriculture

New frontiers are emerging in the agriculture industry as machine learning is used
to predict weather patterns, optimize crop cycles, and even inform
rationing of water and fertilizer.

### Government

Governments and other administrative agencies also benefit from improved efficiencies
in using machine learning.

### Transportation

[Tesla][tesla], one of the pioneers of electric vehicles, is at the forefront of
using machine learning and deep learning methods to improve driver experience
and safety and even offer self-driving car capabilities.

On the other hand, [Uber][uber] uses machine learning to optimize driver routes
by avoiding traffic snarl-ups,
thus saving time for their drivers and customers.


## Pitfalls of Machine Learning

What are the downsides of machine learning?
For one, machine learning models propagate biases in the data they are trained on,
and [most real-world data is biased][bias]. 
How do we tackle such pitfalls?

## Demo: Building a Neural Network

```julia[neural.jl]
"""
  Neural network abstraction
"""
mutable struct Network
  a::Array{Any,1}
  W::Array{Any,1}
  b::Array{Any,1}
  ϵ::Float64
  result::Array
end
```


### Relevant Mathematics

Like much of AI, machine learning and deep learning rely heavily on some branches of mathematics,
especially linear algebra and calculus. We take a look at some common functions used in the
machine learning process.

```julia[functions.jl]{3,8,13,18}
#1 sigmoid function
function sigmoid(x)
  return 1 ./ (1 .+ exp.(-x))
end

# sigmoid derivative
function sigmoid_derivative(sig_x)
  sigmoid_derivative = sig_x .* (1 .- sig_x)
end

# tanh function
function tanh(x)
  return (exp.(x) - exp.(-x)) / (exp.(x) + exp.(-x))
end

# tanh derivative
function tanh_derivative(tanh_x)
  tanh_derivative = 1 - tanh_x.^2
end

```

### Initialization

We have to start somewhere, but we most prefer somewhere random.[^2]

```julia[initialization.jl]{14,19}
"""
  Setup neural network with a specific input size & output size
  setup(input_size, hidden_sizes, output_size, epsilon=0.01)
  # Arguments
  input_size : dimensionality of input
  hidden_sizes : dimensionality of hidden layers
  output_size : required dimensionality of output
"""
function setup(input_size, hidden_sizes, output_size, ϵ=0.01)
  sizes = [input_size hidden_sizes output_size]

  W = []
  for i = 2:length(sizes)
    push!(W, randn((sizes[i-1], sizes[i])))
  end

  b = []
  for i = 2:length(sizes)
    push!(b, zeros((1, sizes[i])))
  end

  return Network([], W, b, ϵ, [])
end
```

### Forward Propagation

Forward propagation is the process of generating output (often as labels)
for a provided set of inputs.

```julia[forward.jl]{11-14, 16}
"""
  Forward-propagation routine --> generating predictions
  forward!(network::Network, X)
  # Arguments
  network : Neural network
  X : input values
"""
function forward!(network::Network, X)
  network.a = [X]

  for i = 1:length(network.W)
    z = network.a[i] * network.W[i] .+ network.b[i]
    push!(network.a, sigmoid(z))
  end
  
  network.result = network.a[end]
  
  return network
end
```

### Back-propagation

Back-propagation is the process of updating the weights and biases of the network
to improve the accuracy of the network's predictions.

```julia[backward.jl]{11,17-22}
"""
  #* Backward propagation routine --> modifying parameters
  #? backward!(network::Network, X, y)
  #! Argunemts:
    #? network::Network : Neural Network to be propagated backward
    #? X : input data values
    #? y : accurate input labels on the data
"""
function backward!(network::Network, X, y)

  error = y - network.result
  delta = error .* sigmoid_derivative(network.result)
  network.W[end] += network.ϵ * transpose(network.a[end-1]) * delta
  network.b[end] .+= network.ϵ * mean(delta)

  W_length = length(network.W)
  for i = 1:W_length-1
    j = W_length - i
    error = delta * transpose(network.W[j+1])
    delta = error .* sigmoid_derivative(network.a[j+1])
    network.W[j] += network.ϵ * transpose(network.a[j]) * delta
    network.b[j] .+= network.ϵ * mean(delta)
  end
  return network
end
"""
```

## Conclusion

What should we care about in the machine learning and AI space?
Certainly, great caution needs to be exercised in developing
and adopting machine learning systems because of the immense power
they have (which can effectively propagate negative, often unintended and harmful results).

[khan-academy]: https://www.wikipedia.org/wiki/Khan_Academy
[tesla]:        https://www.wikipedia.org/wiki/Tesla,_Inc.
[uber]:         https://www.wikipedia.org/wiki/Uber
[bias]:         https://www.scuba.io/blog/data-bias-why-it-matters-and-how-to-avoid-it


[^1]: Machine Learning is a sub-domain of AI.
[^2]: Everything starts somewhere!
