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

function getArrNames(animal, sex) {
  let arrNames = [];
  animal[1].residents.forEach(resident => {
    if (sex === undefined) {
      arrNames.push(resident.name);
    }
    else {
      const correctAnimal = (sex === resident.sex) ? resident.name : '';
      if (correctAnimal !== '') {
        arrNames.push(correctAnimal);
      }
    }
  })
  return arrNames;
}

function mountDictionary(key, elements, pushElem) {
  if (key in elements) {
    let existingElements = elements[key];
    existingElements.push(pushElem);
    return { ...elements, [key]: existingElements }
  }
  else {
    return { ...elements, [key]: [pushElem] }
  }
}

function animalMap(options) {
  const animals = data.animals;
  if (options === undefined) {
    return Object.entries(animals).reduce((allAnimals, animal, index) => {
      if (index === 0) {
        return { [animal[1].location]: [animal[1].name] };
      }
      else {
        return mountDictionary(animal[1].location, allAnimals, animal[1].name);
      }
    }, {});
  }
  if (options['includeNames'] === undefined && options['sex'] !== undefined) {
    return Object.entries(animals).reduce((allAnimals, animal, index) => {
      const checkGender = animal[1].residents.some(subAnimal => subAnimal.sex === options['sex']);
      if (checkGender) {
        if (index === 0) {
          return { [animal[1].location]: [animal[1].name] };
        }
        else {
          return mountDictionary(animal[1].location, allAnimals, animal[1].name);
        }
      }
      else {
        return allAnimals;
      }
    }, {});
  }
  else {
    return Object.entries(animals).reduce((allAnimals, animal, index) => {
      const allAnimalNames = getArrNames(animal, options['sex']);
      const animalObj = { [animal[1].name]: allAnimalNames };
      if (index === 0) {
        return { [animal[1].location]: [animalObj] };
      }
      else {
        return mountDictionary(animal[1].location, allAnimals, animalObj);
      }
    }, {});
  }
}

function animalPopularity(rating) {
  const animals = data.animals;
  if (rating === undefined) {
    return Object.entries(animals).reduce((ratedAnimals, animal, index) => {
      if (index === 0) {
        return { [(animal[1].popularity).toString()]: [animal[1].name] };
      }
      else {
        return mountDictionary(animal[1].popularity, ratedAnimals, animal[1].name);
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

function findManagerName(manager) {
  const foundManager = employeesByIds(manager);
  return foundManager[0].firstName + ' ' + foundManager[0].lastName;
}

function managersForEmployee(idOrName) {
  if (idOrName === undefined) {
    return {};
  }
  else {
    const myEmployee = (idOrName.includes('-')) ? employeesByIds(idOrName) : [employeeByName(idOrName)];
    const managers = myEmployee[0].managers;
    const namedManagers = Object.entries(managers).map(manager => findManagerName(manager[1]));
    myEmployee[0].managers = namedManagers;
    return myEmployee[0];
  }
}

function processAnimalSpecie(id) {
  const myAnimal = animalsByIds(id);
  return myAnimal[0].name;
}

function employeeCoverage(idOrName) {
  const employees = data.employees;
  if (idOrName === undefined) {
    return Object.entries(employees).reduce((employeesAnimals, employee, index) => {
      const employeeFullName = employee[1].firstName + ' ' + employee[1].lastName;
      const getAnimalsNames = employee[1].responsibleFor.map(animal => processAnimalSpecie(animal));
      if (index === 0) {
        return { [employeeFullName]: getAnimalsNames };
      }
      else {
        return { ...employeesAnimals, [employeeFullName]: getAnimalsNames };
      }
    }, {});
  }
  else {
    const myEmployee = (idOrName.includes('-')) ? employeesByIds(idOrName) : [employeeByName(idOrName)];
    const employeeFullName = myEmployee[0].firstName + ' ' + myEmployee[0].lastName;
    const getAnimalsNames = myEmployee[0].responsibleFor.map(animal => processAnimalSpecie(animal));
    return { [employeeFullName]: getAnimalsNames };
  }
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
