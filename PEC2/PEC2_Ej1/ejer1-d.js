async function findOne(list, { key, value }) {
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

const callFindOne = async (users, { key, value }) => {
    try {
        const data = await findOne(users, { key, value });
        console.log('findOne success');
        console.log(data);
    }
    catch (err) {
        console.log('findOne error');
        console.log(err.message);
    }
};

/*

En este caso, hemos creado un array con las distintas promesas asincronas, el arrInfo.
findInParallel se llama también de forma asincrona y entra en un try/catch, donde va a llamar a todas las promesas con Promise.all.
Promise.all las irá poniendo para resolverse sin esperar secuencialmente a que se resuelvan. 
De modo que mientras antes teniamos primero a Carlos y luego a Fermin, ahora metemos a Carlos y mientras Carlos se resuelve, Fermin también. 
Al final cuando todas se han resuelto las junta y printa por pantalla los resultados.
También tenemos un catch por si findInParallel tuviera un error, pero en este caso es difícil que eso pase
Y por último, ya fuera de la función, la llamada de esta.


*/

const arrInfo = [callFindOne(users, { key: 'name', value: 'Carlos' }),
callFindOne(users, { key: 'name', value: 'Fermin' })];

async function findInParallel(arr) {
    try {
        return await Promise.all(arr);
    }
    catch (err) {
        console.error(err);
    }
}

findInParallel(arrInfo);