function print(toPrint){
    console.log(toPrint);
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}




class Spot {
    constructor(box) {
      this.box = box;
      this.coordinates = getCoordinates(box);
      this.isVisited = false;
      this.isBlocked = false; 
      this.isStart = false;
      this.isEnd = false;
      this.box.onmousedown = this.onmousedown;
      this.box.onmouseover = this.onmouseover;
      this.box.oncontextmenu = (e) =>{e.preventDefault()}
      this.box.ondrag = (e) =>{e.preventDefault()}
      this.box.draggable = false;
      this.walked = false;
    }

    distance(){
        return getDistance(this.coordinates);
    }

    block(){
        if(!this.isEnd && !this.isStart){
            this.box.style.backgroundColor = "black";
            this.isBlocked = true;
        }   
    }

    default(){
        this.box.style.backgroundColor = "";
        this.isBlocked = false;
        if (this.isEnd){
            setEnd = 0
        }
        if (this.isStart){
            setStart = 0
        }
        this.isEnd = false;
        this.isEnd = false;  
    }

    start(){
        this.box.style.backgroundColor = "green";
        this.isVisited = true;
        this.isStart = true
    }

    end(){
        this.box.style.backgroundColor = "blue";
        this.isEnd = true;
    }
    visited(){
        if (!this.isEnd){
            this.box.style.backgroundColor = "red";
        }
        this.isVisited = true;
    }
    walk(){
        if (!this.isEnd){
            this.box.style.backgroundColor = "rgba(34, 165, 52, 0.699)";
        }
        this.walked = true
    }
    getNeighbours(){
        // let p1 = performance.now();
        let nCo = neighbors(this.box);
        let i = 0;
        let neighboursAr = []
        while (i<8){
            if ((nCo[i] !== null) && (nCo[i] !== undefined)){
                y = nCo[i][0];
                x = nCo[i][1];
                if (!(gameGrid[y][x].isBlocked)) {
                    neighboursAr.push(gameGrid[y][x]);
                }
            }
            i++;
        }
        // let p2 = performance.now()
        // print(p2-p1)
        return neighboursAr
    }

    onmousedown(e){
        e.preventDefault();
        let x = getCoordinates(this);
        let y = x[0]
        x = x[1]
        let spot = gameGrid[y][x]
        if (e.button === 2){
            spot.default()
        }
        else {
            if (!setStart){
                spot.start()
                setStart = spot.coordinates;
            }
            else if(!setEnd){
                spot.end()
                setEnd = spot.coordinates;
             }
            else {
                spot.block();
            }
        }  
    }
    onmouseover(e){
        e.preventDefault();
        let x = getCoordinates(this);
        let y = x[0]
        x = x[1]
        let spot = gameGrid[y][x]
        if(e.buttons === 1){
            if (!setStart){
                spot.start()
                setStart = spot.coordinates;
            }
            else if(!setEnd){
                spot.end()
                setEnd = spot.coordinates;
            }
            else {
                spot.block();
            }
        }
        else if(e.buttons === 2){
            spot.default()

        }
    }
}
  

var display = document.querySelector("#visualization");
var width = 20;
var squareHeight = display.offsetHeight/width;
var gameGrid = [];
var x = 0;
var y = 0;
var setStart = 0;
var setEnd = 0;

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
    // let p1 = performance.now();
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
        if( (neighborsCo[i][0]<0 || neighborsCo[i][1]<0 ) || (neighborsCo[i][0]>=width || neighborsCo[i][1]>=width)){
            neighborsCo[i] = null
        } 
    }
    // let p2 = performance.now();
    // print(p2-p1)
    return neighborsCo
}


async function a_star(){
    let startnode = gameGrid[setStart[0]][setStart[1]]
    let open = [];
    open.push(startnode);
    var closed = [];
    var node = open[0];
    while(!node.isEnd){
        // await sleep(100);
        let p2 = performance.now();
        if (bre){
            break;
        }
        closed.push(open[0]);
        let neib = node.getNeighbours()
        let x = 1
        for (i = 0; i < neib.length; i++){
            // await sleep(100);
            x++;
            print(x)
            if (!neib[i].isVisited && !neib[i].isBlocked && !neib[i].walked){
                neib[i].box.style.animation = "pop 0.1s ease 1 alternate";
                neib[i].walk();
                open.push(neib[i]);
                }
            }
        await sleep(10);
        open.shift();
        node = open[0];
        node.visited();
        node.box.style.animation = "pop 0.1s ease 1 alternate"
        let p1 = performance.now();
        print(p1-p2)
        print(open)
        // quick_Sort(open);
    }
}

function quick_Sort(array) {
	if (array.length <= 1) { 
		return array;
	} else {

		var left = [];
		var right = [];
		var newArray = [];
		var pivot = array.pop();
		var length = array.length;

		for (var i = 0; i < length; i++) {
			if (array[i] <= pivot) {
				left.push(array[i]);
			} else {
				right.push(array[i]);
			}
		}

		return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
	}
}

var runbtn = document.querySelector("#run");
var brbtn = document.querySelector("#break");
runbtn.onclick = run;
brbtn.onclick = br;
var bre = false
function br (){
    bre = true
}
function run(){
    bre = false
    a_star()
}