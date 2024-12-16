// Definición de la función 'snakeUI' que inicializa la interfaz del juego de la serpiente
var snakeUI = function () {
	// Crea una nueva instancia del campo de juego con dimensiones de 20x30
	var plane = new SnakeGame.Plane(20, 30);
	// Inicializa el campo de juego como una nueva matriz de tamaño definido
	plane.plane = plane.newPlane();

	// Coloca al menos una manzana en el campo
	while (plane.apples.length == 0) {
		plane.placeApple();
	}

	// Inicializa la serpiente, agregando dos partes iniciales
	for (var i = 0; i < 2; i++) {
		// Crea una nueva parte de la serpiente
		plane.snake.push(new SnakeGame.Snake());
		// Asigna una posición inicial para cada parte de la serpiente
		plane.snake[i].pos = [9, 1 - i];
	}
	// Define que la primera parte de la serpiente es la cabeza
	plane.snake[0].head = true;
	// Establece la dirección inicial de la serpiente (hacia el este)
	plane.snake[0].direction = "east";

	// Configura un evento para capturar las teclas presionadas por el usuario
	$('html').keydown(function (event) {
	  console.log("You pressed keycode: " + event.keyCode); // Muestra el código de la tecla presionada

	  // Cambia la dirección de la serpiente según la tecla presionada
		switch (event.keyCode) {
		case 38: // Tecla de flecha arriba
			plane.snake[0].turn('north'); // La serpiente gira hacia el norte
			break;
		case 40: // Tecla de flecha abajo
			plane.snake[0].turn('south'); // La serpiente gira hacia el sur
			break;
		case 37: // Tecla de flecha izquierda
			plane.snake[0].turn('west'); // La serpiente gira hacia el oeste
			break;
		case 39: // Tecla de flecha derecha
			plane.snake[0].turn('east'); // La serpiente gira hacia el este
		}
	});

	// Renderiza el campo de juego (muestra la serpiente y las manzanas)
	plane.render();

	// Inicia el ciclo de juego, actualizando el estado del juego periódicamente
	plane.gameLoop();
};

// Ejecuta la función snakeUI cuando el documento esté listo
$(snakeUI);
