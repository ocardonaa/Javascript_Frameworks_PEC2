// Check to see if all elements in an array
// are even numbers.

const filters_functions = require('../b_filter/core')

function allEven(input) {
  const isEven = (number) => number % 2 == 0;
  return input.every(isEven);
}

// Check to see if all elements in an array
// are of the same type.

function allSameType(input) {
  const typeFirst = typeof input[0];
  const sameType = (elem) => typeof elem === typeFirst;
  return input.every(sameType);
}

// Check to see if every element in the matrix is
// an array and that every element in the array is
// greater than 0.

function positiveMatrix(input) {
  const isPositive = (number) => number >= 0;
  return input.reduce((acc, val) => acc && val.every(isPositive), true);
}

// Check that all items in an array are strings
// and that they all only contain the same vowels.

function allSameVowels(input) {
  return input.reduce((acc, word) => acc && filters_functions.checkSameVowels(word), true);
}

module.exports = {
  allEven,
  allSameType,
  positiveMatrix,
  allSameVowels
};