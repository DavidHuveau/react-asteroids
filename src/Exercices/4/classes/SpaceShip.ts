import { drawSpaceShipOptions } from "../types/drawSpaceShipOptions";
import Mass from "./Mass";
import Projectile from "./Projectile";
import drawSpaceShip from "../drawing/drawSpaceShip";

const SPACE_SHIP_RADIUS = 20;
const MASS = 10;
const WEAPON_RELOAD_TIME = 0.25; // seconds

class SpaceShip extends Mass {
  public thrusterOn: boolean;
  private thrusterPower: number;
  private steeringPower: number;
  public rightThruster: boolean;
  public leftThruster: boolean;
  public weaponTriggered: boolean;
  private weaponPower: number;
  public weaponLoaded: boolean;
  private timeUntilWeaponReloaded: number;
  public retroOn: boolean;

  constructor(x: number, y: number, power: number, weaponPower: number, options: drawSpaceShipOptions = {}) {
    super(MASS, SPACE_SHIP_RADIUS, x, y, 1.5 * Math.PI, 0, 0, 0);

    this.thrusterOn = options?.thrusterOn || false;
    this.thrusterPower = power;
    this.steeringPower = this.thrusterPower / 20;
    this.rightThruster = false;
    this.leftThruster = false;
    this.retroOn = false;

    this.weaponPower = weaponPower;
    this.weaponTriggered = false;
    this.weaponLoaded = false;
    this.timeUntilWeaponReloaded = WEAPON_RELOAD_TIME;
  }

  draw(ctx: CanvasRenderingContext2D, guide: boolean): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    drawSpaceShip(ctx, this.radius, {
      guide: guide,
      thrusterOn: this.thrusterOn
    });
    ctx.restore();
  }

  update(elapsed: number, ctx: CanvasRenderingContext2D) {
    const thrusterPower = (this.retroOn ? -1 : 1) * this.thrusterPower;
    this.push(this.angle, (this.thrusterOn || this.retroOn) ? thrusterPower : 0, elapsed);
    const force  = this.rightThruster ? 1 : (this.leftThruster ? -1 : 0)
    this.twist(force * this.steeringPower, elapsed);

    this.weaponLoaded = this.timeUntilWeaponReloaded === 0;
    if(!this.weaponLoaded) {
      this.timeUntilWeaponReloaded -= Math.min(elapsed, this.timeUntilWeaponReloaded);
    }

    super.update(elapsed, ctx);
  };

  projectile(elapsed: number): Projectile {
    const newProjectile = new Projectile(0.025,
      1,
      this.x + Math.cos(this.angle) * this.radius,
      this.y + Math.sin(this.angle) * this.radius,
      this.xSpeed,
      this.ySpeed,
      this.rotationSpeed
    );
    newProjectile.push(this.angle, this.weaponPower, elapsed);
    this.push(this.angle + Math.PI, this.weaponPower, elapsed);
    this.timeUntilWeaponReloaded = WEAPON_RELOAD_TIME;
    return newProjectile;
  }
}

export default SpaceShip;
