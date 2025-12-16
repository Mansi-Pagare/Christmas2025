const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 🔹 Responsive canvas
function resizeCanvas() {
    const size = Math.min(window.innerWidth * 0.95, 400);
    canvas.width = size;
    canvas.height = size * 1.15;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const splatSound = document.getElementById("splatSound");

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

// ❄️ Create snowflakes
function createSnowflakes() {
    snowflakes = [];
    for (let i = 0; i < 50; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3 + 2,
            speed: Math.random() * 1.5 + 0.5
        });
    }
}
createSnowflakes();

// 🎯 Snowball class
class Snowball {
    constructor(color = "white", radius = 10, sticky = false) {
        this.x = 30;
        this.y = Math.random() * (canvas.height - 80) + 40;
        this.radius = radius;
        this.speed = 7;
        this.color = color;
        this.sticky = sticky;
    }

    update() {
        this.x += this.speed;
        if (this.x > canvas.width - 40) {
            createSplat(this.x, this.y, this.color, this.sticky ? 60 : 30);
            playSplat();
            showResult(this.sticky);
            return false;
        }
        return true;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// 💥 Splat effect
class Splat {
    constructor(x, y, color, life) {
        this.life = life;
        this.color = color;
        this.particles = [];

        for (let i = 0; i < 10; i++) {
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
            p.dy += 0.25;
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

// ➕ Create splat
function createSplat(x, y, color, life) {
    splats.push(new Splat(x, y, color, life));
}

// 🔊 Play splat sound (single sound for all)
function playSplat() {
    splatSound.currentTime = 0;
    splatSound.play();
}

// 📝 Show result
function showResult(isChocolate = false) {
    const target = coworkers[Math.floor(Math.random() * coworkers.length)];

    const messages = isChocolate
        ? [
            `🍫 Chocolate SPLAT! ${target} got chocolate’d!!`,
            `😂 ${target} is now suspiciously sticky.`,
            `😳 ${target} regrets standing there.`
        ]
        : [
            `❄️ SPLAT! ${target} got nailed!`,
            `💥 Snow explosion on ${target}!`,
            `😂 ${target} was NOT ready for that!`,
            `☃️ ${target} is officially buried in snow!`,
            `🎯 Bullseye! ${target} never saw it coming.`
        ];

    document.getElementById("result").innerText =
        messages[Math.floor(Math.random() * messages.length)];
}

// ❄️ Draw snowflakes
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

// 🔁 Animation loop
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawSnowflakes();

    snowballs = snowballs.filter(ball => {
        ball.draw();
        return ball.update();
    });

    splats = splats.filter(splat => {
        splat.update();
        splat.draw();
        return splat.life > 0;
    });

    requestAnimationFrame(draw);
}

// 👆 Click & tap to throw
function throwSnowball() {
    const isChocolate = Math.random() < 0.2;
    const ball = isChocolate
        ? new Snowball("brown", 12, true)
        : new Snowball();
    snowballs.push(ball);
}

canvas.addEventListener("click", throwSnowball);
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    throwSnowball();
});

// 🚀 Start
draw();
