import Food from './Food.js';
import Snake from './Snake.js';

export default class Game {

  constructor(map) {
    
    this.map = map;
    this.food = new Food();
    this.score = document.querySelector('.score');
    this.restart = document.querySelector('.restart');
    this.playTimes = 0;
  }

  start() {
    if(this.playTimes === 0) {
      this.bindKey();
      this.bindHandler();
    }

    this.snake = new Snake();

    this.food.renderFood(this.map);
    // this.snake.renderSnake();

    clearInterval(this.timer);
    this.runSnake();

    this.playTimes++
  }

  runSnake() {
    this.timer = setInterval(() => {
      this.snake.move(this.food, this.map);
      this.snake.renderSnake(this.map);

      var maxX = this.map.offsetWidth / 20;
      var maxY = this.map.offsetHeight / 20;
      var headX = this.snake.body[0].x;
      var headY = this.snake.body[0].y;

      if(headX <= 0 || headX >=  maxX || headY <= 0 || headY >=  maxY) {
          clearInterval(this.timer);
      }
    }, 150)
  }

  bindKey() {
    document.addEventListener('keydown', this.keydownHandler.bind(this), false)
  }

  bindHandler() {
    this.restart.addEventListener('click', this.start.bind(this))
  }

  keydownHandler(event) {
    if (event.defaultPrevented) {
      return; // Do nothing if event already handled
    }
    
    switch(event.code) {
      case "KeyW":
      case "ArrowUp":
        this.snake.direction = 'top';
        break;
      case "KeyS":
      case "ArrowDown":
        this.snake.direction = 'bottom';
        break;
      case "KeyA":
      case "ArrowLeft":
        this.snake.direction = 'left';
        break;
      case "KeyD":
      case "ArrowRight":
        this.snake.direction = 'right';
        break;
    }

    if (event.code !== "Tab") {
      // Consume the event so it doesn't get handled twice,
      // as long as the user isn't trying to move focus away
      event.preventDefault();
    }
  }
}

