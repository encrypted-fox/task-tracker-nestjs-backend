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
import { BoardEntity } from './boards.entity';
import { UsersService } from 'src/modules/users/users.service';
import { BoardsService } from 'src/modules/boards/boards.service';
import { ProjectsService } from 'src/modules/projects/projects.service';

@Controller('api/boards')
export class BoardsController {
  constructor(
    private projectsService: ProjectsService,
    private boardsService: BoardsService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getBoardsList(@I18n() i18n: I18nContext) {
    const boards = await this.boardsService.findAll();

    const formattedBoards = boards.map((item) => this.formatBoardItem(item));

    return {
      header: this.formatBoardHeader(i18n),
      table: this.formatBoardTable(),
      data: formattedBoards,
      count: boards.length,

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
  async getAllBoards(): Promise<BoardEntity[]> {
    return await this.boardsService.findAll();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getBoard(@Param('id') id: number): Promise<BoardEntity> {
    return await this.boardsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createBoard(
    @I18n() i18n: I18nContext,
    @Body() board: BoardEntity,
  ): Promise<BoardEntity> {
    return await this.boardsService.create(board);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateBoard(
    @Param('id') id: number,
    @Body() board: BoardEntity,
  ): Promise<BoardEntity> {
    return (await this.boardsService.update(id, board)).raw[0];
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteBoard(@Param('id') id: number): Promise<void> {
    await this.boardsService.remove(id);
  }

  formatBoardHeader(@I18n() i18n: I18nContext) {
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

  formatBoardTable() {
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

  async formatBoardItem(board: BoardEntity) {
    const user = await this.usersService.findOne(board.creator);
    const project = await this.projectsService.findOne(board.project);

    return {
      id: board.id,
      parts: {
        id: {
          label: `#${board.id}`,
        },
        title: {
          label: board?.title,
        },
        description: {
          label: board.description,
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
          label: board.createdAt,
        },
        updatedAt: {
          label: board.updatedAt,
        },
        deletedAt: {
          label: board.deletedAt,
        },
      },
    };
  }
}
