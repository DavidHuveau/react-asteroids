export default class LevelIndicator {
  private label: string;
  private x: number;
  private y: number;
  private width: number;
  private height: number;

  constructor(label: string, x: number, y: number, width: number, height: number) {
    this.label = label;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D, max: number, level: number) {
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.font = this.height.toString() + "pt Arial";
    const offset = ctx.measureText(this.label).width + 10;
    ctx.fillText(this.label, this.x, this.y + this.height - 1);
    ctx.beginPath();
    ctx.rect(offset + this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(offset + this.x, this.y, this.width * (max / level), this.height);
    ctx.fill();
    ctx.restore()
  }
}
