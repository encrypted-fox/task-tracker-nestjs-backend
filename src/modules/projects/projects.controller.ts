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
} from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { ProjectEntity } from './projects.entity';
import { UsersService } from 'src/modules/users/users.service';
import { ProjectsService } from 'src/modules/projects/projects.service';

@Controller('api/projects')
export class ProjectsController {
  constructor(
    private projectsService: ProjectsService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getProjectsList(@I18n() i18n: I18nContext) {
    const projects = await this.projectsService.findAll();

    const formattedProjects = [];

    for (let i = 0; i < projects.length; i++) {
      formattedProjects.push(await this.formatProjectItem(projects[i]));
    }

    return {
      header: this.formatProjectHeader(i18n),
      table: this.formatProjectTable(),
      data: formattedProjects,
      count: projects.length,

      // todo sorting
      sort: {
        name: 'creator',
        direction: 'up',
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllProjects(): Promise<ProjectEntity[]> {
    return await this.projectsService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getProject(@Param('id') id: number): Promise<ProjectEntity> {
    return await this.projectsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createProject(
    @I18n() i18n: I18nContext,
    @Body() project: ProjectEntity,
  ): Promise<ProjectEntity> {
    return await this.projectsService.create(project);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateProject(
    @Param('id') id: number,
    @Body() project: ProjectEntity,
  ): Promise<ProjectEntity> {
    return (await this.projectsService.update(id, project)).raw[0];
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteProject(@Param('id') id: number): Promise<void> {
    await this.projectsService.remove(id);
  }

  formatProjectHeader(@I18n() i18n: I18nContext) {
    return [
      {
        label: i18n.t('crud.id'),
        name: 'id',
        style: 'width: 100px;',
      },
      {
        label: i18n.t('crud.title'),
        name: 'title',
        style: 'width: 175px;',
      },
      {
        label: i18n.t('crud.description'),
        name: 'description',
        style: 'width: 250px;',
      },
      {
        label: i18n.t('crud.attachments'),
        name: 'attachments',
        style: 'width: 100px;',
      },
      {
        label: i18n.t('crud.creator'),
        name: 'creator',
        style: 'width: 250px;',
      },
      {
        label: i18n.t('crud.createdAt'),
        name: 'createdAt',
        style: 'width: 200px;',
      },
      {
        label: i18n.t('crud.updatedAt'),
        name: 'updatedAt',
        style: 'width: 200px;',
      },
      {
        label: i18n.t('crud.deletedAt'),
        name: 'deletedAt',
        style: 'width: 200px;',
      },
    ];
  }

  formatProjectTable() {
    return {
      id: {
        outerStyle: 'width: 100px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'badge badge-secondary',
      },
      title: {
        outerStyle: 'width: 175px;',
        innerStyle: 'font-weight: bold; text-decoration: underline;',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      description: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      attachments: {
        iconAppend: 'attachment',
        outerStyle: 'width: 100px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      creator: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'link text-ellipsis',
      },
      createdAt: {
        outerStyle: 'width: 200px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      updatedAt: {
        outerStyle: 'width: 200px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      deletedAt: {
        outerStyle: 'width: 200px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
    };
  }

  async formatProjectItem(project: ProjectEntity) {
    const user = await this.usersService.findOne(project.creator);

    return {
      id: project.id,
      parts: {
        id: {
          label: `#${project.id}`,
        },
        title: {
          label: project?.title,
        },
        description: {
          label: project.description,
        },
        attachments: {
          label: project.attachments?.length,
        },
        creator: {
          label: `${user.lastName} ${user.firstName} ${user.middleName}`,
          url: `users/${user.id}`,
          img: user.avatar,
        },
        createdAt: {
          label: project.createdAt,
        },
        updatedAt: {
          label: project.updatedAt,
        },
        deletedAt: {
          label: project.deletedAt,
        },
      },
    };
  }
}
