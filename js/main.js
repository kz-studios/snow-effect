import ControlPanel from './ControlPanel.js';
import Snowflake from './Snowflake.js';

const canvas = document.getElementById('snow-overlay');
const ctx = canvas.getContext('2d');

const panel = new ControlPanel();

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const snowflakes = [];
const numberOfFlakes = 100;

for (let i = 0; i < numberOfFlakes; i++) {
    const flake = new Snowflake();
    flake.reset(canvas.width, canvas.height); 
    snowflakes.push(flake);
}

let lastTime = 0;

function animate(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentSpeedMultiplier = panel.settings.speedMultiplier;

    snowflakes.forEach(flake => {
        flake.update(currentSpeedMultiplier, dt, canvas.width, canvas.height); 
        flake.draw(ctx);   
    });

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);