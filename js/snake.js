$(document).ready(function () {
	let puntos = 0;
	let anchoJuego = 400;
	let altoJuego = 400;
	let velocidad = 200; // Velocidad del juego (nivel 1 por defecto)
	let intervalId;
	let snake;
	let direction;
	let apple;
  
	// Inicializar el juego
	function iniciarJuego() {
	  // Limpiar cualquier intervalo existente
	  clearInterval(intervalId);
  
	  // Reiniciar valores
	  puntos = 0;
	  updatePoints();
  
	  // Posición inicial de la serpiente
	  snake = [{ x: 200, y: 200 }];
	  direction = "right"; // Dirección inicial
	  apple = generateApple(); // Generar manzana inicial
	  drawSnake(); // Dibujar la serpiente inicial
  
	  // Configurar el intervalo del juego
	  intervalId = setInterval(moveSnake, velocidad);
	}
  
	// Actualizar puntos
	function updatePoints() {
	  $("#puntos").text(puntos);
	}
  
	// Generar manzana en una posición aleatoria
	function generateApple() {
	  return {
		x: Math.floor(Math.random() * (anchoJuego / 20)) * 20,
		y: Math.floor(Math.random() * (altoJuego / 20)) * 20,
	  };
	}
  
	// Dibujar la serpiente y la manzana en el área de juego
	function drawSnake() {
	  let $game = $("#game");
	  $game.empty(); // Limpiar la pantalla antes de dibujar de nuevo
  
	  // Dibujar la serpiente
	  snake.forEach(segment => {
		$("<div>")
		  .addClass("snake-segment")
		  .css({
			left: segment.x,
			top: segment.y,
			width: 20,
			height: 20,
		  })
		  .appendTo($game);
	  });
  
	  // Dibujar la manzana
	  $("<div>")
		.addClass("apple")
		.css({
		  left: apple.x,
		  top: apple.y,
		  width: 20,
		  height: 20,
		})
		.appendTo($game);
	}
  
	// Mover la serpiente
	function moveSnake() {
	  let head = { ...snake[0] };
  
	  // Movimiento de la serpiente según la dirección
	  if (direction === "right") head.x += 20;
	  if (direction === "left") head.x -= 20;
	  if (direction === "up") head.y -= 20;
	  if (direction === "down") head.y += 20;
  
	  // Comprobaciones de colisión (pared o cuerpo de la serpiente)
	  if (
		head.x < 0 ||
		head.y < 0 ||
		head.x >= anchoJuego ||
		head.y >= altoJuego ||
		snake.some(segment => segment.x === head.x && segment.y === head.y)
	  ) {
		clearInterval(intervalId);
		alert("¡Perdiste! Reinicia para volver a jugar.");
		return;
	  }
  
	  // Comprobación si la serpiente come la manzana
	  if (head.x === apple.x && head.y === apple.y) {
		puntos++;
		updatePoints();
		apple = generateApple(); // Nueva manzana
	  } else {
		snake.pop(); // Eliminar último segmento si no crece
	  }
  
	  // Agregar la nueva cabeza
	  snake.unshift(head);
	  drawSnake(); // Dibujar la serpiente y la manzana nuevamente
	}
  
	// Eventos de los botones
	$("#nivel1").click(function () {
	  velocidad = 200;
	  $("#iniciar").removeClass("d-none");
	});
  
	$("#nivel2").click(function () {
	  velocidad = 100;
	  $("#iniciar").removeClass("d-none");
	});
  
	// Iniciar el juego
	$("#iniciar").click(function () {
	  iniciarJuego();
	});
  
	// Salir del juego
	$("#salir").click(function () {
	  clearInterval(intervalId);
	  alert("¡Gracias por jugar!");
	});
  
	// Control de las teclas de dirección
	$(document).keydown(function (e) {
	  if (e.which === 37 && direction !== "right") direction = "left"; // Izquierda
	  if (e.which === 38 && direction !== "down") direction = "up"; // Arriba
	  if (e.which === 39 && direction !== "left") direction = "right"; // Derecha
	  if (e.which === 40 && direction !== "up") direction = "down"; // Abajo
	});
  });
  