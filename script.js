const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

const balls = [];
const rings = [
    { x: 400, y: 300, radius: 100 },
    { x: 400, y: 300, radius: 200 },
    { x: 400, y: 300, radius: 300 }
];

function createBall() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 10,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
    };
}

for (let i = 0; i < 10; i++) {
    balls.push(createBall());
}

function drawRings() {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    rings.forEach(ring => {
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.stroke();
    });
}

function drawBall(ball) {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function updateBall(ball) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRings();
    balls.forEach(ball => {
        updateBall(ball);
        drawBall(ball);
    });
    requestAnimationFrame(update);
}

update();
