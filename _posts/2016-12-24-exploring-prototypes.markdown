---
layout: post
title: "Exploring Prototypes"
description: "Prototypes in Javascript are the most important things specially if you want to understand how their inheritance works. In this post I will look for prototypes closer, and explain some things along the way."
date: 2016-12-24
categories:
    - JS
hero:
    imagePath: chains.jpg
    paint: Uninterrupted chain
    author: Ryohei Hase
    link: http://www.ryoheihase.com/
tags:
    - js
    - front-end
twitter_text: "Exploring Prototypes"
---

This post assumes that you have basic knowledge of Javascript.

## Prototypes
I will cover on this first section two different roles that the property **prototype** can have depending on its context:

1. Prototype as a hidden property in all objects
2. Prototype as a visible property only in functions

As you can note, `[[prototype]]` is a hidden property that all objects have.

But `prototype` is also a visible property inside each object that is of type function. And that visible `prototype` inside each function is another object by itself. This visible `prototype` object that exists in each object of type function initializes only with a `constructor` property. More on that later.

### Prototype as a hidden property in all objects
> `[[prototype]]` is an internal property that all objects in Javascript have.

This property is usually hidden, and is commonly described with double brackets, like `[[prototype]]`. This property exists to be used internally by Javascript.

The method `Object.getPrototypeOf(yourObject)`, introduced in ECMAScript 5, can show this hidden `[[prototype]]` property

```js
var myObject = {};
myObject.prototype // undefined
Object.getPrototypeOf(myObject) // Native Object() function
```
Some browsers like Chrome implemented a non-standard property called `__proto__` as a way to get the hidden `[[prototype]]` of an object

```js
var myObject = {};
myObject.__proto__ // Native Object() function
```

### Prototype as a visible property only in Functions
Like the other objects, **functions** have a hidden `[[prototype]]` that inherits the prototype object of the native constructor function `Function()` from which all the functions inherits native methods like `call()` and `apply()`. We can see this hidden `[[prototype]]` of a function with `Object.getPrototypeOf(myFunction)`, or in some browsers with `__proto__`

```js
function myFunction(){}
Object.getPrototypeOf(myFunction) // Function.prototype object
myFunction.__proto__ // Function.prototype object
myFunction.__proto__.__proto__ // Object.prototype object
```

BUT, the object of type **Function** also has a visible/public property called **prototype** too.

> An object of type function has kind of **two prototype properties**, one that is hidden `[[prototype]]`, and every object has, and one that is visible, that is specific of functions

In functions, this visible `prototype` property is an object. And as an object, the `prototype` of a function also have a `constructor` property in it. The constructor property of the visible `prototype` of a function references the function that this prototype belongs to.

So this function in Chrome console for example

```js
function myFunction(){};
```
has the initial public `prototype` property of

```js
myFunction.prototype = {
   constructor: myFunction(),
   __proto__: Object()
}
```
So, a basic structure of properties in a function `someFunction(){}` is as follows:

![function prototype map](../assets/images/post-images/function-prototype.png)

See those constructor properties above? More on that below.

### Constructors
To go deeper in prototypes, it is essential to know a little more about constructors and what role they have in prototypes.

#### Constructor as a function
First, constructors are functions, and every function can be a constructor.

The main purpose of a constructor function is to **create new objects**, and to **define how will be the shape of these newly created objects**, like which properties and methods this new object will have.

To create a new object with a constructor it is necessary to call the constructor function with the **new** keyword like `new myConstructor()`

Each object that is created by the constructor function is called an **instance** of that constructor.

The constructor function can accept parameters that can be used to define properties for the new objects that will be created.

```js
function Human(name) { // The Constructor function with a parameter name

    /*
    The 'this' inside the constructor function is a reference
    to the instance object being created with the 'new' keyword
    */
    this.name = name;
    this.walk = function() {
        console.log(`this.name +  is walking`);
    };
};

var firstHuman = new Human('John'); // Human instance named "John"
var secondHuman = new Human('Cindy'); // Human instance named "Cindy"

firstHuman.walk() // John is walking
secondHuman.walk() // Cindy is walking
```

We can note here that `firstHuman` and `secondHuman` have the name that we passed to the constructor function. And they also have the `walk()` method defined inside the Human constructor.

`firstHuman` and `secondHuman` are both instances of the Human constructor, and we can prove that by using the `instanceof` operator, that shows if an object is an instance of some constructor function.

```js
firstHuman instanceof Human // true
secondHuman instanceof Human // true
```

