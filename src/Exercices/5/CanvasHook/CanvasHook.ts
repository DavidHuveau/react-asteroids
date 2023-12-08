import { useRef, useEffect, ElementRef } from "react";

type Options = {
  initialize: (ctx: RenderingContext) => any;
  animation?: boolean;
  contextType?: string;
}

const useCanvas = (options: Options) => {
  const canvasRef = useRef<ElementRef<"canvas">>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const currentContext = canvas.getContext(options?.contextType || "2d");
    if (!currentContext) return;

    const { preDraw, draw } = options.initialize(currentContext);

    if (options?.animation) {
      let previous: number;
      let elapsed: number;
      let animationFrameId: number;
      
      const frame = (timestamp: number) => {
        preDraw(currentContext);
        
        if (!previous) previous = timestamp;
        elapsed = timestamp - previous;
        draw(currentContext, elapsed / 1000); // msec -> sec
        previous = timestamp;
        
        // update an animation right before the next repaint
        // take callback as an argument to be invoked before the repaint
        animationFrameId = window.requestAnimationFrame(frame);
      }
      animationFrameId = window.requestAnimationFrame(frame);
      
      return () => {
        // cancel the refresh callback request
        window.cancelAnimationFrame(animationFrameId);
      }
    } else {
      preDraw(currentContext);
      draw(currentContext, 0);
    }
  }, [options]);
  
  return canvasRef
}

export default useCanvas
