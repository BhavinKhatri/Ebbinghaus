import { IPaceRepeatedMemory } from 'libs/api-dto/src/core';

export interface IPaceRepeatedAlgorithm {
  getMemoriesForRepeatation: (
    memories: IPaceRepeatedMemory[],
  ) => IPaceRepeatedMemory[];
}

export const IPaceRepeatedAlgorithm = Symbol('IPaceRepeatedAlgorithm');
