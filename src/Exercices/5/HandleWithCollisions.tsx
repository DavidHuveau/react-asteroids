import React, { useRef } from "react";
import Canvas from "../../CanvasHook/Canvas";
import AsteroidClass from "./classes/Asteroid";
import SpaceShipClass from "./classes/SpaceShip";
import ProjectileClass from "./classes/Projectile";
import "./style.css";

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const preDraw = (ctx: CanvasRenderingContext2D): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

function ControllingTheStarShip(props: any) {
  const asteroids = useRef<AsteroidClass[]>([]);
  const starShips = useRef<SpaceShipClass[]>([]);
  const projectiles = useRef<ProjectileClass[]>([]);

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
    const asteroid1 = new AsteroidClass(4000, x, y);
    y = 200;
    const asteroid2 = new AsteroidClass(2000, x, y);

    y = 300;
    const asteroid3 = new AsteroidClass(1000, x, y, {
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
    const weaponPower = 200;
    const spaceShip1 = new SpaceShipClass(x, y, power, weaponPower)

    starShips.current = [spaceShip1];
  }

  const starShip = (): SpaceShipClass => {
    return starShips.current[0];
  }

  const keydownHandler = (e: KeyboardEvent, value: boolean) => {
    let nothingHandled = false;
    switch(e.key) {
      case "ArrowUp":
        starShip().thrusterOn = value;
        break;
      case "ArrowLeft":
        starShip().leftThruster = value;
        break;
      case "ArrowRight":
        starShip().rightThruster = value;
        break;
      case " ":
        starShip().weaponTriggered = value;
        break;
      case "ArrowDown":
        starShip().retroOn = value;
        break;
      default:
        nothingHandled = true;
    }
    if(!nothingHandled) e.preventDefault();
  };

  const update = (elapsed: number, ctx: CanvasRenderingContext2D): void => {
    starShip().update(elapsed, ctx);

    asteroids.current.forEach(asteroid => {
      asteroid.update(elapsed, ctx);
    });

    projectiles.current.forEach((p, index, projectiles) => {
      p.update(elapsed, ctx);
      if(p.lifeLevel <= 0) {
        projectiles.splice(index, 1);
      }
    });

    // Ship's weapon must be loaded before it can be fired.
    if(starShip().weaponTriggered && starShip().weaponLoaded) {
      projectiles.current.push(starShip().projectile(elapsed));
    }
  };

  const draw = (ctx: CanvasRenderingContext2D, elapsed: number): void => {
    update(elapsed, ctx);

    asteroids.current.forEach(asteroid => {
      asteroid.draw(ctx, true);
    });

    starShip().draw(ctx, true);

    projectiles.current.forEach(projectile => {
      projectile.draw(ctx);
    });
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
