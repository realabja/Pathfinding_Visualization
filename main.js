function print(toPrint){
    console.log(toPrint);
}

var display = document.querySelector("#visualization");
var width = 40;
var squareHeight = display.offsetHeight/width;


class Spot {
    constructor(box) {
      this.box = box;
      this.coordinates = getCoordinates(box);
      this.isVisited = false;
      this.isBlocked = false; 
      this.isEnd = false;
      this.box.onmouseover = (e)=>{
          print(e)
          print(e.buttons)
          print(this)

      }
      
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
    end(){
        this.box.style.backgroundColor = "blue";
        this.isEnd = true;
    }
    getNeighbours(){
        let nCo = neighbors(this.box);
        print(nCo)
        let i = 0;
        let neighboursAr = []
        while (i<7){
            if (nCo[i] !== null){
                y = nCo[i][0];
                x = nCo[i][1];
                print(gameGrid[y][x]);
                if (!(gameGrid[y][x].isBlocked)) {
                    neighboursAr.push(gameGrid[y][x]);
                }
            }
            i++;
        }
        return neighboursAr
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
function getDistance(coordinates){
    jDistance = Math.abs( coordinates[0] - endCoordinates[0] );
    iDistance = Math.abs( coordinates[1] - endCoordinates[1] );
    return Math.sqrt( Math.pow(jDistance,2) + Math.pow(iDistance,2) );
}

function int(str){
    return parseInt(str, 10);
}
function neighbors(box) {
    c = getCoordinates(box);
    let j = int(c[0]);
    let i = int(c[1]);
    neighborsCo = []
    neighborsCo.push([j,i+1]);
    neighborsCo.push([j+1,i+1]);
    neighborsCo.push([j+1,i]);
    neighborsCo.push([j+1,i-1]);
    neighborsCo.push([j,i-1]);
    neighborsCo.push([j-1,i-1]);
    neighborsCo.push([j-1,i]);
    neighborsCo.push([j-1,i+1]);
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















print(gameGrid);
gameGrid[3][6].start();
gameGrid[9][15].end();
print(gameGrid[0][0].getNeighbours());








// console.log(grid)
// console.log(squareHeight)
// console.log(display.offsetHeight)
// console.log(width)