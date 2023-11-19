import { MemoryPostRequest } from '@ebb/api-dto/memory-dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IStatefulMemory } from './interfaces/IMemory';

export class MemoryPostDto implements MemoryPostRequest {
  @ApiPropertyOptional()
  userId: string;
  memory: string;
}

export interface MemoryDto<T> {
  id: string;
  memory: T;
}

export class MemoriesDto<T> {
  memories: MemoryDto<T>[];
  constructor(persistentMemories: IStatefulMemory<T>[]) {
    this.memories = [];
    persistentMemories.forEach((pm) => {
      this.memories.push({
        memory: pm.memory,
        id: pm.id,
      });
    });
  }
}
