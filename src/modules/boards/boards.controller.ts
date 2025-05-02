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
  UseGuards,
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
} from '../../base/BaseController';

import { AuthGuard } from '../auth/auth.guard';
import { LogAction } from '../../helpers/decorators/LogActionDecorator';

import { BoardsService } from './boards.service';
import { BoardsEntity } from './boards.entity';

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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'boards', action: 'CREATE' })
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'boards', action: 'UPDATE' })
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @LogAction({ entity: 'boards', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
