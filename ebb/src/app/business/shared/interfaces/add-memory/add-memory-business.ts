export interface IAddMemoryBusiness {
  isFormValid: boolean;
  saveMemory: (memory: string) => void;
  redirectAfterSave: () => void;
  memoryData: string;
}
