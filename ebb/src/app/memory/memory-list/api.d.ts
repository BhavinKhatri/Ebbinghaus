export interface MemoryPostRequest {
  userId: string;
  memory: string;
}

export interface IPaceRepeatedMemory {
  revisionCounts: number;
  /// UTC numbner
  createdAt: number;
}

export interface IMemory<T> {
  memory: T;
  /// UTC numbner
  createdAt: number;
}

export interface IStatefulMemory<T> extends IMemory<T>, IPaceRepeatedMemory {
  id: string;
  revisionHistory: Date[];
}
