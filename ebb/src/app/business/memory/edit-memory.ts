import { RectrixFormControl } from '../shared/classes/rectrix-form-control';
import { ValidationType } from '../shared/enums/validation-type';
import { IEditMemoryBusiness } from '../shared/interfaces/edit-memory/edit-memory-business';

export class EditMemoryBusiness {
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

  submitMemory(editMemoryBusiness: IEditMemoryBusiness) {
    if (editMemoryBusiness.isFormValid) {
      const memory = editMemoryBusiness.memoryData;
      if (memory) {
        editMemoryBusiness.saveMemory(memory);
      }
    }
  }
}
