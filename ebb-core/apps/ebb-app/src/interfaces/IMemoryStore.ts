import { IMemory, IStatefulMemory } from './IMemory';

export interface IMemoryStore {
  add: (memory: IMemory) => IStatefulMemory;
  getAllMemories: () => IStatefulMemory[];
  getMemoryById: (id: string) => IStatefulMemory;
  updateMemory: (sm: IStatefulMemory) => IStatefulMemory;
}
