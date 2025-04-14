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
import { BoardEntity } from './boards.entity';
import { BoardsService } from 'src/modules/boards/boards.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/boards')
export class BoardsController extends BaseController {
  constructor(private boardsService: BoardsService) {
    super();
  }

  private boardsFields = [
    'id',
    'title',
    'description',
    'attachments',
    'project',
    'creator',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ];

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getBoardsList(
    @I18n() i18n: I18nContext,
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const boards = await this.boardsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      header: this.generateHeader(i18n, this.boardsFields),
      table: this.generateTable(this.boardsFields),
      data: this.generateData(boards, this.boardsFields),

      meta: {
        count: boards.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllBoards(
    @Query() query: string,
    @Query() skip: number,
    @Query() filters: any,
    @Query() take: number,
    @Query() order: any,
  ) {
    const boards = await this.boardsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: boards,

      meta: {
        count: boards.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getBoard(@Param('id') id: number): Promise<BoardEntity> {
    return this.boardsService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createBoard(
    @I18n() i18n: I18nContext,
    @Body() board: BoardEntity,
  ): Promise<BoardEntity> {
    return this.boardsService.create(board);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateBoard(
    @Param('id') id: number,
    @Body() board: BoardEntity,
  ): Promise<BoardEntity> {
    return this.boardsService.update(id, board);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteBoard(@Param('id') id: number): Promise<void> {
    await this.boardsService.remove(id);
  }
}
