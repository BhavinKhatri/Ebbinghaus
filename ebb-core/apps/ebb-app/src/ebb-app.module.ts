import { Module } from '@nestjs/common';
import { EbbAppController } from './ebb-app.controller';
import { EbbAppService } from './ebb-app.service';
import { DateService } from './utils/date/date.service';
import { EbbinghausAlgorithm } from './classes/EbbinghausAlgorithm';
import { IPaceRepeatedAlgorithm } from './interfaces/IPaceRepeatedAlgorithm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MemoryStore } from './data-stores/memory-store';
import { UserMemory, MemorySchema } from './data-stores/schemas/memory.schema';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECTION),
    MongooseModule.forFeature([
      { name: UserMemory.name, schema: MemorySchema },
    ]),
  ],
  controllers: [EbbAppController],
  providers: [
    MemoryStore,
    DateService,
    EbbAppService,
    {
      provide: IPaceRepeatedAlgorithm,
      useClass: EbbinghausAlgorithm,
    },
  ],
})
export class EbbAppModule {}
