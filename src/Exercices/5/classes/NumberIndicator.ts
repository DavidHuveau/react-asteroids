import AlignType from "../types/AlignType";

export default class NumberIndicator {
  private label: string;
  private x: number;
  private y: number;
  private digits: number;
  private pt: number;
  private textAlign: AlignType;

  constructor(label: string, x: number, y: number, options: any = {}) {
    this.label = label + ": ";
    this.x = x;
    this.y = y;
    this.digits = options.digits || 0;
    this.pt = options.pt || 10;
    this.textAlign = options.textAlign || "end";
  }

  draw(ctx: CanvasRenderingContext2D, value: number) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.font = this.pt + "pt Arial";
    ctx.textAlign = this.textAlign;
    ctx.fillText(
      this.label + value.toFixed(this.digits),
      this.x, this.y + this.pt - 1
    );
    ctx.restore();
  }
}
