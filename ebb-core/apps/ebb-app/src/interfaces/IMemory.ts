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

export interface IUpdatMemory {
  updateRevisionCount: (date: Date) => void;
}

export interface IUsersMemory<T> extends IStatefulMemory<T> {
  userId: string;
}
