---
layout: post
---

_This is a post about an upcoming experimental programming language. Syntax, semantics, and language features subject to change. Last updated November 15, 2014._

The past five years have featured a Cambrian explosion of emerging programming languages. Systems languages like Rust have aimed to replace insecure infrastructure written in memory-unsafe languages like C. Languages like Swift and Go have aimed to juggle the power and speed of low level languages while also trying to introduce the niceities and features previously available only in the so-called 'scripting languages' of yore like Ruby, Python and JavaScript. One niche that that has had considerable change over these last few years is programming with JavaScript on the server or browser. Languages built on top of the JavaScript VM have flourished: ClojureScript, CoffeeScript, TypeScript, Dart, AtScript, and many other variations have gained footholds in the developer community. The

I've been working with a friend to build another language built on top of JavaScript, one that takes features from TypeScript, AtScript, and CoffeeScript with clear, simple syntax and a robust standard library. It has these goals (as written by Dirk):

> Hummingbird has a few core goals that guide the design and development of the language.
>
> * **Usable type system**: The type system in Hummingbird is designed to make life easier for programmers. Typed, static compilation provides a set of assurances not available in dynamic languages.
> * **Adaptable targeting**: Initially Hummingbird will target just Node.js and browser JavaScript execution environments. However, the intrinsic features of these targets should be exposed as a rich runtime API library rather than a core part of the language.
> * **Concise, structured syntax**: Taking the lessons of JavaScript, CoffeeScript, and Swift to heart, Hummingbird's syntax aims to establish a pleasant balance between explicit code structure and minimizing unnecessary punctuation.

I'm going to take a stab at taking you through the language and its features by implementing some familiar algorithms and data structures.

Check out algorithms immediately below, or jump to [data structures](#data-structures).

## Algorithms

* [Fibonacci](#fibonacci)
* [Merge Sort](#merge-sort)

### Fibonacci

One of the simplest in the book. Takes in `n: Integer` and returns the fibonacci number at that index of the sequence.

#### Recursive version

{% highlight swift %}

# Given n number in the fibonacci sequence, calculate it
var fibonacci = func (n: Integer) -> Integer {
  
  # If the number is 1 or 0, we've hit the bottom of the trough
  if n == 1 || n == 0 {
    return n
  }
  
  # Recurse down
  return fibonacci(n - 1) + fibonacci(n - 2)
}

{% endhighlight %}

#### Iterative version

{% highlight swift %}

# The only syntax available to create a function
let fibonacci = func (n: Integer) -> Integer {

  # Explicity typed variables
  var current: Int = 0, next: Int = 1, future: Int = 1

  # Looping
  for var i = 0; i < n; i++ {
    current = next
    next    = future
    future  = current + next
  }

  return current

}

{% endhighlight %}

### Merge Sort

A merge sort works by:  

* Dividing the unsorted array into `n` subarrays, each containing a single element.
* Repeatedly merge subarrays to produce new sorted subarrays until there is only 1 subarray remaining. This will be the sorted array.

{% highlight swift %}

let mergeSort = func (arr: Array<Any>, low: Integer, high: Integer) {
  if !arr.length || low < high {
    return;
  }

  var mid: Int = Math.floor(low/high)

  mergeSort(arr, low, mid)
  mergeSort(arr, mid + 1, high)
  merge(arr, low, mid, high)
}

let merge = func (arr: Array<Any>, 
                  low: Integer, 
                  mid: Integer, 
                  high: Integer, 
                  compare: (Any, Any) -> Boolean
                  ) -> {
  
  # Copy array
  var clone: Array<Any> = arr.slice(0)

  var left: Integer = low, 
      right: Integer = mid + 1, 
      currentIndex: Integer = 0

  while left < mid && right < high {
    if compare(clone[left], clone[right]) {
      arr[currentIndex] = clone[left]
      left += 1
    } else {
      arr[currentIndex] = clone[right]
      right += 1
    }
    currentIndex += 1
  }

  while left <= mid {
    arr[currentIndex++] = clone[left++]
  }
}

{% endhighlight %}

## Data Structures

* [Linked List](#linked-list)
* [Double Linked List](#double-linked-list)

### Linked List

{% highlight swift %}

class Node {
  var next: Node
  var data: Any
  
  # Autobind ivar with constructor
  init(this.data) -> {}

  # Convenience method for creating a new node on the list
  init(ancestor: Node, data: Any) -> {
    ancestor.next = this
    this.data = data
  }

}

class LinkedList {
  var head: Node
  var tail: Node
  var length: Integer = 0

  # Start off the linked list with some data
  init(data: Any) -> {
    let node = new Node(data)
    this.add(node)
  }

  # Add node to the end of the linked list
  # node can be the head of an existing linked list
  add(node: Node) -> {
    if !this.head {
      this.head = node
      this.tail = node
    }

    # Add to tail, replace tail
    this.tail.next = node
    this.tail = node
    
    this.length += 1
  }

  # Multiple function declarations with different parameter signatures
  add(data: Any) -> {
    var node = new Node(data)
    this.add(node)
  }

}

{% endhighlight %}
