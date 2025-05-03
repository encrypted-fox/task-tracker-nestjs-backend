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

import { PermissionsService } from './permissions.service';
import { PermissionsEntity } from './permissions.entity';

import { RequirePermission } from './permissions.decorator';

@ApiBearerAuth()
@ApiTags('permissions')
@Controller('api/permissions')
export class PermissionsController extends BaseController<
  PermissionsEntity,
  PermissionsService
> {
  constructor(private permissionsService: PermissionsService) {
    const permissionsFields = [
      'id',
      'title',
      'value',
      'role',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(permissionsFields, permissionsService);
  }

  @ApiQueryDecorator(
    'Get permissions list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => PermissionsEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  @RequirePermission('permissions:get:list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<PermissionsEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get permissions',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => PermissionsEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  @RequirePermission('permissions:get:all')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<PermissionsEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get permission',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => PermissionsEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @RequirePermission('permissions:get:one')
  override async get(@Param('id') id: number): Promise<PermissionsEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create permission',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => PermissionsEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => PermissionsEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'permissions', action: 'CREATE' })
  @RequirePermission('permissions:create')
  override async create(
    @Body() permission: PermissionsEntity,
  ): Promise<PermissionsEntity> {
    return super.create(permission);
  }

  @ApiOperation({
    summary: 'Update permission',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => PermissionsEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => PermissionsEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'permissions', action: 'UPDATE' })
  @RequirePermission('permissions:update')
  override async update(
    @Param('id') id: number,
    @Body() entity: PermissionsEntity,
  ): Promise<PermissionsEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete permission',
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
  @LogAction({ entity: 'permissions', action: 'DELETE' })
  @RequirePermission('permissions:delete')
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
