import { Injectable } from '@nestjs/common';
import { IMemory } from './interfaces/IMemory';
import { MemoryModifier } from './classes/PersistentMemory';
import * as utc from 'dayjs/plugin/utc';
import * as dayjs from 'dayjs';
import { IPaceRepeatedAlgorithm } from './interfaces/IPaceRepeatedAlgorithm';
import { MemoryArrayStore } from './data-stores/memory-store';
import { IMemoryStore } from './interfaces/IMemoryStore';
import { EbbinghausAlgorithm } from './classes/EbbinghausAlgorithm';
dayjs.extend(utc);

@Injectable()
export class EbbAppService {
  private prs: IPaceRepeatedAlgorithm;
  private memoryStore: IMemoryStore;
  constructor() {
    this.prs = new EbbinghausAlgorithm();
    this.memoryStore = new MemoryArrayStore();
  }
  getHello(): string {
    return 'Hello World!';
  }

  create(memory: IMemory) {
    this.memoryStore.add(memory);
  }

  getMemories() {
    const allMemories = this.memoryStore.getAllMemories();
    return this.prs.getMemoriesForRepeatation(allMemories);
  }

  revisionComplete(persistentMemoryId: string) {
    const m = this.memoryStore.getMemoryById(persistentMemoryId);
    const mm = new MemoryModifier(m);
    const today = dayjs.utc();
    mm.updateRevisionCount(today.toDate());
    this.memoryStore.updateMemory(m);
  }
}
