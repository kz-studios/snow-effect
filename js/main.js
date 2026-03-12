import ControlPanel from './ControlPanel.js';
import Snowflake from './Snowflake.js';

const canvas = document.querySelector('#snow-overlay');
const ctx = canvas.getContext('2d');

const panel = new ControlPanel();

let activeAsset = 'circle';

window.addEventListener('assetChanged', (e) => {
    const selectedAsset = e.detail.asset;
    console.log('New asset is:', selectedAsset);

    if (selectedAsset === 'snowflake') {
        const snowflakeImg = new Image();
        
        snowflakeImg.onload = () => {
            activeAsset = snowflakeImg; 
        };
        
        snowflakeImg.src = 'assets/snowflake-png.webp';
        
    } else if (selectedAsset === 'circle') activeAsset = 'circle';
});

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
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
    // dt = delta time (amount of time that has passed between the previous frame and the current frame)
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentSpeedMultiplier = panel.settings.speedMultiplier;
    const currentDriftAngle = panel.settings.driftAngle;

    snowflakes.forEach(flake => {
        flake.update(currentSpeedMultiplier, currentDriftAngle, dt, canvas.width, canvas.height); 
        flake.draw(ctx, activeAsset);
    });

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);