// Declaración de un módulo IIFE (Immediately Invoked Function Expression) que define un juego de serpiente
var SnakeGame = (function (Sn) {

  // Definición de un constructor para la clase Apple, que se usa para representar una manzana en el juego
  Sn.Apple = function Apple (pos) {
    // La manzana tiene una propiedad 'pos' que guarda la posición donde se encuentra en el campo de juego
    this.pos = pos;
  };

  // El módulo devuelve el objeto 'Sn', con la clase Apple ya definida dentro
  return Sn;
})(SnakeGame || {}); // Si 'SnakeGame' ya está definido, se utiliza, de lo contrario, se crea un objeto vacío
