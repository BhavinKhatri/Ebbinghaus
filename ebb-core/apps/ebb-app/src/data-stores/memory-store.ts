import { UsersMemory } from '../classes/PersistentMemory';
import { IMemory, IStatefulMemory } from '@ebb/api-dto/core/memory';
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
  private memoryList: UsersMemory<T>[] = [];
  add(memory: IMemory<T>, userId: string) {
    const um = new UsersMemory<T>(memory, userId);
    um.id = this.memoryList.length.toString();
    this.memoryList.push(um);
    return um;
  }

  getAllMemories(userId: string) {
    return this.memoryList.filter((m) => m.userId === userId);
  }

  getMemoryById(id: string) {
    return this.memoryList.find((m) => m.id === id);
  }
}
