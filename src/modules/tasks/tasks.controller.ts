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

import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity';

@ApiBearerAuth()
@ApiTags('tasks')
@Controller('api/tasks')
export class TasksController extends BaseController<TasksEntity, TasksService> {
  constructor(private tasksService: TasksService) {
    const tasksFields = [
      'id',
      'title',
      'description',
      'estimate',
      'column',
      'priority',
      'attachments',
      'tags',
      'board',
      'project',
      'creator',
      'visibility',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(tasksFields, tasksService);
  }

  @ApiQueryDecorator(
    'Get tasks list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => TasksEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<TasksEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get tasks',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => TasksEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<TasksEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get task',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => TasksEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  override async get(@Param('id') id: number): Promise<TasksEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create task',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => TasksEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => TasksEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'tasks', action: 'CREATE' })
  override async create(@Body() task: TasksEntity): Promise<TasksEntity> {
    return super.create(task);
  }

  @ApiOperation({
    summary: 'Update task',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => TasksEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => TasksEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'tasks', action: 'UPDATE' })
  override async update(
    @Param('id') id: number,
    @Body() entity: TasksEntity,
  ): Promise<TasksEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete task',
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
  @LogAction({ entity: 'tasks', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
