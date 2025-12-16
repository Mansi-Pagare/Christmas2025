const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 350;
canvas.height = 400;

const coworkers = [
    "Mansi", "Bruce", "Shannon", "Loretta",
    "Cole", "Adrianna", "Ashley", "Mandi",
    "Don", "Atiana", "Sheralyn", "Dave",
    "Mark", "Jason", "Stephanie", "Chasity",
    "Trever"
];

let snowballs = [];
let splats = [];
let snowflakes = [];

// create snowflakes
for (let i = 0; i < 50; i++) {
    snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 2,
        speed: Math.random() * 1.5 + 0.5
    });
}

// Base Snowball Class
class Snowball {
    constructor() {
        this.x = 30;
        this.y = Math.random() * (canvas.height - 80) + 40;
        this.radius = 10;
        this.speed = 7;
    }

    update() {
        this.x += this.speed;
        if (this.x > canvas.width - 40) {
            createSplat(this.x, this.y);
            showResult();
            return false;
        }
        return true;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

// Chocolate Snowball (sticky effect)
class ChocolateSnowball extends Snowball {
    constructor() {
        super();
        this.color = "brown";
        this.radius = 12;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.x += this.speed;
        if (this.x > canvas.width - 40) {
            createSplat(this.x, this.y, "brown", 60);
            showResult(true);
            return false;
        }
        return true;
    }
}

// Splat class
class Splat {
    constructor(x, y, color = "white", life = 30) {
        this.life = life;
        this.color = color;
        this.particles = [];

        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x,
                y,
                dx: (Math.random() - 0.5) * 6,
                dy: (Math.random() - 0.5) * 6,
                r: Math.random() * 6 + 3
            });
        }
    }

    update() {
        this.life--;
        this.particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            p.dy += 0.2; // gravity
        });
    }

    draw() {
        ctx.fillStyle = this.color;
        this.particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

// create splat
function createSplat(x, y, color = "white", life = 30) {
    splats.push(new Splat(x, y, color, life));
}

// show hit result + play sounds
function showResult(isChocolate = false) {
    const target = coworkers[Math.floor(Math.random() * coworkers.length)];
    const messages = isChocolate
        ? [
            `🍫 Chocolate SPLAT! ${target} got chocolate’d !!`,
            `😂 ${target} is now covered in chocolate snow!`,
        ]
        : [
            `❄️ SPLAT! ${target} got nailed!`,
            `💥 Snow explosion on ${target}!`,
            `😂 ${target} was NOT ready for that!`,
            `☃️ ${target} is officially buried in snow!`,
            `😱 Direct hit! ${target} may never emotionally recover.`,
            `🎯 Bullseye! ${target} walked straight into that snowball.`
        ];

    // Play sounds
    if (isChocolate) {
        const jingle = document.getElementById("jingleSound");
        jingle.currentTime = 0;
        jingle.play();
    } else {
        const splat = document.getElementById("splatSound");
        splat.currentTime = 0;
        splat.play();
    }

    // display message
    document.getElementById("result").innerText =
        messages[Math.floor(Math.random() * messages.length)];
}

// draw snowflakes
function drawSnowflakes() {
    snowflakes.forEach(f => {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        f.y += f.speed;
        if (f.y > canvas.height) f.y = 0;
    });
}

// main draw loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw snowflakes
    drawSnowflakes();

    // update + draw snowballs
    snowballs = snowballs.filter(ball => {
        ball.draw();
        return ball.update();
    });

    // update + draw splats
    splats = splats.filter(splat => {
        splat.update();
        splat.draw();
        return splat.life > 0;
    });

    requestAnimationFrame(draw);
}

// click to throw
canvas.addEventListener("click", () => {
    let snowballType = Math.random() < 0.2 ? new ChocolateSnowball() : new Snowball();
    snowballs.push(snowballType);
});

// start animation
draw();
