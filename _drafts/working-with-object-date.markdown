---
layout: post
title: "Working with object Date"
description: "Some description"
categories:
    - JS
hero:
    imagePath: persistence-memory.jpg
    paint: The Persistence of Memory
    author: Salvador Dalí
    link: https://en.wikipedia.org/wiki/The_Persistence_of_Memory
tags:
    - js
    - front-end
twitter_text: "Value and reference types"
---

```js
// Get the time
var dt = new Date();
console.log(dt.toTimeString()) // 02:58:27 GMT-0200 (BRST)

// Get the today date
var dt = new Date();
console.log(dt.toDateString()) // Thu Dev 22 2016

var dt = new Date();
console.log(dt.getFullYear()) // 2016

//You can also pass a date inside Date object
var dt = new Date("2016-12-22");
console.log(dt.toTimeString()) // Wed Dec 21 2016
```

## Libraries worth mentioning

### moment.js

