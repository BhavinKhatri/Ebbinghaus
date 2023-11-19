import { IMemory, IStatefulMemory, IUsersMemory } from 'libs/api-dto/src/core';

export interface IMemoryStore<T> {
  add: (memory: IMemory<T>, userId: string) => Promise<IUsersMemory<T>>;
  getAllMemories: (userId: string) => Promise<IStatefulMemory<T>[]>;
  getMemoryById: (id: string) => Promise<IStatefulMemory<T>>;
  updateMemory: (sm: IStatefulMemory<T>) => IStatefulMemory<T>;
}
