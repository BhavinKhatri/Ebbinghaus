import { Module } from '@nestjs/common';
import { EbbAppController } from './ebb-app.controller';
import { EbbAppService } from './ebb-app.service';
import { DateService } from './utils/date/date.service';
import { EbbinghausAlgorithm } from './classes/EbbinghausAlgorithm';
import { IPaceRepeatedAlgorithm } from './interfaces/IPaceRepeatedAlgorithm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot()],
  controllers: [EbbAppController],
  providers: [
    DateService,
    EbbAppService,
    {
      provide: IPaceRepeatedAlgorithm,
      useClass: EbbinghausAlgorithm,
    },
  ],
})
export class EbbAppModule {}
