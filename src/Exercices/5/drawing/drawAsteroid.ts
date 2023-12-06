import DrawAsteroidOptions from "../types/DrawAsteroidOptions";

const drawAsteroid = (ctx: CanvasRenderingContext2D, radius: number, shape: number[], options: DrawAsteroidOptions = {}): void => {
  ctx.save();
  
  if(options.guide) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 0.5;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  ctx.lineWidth = options?.lineWidth || 2;
  ctx.strokeStyle = options?.stroke || "white";
  ctx.fillStyle = options?.fill || "black";

  ctx.beginPath();
  for (let index = 0; index < shape.length; index++) {
    ctx.rotate(2 * Math.PI / shape.length);
    ctx.lineTo(radius + radius * (options?.noise || 0.2) * shape[index] , 0);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
};

export default drawAsteroid;
