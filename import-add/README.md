Description
-----------
Original question: https://stackoverflow.com/questions/44363126/insert-arbitrary-text-and-modify-nodearrays-in-the-typescript-compiler-api


### Simulation

 - `git clone git@github.com:RubaXa/typescript-api-questions.git`
 - `cd typescript-api-questions/import-add`
 - `npm i`
 - `node compiler.js`
 - `cat input.js`


```ts
// 1. Input
const message = "Hmmm....";

// 2. After transformation
import externalWrapper from "@external/wrapper";
const message = externalWrapper("Hmmm....");

// 2. Expected compiled result
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wrapper_1 = require("@external/wrapper");
var message = wrapper_1.default("Hmmm....");
```


##### But, acutal compiled result

````ts
import externalWrapper from "@external/wrapper";
var message = externalWrapper("Hmmm....");
```
