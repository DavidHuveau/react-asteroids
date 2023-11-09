const drawProjectile = (ctx: CanvasRenderingContext2D, radius: number, lifeLevel: number): void => {
  ctx.save();
  ctx.fillStyle = "rgb(100%, 100%, " + (100 * lifeLevel) + "%)";
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
};

export default drawProjectile;
