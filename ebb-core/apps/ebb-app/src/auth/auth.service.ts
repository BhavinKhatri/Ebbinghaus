import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return null;
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
