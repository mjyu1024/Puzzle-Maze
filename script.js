let canvas = document.querySelector("#play-ground");
let ctx = canvas.getContext("2d");
let statusElement = document.querySelector("#status");
let display = document.querySelector("#time");

// set up player & speed
let playerX = 20;
let playerY = 140;
let speed = 10;
let jump = 20;

// function that draw the player
const drawPlayer = (x, y) => {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
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

// function that draw the line
const drawSVG = (svg) => {
    return new Path2D(svg);
};
let path0 = drawSVG("M20 140h60V80H20V20h60M100 20h30v120m30-120h-30M340 20h30v120m30-120h-30M180 140V20h60v120m-60-60h60M260 140V20h60v60h-50v10h10v10h10v10h10v10h10v10h10v10");
let hintPath0 = drawSVG("M580 140V20h60v120m-60-60h60M560 20h-60v120h60V80h-30M660 140V20h10v30h10v30h20V50h10V20h10v120M800 140h-60V20h60m-30 60h-30");

const drawHint = (hint) => {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.stroke(hint);
};

const drawPath = (shape) => {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 10;
    ctx.stroke(shape);
};

const shapes = [];
let shape0 = {
    name: "start",
    path: path0,
};
shapes.push(shape0);

const hints = [];
let hint0 = {
    name: "game",
    path: hintPath0,
};
hints.push(hint0);

// function that draw the route
const drawRoute = (x, y) => {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(x - 5, y - 5, 10, 10);

}

const routes = [];
let route0 = {
    x: playerX,
    y: playerY,
}
routes.push(route0);

const addToRoutes = (route) => {
    let found = routes.some(function (r) {
        return r.x === route.x && r.y === route.y;
    });

    if (!found) {
        routes.push(route);
    }
}

// function that clean the canvas
const step = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let m = 0; m < hints.length; m++) {
        drawHint(hints[m].path);
    }

    for (let i = 0; i < shapes.length; i++) {
        drawPath(shapes[i].path);
    }

    for (let n = 1; n < routes.length; n++) {
        let route = routes[n];
        drawRoute(route.x, route.y);
    }
    drawRoute(routes[0].x, routes[0].y);
    drawPlayer(playerX, playerY);
    window.requestAnimationFrame(step);
};

// function to control moves
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

// function to check moves
const onTrack = (event) => {
    for (let i = 0; i < shapes.length; i++) {
        if (ctx.isPointInStroke(shapes[i].path, playerX, playerY)) {
            statusElement.innerText = "Right on track!";
            let route = {
                x: playerX,
                y: playerY,
            };
            addToRoutes(route);
        } else {
            statusElement.innerText = "Alert!";
        }

    }
};

const startTimer = (duration, display) => {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
};

alert("Let's start the game!");
document.addEventListener("click", startTimer(5, display));

if (display.textContent === 0 + ":" + 0) {
    clearInterval(startTimer(5, display));
    alert("Time's out! Let's startover.");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let m = 0; m < hints.length; m++) {
        drawHint(hints[m].path);
    }

    for (let i = 0; i < shapes.length; i++) {
        drawPath(shapes[i].path);
    }

    let playerX = 20;
    let playerY = 140;
    drawRoute(routes[0].x, routes[0].y);
    drawPlayer(playerX, playerY);
} else {
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("keydown", onTrack);
    window.requestAnimationFrame(step);
}

