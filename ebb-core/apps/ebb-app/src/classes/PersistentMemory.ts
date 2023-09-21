import { IMemory, IStatefulMemory, IUpdatMemory } from '../interfaces/IMemory';

export class PersistentMemory implements IStatefulMemory {
  id: string;
  revisionCounts: number;
  createdAt: number;
  memory: string;
  revisionHistory: Date[];
  constructor(mem: IMemory) {
    this.id = '1';
    this.revisionCounts = 0;
    this.createdAt = mem.createdAt;
    this.memory = mem.memory;
    this.revisionHistory = [];
  }
}

export class MemoryModifier implements IUpdatMemory {
  constructor(private persistentMemory: IStatefulMemory) {}
  updateRevisionCount(date: Date) {
    this.persistentMemory.revisionCounts += 1;
    this.persistentMemory.revisionHistory.push(date);
  }
}
