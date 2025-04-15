import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AuthGuard } from '../auth/auth.guard';
import { NotificationEntity } from './notifications.entity';
import { NotificationsService } from './notifications.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/notifications')
export class NotificationsController extends BaseController {
  constructor(private notificationsService: NotificationsService) {
    super();
  }

  private notificationsFields = [
    'id',
    'title',
    'description',
    'user',
    'type',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ];

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getNotificationsList(
    @I18n() i18n: I18nContext,
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const notifications = await this.notificationsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      header: this.generateHeader(i18n, this.notificationsFields),
      table: this.generateTable(this.notificationsFields),
      data: this.generateData(notifications, this.notificationsFields),

      meta: {
        count: notifications.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllNotifications(
    @Query() query: string,
    @Query() skip: number,
    @Query() filters: any,
    @Query() take: number,
    @Query() order: any,
  ) {
    const notifications = await this.notificationsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: notifications,

      meta: {
        count: notifications.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getNotification(@Param('id') id: number): Promise<NotificationEntity> {
    return this.notificationsService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createNotification(
    @I18n() i18n: I18nContext,
    @Body() notification: NotificationEntity,
  ): Promise<NotificationEntity> {
    return this.notificationsService.create(notification);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateNotification(
    @Param('id') id: number,
    @Body() notification: NotificationEntity,
  ): Promise<NotificationEntity> {
    return this.notificationsService.update(id, notification);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteNotification(@Param('id') id: number): Promise<void> {
    await this.notificationsService.remove(id);
  }
}
