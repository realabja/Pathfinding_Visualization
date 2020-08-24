var display = document.querySelector("#visualization");
var width = 20;
var squareHeight = display.offsetHeight/width;


// var extraPixels = display.offsetHeight - (width*squareHeight);
// console.log(extraPixels);
// display.style.cssText = 'margin-right: -' + extraPixels +'px;';
 


var grid = [];
var x = 0;
var y = 0;
while(x<width){
    grid.push([]);
    while(y<width){
        display.insertAdjacentHTML('beforeend', `<div class="box" style="height: ${squareHeight}px; width: ${squareHeight}px;" id="${x}-${y}"></div>`);
        grid[x].push(document.getElementById(""+x+"-"+y+""));
        y++;
        }
    x++;
    y = 0;
}







// console.log(grid)
// console.log(squareHeight)
// console.log(display.offsetHeight)
// console.log(width)