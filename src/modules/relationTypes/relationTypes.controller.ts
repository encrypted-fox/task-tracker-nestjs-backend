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
import { RelationTypeEntity } from './relationTypes.entity';
import { RelationTypesService } from './relationTypes.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/relationTypes')
export class RelationTypesController extends BaseController {
  constructor(private relationTypesService: RelationTypesService) {
    super();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllRelationTypes(
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const relationTypes = await this.relationTypesService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: relationTypes,

      meta: {
        count: relationTypes.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getRelationType(@Param('id') id: number): Promise<RelationTypeEntity> {
    return this.relationTypesService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createRelationType(
    @I18n() i18n: I18nContext,
    @Body() relationType: RelationTypeEntity,
  ): Promise<RelationTypeEntity> {
    return this.relationTypesService.create(relationType);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateRelationType(
    @Param('id') id: number,
    @Body() relationType: RelationTypeEntity,
  ): Promise<RelationTypeEntity> {
    return this.relationTypesService.update(id, relationType);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteRelationType(@Param('id') id: number): Promise<void> {
    await this.relationTypesService.remove(id);
  }
}
