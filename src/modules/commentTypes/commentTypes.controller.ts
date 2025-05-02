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

import { CommentTypesService } from './commentTypes.service';
import { CommentTypesEntity } from './commentTypes.entity';

@ApiBearerAuth()
@ApiTags('commentTypes')
@Controller('api/commentTypes')
export class CommentTypesController extends BaseController<
  CommentTypesEntity,
  CommentTypesService
> {
  constructor(private commentTypesService: CommentTypesService) {
    const commentTypesFields = [
      'id',
      'title',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(commentTypesFields, commentTypesService);
  }

  @ApiQueryDecorator(
    'Get comment types list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => CommentTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<CommentTypesEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get comment types',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => CommentTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<CommentTypesEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get comment type',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => CommentTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  override async get(@Param('id') id: number): Promise<CommentTypesEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create comment type',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => CommentTypesEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => CommentTypesEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'commentTypes', action: 'CREATE' })
  override async create(
    @Body() commentType: CommentTypesEntity,
  ): Promise<CommentTypesEntity> {
    return super.create(commentType);
  }

  @ApiOperation({
    summary: 'Update comment type',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => CommentTypesEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => CommentTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'commentTypes', action: 'UPDATE' })
  override async update(
    @Param('id') id: number,
    @Body() entity: CommentTypesEntity,
  ): Promise<CommentTypesEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete comment type',
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
  @LogAction({ entity: 'commentTypes', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
