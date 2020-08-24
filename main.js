function print(toPrint){
    console.log(toPrint);
}

var display = document.querySelector("#visualization");
var width = 20;
var squareHeight = display.offsetHeight/width;


class Spot {
    constructor(box) {
      this.box = box;
      this.coordinates = getCoordinates(box);
      this.isVisited = false;
      this.isBlocked = false; 
      this.isEnd = false;
      this.neighbours = neighbors(box);
    }
    distance(){
        return getDistance(this.coordinates);
    }
    block(){
        this.box.style.backgroundColor = "black";
        this.isBlocked = true;
    }
    start(){
        this.box.style.backgroundColor = "green";
        this.isVisited = true;
    }
  }
  

// var extraPixels = display.offsetHeight - (width*squareHeight);
// console.log(extraPixels);


// display.style.cssText = 'margin-right: -' + extraPixels +'px;';
 


var gameGrid = [];
var x = 0;
var y = 0;
while(y<width){
    gameGrid.push([]);
    while(x<width){
        display.insertAdjacentHTML('beforeend', `<div class="box" style="height: ${squareHeight}px; width: ${squareHeight}px;" id="${y}-${x}"></div>`);
        gameGrid[y].push(new Spot(document.getElementById(""+y+"-"+x+"")));
        x++;
        }
    y++;
    x = 0;
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function getCoordinates(box){
    return box.id.split("-");
}

function start(box){
    box.style.backgroundColor = "green";
    coordinates = getCoordinates(box);
    gameGrid[coordinates[0]][coordinates[1]] = "start";
    return coordinates;
}

function end(box){
    box.style.backgroundColor = "blue";
    coordinates = getCoordinates(box);
    gameGrid[coordinates[0]][coordinates[1]] = "end";
    return coordinates;
}
function getDistance(coordinates){
    jDistance = Math.abs( coordinates[0] - endCoordinates[0] );
    iDistance = Math.abs( coordinates[1] - endCoordinates[1] );
    return Math.sqrt( Math.pow(jDistance,2) + Math.pow(iDistance,2) );
}
function walkto(box) {
    box.style.backgroundColor = "red";
    gameGrid[getCoordinates(box)[0]][getCoordinates(box)[1]] = "visted";
}
function neighbors(box) {
    c = getCoordinates(box);
    neighborsCo = []
    neighborsCo.push([c[0],c[1]+1]);
    neighborsCo.push([c[0]+1,c[1]+1]);
    neighborsCo.push([c[0]+1,c[1]]);
    neighborsCo.push([c[0]+1,c[1]-1]);
    neighborsCo.push([c[0],c[1]-1]);
    neighborsCo.push([c[0]-1,c[1]-1]);
    neighborsCo.push([c[0]-1,c[1]]);
    neighborsCo.push([c[0]-1,c[1]+1]);
    for (i=0; i<neighborsCo.length; i++) {
        if(neighborsCo[i][0]<0){
            neighborsCo[i] = null
        }
        else if(neighborsCo[i][1]<0){
            neighborsCo[i] = null
        }
    }
    return neighborsCo
}


var startCoordinates = start(grid[1][5]);
var endCoordinates = end(grid[8][9]);
print(gameGrid);








// console.log(grid)
// console.log(squareHeight)
// console.log(display.offsetHeight)
// console.log(width)