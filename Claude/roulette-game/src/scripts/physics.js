function calculateRotationSpeed(initialSpeed, deceleration, time) {
    return initialSpeed - (deceleration * time);
}

function updateBallPosition(ball, wheel, time) {
    const gravity = 9.81; // Acceleration due to gravity in m/s²
    const bounceFactor = 0.7; // Factor to simulate energy loss on bounce

    // Update ball's vertical position based on gravity
    ball.y += (gravity * time);

    // Check for collision with the wheel
    if (ball.y >= wheel.radius) {
        ball.y = wheel.radius; // Reset ball position to wheel surface
        ball.speed *= bounceFactor; // Reduce speed on bounce
    }

    // Update ball's horizontal position based on its speed
    ball.x += ball.speed * time;
}

function simulatePhysics(ball, wheel, time) {
    const rotationSpeed = calculateRotationSpeed(wheel.initialSpeed, wheel.deceleration, time);
    wheel.angle += rotationSpeed * time;

    updateBallPosition(ball, wheel, time);
}