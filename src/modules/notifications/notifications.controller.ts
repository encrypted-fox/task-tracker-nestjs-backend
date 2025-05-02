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

import { NotificationsService } from './notifications.service';
import { NotificationsEntity } from './notifications.entity';

@ApiBearerAuth()
@ApiTags('notifications')
@Controller('api/notifications')
export class NotificationsController extends BaseController<
  NotificationsEntity,
  NotificationsService
> {
  constructor(private notificationsService: NotificationsService) {
    const notificationsFields = [
      'id',
      'title',
      'description',
      'user',
      'notificationType',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(notificationsFields, notificationsService);
  }

  @ApiQueryDecorator(
    'Get notifications list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => NotificationsEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<NotificationsEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get notifications',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => NotificationsEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<NotificationsEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get notification',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => NotificationsEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  override async get(@Param('id') id: number): Promise<NotificationsEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create notification',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => NotificationsEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => NotificationsEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'notifications', action: 'CREATE' })
  override async create(
    @Body() notification: NotificationsEntity,
  ): Promise<NotificationsEntity> {
    return super.create(notification);
  }

  @ApiOperation({
    summary: 'Update notification',
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
  @ApiOkResponse({ type: () => NotificationsEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'notifications', action: 'UPDATE' })
  override async update(
    @Param('id') id: number,
    @Body() entity: NotificationsEntity,
  ): Promise<NotificationsEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete notification',
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
  @LogAction({ entity: 'notifications', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
