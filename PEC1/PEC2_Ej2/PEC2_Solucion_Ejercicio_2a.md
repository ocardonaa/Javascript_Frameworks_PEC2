a/ ¿Por qué es el valor de this es undefined?

En ES6, fat arrow sigue teniendo la función de escribir funciones de forma más compacta, pero su interacción con this es algo distinta.
Las arrow functions no están ligadas a su propio this, sino que lo heredan de su entorno, por lo que lo que hay dentro de la arrow function se determina por donde está definida la arrow function y no por donde se llama.
Por eso, si se llama sin un object context especifico, this devuelve undefined normalmente.
En nuestro caso, this.handleAddTodo es un método definido en el mismo objeto, por lo que conserva el contexto y el this devuelve correctamente.
this.service.addTodo es un metodo de service. Cuando lo pasas pierde el contexto ya que el contexto específico ya no es el mismo. Pasarle a bindAddTodo la referencia a la función directa hace que se pierda el contexto. Hacer this.view.bindAddTodo(this.service.addTodo.bind(this.service)) haria que se conservara el contexto

handleAddTodo = todoText => {
    this.service.addTodo(todoText);
  };

todoText es el contexto que le falta, que aquí lo especifica y por eso se puede completar el añadir la tarea