// This file defines the behavior of the ball, including its movement and collision detection with the roulette wheel.

class RouletteBall {
    constructor(canvas, wheel) {
        this.canvas = canvas;
        this.wheel = wheel;
        this.ctx = canvas.getContext('2d');
        this.radius = 8;
        this.reset();
    }

    reset() {
        this.x = this.wheel.centerX;
        this.y = this.wheel.centerY - this.wheel.radius * 0.8;
        this.velocity = { x: 0, y: 0 };
        this.gravity = 0.3;
        this.bounce = 0.7;
        this.friction = 0.99;
    }

    update() {
        // Apply gravity
        this.velocity.y += this.gravity;
        
        // Update position
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Check collision with wheel boundary
        const dx = this.x - this.wheel.centerX;
        const dy = this.y - this.wheel.centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > this.wheel.radius - this.radius) {
            // Calculate collision angle
            const angle = Math.atan2(dy, dx);
            
            // Set position to wheel boundary
            this.x = this.wheel.centerX + (this.wheel.radius - this.radius) * Math.cos(angle);
            this.y = this.wheel.centerY + (this.wheel.radius - this.radius) * Math.sin(angle);

            // Calculate bounce velocity
            const normal = { x: Math.cos(angle), y: Math.sin(angle) };
            const dot = this.velocity.x * normal.x + this.velocity.y * normal.y;
            
            this.velocity.x -= 2 * dot * normal.x;
            this.velocity.y -= 2 * dot * normal.y;

            // Apply bounce and friction
            this.velocity.x *= this.bounce * this.friction;
            this.velocity.y *= this.bounce * this.friction;
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.strokeStyle = '#333';
        this.ctx.stroke();
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('rouletteCanvas');
    const wheel = new RouletteWheel(canvas);
    const ball = new RouletteBall(canvas, wheel);

    function gameLoop() {
        wheel.ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        wheel.update();
        wheel.draw();
        
        ball.update();
        ball.draw();
        
        requestAnimationFrame(gameLoop);
    }

    document.getElementById('start-button').addEventListener('click', () => {
        wheel.spin();
        ball.reset();
    });

    gameLoop();
});