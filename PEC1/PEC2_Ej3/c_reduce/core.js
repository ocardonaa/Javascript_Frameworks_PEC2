function sum(array) {
  return array.reduce((acc, val) => acc + val);
}

function productAll(array) {
  return array.reduce((acc, subArr, index) => {
    if (index === 0) {
      return subArr.reduce((innerAcc, value) => innerAcc * value);
    }
    else {
      return acc * subArr.reduce((innerAcc, value) => innerAcc * value);
    }
  }, 0);
}

function objectify(array) {
  return array.reduce((obj, subArr, index) => {
    if (index === 0) {
      return { [subArr[0]]: subArr[1] };
    }
    else {
      return { ...obj, [subArr[0]]: subArr[1] };
    }
  }, {});
}

function luckyNumbers(array) {
  return array.reduce((sentence, val, index) => {
    if (index === 0) {
      return 'Your lucky numbers are: ' + val.toString() + ', ';
    }
    if (index === array.length - 1) {
      return sentence + 'and ' + val;
    }
    else {
      return sentence + val + ', ';
    }
  }, '');
}

module.exports = {
  sum,
  productAll,
  objectify,
  luckyNumbers
};