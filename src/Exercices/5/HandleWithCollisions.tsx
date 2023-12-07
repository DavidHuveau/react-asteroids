import { useRef } from "react";
import Canvas from "../../CanvasHook/Canvas";
import AsteroidsGame from "./classes/AsteroidsGame";
import "./style.css";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const preDraw = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

function ControllingTheStarShip(props: any) {
  const game = useRef<AsteroidsGame>();

  const initialize = (ctx: CanvasRenderingContext2D): void => {
    console.log("initialize");

    game.current = new AsteroidsGame(ctx);
  };

  return <Canvas
    id="asteroids"
    width={CANVAS_WIDTH}
    height={CANVAS_HEIGHT}
    initialize={initialize}
    preDraw={preDraw}
    draw={(ctx: CanvasRenderingContext2D, elapsed: number): void => {
      // debugger
      game?.current?.draw(ctx, elapsed);
    }}
    options={{ context: "2d" }}
    animation={true}
    />
}

export default ControllingTheStarShip;
