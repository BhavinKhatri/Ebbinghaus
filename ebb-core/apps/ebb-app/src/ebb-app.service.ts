import { Inject, Injectable } from '@nestjs/common';
import { IMemory, IStatefulMemory } from '@ebb/api-dto/core/memory';
import { MemoryModifier } from './classes/PersistentMemory';
import { IPaceRepeatedAlgorithm } from './interfaces/IPaceRepeatedAlgorithm';
import { MemoryArrayStore } from './data-stores/memory-store';
import { IMemoryStore } from './interfaces/IMemoryStore';
import { DateService } from './utils/date/date.service';

@Injectable()
export class EbbAppService<T> {
  private memoryStore: IMemoryStore<T>;
  constructor(
    @Inject(DateService) private dateService: DateService,
    @Inject(IPaceRepeatedAlgorithm)
    private paceRepeatedAlgorithm: IPaceRepeatedAlgorithm,
  ) {
    this.memoryStore = new MemoryArrayStore();
  }

  create(memory: IMemory<T>, userId: string) {
    this.memoryStore.add(memory, userId);
  }

  getMemories(userId: string): IStatefulMemory<T>[] {
    const allMemories = this.memoryStore.getAllMemories(userId);
    return this.paceRepeatedAlgorithm.getMemoriesForRepeatation(
      allMemories,
    ) as IStatefulMemory<T>[];
  }

  revisionComplete(persistentMemoryId: string) {
    const m = this.memoryStore.getMemoryById(persistentMemoryId);
    const mm = new MemoryModifier(m);
    const today = this.dateService.todayAsUTC;
    mm.updateRevisionCount(today);
    this.memoryStore.updateMemory(m);
  }
}
