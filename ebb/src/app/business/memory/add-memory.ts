import { RectrixFormControl } from '../shared/classes/rectrix-form-control';
import { ValidationType } from '../shared/enums/validation-type';
import { IAddMemoryBusiness } from '../shared/interfaces/add-memory/add-memory-business';

export class AddMemoryBusiness {
  public memoryFormControl: RectrixFormControl<string>;
  constructor() {
    this.memoryFormControl = new RectrixFormControl('memory', '');
    this.memoryFormControl.setValidators([
      {
        type: ValidationType.REQUIRED,
        message: 'required',
      },
    ]);
  }

  submitMemory(addMemoryBusiness: IAddMemoryBusiness) {
    if (addMemoryBusiness.isFormValid) {
      const memory = addMemoryBusiness.memoryData;
      if (memory) {
        addMemoryBusiness.saveMemory(memory);
      }
    }
  }
}
