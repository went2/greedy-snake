(function(window, undefined){

    var elements = [];

    function Snake(){
        this.direction = 'right';
        this.body =[
            {x: 5, y: 3, background: 'url("images/head.png")'},
            {x: 4, y: 3, background: 'url("images/body.png")'},
            {x: 3, y: 3, background: 'url("images/body.png")'}
        ];

    }

    function removeSnake(){
        for (var i = elements.length - 1; i >= 0; i--) {
            // remove div
            elements[i].parentNode.removeChild(elements[i]);

            // remove elements in array
            elements.splice(i, 1);
        }
    }

    Snake.prototype.renderSnake = function(map) {
        // remove previous snake
        removeSnake();

        // create dom node
        for(var i = 0; i < this.body.length; i++) {
            var objSnake = this.body[i];

            // two representation of snake:
            // module: data in the array of snake object
            // viewer: nodes in DOM
            var div = document.createElement('div');
            map.appendChild(div);
            elements.push(div);

            // set their class attributes
            div.setAttribute('class', 'snake');

            // set their initial position with their size hard coded
            div.style.left = objSnake.x * 20 + 'px';
            div.style.top = objSnake.y * 20 + 'px';
            div.style.backgroundImage = objSnake.background;
            //div.style.backgroundSize = 'cover';
        }

    };

    Snake.prototype.move = function(food, map){
        // body of snake(not head) move:
        for (var i = this.body.length - 1; i > 0; i--){
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        // snake head move:
        var head = this.body[0];
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

        // snake eats food
        var headX = head.x * 20;
        var headY = head.y * 20;
        if (headX === food.x && headY === food.y) {
            // snake get longer
            // obtain the last element of this.body, and push a new element to it
            var last = this.body[this.body.length - 1];
            this.body.push(
                {
                    x: last.x,
                    y: last.y,
                    background: 'url("images/body.png")'
                }
            );

            // food generated randomly
            food.renderFood(map);
        }


    };

    // expose Snake to other modules
    window.Snake = Snake;

})(window, undefined);