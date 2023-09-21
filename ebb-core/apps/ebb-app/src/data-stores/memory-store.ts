import { PersistentMemory } from '../classes/PersistentMemory';
import { IMemory, IStatefulMemory } from '../interfaces/IMemory';
import { IMemoryStore } from '../interfaces/IMemoryStore';

export class MemoryArrayStore implements IMemoryStore {
  updateMemory(sm: IStatefulMemory) {
    this.memoryList.forEach((m) => {
      if (m.id === sm.id) {
        m.revisionCounts = sm.revisionCounts;
        m.revisionHistory = sm.revisionHistory;
      }
    });
    return sm;
  }
  private memoryList: IStatefulMemory[] = [];
  add(memory: IMemory) {
    const pm = new PersistentMemory(memory);
    this.memoryList.push(pm);
    return pm;
  }

  getAllMemories() {
    return this.memoryList;
  }

  getMemoryById(id: string) {
    return this.memoryList.find((m) => m.id === id);
  }
}
