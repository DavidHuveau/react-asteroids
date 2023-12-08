import Canvas from "./CanvasHook/Canvas";
import AsteroidsGame from "./classes/AsteroidsGame";
import "./style.css";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const preDraw = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

function ControllingTheStarShip() {

  const initialize = (ctx: CanvasRenderingContext2D): any => {
    const game = new AsteroidsGame(ctx);
    return {
      preDraw: preDraw, 
      draw: game.draw
    }
  };

  return <Canvas
    id="asteroids"
    width={CANVAS_WIDTH}
    height={CANVAS_HEIGHT}
    initialize={initialize}
    animation={true}
    />
}

export default ControllingTheStarShip;
