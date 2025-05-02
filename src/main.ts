import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LogsService } from './modules/logs/logs.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './modules/users/users.service';
import { LogsInterceptor } from './modules/logs/logs.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  const logsService = app.get(LogsService);
  const jwtService = app.get(JwtService);
  const usersService = app.get(UsersService);

  app.useGlobalInterceptors(
    new LogsInterceptor(reflector, logsService, jwtService, usersService),
  );

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
