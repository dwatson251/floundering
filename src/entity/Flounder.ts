import FlounderPart from '@/entity/FlounderPart';
import FlounderColorDoesNotMatchException from '@/exception/FlounderColorDoesNotMatchException';
import FlounderPatternDoesNotMatchException from '@/exception/FlounderPatternDoesNotMatchException';
import FlounderPartSequenceInvalidException from '@/exception/FlounderPartSequenceInvalidException';

export default class Flounder {
  public color: string;

  public pattern: string;

  public parts: Array<FlounderPart>;

  constructor(color: string, pattern: string) {
    this.color = color;
    this.pattern = pattern;
    this.parts = [];
  }

  public destroy() {
    this.parts = [];
  }

  public addPart(flounderPart: FlounderPart) {
    if (flounderPart.color !== this.color) {
      throw new FlounderColorDoesNotMatchException();
    }

    if (flounderPart.pattern !== this.pattern) {
      throw new FlounderPatternDoesNotMatchException();
    }

    // The flounder part cannot be added because parts must be added in sequence and the
    // prequisites haven't been met
    if (flounderPart.order !== (this.parts.length + 1)) {
      throw new FlounderPartSequenceInvalidException();
    }

    this.parts.push(flounderPart);

    return this;
  }
}
