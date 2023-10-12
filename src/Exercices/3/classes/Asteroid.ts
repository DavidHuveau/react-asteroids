import { drawAsteroidOptions } from "../types/drawAsteroidOptions";

const ASTEROID_RADIUS = 50;
const ASTEROID_SEGMENTS_NUMBER = 25;

class Asteroid {
  private canvasWidth: number;
  private canvasHeight: number;
  private x: number;
  private y: number;
  private xSpeed: number; // px/sec
  private ySpeed: number; // px/sec
  private rotationSpeed: number;
  private angle: number;
  private radius: number;
  private shape: number[] = [];
  private noise: number;
  private lineWidth: number;
  private stroke: string;
  private fillStyle: string;

  constructor(canvasWidth: number, canvasHeight: number, x: number, y: number, options: drawAsteroidOptions = {}) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = x;
    this.y = y;
    this.xSpeed = canvasWidth * (Math.random() - 0.5);
    this.ySpeed = canvasHeight * (Math.random() - 0.5);
    this.rotationSpeed = 2 * Math.PI * (Math.random() - 0.5);
    this.angle = 0;
    this.radius = options?.radius || ASTEROID_RADIUS;
    this.noise = options?.noise || 0.2;
    this.lineWidth = options?.lineWidth || 2;
    this.stroke = options?.stroke || "white";
    this.fillStyle = options?.fill || "black";

    for (let segment = 0; segment < (options?.segmentsNumber || ASTEROID_SEGMENTS_NUMBER); segment++) {
      this.shape.push(Math.random() - 0.5);
    }
  }

  draw(ctx: CanvasRenderingContext2D, guide: boolean, frameCount?: number): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    this.drawAsteroid(ctx, guide);
    ctx.restore();
  }

  drawAsteroid(ctx: CanvasRenderingContext2D, guide: boolean): void {
    ctx.save();
    
    if(guide) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 0.5;
  
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.stroke;
    ctx.fillStyle = this.fillStyle;
  
    ctx.beginPath();
    for (let index = 0; index < this.shape.length; index++) {
      ctx.rotate(2 * Math.PI / this.shape.length);
      ctx.lineTo(this.radius + this.radius * (this.noise) * this.shape[index] , 0);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  
    ctx.restore();
  };

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
  };
}

export default Asteroid;
