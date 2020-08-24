var display = document.querySelector("#visualization");
var width = 50;
var squareHeight = (display.offsetHeight-(2*width))/width;
var extraPixels = display.offsetHeight - ((width*(squareHeight+2)) - 2);
console.log(extraPixels);
display.style.cssText = 'margin-right: -' + extraPixels +'px;';
 



var x = 0;
var y = 0;
while(x<width){
    while(y<width){
        display.insertAdjacentHTML('beforeend', `<div class="box" style="height: ${squareHeight}px; width: ${squareHeight}px;" id="${y}-${x}"></div>`);
        y++;
    }
    x++;
    y = 0;
}



// console.log(squareHeight)
// console.log(display.offsetHeight)
// console.log(width)