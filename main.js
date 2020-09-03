function print(toPrint){
    console.log(toPrint);
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function int(str){
    return parseInt(str, 10);
}

var runbtn = document.querySelector("#run");
runbtn.onclick = run;
function run(){
    bre = false
    a_star()
}

var bre = false
var brbtn = document.querySelector("#break");
brbtn.onclick = br;
function br (){
    bre = true
}



class Spot {
    constructor(box) {
      this.box = box;
      this.coordinates = box.id.split("-");
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
      this.trevesed = false;
      this.rcost = Infinity;
      this.fcost = Infinity;
      this.parent = null;
    }

    distance(){
        let jDistance = Math.abs( this.coordinates[0] - setEnd[0] );
        let iDistance = Math.abs( this.coordinates[1] - setEnd[1] );
        return Math.sqrt( Math.pow(jDistance,2) + Math.pow(iDistance,2) );
    }
    trev(){
        if (!this.isEnd){
            this.box.style.backgroundColor = "rgb(123, 255, 0)";
        }
        return this.parent;
    }
    cost(node){
        let hcost = 2* this.distance();
        let rcost = node.rcost + 1;
        if (this.rcost > rcost ){
            this.parent = node;
            this.rcost = rcost;
        }
        this.fcost = hcost + this.rcost;
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
            setEnd = 0;
            this.isEnd = false;
        }
        if (this.isStart){
            setStart = 0;
            this.isStart = false; 
        }
    }

    start(){
        this.box.style.backgroundColor = "green";
        this.isVisited = true;
        this.isStart = true;
        this.rcost = 0;
        setStart = this.coordinates;
    }

    end(){
        this.box.style.backgroundColor = "blue";
        this.isEnd = true;
        setEnd = this.coordinates;

    }
    visited(){
        if (!this.isEnd && !this.isStart){
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
        let neighboursArray = []
        let c = this.box.id.split("-");
        let j = int(c[0]);
        let i = int(c[1]);
        let temporaryArray = []
        temporaryArray.push([j,i+1]);
        temporaryArray.push([j+1,i+1]);
        temporaryArray.push([j+1,i]);
        temporaryArray.push([j+1,i-1]);
        temporaryArray.push([j,i-1]);
        temporaryArray.push([j-1,i-1]);
        temporaryArray.push([j-1,i]);
        temporaryArray.push([j-1,i+1]);
        for (i=0; i<temporaryArray.length; i++) {
            if( (temporaryArray[i][0]<0 || temporaryArray[i][1]<0 ) || (temporaryArray[i][0]>=width || temporaryArray[i][1]>=width)){
            temporaryArray[i] = null;
            }
        
            if ((temporaryArray[i] !== null) && (temporaryArray[i] !== undefined)){
                y = temporaryArray[i][0];
                x = temporaryArray[i][1];
                if (!(gameGrid[y][x].isBlocked)) {
                    neighboursArray.push(gameGrid[y][x]);
                }
            }
        }
        return neighboursArray;
    }

    onmousedown(e){
        e.preventDefault();
        let x = this.id.split("-");
        let y = x[0];
        x = x[1];
        let spot = gameGrid[y][x]
        if (e.button === 2){
            spot.default();
        }
        else {
            if (!setStart){
                spot.start();
            }
            else if(!setEnd){
                spot.end();
             }
            else {
                spot.block();
            }
        }  
    }
    onmouseover(e){
        e.preventDefault();
        let x = this.id.split("-");
        let y = x[0]
        x = x[1]
        let spot = gameGrid[y][x]
        if(e.buttons === 1){
            if (!setStart){
                spot.start();
            }
            else if(!setEnd){
                spot.end();
            }
            else {
                spot.block();
            }
        }
        else if(e.buttons === 2){
            spot.default();

        }
    }
}


function getHeight(){
    let x = display.offsetHeight;
    return (x-1)/width;
}


var display = document.querySelector("#visualization");
var width = 40;
var gameGrid = [];
var x = 0;
var y = 0;
var setStart = 0;
var setEnd = 0;

async function main(){
    await sleep(1000);
    let height = getHeight();
    while(y<width){
    gameGrid.push([]);
    while(x<width){
        display.insertAdjacentHTML('beforeend', `<div class="box" style="height: ${height}px; width: ${height}px;" id="${y}-${x}"></div>`);
        gameGrid[y].push(new Spot(document.getElementById(""+y+"-"+x+"")));
        x++;
        }
    y++;
    x = 0;
}
}
main();

async function a_star(){
    let startnode = gameGrid[setStart[0]][setStart[1]]
    let open = [];
    open.push(startnode);
    var closed = [];
    var node = open[0];
    
    while(!node.isEnd){
        await sleep(20);
        if (bre){
            break;
        }
        let neib = node.getNeighbours();
        for (i = 0; i < neib.length; i++){
            let c_node = neib[i];
            if(c_node.visited && !c_node.isBlocked){
                node.cost(c_node);
            }
            if (!c_node.isVisited && !c_node.isBlocked){
                c_node.box.style.animation = "pop 0.1s ease 1 alternate";
                if (!c_node.walked){
                    open.push(c_node);
                    c_node.walk();
                }
                c_node.cost(node)
                }
            }
        
        node = open.shift();    
        open = quick_Sort(open)
        // node = open[0];
        node.visited();
        closed.push(node)
        if(open.length === 0){
            window.alert("no path")
            }
        node.box.style.animation = "pop 0.1s ease 1 alternate"
        }
        if(node.isEnd){
            treverse(node)
        }
    }

async function treverse(node){
    await sleep(50);
    if (!node.isStart){
        treverse(node.trev());
    }
    print("done!")
}

function quick_Sort(array) {
	if (array.length <= 1) { 
		return array;
	}
    else {
        var left = [];
	    var right = [];
	    var newArray = [];
	    var pivot = array.pop();
	    var length = array.length;

	    for (var i = 0; i < length; i++) {
            let d1 = array[i].fcost;
            let d2 = pivot.fcost;
		    if ( d1 <= d2 ) {
			    left.push(array[i]);
		    } else {
			    right.push(array[i]);
		    }
	    }  
    }
    return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
}
