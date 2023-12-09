type CanvasHookInitialization = {
  draw(ctx: RenderingContext, elapsed: number): void;
  preDraw(ctx: RenderingContext): void
};

export default CanvasHookInitialization;
