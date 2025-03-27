// Check to see if any of the elements in the
// array are numbers greater than 10.

function anyGreaterThan10(input) {
  return input.some(n => n > 10);
};

// Check to see if any of the strings in
// the array is longer than 10 characters.

function longWord(input) {
  return input.some(word => word.length > 10);
};

// Check to see if any of the elements in
// the matrix are true.

function truePossibilities(input) {
  return input.reduce((acc, arr, index) => {
    if (index === 0) {
      return arr.some(elem => elem === true);
    }
    else {
      return acc || arr.some(elem => elem === true);
    }
  }, false);
};

// Check to see if 'Lost' is in
// the phrase (using some).

function lostCarcosa(input) {
  return input.some(arr => arr.includes('Lost'))
};

module.exports = {
  anyGreaterThan10,
  longWord,
  truePossibilities,
  lostCarcosa
};