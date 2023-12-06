// import { DrawSpaceShipOptions } from "../types/DrawSpaceShipOptions";

// const drawSpaceShip = (ctx: CanvasRenderingContext2D, radius: number, options: DrawSpaceShipOptions = {}): void => {
const drawSpaceShip = (ctx: CanvasRenderingContext2D, radius: number, options: any = {}): void => {

  const triangleAngle = (options?.triangleAngle || 0.5 * Math.PI) / 2;
  const triangleCurve1 = options?.triangleCurve1 || 0.25;
  const triangleCurve2 = options?.triangleCurve2 || 0.75;
  const angle = (options.angle || 0.5 * Math.PI) / 2;

  ctx.save();

  if(options.guide) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }

  if(options.thrusterOn) {
    ctx.save();
    ctx.strokeStyle = "yellow";
    ctx.fillStyle = "red";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(
      Math.cos(Math.PI + angle * 0.8) * radius / 2,
      Math.sin(Math.PI + angle * 0.8) * radius / 2
    )
    ctx.quadraticCurveTo(-radius * 2, 0,
      Math.cos(Math.PI - angle * 0.8) * radius / 2,
      Math.sin(Math.PI - angle * 0.8) * radius / 2
    );
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  ctx.lineWidth = options?.lineWidth || 2;
  ctx.strokeStyle = options?.stroke || "white";
  ctx.fillStyle = options?.fill || "black";

  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.quadraticCurveTo(
    Math.cos(triangleAngle) * radius * triangleCurve2,
    Math.sin(triangleAngle) * radius * triangleCurve2,
    Math.cos(Math.PI - triangleAngle) * radius,
    Math.sin(Math.PI - triangleAngle) * radius
  );
  ctx.quadraticCurveTo(-radius * triangleCurve1, 0,
    Math.cos(Math.PI + triangleAngle) * radius,
    Math.sin(Math.PI + triangleAngle) * radius
  );
  ctx.quadraticCurveTo(
    Math.cos(-triangleAngle) * radius * triangleCurve2,
    Math.sin(-triangleAngle) * radius * triangleCurve2,
    radius, 0
  );
  ctx.fill();
  ctx.stroke();

  // a new guide line and circle show the control point
  if(options.guide) {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(
      Math.cos(-triangleAngle) * radius,
      Math.sin(-triangleAngle) * radius
    );
    ctx.lineTo(0, 0);
    ctx.lineTo(
      Math.cos(triangleAngle) * radius,
      Math.sin(triangleAngle) * radius
    );
    ctx.moveTo(-radius, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(
      Math.cos(triangleAngle) * radius * triangleCurve2,
      Math.sin(triangleAngle) * radius * triangleCurve2,
      radius / 25, 0, 2 * Math.PI
    );
    ctx.fill();

    ctx.beginPath();
    ctx.arc(
      Math.cos(-triangleAngle) * radius * triangleCurve2,
      Math.sin(-triangleAngle) * radius * triangleCurve2,
      radius / 25, 0, 2 * Math.PI
    );
    ctx.fill();

    ctx.beginPath();
    ctx.arc(radius * triangleCurve1 - radius, 0, radius / 25, 0, 2 * Math.PI);
    ctx.fill();
  }
  ctx.restore();
};

export default drawSpaceShip;