Those two humans created are also inheriting the `prototype` object of the Human constructor function, and that can be seen by viewing the hidden `[[prototype]]` of one of those Human instances that we created

```js
firstHuman.__proto__
//  {
//      constructor: Human(name)
//      __proto__: // Native Object.prototype object
//  }

Human.prototype
//  {
//      constructor: Human(name)
//      __proto__: // Native Object.prototype object
//  }

firstHuman.__proto__ === Human.prototype // true
```
As you can see on the prototype chain, the first `prototype` object inherited by `firstHuman` is the `Human.prototype`, so the human instances created by the Human constructor function are inheriting the `prototype` of Human


> The hidden `[[prototype]]` property of an object is a reference to the visible `prototype` object of the constructor function that created that object. This is the hidden link between the object and the constructor function that created that object. <br><br> And this pattern repeats itself on every object, until it reaches the native built-in Object, the creator of all the other objects. This is how the prototype chain works*

<sub>
\* If you do not understand the sentence above very well, continue reading the post, come back here later and re-read it. It will make more sense.
</sub>

As a matter of proof, below we can see that the hidden `[[prototype]]` property of `myObject` is a reference to the native `Object.prototype` object.

```js
var myObject = {};
myObject.__proto__ // Native Object() function
myObject.__proto__ === Object.prototype // true
```

Now let's see the prototype, of the prototype, of one of those Human instances created

```js
firstHuman.__proto__.__proto__ // Native Object.prototype object
```

This is what is called **prototype chain**. You can 'climb' on the prototype chain and see in each step of **\_\_proto__** each `prototype` that some object is inheriting.

#### Constructor as a property
Constructor is also a property in every single object.

The `constructor` property of an object is a reference to the `constructor` property inside the `prototype` of the constructor function, used to create that object. Confused!? See some code:

```js
// The Constructor function
function Human() {};
Human.prototype.constructor // function Human() {};

var firstHuman = new Human();
firstHuman.constructor // function Human() {};

Human.prototype.constructor === firstHuman.constructor // true
```

> As we said, all objects will hold the `constructor` property in them, that references the `constructor` property inside the `prototype` object of the constructor function that was responsible for creating that particular object instance.

#### Native Constructor functions
There are **native** constructor functions that are built-in on the Javascript language, and they serve to create different types of objects, some of them are:

- Object()
- Function()
- Array()
- Number()
- Boolean()
- Date()
- RegExp()

```js
var someArray = [1, 2, 3];
someArray.constructor // Native Array() constructor
someArray.constructor === Array // true

var someBoolean = true;
someBoolean.constructor // Native Boolean() constructor
someBoolean.constructor === Boolean // true

var someNumber = 1;
someNumber.constructor // Native Number() constructor
someNumber.constructor === Number // true

var myFunction = function(a, b) {return a * b};
myFunction.constructor // Native Function() constructor
myFunction.constructor === Function // true
```

As you see above, we are using the literal notation to create those objects, and that is usually the easiest way to do it, and the way that is faster in terms of execution.

But we could have created those objects with the **new** keyword, followed by their respectives constructors.

```js
var someArray = new Array(1, 2, 3);
someArray.constructor // Native Array() constructor
someArray.constructor === Array // true

var someBoolean = new Boolean(true);
someBoolean.constructor // Native Boolean() constructor
someBoolean.constructor === Boolean // true

var someNumber = new Number(1);
someNumber.constructor // Native Number() constructor
someNumber.constructor === Number // true

var myFunction = new Function("a", "b", "return a * b");
myFunction.constructor // Native Function() constructor
myFunction.constructor === Function // true
```

##### What's the visible `prototype` of those native constructor functions?

The visible `prototype` property of those native constructor functions holds all the native methods for each object type that we know, for example:

```js
Number.prototype
```
The `prototype` property of the native constructor `Number` displays, among other things, all the methods that any object of type String created will inherit natively.

```js
{
    constructor: Number() // Reference to Number constructor function
    toExponential: toExponential() // String method
    toFixed: toFixed() // // String method
    toLocaleString: toLocaleString() // String method
    toPrecision: toPrecision() // String method
    toString: toString() // String method
    valueOf: valueOf() // String method
    Symbol(Symbol.iterator): () // In ES6 Strings are iterable
    __proto__: Object // Native Object.prototype
}
```
The same happens for the other native constructors and their prototype objects.

If you try to see the `prototype` of the native constructor `Function` with `console.log` in the browser, it will display an empty anonymous function, which is not very useful.

