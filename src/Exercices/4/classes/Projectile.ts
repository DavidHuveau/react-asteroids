import Mass from "./Mass";
import drawProjectile from "../drawing/drawProjectile";

const DENSITY = 0.001; // low density means we can see very light projectiles

class Projectile extends Mass {
  private lifeTime: number;
  public lifeLevel: number;

  constructor(mass: number, lifeTime: number, x: number, y: number, xSpeed: number, ySpeed: number, rotationSpeed: number) {
    const radius = Math.sqrt((mass / DENSITY) / Math.PI);
    super(mass, radius, x, y, 0, xSpeed, ySpeed, rotationSpeed);
    this.lifeTime = lifeTime;
    this.lifeLevel = lifeTime;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    drawProjectile(ctx, this.radius, this.lifeLevel);
    ctx.restore();
  }

  update(elapsed: number, ctx: CanvasRenderingContext2D) {
    this.lifeLevel -= (elapsed / this.lifeTime);
    super.update(elapsed, ctx);
  }
}

export default Projectile;
