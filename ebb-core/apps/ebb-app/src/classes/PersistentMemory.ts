import {
  IMemory,
  IStatefulMemory,
  IUpdatMemory,
  IUsersMemory,
} from '@ebb/api-dto/core';

export class PersistentMemory<T> implements IStatefulMemory<T> {
  id: string;
  revisionCounts: number;
  createdAt: number;
  memory: T;
  revisionHistory: Date[];
  constructor(mem: IMemory<T>) {
    this.revisionCounts = 0;
    this.createdAt = mem.createdAt;
    this.memory = mem.memory;
    this.revisionHistory = [];
  }
}

export class UsersMemory<T>
  extends PersistentMemory<T>
  implements IUsersMemory<T>
{
  userId: string;
  constructor(memory: IMemory<T>, userId: string) {
    super(memory);
    this.userId = userId;
  }
}

export class MemoryModifier<T> implements IUpdatMemory {
  constructor(private persistentMemory: IStatefulMemory<T>) {}
  updateRevisionCount(date: Date) {
    this.persistentMemory.revisionCounts += 1;
    this.persistentMemory.revisionHistory.push(date);
  }
}
