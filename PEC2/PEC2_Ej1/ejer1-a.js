/* 

La primera linea crea la funcion flecha, a la cual le pasa 4 parametros: la lista donde buscar, la clave y el valor de lo que hay que buscar y que hacer en caso de éxito o error
La segunda linea establece un timeout
La tercera linea es el resultado de buscar en la lista. Se usa la función find, que toma un callback como parámetro y se ejecuta para cada elemento de la lista hasta encontrar el elemento correspondiente o devolver undefined en caso de no estar. Para ello buscará que el valor que contiene la key sea igual al value que pasamos por parámetro
La cuarta linea define con una ternaria que imprimir por pantalla en función de si ha encontrado a los usuarios en el array de users o no. Ahi es donde se llaman las 2 funciones de callback, onSuccess y onError
La quinta linea cierra el setTimeout y lo establece a 2000, que serian 2 segundos de espera
La sexta linea cierra todo el conjunto

La octava y novena linea también utilizan un callback ya que las funciones flecha los emplean. Esto pasa porque es una funcion a la que se le pasa un argumento, que en este caso se le pasa una función de orden superior y por tanto, una función como parámetro, al igual que antes

De las lineas 11 a 20 tiene la estructura de datos, el array de usuarios

Por último, de las lineas 22 a 26 es donde se ejecuta el código.
En la línea 22 se hace un console log de éxito porque a findOne (linea 23) le pasaremos Carlos, el cual el callback de findOne en el find lo encontrará, element dará un resultado que no es undefind y se llamará a onSuccess, por lo que se mostrará user: Carlos con el callback
En la linea 25 se hace un console log de error porque a findOne (linea 26), le pasaremos Fermin. Este no será encontrado en el find porque Fermin no está en users, por lo que find devolverá undefined y llamará al callback de onError

*/