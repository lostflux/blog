---
title: Test of Blog Elements
description: Setting Up and Running Nuxt in 4 Steps.
category:
  - misc
  - featured
  - development
draft: false
layout: article
date: 2022-12-21
image: title-image.jpg
caption: This is the image caption.
navigation: true
---

<!-- ![Title Image](/blog/posts/misc/test1/title-image.jpg) -->

# This is H1 that Spans Multiple Lines

My given name is [Amittai][amittai], but my preferred name ad 2022
is [Altair][altair].
I am a current student at Dartmouth College, and some would say
a wannabe software engineer. I am passionate about data and computation,
especially in the context of society and how those two can drive changes.
My interests include deep learning and everything in the AI space,
data engineering, systems, and, somehow, lately, a little bit of
web development. I am also a big fan of the [Haskell][haskell]
programming language and functional programming patterns in general.

When not coding or studying Math, I am probably sleeping,
playing online chess, shooting photos that I will never
put out into the world, or, on occasion, playing
[Assassin's Creed][assassins-creed] 
([Origins][assassins-creed-origins], anyone?).

<!-- ::code-group
```bash [Yarn]
yarn create nuxt-app <project-name>
```
```bash [NPX]
npx create-nuxt-app <project-name>
```
```bash [NPM]
npm init nuxt-app <project-name>
```
:: -->

> Art is standing with one hand extended into the universe
> and one hand extended into the world
> and letting ourselves be a conduit for passing energy.
>
> ---
> <quote-author>
>   Albert Einstein
>
>   - Scientist
>   - Physicist
>   - Nobel Laureate
> </quote-author>
> 

## This is H2 that Spans Multiple Lines

My given name is [Amittai][amittai], but my preferred name ad 2022
is [Altair][altair].
I am a current student at Dartmouth College, and some would say
a wannabe software engineer. I am passionate about data and computation,
especially in the context of society and how those two can drive changes.
My interests include deep learning and everything in the AI space,
data engineering, systems, and, somehow, lately, a little bit of
web development. I am also a big fan of the [Haskell][haskell]
programming language and functional programming patterns in general.

When not coding or studying Math, I am probably sleeping,
playing online chess, shooting photos that I will never
put out into the world, or, on occasion, playing
[Assassin's Creed][assassins-creed] 
([Origins][assassins-creed-origins], anyone?).

### This is H3 that Spans Multiple Lines

My given name is [Amittai][amittai], but my preferred name ad 2022
is [Altair][altair].
I am a current student at Dartmouth College, and some would say
a wannabe software engineer. I am passionate about data and computation,
especially in the context of society and how those two can drive changes.
My interests include deep learning and everything in the AI space,
data engineering, systems, and, somehow, lately, a little bit of
web development. I am also a big fan of the [Haskell][haskell]
programming language and functional programming patterns in general.

When not coding or studying Math, I am probably sleeping,
playing online chess, shooting photos that I will never
put out into the world, or, on occasion, playing
[Assassin's Creed][assassins-creed] 
([Origins][assassins-creed-origins], anyone?).

#### This is H4 that Spans Multiple Lines

My given name is [Amittai][amittai], but my preferred name ad 2022
is [Altair][altair].
I am a current student at Dartmouth College, and some would say
a wannabe software engineer. I am passionate about data and computation,
especially in the context of society and how those two can drive changes.
My interests include deep learning and everything in the AI space,
data engineering, systems, and, somehow, lately, a little bit of
web development. I am also a big fan of the [Haskell][haskell]
programming language and functional programming patterns in general.

When not coding or studying Math, I am probably sleeping,
playing online chess, shooting photos that I will never
put out into the world, or, on occasion, playing
[Assassin's Creed][assassins-creed] 
([Origins][assassins-creed-origins], anyone?).

##### This is H5 that Spans Multiple Lines

My given name is [Amittai][amittai], but my preferred name ad 2022
is [Altair][altair].
I am a current student at Dartmouth College, and some would say
a wannabe software engineer. I am passionate about data and computation,
especially in the context of society and how those two can drive changes.
My interests include deep learning and everything in the AI space,
data engineering, systems, and, somehow, lately, a little bit of
web development. I am also a big fan of the [Haskell][haskell]
programming language and functional programming patterns in general.

When not coding or studying Math, I am probably sleeping,
playing online chess, shooting photos that I will never
put out into the world, or, on occasion, playing
[Assassin's Creed][assassins-creed] 
([Origins][assassins-creed-origins], anyone?).



###### This is H6 that Spans Multiple Lines

My given name is [Amittai][amittai], but my preferred name ad 2022
is [Altair][altair].
I am a current student at Dartmouth College, and some would say
a wannabe software engineer. I am passionate about data and computation,
especially in the context of society and how those two can drive changes.
My interests include deep learning and everything in the AI space,
data engineering, systems, and, somehow, lately, a little bit of
web development. I am also a big fan of the [Haskell][haskell]
programming language and functional programming patterns in general.

When not coding or studying Math, I am probably sleeping,
playing online chess, shooting photos that I will never
put out into the world, or, on occasion, playing
[Assassin's Creed][assassins-creed] 
([Origins][assassins-creed-origins], anyone?).

# Installation

Here, you will find information on setting up and running a Nuxt project in 4 steps.

---

## Online playground

You can play with Nuxt online directly on CodeSandbox or StackBlitz:

:styled-button[Play on CodeSandbox]{href=https://codesandbox.io/s/github/nuxt/codesandbox-nuxt/tree/master/ size="small" externalIcon}
:styled-button[Play on StackBlitz]{href=https://stackblitz.com/github/nuxt/starter/tree/v2-stackblitz size="small" externalIcon .mt-1}

## Prerequisites

- [node](https://nodejs.org) - _We recommend you have the latest LTS version installed_.

- A text editor, we recommend [VS Code](https://code.visualstudio.com/) with the [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) extension or [WebStorm](https://www.jetbrains.com/webstorm/).

- A terminal, we recommend using VS Code's [integrated terminal](https://code.visualstudio.com/docs/editor/integrated-terminal) or [WebStorm terminal](https://www.jetbrains.com/help/webstorm/terminal-emulator.html).

## Using create-nuxt-app

To get started quickly, you can use [create-nuxt-app](https://github.com/nuxt/create-nuxt-app).

Make sure you have installed yarn, npx (included by default with npm v5.2+) or npm (v6.1+).

```python [src/neural.py] {15, 17-21, 24}
class NeuralNetwork:
  """
    A neural network with an arbitrary number of layers and neurons.
  """

  def __init__(self, layers, activation='sigmoid', learning_rate=0.1):
    """Initializes the neural network.

    Args:
      layers: A list of integers for number of neurons in each layer.
      activation: A string representing the activation function to use.
      learning_rate: A float representing the learning rate.
    """
    self.layers = layers
    self.activation = activation
    self.learning_rate = learning_rate
    self.weights = []
    self.biases = []
    self._initialize_weights()

  def _initialize_weights(self):
    """Initializes the weights and biases of the neural network."""
    for i in range(len(self.layers) - 1):
      self.weights.append(np.random.randn(self.layers[i], self.layers[i + 1]))
      self.biases.append(np.random.randn(self.layers[i + 1]))

  def _sigmoid(self, x):
    """Computes the sigmoid function.

    Args:
      x: A float or numpy array.

    Returns:
      A float or numpy array.
    """
    return 1 / (1 + np.exp(-x))

  def _sigmoid_derivative(self, x):
    """Computes the derivative of the sigmoid function.

    Args:
      x: A float or numpy array.

    Returns:
      A float or numpy array.
    """
    return self._sigmoid(x) * (1 - self._sigmoid(x))

```

Hello

<!-- ::code-group
```bash [Yarn]
yarn create nuxt-app <project-name>
```
```bash [NPX]
npx create-nuxt-app <project-name>
```
```bash [NPM]
npm init nuxt-app <project-name>
```
:: -->

It will ask you some questions (name, Nuxt options, UI framework, TypeScript, linter, testing framework, etc). To find out more about all the options see the [create-nuxt-app documentation](https://github.com/nuxt/create-nuxt-app/blob/master/README.md).

Once all questions are answered, it will install all the dependencies. The next step is to navigate to the project folder and launch it:

```haskell [Main.hs] {3, 5-6, 9-10}
{-# LANGUAGE OverloadedStrings #-}

module Main where

main :: IO ()
main = do
  putStrLn  "Hello, dummy!"
  putStr    "Type anything: "
  input     <- getLine
  print     input
  return    ()
```

```f# [Main.fs] {3, 5-6, 9-10}
module PigLatin =
  let toPigLatin (word: string) =
    let isVowel (c: char) =
      match c with
      | 'a' | 'e' | 'i' |'o' |'u'
      | 'A' | 'E' | 'I' | 'O' | 'U' -> true
      |_ -> false
    
    if isVowel word[0] then
      word + "yay"
    else
      word[1..] + string word[0] + "ay"
```

The application is now running on [http://localhost:3000](http://localhost:3000). Well done!

::alert{type="info"}
Another way to get started with Nuxt is to use [CodeSandbox](https://template.nuxtjs.org) which is a great way for quickly playing around with Nuxt and/or sharing your code with other people.

Here is a list:

  - Something
  - Something else.

**And a nested code-block**:

```typescript [Main.ts] {2}
const do = (action) => {
  return action();
}
```
::

::alert
---
type:   success
title:  all this stuff just works?
---
Another way to get started with Nuxt is to use [CodeSandbox](https://template.nuxtjs.org) which is a great way for quickly playing around with Nuxt and/or sharing your code with other people.

Here is a list:

  - Something
  - Something else.

**And a nested code-block**:

```typescript [Main.ts] {2}
const do = (action) => {
  return action();
}
```
::

::alert
---
type: "error"
title: This will bite you!
---
Another way to get started with Nuxt is to use [CodeSandbox](https://template.nuxtjs.org) which is a great way for quickly playing around with Nuxt and/or sharing your code with other people.

Here is a list:

  - Something
  - Something else.

**And a nested code-block**:

```typescript [Main.ts] {2}
const do = (action) => {
  return action();
}
```
::

::alert{type="warning"}
Another way to get started with Nuxt is to use [CodeSandbox](https://template.nuxtjs.org) which is a great way for quickly playing around with Nuxt and/or sharing your code with other people.

Here is a list:

  - Something
  - Something else.

**And a nested code-block**:

```typescript [Main.ts] {2}
const do = (action) => {
  return action();
}
```
::

::alert{type="critical"}
Another way to get started with Nuxt is to use [CodeSandbox](https://template.nuxtjs.org) which is a great way for quickly playing around with Nuxt and/or sharing your code with other people.

Here is a list:

  - Something
  - Something else.

**And a nested code-block**:

```typescript [Main.ts] {2}
const do = (action) => {
  return action();
}
```
::

## Manual Installation

Creating a Nuxt project from scratch only requires one file and one directory.

We will use the terminal to create the directories and files, feel free to create them using your editor of choice.

### Set up your project

Create an empty directory with the name of your project and navigate into it:

```bash
mkdir <project-name>
cd <project-name>
```

_Replace `<project-name>` with the name of your project._

Create the `package.json` file:

```bash
touch package.json
```

Fill the content of your `package.json` with:

```json{}[package.json]
{
  "name": "my-app",
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "start": "nuxt start"
  }
}
```

`scripts` define Nuxt commands that will be launched with the command `npm run <command>` or `yarn <command>`.

#### **What is a package.json file?**

The `package.json` is like the ID card of your project. It contains all the project dependencies and much more. If you don't know what the `package.json` file is, we highly recommend you to have a quick read on the [npm documentation](https://docs.npmjs.com/creating-a-package-json-file).

### Install Nuxt

Once the `package.json` has been created, add `nuxt` to your project via `npm` or `yarn` like so below:

<!-- ::code-group -->
```bash [Yarn]
yarn add nuxt
```
```bash [NPM]
npm install nuxt
```
<!-- :: -->

This command will add `nuxt` as a dependency to your project and add it to your `package.json`. The `node_modules` directory will also be created which is where all your installed packages and dependencies are stored.

::alert{type="info"}

A `yarn.lock` or `package-lock.json` is also created which ensures a consistent install and compatible dependencies of your packages installed in your project.

::

### Create your first page

Nuxt transforms every `*.vue` file inside the `pages` directory as a route for the application.

Create the `pages` directory in your project:

```bash
mkdir pages
```

Then, create an `index.vue` file in the `pages` directory:

```bash
touch pages/index.vue
```

It is important that this page is called `index.vue` as this will be the default home page Nuxt shows when the application opens.

Open the `index.vue` file in your editor and add the following content:

```vue{}[pages/index.vue]
<template>
  <h1>Hello world!</h1>
</template>
```

### Start the project

Run your project by typing one of the following commands below in your terminal:

<!-- ::code-group -->
```bash [Yarn]
yarn dev
```
```bash [NPM]
npm run dev
```
<!-- :: -->

::alert{type="info"}

We use the dev command when running our application in development mode.

::

The application is now running on [http://localhost:3000](http://localhost:3000/).

Open it in your browser by clicking the link in your terminal and you should see the text "Hello World" we copied in the previous step.

::alert{type="info"}

When launching Nuxt in development mode, it will listen for file changes in most directories, so there is no need to restart the application when e.g. adding new pages

::

::alert{type="warning"}

When you run the dev command it will create a `.nuxt` folder. This folder should be ignored from version control. You can ignore files by creating a .gitignore file at the root level and adding .nuxt.

::

### Bonus step

Create a page named `fun.vue` in the `pages` directory.

Add a `<template></template>` and include a heading with a funny sentence inside.

Then, go to your browser and see your new page on [localhost:3000/fun](http://localhost:3000/fun).

::alert{type="info"}

Creating a directory named `more-fun` and putting an `index.vue` file inside it will give the same result as creating a `more-fun.vue` file.

::



[amittai]:                  https://en.wikipedia.org/wiki/Amittai
[altair]:                   https://www.thebump.com/b/altair-baby-name
[haskell]:                  https://www.haskell.org/
[assassins-creed]:          https://www.ubisoft.com/en-us/game/assassins-creed
[assassins-creed-origins]:  https://www.ubisoft.com/en-us/game/assassins-creed/origins
