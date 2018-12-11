let canvas = document.querySelector("#play-ground");
let ctx = canvas.getContext("2d");
let statusElement = document.querySelector("#status");
let display = document.querySelector("#time");
let lifeCounter = document.querySelector("#life-counter");

// set up player & speed
const player = {
    x: 20,
    y: 20,
    speed: 10,
    jump: 20,
    duration: 180,
}


// function that draw the player
const drawPlayer = () => {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.ellipse(player.x, player.y, 8, 10, 0, Math.PI, 2 * Math.PI);
    ctx.lineTo(player.x + 4, player.y);
    ctx.lineTo(player.x + 4, player.y + 10);
    ctx.lineTo(player.x - 8, player.y + 10);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(player.x, player.y - 2, 2, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
}

// function that draw the line
const drawSVG = (svg) => {
    return new Path2D(svg);
};
let path0 = drawSVG("M420 140h60V80h-60V20h60M20 20h30v120M80 20H50M100 140V20h60v60h-50v10h10v10h10v10h10v10h10v10h10v10M240 140h-60V20h60m-30 60h-30M260 140V20h10v30h10v30h20v30h10v30h10V20M340 140V20h40v10h10v10h10v80h-10v10h-10v10z");
let hintPath0 = drawSVG("M740 20h30v120m30-120h-30M660 140V20h60v120m-60-60h60M820 140V20h60v60h-50v10h10v10h10v10h10v10h10v10h10v10M580 140V20h10v30h10v30h20V50h10V20h10v120M900 20h60m-60 120h60M930 20v120M980 20v20h10v20h10v20h20v20h10v20h10v20m0-120v20h-10v20h-10v20m-40 60v-20h10v-20h10V80");

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

let shape = {
    name: "start",
    path: path0,
};

let hint = {
    name: "game",
    path: hintPath0,
};

// function that draw the route
const drawRoute = (x, y) => {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(x - 5, y - 5, 10, 10);
}

let routes = [];
let route0 = {
    x: player.x,
    y: player.y,
}
routes.push(route0);

const addToRoutes = () => {
    let route = {
        x: player.x,
        y: player.y,
    };
    let found = routes.some(function (r) {
        return r.x === route.x && r.y === route.y;
    });

    if (!found) {
        routes.push(route);
    }
}

const drawAllRoutes = () => {
    for (let i = 0; i < routes.length; i++) {
        let route = routes[i];
        drawRoute(route.x, route.y);
    }
}

// function that clean the canvas
const step = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawHint(hint.path);
    drawPath(shape.path);


    drawAllRoutes()
    drawPlayer();
    window.requestAnimationFrame(step);
};

// function to control moves
const onKeydown = (event) => {
    let userPress = event.key;
    if (userPress === "ArrowUp") {
        player.y += -1 * player.speed;
    }
    if (userPress === "ArrowDown") {
        player.y += 1 * player.speed;
    }
    if (userPress === "ArrowLeft") {
        player.x += -1 * player.speed;
    }
    if (userPress === "ArrowRight") {
        player.x += 1 * player.speed;
    }
    if (userPress === " ") {
        player.x += 1 * player.jump;
    }
};

// function to check moves
const onTrack = (event) => {
    if (ctx.isPointInStroke(shape.path, player.x, player.y)) {
        statusElement.innerText = "Right on track!";
        addToRoutes();
    } else {
        statusElement.innerText = "Off the track!";
    }

};

// function to reset level
const resetLevel = () => {
    drawHint(hint.path);
    drawPath(shape.path);

    // Reset the player's position
    player.x = 20;
    player.y = 20;

    // Reset the routes
    routes = [];
    routes.push(route0);

    player.duration = 180;
    startTimer(player.duration, display);
};

// set life counter
let lifes = [
    1,
    2,
    3,
];

const lifeTimer = () => {
    if (lifes.length === 0) {
        alert("You have run out of life!");
        window.location.href = "tutorial.html";
    }

    let n = lifes.length - 1;
    lifeCounter.textContent = lifes[n];
};

const lifeMinus = () => {
    lifes.pop();
};

// set win condition
const win = () => {
    if (routes.length === 198) {
        alert("Congratulation! You pass the level!");
        window.location.href = "tutorial.html";
    }
}

// function to start timer
const startTimer = (duration, display) => {
    let intervelID = setInterval(() => {
        lifeTimer();
        win();

        let minutes = parseInt(duration / 60, 10)
        let seconds = parseInt(duration % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        duration = duration - 1;

        if (duration < 0) {
            clearInterval(intervelID);
            alert("Time's out! Let's startover.");
            resetLevel();
            lifeMinus();
        }
    }, 1000);

};

startTimer(player.duration, display);
document.addEventListener("keydown", onKeydown);
document.addEventListener("keydown", onTrack);
window.requestAnimationFrame(step);
