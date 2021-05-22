export default class FlounderPart {
  public type: string;

  public color: string;

  public pattern: string;

  public order: number;

  constructor(type: string, order: number, color: string, pattern: string) {
    this.type = type;
    this.order = order;
    this.color = color;
    this.pattern = pattern;
  }
}
