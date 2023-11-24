import { DrawAsteroidOptions } from "../types/DrawAsteroidOptions";
import Mass from "./Mass";
import drawAsteroid from "../drawing/drawAsteroid";

const DENSITY = 1; // kg per square pixel
const NOISE = 0.2;

export default class Asteroid extends Mass {
  private shape: number[] = [];
  public mass: number;

  constructor(mass: number, x: number, y: number, xSpeed: number = 0, ySpeed: number = 0, rotationSpeed: number = 0, options: DrawAsteroidOptions = {}) {
    const radius = Math.sqrt((mass / DENSITY) / Math.PI);
    super(mass, radius, x, y, 0, xSpeed, ySpeed, rotationSpeed);

    this.mass= mass;

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
      noise: NOISE,
      guide: guide,
    });
    ctx.restore();
  }

  child(mass: number): Asteroid {
    return new Asteroid(
      mass, 
      this.x,
      this.y,
      this.xSpeed,
      this.ySpeed,
      this.rotationSpeed
    );
  }
}
