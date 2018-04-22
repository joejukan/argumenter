# Function Argument Parser
[![Build Status](https://api.travis-ci.org/joejukan/argumenter.svg?branch=master)](http://travis-ci.org/joejukan/argumenter)
[![NPM Version](http://img.shields.io/npm/v/@joejukan/argumenter.svg?style=flat)](https://www.npmjs.org/package/@joejukan/argumenter)
[![NPM Downloads](https://img.shields.io/npm/dm/@joejukan/argumenter.svg?style=flat)](https://npmcharts.com/compare/@joejukan/argumenter?minimal=true)

A tool that parses function arguments into primitives, objects, arrays and functions.<br/>
The **Argumenter** is useful for `functions` and `constructors` that have multiple parameters/arguments passed to it.<br/>
Making it very useful when exposing functions as **TypeScript** overloads.<br/><br/>

## Usage
The **Argumenter** class is used within function implementations to parse input arguments.<br/>
```typescript
import { Argumenter } from "@joejukan/argumenter";
export function someFunc(...args){
    let a = new Argumenter(args);
}
```

The **Argumenter** class provides 5 **getter** properties that are used to extract values from the parameters that are passed into the function.<br/>

|Property          |Description                                                        |
|------------------|-------------------------------------------------------------------|
|string            |Retrieves a `string` value from the available function arguments   |
|number            |Retrieves a `number` value from the available function arguments   |
|boolean           |Retrieves a `boolean` value from the available function arguments  |
|object            |Retrieves an `object` from the available function arguments        |
|array             |Retrieves an `array` from the available function arguments         |
|function          |Retrieves a `callback` from the available function arguments       |

```typescript
import { Argumenter } from "@joejukan/argumenter";
function handleArgs(...args){
    let a = new Argumenter(args);
    console.log(`string: ${a.string}, number: ${a.number}, boolean: ${a.boolean}`);
}

handleArgs('Hello World!', 3320, true);
// string: Hello World!, number: 3320, boolean: true

handleArgs(3320, true, 'Hello World!');
// string: Hello World!, number: 3320, boolean: true
```
**Note:** that it does not matter the order of the parameters.  The Argumenter will successfully parse the arguments according to their types.<br/><br/>

The **Argumenter** class provides 1 function [instance](https://github.com/joejukan/argumenter/blob/master/src/argumenter.ts#47) that isolates objects of a specific class in the input arguments.

```typescript
import { Argumenter } from "@joejukan/argumenter";
class Doctor {
}

class Lawyer {
}

class Engineer {
}

class Pediatrician extends Doctor {
}

function occupation(...args){
    let a = new Argumenter(args);
    let lawyer = a.instance(Lawyer);
    let doctor = a.instance(Doctor);

    if(lawyer){
        console.log('Legal Advice');
    }
    if(doctor){
        console.log('Medical Advice');
    }
}

occupation(new Doctor());
// Medical Advice

occupation(new Lawyer());
// Legal Advice

occupation(new Engineer());
//

occupation(new Pediatrician());
// Medical Advice
```

Below is an example on how to utilize the **Argumenter** to support an overloaded function in typescript.
```typescript
import { Argumenter } from "@joejukan/argumenter";

hello();
hello(name: string);
hello(age: number);
hello(name: string, age: number);
hello(age: number, name: string);
hello(...args){
    var a = new Argumenter(args);
    var name = a.string;
    var age = a.number;

    if(name && age){
        return `Hello ${name}, your are ${age} years old`;
    }

    else if(name){
        return `Hello ${name}`;
    }

    else if(age){
        return `Hello, you are ${age} years old`;
    }

    return "Hello, I do not know your age.";
}
```
**Note:** that all types of argumentation permutations are supported in typescript overloading.<br/><br/>

The **Argumenter** class can handle multiple parameters of the same type:
```typescript
import { Argumenter } from "@joejukan/argumenter";

interface Person{
    firstName: string;
    lastName: string;
}

function createPerson(firstName: string, lastName: string): Person
function createPerson(...args): Person{
    var a = new Argumenter(args);
    let first = a.string;
    let last = a.string;

    return <Person>{firstName: first, lastName: last}
}

let person = createPerson('Jane', 'Doe');
console.log(person);
// { firstName: 'Jane', lastName: 'Doe'}
```
**Note**: The property getter (`string` in this case) was used to retrieve both string parameter values one at a time.
Therfore, it is important to store the results of the getter properties to separate variables.  A argument parameter value will no longer
be accessible from the **Argumenter** object once it is exposed by the getter property.<br/><br/>


## Installation
Do the following steps to install **argumenter**:
```
npm install @joejukan/argumenter
```

## Authors
**01)** **Joseph Eniojukan** - [joejukan](https://github.com/joejukan)<br/>

## ChangeLog
[CHANGELOG.md](https://github.com/joejukan/argumenter/blob/master/CHANGELOG.md) file for details

## License
This project is licensed under the ISC License - see the [LICENSE.md](https://github.com/joejukan/argumenter/blob/master/LICENSE.md) file for details

Copyright 2018 Joseph Eniojukan

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.