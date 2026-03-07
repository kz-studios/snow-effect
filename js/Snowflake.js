export default class Snowflake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.speed = 0;
    }

    // dt = delta time
    update(multiplier, dt, canvasWidth, canvasHeight) {
        this.y += (this.speed * multiplier * dt * 60);

        if (this.y > canvasHeight) {
            this.y = -this.size;
            this.x = Math.random() * canvasWidth;
            this.size = Math.random() * 5 + 2;
            this.speed = Math.random() * 2 + 1;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    reset(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = -(Math.random() * canvasHeight);
        this.size = Math.random() * 5 + 2;
        this.speed = Math.random() * 2 + 1;
    }
}