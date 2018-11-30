let canvas = document.querySelector("#play-ground");
let ctx = canvas.getContext("2d");
const statusElement = document.querySelector("#status");

// set up player & speed
let playerX = 20;
let playerY = 140;
let speed = 10;
let jump = 20;

// set up draw function
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

const drawRoute = (x, y) => {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(x - 5, y - 5, 10, 10);

}

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
            // for (let n = 0; n < routes.length; n++) {
            //     console.log(route, routes[n]);
            //     if (route.x !== routes[n].x || route.y !== routes[n].y) {
            //         routes.push(route);
            //     }
            // }
            addToRoutes(route);
        } else {
            statusElement.innerText = "Outside Shape";
        }

    }
};

document.addEventListener("keydown", onKeydown);
document.addEventListener("keydown", onTrack);
window.requestAnimationFrame(step);

