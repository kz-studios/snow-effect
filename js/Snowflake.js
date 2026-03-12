export default class Snowflake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.size = 0;
        this.speed = 0;
    }

    // dt = delta time (amount of time that has passed between the previous frame and the current frame)
    update(sizeAvg, multiplier, driftRad, dt, canvasWidth, canvasHeight) {
        this.size = sizeAvg * this.baseScale;

        this.x += Math.sin(driftRad) * (this.speed * multiplier * dt * 60);
        this.y += Math.cos(driftRad) * (this.speed * multiplier * dt * 60);

        if (this.y > canvasHeight + (2 * this.size)) {
            this.baseScale = Math.random() * 1 + 0.5;
            this.speed = Math.random() * 2 + 1;
            this.size = sizeAvg * this.baseScale;
            this.y = -(this.size * 2); 
            this.x = Math.random() * canvasWidth;
        }
        if (this.x < -(2 * this.size)) {
            this.x = canvasWidth + (2 * this.size);
        } else if (this.x > (canvasWidth + (2 * this.size))) {
            this.x = -(2 * this.size);
        }
    }

    draw(ctx, currentAsset) {
        if (typeof currentAsset === 'string') {
            switch (currentAsset) {
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                default:
                    console.warn(`Unknown shape string: ${currentAsset}`);
            }
        }
        else if (currentAsset instanceof HTMLImageElement) {
            ctx.drawImage(currentAsset, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2.5)
        }
    }

    reset(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = -(Math.random() * canvasHeight);
        this.baseScale = Math.random() * 1 + 0.5;
        this.speed = Math.random() * 2 + 1;
    }
}