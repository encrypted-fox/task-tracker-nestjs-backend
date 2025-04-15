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
import { CommentEntity } from './comments.entity';
import { CommentsService } from './comments.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/comments')
export class CommentsController extends BaseController {
  constructor(private commentsService: CommentsService) {
    super();
  }

  private commentsFields = [
    'id',
    'description',
    'attachments',
    'commentType',
    'task',
    'creator',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ];

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getCommentsList(
    @I18n() i18n: I18nContext,
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const comments = await this.commentsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      header: this.generateHeader(i18n, this.commentsFields),
      table: this.generateTable(this.commentsFields),
      data: this.generateData(comments, this.commentsFields),

      meta: {
        count: comments.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllComments(
    @Query() query: string,
    @Query() skip: number,
    @Query() filters: any,
    @Query() take: number,
    @Query() order: any,
  ) {
    const comments = await this.commentsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: comments,

      meta: {
        count: comments.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getComment(@Param('id') id: number): Promise<CommentEntity> {
    return this.commentsService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createComment(
    @I18n() i18n: I18nContext,
    @Body() comment: CommentEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.create(comment);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateComment(
    @Param('id') id: number,
    @Body() comment: CommentEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.update(id, comment);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteComment(@Param('id') id: number): Promise<void> {
    await this.commentsService.remove(id);
  }
}
