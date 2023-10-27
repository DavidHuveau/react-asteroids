import { drawSpaceShipOptions } from "../types/drawSpaceShipOptions";
import Mass from "./Mass";

const SPACE_SHIP_RADIUS = 20;
const MASS = 10;

class SpaceShip extends Mass {
  private lineWidth: number;
  private stroke: string;
  private fillStyle: string;
  private triangleAngle: number;
  private triangleCurve1: number;
  private triangleCurve2: number;
  public thrusterOn: boolean;
  private thrusterPower: number;

  constructor(canvasWidth: number, canvasHeight: number, x: number, y: number, power: number, options: drawSpaceShipOptions = {}) {

    super(canvasWidth, canvasHeight, MASS, SPACE_SHIP_RADIUS, x, y, 1.5 * Math.PI, 0, 0, 0);

    this.lineWidth = options?.lineWidth || 2;
    this.stroke = options?.stroke || "white";
    this.fillStyle = options?.fill || "black";
    this.triangleAngle = (options?.triangleAngle || 0.5 * Math.PI) / 2;
    this.triangleCurve1 = options?.triangleCurve1 || 0.25;
    this.triangleCurve2 = options?.triangleCurve2 || 0.75;

    this.thrusterOn = options?.thrusterOn || false;
    this.thrusterPower = power;
  }

  draw(ctx: CanvasRenderingContext2D, guide: boolean): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    this.drawShip(ctx, guide);
    ctx.restore();
  }

  drawShip(ctx: CanvasRenderingContext2D, guide: boolean): void {
    ctx.save();
  
    if(guide) {
      ctx.strokeStyle = "white";
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
  
    if(this.thrusterOn) {
      ctx.save();
      ctx.strokeStyle = "yellow";
      ctx.fillStyle = "red";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(
        Math.cos(Math.PI + this.angle * 0.8) * this.radius / 2,
        Math.sin(Math.PI + this.angle * 0.8) * this.radius / 2
      )
      ctx.quadraticCurveTo(-this.radius * 2, 0,
        Math.cos(Math.PI - this.angle * 0.8) * this.radius / 2,
        Math.sin(Math.PI - this.angle * 0.8) * this.radius / 2
      );
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.stroke;
    ctx.fillStyle = this.fillStyle;
  
    ctx.beginPath();
    ctx.moveTo(this.radius, 0);
    ctx.quadraticCurveTo(
      Math.cos(this.triangleAngle) * this.radius * this.triangleCurve2,
      Math.sin(this.triangleAngle) * this.radius * this.triangleCurve2,
      Math.cos(Math.PI - this.triangleAngle) * this.radius,
      Math.sin(Math.PI - this.triangleAngle) * this.radius
    );
    ctx.quadraticCurveTo(-this.radius * this.triangleCurve1, 0,
      Math.cos(Math.PI + this.triangleAngle) * this.radius,
      Math.sin(Math.PI + this.triangleAngle) * this.radius
    );
    ctx.quadraticCurveTo(
      Math.cos(-this.triangleAngle) * this.radius * this.triangleCurve2,
      Math.sin(-this.triangleAngle) * this.radius * this.triangleCurve2,
      this.radius, 0
    );
    ctx.fill();
    ctx.stroke();
  
    // a new guide line and circle show the control point
    if(guide) {
      ctx.strokeStyle = "white";
      ctx.fillStyle = "white";
      ctx.lineWidth = 1;
  
      ctx.beginPath();
      ctx.moveTo(
        Math.cos(-this.triangleAngle) * this.radius,
        Math.sin(-this.triangleAngle) * this.radius
      );
      ctx.lineTo(0, 0);
      ctx.lineTo(
        Math.cos(this.triangleAngle) * this.radius,
        Math.sin(this.triangleAngle) * this.radius
      );
      ctx.moveTo(-this.radius, 0);
      ctx.lineTo(0, 0);
      ctx.stroke();
  
      ctx.beginPath();
      ctx.arc(
        Math.cos(this.triangleAngle) * this.radius * this.triangleCurve2,
        Math.sin(this.triangleAngle) * this.radius * this.triangleCurve2,
        this.radius / 25, 0, 2 * Math.PI
      );
      ctx.fill();
  
      ctx.beginPath();
      ctx.arc(
        Math.cos(-this.triangleAngle) * this.radius * this.triangleCurve2,
        Math.sin(-this.triangleAngle) * this.radius * this.triangleCurve2,
        this.radius / 25, 0, 2 * Math.PI
      );
      ctx.fill();
  
      ctx.beginPath();
      ctx.arc(this.radius * this.triangleCurve1 - this.radius, 0, this.radius / 25, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
  };

  update(elapsed: number) {
    this.push(this.angle, this.thrusterOn ? this.thrusterPower : 0, elapsed);
    super.update(elapsed);
  };
}

export default SpaceShip;
