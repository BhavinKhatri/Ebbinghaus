import { UsersMemory } from '../classes/PersistentMemory';
import { IMemory, IUsersMemory } from '@ebb/api-dto/core/memory';
import { IMemoryStore } from '../interfaces/IMemoryStore';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserMemory } from './schemas/memory.schema';
import { Model } from 'mongoose';

@Injectable()
export class MemoryStore implements IMemoryStore<string> {
  constructor(
    @InjectModel(UserMemory.name) private memoryModel: Model<UserMemory>,
  ) {}
  updateMemory(sm: IUsersMemory<string>) {
    this.memoryModel.updateOne(
      { _id: sm.id },
      { revisionCounts: sm.revisionCounts },
      { revisionHistory: sm.revisionHistory },
    );
    return sm;
  }
  // private memoryList: UsersMemory<T>[] = [];
  async add(memory: IMemory<string>, userId: string) {
    const um = new UsersMemory<string>(memory, userId);
    return await this.memoryModel.create(um);
  }

  async getAllMemories(userId: string) {
    return (await this.memoryModel.find({ userId: userId }).exec()).map((x) => {
      return x as IUsersMemory<string>;
    });
  }

  async getMemoryById(id: string) {
    return (await this.memoryModel.findById(id).exec()).toObject({
      flattenMaps: true,
    }) as Promise<IUsersMemory<string>>;
  }
}
