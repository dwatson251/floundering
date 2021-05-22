import Flounder from '@/entity/Flounder';
import NoFlounderToAttachToException from '@/exception/NoFlounderToAttachToException';

export default class Player {
  public name: string;

  public flounders: Array<Flounder> = [];

  public partTypeAllowance: string[] = [];

  constructor(playerName: string) {
    this.name = playerName;
  }

  addFlounder(flounder: Flounder) {
    this.flounders.push(flounder);
    return this;
  }

  findFlounder(color: string, pattern: string) {
    const foundFlounder = this.flounders.find(
      (flounder: Flounder) => flounder.color === color && flounder.pattern === pattern,
    );

    if (!foundFlounder) {
      throw new NoFlounderToAttachToException();
    }

    return foundFlounder;
  }

  resetPartTypeAllowance() {
    this.partTypeAllowance = [];
  }

  addPartTypeToAllowance(partType: string) {
    this.partTypeAllowance.push(partType);
  }

  spendPartTypeAllowance(partType: string) {
    const partIndex = this.partTypeAllowance.findIndex((part: string) => partType === part);

    delete this.partTypeAllowance[partIndex];
  }
}
