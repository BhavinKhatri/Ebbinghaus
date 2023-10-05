import { NestFactory } from '@nestjs/core';
import { EbbAppModule } from './ebb-app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(EbbAppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Ebb')
    .setVersion('1.0')
    .addTag('Ebb')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
