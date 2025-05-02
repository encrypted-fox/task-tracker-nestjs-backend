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

import { RulesService } from './rules.service';
import { RulesEntity } from './rules.entity';

@ApiBearerAuth()
@ApiTags('rules')
@Controller('api/rules')
export class RulesController extends BaseController<RulesEntity, RulesService> {
  constructor(private rulesService: RulesService) {
    const rulesFields = [
      'id',
      'title',
      'value',
      'role',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(rulesFields, rulesService);
  }

  @ApiQueryDecorator(
    'Get rules list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => RulesEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<RulesEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get rules',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => RulesEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<RulesEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get rule',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => RulesEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  override async get(@Param('id') id: number): Promise<RulesEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create rule',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => RulesEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => RulesEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'rules', action: 'CREATE' })
  override async create(@Body() rule: RulesEntity): Promise<RulesEntity> {
    return super.create(rule);
  }

  @ApiOperation({
    summary: 'Update rule',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => RulesEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => RulesEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'rules', action: 'UPDATE' })
  override async update(
    @Param('id') id: number,
    @Body() entity: RulesEntity,
  ): Promise<RulesEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete rule',
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
  @LogAction({ entity: 'rules', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
