class Mass {
  readonly canvasWidth: number;
  readonly canvasHeight: number;
  readonly mass: number;
  readonly radius: number;
  protected x: number;
  protected y: number;
  angle: number;
  protected xSpeed: number; // px/sec
  protected ySpeed: number; // px/sec
  protected rotationSpeed: number;

  constructor(canvasWidth: number, canvasHeight: number, mass: number, radius: number, x: number, y: number, angle: number, xSpeed: number, ySpeed: number, rotationSpeed: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.mass = mass || 1;
    this.radius = radius;
    this.x = x || 0;
    this.y = y || 0;
    this.angle = angle || 0;
    this.xSpeed = xSpeed || 0;
    this.ySpeed = ySpeed || 0;
    this.rotationSpeed = rotationSpeed || 0;
  }

  update(elapsed: number) {
    if(this.x - this.radius + elapsed * this.xSpeed > this.canvasWidth) {
      this.x = -this.radius;
    }
    if(this.x + this.radius + elapsed * this.xSpeed < 0) {
      this.x = this.canvasWidth + this.radius;
    }
    if(this.y - this.radius + elapsed * this.ySpeed > this.canvasHeight) {
      this.y = -this.radius;
    }
    if(this.y + this.radius + elapsed * this.ySpeed < 0) {
      this.y = this.canvasHeight + this.radius;
    }
    this.x += elapsed * this.xSpeed;
    this.y += elapsed * this.ySpeed;
    this.angle = (this.angle + this.rotationSpeed * elapsed) % (2 * Math.PI);
  }

  // Newton's second law
  push(angle: number, force: number, elapsed: number) {
    this.xSpeed += elapsed * (Math.cos(angle) * force) / this.mass;
    this.ySpeed += elapsed * (Math.sin(angle) * force) / this.mass;
  }

  twist(force: number, elapsed: number) {
    this.rotationSpeed += elapsed * force / this.mass;
  }
  
  speed() {
    return Math.sqrt(Math.pow(this.xSpeed, 2) + Math.pow(this.ySpeed, 2));
  }
  
  movementAngle() {
    return Math.atan2(this.ySpeed, this.xSpeed);
  }
}

export default Mass;
