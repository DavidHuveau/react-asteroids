import { useState, useEffect } from "react";
import Canvas from "../../CanvasHook/Canvas";
import AsteroidClass from "./classes/Asteroid";
import SpaceShipClass from "./classes/SpaceShip";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const preDraw = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

function DrawWithClasses(props: any) {
  const [ asteroids, setAsteroids ] = useState<AsteroidClass[]>([]);
  const [ starShips, setStarShips ] = useState<SpaceShipClass[]>([]);

  useEffect(() => {
    let x = 300;
    let y = 75;
    const asteroid1 = new AsteroidClass(CANVAS_WIDTH, CANVAS_HEIGHT, x, y);

    y = 200;
    const asteroid2 = new AsteroidClass(CANVAS_WIDTH, CANVAS_HEIGHT, x, y, { radius: 30, segmentsNumber: 15 });

    y = 300;
    const asteroid3 = new AsteroidClass(CANVAS_WIDTH, CANVAS_HEIGHT, x, y, { noise: 0.4, stroke: "yellow", segmentsNumber: 15 });
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
    const spaceShip3 = new SpaceShipClass(CANVAS_WIDTH, CANVAS_HEIGHT, x, y, angle, { guide: true, lineWidth: 2, stroke: "blue", triangleAngle: (0.5 * Math.PI), triangleCurve2: 0.2 })
    setStarShips([spaceShip1, spaceShip2, spaceShip3]);
  }, []);

  const update = (elapsedSeconds: number): void => {
  };

  const draw = (ctx: CanvasRenderingContext2D, elapsedSeconds: number): void => {
    update(elapsedSeconds);

    asteroids.forEach(asteroid => {
      asteroid.draw(ctx, true);
    });

    starShips.forEach(starShip => {
      starShip.draw(ctx, true);
    });
  };

  return <Canvas
    id="asteroids"
    width={CANVAS_WIDTH}
    height={CANVAS_HEIGHT}
    preDraw={preDraw}
    draw={draw}
    options={{context: "2d"}}
    animation={false}
    />
}

export default DrawWithClasses;
