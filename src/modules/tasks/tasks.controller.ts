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
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { TaskEntity } from './tasks.entity';
import { TasksService } from './tasks.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/tasks')
export class TasksController extends BaseController {
  constructor(private tasksService: TasksService) {
    super();
  }

  private tasksFields = [
    'id',
    'title',
    'description',
    'estimate',
    'column',
    'priority',
    'attachments',
    'board',
    'project',
    'creator',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ];

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getTasksList(
    @I18n() i18n: I18nContext,
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const tasks = await this.tasksService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      header: this.generateHeader(i18n, this.tasksFields),
      table: this.generateTable(this.tasksFields),
      data: this.generateData(tasks, this.tasksFields),

      meta: {
        count: tasks.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllTasks(
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const tasks = await this.tasksService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: tasks,

      meta: {
        count: tasks.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTask(@Param('id') id: number): Promise<TaskEntity> {
    return this.tasksService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createTask(
    @I18n() i18n: I18nContext,
    @Body() task: TaskEntity,
  ): Promise<TaskEntity> {
    return this.tasksService.create(task);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() task: TaskEntity,
  ): Promise<TaskEntity> {
    return this.tasksService.update(id, task);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    await this.tasksService.remove(id);
  }
}
