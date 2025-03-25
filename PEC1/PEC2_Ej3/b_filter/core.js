function onlyEven(array) {
  return array.filter(n => n % 2 === 0);
}

function onlyOneWord(array) {
  return array.filter(word => !(word.indexOf(' ') >= 0));
}

function positiveRowsOnly(array) {
  return array.filter(row => !(row.some(n => n < 0)));
}

function checkSameVowels(word) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const onlyVowels = Array.from(word).filter(letter => vowels.includes(letter));
  if (onlyVowels.length !== 0) {
    const firstAppearance = onlyVowels[0];
    const isSameVowel = (currentVowel) => currentVowel === firstAppearance;
    return onlyVowels.every(isSameVowel);
  }
  else {
    return true;
  }
}

function allSameVowels(array) {
  return array.filter(word => checkSameVowels(word));
}

module.exports = {
  onlyEven,
  onlyOneWord,
  positiveRowsOnly,
  allSameVowels
};