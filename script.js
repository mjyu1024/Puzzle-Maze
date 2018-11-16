let canvas = document.querySelector("#play-ground");
let ctx = canvas.getContext("2d");

let playerX = 20;
let playerY = 140;
let speed = 10;

const drawPlayer = (x,y) => {
    ctx.beginPath();
    ctx.ellipse(x,y,8,10,0,Math.PI,2*Math.PI);
    ctx.lineTo(x+4,y);
    ctx.lineTo(x+4,y+10);
    ctx.lineTo(x-8,y+10);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();   
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x,y-2,2,0,2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill(); 
    ctx.stroke();
}

const step = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer(playerX, playerY);
    window.requestAnimationFrame(step);
};

const onKeydown = (event) => {
    let userPress = event.key;
    if (userPress === "ArrowUp") {
        playerY += -1*speed;
    }
    if (userPress === "ArrowDown") {
        playerY += 1*speed;
    }
    if (userPress === "ArrowLeft") {
        playerX += -1*speed;
    }
    if (userPress === "ArrowRight") {
        playerX += 1*speed;
    }
};

document.addEventListener("keydown", onKeydown);

window.requestAnimationFrame(step);