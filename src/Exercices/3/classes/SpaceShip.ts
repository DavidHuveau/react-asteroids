import { drawSpaceShipOptions } from "../types/drawSpaceShipOptions";

const SPACE_SHIP_RADIUS = 40;

class SpaceShip {
  private canvasWidth: number;
  private canvasHeight: number;
  private x: number;
  private y: number;
  private radius: number;
  private angle: number;
  private lineWidth: number;
  private stroke: string;
  private fillStyle: string;
  private triangleAngle: number;
  private triangleCurve1: number;
  private triangleCurve2: number;

  constructor(canvasWidth: number, canvasHeight: number, x: number, y: number, angle: number, options: drawSpaceShipOptions = {}) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = x;
    this.y = y;
    this.angle = angle;
    
    this.radius = options?.radius || SPACE_SHIP_RADIUS;
    this.lineWidth = options?.lineWidth || 2;
    this.stroke = options?.stroke || "white";
    this.fillStyle = options?.fill || "black";
    this.triangleAngle = (options?.triangleAngle || 0.5 * Math.PI) / 2;
    this.triangleCurve1 = options?.triangleCurve1 || 0.25;
    this.triangleCurve2 = options?.triangleCurve2 || 0.75;
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
}

export default SpaceShip;
