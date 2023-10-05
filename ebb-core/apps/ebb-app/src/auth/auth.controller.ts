import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}
  @Get('user')
  @UseGuards(AuthGuard)
  async googleAuthRedirect(@Request() req) {
    const user = await this.userService.findOne(req.userId);
    if (!user) {
      this.userService.add({
        userId: req.userId,
      });
    }
    return req.userId;
  }
}
