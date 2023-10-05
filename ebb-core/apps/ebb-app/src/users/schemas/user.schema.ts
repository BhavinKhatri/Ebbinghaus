import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../../interfaces';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @Prop()
  userId: string;
  @Prop()
  userName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
