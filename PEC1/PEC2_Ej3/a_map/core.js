function multiplyBy10(array) {
  return array.map(n => n * 10);
}

function shiftRight(array) {
  const lastElem = array[array.length - 1];
  array.pop();
  array.unshift(lastElem);
  return array;
}

function getVowels(word, vowels) {
  return filteredConsonants = Array.from(word).filter(letter => vowels.includes(letter));
}

function onlyVowels(array) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return array.map(word => getVowels(word, vowels).join(''));
}

function doubleMatrix(array) {
  return array.map(arr => arr.map(n => n * 2));
}

module.exports = {
  multiplyBy10,
  shiftRight,
  onlyVowels,
  doubleMatrix,
  getVowels
};