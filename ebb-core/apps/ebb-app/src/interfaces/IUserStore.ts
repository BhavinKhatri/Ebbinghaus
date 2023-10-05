import { IUser, IUserDto } from './index';

export interface IUserStore {
  add: (user: IUserDto) => Promise<IUser>;
}
