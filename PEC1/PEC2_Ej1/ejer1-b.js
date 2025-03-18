/* 

Primero, cambié la función de findOne para que devolviera una Promise, the modo que ahora sigue realizando el find, pero cuando hay exito devuelve un resolve con usuario: Nombre y si hay error lanza un reject a los 2 segundos

*/
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

/*
 
Tuve que moverlo un poco más arriba porque no lo encontraba
 
*/

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

Aquí cree una función a la que llamar para gestionar la promise. Esta contiene los usuarios y el usuario a buscar y con then y catch resuelve.
Si lo encuentra hace un console log del dato en el then que viene del resolve y si no lo encuentra hace un catch con el error que le viene de reject

*/

const callFindOne = (users, { key, value }) => {
    findOne(users, { key, value })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err.message);
        });
}

/*
 
Aqui cambié la función de modo que ya no se llama directamente a findOne sino que llama a la gestión de la promesa y luego se llama a la propia promesa.
Mencionar que se han eliminado las 2 funciones de callback de onSuccess y onError
 
*/

console.log('findOne success');
callFindOne(users, { key: 'name', value: 'Carlos' });

console.log('findOne error');
callFindOne(users, { key: 'name', value: 'Fermin' });