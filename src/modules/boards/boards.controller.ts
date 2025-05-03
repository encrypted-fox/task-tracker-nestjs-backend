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
  type Response,
  type BaseQueryParams,
} from '../../helpers/base/BaseController';

import { LogAction } from '../logs/logs.decorator';

import { BoardsService } from './boards.service';
import { BoardsEntity } from './boards.entity';

import { RequirePermission } from '../permissions/permissions.decorator';

@ApiBearerAuth()
@ApiTags('boards')
@Controller('api/boards')
export class BoardsController extends BaseController<
  BoardsEntity,
  BoardsService
> {
  constructor(private boardsService: BoardsService) {
    const boardsFields = [
      'id',
      'title',
      'description',
      'attachments',
      'project',
      'creator',
      'visibility',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(boardsFields, boardsService);
  }

  @ApiQueryDecorator(
    'Get boards list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => BoardsEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  @RequirePermission('boards:get:list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<BoardsEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get boards',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => BoardsEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  @RequirePermission('boards:get:all')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<BoardsEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get board',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => BoardsEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @RequirePermission('boards:get:one')
  override async get(@Param('id') id: number): Promise<BoardsEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create board',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => BoardsEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => BoardsEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'boards', action: 'CREATE' })
  @RequirePermission('boards:create')
  override async create(@Body() board: BoardsEntity): Promise<BoardsEntity> {
    return super.create(board);
  }

  @ApiOperation({
    summary: 'Update board',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => BoardsEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => BoardsEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'boards', action: 'UPDATE' })
  @RequirePermission('boards:update')
  override async update(
    @Param('id') id: number,
    @Body() entity: BoardsEntity,
  ): Promise<BoardsEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete board',
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
  @LogAction({ entity: 'boards', action: 'DELETE' })
  @RequirePermission('boards:delete')
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
