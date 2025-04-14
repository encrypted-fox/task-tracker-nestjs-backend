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
import { PriorityEntity } from './priorities.entity';
import { PrioritiesService } from './priorities.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/priorities')
export class PrioritiesController extends BaseController {
  constructor(private prioritiesService: PrioritiesService) {
    super();
  }

  private prioritiesFields = [
    'id',
    'title',
    'value',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ];

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getPrioritiesList(
    @I18n() i18n: I18nContext,
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const priorities = await this.prioritiesService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      header: this.generateHeader(i18n, this.prioritiesFields),
      table: this.generateTable(this.prioritiesFields),
      data: this.generateData(priorities, this.prioritiesFields),

      meta: {
        count: priorities.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllPriorities(
    @I18n() i18n: I18nContext,
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const priorities = await this.prioritiesService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: priorities,

      meta: {
        count: priorities.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getPriority(@Param('id') id: number): Promise<PriorityEntity> {
    return this.prioritiesService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createPriority(
    @I18n() i18n: I18nContext,
    @Body() priority: PriorityEntity,
  ): Promise<PriorityEntity> {
    return this.prioritiesService.create(priority);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updatePriority(
    @Param('id') id: number,
    @Body() priority: PriorityEntity,
  ): Promise<PriorityEntity> {
    return this.prioritiesService.update(id, priority);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deletePriority(@Param('id') id: number): Promise<void> {
    await this.prioritiesService.remove(id);
  }
}
