(function(window, undefined){

    var elementsFood = []; // only has one element: previously created food div 

    function Food(x, y){
        this.x = x || 0;
        this.y = y || 0;
    }

    function removeFood(){
        elementsFood[0].parentNode.removeChild(elementsFood[0]);
        elementsFood.pop();
    }

    // render food object to map
    Food.prototype.renderFood = function(map){
        // remove previous food
        if(elementsFood[0]) {removeFood()};

        // generate random positon of food in map
        this.x = parseInt(map.offsetWidth / 20 * Math.random()) * 20;
        this.y = parseInt(map.offsetHeight / 20 * Math.random()) * 20;
        
        // create food div and set style
        var div = document.createElement('div');
        map.appendChild(div);
        elementsFood.push(div);

        div.setAttribute('class', 'food');

        div.style.left = this.x + 'px';
        div.style.top = this.y + 'px';
    
    };
    
    window.Food = Food;

})(window, undefined);

