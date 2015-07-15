---
layout: post
title: "Markov Chains"
subtitle: "Understanding the beautiful stochastic process and its applications"
tags: ['statistics', 'development']
---

# History
Jacob Bernoulli was focussed on accurately estimating the probability of some unknown event based on the number of times the event occured in independent trials.[^3]

He used a simple example:

Suppose that ``3000`` black pebbles and ``2000`` white pebbles are put together in a box. To determine the ratio of black vs white pebbles by experiment, you draw one pebble after another with replacement, and note the color of the pebbles. Bernoulli proved that the expected value of white vs black opservations will converge on the actual ratio (``3/2``) as the number of trials increases. This is known as the **law of large numbers**.

He concluded that *if observations of all events be continued for the entire infinity, it will be noticed that everything in the world is goverened by precise rations and a constant law of change.*

Some philosophers were upset with the law of large numbers, saying that it might prevent us from having free will because it says that, in the long run, we will converge to the mean. Pavel Nekrasov, a mathematician and theologian, was especially displeased with the idea that we all have a pre-determined statistical fate, and said that “independence is a necessary condition for the law of large numbers”. He made a claim that the outcome of previous events doesn't change the probability of the current or future events.

To say the least, Andrey Markov–a russian mathematician–did not agree with Nekrasov, and said that the law of large numbers **can** apply to dependent variables. Markov performed a mathematical analysis of the famous novel, [_Eugene Onegin_](https://en.wikipedia.org/wiki/Eugene_Onegin), to support his claim. He showed that even the combinations of vowels and consonants (dependent variables) followed the law of large numbers. A vowel would most likely be followed by a consonant, and vice versa. The ratios become more stable as you analyze the text. Markov therefore disproved Nekrasov's claim that the law of large numbers cannot be applied to dependent variables.

Though the the original reason of Markov chains was to help settle a religious debate over the existence of free will, the number of its applications since its invention is vast–much more than what I presume Markov would have anticipated.

<br/>

# Markov Property

By definition, a Markov chain is a **stochastic process** that has a **Markov property**.
A stochastic process, or random process, represents random variables evolving over time.



Markov property is a certain conditional probability statement. Here's how we can describe it mathematically:

<img src="/resources/post-images/markov/markov_property.png">

Using the Markov property, we don't take into consideration the entire history of the system. In a Markov structure, only the most recent information matters. In the case above, we only need the value of X<sub>n</sub>. Anything before that (X<sub>n-1</sub>, X<sub>n-2</sub>) is obselete information. We're not saying that the past is independent of the future, but what we are saying is that the past and future are **conditionally independent** given the present.

Intuitively, the main idea behind the **Markov property** states:

> It doesn't mater how you got there, it only matters where you are.

A Markov chain diagram is a visual representation of a Markov chain:

<img src="/resources/post-images/markov/markov_chain_diagram.png" alt="">

<br/>

## Transition Matrix

A transition matrix is a matrix used to describe the transitions of a Markov chain. The Markov chain diagram above is used for the following transition matrix:

<img src="/resources/post-images/markov/transition_matrix.png" alt="">

Rows of the matrix represent inputs wile columns represent outputs. In a transition matrix, each entry is a nonnegative real number and every row sums to 1. 

You can create a transition matrix out of the Markov chains Each row must sum to 1 by convention, but each column does not necessarily have to sum to 1.


<br/>

# Applications 

Markov chains are used mainly in two different ways[^1]:

- **Markov Model**: It is used as a model in various sciences like social, physical, and biology, for example. You can also use it as an approximation the you are evolving over time. It's useful, but limited due to the fact that it is a strong conditional independence assumption–you cannot always forget the entire past as long as you have the present.
- **Markov chain Monte Carlo (MCMC)**: You don't have to worry if the process follows a Markov chain. Instead, you synthetically generate your own Markov chain. You can then use the results of your programmed Markov chain to study the distributions you are interested in. This makes extremely complicated computations more accessible. These MCMC algorithms are used to find a probability distribution based on a constructed Markov chain.

The key difference between a Markov model and MCMC, it that with a Markov model you model a natural system around a Markov chain, and with MCMC you create your own Markov chain.

--------

## Sources and further reading:

[^1]:[Lecture 31: Markov Chains, Statistics 110, Harvard University (Accessed: 15th July 2015)](https://www.youtube.com/watch?v=8AJPs3gvNlY)
[^3]:[Origin of Markov chains, Journey into Information Theory, Computer Science, Khan Academy (Accessed: 15th July 2015)](https://www.khanacademy.org/computing/computer-science/informationtheory/moderninfotheory/v/markov_chains)
