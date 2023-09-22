import { PersistentMemory } from '../classes/PersistentMemory';
import { IMemory, IStatefulMemory } from '../interfaces/IMemory';
import { IMemoryStore } from '../interfaces/IMemoryStore';

export class MemoryArrayStore<T> implements IMemoryStore<T> {
  updateMemory(sm: IStatefulMemory<T>) {
    this.memoryList.forEach((m) => {
      if (m.id === sm.id) {
        m.revisionCounts = sm.revisionCounts;
        m.revisionHistory = sm.revisionHistory;
      }
    });
    return sm;
  }
  private memoryList: IStatefulMemory<T>[] = [];
  add(memory: IMemory<T>) {
    const pm = new PersistentMemory(memory);
    pm.id = this.memoryList.length.toString();
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
