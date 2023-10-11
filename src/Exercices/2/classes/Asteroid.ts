import { drawAsteroidOptions } from "../types/drawAsteroidOptions";

const ASTEROID_RADIUS = 50;
const ASTEROID_SEGMENTS_NUMBER = 25;

class Asteroid {
  private canvasWidth: number;
  private canvasHeight: number;
  private x: number;
  private y: number;
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
}

export default Asteroid;