```js
Function.prototype // function () {}
```

So to really see `Function.prototype`, you can use `console.dir(Function.prototype)` that displays a list of the properties of the Function.prototype, like methods `call()` and `apply()` that are propagated via prototype inheritance to all functions that are created.

```js
console.dir(Function.prototype) // Function.prototype object
```

##### What's the hidden `[[prototype]]` of those native constructor functions?

It seems that every native Constructor is an instance of Function constructor first, before being an instance of Object, the final constructor. Even Object and Function itself are an instance of Function.

This is because in order to be constructors they have to be of type function, and to be of type function they need to inherit the function `prototype`.

```js
Object instanceof Function // true
Function instanceof Function // true
Array instanceof Function // true
```

That is why it requires one more step, one more `__proto__` in the browser, in order to really see the final `Object.prototype` object

```js
Object.__proto__ // Function.prototype
Object.__proto__.__proto__ // Object.prototype

Function.__proto__ // Function.prototype
Function.__proto__.__proto__ // Object.prototype

Array.__proto__ // Function.prototype
Array.__proto__.__proto__ // Object.prototype
```

And those native constructors by themselves have `Object` as their final creator.

```js
Array.__proto__.__proto__.constructor // Native Object() constructor
```

#### Object() is the master constructor function
The Native `Object` is a function `Object()`, and by being a function, the `Object` can be a constructor.

Actually, the `Object()` is the constructor of all the Javascript world that comes after it.

The Object constructor is the creator of all the other objects types like Function, Number, Array, Boolean, RegExp, and so on.

This native Object is a function that have as its hidden `[[__proto__]]` the `Function.prototype`, and then `Object.prototype`.

```js
Object.__proto__ // Function.prototype object
Object.__proto__.__proto__ // Object.prototype object
```

### Extending the Constructor prototype
But there is a problem. What if I wanted to change the `walk()` method and have that change reflected in all objects that I created earlier? Or create a new method and have those new methods working on objects that already exist?

Let's think. I know those humans are inheriting the prototype of Human function, but the `walk()` method is not on the prototype of Human function, it was defined inside the Human function itself.

A solution would be to put the `walk()` method on the prototype object of Human constructor, so all the objects created by Human will automatically inherit the `walk()` method, even if I change that method later.

```js
function Human(name) { // The Constructor function
  this.name = name;
};

Human.prototype.walk = function() {
    console.log(this.name + " is walking");
};

var firstHuman = new Human('John'); // Human instance with name John
var secondHuman = new Human('Cindy');  // Human instance with name Cindy

firstHuman.walk() // John is walking
secondHuman.walk() // Cindy is walking
```
Now if I change the walk() method that is attached to the prototype object of Human all objects created by Human will update the walk method too.

```js
Human.prototype.walk = function() {
    console.log(this.name + " is now moonwalking  🌕👟👟");
};

firstHuman.walk() // John is now moonwalking  🌕👟👟
secondHuman.walk() // Cindy is now moonwalking  🌕👟👟
```
By attaching methods on the prototype of the constructor I can manipulate those methods and see that reflected in all object that I created with Human. And that works for new methods too.

```js
Human.prototype.jump = function() {
    console.log(this.name + " jumped");
};

firstHuman.jump() // John jumped
secondHuman.jump() // Cindy jumped
```
Another win of defining methods on the prototype of the constructor function is that those methods are the same across all objects instances, being more memory-friendly

```js
firstHuman.walk === secondHuman.walk // true
firstHuman.jump === secondHuman.jump // true
```

> The visible `prototype` object of a constructor function is like a living API of properties and methods that all instances, or instances of instances, and so on, will inherit from.

## Object.create()
Another way of creating objects, introduced in ECMAScript 5, was the method `Object.create()`

This methods allows you to choose which prototype the object that you are creating will inherit properties from, and to set initial configurable properties for that object.

```js
var myObject = Object.create(Object.prototype, [OPTIONAL_PROPERTIES]);
```

And now, creating an object, and defining an initial `name` property, and setting some configurable options for it.

```js
var Human = function() {};
var firstHuman = Object.create(Human.prototype, {
    name: {
        writable: true, // Can change its value
        value: 'Emmanuelle',
        configurable: true // Property can be deleted and reconfigured,
        enumerable: true // Property is displayed on for...in loop
    }
});
```
There are other options that can be set on a configurable property, like `get()`, and `set()` but this is topic for another post.

