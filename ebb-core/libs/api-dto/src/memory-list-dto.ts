import { IStatefulMemory } from './core';

export interface MemoryDto<T> {
  id: string;
  memory: T;
}

export class MemoriesDto<T> {
  memories: MemoryDto<T>[];
  constructor(persistentMemories: IStatefulMemory<T>[]) {
    this.memories = [];
    persistentMemories.forEach((pm) => {
      this.memories.push({
        memory: pm.memory,
        id: pm.id,
      });
    });
  }
}
