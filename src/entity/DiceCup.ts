import Die from '@/entity/Die';

export default class DiceCup {
  private dice: Die[] = [];

  public loadDie(die: Die) {
    this.dice.push(die);
    return this;
  }

  public rollDice() {
    let total = 0;

    this.dice.forEach((die: Die) => {
      total += die.roll();
    });

    return total;
  }

  public getFaceValueCount(value: number) {
    let faceCount = 0;

    this.dice.forEach((die: Die) => {
      if (die.getValue() === value) {
        faceCount += 1;
      }
    });

    return faceCount;
  }

  public getDice() {
    return this.dice;
  }
}
