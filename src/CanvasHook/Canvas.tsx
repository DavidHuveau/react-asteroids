import useCanvas from "./CanvasHook";

function Canvas(props: any) {
  const { draw, options, preDraw, animation, initialize, ...rest } = props;
  const { context } = options;
  const canvasRef = useCanvas(draw, { context, preDraw, animation, initialize });

  // without tabindex, we can't set the focus on the canvas
  return <canvas ref={canvasRef} tabIndex="1" {...rest} />
}

export default Canvas;
