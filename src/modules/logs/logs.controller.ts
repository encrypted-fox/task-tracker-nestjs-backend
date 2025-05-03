import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotAcceptableException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
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

import { LogsService } from './logs.service';
import { LogsEntity } from './logs.entity';

import { RequirePermission } from '../permissions/permissions.decorator';

@ApiBearerAuth()
@ApiTags('logs')
@Controller('api/logs')
export class LogsController extends BaseController<LogsEntity, LogsService> {
  constructor(private logsService: LogsService) {
    const logsFields = [
      'id',
      'path',
      'action',
      'entity',
      'object',
      'creator',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(logsFields, logsService);
  }

  @ApiQueryDecorator(
    'Get logs list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => LogsEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  @RequirePermission('logs:get:list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<LogsEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get logs',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => LogsEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  @RequirePermission('logs:get:all')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<LogsEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get log',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => LogsEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @RequirePermission('logs:get:one')
  override async get(@Param('id') id: number): Promise<LogsEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create log',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => LogsEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => LogsEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @RequirePermission('logs:create')
  override async create(@Body() log: LogsEntity): Promise<LogsEntity> {
    return super.create(log);
  }

  @ApiNotAcceptableResponse()
  @HttpCode(HttpStatus.NOT_ACCEPTABLE)
  @Patch(':id')
  @RequirePermission('logs:update')
  override async update(): Promise<LogsEntity> {
    throw new NotAcceptableException();
  }

  @ApiNotAcceptableResponse()
  @HttpCode(HttpStatus.NOT_ACCEPTABLE)
  @Delete(':id')
  @RequirePermission('logs:delete')
  override async delete(): Promise<void> {
    throw new NotAcceptableException();
  }
}
