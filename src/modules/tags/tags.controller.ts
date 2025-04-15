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
import { TagEntity } from './tags.entity';
import { TagsService } from './tags.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/tags')
export class TagsController extends BaseController {
  constructor(private tagsService: TagsService) {
    super();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllTags(
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const tags = await this.tagsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: tags,

      meta: {
        count: tags.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTag(@Param('id') id: number): Promise<TagEntity> {
    return this.tagsService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createTag(
    @I18n() i18n: I18nContext,
    @Body() tag: TagEntity,
  ): Promise<TagEntity> {
    return this.tagsService.create(tag);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateTag(
    @Param('id') id: number,
    @Body() tag: TagEntity,
  ): Promise<TagEntity> {
    return this.tagsService.update(id, tag);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteTag(@Param('id') id: number): Promise<void> {
    await this.tagsService.remove(id);
  }
}
