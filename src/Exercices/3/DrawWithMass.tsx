import { useState, useEffect } from "react";
import Canvas from "../../CanvasHook/Canvas";
import AsteroidClass from "./classes/Asteroid";
import SpaceShipClass from "./classes/SpaceShip";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const preDraw = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

function DrawWithMass(props: any) {
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

    x = CANVAS_WIDTH / 2;
    y = CANVAS_HEIGHT / 2;
    let angle = Math.PI * 1.5;
    const spaceShip1 = new SpaceShipClass(CANVAS_WIDTH, CANVAS_HEIGHT, x, y, angle)
      
    setStarShips([spaceShip1]);
  }, []);

  const update = (elapsed: number): void => {
    // if its nearly stopped, turn
    if(Math.abs(starShips[0].speed()) < 15) {
      starShips[0].angle += Math.PI * 2 * 0.01;
    }
    // If Its going fast, turn around to slow down
    if(Math.abs(starShips[0].speed()) > 200) {
      starShips[0].angle = starShips[0].movementAngle() + Math.PI;
    }
    // push in the direction its pointing (thrusters?)
    starShips[0].push(starShips[0].angle, 1000, elapsed)
    starShips[0].update(elapsed);

    // asteroids.forEach(asteroid => {
    //   asteroid.update(elapsed);
    // });
  };

  const draw = (ctx: CanvasRenderingContext2D, elapsed: number): void => {
    update(elapsed);

    // asteroids.forEach(asteroid => {
    //   asteroid.draw(ctx, true);
    // });

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
    animation={true}
    />
}

export default DrawWithMass;
