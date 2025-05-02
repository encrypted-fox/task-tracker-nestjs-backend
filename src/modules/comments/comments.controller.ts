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
  type BaseQueryParams,
  type Response,
} from '../../base/BaseController';

import { AuthGuard } from '../auth/auth.guard';
import { LogAction } from '../../helpers/decorators/LogActionDecorator';

import { CommentsService } from './comments.service';
import { CommentsEntity } from './comments.entity';

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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'comments', action: 'CREATE' })
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'comments', action: 'UPDATE' })
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @LogAction({ entity: 'comments', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
