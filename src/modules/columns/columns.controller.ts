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
import { ColumnEntity } from './columns.entity';
import { ColumnsService } from './columns.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/columns')
export class ColumnsController extends BaseController {
  constructor(private columnsService: ColumnsService) {
    super();
  }

  private columnsFields = [
    'id',
    'title',
    'board',
    'project',
    'creator',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ];

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('list')
  async getColumnsList(
    @I18n() i18n: I18nContext,
    @Query() query: string,
    @Query() filters: any,
    @Query() skip: number,
    @Query() take: number,
    @Query() order: any,
  ) {
    const columns = await this.columnsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      header: this.generateHeader(i18n, this.columnsFields),
      table: this.generateTable(this.columnsFields),
      data: this.generateData(columns, this.columnsFields),

      meta: {
        count: columns.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getAllColumns(
    @Query() query: string,
    @Query() skip: number,
    @Query() filters: any,
    @Query() take: number,
    @Query() order: any,
  ) {
    const columns = await this.columnsService.find(
      {},
      filters,
      query,
      skip,
      take,
      order,
    );

    return {
      data: columns,

      meta: {
        count: columns.length,
        skip,
        take,
        order: order || { id: 'DESC' },
      },
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getColumn(@Param('id') id: number): Promise<ColumnEntity> {
    return this.columnsService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('')
  async createColumn(
    @I18n() i18n: I18nContext,
    @Body() column: ColumnEntity,
  ): Promise<ColumnEntity> {
    return this.columnsService.create(column);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateColumn(
    @Param('id') id: number,
    @Body() column: ColumnEntity,
  ): Promise<ColumnEntity> {
    return this.columnsService.update(id, column);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteColumn(@Param('id') id: number): Promise<void> {
    await this.columnsService.remove(id);
  }
}
