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
import { AuthGuard } from '../auth/auth.guard';
import { VisibilityTypeEntity } from './visibilityTypes.entity';
import { VisibilityTypesService } from './visibilityTypes.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/visibilityTypes')
export class VisibilityTypesController extends BaseController {
  constructor(private visibilityTypesService: VisibilityTypesService) {
    super();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllVisibilityTypes(
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const visibilityTypes = await this.visibilityTypesService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: visibilityTypes,

      meta: {
        count: visibilityTypes.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getVisibilityType(
    @Param('id') id: number,
  ): Promise<VisibilityTypeEntity> {
    return this.visibilityTypesService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createVisibilityType(
    @Body() visibilityType: VisibilityTypeEntity,
  ): Promise<VisibilityTypeEntity> {
    return this.visibilityTypesService.create(visibilityType);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateVisibilityType(
    @Param('id') id: number,
    @Body() visibilityType: VisibilityTypeEntity,
  ): Promise<VisibilityTypeEntity> {
    return this.visibilityTypesService.update(id, visibilityType);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteVisibilityType(@Param('id') id: number): Promise<void> {
    await this.visibilityTypesService.remove(id);
  }
}
