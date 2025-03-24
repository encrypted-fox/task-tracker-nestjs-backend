import { Controller, HttpCode, HttpStatus, Get, UseGuards, Post, Body, Patch, Param, Delete } from "@nestjs/common"
import { I18n, I18nContext } from "nestjs-i18n";
import { AuthGuard } from "src/auth/auth.guard";
import { Task } from "./tasks.entity";
import { UsersService } from "src/users/users.service";
import { BoardsService } from "src/boards/boards.service";
import { ProjectsService } from "src/projects/projects.service";
import { TasksService } from "./tasks.service";

@Controller('api/tasks')
export class TasksController {
  constructor(
    private projectsService: ProjectsService,
    private boardsService: BoardsService,
    private tasksService: TasksService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllTasks(@I18n() i18n: I18nContext) {
    const tasks = await this.tasksService.findAll()

    const formattedTasks = []

    for (let i = 0; i < tasks.length; i++) {
      formattedTasks.push(await this.formatTaskItem(tasks[i]))
    }

    return { 
      header: this.formatTaskHeader(i18n),
      table: this.formatTaskTable(), 
      data: formattedTasks,
      count: tasks.length,

      // todo sorting
      sort: {
        name: 'creator',
        direction: 'up'
      } 
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTask(@Param('id') id: number, @I18n() i18n: I18nContext) {
    return await this.tasksService.findOne(id)
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createTask(@I18n() i18n: I18nContext, @Body() task: Task) {
    const newTask = await this.tasksService.create(task)

    return { 
      data: this.formatTaskItem(newTask),
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateTask(@Param('id') id: number, @Body() task: Task) {
    const newTask = (await this.tasksService.update(id, task)).raw[0]

    return { 
      data: this.formatTaskItem(newTask),
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteTask(@Param('id') id: number, @Body() task: Task) {
    const newTask = (await this.tasksService.remove(id))

    return
  }

  formatTaskHeader(@I18n() i18n: I18nContext) {
    return [
      {
        label: i18n.t('tasks.id'),
        name: 'id',
        style: 'width: 100px;'
      },
      {
        label: i18n.t('tasks.title'),
        name: 'title',
        style: 'width: 175px;'
      },
      {
        label: i18n.t('tasks.description'),
        name: 'description',
        style: 'width: 250px;'
      },
      {
        label: i18n.t('tasks.time'),
        name: 'time',
        style: 'width: 200px;'
      },
      {
        label: i18n.t('tasks.column'),
        name: 'column',
        style: 'width: 175px;'
      },
      {
        label: i18n.t('tasks.priority'),
        name: 'priority',
        style: 'width: 140px;'
      },
      {
        label: i18n.t('tasks.attachments'),
        name: 'attachments',
        style: 'width: 100px;'
      },
      {
        label: i18n.t('tasks.board'),
        name: 'board',
        style: 'width: 140px;'
      },
      {
        label: i18n.t('tasks.project'),
        name: 'project',
        style: 'width: 140px;'
      },
      {
        label: i18n.t('tasks.creator'),
        name: 'creator',
        style: 'width: 250px;'
      },
      {
        label: i18n.t('tasks.createdAt'),
        name: 'createdAt',
        style: 'width: 250px;'
      },
      {
        label: i18n.t('tasks.updatedAt'),
        name: 'updatedAt',
        style: 'width: 250px;'
      },
      {
        label: i18n.t('tasks.deletedAt'),
        name: 'deletedAt',
        style: 'width: 250px;'
      },
    ]
  }

  formatTaskTable() {
    return {
      id: {
        outerStyle: 'width: 100px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'badge badge-secondary'
      },
      title: {
        outerStyle: 'width: 175px;',
        innerStyle: 'font-weight: bold; text-decoration: underline;',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis'
      },
      description: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis'
      },
      time: {
        outerStyle: 'width: 200px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis',
        iconPrepend: 'time',
      },
      column: {
        outerStyle: 'width: 175px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'badge badge-secondary'
      },
      priority: {
        outerStyle: 'width: 140px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'badge badge-success'
      },
      attachments: {
        iconAppend: 'attachment',
        outerStyle: 'width: 100px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis'
      },
      board: {
        outerStyle: 'width: 140px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'link'
      },
      project: {
        outerStyle: 'width: 140px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'link'
      },
      creator: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'link',
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
    }
  }

  async formatTaskItem(task: Task) {
    const board = await this.boardsService.findOne(task.board)
    const project = await this.projectsService.findOne(task.board)
    const user = await this.usersService.findOne(task.creator)
    
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
        time: {
          label: task.time,
        },
        column: {
          label: task.column,
        },
        priority: {
          label: task.priority,
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
          img: user.avatar,
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
      }
    }
  }
}