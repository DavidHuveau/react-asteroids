import { DrawSpaceShipOptions } from "../types/DrawSpaceShipOptions";
import Mass from "./Mass";
import Projectile from "./Projectile";
import drawSpaceShip from "../drawing/drawSpaceShip";

const WEAPON_RELOAD_TIME = 0.25; // seconds

export default class SpaceShip extends Mass {
  public thrusterOn: boolean;
  private thrusterPower: number;
  private steeringPower: number;
  public rightThruster: boolean;
  public leftThruster: boolean;
  public retroOn: boolean;

  public weaponTriggered: boolean;
  private weaponPower: number;
  public weaponLoaded: boolean;
  private timeUntilWeaponReloaded: number;
  
  public compromised: boolean;
  public maxHealth: number;
  public health: number;
  
  constructor(mass: number, radius: number, x: number, y: number, thrusterPower: number, weaponPower: number, options: DrawSpaceShipOptions = {}) {
    super(mass, radius, x, y, 1.5 * Math.PI, 0, 0, 0);

    this.thrusterOn = options?.thrusterOn || false;
    this.thrusterPower = thrusterPower;
    this.steeringPower = this.thrusterPower / 20;
    this.rightThruster = false;
    this.leftThruster = false;
    this.retroOn = false;

    this.weaponPower = weaponPower;
    this.weaponTriggered = false;
    this.weaponLoaded = false;
    this.timeUntilWeaponReloaded = WEAPON_RELOAD_TIME;

    this.compromised = false;
    this.maxHealth = 2.0;
    this.health = this.maxHealth;
  }

  draw(ctx: CanvasRenderingContext2D, guide: boolean): void {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    if(guide && this.compromised) {
      ctx.save();
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }
  
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

    if(this.compromised) {
      this.health -= Math.min(elapsed, this.health);
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
