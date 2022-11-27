import Game from './Game.js';

const map = document.querySelector('#map');
const game = new Game(map);
game.start();