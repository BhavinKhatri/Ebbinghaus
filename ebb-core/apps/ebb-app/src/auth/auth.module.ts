import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

@Module({
  providers: [],
  imports: [UsersModule],
  controllers: [AuthController],
})
export class AuthModule {}
