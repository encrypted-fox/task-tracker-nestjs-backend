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
import { TaskEntity } from './tasks.entity';
import { PrioritiesService } from '../priorities/priorities.service';
import { UsersService } from 'src/modules/users/users.service';
import { ColumnsService } from '../columns/columns.service';
import { BoardsService } from 'src/modules/boards/boards.service';
import { ProjectsService } from 'src/modules/projects/projects.service';
import { TasksService } from './tasks.service';

@Controller('api/tasks')
export class TasksController {
  constructor(
    private prioritiesService: PrioritiesService,
    private projectsService: ProjectsService,
    private columnsService: ColumnsService,
    private boardsService: BoardsService,
    private tasksService: TasksService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getTasksList(@I18n() i18n: I18nContext) {
    const tasks = await this.tasksService.findAll();

    const formattedTasks = [];

    for (let i = 0; i < tasks.length; i++) {
      formattedTasks.push(await this.formatTaskItem(tasks[i]));
    }

    return {
      header: this.formatTaskHeader(i18n),
      table: this.formatTaskTable(),
      data: formattedTasks,
      count: tasks.length,

      // todo sorting
      sort: {
        name: 'creator',
        direction: 'up',
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getAllTasks(): Promise<TaskEntity[]> {
    return await this.tasksService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTask(@Param('id') id: number): Promise<TaskEntity> {
    return await this.tasksService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createTask(
    @I18n() i18n: I18nContext,
    @Body() task: TaskEntity,
  ): Promise<TaskEntity> {
    return await this.tasksService.create(task);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() task: TaskEntity,
  ): Promise<TaskEntity> {
    return (await this.tasksService.update(id, task)).raw[0];
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    await this.tasksService.remove(id);
  }

  formatTaskHeader(@I18n() i18n: I18nContext) {
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
        label: i18n.t('crud.estimate'),
        name: 'estimate',
        style: 'width: 200px;',
      },
      {
        label: i18n.t('crud.column'),
        name: 'column',
        style: 'width: 175px;',
      },
      {
        label: i18n.t('crud.priority'),
        name: 'priority',
        style: 'width: 140px;',
      },
      {
        label: i18n.t('crud.attachments'),
        name: 'attachments',
        style: 'width: 100px;',
      },
      {
        label: i18n.t('crud.board'),
        name: 'board',
        style: 'width: 140px;',
      },
      {
        label: i18n.t('crud.project'),
        name: 'project',
        style: 'width: 140px;',
      },
      {
        label: i18n.t('crud.creator'),
        name: 'creator',
        style: 'width: 250px;',
      },
      {
        label: i18n.t('crud.createdAt'),
        name: 'createdAt',
        style: 'width: 250px;',
      },
      {
        label: i18n.t('crud.updatedAt'),
        name: 'updatedAt',
        style: 'width: 250px;',
      },
      {
        label: i18n.t('crud.deletedAt'),
        name: 'deletedAt',
        style: 'width: 250px;',
      },
    ];
  }

  formatTaskTable() {
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
      estimate: {
        outerStyle: 'width: 200px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
        iconPrepend: 'estimate',
      },
      column: {
        outerStyle: 'width: 175px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'badge badge-secondary',
      },
      priority: {
        outerStyle: 'width: 140px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'badge badge-success',
      },
      attachments: {
        iconAppend: 'attachment',
        outerStyle: 'width: 100px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      board: {
        outerStyle: 'width: 140px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'link text-ellipsis',
      },
      project: {
        outerStyle: 'width: 140px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'link text-ellipsis',
      },
      creator: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'link text-ellipsis',
      },
      createdAt: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      updatedAt: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
      deletedAt: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
      },
    };
  }

  async formatTaskItem(task: TaskEntity) {
    const priority = await this.prioritiesService.findOne(task.priority);
    const column = await this.columnsService.findOne(task.column);
    const board = await this.boardsService.findOne(task.board);
    const project = await this.projectsService.findOne(task.project);
    const user = await this.usersService.findOne(task.creator);

    return {
      id: task.id,
      parts: {
        id: {
          label: `#${task.id}`,
        },
        title: {
          label: task.title,
        },
        description: {
          label: task.description,
        },
        estimate: {
          label: task.estimate,
        },
        column: {
          label: column?.title,
          url: `columns/${task.column}`,
        },
        priority: {
          label: priority?.title,
          url: `priorities/${priority.column}`,
        },
        attachments: {
          label: task.attachments?.length,
        },
        board: {
          label: board?.title,
          url: `boards/${task.board}`,
        },
        project: {
          label: project?.title,
          url: `projects/${task.project}`,
        },
        creator: {
          label: `${user.lastName} ${user.firstName} ${user.middleName}`,
          url: `users/${task.creator}`,
        },
        createdAt: {
          label: task.createdAt,
        },
        updatedAt: {
          label: task.updatedAt,
        },
        deletedAt: {
          label: task.deletedAt,
        },
      },
    };
  }
}
