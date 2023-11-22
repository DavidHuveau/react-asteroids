import React, { useRef, useEffect, ElementRef } from "react";

type Options = {
  context?: string;
  initialize?: (ctx: RenderingContext) => void;
  preDraw?: (ctx: RenderingContext) => void;
  animation?: boolean;
}

const useCanvas = (draw: any, options?: Options) => {
  const canvasRef = useRef<ElementRef<"canvas">>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext(options?.context || "2d");
    if (!context) return;

    options?.initialize && options.initialize(context);

    if (options?.animation) {
      let previous: number;
      let elapsed: number;
      let animationFrameId: number;
      
      const frame = (timestamp: number) => {
        options?.preDraw && options.preDraw(context);
        
        if (!previous) previous = timestamp;
        elapsed = timestamp - previous;
        draw(context, elapsed / 1000); // msec -> sec
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
      options?.preDraw && options.preDraw(context);
      draw(context, 0);
    }
  }, [draw]);
  
  return canvasRef
}

export default useCanvas
