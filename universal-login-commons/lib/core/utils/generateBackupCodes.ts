import {utils} from 'ethers';

/* eslint-disable */

/*
Daefen
------
A library for encoding/decoding large numbers into/from a pronounceable high-density string constructed from a base of 3456 syllables.
*/

// Creates the syllable array
const syllables: string[] = [];
const consonants: string = 'bcdfghjklmnprstvwz'; // consonants that are unambiguous and easy to pronounce
const vowels: string = 'aeiouy'; // vowels

// Vowel + Consonant
for (let a = 0; a < vowels.length; a++) {
  for (let b = 0; b < consonants.length; b++) {
    syllables.push(vowels[a] + consonants[b]);
  }
}

// Consonant + Vowel
for (let b = 0; b < consonants.length; b++) {
  for (let a = 0; a < vowels.length; a++) {
    syllables.push(consonants[b] + vowels[a]);
  }
}

// Consonant + Vowel + Vowel
for (let b = 0; b < consonants.length; b++) {
  for (let a = 0; a < vowels.length; a++) {
    for (let e = 0; e < vowels.length; e++) {
      syllables.push(consonants[b] + vowels[a] + vowels[e]);
    }
  }
}

// Consonant + Vowel + Consonant
for (let b = 0; b < consonants.length; b++) {
  for (let a = 0; a < vowels.length; a++) {
    for (let c = 0; c < consonants.length; c++) {
      syllables.push(consonants[b] + vowels[a] + consonants[c]);
    }
  }
}

// Vowel + Consonant + Vowel
for (let a = 0; a < vowels.length; a++) {
  for (let b = 0; b < consonants.length; b++) {
    for (let e = 0; e < vowels.length; e++) {
      syllables.push(vowels[a] + consonants[b] + vowels[e]);
    }
  }
}

// Quick function that converts a big Number object into an array of numbers for any chosen base
export function fromBase10(bigNum: utils.BigNumber, base: utils.BigNumber) {
  const result: number[] = [];
  if (bigNum.eq(0)) {
    return [0];
  }
  for (let i = bigNum; i.gt(0); i = i.div(base)) {
    result.unshift(i.mod(base).toNumber());
  }
  return result;
}

// Important to check some spacing issues
function isConsonant(letter: string) {
  return consonants.indexOf(letter) >= 0;
}

// Converts an integer (passed as a string to avoid scientific notation issues)
export function toWords(number: utils.BigNumber) {
  const numberArray: number[] = fromBase10(number, utils.bigNumberify(syllables.length));
  let result = '';
  let lastWord = '';
  let n = 0;
  for (let i = 0; i < numberArray.length; i++) {
    n = numberArray[i] || 0;

    lastWord = result.split(' ').slice(-1)[0];

    if (
      result === '' ||
      lastWord.length === syllables[n].length ||
      (lastWord.length < 5 &&
        isConsonant(lastWord.slice(-1)) &&
        isConsonant(syllables[n].slice(0, 1)))
    ) {
      result += syllables[n];
    } else {
      result += ` ${syllables[n]}`;
    }
  }
  return result.replace(/\b[a-z]/g, function (f) {
    return f.toUpperCase();
  });
}

// Converts a valid phrase back into a number
export function fromWords(words: string) {
  const wordArray = words
    .toLowerCase()
    .replace(/[bcdfghjklmnprstvwz][bcdfghjklmnprstvwz]/gi, function (r) {
      const n = Math.floor(r.length / 2);
      return `${r.substr(0, n)} ${r.substr(n, n)}`;
    })
    .replace(/[a-z]{6}|[a-z]{4}/gi, function (r) {
      const n = Math.floor(r.length / 2);
      return `${r.substr(0, n)} ${r.substr(n, n)}`;
    })
    .split(' ');
  let result = 0;

  for (let i = 0; i < wordArray.length; i++) {
    if (syllables.indexOf(wordArray[i]) < 0) {
      return;
    }

    result =
      result +
      syllables.indexOf(wordArray[i]) *
      Math.pow(syllables.length, wordArray.length - i - 1);
  }

  return result;
}

export function generateBackupCode(
  random1: utils.BigNumber = utils.bigNumberify(utils.randomBytes(128)),
  random2: utils.BigNumber = utils.bigNumberify(utils.randomBytes(128))
) {
  const prefix = toWords(random1)
      .replace(/\s/g, '-')
    .toLowerCase();
  const suffix = toWords(random2)
      .replace(/\s/g, '-')
    .toLowerCase();
  return `${prefix}-${suffix}`;
}
