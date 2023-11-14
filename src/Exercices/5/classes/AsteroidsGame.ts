import Asteroid from "./Asteroid";
import SpaceShip from "./SpaceShip";
import Projectile from "./Projectile";

const THRUSTER_POWER = 1000;
const WEAPON_POWER = 200;

class AsteroidsGame {
  private ctx: CanvasRenderingContext2D;
  private asteroids: Asteroid[];
  private starShip: SpaceShip;
  private projectiles: Projectile[];

  constructor(ctx: CanvasRenderingContext2D) {
    this.draw = this.draw.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);

    this.ctx = ctx;
    this.asteroids = this.createAsteroids();
    this.starShip = this.createStarShip();
    this.projectiles = [];

    ctx.canvas.addEventListener("keydown", e => this.keydownHandler(e, true));
    ctx.canvas.addEventListener("keyup", e => this.keydownHandler(e, false));
    ctx.canvas.focus();
  }

  createAsteroids(): Asteroid[] {
    let x = 300;
    let y = 75;
    const asteroid1 = new Asteroid(4000, x, y);
    y = 200;
    const asteroid2 = new Asteroid(2000, x, y);

    y = 300;
    const asteroid3 = new Asteroid(1000, x, y, {
      noise: 0.4,
      stroke: "yellow",
    });

    asteroid1.push(Math.random() * 2 * Math.PI, 2000, 60);
    asteroid2.push(Math.random() * 2 * Math.PI, 2000, 60);
    asteroid3.push(Math.random() * 2 * Math.PI, 2000, 60);

    asteroid1.twist(Math.random() - 0.5 * Math.PI, 60);
    asteroid2.twist(Math.random() - 0.5 * Math.PI, 60);
    asteroid3.twist(Math.random() - 0.5 * Math.PI, 60);

    return [asteroid1, asteroid2, asteroid3];
  }

  createStarShip(): SpaceShip {
    const x = this.ctx.canvas.width / 2;
    const y = this.ctx.canvas.height / 2;
    const spaceShip = new SpaceShip(x, y, THRUSTER_POWER, WEAPON_POWER)
    return spaceShip;
  }

  update(elapsed: number, ctx: CanvasRenderingContext2D): void {
    this.starShip.update(elapsed, ctx);

    this.asteroids.forEach(asteroid => {
      asteroid.update(elapsed, ctx);
    });

    this.projectiles.forEach((p, index, projectiles) => {
      p.update(elapsed, ctx);
      if(p.lifeLevel <= 0) {
        projectiles.splice(index, 1);
      }
    });

    // Ship's weapon must be loaded before it can be fired.
    if(this.starShip.weaponTriggered && this.starShip.weaponLoaded) {
      this.projectiles.push(this.starShip.projectile(elapsed));
    }
  };

  draw(ctx: CanvasRenderingContext2D, elapsed: number): void {
    this.update(elapsed, ctx);

    this.asteroids.forEach(asteroid => {
      asteroid.draw(ctx, true);
    });

    this.starShip.draw(ctx, true);

    this.projectiles.forEach(projectile => {
      projectile.draw(ctx);
    });
  };

  keydownHandler(e: KeyboardEvent, value: boolean): void {
    let nothingHandled = false;
    switch(e.key) {
      case "ArrowUp":
        this.starShip.thrusterOn = value;
        break;
      case "ArrowLeft":
        this.starShip.leftThruster = value;
        break;
      case "ArrowRight":
        this.starShip.rightThruster = value;
        break;
      case " ":
        this.starShip.weaponTriggered = value;
        break;
      case "ArrowDown":
        this.starShip.retroOn = value;
        break;
      default:
        nothingHandled = true;
    }
    if(!nothingHandled) e.preventDefault();
  };
}

export default AsteroidsGame;
