import { Inject, Injectable } from '@nestjs/common';
import { IMemory } from './interfaces/IMemory';
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
  getHello(): string {
    return 'Hello World!';
  }

  create(memory: IMemory<T>) {
    this.memoryStore.add(memory);
  }

  getMemories() {
    const allMemories = this.memoryStore.getAllMemories();
    return this.paceRepeatedAlgorithm.getMemoriesForRepeatation(allMemories);
  }

  revisionComplete(persistentMemoryId: string) {
    const m = this.memoryStore.getMemoryById(persistentMemoryId);
    const mm = new MemoryModifier(m);
    const today = this.dateService.todayAsUTC;
    mm.updateRevisionCount(today);
    this.memoryStore.updateMemory(m);
  }
}
