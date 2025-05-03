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

import { RelationTypesService } from './relationTypes.service';
import { RelationTypesEntity } from './relationTypes.entity';

import { RequirePermission } from '../permissions/permissions.decorator';

@ApiBearerAuth()
@ApiTags('relationTypes')
@Controller('api/relationTypes')
export class RelationTypesController extends BaseController<
  RelationTypesEntity,
  RelationTypesService
> {
  constructor(private relationTypesService: RelationTypesService) {
    const relationTypesFields = [
      'id',
      'title',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(relationTypesFields, relationTypesService);
  }

  @ApiQueryDecorator(
    'Get relation types list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => RelationTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  @RequirePermission('relationTypes:get:list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<RelationTypesEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get relation types',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => RelationTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  @RequirePermission('relationTypes:get:all')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<RelationTypesEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get relation type',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => RelationTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @RequirePermission('relationTypes:get:one')
  override async get(@Param('id') id: number): Promise<RelationTypesEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create relation type',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => RelationTypesEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => RelationTypesEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'relationTypes', action: 'CREATE' })
  @RequirePermission('relationTypes:create')
  override async create(
    @Body() relationType: RelationTypesEntity,
  ): Promise<RelationTypesEntity> {
    return super.create(relationType);
  }

  @ApiOperation({
    summary: 'Update relation type',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => RelationTypesEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => RelationTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'relationTypes', action: 'UPDATE' })
  @RequirePermission('relationTypes:update')
  override async update(
    @Param('id') id: number,
    @Body() entity: RelationTypesEntity,
  ): Promise<RelationTypesEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete relation type',
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
  @LogAction({ entity: 'relationTypes', action: 'DELETE' })
  @RequirePermission('relationTypes:delete')
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
