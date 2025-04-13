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
import { ColumnEntity } from './columns.entity';
import { UsersService } from 'src/modules/users/users.service';
import { ColumnsService } from 'src/modules/columns/columns.service';
import { BoardsService } from '../boards/boards.service';
import { ProjectsService } from '../projects/projects.service';

@Controller('api/columns')
export class ColumnsController {
  constructor(
    private columnsService: ColumnsService,
    private boardsService: BoardsService,
    private projectsService: ProjectsService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getColumnsList(@I18n() i18n: I18nContext) {
    const columns = await this.columnsService.findAll();

    const formattedColumns = [];

    for (let i = 0; i < columns.length; i++) {
      formattedColumns.push(await this.formatColumnItem(columns[i]));
    }

    return {
      header: this.formatColumnHeader(i18n),
      table: this.formatColumnTable(),
      data: formattedColumns,
      count: columns.length,

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
  async getAllColumns(): Promise<ColumnEntity[]> {
    return await this.columnsService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getColumn(@Param('id') id: number): Promise<ColumnEntity> {
    return await this.columnsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createColumn(
    @I18n() i18n: I18nContext,
    @Body() column: ColumnEntity,
  ): Promise<ColumnEntity> {
    return await this.columnsService.create(column);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateColumn(
    @Param('id') id: number,
    @Body() column: ColumnEntity,
  ): Promise<ColumnEntity> {
    return (await this.columnsService.update(id, column)).raw[0];
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteColumn(@Param('id') id: number): Promise<void> {
    await this.columnsService.remove(id);
  }

  formatColumnHeader(@I18n() i18n: I18nContext) {
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
        label: i18n.t('crud.board'),
        name: 'board',
        style: 'width: 250px;',
      },
      {
        label: i18n.t('crud.project'),
        name: 'project',
        style: 'width: 250px;',
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

  formatColumnTable() {
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
      board: {
        outerStyle: 'width: 250px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'link text-ellipsis',
      },
      project: {
        outerStyle: 'width: 250px;',
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

  async formatColumnItem(column: ColumnEntity) {
    const board = await this.boardsService.findOne(column.board);
    const project = await this.projectsService.findOne(column.project);
    const user = await this.usersService.findOne(column.creator);

    return {
      id: column.id,
      parts: {
        id: {
          label: column.id,
        },
        title: {
          label: column.title,
        },
        board: {
          label: board?.title,
          url: `boards/${board.id}`,
        },
        project: {
          label: project?.title,
          url: `projects/${project.id}`,
        },
        creator: {
          label: `${user.lastName} ${user.firstName} ${user.middleName}`,
          url: `users/${user.id}`,
          img: user.avatar,
        },
        createdAt: {
          label: column.createdAt,
        },
        updatedAt: {
          label: column.updatedAt,
        },
        deletedAt: {
          label: column.deletedAt,
        },
      },
    };
  }
}
