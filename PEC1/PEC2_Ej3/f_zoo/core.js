const data = require('./data');

function calculatePrice(person, prices) {
  const keyPerson = Object.keys(person).toString();
  let valueTicket = 0;
  Object.entries(prices).forEach(key => {
    if (key[0] === keyPerson) {
      valueTicket = key[1] * person[keyPerson];
    }
  }
  );
  return valueTicket;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants.length === 0) {
    return 0;
  }
  else {
    const prices = data.prices;
    const arrAmountPers = Object.keys(entrants).map(key => ({ [key]: entrants[key] }));
    return arrAmountPers.reduce((totalPrice, elem, index) => {
      if (index === 0) {
        return calculatePrice(elem, prices);
      }
      else {
        return totalPrice + calculatePrice(elem, prices)
      }
    }, 0);
  }
}

function itIsMonday(open, close) {
  const isMonday = (open === 0 && close === 0) ? true : false;
  return isMonday;
}

function mountDayText(open, close) {
  return 'Open from ' + open.toString() + 'am until ' + (close - 12).toString() + 'pm';
}

function schedule(dayName) {
  const days = data.hours;
  if (dayName === undefined) {
    return Object.entries(days).reduce((daysSchedule, day, index) => {
      const daySchedule = (itIsMonday(day[1].open, day[1].close)) ? 'CLOSED' : mountDayText(day[1].open, day[1].close);
      if (index === 0) {
        return { [day[0]]: daySchedule };
      }
      else {
        return { ...daysSchedule, [day[0]]: daySchedule };
      }
    }, {});
  }
  else {
    const oneDay = Object.entries(days).filter(day => day[0] === dayName);
    if (itIsMonday(oneDay[0][1].open, oneDay[0][1].close)) {
      return { [oneDay[0][0]]: 'CLOSED' };
    }
    else {
      const daySchedule = mountDayText(oneDay[0][1].open, oneDay[0][1].close);
      return { [oneDay[0][0]]: daySchedule };
    }
  }
}

function animalCount(species) {
  // your code here
}

function animalMap(options) {
  // your code here
}

function animalPopularity(rating) {
  // your code here
}

function animalsByIds(ids) {
  // your code here
}

function animalByName(animalName) {
  // your code here
}

function employeesByIds(ids) {
  // your code here
}

function employeeByName(employeeName) {
  // your code here
}

function managersForEmployee(idOrName) {
  // your code here
}

function employeeCoverage(idOrName) {
  // your code here
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalPopularity,
  animalsByIds,
  animalByName,
  employeesByIds,
  employeeByName,
  managersForEmployee,
  employeeCoverage
};
