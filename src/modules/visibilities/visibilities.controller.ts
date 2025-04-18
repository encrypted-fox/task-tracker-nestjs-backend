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
import { VisibilityEntity } from './visibilities.entity';
import { VisibilitiesService } from './visibilities.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/visibilities')
export class VisibilitiesController extends BaseController {
  constructor(private visibilitiesService: VisibilitiesService) {
    super();
  }

  private visibilitiesFields = [
    'id',
    'task',
    'relatedTasks',
    'type',
    'creator',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ];

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getVisibilitiesList(
    @I18n() i18n: I18nContext,
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const visibilities = await this.visibilitiesService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      header: this.generateHeader(i18n, this.visibilitiesFields),
      table: this.generateTable(this.visibilitiesFields),
      data: this.generateData(visibilities, this.visibilitiesFields),

      meta: {
        count: visibilities.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllVisibilities(
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const visibilities = await this.visibilitiesService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: visibilities,

      meta: {
        count: visibilities.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getVisibility(@Param('id') id: number): Promise<VisibilityEntity> {
    return this.visibilitiesService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createVisibility(
    @Body() visibility: VisibilityEntity,
  ): Promise<VisibilityEntity> {
    return this.visibilitiesService.create(visibility);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateVisibility(
    @Param('id') id: number,
    @Body() visibility: VisibilityEntity,
  ): Promise<VisibilityEntity> {
    return this.visibilitiesService.update(id, visibility);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteVisibility(@Param('id') id: number): Promise<void> {
    await this.visibilitiesService.remove(id);
  }
}
