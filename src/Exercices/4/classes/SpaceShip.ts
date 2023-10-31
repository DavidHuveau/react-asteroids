import { drawSpaceShipOptions } from "../types/drawSpaceShipOptions";
import Mass from "./Mass";
import drawSpaceShip from "../drawing/drawSpaceShip";

const SPACE_SHIP_RADIUS = 20;
const MASS = 10;

class SpaceShip extends Mass {
  public thrusterOn: boolean;
  private thrusterPower: number;
  private steeringPower: number;
  public rightThruster: boolean;
  public leftThruster: boolean;

  constructor(canvasWidth: number, canvasHeight: number, x: number, y: number, power: number, options: drawSpaceShipOptions = {}) {
    super(canvasWidth, canvasHeight, MASS, SPACE_SHIP_RADIUS, x, y, 1.5 * Math.PI, 0, 0, 0);

    this.thrusterOn = options?.thrusterOn || false;
    this.thrusterPower = power;
    this.steeringPower = this.thrusterPower / 20;
    this.rightThruster = false;
    this.leftThruster = false;
  }

  draw(ctx: CanvasRenderingContext2D, guide: boolean): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    drawSpaceShip(ctx, this.radius, {
      guide: guide,
      thrusterOn: this.thrusterOn
    });
    ctx.restore();
  }

  update(elapsed: number) {
    this.push(this.angle, this.thrusterOn ? this.thrusterPower : 0, elapsed);
    const force  = this.rightThruster ? 1 : (this.leftThruster ? -1 : 0)
    this.twist(force * this.steeringPower, elapsed);
    super.update(elapsed);
  };
}

export default SpaceShip;
