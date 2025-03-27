const findOne = (list, { key, value }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const element = list.find(element => element[key] === value);
            if (element) {
                resolve(`user: ${value}`);
            }
            else {
                reject(new Error('ERROR: Element Not Found'));
            }
        }, 2000);
    });
}

const users = [
    {
        name: 'Carlos',
        rol: 'Teacher'
    },
    {
        name: 'Ana',
        rol: 'Boss'
    }
];

/*

Este ha sido mi único cambio, ahora la funcion callFindOne es async y hay un await antes de llamar a findOne para que encuentre devuelva la Promise
El catch nos devuelve el mensaje de error

*/

const callFindOne = async (users, { key, value }) => {
    try {
        const data = await findOne(users, { key, value });
        console.log(data);
    }
    catch (err) {
        console.log(err.message);
    }
};

console.log('findOne success');
callFindOne(users, { key: 'name', value: 'Carlos' });

console.log('findOne error');
callFindOne(users, { key: 'name', value: 'Fermin' });