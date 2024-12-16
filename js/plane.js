// Declaración de un módulo IIFE (Immediately Invoked Function Expression) que define el juego de la serpiente
var SnakeGame = (function (Sn) {

	// Definición de la clase Plane, que representa el campo de juego
	Sn.Plane = function Plane(height, width) {
	  // Propiedades del campo de juego: altura, anchura, y arreglos para la serpiente, manzanas y una condición de pérdida
	  this.height = height;
	  this.width = width;
	  this.plane = []; // Representación interna del campo
	  this.snake = []; // Representación de la serpiente
	  this.apples = []; // Manzanas en el campo
	  this.quickAndDirtyLoseCondition = false; // Condición rápida de pérdida (se activa si la serpiente choca consigo misma)
	};
  
	// Método que ejecuta un ciclo del juego, moviendo la serpiente, colocando manzanas y verificando condiciones de pérdida
	Sn.Plane.prototype.step = function() {
	  this.render(); // Renderiza el campo
  
	  // Coloca una nueva manzana si no hay ninguna en el campo
	  while (this.apples.length == 0) {
		this.placeApple();
	  }
  
	  // Mueve la serpiente
	  this.moveSnake();
  
	  console.log(this.lose()); // Verifica si la serpiente pierde
	  // Si pierde o se activa la condición rápida de pérdida, detiene el juego
	  if (this.lose() || this.quickAndDirtyLoseCondition) {
		console.log(this.snake[0].pos[0]);
		console.log(this.snake[0].pos[1]);
		clearInterval(this.loop); // Detiene el ciclo de juego
	  }
	};
  
	// Método para verificar si la cabeza de la serpiente ha comido un objeto (manzana o parte de sí misma)
	Sn.Plane.prototype.eaten = function (obj, head) {
	  if (head.pos[0] == obj.pos[0] && head.pos[1] == obj.pos[1]) {
		return true; // La cabeza ha comido el objeto
	  }
	  return false; // No ha comido el objeto
	};
  
	// Método que inicia el ciclo de juego (loop)
	Sn.Plane.prototype.gameLoop = function () {
	  var that = this;
	  // Llama al método 'step' cada 250 ms
	  this.loop = setInterval(function () {
		that.step();
	  }, 250);
	};
  
	// Método que verifica si la serpiente ha chocado con una pared
	Sn.Plane.prototype.hitWall = function () {
	  // Verifica si la cabeza de la serpiente está fuera de los límites del campo
	  if (this.snake[0].pos[0] < 0 || this.snake[0].pos[1] < 0) {
		return true;
	  }
	  else if (this.snake[0].pos[0] >= this.height ||
			   this.snake[0].pos[1] >= this.width) {
		return true;
	  }
  
	  return false;
	};
  
	// Método que verifica si la serpiente ha perdido
	Sn.Plane.prototype.lose = function () {
	  var that = this;
  
	  // Revisa si la cabeza de la serpiente ha chocado con cualquier otra parte de su cuerpo
	  this.snake.slice(1, this.snake.length).forEach(function (el) {
		if (that.eaten(el, that.snake[0])) {
		  return that.loseCondition = true;
		}
	  });
  
	  // Verifica si la serpiente ha chocado con una pared
	  if (this.hitWall()) {
		return true;
	  }
  
	  return false;
	};
  
	// Método que mueve la serpiente en el campo
	Sn.Plane.prototype.moveSnake = function () {
	  var that = this;
  
	  // Saca la cabeza de la serpiente
	  var head = this.snake.shift();
	  var prevHeadPos = head.pos;
  
	  // Cambia la posición de la cabeza según la dirección
	  switch (head.direction) {
		case 'north':
		  head.pos = [head.pos[0] - 1, head.pos[1]];
		  break;
		case 'south':
		  head.pos = [head.pos[0] + 1, head.pos[1]];
		  break;
		case 'west':
		  head.pos = [head.pos[0], head.pos[1] - 1];
		  break;
		case 'east':
		  head.pos = [head.pos[0], head.pos[1] + 1];
	  }
  
	  var justAte = false;
	  // Verifica si la cabeza de la serpiente ha comido alguna manzana
	  this.apples.forEach(function (apple, idx) {
		if (that.eaten(apple, head)) {
		  justAte = true;
		  console.log(that.apples[idx]);
		  that.apples.splice(idx, 1); // Elimina la manzana comida
		}
	  });
  
	  var tail;
	  // Si la serpiente ha comido, crea una nueva parte de cola
	  if (justAte) {
		tail = new Sn.Snake();
	  }
	  else {
		tail = this.snake.pop(); // Elimina la última parte de la serpiente
	  }
  
	  // Si la serpiente no ha comido, verifica si la cola colisiona con la cabeza
	  if (justAte) {
		justAte = false; // Restablece la condición de haber comido
	  }
	  else if (that.eaten(tail, head)) {
		this.quickAndDirtyLoseCondition = true; // Activa la condición rápida de pérdida
	  }
  
	  // Mueve la cola a la posición anterior de la cabeza
	  tail.pos = prevHeadPos;
	  this.snake.unshift(tail); // Coloca la nueva parte de la cola al inicio de la serpiente
  
	  this.snake.unshift(head); // Coloca la nueva cabeza al inicio de la serpiente
	};
  
	// Método que crea una nueva representación del campo de juego
	Sn.Plane.prototype.newPlane = function () {
	  var newPlane = [];
  
	  // Crea una matriz bidimensional de tamaño 'height' x 'width'
	  for (var i = 0; i < this.height; i++) {
		var newRow = [];
  
		// Llena cada fila con valores nulos
		for (var j = 0; j < this.width; j++) {
		  newRow.push(null);
		}
		newPlane.push(newRow);
	  }
  
	  return newPlane;
	};
  
	// Método que coloca una nueva manzana en el campo
	Sn.Plane.prototype.placeApple = function () {
	  var row = Math.floor(Math.random() * this.height); // Elige una fila aleatoria
	  var col = Math.floor(Math.random() * this.width); // Elige una columna aleatoria
	  var pos = [row, col];
  
	  // Si la posición no está ocupada, coloca una nueva manzana
	  if (!this.seatTaken()) {
		this.apples.push(new Sn.Apple(pos));
	  }
	};
  
	// Método que renderiza el campo de juego en el navegador (usando jQuery)
	Sn.Plane.prototype.render = function () {
	  $('body').empty(); // Limpia el contenido de la página
  
	  // Crea una representación visual del campo de juego con divs y spans
	  for (var i = 0; i < this.height; i++) {
		$('body').append("<div id='div" + i + "'></div>");
		for (var j = 0; j < this.width; j++) {
		  $('#div' + i).append("<span id='span" + i + "_" + j + "'></span>");
		}
	  }
  
	  // Añade la clase 'apple' a las manzanas en el campo
	  this.apples.forEach(function (apple) {
		$('#span' + apple.pos[0] + '_' + apple.pos[1]).addClass('apple');
	  });
	  // Añade la clase 'snake' a las partes de la serpiente en el campo
	  this.snake.forEach(function (el) {
		$('#span' + el.pos[0] + '_' + el.pos[1]).addClass('snake');
	  });
	};
  
	// Método que verifica si una posición está ocupada por una parte de la serpiente o una manzana
	Sn.Plane.prototype.seatTaken = function (pos) {
	  this.snake.forEach(function (el) {
		if (el.pos == pos) {
		  return true; // La posición está ocupada por la serpiente
		}
	  });
	  this.apples.forEach(function (apple) {
		if (apple.pos == pos) {
		  return true; // La posición está ocupada por una manzana
		}
	  });
	  return false; // La posición está libre
	};
  
	// Retorna el objeto SnakeGame con todas las modificaciones realizadas
	return Sn;
  })(SnakeGame || {}); 
  