import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsEntity } from './logs.entity';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { LogsInterceptor } from './logs.interceptor';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([LogsEntity]), UsersModule, JwtModule],
  providers: [LogsService, LogsInterceptor],
  exports: [LogsService, LogsInterceptor],
  controllers: [LogsController],
})
export class LogsModule {}
