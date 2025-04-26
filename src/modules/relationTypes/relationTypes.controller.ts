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
import { ApiQueryDecorator } from '../../helpers/ApiQueryDecorator';

import { I18n, I18nContext } from 'nestjs-i18n';

import {
  BaseController,
  type BaseQueryParams,
  type Response,
} from '../../base/BaseController';

import { AuthGuard } from '../auth/auth.guard';
import { LogAction } from '../logs/logs.decorator';

import { RelationTypesService } from './relationTypes.service';
import { RelationTypesEntity } from './relationTypes.entity';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('api/relationTypes')
export class RelationTypesController extends BaseController<
  RelationTypesEntity,
  RelationTypesService
> {
  constructor(private relationTypesService: RelationTypesService) {
    const relationTypesFields = ['id', 'title'];

    super(relationTypesFields, relationTypesService);
  }

  @ApiQueryDecorator(
    'Get relation types list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => RelationTypesEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/list')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'relationTypes', action: 'CREATE' })
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'relationTypes', action: 'UPDATE' })
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @LogAction({ entity: 'relationTypes', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
