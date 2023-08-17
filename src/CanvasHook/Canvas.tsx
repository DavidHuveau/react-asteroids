import React from "react";
import useCanvas from "./CanvasHook";

function Canvas(props: any) {
  const { draw, options, preDraw, ...rest } = props;
  const { context } = options;
  const canvasRef = useCanvas(draw, { context, preDraw });

  return <canvas ref={canvasRef} {...rest} />
}

export default Canvas;
