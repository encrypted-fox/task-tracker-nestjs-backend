import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AuthGuard } from '../auth/auth.guard';
import { ProjectEntity } from './projects.entity';
import { ProjectsService } from './projects.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/projects')
export class ProjectsController extends BaseController {
  constructor(private projectsService: ProjectsService) {
    super();
  }

  private projectsFields = [
    'id',
    'title',
    'description',
    'attachments',
    'creator',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ];

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getProjectsList(
    @I18n() i18n: I18nContext,
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const projects = await this.projectsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      header: this.generateHeader(i18n, this.projectsFields),
      table: this.generateTable(this.projectsFields),
      data: this.generateData(projects, this.projectsFields),

      meta: {
        count: projects.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllProjects(
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const projects = await this.projectsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: projects,

      meta: {
        count: projects.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getProject(@Param('id') id: number): Promise<ProjectEntity> {
    return this.projectsService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createProject(
    @I18n() i18n: I18nContext,
    @Body() project: ProjectEntity,
  ): Promise<ProjectEntity> {
    return this.projectsService.create(project);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateProject(
    @Param('id') id: number,
    @Body() project: ProjectEntity,
  ): Promise<ProjectEntity> {
    return this.projectsService.update(id, project);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteProject(@Param('id') id: number): Promise<void> {
    await this.projectsService.remove(id);
  }
}
