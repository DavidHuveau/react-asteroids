import React from "react";
import Canvas from "../CanvasHook/Canvas";

type drawAsteroidOptions = {
  guide?: boolean;
  lineWidth?: number;
  stroke?: string;
  fill?: string;
  noise?: number;
}

const drawAsteroid = (ctx: CanvasRenderingContext2D, radius: number, segementsNumber: number, options: drawAsteroidOptions = {} ): void => {
  ctx.save();
  
  if(options.guide) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 0.5;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  ctx.lineWidth = options.lineWidth || 2;
  ctx.strokeStyle = options.stroke || "white";
  ctx.fillStyle = options.fill || "black";

  ctx.beginPath();
  for (let index = 0; index < segementsNumber; index++) {
    ctx.rotate(2 * Math.PI / segementsNumber);
    ctx.lineTo(radius + radius * (options.noise || 0.4) * (Math.random() - 0.5) , 0);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
};

const draw = (ctx: CanvasRenderingContext2D, frameCount: number): void => {
  let x = 75;
  let y = 75;

  ctx.save();
  ctx.translate(x, y);
  drawAsteroid(ctx, 50, 5);
  ctx.restore();

  y = 200;
  ctx.save();
  ctx.translate(x, y);
  drawAsteroid(ctx, 50, 15, { guide: true, noise: 0.2 });
  ctx.restore();
};

const preDraw = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const options = {
  context: "2d",
};

function Asteroid(props: any) {
  return <Canvas id="asteroids" width="400" height="400" draw={draw} options={options} preDraw={preDraw} animation={false}/>
}

export default Asteroid;
