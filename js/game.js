(function(window, undefined){

    var that; // record game object
    
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    Game.prototype.start = function(){
        this.food.renderFood(this.map);
        this.snake.renderSnake(this.map);

        // make snake move
        runSnake();

        // key control
        bindKey();
    }

    function bindKey(){
        document.addEventListener('keydown', function(e){
            // 37-left 38-top 39-right 40-down
            switch(e.keyCode) {
                case 37:
                    this.snake.direction = 'left';
                    break;
                case 38:
                    this.snake.direction = 'top';
                    break;
                case 39:
                    this.snake.direction = 'right';
                    break;
                case 40:
                    this.snake.direction = 'bottom';
                    break;
            }

        }.bind(that), false)
    }

    function runSnake(){
        var timeId = setInterval(function(){
            this.snake.move(this.food, this.map);
            this.snake.renderSnake(this.map);

            var maxX = this.map.offsetWidth / 20;
            var maxY = this.map.offsetHeight / 20;
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;

            if(headX <= 0 || headX >=  maxX) {
                alert('Game Over!');
                clearInterval(timeId);
            }

            if(headY <= 0 || headY >=  maxY) {
                alert('Game Over!');
                clearInterval(timeId);
            }

        }.bind(that), 150)
    }

    window.Game = Game;
})(window, undefined);

