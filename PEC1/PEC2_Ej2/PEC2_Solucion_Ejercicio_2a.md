a/ ¿Por qué es el valor de this es undefined?

En ES6, fat arrow sigue teniendo la función de escribir funciones de forma más compacta, pero su interacción con this es algo distinta.
Las arrow functions no están ligadas a su propio this, sino que lo heredan de su entorno, por lo que lo que hay dentro de la arrow function se determina por donde está definida la arrow function y no por donde se llama.
Por eso, si se llama sin un object context especifico, this devuelve undefined normalmente.
En nuestro caso, service da ese context no especifico, haciendo que la llamada devuelva undefined.