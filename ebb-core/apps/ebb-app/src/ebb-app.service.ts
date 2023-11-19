import { Inject, Injectable } from '@nestjs/common';
import { IMemory, IStatefulMemory } from '@ebb/api-dto/core/memory';
import { MemoryModifier } from './classes/PersistentMemory';
import { IPaceRepeatedAlgorithm } from './interfaces/IPaceRepeatedAlgorithm';
import { DateService } from './utils/date/date.service';
import { IMemoryStore } from './interfaces';

@Injectable()
export class EbbAppService {
  constructor(
    @Inject(DateService) private dateService: DateService,
    @Inject(IPaceRepeatedAlgorithm)
    private paceRepeatedAlgorithm: IPaceRepeatedAlgorithm,
    @Inject(IMemoryStore) private memoryStore: IMemoryStore<string>,
  ) {}

  create(memory: IMemory<string>, userId: string) {
    this.memoryStore.add(memory, userId);
  }

  async getMemories(userId: string): Promise<IStatefulMemory<string>[]> {
    const allMemories = await this.memoryStore.getAllMemories(userId);
    return this.paceRepeatedAlgorithm.getMemoriesForRepeatation(
      allMemories,
    ) as IStatefulMemory<string>[];
  }

  async getAllMemories(userId: string): Promise<IStatefulMemory<string>[]> {
    return this.memoryStore.getAllMemories(userId);
  }

  async revisionComplete(persistentMemoryId: string) {
    const m = await this.memoryStore.getMemoryById(persistentMemoryId);
    const mm = new MemoryModifier(m);
    const today = this.dateService.todayAsUTC;
    mm.updateRevisionCount(today);
    this.memoryStore.updateMemory(m);
  }
}
