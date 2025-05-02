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

import { TagsService } from './tags.service';
import { TagsEntity } from './tags.entity';

@ApiBearerAuth()
@ApiTags('tags')
@Controller('api/tags')
export class TagsController extends BaseController<TagsEntity, TagsService> {
  constructor(private tagsService: TagsService) {
    const tagsFields = ['id', 'title', 'createdAt', 'updatedAt', 'deletedAt'];

    super(tagsFields, tagsService);
  }

  @ApiQueryDecorator(
    'Get tags list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => TagsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<TagsEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get tags',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => TagsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<TagsEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get tag',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => TagsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  override async get(@Param('id') id: number): Promise<TagsEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create tag',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => TagsEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => TagsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'tags', action: 'CREATE' })
  override async create(@Body() tag: TagsEntity): Promise<TagsEntity> {
    return super.create(tag);
  }

  @ApiOperation({
    summary: 'Update tag',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => TagsEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => TagsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'tags', action: 'UPDATE' })
  override async update(
    @Param('id') id: number,
    @Body() entity: TagsEntity,
  ): Promise<TagsEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete tag',
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
  @LogAction({ entity: 'tags', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
