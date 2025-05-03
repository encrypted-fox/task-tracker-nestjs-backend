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

import { RolesService } from './roles.service';
import { RolesEntity } from './roles.entity';

import { RequirePermission } from '../permissions/permissions.decorator';

@ApiBearerAuth()
@ApiTags('roles')
@Controller('api/roles')
export class RolesController extends BaseController<RolesEntity, RolesService> {
  constructor(private rolesService: RolesService) {
    const rolesFields = [
      'id',
      'title',
      'team',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];
    super(rolesFields, rolesService);
  }

  @ApiQueryDecorator(
    'Get roles list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => RolesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  @RequirePermission('roles:get:list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<RolesEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get roles',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => RolesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  @RequirePermission('roles:get:all')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<RolesEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get role',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => RolesEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @RequirePermission('roles:get:one')
  override async get(@Param('id') id: number): Promise<RolesEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create role',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => RolesEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => RolesEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'roles', action: 'CREATE' })
  @RequirePermission('roles:create')
  override async create(@Body() role: RolesEntity): Promise<RolesEntity> {
    return super.create(role);
  }

  @ApiOperation({
    summary: 'Update role',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => RolesEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => RolesEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'roles', action: 'UPDATE' })
  @RequirePermission('roles:update')
  override async update(
    @Param('id') id: number,
    @Body() entity: RolesEntity,
  ): Promise<RolesEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete role',
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
  @LogAction({ entity: 'roles', action: 'DELETE' })
  @RequirePermission('roles:delete')
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
