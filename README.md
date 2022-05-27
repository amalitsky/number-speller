# number-speller
Small (3Kb) ESM and (4Kb) commonJs NPM package to **spell numbers in plain English**.
I.e:
- `spellNumber(1000)` > _one thousand_
- `spellNumber(7598025)` > _seven million five hundred ninety eight thousand twenty five_
- `spellNumber(900000000)` > _nine hundred million_

Can be used in a browser as well and nodeJs applications.
Witten in TypeScript and covered with [unit tests](/src/tests.ts).

**[Online Demo](https://lab.amalitsky.com/projects/number-speller)**

## Installation & Usage

Install with `npm install number-speller` and import with
```ts
import { spellNumber } from 'number-speller';
```
or
```js
const { spellNumber } = require('number-speller');
```
for commonJs environment.

## API
Module exports:
- `spellNumber` function accepts a single argument - number to be spelled and returns a string.
- `maxSupportedNumber` constant with the maximum number currently supported by the module.

## Limitations
- Works with integers. Number with fractional part gets rounded.
- Supports positive numbers only.
- Doesn't support numbers passed in string form.
  I.e. `spellNumber('1000')` throws an exception.
- Maximum number currently supported is one thousand billion minus one -
  `999 999 999 999`.
- Does **not** use hyphens for numbers between `21` and `99`: _twenty one_ instead of _twenty-one_.

## Feedback and Contributions
Please open an issue if you have a question or ping
[me on twitter](https://twitter.com/amalitsky).
Thanks for your interest!
