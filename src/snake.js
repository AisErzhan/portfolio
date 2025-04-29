const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');

const box = 20;
const cols = canvas.width / box;
const rows = canvas.height / box;

const gameOver = document.querySelector('.hello__game--block--snake--game-over');
const again = document.querySelector('.hello__game--block--snake--again');
const starter = document.querySelector('.hello__game--block--snake--start');

let snake;
let direction;
let food;
let score;
let game;
let gameStarted = false;

// Картинка еды
const foodImage = new Image();
foodImage.src = './src/img/Snake-Food.png';

// Генерация новой еды
function generateFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * cols) * box,
      y: Math.floor(Math.random() * rows) * box
    };
  } while (collision(newFood, snake));
  return newFood;
}

// Сброс и запуск игры
function startGame() {
  snake = [{ x: 5 * box, y: 10 * box }];
  direction = null;
  score = 0;
  food = generateFood();
  gameStarted = true; // 🔹 запускаем управление

  gameOver.style.display = 'none';
  again.style.display = 'none';
  starter.style.display = 'none';

  if (game) clearInterval(game);
  game = setInterval(draw, 120);
}

// Управление — теперь с проверкой gameStarted
document.addEventListener("keydown", event => {
  if (!gameStarted) return; // 🔹 запрет до старта

  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Голова змейки
  ctx.fillStyle = "#43D9AD";
  ctx.fillRect(snake[0].x, snake[0].y, box, box);

  // Тело с прозрачностью
  for (let i = 1; i < snake.length; i++) {
    const segment = snake[i];
    const transparency = 1 - i / snake.length;
    ctx.fillStyle = `rgba(67, 217, 173, ${transparency})`;
    ctx.fillRect(segment.x, segment.y, box, box);
  }

  // Еда
  ctx.drawImage(foodImage, food.x, food.y, box, box);

  // Очки
  ctx.fillStyle = "white";
  ctx.font = "14px' , monospace";
  ctx.fillText(" " + score, 70, 20);

  // Нет направления — нет движения
  if (direction === null) return;

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "UP") snakeY -= box;
  if (direction === "DOWN") snakeY += box;

  // Оборачивание
  if (snakeX < 0) snakeX = canvas.width - box;
  else if (snakeX >= canvas.width) snakeX = 0;

  if (snakeY < 0) snakeY = canvas.height - box;
  else if (snakeY >= canvas.height) snakeY = 0;

  // Съедание еды
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = generateFood();
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };

  if (collision(newHead, snake)) {
    clearInterval(game);
    gameStarted = false; // 🔹 блокируем управление
    gameOver.style.display = 'block';
    again.style.display = 'block';
    return;
  }

  snake.unshift(newHead);
}

// Столкновение
function collision(head, array) {
  return array.some(segment => segment.x === head.x && segment.y === head.y);
}

// Кнопки
starter.addEventListener('click', startGame);
again.addEventListener('click', startGame);
