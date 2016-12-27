---
layout: post
title: "Value and reference types"
description: "Some description"
categories:
    - JS
hero:
    imagePath: raphael-angel.jpg
    paint: Sistine Madonna
    author: Raphael Sanzio
    link: https://en.wikipedia.org/wiki/Sistine_Madonna
tags:
    - js
    - front-end
twitter_text: "Value and reference types"
---

## Primitive Type Storage
The primitive type storage works for Numbers, Strings and Boolean

When you store some number on a variable like:
var n = 42;
And then makes another variable equal to n
var a = n;

They both will have different memory locations.
Javascript will create a copy for a, and store a value on a different memory location than variable n.


## Reference Type Storage
```js
var firstHuman = {
   name: "Jill"
};
var human2 = human;
```

o: [pointer]
o2: [pointer]

`firstHuman` and `human2` points to the place where the object `{name: "Jill"}` is declared

If I change a property in human, I am changing a property in human2 also.

firstHuman.name = "Jack"

Now human.name is also Jack, because both objects have the same reference.

### Common Reference Types
Objects {}
Arrays []
Dates
RegExp
Functions
Primitive (via Wrappers)
