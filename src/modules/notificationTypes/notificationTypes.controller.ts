import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApiQueryDecorator } from '../../helpers/decorators/ApiQueryDecorator';

import { I18n, I18nContext } from 'nestjs-i18n';

import {
  BaseController,
  type BaseQueryParams,
  type Response,
} from '../../helpers/base/BaseController';

import { LogAction } from '../logs/logs.decorator';

import { NotificationTypesService } from './notificationTypes.service';
import { NotificationTypesEntity } from './notificationTypes.entity';
import { NotificationsEntity } from '../notifications/notifications.entity';

@ApiBearerAuth()
@ApiTags('notificationTypes')
@Controller('api/notificationTypes')
export class NotificationTypesController extends BaseController<
  NotificationTypesEntity,
  NotificationTypesService
> {
  constructor(private notificationTypesService: NotificationTypesService) {
    const notificationTypesFields = [
      'id',
      'title',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(notificationTypesFields, notificationTypesService);
  }

  @ApiQueryDecorator(
    'Get notification types list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => NotificationTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<NotificationTypesEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get notification types',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => NotificationTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<NotificationTypesEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get notification type',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => NotificationTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  override async get(
    @Param('id') id: number,
  ): Promise<NotificationTypesEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create notification type',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => NotificationsEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => NotificationTypesEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'notificationTypes', action: 'CREATE' })
  override async create(
    @Body() notificationType: NotificationTypesEntity,
  ): Promise<NotificationTypesEntity> {
    return super.create(notificationType);
  }

  @ApiOperation({
    summary: 'Update notification type',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => NotificationsEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => NotificationTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'notificationTypes', action: 'UPDATE' })
  override async update(
    @Param('id') id: number,
    @Body() entity: NotificationTypesEntity,
  ): Promise<NotificationTypesEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete notification type',
    description: 'Delete entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @LogAction({ entity: 'notificationTypes', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
