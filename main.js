var display = document.querySelector("#visualization");
var width = 20;
var squareHeight = display.offsetHeight/width;


// var extraPixels = display.offsetHeight - (width*squareHeight);
// console.log(extraPixels);

function print(toPrint){
    console.log(toPrint);
}
// display.style.cssText = 'margin-right: -' + extraPixels +'px;';
 


var grid = [];
var gameGrid = [];
var x = 0;
var y = 0;
while(y<width){
    grid.push([]);
    gameGrid.push([]);
    while(x<width){
        display.insertAdjacentHTML('beforeend', `<div class="box" style="height: ${squareHeight}px; width: ${squareHeight}px;" id="${y}-${x}"></div>`);
        gameGrid[y].push(null);
        grid[y].push(document.getElementById(""+y+"-"+x+""));
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

function block(box){
    box.style.backgroundColor = "black";
    coordinates = getCoordinates(box);
    gameGrid[coordinates[0]][coordinates[1]] = "block";
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
        if(neighborsCo[i][1]<0){
            neighborsCo[i] = null
        }
    }
}



var startCoordinates = start(grid[1][5]);
var endCoordinates = end(grid[8][9]);
block(grid[2][4]);
print(gameGrid);
print(getDistance(startCoordinates));







// console.log(grid)
// console.log(squareHeight)
// console.log(display.offsetHeight)
// console.log(width)