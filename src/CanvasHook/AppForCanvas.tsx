import React from "react";
import Canvas from "./Canvas";

const draw = (ctx: CanvasRenderingContext2D, frameCount: number): void => {
  // ctx.strokeStyle = '#ffffff';
  // ctx.lineWidth = 5;
  // ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI);
  ctx.fill();
}

function AppForCanvas(props: any) {
  return <Canvas id="asteroids" width="400" height="400" draw={draw} />
}

export default AppForCanvas;
