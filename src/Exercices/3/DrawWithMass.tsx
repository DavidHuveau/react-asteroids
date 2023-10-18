import React, { useState, useEffect } from "react";
import Canvas from "../../CanvasHook/Canvas";
import AsteroidClass from "./classes/Asteroid";
import SpaceShipClass from "./classes/SpaceShip";
import MassClass from "./classes/Mass";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const preDraw = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

function AnimateDrawing(props: any) {
  const [ asteroids, setAsteroids ] = useState<AsteroidClass[]>([]);
  const [ starShips, setStarShips ] = useState<SpaceShipClass[]>([]);
  const [ masses, setMasses ] = useState<MassClass[]>([]);

  useEffect(() => {
    let x = 300;
    let y = 75;
    const asteroid1 = new AsteroidClass(CANVAS_WIDTH, CANVAS_HEIGHT, x, y);

    y = 200;
    const asteroid2 = new AsteroidClass(CANVAS_WIDTH, CANVAS_HEIGHT, x, y, {
      radius: 30,
      segmentsNumber: 15,
    });

    y = 300;
    const asteroid3 = new AsteroidClass(CANVAS_WIDTH, CANVAS_HEIGHT, x, y, {
      noise: 0.4,
      stroke: "yellow",
      segmentsNumber: 15,
    });
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

    // Mass test
    const mass = 1, radius =  10, xSpeed = 0, ySpeed = 0, rotationSpeed = 0;
    x = CANVAS_WIDTH / 2;
    y = CANVAS_HEIGHT / 2;
    angle = 0;
    const mass1 = new MassClass(CANVAS_WIDTH, CANVAS_HEIGHT, mass, radius, x, y, angle, xSpeed, ySpeed, rotationSpeed)
    mass1.twist(Math.PI, 2);
    mass1.push(0.7 * Math.PI, 10, 10);
    setMasses([mass1]);
  }, []);

  const update = (elapsed: number): void => {
    // asteroids.forEach(asteroid => {
    //   asteroid.update(elapsed);
    // });

    masses.forEach(mass => {
      mass.update(elapsed);
    });
  };

  const draw = (ctx: CanvasRenderingContext2D, elapsed: number): void => {
    update(elapsed);

    // asteroids.forEach(asteroid => {
    //   asteroid.draw(ctx, true);
    // });

    // starShips.forEach(starShip => {
    //   starShip.draw(ctx, true);
    // });

    masses.forEach(mass => {
      mass.draw(ctx);
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

export default AnimateDrawing;
