function multiplyBy10(array) {
  return array.map(n => n*10);
}

function shiftRight(array) {
  const lastElem = array[array.length-1];
  array.pop();
  array.unshift(lastElem);
  return array;
}

function getVowels(word, vowels) {
  let finalWord = '';
  for (let letter of word) {
    if(vowels.includes(letter)) {
      finalWord += letter;
    }
  }
  return finalWord;
}

function onlyVowels(array) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return array.map(word => getVowels(word, vowels));
}

function doubleMatrix(array) {
  return array.map(arr => arr.map(n => n*2));
}

module.exports = {
  multiplyBy10,
  shiftRight,
  onlyVowels,
  doubleMatrix
};