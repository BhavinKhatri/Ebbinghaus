import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  @Get('login')
  login(@Request() req) {
    return req.user;
  }

  @Get('user')
  @UseGuards(AuthGuard)
  googleAuthRedirect(@Request() req) {
    return req.userid;
  }
}
