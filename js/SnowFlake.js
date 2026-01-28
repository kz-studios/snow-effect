class SnowFlake {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.size = Math.random() * 5 + 2;
        this.speed = Math.random() * 2 + 1;
    }

    update() {
        this.y += this.speed;

        if (this.y > this.canvasHeight) {
            this.y = 0;
            this.x = Math.random() * this.canvasWidth;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}