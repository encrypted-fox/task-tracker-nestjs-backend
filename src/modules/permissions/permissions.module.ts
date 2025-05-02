import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsEntity } from './permissions.entity';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionsGuard } from './permissions.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionsEntity]), JwtModule],
  providers: [PermissionsGuard, PermissionsService],
  exports: [PermissionsGuard, PermissionsService],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
