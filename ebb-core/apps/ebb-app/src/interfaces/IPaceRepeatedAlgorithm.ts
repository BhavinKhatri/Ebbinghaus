import { IPaceRepeatedMemory } from './IMemory';

export interface IPaceRepeatedAlgorithm {
  getMemoriesForRepeatation: (
    memories: IPaceRepeatedMemory[],
  ) => IPaceRepeatedMemory[];
}
