import { drawAsteroidOptions } from "../types/drawAsteroidOptions";
import Mass from "./Mass";
import drawAsteroid from "../drawing/drawAsteroid";

const DENSITY = 1; // kg per square pixel

class Asteroid extends Mass {
  private shape: number[] = [];
  private noise: number;

  constructor(mass: number, x: number, y: number, options: drawAsteroidOptions = {}) {
    const radius = Math.sqrt((mass / DENSITY) / Math.PI);
    super(mass, radius, x, y, 0, 0, 0, 0);

    this.noise = 0.2;
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
    drawAsteroid(ctx, this.radius, this.shape, {
      noise: this.noise,
      guide: guide
    });
    ctx.restore();
  }
}

export default Asteroid;
