import { Controller, HttpCode, HttpStatus, Get, UseGuards, Post, Body, Patch, Param, Delete } from "@nestjs/common"
import { I18n, I18nContext } from "nestjs-i18n";
import { AuthGuard } from "src/auth/auth.guard";
import { Board } from "./boards.entity";
import { UsersService } from "src/users/users.service";
import { BoardsService } from "src/boards/boards.service";
import { ProjectsService } from "src/projects/projects.service";

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
  async getAllBoards(@I18n() i18n: I18nContext) {
    const boards = await this.boardsService.findAll()

    const formattedBoards = boards.map(item => this.formatBoardItem(item))

    return { 
      header: this.formatBoardHeader(i18n),
      table: this.formatBoardTable(), 
      data: formattedBoards,
      count: boards.length,
      
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
  async getBoard(@Param('id') id: number, @I18n() i18n: I18nContext) {
    return await this.boardsService.findOne(id)
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createBoard(@I18n() i18n: I18nContext, @Body() board: Board) {
    const newBoard = await this.boardsService.create(board)

    return { 
      data: this.formatBoardItem(newBoard),
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateBoard(@Param('id') id: number, @Body() board: Board) {
    const newBoard = (await this.boardsService.update(id, board)).raw[0]

    return { 
      data: this.formatBoardItem(newBoard),
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteBoard(@Param('id') id: number, @Body() board: Board) {
    const newBoard = (await this.boardsService.remove(id))

    return
  }

  formatBoardHeader(@I18n() i18n: I18nContext) {
    return [
      {
        label: i18n.t('boards.id'),
        name: 'id',
        style: 'width: 100px;'
      },
      {
        label: i18n.t('boards.title'),
        name: 'title',
        style: 'width: 175px;'
      },
      {
        label: i18n.t('boards.description'),
        name: 'description',
        style: 'width: 250px;'
      },
      {
        label: i18n.t('boards.attachments'),
        name: 'attachments',
        style: 'width: 100px;'
      },
      {
        label: i18n.t('boards.project'),
        name: 'project',
        style: 'width: 140px;'
      },
      {
        label: i18n.t('boards.creator'),
        name: 'creator',
        style: 'width: 250px;'
      },
      {
        label: i18n.t('boards.createdAt'),
        name: 'createdAt',
        style: 'width: 200px;'
      },
      {
        label: i18n.t('boards.updatedAt'),
        name: 'updatedAt',
        style: 'width: 200px;'
      },
      {
        label: i18n.t('boards.deletedAt'),
        name: 'deletedAt',
        style: 'width: 200px;'
      },
    ]
  }

  formatBoardTable() {
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
      attachments: {
        iconAppend: 'attachment',
        outerStyle: 'width: 100px;',
        innerStyle: '',
        outerClass: '',
        innerClass: 'text-primary text-ellipsis'
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
    }
  }

  async formatBoardItem(board: Board) {

    const user = await this.usersService.findOne(board.creator)
    const project = await this.projectsService.findOne(board.project)
    
    return {
      id: board.id,
      parts: {
        id: {
          label: `#${board.id}`,
        },
        title: {
          label: board.title,
        },
        description: {
          label: board.description,
        },
        attachments: {
          label: board.attachments,
        },
        project: {
          label: project.title,
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
      }
    }
  }
}