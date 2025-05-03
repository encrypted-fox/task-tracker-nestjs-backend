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

import { CommentsService } from './comments.service';
import { CommentsEntity } from './comments.entity';

import { RequirePermission } from '../permissions/permissions.decorator';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('api/comments')
export class CommentsController extends BaseController<
  CommentsEntity,
  CommentsService
> {
  constructor(private commentsService: CommentsService) {
    const commentsFields = [
      'id',
      'description',
      'attachments',
      'commentType',
      'task',
      'creator',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(commentsFields, commentsService);
  }

  @ApiQueryDecorator(
    'Get comments list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => CommentsEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  @RequirePermission('comments:get:list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<CommentsEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get comments',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => CommentsEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  @RequirePermission('comments:get:all')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<CommentsEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get comment',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => CommentsEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @RequirePermission('comments:get:one')
  override async get(@Param('id') id: number): Promise<CommentsEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create comment',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => CommentsEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => CommentsEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'comments', action: 'CREATE' })
  @RequirePermission('comments:create')
  override async create(
    @Body() comment: CommentsEntity,
  ): Promise<CommentsEntity> {
    return super.create(comment);
  }

  @ApiOperation({
    summary: 'Update comment',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => CommentsEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => CommentsEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'comments', action: 'UPDATE' })
  @RequirePermission('comments:update')
  override async update(
    @Param('id') id: number,
    @Body() entity: CommentsEntity,
  ): Promise<CommentsEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete comment',
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
  @LogAction({ entity: 'comments', action: 'DELETE' })
  @RequirePermission('comments:delete')
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
