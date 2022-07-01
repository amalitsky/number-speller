import { strict as assert } from 'node:assert';
// eslint-disable-next-line
import test from 'node:test';

// @ts-ignore
import { spellNumber } from './main.ts';

const tests = [{
  input: 0,
  output: 'zero',
}, {
  input: 5,
  output: 'five',
}, {
  input: 10,
  output: 'ten',
}, {
  input: 13,
  output: 'thirteen',
}, {
  input: 21,
  output: 'twenty one',
}, {
  input: 200,
  output: 'two hundred',
}, {
  input: 317,
  output: 'three hundred seventeen',
}, {
  input: 1024,
  output: 'one thousand twenty four',
}, {
  input: 3000,
  output: 'three thousand',
}, {
  input: 2010,
  output: 'two thousand ten',
}, {
  input: 31337,
  output: 'thirty one thousand three hundred thirty seven',
}, {
  input: 65535,
  output: 'sixty five thousand five hundred thirty five',
}, {
  input: 1073741824,
  output:
    'one billion seventy three million seven hundred forty one thousand eight hundred twenty four',
}, {
  input: 10000003,
  output: 'ten million three',
}, {
  input: 1000023,
  output: 'one million twenty three',
}];

test('basic spelling tests', async (t) => {
  const promises = tests.map(({ input, output }) => {
    return t.test(`spells out ${ input } as expected`, () => {
      const result = spellNumber(input);

      assert.equal(result, output);
    });
  });

  await Promise.all(promises);
});

test('throws on faulty inputs', async (t) => {
  await t.test('negative number', () => {
    assert.throws(() => {
      spellNumber(-1);
    });
  });

  await t.test('number too large', () => {
    assert.throws(() => {
      spellNumber(Number.MAX_SAFE_INTEGER);
    });
  });

  await t.test('string', () => {
    assert.throws(() => {
      // @ts-ignore
      spellNumber('aaaa');
    });
  });

  await t.test('NaN is passed', () => {
    assert.throws(() => {
      spellNumber(NaN);
    });
  });
});

test('drops decimal fraction for non round numbers', () => {
  assert.equal(spellNumber(111.88), 'one hundred eleven');
});
