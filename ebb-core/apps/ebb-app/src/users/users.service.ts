import { Injectable } from '@nestjs/common';
import { IUserStore } from '../interfaces/IUserStore';
import { IUserDto } from '../interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService implements IUserStore {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async add(user: IUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findOne(userId: string): Promise<User | undefined> {
    const user = this.userModel.findOne({
      userId: userId,
    });
    return user;
  }
}
