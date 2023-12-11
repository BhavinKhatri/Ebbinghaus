export interface ISavable {
    saveMemory: (memory: string) => void;
    redirectAfterSave: () => void;
}