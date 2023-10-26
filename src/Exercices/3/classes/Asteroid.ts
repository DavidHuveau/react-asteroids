import { drawAsteroidOptions } from "../types/drawAsteroidOptions";
import Mass from "./Mass";

const DENSITY = 1; // kg per square pixel

class Asteroid extends Mass {
  private shape: number[] = [];
  private noise: number;
  private lineWidth: number;
  private stroke: string;
  private fillStyle: string;

  constructor(canvasWidth: number, canvasHeight: number, mass: number, x: number, y: number, options: drawAsteroidOptions = {}) {
    const radius = Math.sqrt((mass / DENSITY) / Math.PI);
    super(canvasWidth, canvasHeight, mass, radius, x, y, 0, 0, 0, 0);

    this.noise = options?.noise || 0.2;
    this.lineWidth = options?.lineWidth || 2;
    this.stroke = options?.stroke || "white";
    this.fillStyle = options?.fill || "black";

    const circumference = 2 * Math.PI * radius;
    let segmentsNumber = Math.ceil(circumference / 15);
    segmentsNumber = Math.min(25, Math.max(5, segmentsNumber));

    for(let segment = 0; segment < (options?.segmentsNumber || segmentsNumber); segment++) {
      this.shape.push(2 * (Math.random() - 0.5));
    }
  }

  draw(ctx: CanvasRenderingContext2D, guide: boolean): void {
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
}

export default Asteroid;
