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
      this.trevesed = false;
      this.rcost = Infinity;
      this.fcost = Infinity;
      this.parent = null;
    }

    distance(){
        return getDistance(this.coordinates, setEnd);
    }
    trev(){
        this.box.style.backgroundColor = "rgb(123, 255, 0)"
        return this.parent 
    }
    cost(node){
        let hcost = getDistance(this.coordinates, setEnd);
        let rcost = node.rcost + 1;
        
        if (this.rcost > rcost ){
            this.parent = node
            this.rcost = rcost
        }
        this.fcost = hcost + this.rcost
        
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
        this.isStart = true;
        this.rcost = 0;
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
var width = 30;
var squareHeight = (display.offsetHeight-1)/width;
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

function getDistance(coordinates, targetcoordinates){
    jDistance = Math.abs( coordinates[0] - targetcoordinates[0] );
    iDistance = Math.abs( coordinates[1] - targetcoordinates[1] );
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
        if( (neighborsCo[i][0]<0 || neighborsCo[i][1]<0 ) || (neighborsCo[i][0]>=width || neighborsCo[i][1]>=width)){
            neighborsCo[i] = null
        } 
    }
    return neighborsCo
    }


async function a_star(){
    let startnode = gameGrid[setStart[0]][setStart[1]]
    let open = [];
    open.push(startnode);
    var closed = [];
    var node = open[0];
    
    while(!node.isEnd){
        await sleep(50)
        if (bre){
            break;
        }
        let neib = node.getNeighbours()
        for (i = 0; i < neib.length; i++){
            let c_node = neib[i];
            if(c_node.visited && !c_node.isBlocked){
                node.cost(c_node)
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
        
        open.shift();    
        open = quick_Sort(open)
        node = open[0];
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
    await sleep(100)
    if (!node.isStart){
        treverse(node.trev())
    }
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
            let d1 = array[i].fcost
            let d2 = pivot.fcost
		    if ( d1 <= d2 ) {
			    left.push(array[i]);
		    } else {
			    right.push(array[i]);
		    }
	    }  
    }
    return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
}

function quick_Sortr(array) {
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
            let d1 = array[i].rcost 
            let d2 = pivot.rcost 
		    if ( d1 <= d2 ) {
			    left.push(array[i]);
		    } else {
			    right.push(array[i]);
		    }
	    }  
    }
    return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
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