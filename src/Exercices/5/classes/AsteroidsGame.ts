import Asteroid from "./Asteroid";
import SpaceShip from "./SpaceShip";
import Projectile from "./Projectile";

const ASTEROID_MASS = 5000;
const ASTEROID_PUSH = 500000; // max force to apply in one frame

const SPACE_SHIP_RADIUS = 15;
const SPACE_SHIP_MASS = 10;
const SPACE_SHIP_THRUSTER_POWER = 1000;
const SPACE_SHIP_WEAPON_POWER = 200;

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
    return [5, 2, 1].map(divisor => 
      this.movingAsteroid(ASTEROID_MASS / divisor, 0.15)
    )
  }

  movingAsteroid(mass: number, elapsed: number): Asteroid {
    const asteroid = new Asteroid(
      mass,
      this.ctx.canvas.width * Math.random(),
      this.ctx.canvas.height * Math.random(),
    );
    this.pushAsteroid(asteroid, elapsed);
    return asteroid;
  }
  
  pushAsteroid(asteroid: Asteroid, elapsed: number): void {
    asteroid.push(2 * Math.PI * Math.random(), ASTEROID_PUSH, elapsed);
    asteroid.twist(
      (Math.random() - 0.5) * Math.PI * ASTEROID_PUSH * 0.02,
      elapsed
    );
  }

  createStarShip(): SpaceShip {
    const x = this.ctx.canvas.width / 2;
    const y = this.ctx.canvas.height / 2;
    return new SpaceShip(
      SPACE_SHIP_MASS,
      SPACE_SHIP_RADIUS,
      x,
      y,
      SPACE_SHIP_THRUSTER_POWER,
      SPACE_SHIP_WEAPON_POWER
    );
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
