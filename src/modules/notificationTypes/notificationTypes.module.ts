import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationTypeEntity } from './notificationTypes.entity';
import { NotificationTypesService } from './notificationTypes.service';
import { NotificationTypesController } from './notificationTypes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationTypeEntity])],
  providers: [NotificationTypesService],
  exports: [NotificationTypesService],
  controllers: [NotificationTypesController],
})
export class NotificationTypesModule {}
