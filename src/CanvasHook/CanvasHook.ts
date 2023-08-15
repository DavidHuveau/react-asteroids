import React, { useRef, useEffect } from "react";

const useCanvas = (draw: any) => {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // draw(context);

    let frameCount = 0;
    let animationFrameId: number;
    
    const render = () => {
      frameCount++;
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
