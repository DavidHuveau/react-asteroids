import React, { useState, useEffect } from "react";
import Canvas from "../../CanvasHook/Canvas";
import AsteroidClass from "./classes/Asteroid";
import SpaceShipClass from "./classes/SpaceShip";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const preDraw = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

function AnimateDrawing(props: any) {
  const [ asteroids, setAsteroids ] = useState<AsteroidClass[]>([]);
  const [ starShips, setStarShips ] = useState<SpaceShipClass[]>([]);

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

    x = 50;
    y = 50;
    let angle = Math.PI * 0.5;
    const spaceShip1 = new SpaceShipClass(CANVAS_WIDTH, CANVAS_HEIGHT, x, y, angle)
      
    y = 150;
    angle = Math.PI * 1.5;
    const spaceShip2 = new SpaceShipClass(CANVAS_WIDTH, CANVAS_HEIGHT, x, y, angle)
      
    y = 250;
    angle = Math.PI * 1.25;
    const spaceShip3 = new SpaceShipClass(CANVAS_WIDTH, CANVAS_HEIGHT, x, y, angle, {
      guide: true,
      lineWidth: 2,
      stroke: "blue",
      triangleAngle: 0.5 * Math.PI,
      triangleCurve2: 0.2,
    });
    setStarShips([spaceShip1, spaceShip2, spaceShip3]);
  }, []);

  const update = (elapsed: number): void => {
    asteroids.forEach(asteroid => {
      asteroid.update(elapsed);
    });
  };

  const draw = (ctx: CanvasRenderingContext2D, elapsed: number): void => {
    update(elapsed);

    asteroids.forEach(asteroid => {
      asteroid.draw(ctx, true);
    });

    // starShips.forEach(starShip => {
    //   starShip.draw(ctx, true);
    // });
  };

  return <Canvas
    id="asteroids"
    width={CANVAS_WIDTH}
    height={CANVAS_HEIGHT}
    preDraw={preDraw}
    draw={draw}
    options={{context: "2d"}}
    animation={true}
    />
}

export default AnimateDrawing;
