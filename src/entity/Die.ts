export default class Die {
  public min: number;

  public max: number;

  private value: number | null = null;

  constructor(min = 1, max = 6) {
    this.min = min;
    this.max = max;
  }

  public roll(): number {
    this.value = this.min + (Math.floor(Math.random() * this.max));
    return this.value;
  }

  public getValue(): number {
    return this.value ?? this.roll();
  }
}
