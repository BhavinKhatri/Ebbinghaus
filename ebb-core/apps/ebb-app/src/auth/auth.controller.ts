import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  @Get('user')
  @UseGuards(AuthGuard)
  googleAuthRedirect(@Request() req) {
    return req.userId;
  }
}
