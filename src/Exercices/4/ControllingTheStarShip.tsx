import React, { useRef } from "react";
import Canvas from "../../CanvasHook/Canvas";
import AsteroidClass from "./classes/Asteroid";
import SpaceShipClass from "./classes/SpaceShip";
import "./style.css";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const preDraw = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

function ControllingTheStarShip(props: any) {
  const asteroids = useRef<AsteroidClass[]>([]);
  const starShips = useRef<SpaceShipClass[]>([]);

  const initialize = (ctx: CanvasRenderingContext2D): void => {
    console.log("initialize");
    defineObjects();

    ctx.canvas.addEventListener("keydown", e => keydownHandler(e, true));
    ctx.canvas.addEventListener("keyup", e => keydownHandler(e, false));
    ctx.canvas.focus();
  };

  const defineObjects = (): void => {
    let x = 300;
    let y = 75;
    const asteroid1 = new AsteroidClass(CANVAS_WIDTH, CANVAS_HEIGHT, 4000, x, y);
    y = 200;
    const asteroid2 = new AsteroidClass(CANVAS_WIDTH, CANVAS_HEIGHT, 2000, x, y);

    y = 300;
    const asteroid3 = new AsteroidClass(CANVAS_WIDTH, CANVAS_HEIGHT, 1000, x, y, {
      noise: 0.4,
      stroke: "yellow",
    });

    asteroid1.push(Math.random() * 2 * Math.PI, 2000, 60);
    asteroid2.push(Math.random() * 2 * Math.PI, 2000, 60);
    asteroid3.push(Math.random() * 2 * Math.PI, 2000, 60);

    asteroid1.twist(Math.random() - 0.5 * Math.PI, 60);
    asteroid2.twist(Math.random() - 0.5 * Math.PI, 60);
    asteroid3.twist(Math.random() - 0.5 * Math.PI, 60);

    asteroids.current = [asteroid1, asteroid2, asteroid3];

    x = CANVAS_WIDTH / 2;
    y = CANVAS_HEIGHT / 2;
    const power = 1000;
    const spaceShip1 = new SpaceShipClass(CANVAS_WIDTH, CANVAS_HEIGHT, x, y, power)

    starShips.current = [spaceShip1];
  }

  const keydownHandler = (e: KeyboardEvent, value: boolean) => {
    let nothingHandled = false;
    switch(e.key) {
      case "ArrowUp":
        starShips.current[0].thrusterOn = value;
        break;
      case "ArrowLeft":
        starShips.current[0].leftThruster = value;
        break;
      case "ArrowRight":
        starShips.current[0].rightThruster = value;
        break;
      default:
        nothingHandled = true;
    }
    if(!nothingHandled) e.preventDefault();
  };

  const update = (elapsed: number): void => {
    starShips.current[0].update(elapsed);

    asteroids.current.forEach(asteroid => {
      asteroid.update(elapsed);
    });
  };

  const draw = (ctx: CanvasRenderingContext2D, elapsed: number): void => {
    update(elapsed);

    asteroids.current.forEach(asteroid => {
      asteroid.draw(ctx, true);
    });

    starShips.current[0].draw(ctx, true);
  };

  return <Canvas
    id="asteroids"
    width={CANVAS_WIDTH}
    height={CANVAS_HEIGHT}
    initialize={initialize}
    preDraw={preDraw}
    draw={draw}
    options={{ context: "2d" }}
    animation={true}
    />
}

export default ControllingTheStarShip;
