import { IRectrixValidator } from '../interfaces';

export class RectrixFormControl<T> {
  controlName: string;
  controlValue: T;
  public validators: IRectrixValidator[];
  constructor(controlName: string, controlValue: T) {
    this.controlName = controlName;
    this.controlValue = controlValue;
    this.validators = [];
  }

  setValidators(validators: IRectrixValidator[]) {
    this.validators = validators;
  }
}
