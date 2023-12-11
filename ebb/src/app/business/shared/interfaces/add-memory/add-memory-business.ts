import { ISavable } from '../shared/memory-crud';

export interface IAddMemoryBusiness extends ISavable {
  isFormValid: boolean;
  memoryData: string;
}
