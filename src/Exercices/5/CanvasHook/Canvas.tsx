import useCanvas from "./CanvasHook";

function Canvas(props: any) {
  const { options, animation, initialize, ...rest } = props;
  const canvasRef = useCanvas({ animation, initialize });

  // without tabindex, we can't set the focus on the canvas
  return <canvas ref={canvasRef} tabIndex="1" {...rest} />
}

export default Canvas;
