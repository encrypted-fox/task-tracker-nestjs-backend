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

import { TeamsService } from './teams.service';
import { TeamsEntity } from './teams.entity';

@ApiBearerAuth()
@ApiTags('teams')
@Controller('api/teams')
export class TeamsController extends BaseController<TeamsEntity, TeamsService> {
  constructor(private teamsService: TeamsService) {
    const teamsFields = [
      'id',
      'title',
      'creator',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(teamsFields, teamsService);
  }

  @ApiQueryDecorator(
    'Get tasks list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => TeamsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<TeamsEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get tasks',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => TeamsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<TeamsEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get task',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => TeamsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  override async get(@Param('id') id: number): Promise<TeamsEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create task',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => TeamsEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => TeamsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'teams', action: 'CREATE' })
  override async create(@Body() task: TeamsEntity): Promise<TeamsEntity> {
    return super.create(task);
  }

  @ApiOperation({
    summary: 'Update task',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => TeamsEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => TeamsEntity })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'teams', action: 'UPDATE' })
  override async update(
    @Param('id') id: number,
    @Body() entity: TeamsEntity,
  ): Promise<TeamsEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete task',
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
  @LogAction({ entity: 'teams', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
