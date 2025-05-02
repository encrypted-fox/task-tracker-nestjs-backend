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

import { ProjectsService } from './projects.service';
import { ProjectsEntity } from './projects.entity';

@ApiBearerAuth()
@ApiTags('projects')
@Controller('api/projects')
export class ProjectsController extends BaseController<
  ProjectsEntity,
  ProjectsService
> {
  constructor(private projectsService: ProjectsService) {
    const projectsFields = [
      'id',
      'title',
      'description',
      'attachments',
      'creator',
      'visibility',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];
    super(projectsFields, projectsService);
  }

  @ApiQueryDecorator(
    'Get projects list',
    'Returns structured data for table rendering with headers and metadata',
  )
  @ApiOkResponse({ type: () => ProjectsEntity })
  @HttpCode(HttpStatus.OK)
  @Get('list')
  override async getList(
    @I18n() i18n: I18nContext,
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<ProjectsEntity>> {
    return super.getList(i18n, queryParams);
  }

  @ApiQueryDecorator(
    'Get projects',
    'Returns structured data with metadata and entities',
  )
  @ApiOkResponse({ type: () => ProjectsEntity })
  @HttpCode(HttpStatus.OK)
  @Get('')
  override async getAll(
    @Query() queryParams: BaseQueryParams,
  ): Promise<Response<ProjectsEntity>> {
    return super.getAll(queryParams);
  }

  @ApiOperation({
    summary: 'Get project',
    description: 'Returns entity by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiOkResponse({ type: () => ProjectsEntity })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  override async get(@Param('id') id: number): Promise<ProjectsEntity> {
    return super.get(id);
  }

  @ApiOperation({
    summary: 'Create project',
    description: 'Creates entity',
  })
  @ApiBody({
    type: () => ProjectsEntity,
    description: 'Entity to create',
  })
  @ApiCreatedResponse({ type: () => ProjectsEntity })
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  @LogAction({ entity: 'projects', action: 'CREATE' })
  override async create(
    @Body() project: ProjectsEntity,
  ): Promise<ProjectsEntity> {
    return super.create(project);
  }

  @ApiOperation({
    summary: 'Update project',
    description: 'Updates entity',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 20,
    description: 'Id of an entity',
  })
  @ApiBody({
    type: () => ProjectsEntity,
    description: 'Entity to create',
  })
  @ApiOkResponse({ type: () => ProjectsEntity })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @LogAction({ entity: 'projects', action: 'UPDATE' })
  override async update(
    @Param('id') id: number,
    @Body() entity: ProjectsEntity,
  ): Promise<ProjectsEntity> {
    return super.update(id, entity);
  }

  @ApiOperation({
    summary: 'Delete project',
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
  @LogAction({ entity: 'projects', action: 'DELETE' })
  override async delete(@Param('id') id: number): Promise<void> {
    return super.delete(id);
  }
}
