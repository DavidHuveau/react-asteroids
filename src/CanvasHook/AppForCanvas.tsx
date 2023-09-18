import React from "react";
import Canvas from "./Canvas";

const draw1 = (ctx: CanvasRenderingContext2D, frameCount: number): void => {
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05)**2, 0, 2 * Math.PI);
  ctx.fill();
};

const draw2 = (ctx: CanvasRenderingContext2D, frameCount: number): void => {
  ctx.strokeStyle = "brown";
  ctx.fillStyle = "yellow"
  ctx.lineWidth = 5;
  // ctx.strokeRect(50, 50, ctx.canvas.width - 100, ctx.canvas.height - 100);
  ctx.rect(50, 50, ctx.canvas.width - 100, ctx.canvas.height - 100);
  ctx.stroke();
  ctx.fill();
};

const draw3 = (ctx: CanvasRenderingContext2D, frameCount: number): void => {
  const msg = "Hello";
  ctx.strokeStyle = "yellow";
  ctx.fillStyle = "brown"
  ctx.lineWidth = 0.75;
  ctx.font = "34px Arial";
  ctx.textAlign = "center";
  ctx.fillText(msg, 200, 100);
  ctx.strokeText(msg, 200, 100);
};

const draw4 = (ctx: CanvasRenderingContext2D, frameCount: number): void => {
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 400);
  ctx.lineTo(200, 0);
  ctx.lineTo(400, 400);
  ctx.closePath();
  ctx.stroke();
};

const draw5 = (ctx: CanvasRenderingContext2D, frameCount: number): void => {
  ctx.strokeStyle = "yellow";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
  ctx.stroke();
};

const preDraw = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

const options = {
  context: "2d",
};

function AppForCanvas(props: any) {
  return <Canvas id="asteroids" width="400" height="400" draw={draw5} options={options} preDraw={preDraw}/>
}

export default AppForCanvas;
