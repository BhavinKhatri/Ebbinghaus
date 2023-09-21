export interface IPaceRepeatedMemory {
  revisionCounts: number;
  /// UTC numbner
  createdAt: number;
}

export interface IMemory {
  memory: string;
  /// UTC numbner
  createdAt: number;
}

export interface IStatefulMemory extends IMemory, IPaceRepeatedMemory {
  id: string;
  revisionHistory: Date[];
}

export interface IUpdatMemory {
  updateRevisionCount: (date: Date) => void;
}
