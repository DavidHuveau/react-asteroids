import React, { useRef, useEffect, ElementRef } from "react";

type Options = {
  context?: string;
  preDraw?: (ctx: RenderingContext) => void;
}

const useCanvas = (draw: any, options?: Options) => {
  const canvasRef = useRef<ElementRef<"canvas">>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext(options?.context || "2d");
    if (!context) return;

    // draw(context);

    let frameCount = 0;
    let animationFrameId: number;
    
    const render = () => {
      frameCount++;
      options?.preDraw && options.preDraw(context);
      draw(context, frameCount);
      // update an animation right before the next repaint
      // take callback as an argument to be invoked before the repaint
      animationFrameId = window.requestAnimationFrame(render);
    }
    render()
    
    return () => {
      // cancel the refresh callback request
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [draw]);
  
  return canvasRef
}

export default useCanvas
