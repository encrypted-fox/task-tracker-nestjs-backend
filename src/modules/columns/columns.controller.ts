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

import { ColumnsService } from './columns.service';
import { ColumnsEntity } from './columns.entity';

import { RequirePermission } from '../permissions/permissions.decorator';

@ApiBearerAuth()
@ApiTags('columns')
@Controller('api/columns')
export class ColumnsController extends BaseController<
  ColumnsEntity,
  ColumnsService
> {
  constructor(private columnsService: ColumnsService) {
    const columnsFields = [
      'id',
      'title',
      'board',
      'project',
      'creator',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(columnsFields, columnsService);
  }

  @ApiQueryDecorator(
    'Get columns list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => ColumnsEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  @RequirePermission('columns:get:list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<ColumnsEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get columns',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => ColumnsEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  @RequirePermission('columns:get:all')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<ColumnsEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get column',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => ColumnsEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @RequirePermission('columns:get:one')
  override async get(@Param('id') id: number): Promise<ColumnsEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create column',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => ColumnsEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => ColumnsEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'columns', action: 'CREATE' })
  @RequirePermission('columns:create')
  override async create(@Body() column: ColumnsEntity): Promise<ColumnsEntity> {
    return super.create(column);
  }

  @ApiOperation({
    summary: 'Update column',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => ColumnsEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => ColumnsEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'columns', action: 'UPDATE' })
  @RequirePermission('columns:update')
  override async update(
    @Param('id') id: number,
    @Body() entity: ColumnsEntity,
  ): Promise<ColumnsEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete column',
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
  @LogAction({ entity: 'columns', action: 'DELETE' })
  @RequirePermission('columns:delete')
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
