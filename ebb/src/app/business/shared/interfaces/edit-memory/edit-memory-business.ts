import { ISavable } from '../shared/memory-crud';

export interface IEditMemoryBusiness extends ISavable {
  isFormValid: boolean;
  memoryData: string;
  memoryId: string;
}
