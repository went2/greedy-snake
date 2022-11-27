export default class Snake {

  constructor(direction = 'right') {
    this.elements = [];
    this.direction = direction;
    this.body = [
      {x: 5, y: 3, background: 'url("images/head.png")'},
      {x: 4, y: 3, background: 'url("images/body.png")'},
      {x: 3, y: 3, background: 'url("images/body.png")'}
    ];
  }

  removeSnake() {
    for (let i = this.elements.length - 1; i >= 0; i--) {
      // remove div
      this.elements[i].parentNode.removeChild(this.elements[i]);

      this.elements.splice(i, 1);
    }
  }

  renderSnake(map) {
    this.removeSnake();

    this.body.forEach(snakeData => {
      const ele = document.createElement('div');
      
      this.elements.push(ele);

      // init snake style
      ele.classList.add('class', 'snake');
      ele.style.left = `${snakeData.x * 20}px`;
      ele.style.top = `${snakeData.y * 20}px`;
      ele.style.backgroundImage = snakeData.background;

      map.appendChild(ele);
    })
  }

  move(food, map) {
    // move snake body(not head)
    for(let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }

    // move head
    const head = this.body[0];
    switch(this.direction) {
      case 'right':
        head.x += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'top':
        head.y -= 1;
        break;
      case 'bottom':
        head.y += 1;
        break;
    }

    // detect food
    let headX = head.x * 20, headY = head.y * 20;
    if(headX === food.x && headY === food.y) {
      // snake gets longer
      const last = this.body[this.body.length-1];
      this.body.push({
        x: last.x,
        y: last.y,
        background: 'url("images/body.png")'
      });

      // generate food
      food.renderFood(map);
    }
  }
}