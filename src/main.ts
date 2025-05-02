import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  SwaggerModule.setup('api', app, () =>
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Task Tracker')
        .setDescription('API documentation')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build(),
    ),
  );

  await app.listen(8888);
}

bootstrap().then(() => {});
