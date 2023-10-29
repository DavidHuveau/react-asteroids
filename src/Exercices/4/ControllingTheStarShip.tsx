import React, { useState, useEffect } from "react";
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
  const [ asteroids, setAsteroids ] = useState<AsteroidClass[]>([]);
  const [ starShip, setStarShip ] = useState<SpaceShipClass>();

  useEffect(() => {
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

    setAsteroids([asteroid1, asteroid2, asteroid3]);

    x = CANVAS_WIDTH / 2;
    y = CANVAS_HEIGHT / 2;
    const power = 1000;
    const spaceShip1 = new SpaceShipClass(CANVAS_WIDTH, CANVAS_HEIGHT, x, y, power)

    setStarShip(spaceShip1);
  }, []);

  if (!starShip) return null;

  const initialize = (ctx: CanvasRenderingContext2D): void => {
    ctx.canvas.addEventListener("keydown", e => keydownHandler(e, true));
    ctx.canvas.addEventListener("keyup", e => keydownHandler(e, false));
    ctx.canvas.focus();
  };

  const keydownHandler = (e: KeyboardEvent, value: boolean) => {
    let nothingHandled = false;
    switch(e.key) {
      case "ArrowUp":
        starShip.thrusterOn = value;
        break;
      case "ArrowLeft":
        starShip.leftThruster = value;
        break;
      case "ArrowRight":
        starShip.rightThruster = value;
        break;
      default:
        nothingHandled = true;
    }
    if(!nothingHandled) e.preventDefault();
  };

  const update = (elapsed: number): void => {
    starShip.update(elapsed);

    // asteroids.forEach(asteroid => {
    //   asteroid.update(elapsed);
    // });
  };

  const draw = (ctx: CanvasRenderingContext2D, elapsed: number): void => {
    update(elapsed);

    // asteroids.forEach(asteroid => {
    //   asteroid.draw(ctx, true);
    // });

    starShip.draw(ctx, true);
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
