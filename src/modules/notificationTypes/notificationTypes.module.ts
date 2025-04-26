import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationTypesEntity } from './notificationTypes.entity';
import { NotificationTypesService } from './notificationTypes.service';
import { NotificationTypesController } from './notificationTypes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationTypesEntity])],
  providers: [NotificationTypesService],
  exports: [NotificationTypesService],
  controllers: [NotificationTypesController],
})
export class NotificationTypesModule {}
