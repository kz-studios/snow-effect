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