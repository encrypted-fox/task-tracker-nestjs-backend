import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './modules/app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LogsService } from './modules/logs/logs.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './modules/users/users.service';
import { LogsInterceptor } from './modules/logs/logs.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { PermissionsGuard } from './modules/permissions/permissions.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const authModule = app.select(AuthModule);
  const permissionsModule = app.select(PermissionsModule);

  const permissionsGuard = permissionsModule.get(PermissionsGuard);
  const authGuard = authModule.get(AuthGuard);

  const reflector = app.get(Reflector);
  const logsService = app.get(LogsService);
  const jwtService = app.get(JwtService);
  const usersService = app.get(UsersService);

  app.enableCors();

  app.useGlobalGuards(authGuard, permissionsGuard);
  app.useGlobalInterceptors(
    new LogsInterceptor(reflector, logsService, jwtService, usersService),
  );

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
