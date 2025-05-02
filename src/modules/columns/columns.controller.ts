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

import { ColumnsService } from './columns.service';
import { ColumnsEntity } from './columns.entity';

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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'columns', action: 'CREATE' })
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'columns', action: 'UPDATE' })
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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @LogAction({ entity: 'columns', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
