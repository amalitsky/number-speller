const ones = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const teens = [
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];

const tens = [
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];

const ORDER_HUNDRED = 100;
const ORDER_THOUSAND = 1000;
const ORDER_MILLION = 1000**2;
const ORDER_BILLION = 1000**3;

const groupLabelsMap = {
  1: '',
  [ORDER_HUNDRED]: 'hundred',
  [ORDER_THOUSAND]: 'thousand',
  [ORDER_MILLION]: 'million',
  [ORDER_BILLION]: 'billion',
};

// eslint-disable-next-line no-mixed-operators
export const maxSupportedNumber = ORDER_BILLION * 1000 - 1;

/**
 * Spell out single digit from 0 to 9.
 */
function spellSingleDigit(digit: number): string {
  return ones[digit];
}

/**
 * Spell out numbers between ten and 19.
 */
function spellTeens(value: number): string {
  return teens[value - 10];
}

/**
 * Spell out single or double-digit from 0 to 99.
 */
function spellDoubleDigit(value: number): string {
  if (value < 10) {
    return spellSingleDigit(value);
  }

  if (value < 20) {
    return spellTeens(value);
  }

  const tensIndex = Math.floor(value / 10);

  const tensStr = `${ tens[tensIndex - 2] }`;

  const remainder = value % 10;

  if (remainder === 0) {
    return tensStr;
  }

  return `${ tensStr } ${ spellSingleDigit(remainder) }`;
}

/**
 * Append group suffix based on the group order.
 */
function appendGroupSuffix(valueString: string, order: number): string {
  const suffix = groupLabelsMap[order];

  if (!suffix) {
    return valueString;
  }

  return `${ valueString } ${ suffix }`;
}

/**
 * Spell numbers from 0 (as an empty string) to 999.
 */
function spellNumberGroup(value: number): string {
  if (value === 0) {
    return '';
  }

  let hundredsString = '';

  const hundreds = Math.floor(value / 100);

  if (hundreds) {
    hundredsString = appendGroupSuffix(
      spellSingleDigit(hundreds),
      ORDER_HUNDRED
    );

    value -= hundreds * 100;

    if (value === 0) {
      return hundredsString;
    }
  }

  const doubleDigitString = spellDoubleDigit(value);

  if (!hundredsString) {
    return doubleDigitString;
  }

  return `${ hundredsString } ${ doubleDigitString }`;
}

/**
 * Spell out an integer from 0 to 1000 billion minus one.
 */
export function numberSpeller(value: number): string {
  value = Math.floor(value);// work with integers only

  if (value < 0) {
    throw Error('Negative values are not supported');
  }

  if (value > maxSupportedNumber) {
    throw Error('Number too large');
  }

  if (value === 0) {
    return 'zero';
  }

  const groups: number[] = [];

  let step = 1;

  while (value / step >= 1) {
    // i.e. 512 451 235 and step = 1 000 => 451
    // step 1 000 000 => 512, etc
    const group = Math.floor(value / step % 1000);

    groups.push(group);

    step *= 1000;
  }

  const topGroupIndex = groups.length - 1;

  return groups
    .reverse()// higher groups first
    .map(value => spellNumberGroup(value))
    .map((value, index) => {
      // no suffix for an empty group, pass '' down the line
      if (!value) {
        return value;
      }

      return appendGroupSuffix(
        value,
        Math.pow(1000, topGroupIndex - index),
      );
    })
    .filter(value => value !== '') // dropping zeroes (empty groups)
    .join(' ');
}
