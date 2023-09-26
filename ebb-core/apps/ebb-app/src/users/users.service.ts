import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private users = [];

  async findOne(userId: string): Promise<User | undefined> {
    return this.users.find((user) => user.userId === userId);
  }

  addUser(user) {
    user.id = this.users.length.toString();
    user.authId = user.userId;
    this.users.push(user);
  }
}
