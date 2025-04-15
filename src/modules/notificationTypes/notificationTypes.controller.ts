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
import { NotificationTypeEntity } from './notificationTypes.entity';
import { NotificationTypesService } from './notificationTypes.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/notificationTypes')
export class NotificationTypesController extends BaseController {
  constructor(private notificationTypesService: NotificationTypesService) {
    super();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllNotificationTypes(
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const notificationTypes = await this.notificationTypesService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: notificationTypes,

      meta: {
        count: notificationTypes.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getNotificationType(
    @Param('id') id: number,
  ): Promise<NotificationTypeEntity> {
    return this.notificationTypesService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createNotificationType(
    @I18n() i18n: I18nContext,
    @Body() notificationType: NotificationTypeEntity,
  ): Promise<NotificationTypeEntity> {
    return this.notificationTypesService.create(notificationType);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateNotificationType(
    @Param('id') id: number,
    @Body() notificationType: NotificationTypeEntity,
  ): Promise<NotificationTypeEntity> {
    return this.notificationTypesService.update(id, notificationType);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteNotificationType(@Param('id') id: number): Promise<void> {
    await this.notificationTypesService.remove(id);
  }
}
