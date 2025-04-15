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
import { CommentTypeEntity } from './commentTypes.entity';
import { CommentTypesService } from './commentTypes.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/commentTypes')
export class CommentTypesController extends BaseController {
  constructor(private commentTypesService: CommentTypesService) {
    super();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllCommentTypes(
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const commentTypes = await this.commentTypesService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: commentTypes,

      meta: {
        count: commentTypes.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getCommentType(@Param('id') id: number): Promise<CommentTypeEntity> {
    return this.commentTypesService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createCommentType(
    @I18n() i18n: I18nContext,
    @Body() commentType: CommentTypeEntity,
  ): Promise<CommentTypeEntity> {
    return this.commentTypesService.create(commentType);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateCommentType(
    @Param('id') id: number,
    @Body() commentType: CommentTypeEntity,
  ): Promise<CommentTypeEntity> {
    return this.commentTypesService.update(id, commentType);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteCommentType(@Param('id') id: number): Promise<void> {
    await this.commentTypesService.remove(id);
  }
}
