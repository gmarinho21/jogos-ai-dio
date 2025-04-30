class RouletteWheel {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
        this.radius = Math.min(this.centerX, this.centerY) - 20;
        this.rotation = 0;
        this.speed = 0;
        this.numbers = Array.from({length: 37}, (_, i) => i); // 0-36
        this.isSpinning = false;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate(this.rotation);

        // Draw wheel segments
        const segmentAngle = (Math.PI * 2) / 37;
        this.numbers.forEach((num, i) => {
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.arc(0, 0, this.radius, i * segmentAngle, (i + 1) * segmentAngle);
            this.ctx.fillStyle = i === 0 ? '#0f0' : (i % 2 ? '#f00' : '#000');
            this.ctx.fill();
            this.ctx.stroke();

            // Draw numbers
            this.ctx.save();
            this.ctx.rotate(i * segmentAngle + segmentAngle / 2);
            this.ctx.translate(this.radius * 0.75, 0);
            this.ctx.rotate(-this.rotation);
            this.ctx.fillStyle = 'white';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(num.toString(), 0, 0);
            this.ctx.restore();
        });

        this.ctx.restore();
    }

    spin() {
        if (!this.isSpinning) {
            this.speed = Math.random() * 0.3 + 0.2;
            this.isSpinning = true;
        }
    }

    update() {
        if (this.isSpinning) {
            this.rotation += this.speed;
            this.speed *= 0.995; // Friction

            if (this.speed < 0.001) {
                this.isSpinning = false;
                this.speed = 0;
            }
        }
    }
}