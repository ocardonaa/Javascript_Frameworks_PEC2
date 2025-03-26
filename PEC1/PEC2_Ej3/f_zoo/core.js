const data = require('./data');

function calculatePrice(person, prices) {
  const keyPerson = Object.keys(person).toString();
  let valueTicket = 0;
  Object.entries(prices).forEach(key => {
    if (key[0] === keyPerson) {
      valueTicket = key[1] * person[keyPerson];
    }
  });
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
        return totalPrice + calculatePrice(elem, prices);
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
    const oneDay = Object.entries(days).find(day => day[0] === dayName);
    if (itIsMonday(oneDay[1].open, oneDay[1].close)) {
      return { [oneDay[0]]: 'CLOSED' };
    }
    else {
      const daySchedule = mountDayText(oneDay[1].open, oneDay[1].close);
      return { [oneDay[0]]: daySchedule };
    }
  }
}

function animalCount(species) {
  const animals = data.animals;
  if (species === undefined) {
    return Object.entries(animals).reduce((countAnimals, animal, index) => {
      if (index === 0) {
        return { [animal[1].name]: animal[1].residents.length }
      }
      else {
        return { ...countAnimals, [animal[1].name]: animal[1].residents.length }
      }
    }, {})
  }
  else {
    const myAnimal = Object.entries(animals).find(animal => animal[1].name === species);
    return myAnimal[1].residents.length;
  }
}


function animalMap(options) {
  // your code here
}

function animalPopularity(rating) {
  const animals = data.animals;
  if (rating === undefined) {
    return Object.entries(animals).reduce((ratedAnimals, animal, index) => {
      if (index === 0) {
        return { [(animal[1].popularity).toString()]: [animal[1].name] }
      }
      else {
        const existingRating = animal[1].popularity;
        if (existingRating in ratedAnimals) {
          let existingAnimals = ratedAnimals[existingRating];
          existingAnimals.push(animal[1].name);
          return { ...ratedAnimals, [animal[1].popularity]: existingAnimals };
        }
        else {
          return { ...ratedAnimals, [(animal[1].popularity).toString()]: [animal[1].name] };
        }
      }
    }, {});
  }
  else {
    return Object.entries(animals).reduce((numAnimals, animal) => {
      if (animal[1].popularity === rating) {
        numAnimals.push(animal[1].name)
      }
      return numAnimals;
    }, []);
  }
}

function findElements(id, elements) {
  const foundElements = Object.entries(elements).find(element => element[1].id === id);
  return foundElements[1];

}

function findByIds(ids, elements) {
  if (typeof ids === 'string') {
    const myElement = Object.entries(elements).find(elem => elem[1].id === ids);
    return [myElement[1]];
  }
  else {
    const myAnimals = Object.entries(ids).map(id => findElements(id[1], elements));
    return myAnimals;
  }
}

function animalsByIds(ids) {
  if (ids === undefined) {
    return [];
  }
  else {
    const animals = data.animals;
    return findByIds(ids, animals);
  }
}


function animalByName(animalName) {
  if (animalName === undefined) {
    return {}
  }
  else {
    const animals = data.animals;
    let myAnimal = {};
    const foundAnimal = Object.entries(animals).find(animal => animal[1].residents.find(subAnimal => {
      myAnimal = subAnimal;
      return subAnimal.name === animalName;
    }));
    myAnimal['species'] = foundAnimal[1].name;
    return myAnimal;
  }
}

function employeesByIds(ids) {
  if (ids === undefined) {
    return [];
  }
  else {
    const employees = data.employees;
    return findByIds(ids, employees);
  }
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  else {
    const employees = data.employees;
    const myEmployee = Object.entries(employees).find(employee => {
      return employee[1].firstName === employeeName || employee[1].lastName === employeeName;
    });
    return myEmployee[1];
  }
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
