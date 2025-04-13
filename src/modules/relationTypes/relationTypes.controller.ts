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
import { RelationTypeEntity } from './relationTypes.entity';
import { RelationTypesService } from './relationTypes.service';

@Controller('api/relationTypes')
export class RelationTypesController {
  constructor(private relationTypesService: RelationTypesService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllRelationTypes() {
    const relationTypes = await this.relationTypesService.findAll();

    return {
      relationTypes,
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getRelationType(@Param('id') id: number): Promise<RelationTypeEntity> {
    return await this.relationTypesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createRelationType(
    @I18n() i18n: I18nContext,
    @Body() relationType: RelationTypeEntity,
  ): Promise<{ data: RelationTypeEntity }> {
    const newRelationType =
      await this.relationTypesService.create(relationType);

    return {
      data: newRelationType,
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateRelationType(
    @Param('id') id: number,
    @Body() relationType: RelationTypeEntity,
  ): Promise<{ data: RelationTypeEntity }> {
    const newRelationType = (
      await this.relationTypesService.update(id, relationType)
    ).raw[0];

    return {
      data: newRelationType,
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteRelationType(@Param('id') id: number): Promise<void> {
    await this.relationTypesService.remove(id);

    return;
  }
}
