class Mass {
  private canvasWidth: number;
  private canvasHeight: number;
  private mass: number;
  private radius: number;
  private x: number;
  private y: number;
  private angle: number;
  private xSpeed: number; // px/sec
  private ySpeed: number; // px/sec
  private rotationSpeed: number;

  constructor(canvasWidth: number, canvasHeight: number, mass: number, radius: number, x: number, y: number, angle: number, xSpeed: number, ySpeed: number, rotationSpeed: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.mass = mass;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.rotationSpeed = rotationSpeed;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.lineTo(0, 0);
    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();
    ctx.restore();
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
