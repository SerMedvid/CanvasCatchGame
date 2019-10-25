let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let rectDimention = 60;
let spriteInterval = 2000;
let rectId = 0;
let scoreGame = 0;
let isPaying = false;
let spriteTimeOut;

let rectanglesArray = [];


function getRandomColor() {
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

function getRandomStart(){
    return Math.round(Math.random() * (canvas.width-rectDimention));
}

function getrandomSpeed(){
    return Math.round(Math.random() * 5 + 1);
}

function getRandomInterval() {
    return Math.round(Math.random() * 900 + 300);
}

function addRect() {
    let newRect = {};
    newRect.id = rectId++;
    newRect.x = getRandomStart();
    newRect.y = 0;
    newRect.speed = getrandomSpeed();
    newRect.color = getRandomColor();
    rectanglesArray[rectanglesArray.length] = newRect;
    spriteInterval = getRandomInterval();
    spriteTimeOut = setTimeout( addRect, spriteInterval );
}

function drawRect() {
    rectanglesArray.forEach((el, idx, arr) => {
        ctx.beginPath();
        ctx.rect(el.x, el.y, rectDimention, rectDimention);
        ctx.fillStyle = el.color;
        ctx.fill();
        ctx.closePath();
        el.y += el.speed;
        if(el.y > canvas.height) {
            arr.splice(idx, 1);
        }
    });
}

function catchRect(event) {
    rectanglesArray.forEach((el, idx, arr) => {
        if((el.x <= event.layerX && (el.x + rectDimention) >= event.layerX) && (el.y <= event.layerY && ((el.y + rectDimention) >= event.layerY))) {
            scoreGame++;
            document.querySelector('#score').textContent = scoreGame;
            arr.splice(idx, 1);  
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(isPaying) {    
        drawRect();
        window.requestAnimationFrame(draw); 
    }
}

function reset(){
    isPaying = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.querySelector('#score').textContent = "0";
    scoreGame = 0;
    rectId = 0;
    rectanglesArray = [];
    clearTimeout(spriteTimeOut);
}

function start(){
    reset();
    isPaying = true;
    spriteTimeOut = setTimeout( addRect, spriteInterval);
    draw();  
    document.querySelector('.startBtn').classList.add('hide');
    document.querySelector('.stopBtn').classList.remove('hide');    
}

function stop() {
    isPaying = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearTimeout(spriteTimeOut);
    document.querySelector('.stopBtn').classList.add('hide');
    document.querySelector('.startBtn').classList.remove('hide');  
}

canvas.addEventListener('mousedown', function(e){
    catchRect(e)
});