import React from "react";
import useCanvas from "./CanvasHook";

function Canvas(props: any) {
  const { draw, options, preDraw, animation, ...rest } = props;
  const { context } = options;
  const canvasRef = useCanvas(draw, { context, preDraw, animation });

  return <canvas ref={canvasRef} {...rest} />
}

export default Canvas;