One of the differences between creating objects with **new** keyword and `Object.create()` is that with `Object.create()` the constructor function doesn't run on the moment of creation of an object, as you see:

```js
var Human = function() {
    console.log('Human being created');
};

var firstHuman = Object.create(Human.prototype);
// No log here, because Human function didn't run

var secondHuman = new Human();
// "Human being created"
```

## Prototype chain in action with prototypal inheritance
So, in order to see a deeper prototype chain in action, lets do this chain:

`Object` > `Function` > `Animal` > `Mammal` > `Domestic` > `Dog`

Pay attention that if I set a method on a function `prototype` with the same name as a method declared earlier on the prototype chain, it will override this method declared earlier.

First, let's do this chain using the `new` keyword

```js
/***** ANIMAL CONSTRUCTOR *****/
function Animal(name) {
  this.name = name;
};
Animal.prototype.breath = function() {
    console.log(this.name + " is breathing")
};
Animal.prototype.move = function() {
    console.log(this.name + " is moving");
};



/***** MAMMAL CONSTRUCTOR *****/
function Mammal(name) {
    /*
    Calling Animal constructor function, with the new Animal instance
    being created as the value of 'this', and a parameter called name,
    that I am defining when creating the Dog instance with 'new'
    */
    Animal.call(this, name);
};

/*
Setting Mammal.prototype to an instance of Animal
Animal.prototype object can now be inherited by the Mammal Constructor
*/
Mammal.prototype = new Animal();

/*
When we set the whole Mammal.prototype to be Animal.prototype we
loose Mammal.prototype.constructor reference for Mammal instances
So we set Mammal.prototype.constructor reference back to Mammal()
*/
Mammal.prototype.constructor = Mammal;

Mammal.prototype.produceMilk = function(){
    console.log('milking');
}



/***** DOMESTIC CONSTRUCTOR *****/
function Domestic(name) {
    /*
    Calling Mammal constructor function, with the new Mammal instance
    being created as the value of 'this', and a parameter called name,
    that I am defining when creating the Dog instance with 'new'
    */
    Mammal.call(this, name);
};

/*
Setting Domestic.prototype to an instance of Mammal
Mammal.prototype object can now be inherited by the Domestic Constructor
*/
Domestic.prototype = new Mammal();

/*
When we set the whole Domestic.prototype to be Mammal.prototype we
loose Domestic.prototype.constructor reference for Domestic instances
So we set Domestic.prototype.constructor reference back to Domestic()
*/
Domestic.prototype.constructor = Domestic;

Domestic.prototype.followRules = function(){
    console.log('Obeying');
}
// Overriding Animal move method
Domestic.prototype.move = function(){
    console.log('Moving like a domestic animal');
}



/***** DOG CONSTRUCTOR *****/
function Dog(name) {
    /*
    Calling Domestic constructor function, with the new Dog instance
    being created as the value of 'this', and a parameter called name,
    that I am defining when creating the Dog instance with 'new'
    */
    Domestic.call(this, name);
};

/*
Setting Dog.prototype to an instance of Domestic
Domestic.prototype object can now be inherited by the Dog Constructor
*/
Dog.prototype = new Domestic();

/*
When we set the whole Dog.prototype to be Domestic.prototype we
loose Dog.prototype.constructor reference for Dog instances
So we set Dog.prototype.constructor reference back to Dog()
*/
Dog.prototype.constructor = Dog;

// Extending Dog.prototype with its own method
Dog.prototype.sound = function(){
    console.log('Woof Woof');
}

var someDog = new Dog('Doggy'); // new Dog instance
```

Now let's do prototype inheritance using `Object.create()`

