import { IUsersMemory } from '@ebb/api-dto/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MemoryDocument = HydratedDocument<UserMemory>;

@Schema()
export class UserMemory implements IUsersMemory<string> {
  @Prop()
  userId: string;
  id: string;
  @Prop()
  revisionHistory: Date[];
  @Prop()
  revisionCounts: number;
  @Prop()
  memory: string;
  @Prop()
  createdAt: number;
}

export const MemorySchema = SchemaFactory.createForClass(UserMemory);
