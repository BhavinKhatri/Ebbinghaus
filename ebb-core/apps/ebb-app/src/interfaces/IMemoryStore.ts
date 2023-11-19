import { IMemory, IStatefulMemory, IUsersMemory } from 'libs/api-dto/src/core';

export interface IMemoryStore<T> {
  add: (memory: IMemory<T>, userId: string) => IUsersMemory<T>;
  getAllMemories: (userId: string) => IStatefulMemory<T>[];
  getMemoryById: (id: string) => IStatefulMemory<T>;
  updateMemory: (sm: IStatefulMemory<T>) => IStatefulMemory<T>;
}
