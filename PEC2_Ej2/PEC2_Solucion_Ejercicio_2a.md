a/ ¿Por qué es el valor de this es undefined?

En ES6, fat arrow sigue teniendo la función de escribir funciones de forma más compacta, pero su interacción con this es algo distinta.
Las arrow functions no están ligadas a su propio this, sino que lo heredan de su entorno, por lo que lo que hay dentro de la arrow function se determina por donde está definida la arrow function y no por donde se llama.
Por eso, si se llama sin un object context especifico, this devuelve undefined normalmente.
En nuestro caso, this.handleAddTodo mantiene el contexto de la clase Controller, y por eso funciona correctamente el llamar a this.service.addTodo(todoText)
this.service.addTodo es un metodo de service. Cuando lo pasas pierde el contexto ya que el contexto específico ya no es el mismo. Pasarle a bindAddTodo la referencia a la función directa hace que se pierda el contexto (ya no apunta a service). Hacer this.view.bindAddTodo(this.service.addTodo.bind(this.service)), ya que a la fat-arrow no se le estaria pasando un this heredado por el contexto léxico que aqui no es correcto ya que no apunta a la función que le corresponde.