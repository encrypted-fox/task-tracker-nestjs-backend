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

import { RolesService } from './roles.service';
import { RolesEntity } from './roles.entity';

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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'roles', action: 'CREATE' })
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'roles', action: 'UPDATE' })
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @LogAction({ entity: 'roles', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
