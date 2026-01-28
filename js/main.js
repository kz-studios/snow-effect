const canvas = document.getElementById('snow-overlay');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const panel = document.getElementById('control-panel');
const header = document.getElementById('panel-header');

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

header.addEventListener('mousedown', dragStart);

window.addEventListener('mousemove', drag);

window.addEventListener('mouseup', dragEnd);

function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === header) {
        isDragging = true;
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, panel);
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    isDragging = false;
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();

const snowflakes = [];
const numberOfFlakes = 100;

for (let i = 0; i < numberOfFlakes; i++) {
    snowflakes.push(new Snowflake(canvas.width, canvas.height));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach(flake => {
        flake.update(); 
        flake.draw(ctx);   
    });

    requestAnimationFrame(animate);
}

animate();