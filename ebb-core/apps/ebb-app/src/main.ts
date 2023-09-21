import { NestFactory } from '@nestjs/core';
import { EbbAppModule } from './ebb-app.module';

async function bootstrap() {
  const app = await NestFactory.create(EbbAppModule);
  await app.listen(3000);
}
bootstrap();
