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

import { VisibilitiesService } from './visibilities.service';
import { VisibilitiesEntity } from './visibilities.entity';

@ApiBearerAuth()
@ApiTags('visibilities')
@Controller('api/visibilities')
export class VisibilitiesController extends BaseController<
  VisibilitiesEntity,
  VisibilitiesService
> {
  constructor(private visibilitiesService: VisibilitiesService) {
    const visibilitiesFields = [
      'id',
      'title',
      'object',
      'visibilityType',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(visibilitiesFields, visibilitiesService);
  }

  @ApiQueryDecorator(
    'Get visibilities list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => VisibilitiesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<VisibilitiesEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get visibilities',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => VisibilitiesEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<VisibilitiesEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get visibility',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => VisibilitiesEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  override async get(@Param('id') id: number): Promise<VisibilitiesEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create visibility',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => VisibilitiesEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => VisibilitiesEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'visibilities', action: 'CREATE' })
  override async create(
    @Body() visibility: VisibilitiesEntity,
  ): Promise<VisibilitiesEntity> {
    return super.create(visibility);
  }

  @ApiOperation({
    summary: 'Update visibility',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => VisibilitiesEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => VisibilitiesEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'visibilities', action: 'UPDATE' })
  override async update(
    @Param('id') id: number,
    @Body() entity: VisibilitiesEntity,
  ): Promise<VisibilitiesEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete visibility',
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
  @LogAction({ entity: 'visibilities', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
