import { Module } from '@nestjs/common';
import { EbbAppController } from './ebb-app.controller';
import { EbbAppService } from './ebb-app.service';

@Module({
  imports: [],
  controllers: [EbbAppController],
  providers: [EbbAppService],
})
export class EbbAppModule {}
