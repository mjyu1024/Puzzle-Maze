let canvas = document.querySelector("#play-ground");
let ctx = canvas.getContext("2d");
const statusElement = document.querySelector("#status");

let playerX = 10;
let playerY = 140;
let speed = 10;
let jump = 20;

const drawPlayer = (x, y) => {
    ctx.beginPath();
    ctx.ellipse(x, y, 8, 10, 0, Math.PI, 2 * Math.PI);
    ctx.lineTo(x + 4, y);
    ctx.lineTo(x + 4, y + 10);
    ctx.lineTo(x - 8, y + 10);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y - 2, 2, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
}

const drawRoute = (x, y) => {
    ctx.beginPath();
    ctx.rect(x - 5, y - 5, 10, 10);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();
}

const shapes = [];
const drawSVG = (svg) => {
    return new Path2D(svg);
};
let path = drawSVG("M20 140h60V80H20V20h60M100 20h30v120m30-120h-30M340 20h30v120m30-120h-30M180 140V20h60v120m-60-60h60M580 140V20h60v120m-60-60h60M260 140V20h60v60h-50v10h10v10h10v10h10v10h10v10h10v10M560 20h-60v120h60V80h-30M660 140V20h10v30h10v30h20V50h10V20h10v120M800 140h-60V20h60m-30 60h-30");
let shape = {
    name: "startGame",
    path: path,
};
shapes.push(shape);

const routes = [];

const step = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < shapes.length; i++) {
        ctx.stroke(shapes[i].path);
    }
    for (let n = 0; n < routes.length; n++) {
        let route = routes[n];
        drawRoute(route.x, route.y);
    }
    drawPlayer(playerX, playerY);
    window.requestAnimationFrame(step);
};

const onKeydown = (event) => {
    let userPress = event.key;
    if (userPress === "ArrowUp") {
        playerY += -1 * speed;
    }
    if (userPress === "ArrowDown") {
        playerY += 1 * speed;
    }
    if (userPress === "ArrowLeft") {
        playerX += -1 * speed;
    }
    if (userPress === "ArrowRight") {
        playerX += 1 * speed;
    }
    if (userPress === " ") {
        playerX += 1 * jump;
    }
};

const onTrack = (event) => {
    for (let i = 0; i < shapes.length; i++) {
        if (ctx.isPointInStroke(shapes[i].path, playerX, playerY)) {
            statusElement.innerText = "Inside Shape";
            let route = {
                x: playerX,
                y: playerY,
            };
            routes.push(route);
        } else {
            statusElement.innerText = "Outside Shape";
        }

    }
};

document.addEventListener("keydown", onKeydown);
document.addEventListener("keydown", onTrack);
window.requestAnimationFrame(step);

