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

import { RelationsService } from './relations.service';
import { RelationsEntity } from './relations.entity';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('api/relations')
export class RelationsController extends BaseController<
  RelationsEntity,
  RelationsService
> {
  constructor(private relationsService: RelationsService) {
    const relationsFields = [
      'id',
      'task',
      'relatedTasks',
      'type',
      'creator',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(relationsFields, relationsService);
  }

  @ApiQueryDecorator(
    'Get relations list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => RelationsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<RelationsEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get relations',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => RelationsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<RelationsEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get relation',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => RelationsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  override async get(@Param('id') id: number): Promise<RelationsEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create relation',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => RelationsEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => RelationsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'relations', action: 'CREATE' })
  override async create(
    @Body() relation: RelationsEntity,
  ): Promise<RelationsEntity> {
    return super.create(relation);
  }

  @ApiOperation({
    summary: 'Update relation',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => RelationsEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => RelationsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'relations', action: 'UPDATE' })
  override async update(
    @Param('id') id: number,
    @Body() entity: RelationsEntity,
  ): Promise<RelationsEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete relation',
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
  @LogAction({ entity: 'relations', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
