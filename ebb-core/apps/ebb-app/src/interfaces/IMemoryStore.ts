import { IMemory, IStatefulMemory } from './IMemory';

export interface IMemoryStore<T> {
  add: (memory: IMemory<T>) => IStatefulMemory<T>;
  getAllMemories: () => IStatefulMemory<T>[];
  getMemoryById: (id: string) => IStatefulMemory<T>;
  updateMemory: (sm: IStatefulMemory<T>) => IStatefulMemory<T>;
}