```js
/***** ANIMAL CONSTRUCTOR *****/
function Animal(name) {
  this.name = name;
};
Animal.prototype.breath = function() {
    console.log(this.name + " is breathing")
};
Animal.prototype.move = function() {
    console.log(this.name + " is moving");
};



/***** MAMMAL CONSTRUCTOR *****/
function Mammal(name) {
    /*
    Calling Animal constructor function, with the new Animal instance
    being created as the value of 'this', and a parameter called name,
    that I am defining when creating the Dog instance with 'new'
    */
    Animal.call(this, name);
};

/*
Creating Mammal.prototype object, having as its prototype
the Animal.prototype object
*/
Mammal.prototype = Object.create(Animal.prototype);

/*
When we set the whole Mammal.prototype to be Animal.prototype we
loose Mammal.prototype.constructor reference for Mammal instances
So we set Mammal.prototype.constructor reference back to Mammal()
*/
Mammal.prototype.constructor = Mammal;

Mammal.prototype.produceMilk = function(){
    console.log('milking');
}



/***** DOMESTIC CONSTRUCTOR *****/
function Domestic(name) {
    /*
    Calling Mammal constructor function, with the new Mammal instance
    being created as the value of 'this', and a parameter called name,
    that I am defining when creating the Dog instance with 'new'
    */
    Mammal.call(this, name);
};

/*
Creating Domestic.prototype object, having as its prototype
the Mammal.prototype object
*/
Domestic.prototype = Object.create(Mammal.prototype);

/*
When we set the whole Domestic.prototype to be Mammal.prototype we
loose Domestic.prototype.constructor reference for Domestic instances
So we set Domestic.prototype.constructor reference back to Domestic()
*/
Domestic.prototype.constructor = Domestic;

Domestic.prototype.followRules = function(){
    console.log('Obeying');
}
// Overriding Animal move method
Domestic.prototype.move = function(){
    console.log('Moving like a domestic animal');
}



/***** DOG CONSTRUCTOR *****/
function Dog(name) {
    /*
    Calling Domestic constructor function, with the new Dog instance
    being created as the value of 'this', and a parameter called name,
    that I am defining when creating the Dog instance with 'new'
    */
    Domestic.call(this, name);
};

/*
Creating Dog.prototype object, having as its prototype
the Domestic.prototype object
*/
Dog.prototype = Object.create(Domestic.prototype);

/*
When we set the whole Dog.prototype to be Domestic.prototype we
loose Dog.prototype.constructor reference for Dog instances
So we set Dog.prototype.constructor reference back to Dog()
*/
Dog.prototype.constructor = Object.create(Dog.prototype);

// Extending Dog.prototype with its own method
Dog.prototype.sound = function(){
    console.log('Woof Woof');
}

var someDog = new Dog('Doggy'); // new Dog instance
```

## Class syntax
ES6 introduced a new class-like syntax for creating constructor functions. This new syntax can increase the adoption of Javascript by developers coming from other Class-based languages.

With Class syntax all methods defined inside the class Human are actually properties of `Human.prototype`. With that, all objects created by Human class will inherit those methods, and those Human methods can be changed and that will be reflected on all objects that were created.

```js
class Human {
    constructor(name) {
        this.name = name;
    }

    // The same as assigning a function to Human.prototype.walk
    walk() {
        console.log(this.name + ' is walking');
    }
}

var firstHuman = new Human('John');
firstHuman.walk(); // John is walking

Human.prototype.walk = function(){
    console.log(this.name + ' is now moonwalking  🌕👟👟')
}

firstHuman.walk(); // John is now moonwalking  🌕👟👟
```

There is also the presence of static methods in ES6 Classes. Those static methods can only be called by the Class itself, and are not callable by the objects instantiated by the Class. According to MDN documentation, static methods are often used to create utility functions for the application

```js
class Human {
    constructor(name) {
        this.name = name;
    }
    static invertHumanName(name) {
        console.log(name.split('').reverse().join(''));
    }
}

var firstHuman = new Human('John');
firstHuman.invertHumanName() // Error: invertHumanName is not a function

Human.invertHumanName(firstHuman.name) // nhoJ
```

### Prototypal inheritance with classes
The Class syntax also comes with a handy way to do prototypal inheritance with the `extends` keyword. With `extends` you can create a subclass-like.

> Under the hood Javascript is still doing its inheritance via prototypes. Class syntax comes as an easier way to achieve that inheritance.

When creating classes that extends from another you also need to call on the constructor of the subclass the `super()` and pass all the arguments necessary for the parent class to work properly. `super()` must be the first thing to call on a subclass, before using any this.someProperty.

`super()` acts as a way to access the parent class methods also.

```js
class Animal {
    constructor(name) {
        this.name = name;
    }
    breath() {
        console.log(this.name + ' is breathing')
    }
}

class Human extends Animal {
    constructor(name) {
        super(name);
        this.name = name;
    }
}

var firstHuman = new Human('John');
firstHuman.breath() // John is breathing
```

Classes are being [well adopted by different browsers](http://caniuse.com/#search=es6), but if you need to support IE for example, you would need to use a compiler like [Babel](https://babeljs.io/docs/plugins/transform-class-properties/) to compile ES6 syntax to good'n old Javascript.

There is a lot more to say about Prototypes and ES6 Classes in future posts. I hope you enjoyed.
