export default class Food {
  constructor (x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.foodElement = [];
  }

  renderFood(map) {
    if(this.foodElement[0]) this.removeFood();

    // generate random positon for food
    this.x = parseInt(map.offsetWidth / 20 * Math.random()) * 20;
    this.y = parseInt(map.offsetHeight / 20 * Math.random()) * 20;

    const ele = document.createElement('div');
    this.foodElement.push(ele);
    ele.classList.add('food');
    ele.style.left = `${this.x}px`;
    ele.style.top = `${this.y}px`;

    map.appendChild(ele);
  }

  removeFood() {
    this.foodElement[0].parentNode.removeChild(this.foodElement[0]);
    this.foodElement.pop();
  }
}

