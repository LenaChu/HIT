var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var mouseClickPositions = [];
var imageObj = new Image();
imageObj.onload = function(){
    renderGraphics();
}
imageObj.src ="images/dog3.jpg"

/*var xCoord = 100;
var yCoord = 200;
var width = 400;
var height = 100;

context.fillStyle = "red";
context.fillRect(xCoord, yCoord, width, height);
*/

function getMousePos(evt){
    var mousePosX = evt.clientX;
    var mousePosY = evt.clientY;
    var rect = canvas.getBoundingClientRect();
    var xCoord = mousePosX - rect.left;
    var yCoord = mousePosY - rect.top;

    return {xCoord, yCoord};

}
function renderGraphics(){
    context.clearRect(0,0,canvas.width, canvas.height);
    context.drawImage(imageObj,0,0);
    var width = 10;
    var height = 10;
    context.fillStyle = "green";
    //var radius = 8;
    //context.fillStyle = "blue";

    if (mouseClickPositions.length > 0){
        for (i = 0; i < mouseClickPositions.length; i++){
            var curMousePos = mouseClickPositions[i];
            //context.arc(curMousePos.xCoord, curMousePos.yCoord, radius, 0, 2 * Math.PI, false);
            context.fillRect(curMousePos.xCoord, curMousePos.yCoord, width, height);
            //create line
            if (i == 0){
                context.beginPath();
            }
            if (i > 0){
                var previousPoint = mouseClickPositions[i-1];
                context.moveTo(previousPoint.xCoord, previousPoint.yCoord);
                context.lineTo(curMousePos.xCoord, curMousePos.yCoord);
                context.strokeStyle = 'red';
                context.stroke();
            }
        }
    }
}
canvas.addEventListener('mousedown', function(evt){
    var mousePos = getMousePos(evt);
    mouseClickPositions.push(mousePos);
    renderGraphics();
}, false);
window.addEventListener('Backspace', function(evt){
    mouseClickPositions.pop();
    renderGraphics();
});