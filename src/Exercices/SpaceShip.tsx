import React from "react";
import Canvas from "../CanvasHook/Canvas";

type drawShipOptions = {
  guide?: boolean;
  lineWidth?: number;
  stroke?: string;
  fill?: string;
  angle?: number;
}

const drawShip = (ctx: CanvasRenderingContext2D, radius: number, options: drawShipOptions = {}): void =>{
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
  ctx.lineWidth = options.lineWidth || 2;
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "black";
  const angle = (options.angle || 0.5 * Math.PI) / 2;
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(
    Math.cos(Math.PI - angle) * radius,
    Math.sin(Math.PI - angle) * radius
  );
  ctx.lineTo(
    Math.cos(Math.PI + angle) * radius,
    Math.sin(Math.PI + angle) * radius
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

const draw = (ctx: CanvasRenderingContext2D, frameCount: number): void => {
  let x = 50;
  let y = 50;
  let angle = 0;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawShip(ctx, 40);
  ctx.restore();

  y = 150;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawShip(ctx, 40, { guide: true, lineWidth: 1, stroke: "blue", angle: (0.3 * Math.PI) });
  ctx.restore();

  y = 250;
  angle = Math.PI * 0.25;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawShip(ctx, 40);
  ctx.restore();
};

const preDraw = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const options = {
  context: "2d",
};

function SpaceShip(props: any) {
  return <Canvas id="asteroids" width="400" height="400" draw={draw} options={options} preDraw={preDraw}/>
}

export default SpaceShip;
