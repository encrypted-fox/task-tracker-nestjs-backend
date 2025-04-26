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

import { VisibilityTypesService } from './visibilityTypes.service';
import { VisibilityTypesEntity } from './visibilityTypes.entity';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('api/visibilityTypes')
export class VisibilityTypesController extends BaseController<
  VisibilityTypesEntity,
  VisibilityTypesService
> {
  constructor(private visibilityTypesService: VisibilityTypesService) {
    const visibilityTypesFields = ['id', 'title'];

    super(visibilityTypesFields, visibilityTypesService);
  }

  @ApiQueryDecorator(
    'Get visibility types list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => VisibilityTypesEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/list')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'visibilityTypes', action: 'CREATE' })
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'visibilityTypes', action: 'UPDATE' })
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @LogAction({ entity: 'visibilityTypes', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
