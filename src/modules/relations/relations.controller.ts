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
import { RelationEntity } from './relations.entity';
import { RelationsService } from './relations.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/relations')
export class RelationsController extends BaseController {
  constructor(private relationsService: RelationsService) {
    super();
  }

  private relationsFields = [
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
  async getRelationsList(
    @I18n() i18n: I18nContext,
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const relations = await this.relationsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      header: this.generateHeader(i18n, this.relationsFields),
      table: this.generateTable(this.relationsFields),
      data: this.generateData(relations, this.relationsFields),

      meta: {
        count: relations.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllRelations(
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const relations = await this.relationsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: relations,

      meta: {
        count: relations.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getRelation(@Param('id') id: number): Promise<RelationEntity> {
    return this.relationsService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createRelation(
    @I18n() i18n: I18nContext,
    @Body() relation: RelationEntity,
  ): Promise<RelationEntity> {
    return this.relationsService.create(relation);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateRelation(
    @Param('id') id: number,
    @Body() relation: RelationEntity,
  ): Promise<RelationEntity> {
    return this.relationsService.update(id, relation);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteRelation(@Param('id') id: number): Promise<void> {
    await this.relationsService.remove(id);
  }
}
