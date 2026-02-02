const canvas = document.getElementById('snow-overlay');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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

const panel = document.querySelector('#control-panel');
const header = document.querySelector('#panel-header');
const panelRect = panel.getBoundingClientRect();

let originalLeft = panelRect.left;        // Distance from window's left side to control panel's left side
let originalTop = panelRect.top;          // Distance from window's top side to control panel's top side

// Maximum and minimum x-axis translation of control panel
const maxX = window.innerWidth - (originalLeft + panel.offsetWidth), minX = -panelRect.left;
// Maximum and minimum y-axis translation of control panel
const maxY = window.innerHeight - (originalTop + panel.offsetHeight), minY = -panelRect.top;

let isDragging = false;
let baseX, baseY;                         // Origin of control panel's new transformed coordinates
let mouseOffsetX, mouseOffsetY;           // Distance from mousedown to current mousemove
let originOffsetX = 0, originOffsetY = 0; // Distance from control panel's origin to last drag location

header.addEventListener('mousedown', dragStart);
window.addEventListener('mousemove', drag);
window.addEventListener('mouseup', dragEnd);

function dragStart(e) {
    baseX = e.clientX - originOffsetX;
    baseY = e.clientY - originOffsetY;

    if (e.target === header) isDragging = true;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();

        mouseOffsetX = e.clientX - baseX;
        mouseOffsetY = e.clientY - baseY;

        originOffsetX = mouseOffsetX;
        originOffsetY = mouseOffsetY;

        clampedX = Math.min(maxX, Math.max(minX, mouseOffsetX));
        clampedY = Math.min(maxY, Math.max(minY, mouseOffsetY));

        placePanel(clampedX, clampedY, panel);
    }
}

function dragEnd() {
    isDragging = false;
}

function placePanel(x, y, el) {
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
}