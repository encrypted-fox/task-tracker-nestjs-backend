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

import { PrioritiesService } from './priorities.service';
import { PrioritiesEntity } from './priorities.entity';

@ApiBearerAuth()
@ApiTags('priorities')
@Controller('api/priorities')
export class PrioritiesController extends BaseController<
  PrioritiesEntity,
  PrioritiesService
> {
  constructor(private prioritiesService: PrioritiesService) {
    const prioritiesFields = [
      'id',
      'title',
      'value',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(prioritiesFields, prioritiesService);
  }

  @ApiQueryDecorator(
    'Get priorities list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => PrioritiesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<PrioritiesEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get priorities',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => PrioritiesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<PrioritiesEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get priority',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => PrioritiesEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  override async get(@Param('id') id: number): Promise<PrioritiesEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create priority',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => PrioritiesEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => PrioritiesEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'priorities', action: 'CREATE' })
  override async create(
    @Body() priority: PrioritiesEntity,
  ): Promise<PrioritiesEntity> {
    return super.create(priority);
  }

  @ApiOperation({
    summary: 'Update priority',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => PrioritiesEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => PrioritiesEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'priorities', action: 'UPDATE' })
  override async update(
    @Param('id') id: number,
    @Body() entity: PrioritiesEntity,
  ): Promise<PrioritiesEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete priority',
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
  @LogAction({ entity: 'priorities', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
