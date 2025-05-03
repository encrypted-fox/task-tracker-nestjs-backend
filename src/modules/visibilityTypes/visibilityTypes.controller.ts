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

import { VisibilityTypesService } from './visibilityTypes.service';
import { VisibilityTypesEntity } from './visibilityTypes.entity';

import { RequirePermission } from '../permissions/permissions.decorator';

@ApiBearerAuth()
@ApiTags('visibilityTypes')
@Controller('api/visibilityTypes')
export class VisibilityTypesController extends BaseController<
  VisibilityTypesEntity,
  VisibilityTypesService
> {
  constructor(private visibilityTypesService: VisibilityTypesService) {
    const visibilityTypesFields = [
      'id',
      'title',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(visibilityTypesFields, visibilityTypesService);
  }

  @ApiQueryDecorator(
    'Get visibility types list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => VisibilityTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  @RequirePermission('visibilityTypes:get:list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<VisibilityTypesEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get visibility types',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => VisibilityTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  @RequirePermission('visibilityTypes:get:all')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<VisibilityTypesEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get visibility type',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => VisibilityTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @RequirePermission('visibilityTypes:get:one')
  override async get(@Param('id') id: number): Promise<VisibilityTypesEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create visibility type',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => VisibilityTypesEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => VisibilityTypesEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'visibilityTypes', action: 'CREATE' })
  @RequirePermission('visibilityTypes:create')
  override async create(
    @Body() visibilityType: VisibilityTypesEntity,
  ): Promise<VisibilityTypesEntity> {
    return super.create(visibilityType);
  }

  @ApiOperation({
    summary: 'Update visibility type',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => VisibilityTypesEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => VisibilityTypesEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'visibilityTypes', action: 'UPDATE' })
  @RequirePermission('visibilityTypes:update')
  override async update(
    @Param('id') id: number,
    @Body() entity: VisibilityTypesEntity,
  ): Promise<VisibilityTypesEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete visibility type',
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
  @LogAction({ entity: 'visibilityTypes', action: 'DELETE' })
  @RequirePermission('visibilityTypes:delete')
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
