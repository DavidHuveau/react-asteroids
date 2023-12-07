import TextAlign from "../types/textAlign";

export default class Message {
  private x: number;
  private y: number;
  private mainPt: number;
  private subPt: number;
  private textAlign: TextAlign;
  private fill: string;

  constructor(x: number, y: number, options: any = {}) {
    this.x = x;
    this.y = y;
    this.mainPt = options.mainPt || 28;
    this.subPt = options.subPt || 18;
    this.fill = options.fill || "white";
    this.textAlign = options.align || 'center';
  }

  draw(ctx: CanvasRenderingContext2D, main: string, sub: string) {
    ctx.save();
    ctx.fillStyle = this.fill;
    ctx.textAlign = this.textAlign;
    ctx.font = this.mainPt + "pt Arial";
    ctx.fillText(main, this.x, this.y);
    ctx.font = this.subPt + "pt Arial";
    ctx.fillText(sub, this.x, this.y + this.mainPt);
    ctx.restore();
  }
}
